import React from 'react';
import { ARCHETYPES, ROLES } from '../data.js';

function Pitch({ num, title, body }) {
  return (
    <div>
      <div className="font-mono text-[10px] ink3 tracking-[0.2em]">{num}</div>
      <div className="font-display text-[20px] mt-2 mb-2">{title}</div>
      <div className="text-[13.5px] ink2 leading-relaxed">{body}</div>
    </div>
  );
}

export default function Landing({ roleId, setRoleId, onEnter }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="landing-bg"></div>
      <div className="landing-grid"></div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 pt-12 pb-20">
        <div className="flex items-center justify-between reveal">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7cf2c8] to-[#5ec2ff]" />
            <div className="font-display text-[15px] tracking-tight">
              Payments Strategy <span className="ink3">·</span> <span className="ink2">Scenario Engine</span>
            </div>
          </div>
          <div className="text-[11px] ink3 flex items-center gap-2">
            <span className="pulse-dot"></span> Public-data anchored · Live model
          </div>
        </div>

        <div className="mt-28 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.25em] ink3 reveal reveal-2">
            Applied AI × Australian Payments
          </div>
          <h1 className="font-display text-[40px] sm:text-[56px] md:text-[88px] leading-[0.95] grad-text mt-5 reveal reveal-2">
            Payments strategy,
            <br />
            recomputed in real time.
          </h1>
          <p className="text-[19px] leading-relaxed ink2 mt-8 max-w-2xl reveal reveal-3">
            Ten forward-looking topics in Australian payments. Public-data anchored variables. Move the levers, see the
            scenario reshape across short, medium and long term, through the lens of <span className="text-white">your role</span>{' '}
            in the ecosystem.
          </p>
        </div>

        <div className="mt-16 reveal reveal-4">
          <div className="text-[11px] uppercase tracking-[0.2em] ink3 mb-3">Choose your vantage point</div>
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full appearance-none bg-[#0d0f13] border hairline rounded-2xl px-5 py-5 text-[16px] focus:outline-none focus:border-[#7cf2c8] transition pr-12"
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
              <div className="absolute right-5 top-1/2 -translate-y-1/2 ink3 pointer-events-none">▾</div>
            </div>
            <button
              onClick={onEnter}
              className="group px-8 py-5 rounded-2xl text-[16px] font-medium text-[#08090b] bg-gradient-to-r from-[#7cf2c8] to-[#5ec2ff] hover:shadow-[0_20px_60px_-20px_rgba(124,242,200,0.6)] transition-all"
            >
              Enter the model{' '}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-10 reveal reveal-5">
          <Pitch num="01" title="Ten topics" body="From agentic commerce and PayTo to scheme fee transparency, BNPL, CDR and AI fraud, the topics defining the next decade of Australian payments." />
          <Pitch num="02" title="Variables that move" body="Each topic exposes 4 to 5 high-impact levers anchored in RBA, AusPayNet, BIS and EU IFR data. Drag them. The model recomputes." />
          <Pitch num="03" title="Outcomes by role" body="Same scenario, twenty roles. A regulator and a fintech see the same lever push different KPIs across short, medium and long term." />
        </div>

        <div className="mt-24 text-center reveal reveal-5">
          <div className="text-[11px] ink3 italic">
            What was once a $400k consulting engagement is now a sixty-second interaction.
          </div>
        </div>
      </div>
    </div>
  );
}
