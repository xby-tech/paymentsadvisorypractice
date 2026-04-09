import React, { useMemo, useState } from 'react';

const CACHE = new Map();

function hashInputs(topicId, roleId, sliders) {
  const keys = Object.keys(sliders).sort();
  const sliderStr = keys.map((k) => `${k}:${Number(sliders[k]).toFixed(2)}`).join('|');
  return `${topicId}::${roleId}::${sliderStr}`;
}

function buildPayload(topic, role, sliders, result) {
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

function GhostCard({ label, sub }) {
  return (
    <div className="sowhat-card sowhat-ghost">
      <div className="text-[10px] uppercase tracking-[0.2em] ink3">{label}</div>
      <div className="font-mono text-[10px] ink3 mt-0.5">{sub}</div>
      <div className="mt-8 flex flex-col items-center justify-center py-6 opacity-50">
        <div className="w-8 h-8 rounded-full border hairline flex items-center justify-center mb-3">
          <span className="text-[14px] ink3">◇</span>
        </div>
        <div className="text-[10.5px] ink3 uppercase tracking-[0.15em]">Awaiting brief</div>
      </div>
    </div>
  );
}

function ShimmerCard({ label, sub }) {
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

function HorizonPlanCard({ label, sub, plan }) {
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
  const [plan, setPlan] = useState(null);
  const [planHash, setPlanHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset displayed plan whenever topic or role changes. Pure on-demand, no auto-fetch.
  const topicRoleKey = `${topic.id}::${role.id}`;
  const lastTopicRole = React.useRef(null);
  if (lastTopicRole.current !== topicRoleKey) {
    lastTopicRole.current = topicRoleKey;
    if (plan !== null) setPlan(null);
    if (error !== null) setError(null);
    if (planHash !== null) setPlanHash(null);
  }

  const stale = plan && planHash && planHash !== inputHash;

  async function generate() {
    const hash = inputHash;
    if (CACHE.has(hash)) {
      setPlan(CACHE.get(hash));
      setPlanHash(hash);
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
      setPlanHash(hash);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  const hasPlan = !!plan;
  const showShimmer = loading && !plan;
  const [copied, setCopied] = useState(false);
  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="sowhat-section mt-16">
      <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] ink3">So what, your move</div>
          <h2 className="font-display text-[26px] mt-1">The actionable play</h2>
        </div>
        <div className="flex items-center gap-3">
          {stale && (
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-[#ffb86b] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb86b] animate-pulse"></span>
              Scenario changed
            </span>
          )}
          <button
            onClick={copyShareLink}
            className="text-[12px] px-4 py-2.5 rounded-full chip ink2 hover:text-white transition"
            title="Copy a link that restores this exact scenario"
          >
            {copied ? 'Link copied' : 'Share this scenario'}
          </button>
          <button
            onClick={generate}
            disabled={loading}
            className={
              'text-[12px] px-5 py-2.5 rounded-full transition disabled:opacity-40 ' +
              (hasPlan
                ? 'chip hover:text-white'
                : 'font-medium text-[#08090b] bg-gradient-to-r from-[#7cf2c8] to-[#5ec2ff] hover:shadow-[0_10px_30px_-10px_rgba(124,242,200,0.6)]')
            }
          >
            {loading ? 'Generating…' : hasPlan ? (stale ? 'Refresh plan →' : 'Regenerate') : 'Generate strategic brief →'}
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl border hairline text-[12px] text-[#ff6b8a]">
          Couldn't generate plan: {error}
        </div>
      )}
      <div className={'grid md:grid-cols-3 gap-5 ' + (stale ? 'opacity-70' : '')}>
        {showShimmer ? (
          <>
            <ShimmerCard label="Short term" sub="0 to 12 months" />
            <ShimmerCard label="Medium term" sub="1 to 3 years" />
            <ShimmerCard label="Long term" sub="3 to 7 years" />
          </>
        ) : hasPlan ? (
          <>
            <HorizonPlanCard label="Short term" sub="0 to 12 months" plan={plan.short} />
            <HorizonPlanCard label="Medium term" sub="1 to 3 years" plan={plan.med} />
            <HorizonPlanCard label="Long term" sub="3 to 7 years" plan={plan.long} />
          </>
        ) : (
          <>
            <GhostCard label="Short term" sub="0 to 12 months" />
            <GhostCard label="Medium term" sub="1 to 3 years" />
            <GhostCard label="Long term" sub="3 to 7 years" />
          </>
        )}
      </div>
      <div className="mt-3 text-[10.5px] ink3">
        Generated on demand by Grok (grok-4-1-fast) from your current scenario state. Treat as a strategy starting point, not advice.
      </div>
    </section>
  );
}
