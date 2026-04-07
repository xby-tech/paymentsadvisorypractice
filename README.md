# Payments Strategy Scenario Engine

An interactive scenario dashboard covering ten forward looking topics in Australian payments. Public data anchored variables, role aware briefings, live outcome surface across short, medium and long term horizons.

## Stack

Single page static site. No build step.

React 18 (UMD), Tailwind (CDN), Recharts (UMD), Babel Standalone for in browser JSX. Everything loads from public CDNs over HTTPS.

## Run locally

Any static server works. Two easy options.

Python:
```
python -m http.server 8000
```

Node:
```
npx serve .
```

Then open http://localhost:8000.

Do not open `index.html` directly via the file:// protocol. Some browsers block local CDN script loads under file:// origins.

## Deploy

This repo is Netlify ready. The included `netlify.toml` sets the publish directory and a permissive Content Security Policy that allows the CDN scripts to load.

Two ways to deploy.

Drag and drop: open app.netlify.com, choose "Add new site, Deploy manually", drag this folder onto the drop zone.

Continuous deploy: push this repo to GitHub, then in Netlify choose "Add new site, Import from Git", pick the repo, and accept the defaults. Every push to `main` triggers a redeploy.

## Project layout

```
.
├── index.html        single page app, all data and logic inline
├── netlify.toml      publish dir + CSP headers
└── README.md
```

All scenario data, role definitions, KPI weights, and the outcome engine live in `index.html` inside the `<script type="text/babel">` block. Search for `TOPICS`, `ROLES`, `KPIS`, `ROLE_KPI`, `computeOutcomes`.

## Editing content

Topics, variables, and briefings are plain JavaScript objects in the `TOPICS` array. Each topic has:

```
{
  id, title, tagline, hero,
  briefing: { archetype: { opportunity, problem, context } },
  variables: [
    { id, name, unit, anchor, source, min, max, default, weight, effects: { kpi: delta } }
  ]
}
```

The seven archetypes (`incumbent_fi`, `challenger`, `acquiring`, `network`, `merchant`, `regulator`, `investor`) each get their own briefing copy. Twenty roles map onto those seven archetypes via the `ROLES` array.

The outcome engine in `computeOutcomes` multiplies normalized slider deviation by the variable effect, the variable weight, the horizon ramp (`short` 0.35, `med` 0.75, `long` 1.0), and the role KPI weight and sign. Result is a directional score per KPI per horizon.

## License

All rights reserved.
