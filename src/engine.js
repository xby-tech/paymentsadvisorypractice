import { KPIS, ROLE_KPI, RAMP } from './data.js';

function normalize(v, def, min, max) {
  if (v >= def) return (v - def) / Math.max(1e-9, (max - def));
  return (v - def) / Math.max(1e-9, (def - min));
}

export function computeOutcomes(topic, sliderState, archetype) {
  const roleW = ROLE_KPI[archetype];
  const horizons = ['short', 'med', 'long'];
  const out = { short: {}, med: {}, long: {} };
  KPIS.forEach((k) => horizons.forEach((h) => (out[h][k.id] = 0)));
  topic.variables.forEach((v) => {
    const val = sliderState[v.id] ?? v.default;
    const n = normalize(val, v.default, v.min, v.max);
    horizons.forEach((h) => {
      Object.entries(v.effects).forEach(([kpi, eff]) => {
        out[h][kpi] += eff * n * v.weight * RAMP[h];
      });
    });
  });
  const result = { short: {}, med: {}, long: {} };
  horizons.forEach((h) => {
    KPIS.forEach((k) => {
      const [w, sign] = roleW[k.id];
      const raw = out[h][k.id];
      result[h][k.id] = raw * sign * w;
    });
  });
  return result;
}

export function fmtVal(v, x) {
  if (v.unit === '%' || v.unit === '% opex' || v.unit === '% of opex') return `${Number(x).toFixed(0)}%`;
  if (v.unit === 'bps') return `${Number(x).toFixed(0)} bps`;
  if (v.unit === 'cents') return `${Number(x).toFixed(2)}¢`;
  if (v.unit === '$m/yr') return `$${Number(x).toFixed(0)}m`;
  if (v.unit === 'hours') return `${Number(x).toFixed(0)}h`;
  if (v.unit === 'count') return `${Number(x).toFixed(0)}`;
  if (v.unit && v.unit.startsWith('index')) return Number(x).toFixed(0);
  return `${x}`;
}
