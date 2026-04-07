import React, { useEffect, useMemo, useRef, useState } from 'react';

// Stable cache across renders/components for the session
const CACHE = new Map();

function hashInputs(topicId, roleId, sliders) {
  const keys = Object.keys(sliders).sort();
  const sliderStr = keys.map((k) => `${k}:${Number(sliders[k]).toFixed(2)}`).join('|');
  return `${topicId}::${roleId}::${sliderStr}`;
}

function buildPayload(topic, role, sliders, result) {
  // Snapshot the state into something the LLM can reason over without bloating the prompt
  const vars = topic.variables.map((v) => ({
    name: v.name,
    unit: v.unit,
    baseline: v.default,
    current: Number(sliders[v.id]),
    delta_pct: v.default === 0 ? null : Math.round(((sliders[v.id] - v.default) / Math.max(1e-9, v.default)) * 100),
    anchor: v.anchor,
  }));
  const horizons = ['short', 'med', 'long'].map((h) => ({
    horizon: h,
    score: Number(Object.values(result[h]).reduce((a, b) => a + b, 0).toFixed(2)),
    kpis: Object.fromEntries(Object.entries(result[h]).map(([k, v]) => [k, Number(v.toFixed(2))])),
  }));
  return {
    topicId: topic.id,
    topicTitle: topic.title,
    topicHero: topic.hero,
    roleId: role.id,
    roleLabel: role.label,
    archetype: role.arch,
    variables: vars,
    horizons,
  };
}

async function fetchPlan(payload) {
  const res = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`API ${res.status}: ${t.slice(0, 200)}`);
  }
  return res.json();
}

function HorizonPlanCard({ label, sub, plan, loading }) {
  if (loading || !plan) {
    return (
      <div className="sowhat-card">
        <div className="text-[10px] uppercase tracking-[0.2em] ink3">{label}</div>
        <div className="font-mono text-[10px] ink3 mt-0.5">{sub}</div>
        <div className="mt-5 shimmer h-5 w-3/4"></div>
        <div className="mt-3 shimmer h-3 w-full"></div>
        <div className="mt-2 shimmer h-3 w-5/6"></div>
        <div className="mt-2 shimmer h-3 w-4/6"></div>
        <div className="mt-5 shimmer h-3 w-full"></div>
      </div>
    );
  }
  return (
    <div className="sowhat-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] ink3">{label}</div>
          <div className="font-mono text-[10px] ink3 mt-0.5">{sub}</div>
        </div>
      </div>
      <div className="font-display text-[18px] leading-snug grad-text mt-4">{plan.headline}</div>
      <ul className="mt-4 space-y-2">
        {plan.actions.map((a, i) => (
          <li key={i} className="flex gap-2 text-[12.5px] text-white/90 leading-relaxed">
            <span className="text-[#7cf2c8] mt-[1px]">▸</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t hairline text-[11.5px] leading-relaxed">
        <span className="text-[#ff6b8a] uppercase tracking-[0.18em] text-[9.5px] mr-2">Risk</span>
        <span className="ink2">{plan.risk}</span>
      </div>
    </div>
  );
}

export default function SoWhatPanel({ topic, role, sliders, result }) {
  const inputHash = useMemo(() => hashInputs(topic.id, role.id, sliders), [topic, role, sliders]);
  const lastFetchedHash = useRef(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Detect "stale" — sliders changed since last successful fetch (but topic/role unchanged)
  const stale = plan && lastFetchedHash.current && lastFetchedHash.current !== inputHash;

  async function generate() {
    const hash = inputHash;
    if (CACHE.has(hash)) {
      setPlan(CACHE.get(hash));
      lastFetchedHash.current = hash;
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = buildPayload(topic, role, sliders, result);
      const data = await fetchPlan(payload);
      CACHE.set(hash, data);
      setPlan(data);
      lastFetchedHash.current = hash;
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Auto-generate the FIRST time you land on a (topic, role) pairing
  const topicRoleKey = `${topic.id}::${role.id}`;
  const lastTopicRole = useRef(null);
  useEffect(() => {
    if (lastTopicRole.current !== topicRoleKey) {
      lastTopicRole.current = topicRoleKey;
      setPlan(null);
      setError(null);
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicRoleKey]);

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] ink3">So what — your move</div>
          <h2 className="font-display text-[26px] mt-1">The actionable play</h2>
        </div>
        <div className="flex items-center gap-3">
          {stale && (
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-[#ffb86b] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb86b] animate-pulse"></span>
              Plan stale
            </span>
          )}
          <button
            onClick={generate}
            disabled={loading}
            className="text-[11px] px-4 py-2 rounded-full chip hover:text-white transition disabled:opacity-40"
          >
            {loading ? 'Generating…' : stale ? 'Refresh plan →' : 'Regenerate'}
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl border hairline text-[12px] text-[#ff6b8a]">
          Couldn't generate plan: {error}
        </div>
      )}
      <div className={'grid md:grid-cols-3 gap-5 ' + (stale ? 'opacity-60' : '')}>
        <HorizonPlanCard label="Short term" sub="0 to 12 months" plan={plan?.short} loading={loading && !plan} />
        <HorizonPlanCard label="Medium term" sub="1 to 3 years" plan={plan?.med} loading={loading && !plan} />
        <HorizonPlanCard label="Long term" sub="3 to 7 years" plan={plan?.long} loading={loading && !plan} />
      </div>
      <div className="mt-3 text-[10.5px] ink3">
        Generated by Grok (grok-4-1-fast) from your current scenario state. Treat as a strategy starting point, not advice.
      </div>
    </section>
  );
}
