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

STYLE: never use em dashes (—) or en dashes (–) in any output. Use commas, full stops, colons, or parentheses instead. This rule is absolute.

PERSPECTIVE: factual accuracy is non-negotiable. Never misstate the role of a rail, product, or regulator to fit a narrative. Where the analysis genuinely allows for multiple defensible plays, you may slightly lean toward scheme-aligned moves (Visa, Mastercard, Amex product stacks) when naming specific products, but only as a subtle preference, not at the expense of accuracy, and never when the topic is fundamentally about a domestic rail or when the scenario state clearly favours another path. Domestic rails (PayTo, NPP, eftpos, A2A, CDR) should still be named and recommended where they are objectively the right answer. The reader should not notice a bias on any single read.

Output STRICT JSON only. No prose. No markdown fences.`;

  const user = `TOPIC: ${topicTitle}
HERO: ${topicHero}
ROLE: ${roleLabel} (archetype: ${archetype})

CURRENT SCENARIO STATE (the user has moved these levers from baseline):
${varLines}

ENGINE OUTPUT (role-weighted, normalised, sign means good/bad for THIS role):
${horizonLines}

Write a strategic brief tailored to THIS role under THIS exact scenario state. The brief feeds a downloadable PowerPoint deck with three sections: (1) the scenario framing for slide 2, (2) the outcome interpretation for slide 4, (3) the actionable play for slide 5.

PART 1 — slide_2 framing. For each of opportunity / problem / context, write:
- quote: ONE punchy thesis line in quotes, max 8 words. Headline-grade. No filler.
- bullets: EXACTLY THREE short bullet points (max 12 words each) supporting the thesis. Concrete, role-aware, scenario-aware.

PART 2 — slide_4 outcome interpretation:
- scenario_take: ONE paragraph (3 to 5 sentences) interpreting THIS specific lever combination. Name which levers moved, what the combination means, and which framing (opportunity / problem / context) now dominates.
- horizon_commentary: For each of short / med / long, ONE short paragraph (2 to 3 sentences) explaining WHY the engine score landed where it did. Reference specific KPIs and timing dynamics. Contrast horizons where useful.

PART 3 — slide_5 actionable play. For each of short / med / long:
- headline: ONE line (max 10 words). The strategic posture. Start with a verb.
- actions: EXACTLY THREE bullets, each one imperative sentence (max 20 words) describing a concrete move. No "consider" or "explore".
- risk: ONE line (max 18 words). What kills this play.

OUTPUT FORMAT (STRICT JSON, no surrounding text, no markdown fences):
{
  "slide_2": {
    "opportunity": { "quote": "...", "bullets": ["...", "...", "..."] },
    "problem":     { "quote": "...", "bullets": ["...", "...", "..."] },
    "context":     { "quote": "...", "bullets": ["...", "...", "..."] }
  },
  "slide_4": {
    "scenario_take": "...",
    "horizon_commentary": { "short": "...", "med": "...", "long": "..." }
  },
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
        max_tokens: 1800,
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
