// PPTX strategy deck builder. Lazy-imported on click from SoWhatPanel.
// Builds a 6-slide deck capturing the current scenario + Grok-generated brief.
import { fmtVal } from '../engine.js';
import { KPIS } from '../data.js';

const COLOR = {
  bg: '08090B',
  panel: '11141A',
  line: '1C2029',
  ink: 'F5F6F8',
  ink2: '9AA1AD',
  ink3: '5B6271',
  accent: '7CF2C8',
  accent2: '5EC2FF',
  bad: 'FF6B8A',
  warn: 'FFB86B',
  ctx: '5EC2FF',
};

const FONT = 'Calibri';

function todayStr() {
  const d = new Date();
  return d.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

function topMovers(horizonResult, n = 4) {
  return Object.entries(horizonResult)
    .map(([k, v]) => ({ k, v, label: KPIS.find((x) => x.id === k)?.label || k }))
    .sort((a, b) => Math.abs(b.v) - Math.abs(a.v))
    .slice(0, n);
}

function horizonScore(horizonResult) {
  return Object.values(horizonResult).reduce((a, b) => a + b, 0);
}

function verdict(score) {
  const s = Math.max(-6, Math.min(6, score));
  const norm = s / 6;
  if (norm > 0.5) return 'Strongly favourable';
  if (norm > 0.15) return 'Favourable';
  if (norm > -0.15) return 'Neutral';
  if (norm > -0.5) return 'Adverse';
  return 'Strongly adverse';
}

function fmtSigned(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(2);
}

function addAccentBar(slide) {
  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: COLOR.accent } });
}

function addFooter(slide, leftText, rightText) {
  slide.addShape('line', {
    x: 0.5,
    y: 7.0,
    w: 12.33,
    h: 0,
    line: { color: COLOR.line, width: 0.5 },
  });
  slide.addText(leftText, {
    x: 0.5,
    y: 7.05,
    w: 6,
    h: 0.3,
    fontFace: FONT,
    fontSize: 8,
    color: COLOR.ink3,
    charSpacing: 1.5,
  });
  slide.addText(rightText, {
    x: 6.83,
    y: 7.05,
    w: 6,
    h: 0.3,
    fontFace: FONT,
    fontSize: 8,
    color: COLOR.ink3,
    align: 'right',
    charSpacing: 1.5,
  });
}

function addSlideNum(slide, num) {
  slide.addText(num, {
    x: 12.33,
    y: 0.15,
    w: 0.9,
    h: 0.25,
    fontFace: FONT,
    fontSize: 8,
    color: COLOR.ink3,
    align: 'right',
    charSpacing: 1.5,
  });
}

// ---- Slide builders ----

function slideCover(pptx, { topic, role, intensity, topicIndex }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '01 / 06');

  // Giant topic numeral watermark
  s.addText(String(topicIndex + 1).padStart(2, '0'), {
    x: 7.5,
    y: 1.2,
    w: 5.5,
    h: 4.5,
    fontFace: FONT,
    fontSize: 280,
    color: COLOR.accent,
    bold: true,
    align: 'right',
    transparency: 92,
  });

  s.addText('Applied AI x Australian Payments', {
    x: 0.6,
    y: 1.5,
    w: 12,
    h: 0.4,
    fontFace: FONT,
    fontSize: 11,
    color: COLOR.ink3,
    charSpacing: 3,
  });

  s.addText(topic.title, {
    x: 0.6,
    y: 2.0,
    w: 11,
    h: 2.0,
    fontFace: FONT,
    fontSize: 54,
    color: COLOR.ink,
    bold: true,
    valign: 'top',
  });

  s.addText('Strategy lens · ' + role.label, {
    x: 0.6,
    y: 4.3,
    w: 11,
    h: 0.4,
    fontFace: FONT,
    fontSize: 14,
    color: COLOR.accent,
  });

  s.addText(
    [
      { text: 'Generated ', options: { color: COLOR.ink3 } },
      { text: todayStr(), options: { color: COLOR.ink2, bold: true } },
      { text: '   ·   Scenario intensity ', options: { color: COLOR.ink3 } },
      { text: `${intensity}%`, options: { color: COLOR.ink2, bold: true } },
    ],
    { x: 0.6, y: 6.2, w: 12, h: 0.3, fontFace: FONT, fontSize: 11, charSpacing: 1 }
  );
  s.addText('Payments Strategy Scenario Engine · aussiepay.netlify.app', {
    x: 0.6,
    y: 6.5,
    w: 12,
    h: 0.3,
    fontFace: FONT,
    fontSize: 10,
    color: COLOR.ink3,
    charSpacing: 1,
  });
}

function slideScenario(pptx, { topic, plan }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '02 / 06');

  s.addText('THE SCENARIO', {
    x: 0.6,
    y: 0.5,
    w: 12,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 3,
  });
  s.addText('Why this topic matters', {
    x: 0.6,
    y: 0.8,
    w: 12,
    h: 0.7,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: COLOR.ink,
  });
  s.addText(topic.hero, {
    x: 0.6,
    y: 1.55,
    w: 12.2,
    h: 0.7,
    fontFace: FONT,
    fontSize: 12,
    color: COLOR.ink2,
  });

  // Three brief tiles, each: header chip + quote line + 3 bullets
  const tiles = [
    { key: 'opportunity', label: 'OPPORTUNITY', color: COLOR.accent, dotColor: COLOR.accent },
    { key: 'problem', label: 'PROBLEM', color: COLOR.bad, dotColor: COLOR.bad },
    { key: 'context', label: 'CONTEXT', color: COLOR.ctx, dotColor: COLOR.ctx },
  ];
  const tileW = 4.05;
  const gap = 0.18;
  const startX = 0.6;
  const tileY = 2.4;
  const tileH = 4.4;

  tiles.forEach((t, i) => {
    const x = startX + i * (tileW + gap);
    s.addShape('roundRect', {
      x,
      y: tileY,
      w: tileW,
      h: tileH,
      fill: { color: COLOR.panel },
      line: { color: COLOR.line, width: 0.5 },
      rectRadius: 0.12,
    });
    s.addShape('ellipse', {
      x: x + 0.3,
      y: tileY + 0.32,
      w: 0.1,
      h: 0.1,
      fill: { color: t.dotColor },
      line: { color: t.dotColor, width: 0 },
    });
    s.addText(t.label, {
      x: x + 0.45,
      y: tileY + 0.22,
      w: tileW - 0.6,
      h: 0.3,
      fontFace: FONT,
      fontSize: 9,
      color: COLOR.ink3,
      charSpacing: 3,
      bold: true,
    });

    const slot = plan?.slide_2?.[t.key];
    const quote = slot?.quote ? `"${slot.quote.replace(/^"|"$/g, '')}"` : '';
    s.addText(quote, {
      x: x + 0.3,
      y: tileY + 0.6,
      w: tileW - 0.6,
      h: 1.2,
      fontFace: FONT,
      fontSize: 18,
      bold: true,
      color: t.color,
      valign: 'top',
    });

    const bullets = slot?.bullets || [];
    s.addText(
      bullets.map((b) => ({ text: b, options: { bullet: { code: '25B8' }, color: COLOR.ink, paraSpaceAfter: 6 } })),
      {
        x: x + 0.3,
        y: tileY + 1.95,
        w: tileW - 0.5,
        h: tileH - 2.2,
        fontFace: FONT,
        fontSize: 11,
        color: COLOR.ink,
        valign: 'top',
      }
    );
  });

  addFooter(s, 'Payments Strategy Scenario Engine', 'Slide 02 · The scenario');
}

function slideLevers(pptx, { topic, sliders, intensity }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '03 / 06');

  s.addText('SCENARIO VARIABLES', {
    x: 0.6,
    y: 0.5,
    w: 9,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 3,
  });
  s.addText('Levers moved from baseline', {
    x: 0.6,
    y: 0.8,
    w: 9,
    h: 0.7,
    fontFace: FONT,
    fontSize: 30,
    bold: true,
    color: COLOR.ink,
  });

  s.addText(`${intensity}%`, {
    x: 10.5,
    y: 0.65,
    w: 2.3,
    h: 0.7,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: COLOR.accent,
    align: 'right',
  });
  s.addText('SCENARIO INTENSITY', {
    x: 10.5,
    y: 1.3,
    w: 2.3,
    h: 0.3,
    fontFace: FONT,
    fontSize: 8,
    color: COLOR.ink3,
    align: 'right',
    charSpacing: 2.5,
  });

  // Table of levers
  const rows = [
    [
      { text: 'LEVER QUESTION', options: { fontFace: FONT, fontSize: 9, color: COLOR.ink3, bold: true } },
      { text: 'BASELINE', options: { fontFace: FONT, fontSize: 9, color: COLOR.ink3, bold: true, align: 'right' } },
      { text: 'SCENARIO', options: { fontFace: FONT, fontSize: 9, color: COLOR.ink3, bold: true, align: 'right' } },
      { text: 'Δ', options: { fontFace: FONT, fontSize: 9, color: COLOR.ink3, bold: true, align: 'right' } },
    ],
  ];
  topic.variables.forEach((v) => {
    const cur = sliders[v.id];
    const range = v.max - v.min;
    const deltaPct = range > 0 ? Math.round(((cur - v.default) / range) * 100) : 0;
    const deltaStr = Math.abs(deltaPct) < 1 ? 'flat' : `${deltaPct > 0 ? '+' : ''}${deltaPct}%`;
    const deltaColor = Math.abs(deltaPct) < 1 ? COLOR.ink3 : deltaPct > 0 ? COLOR.accent : COLOR.bad;
    rows.push([
      {
        text: [
          { text: v.name + '\n', options: { color: COLOR.ink, fontSize: 11 } },
          { text: v.anchor || '', options: { color: COLOR.ink3, fontSize: 8, italic: true } },
        ],
        options: { fontFace: FONT, valign: 'middle' },
      },
      { text: fmtVal(v, v.default), options: { fontFace: FONT, fontSize: 11, color: COLOR.ink2, align: 'right', valign: 'middle' } },
      { text: fmtVal(v, cur), options: { fontFace: FONT, fontSize: 11, color: COLOR.ink, align: 'right', valign: 'middle', bold: true } },
      { text: deltaStr, options: { fontFace: FONT, fontSize: 11, color: deltaColor, align: 'right', valign: 'middle', bold: true } },
    ]);
  });
  s.addTable(rows, {
    x: 0.6,
    y: 1.9,
    w: 12.2,
    colW: [7.5, 1.5, 1.6, 1.6],
    border: { type: 'solid', pt: 0.5, color: COLOR.line },
    rowH: 0.55,
    fill: { color: COLOR.bg },
  });

  addFooter(s, 'Payments Strategy Scenario Engine', 'Slide 03 · Variables');
}

function slideOutcomes(pptx, { result, plan }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '04 / 06');

  s.addText('OUTCOME SURFACE', {
    x: 0.6,
    y: 0.45,
    w: 12,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 3,
  });
  s.addText('How this reshapes your world', {
    x: 0.6,
    y: 0.75,
    w: 12,
    h: 0.6,
    fontFace: FONT,
    fontSize: 28,
    bold: true,
    color: COLOR.ink,
  });

  // Scenario interpretation strip
  if (plan?.slide_4?.scenario_take) {
    s.addShape('rect', {
      x: 0.6,
      y: 1.45,
      w: 0.06,
      h: 0.95,
      fill: { color: COLOR.accent },
      line: { color: COLOR.accent, width: 0 },
    });
    s.addText('AI INFERENCE · SCENARIO INTERPRETATION', {
      x: 0.78,
      y: 1.48,
      w: 12,
      h: 0.25,
      fontFace: FONT,
      fontSize: 8,
      color: COLOR.accent,
      bold: true,
      charSpacing: 2.5,
    });
    s.addText(plan.slide_4.scenario_take, {
      x: 0.78,
      y: 1.72,
      w: 12.05,
      h: 0.7,
      fontFace: FONT,
      fontSize: 10.5,
      color: COLOR.ink,
    });
  }

  // Three horizon cards
  const horizons = [
    { key: 'short', label: 'SHORT TERM', sub: '0 to 12 months' },
    { key: 'med', label: 'MEDIUM TERM', sub: '1 to 3 years' },
    { key: 'long', label: 'LONG TERM', sub: '3 to 7 years' },
  ];
  const cardW = 4.05;
  const gap = 0.18;
  const startX = 0.6;
  const cardY = 2.55;
  const cardH = 4.3;

  horizons.forEach((h, i) => {
    const x = startX + i * (cardW + gap);
    const score = horizonScore(result[h.key]);
    const good = score >= 0;
    const verd = verdict(score);
    s.addShape('roundRect', {
      x,
      y: cardY,
      w: cardW,
      h: cardH,
      fill: { color: COLOR.panel },
      line: { color: good ? COLOR.accent : COLOR.bad, width: 0.75 },
      rectRadius: 0.12,
    });
    s.addText(h.label, {
      x: x + 0.25,
      y: cardY + 0.2,
      w: 2.4,
      h: 0.25,
      fontFace: FONT,
      fontSize: 9,
      color: COLOR.ink3,
      charSpacing: 2.5,
    });
    s.addText(h.sub, {
      x: x + 0.25,
      y: cardY + 0.42,
      w: 2.4,
      h: 0.22,
      fontFace: FONT,
      fontSize: 8,
      color: COLOR.ink3,
      italic: true,
    });
    s.addText(verd, {
      x: x + 0.25,
      y: cardY + 0.2,
      w: cardW - 0.5,
      h: 0.25,
      fontFace: FONT,
      fontSize: 8,
      color: good ? COLOR.accent : COLOR.bad,
      bold: true,
      align: 'right',
      charSpacing: 2,
    });
    s.addText(fmtSigned(score), {
      x: x + 0.25,
      y: cardY + 0.75,
      w: cardW - 0.5,
      h: 0.85,
      fontFace: FONT,
      fontSize: 38,
      bold: true,
      color: good ? COLOR.accent : COLOR.bad,
    });
    s.addText('role-weighted net score', {
      x: x + 0.25,
      y: cardY + 1.65,
      w: cardW - 0.5,
      h: 0.22,
      fontFace: FONT,
      fontSize: 8,
      color: COLOR.ink3,
    });

    // KPI movers
    const movers = topMovers(result[h.key], 3);
    movers.forEach((m, mi) => {
      s.addText(m.label, {
        x: x + 0.25,
        y: cardY + 1.95 + mi * 0.28,
        w: 2.0,
        h: 0.24,
        fontFace: FONT,
        fontSize: 9,
        color: COLOR.ink2,
      });
      s.addText(fmtSigned(m.v), {
        x: x + cardW - 1.0,
        y: cardY + 1.95 + mi * 0.28,
        w: 0.75,
        h: 0.24,
        fontFace: FONT,
        fontSize: 9,
        color: m.v >= 0 ? COLOR.accent : COLOR.bad,
        bold: true,
        align: 'right',
      });
    });

    // AI inference paragraph
    const commentary = plan?.slide_4?.horizon_commentary?.[h.key];
    if (commentary) {
      s.addShape('line', {
        x: x + 0.25,
        y: cardY + 2.95,
        w: cardW - 0.5,
        h: 0,
        line: { color: COLOR.line, width: 0.5 },
      });
      s.addText('AI INFERENCE', {
        x: x + 0.25,
        y: cardY + 3.05,
        w: cardW - 0.5,
        h: 0.22,
        fontFace: FONT,
        fontSize: 8,
        color: COLOR.accent,
        bold: true,
        charSpacing: 2,
      });
      s.addText(commentary, {
        x: x + 0.25,
        y: cardY + 3.27,
        w: cardW - 0.5,
        h: 0.95,
        fontFace: FONT,
        fontSize: 9,
        color: COLOR.ink,
        valign: 'top',
      });
    }
  });

  addFooter(s, 'Payments Strategy Scenario Engine', 'Slide 04 · Outcomes');
}

function slidePlay(pptx, { plan }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '05 / 06');

  s.addText('SO WHAT, YOUR MOVE', {
    x: 0.6,
    y: 0.5,
    w: 12,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 3,
  });
  s.addText('The actionable play', {
    x: 0.6,
    y: 0.8,
    w: 12,
    h: 0.7,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: COLOR.ink,
  });

  const horizons = [
    { key: 'short', label: 'SHORT TERM', sub: '0 to 12 months' },
    { key: 'med', label: 'MEDIUM TERM', sub: '1 to 3 years' },
    { key: 'long', label: 'LONG TERM', sub: '3 to 7 years' },
  ];
  const cardW = 4.05;
  const gap = 0.18;
  const startX = 0.6;
  const cardY = 1.7;
  const cardH = 5.15;

  horizons.forEach((h, i) => {
    const x = startX + i * (cardW + gap);
    const p = plan?.[h.key] || {};
    s.addShape('roundRect', {
      x,
      y: cardY,
      w: cardW,
      h: cardH,
      fill: { color: COLOR.panel },
      line: { color: COLOR.line, width: 0.5 },
      rectRadius: 0.12,
    });
    s.addText(h.label, {
      x: x + 0.3,
      y: cardY + 0.22,
      w: cardW - 0.6,
      h: 0.25,
      fontFace: FONT,
      fontSize: 9,
      color: COLOR.ink3,
      charSpacing: 2.5,
    });
    s.addText(h.sub, {
      x: x + 0.3,
      y: cardY + 0.45,
      w: cardW - 0.6,
      h: 0.22,
      fontFace: FONT,
      fontSize: 8,
      color: COLOR.ink3,
      italic: true,
    });
    s.addText(p.headline || '', {
      x: x + 0.3,
      y: cardY + 0.8,
      w: cardW - 0.6,
      h: 1.0,
      fontFace: FONT,
      fontSize: 15,
      bold: true,
      color: COLOR.ink,
      valign: 'top',
    });
    const actions = (p.actions || []).map((a) => ({
      text: a,
      options: { bullet: { code: '25B8' }, color: COLOR.ink, paraSpaceAfter: 6 },
    }));
    s.addText(actions, {
      x: x + 0.3,
      y: cardY + 1.95,
      w: cardW - 0.55,
      h: 2.4,
      fontFace: FONT,
      fontSize: 10.5,
      color: COLOR.ink,
      valign: 'top',
    });
    s.addShape('line', {
      x: x + 0.3,
      y: cardY + 4.4,
      w: cardW - 0.6,
      h: 0,
      line: { color: COLOR.line, width: 0.5 },
    });
    s.addText(
      [
        { text: 'RISK   ', options: { color: COLOR.bad, bold: true, fontSize: 8, charSpacing: 2.5 } },
        { text: p.risk || '', options: { color: COLOR.ink2, fontSize: 10 } },
      ],
      { x: x + 0.3, y: cardY + 4.5, w: cardW - 0.6, h: 0.55, fontFace: FONT, valign: 'top' }
    );
  });

  addFooter(s, 'Generated by Grok grok-4-1-fast · Strategy starting point, not advice', 'Slide 05 · The play');
}

function slideSources(pptx, { topic, shareUrl }) {
  const s = pptx.addSlide();
  s.background = { color: COLOR.bg };
  addAccentBar(s);
  addSlideNum(s, '06 / 06');

  s.addText('ANCHORS', {
    x: 0.6,
    y: 0.5,
    w: 12,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 3,
  });
  s.addText('Sources & disclaimer', {
    x: 0.6,
    y: 0.8,
    w: 12,
    h: 0.7,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: COLOR.ink,
  });

  s.addText('PUBLIC-DATA ANCHORS', {
    x: 0.6,
    y: 1.9,
    w: 6,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 2.5,
    bold: true,
  });
  const generic = [
    'RBA Retail Payments Statistics (quarterly)',
    'RBA Review of Retail Payments Regulation, 2026',
    'AusPayNet device and tokenisation reporting',
    'BIS Project Mandala briefings, 2024 to 2025',
    'EU Interchange Fee Regulation impact studies',
    'Treasury, ACCC, scheme public disclosures',
  ];
  s.addText(
    generic.map((g) => ({ text: g, options: { bullet: { code: '00B7' }, color: COLOR.ink2, paraSpaceAfter: 4 } })),
    { x: 0.6, y: 2.2, w: 6, h: 3, fontFace: FONT, fontSize: 11 }
  );

  s.addText(`TOPIC ANCHORS · ${topic.title.toUpperCase()}`, {
    x: 6.9,
    y: 1.9,
    w: 6,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLOR.ink3,
    charSpacing: 2.5,
    bold: true,
  });
  const topicAnchors = (topic.variables || []).map((v) => v.anchor).filter(Boolean).slice(0, 6);
  s.addText(
    topicAnchors.map((a) => ({ text: a, options: { bullet: { code: '00B7' }, color: COLOR.ink2, paraSpaceAfter: 4 } })),
    { x: 6.9, y: 2.2, w: 6, h: 3, fontFace: FONT, fontSize: 11 }
  );

  s.addShape('line', { x: 0.6, y: 5.7, w: 12.2, h: 0, line: { color: COLOR.line, width: 0.5 } });
  s.addText(
    [
      { text: 'Disclaimer. ', options: { bold: true, color: COLOR.ink2 } },
      {
        text:
          'Generated by the Payments Strategy Scenario Engine. The strategic brief is produced by an LLM (Grok grok-4-1-fast) from your scenario state and is a starting point for discussion, not professional advice. All quantitative anchors are public-source estimates. Use at your own discretion.',
        options: { color: COLOR.ink3 },
      },
    ],
    { x: 0.6, y: 5.85, w: 12.2, h: 0.7, fontFace: FONT, fontSize: 9 }
  );
  s.addText(
    [
      { text: 'Restore this exact scenario:  ', options: { color: COLOR.ink3, fontSize: 9 } },
      { text: shareUrl, options: { color: COLOR.accent2, fontSize: 9 } },
    ],
    { x: 0.6, y: 6.55, w: 12.2, h: 0.4, fontFace: FONT }
  );

  addFooter(s, 'Payments Strategy Scenario Engine', 'Slide 06 · Sources');
}

// Main entry: build and trigger download
export async function exportDeck({ topic, role, sliders, result, plan, intensity, topicIndex, shareUrl }) {
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches, 16:9
  pptx.author = 'Payments Strategy Scenario Engine';
  pptx.title = `${topic.title} · ${role.label}`;

  slideCover(pptx, { topic, role, intensity, topicIndex });
  slideScenario(pptx, { topic, plan });
  slideLevers(pptx, { topic, sliders, intensity });
  slideOutcomes(pptx, { result, plan });
  slidePlay(pptx, { plan });
  slideSources(pptx, { topic, shareUrl });

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fname = `payments-scenario-${topic.id}-${role.id}-${today}.pptx`;
  await pptx.writeFile({ fileName: fname });
}
