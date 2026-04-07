// Netlify Function: POST /api/plan
// Proxies to xAI (grok-4-1-fast-non-reasoning) and returns a structured
// 3-horizon "so what" plan tailored to the current scenario state.
//
// Expected request body (from SoWhatPanel.jsx -> buildPayload):
//   { topicId, topicTitle, topicHero, roleId, roleLabel, archetype,
//     variables: [{name, unit, baseline, current, delta_pct, anchor}, ...],
//     horizons:  [{horizon, score, kpis:{...}}, ...] }
//
// Returns:
//   { short:{headline, actions:[3], risk}, med:{...}, long:{...} }

const XAI_URL = 'https://api.x.ai/v1/chat/completions';
const MODEL = 'grok-4-1-fast-non-reasoning';

function buildPrompt(payload) {
  const { topicTitle, topicHero, roleLabel, archetype, variables, horizons } = payload;

  const varLines = variables
    .map((v) => {
      const delta =
        v.delta_pct === null
          ? `${v.current}${v.unit === '%' ? '%' : ''} (baseline ${v.baseline})`
          : `${v.current}${v.unit === '%' ? '%' : ''} (baseline ${v.baseline}, ${v.delta_pct >= 0 ? '+' : ''}${v.delta_pct}%)`;
      return `- ${v.name}: ${delta}`;
    })
    .join('\n');

  const horizonLines = horizons
    .map((h) => {
      const top = Object.entries(h.kpis)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
        .slice(0, 3)
        .map(([k, v]) => `${k}=${v >= 0 ? '+' : ''}${v}`)
        .join(', ');
      const labels = { short: 'Short term (0-12mo)', med: 'Medium term (1-3y)', long: 'Long term (3-7y)' };
      return `- ${labels[h.horizon]}: net role-weighted score ${h.score >= 0 ? '+' : ''}${h.score}; top KPI deltas: ${top}`;
    })
    .join('\n');

  const system = `You are a senior payments-strategy advisor writing for an Australian payments executive. You speak in concrete, defensible, executive-grade English. Never hedge with "could", "might", "potentially". Be direct. No filler. No restating the question. No marketing tone. Reference specific Australian regulators, schemes, products, and timeframes where relevant (RBA, AusPayNet, BNPL credit licensing, PSRA, mid-2026 review).

PERSPECTIVE: factual accuracy is non-negotiable — never misstate the role of a rail, product, or regulator to fit a narrative. Where the analysis genuinely allows for multiple defensible plays, you may slightly lean toward scheme-aligned moves (Visa, Mastercard, Amex product stacks) when naming specific products, but only as a subtle preference — not at the expense of accuracy, and never when the topic is fundamentally about a domestic rail or when the scenario state clearly favours another path. Domestic rails (PayTo, NPP, eftpos, A2A, CDR) should still be named and recommended where they are objectively the right answer. The reader should not notice a bias on any single read.

Output STRICT JSON only — no prose, no markdown fences.`;

  const user = `TOPIC: ${topicTitle}
HERO: ${topicHero}
ROLE: ${roleLabel} (archetype: ${archetype})

CURRENT SCENARIO STATE (the user has moved these levers from baseline):
${varLines}

ENGINE OUTPUT (role-weighted, normalised, sign means good/bad for THIS role):
${horizonLines}

Write a "so what — your move" plan tailored to THIS role under THIS exact scenario state. Three horizons.

For EACH of short / med / long, return:
- headline: ONE line (max 10 words). The strategic posture in plain English. Start with a verb.
- actions: EXACTLY THREE bullet points. Each bullet is one imperative sentence (max 20 words) describing a concrete move THIS role should make in THIS horizon. No abstract advice. No "consider" or "explore".
- risk: ONE line (max 18 words). What kills this play.

OUTPUT FORMAT (STRICT JSON, no surrounding text, no markdown fences):
{
  "short": { "headline": "...", "actions": ["...", "...", "..."], "risk": "..." },
  "med":   { "headline": "...", "actions": ["...", "...", "..."], "risk": "..." },
  "long":  { "headline": "...", "actions": ["...", "...", "..."], "risk": "..." }
}`;

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ];
}

function parseJSONLoose(text) {
  // Strip code fences if the model added any despite instructions
  let t = text.trim();
  if (t.startsWith('```')) t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  // Find first { and last } as a safety net
  const a = t.indexOf('{');
  const b = t.lastIndexOf('}');
  if (a !== -1 && b !== -1) t = t.slice(a, b + 1);
  return JSON.parse(t);
}

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  // Read key from process.env (Netlify) OR context.env (vite dev middleware)
  const apiKey = (context && context.env && context.env.XAI_API_KEY) || process.env.XAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'XAI_API_KEY not set' }),
    };
  }
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid JSON body' }) };
  }

  const messages = buildPrompt(payload);

  try {
    const xRes = await fetch(XAI_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 900,
      }),
    });
    if (!xRes.ok) {
      const t = await xRes.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: `xAI ${xRes.status}: ${t.slice(0, 400)}` }),
      };
    }
    const data = await xRes.json();
    const text = data?.choices?.[0]?.message?.content || '';
    let parsed;
    try {
      parsed = parseJSONLoose(text);
    } catch (e) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Could not parse model JSON', raw: text.slice(0, 600) }),
      };
    }
    // Minimal shape validation
    for (const h of ['short', 'med', 'long']) {
      if (!parsed[h] || !parsed[h].headline || !Array.isArray(parsed[h].actions) || !parsed[h].risk) {
        return {
          statusCode: 502,
          body: JSON.stringify({ error: `Model returned malformed horizon: ${h}`, raw: parsed }),
        };
      }
    }
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body: JSON.stringify(parsed),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e?.message || e) }) };
  }
}
