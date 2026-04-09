import React, { useMemo, useState } from 'react';
import { TOPICS, ROLES, ARCHETYPES, KPIS } from '../data.js';
import { computeOutcomes, fmtVal } from '../engine.js';
import SoWhatPanel from './SoWhatPanel.jsx';

// Topic character assignment for nav tags
const TOPIC_CHARACTER = {
  agentic: 'Opportunity',
  payto: 'Structural shift',
  wallets: 'Threat',
  psra: 'Structural shift',
  waterbed: 'Threat',
  xborder: 'Opportunity',
  tokenisation: 'Opportunity',
  bnpl: 'Threat',
  cdr: 'Structural shift',
  fraudai: 'Opportunity',
};
const CHARACTER_STYLE = {
  Opportunity: { color: '#7cf2c8', bg: 'rgba(124,242,200,0.08)', border: 'rgba(124,242,200,0.3)' },
  Threat: { color: '#ff6b8a', bg: 'rgba(255,107,138,0.08)', border: 'rgba(255,107,138,0.3)' },
  'Structural shift': { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.3)' },
};

// Per-topic chroma — drives slider tracks, glows, watermark, page wash
const CHARACTER_ACCENT = {
  Opportunity:        { hex: '#7cf2c8', rgb: '124,242,200', hex2: '#5ec2ff', rgb2: '94,194,255' },
  Threat:             { hex: '#ff6b8a', rgb: '255,107,138', hex2: '#ffb86b', rgb2: '255,184,107' },
  'Structural shift': { hex: '#a78bfa', rgb: '167,139,250', hex2: '#5ec2ff', rgb2: '94,194,255' },
};

function CharacterTag({ kind, size = 'sm' }) {
  const s = CHARACTER_STYLE[kind];
  if (!s) return null;
  const pad = size === 'lg' ? 'px-2.5 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]';
  return (
    <span
      className={`inline-block rounded-full uppercase tracking-[0.15em] font-medium ${pad}`}
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
    >
      {kind}
    </span>
  );
}

function Brief({ label, body, accent }) {
  return (
    <div className="brief-card rounded-2xl p-6 border hairline">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }}></span>
        <div className="text-[10px] uppercase tracking-[0.2em] ink3">{label}</div>
      </div>
      <p className="text-[14px] leading-relaxed text-white/90">{body}</p>
    </div>
  );
}

function BigSlider({ v, value, onChange, pulse }) {
  const delta = value - v.default;
  const direction = Math.abs(delta) < 1e-6 ? 'baseline' : delta > 0 ? 'up' : 'down';
  const color = direction === 'up' ? '#7cf2c8' : direction === 'down' ? '#ff6b8a' : '#9aa1ad';
  const range = v.max - v.min;
  const rangePct = range > 0 ? Math.round(((value - v.default) / range) * 100) : 0;
  return (
    <div className={'big-slider lever-card relative ' + (pulse ? 'first-slider-pulse' : '')}>
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-start gap-2 max-w-[70%]">
          <div className="text-[13px] text-white/90 leading-snug">{v.name}</div>
          {v.source && (
            <span className="info-wrap shrink-0 mt-0.5" tabIndex={0} aria-label={`Source: ${v.source}`}>
              <span className="info-dot" aria-hidden="true">i</span>
              <span className="source-pop" role="tooltip">
                <span className="text-[9.5px] uppercase tracking-[0.18em] ink3 block mb-1">Source</span>
                <span className="text-[11.5px] text-white/90 leading-relaxed block">{v.source}</span>
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {direction !== 'baseline' && (
            <div
              className="text-[10px] font-mono px-1.5 py-0.5 rounded delta-badge"
              style={{
                background: `rgba(${direction === 'up' ? '124,242,200' : '255,107,138'},0.12)`,
                color,
                border: `1px solid rgba(${direction === 'up' ? '124,242,200' : '255,107,138'},0.25)`,
              }}
            >
              {rangePct > 0 ? '+' : ''}
              {rangePct}%
            </div>
          )}
          <div className="num-tick text-[26px] font-display tracking-tight" style={{ color }}>
            {fmtVal(v, value)}
          </div>
        </div>
      </div>
      <input
        type="range"
        min={v.min}
        max={v.max}
        step={(v.max - v.min) / 200}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3"
      />
      <div className="flex items-center justify-between mt-2 text-[11.5px]">
        <div className="ink2">
          <span className="ink3 uppercase tracking-[0.12em] text-[9.5px] mr-1.5">baseline</span>
          <span className="text-white/90 font-medium">{fmtVal(v, v.default)}</span>
        </div>
        <div className="ink3 text-[10.5px]">
          impact weight · <span className="ink2">{Math.round(v.weight * 100)}</span>
        </div>
      </div>
      <div className="text-[10.5px] ink3 mt-1">{v.anchor}</div>
    </div>
  );
}

function IntensityMeter({ value }) {
  // Half-circle arc, 0..100 fills the arc with topic accent
  const r = 34;
  const c = Math.PI * r; // half-circle circumference
  const filled = (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="intensity-meter flex items-center gap-3" title="Scenario intensity">
      <svg viewBox="0 0 80 46" width="76" height="44" className="overflow-visible">
        <path
          d={`M 6 40 A ${r} ${r} 0 0 1 74 40`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M 6 40 A ${r} ${r} 0 0 1 74 40`}
          fill="none"
          stroke="var(--topic-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
          style={{ filter: 'drop-shadow(0 0 6px var(--topic-accent))', transition: 'stroke-dasharray .55s cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-[20px] num-tick" style={{ color: 'var(--topic-accent)' }}>
          {value}
          <span className="text-[11px] ink3 ml-0.5">%</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.18em] ink3">Scenario intensity</div>
      </div>
    </div>
  );
}

function HorizonCard({ label, sub, score, movers, accentRgb }) {
  const s = Math.max(-6, Math.min(6, score));
  const norm = s / 6;
  const good = norm >= 0;
  const intensity = Math.min(1, Math.abs(norm) * 1.4);
  const color = good ? '#7cf2c8' : '#ff6b8a';
  // Good outcomes pick up topic accent for chroma variety, bad outcomes stay coral
  const glowColor = good ? `rgba(${accentRgb || '124,242,200'},1)` : 'rgba(255,107,138,1)';
  const verdict =
    norm > 0.5 ? 'Strongly favourable' : norm > 0.15 ? 'Favourable' : norm > -0.15 ? 'Neutral' : norm > -0.5 ? 'Adverse' : 'Strongly adverse';
  return (
    <div
      className="horizon-card"
      style={{
        '--gc': glowColor,
        '--gop': intensity * 0.7,
        borderColor: `rgba(${good ? accentRgb || '124,242,200' : '255,107,138'},${0.15 + intensity * 0.4})`,
      }}
    >
      <div className="glow"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] ink3">{label}</div>
            <div className="font-mono text-[10px] ink3 mt-0.5">{sub}</div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color }}>
            {verdict}
          </div>
        </div>
        <div className="horizon-score mt-6" style={{ fontSize: `${56 + intensity * 16}px`, color }}>
          {score >= 0 ? '+' : ''}
          {score.toFixed(2)}
        </div>
        <div className="text-[10px] ink3 mt-1">role-weighted net score</div>
        <div className="mt-6 space-y-1">
          {movers.map((m) => {
            const w = Math.min(100, Math.abs(m.v) * 40);
            const mGood = m.v >= 0;
            return (
              <div key={m.k} className="kpi-mover">
                <div className="ink2 w-[110px] truncate">{m.label}</div>
                <div className="bar">
                  <span
                    style={{
                      left: mGood ? '50%' : `${50 - w / 2}%`,
                      width: `${w / 2}%`,
                      background: mGood ? 'linear-gradient(90deg,#7cf2c8,#5ec2ff)' : 'linear-gradient(90deg,#ff6b8a,#ffb86b)',
                    }}
                  ></span>
                  <span style={{ left: '50%', width: '1px', background: 'rgba(255,255,255,0.12)' }}></span>
                </div>
                <div
                  className="font-mono num-tick w-12 text-right flex items-center justify-end gap-1"
                  style={{ color: mGood ? '#7cf2c8' : '#ff6b8a' }}
                >
                  <span className="text-[9px]">{mGood ? '▲' : '▼'}</span>
                  <span>{m.v.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ roleId, setRoleId, topicId, setTopicId, sliders, setSliders, onHome, onLegal }) {
  const topic = TOPICS.find((t) => t.id === topicId);
  const role = ROLES.find((r) => r.id === roleId);
  const archetype = role.arch;

  const setSlider = (vid, val) => {
    setSliders((s) => ({ ...s, [topic.id]: { ...s[topic.id], [vid]: val } }));
  };
  const reset = () => {
    setSliders((s) => {
      const copy = { ...s, [topic.id]: {} };
      topic.variables.forEach((v) => (copy[topic.id][v.id] = v.default));
      return copy;
    });
  };

  const result = useMemo(() => computeOutcomes(topic, sliders[topic.id], archetype), [topic, sliders, archetype]);
  const briefing = topic.briefing[archetype];

  // Per-topic chroma (V1)
  const character = TOPIC_CHARACTER[topic.id];
  const accent = CHARACTER_ACCENT[character] || CHARACTER_ACCENT.Opportunity;
  const topicIndex = TOPICS.findIndex((t) => t.id === topic.id);
  const accentStyle = {
    '--topic-accent': accent.hex,
    '--topic-accent-rgb': accent.rgb,
    '--topic-accent-2': accent.hex2,
    '--topic-accent-2-rgb': accent.rgb2,
  };

  // Scenario intensity 0-100 — average % of range moved across all levers (V3)
  const intensity = useMemo(() => {
    let total = 0;
    let n = 0;
    topic.variables.forEach((v) => {
      const range = v.max - v.min;
      if (range > 0) {
        total += Math.abs(sliders[topic.id][v.id] - v.default) / range;
        n += 1;
      }
    });
    return n === 0 ? 0 : Math.round((total / n) * 100);
  }, [topic, sliders]);

  const topMovers = (h) => {
    const entries = Object.entries(result[h]).map(([k, v]) => ({
      k,
      v,
      label: KPIS.find((x) => x.id === k).label,
    }));
    entries.sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
    return entries.slice(0, 4);
  };
  const horizonScore = (h) => Object.values(result[h]).reduce((a, b) => a + b, 0);

  return (
    <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r hairline md:min-h-screen flex flex-col bg-[#0a0c10]/60">
        <div className="px-6 pt-6 pb-4 border-b hairline">
          <button onClick={onHome} className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7cf2c8] to-[#5ec2ff]"></div>
            <div className="font-display text-[13px] leading-tight">
              <div>Payments Strategy</div>
              <div className="ink3 text-[10px]">Scenario Engine</div>
            </div>
          </button>
        </div>
        <div className="px-6 pt-5 pb-2 text-[10px] uppercase tracking-[0.2em] ink3">10 topics</div>
        <div className="px-6 pb-5 md:hidden">
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="w-full bg-[#0d0f13] border hairline rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-[#7cf2c8] transition"
          >
            {TOPICS.map((t, i) => (
              <option key={t.id} value={t.id}>
                {String(i + 1).padStart(2, '0')} · {t.title}
              </option>
            ))}
          </select>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar hidden md:block">
          {TOPICS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setTopicId(t.id)}
              className={'rail-item ' + (t.id === topicId ? 'active' : '')}
            >
              <div className="rail-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="text-[13px] mt-1 leading-snug text-white/95">{t.title}</div>
            </div>
          ))}
        </nav>
        <div className="border-t hairline px-6 py-5">
          <div className="text-[10px] uppercase tracking-[0.2em] ink3 mb-2">Viewing as</div>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full bg-[#0d0f13] border hairline rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-[#7cf2c8] transition"
          >
            {Object.entries(ARCHETYPES).map(([aid, a]) => (
              <optgroup key={aid} label={a.label}>
                {ROLES.filter((r) => r.arch === aid).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="text-[10px] ink3 mt-2">Lens · {ARCHETYPES[archetype].label}</div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-5 sm:px-8 md:px-12 py-8 md:py-10 max-w-[1280px] relative topic-themed" style={accentStyle}>
        <div className="topic-wash" aria-hidden="true"></div>
        <div key={topic.id + role.id} className="fade-in relative">
          <div className="topic-numeral" aria-hidden="true">{String(topicIndex + 1).padStart(2, '0')}</div>
          <div className="text-[11px] uppercase tracking-[0.22em] ink3 mb-3 relative">{topic.tagline}</div>
          <h1 className="font-display text-[30px] sm:text-[38px] md:text-[54px] leading-[1.1] pb-1 grad-text max-w-3xl break-words relative">
            {topic.title}
          </h1>
          <p className="mt-5 text-[17px] ink2 max-w-2xl leading-relaxed relative">{topic.hero}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10 fade-in">
          <Brief label="Opportunity" body={briefing.opportunity} accent="#7cf2c8" />
          <Brief label="Problem" body={briefing.problem} accent="#ff6b8a" />
          <Brief label="Context" body={briefing.context} accent="#5ec2ff" />
        </div>

        <div className="mt-4 text-[10.5px] ink3 italic flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.25)]"></span>
          Cross-topic ripple effects, coming soon
        </div>

        <section className="mt-12 relative">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] ink3">Scenario variables</div>
              <h2 className="font-display text-[26px] mt-1">Move the levers</h2>
            </div>
            <div className="flex items-center gap-5">
              <IntensityMeter value={intensity} />
              <button
                onClick={reset}
                className="text-[11px] ink2 hover:text-white transition px-3 py-1.5 rounded-full chip"
              >
                Reset to baseline
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
            {topic.variables.map((v, i) => (
              <BigSlider
                key={v.id}
                v={v}
                value={sliders[topic.id][v.id]}
                onChange={(val) => setSlider(v.id, val)}
                pulse={i === 0}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] ink3">Outcome surface</div>
              <h2 className="font-display text-[26px] mt-1">How this reshapes your world</h2>
            </div>
            <div className="text-[11px] ink3">Net effect for {role.label}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <HorizonCard label="Short term" sub="0 to 12 months" score={horizonScore('short')} movers={topMovers('short')} accentRgb={accent.rgb} />
            <HorizonCard label="Medium term" sub="1 to 3 years" score={horizonScore('med')} movers={topMovers('med')} accentRgb={accent.rgb} />
            <HorizonCard label="Long term" sub="3 to 7 years" score={horizonScore('long')} movers={topMovers('long')} accentRgb={accent.rgb} />
          </div>
        </section>

        <SoWhatPanel topic={topic} role={role} sliders={sliders[topic.id]} result={result} />

        <div className="mt-20 pt-8 border-t hairline text-[11px] ink3 flex flex-wrap gap-x-6 gap-y-2 justify-between">
          <div>Sources: RBA, AusPayNet, BIS, Treasury, ACCC, scheme disclosures, EU IFR studies.</div>
          <div>
            All variables anchored to public data · {TOPICS.length} topics · {ROLES.length} roles · 8 KPIs × 3 horizons
          </div>
        </div>
        <div className="mt-4 text-[10.5px] ink3 flex justify-end">
          <button onClick={onLegal} className="hover:text-white transition underline-offset-2 hover:underline">
            Privacy, Terms &amp; Disclaimer
          </button>
        </div>
      </main>
    </div>
  );
}
