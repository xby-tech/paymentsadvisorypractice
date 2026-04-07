import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-time middleware that mirrors what the Netlify Function does in prod.
// In production, /api/plan is served by netlify/functions/plan.js (see netlify.toml redirect).
function planDevMiddleware(env) {
  return {
    name: 'plan-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/plan', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        try {
          const chunks = [];
          for await (const c of req) chunks.push(c);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const { handler } = await import('./netlify/functions/plan.js');
          const result = await handler(
            { body: JSON.stringify(body), httpMethod: 'POST' },
            { env }
          );
          res.statusCode = result.statusCode;
          res.setHeader('content-type', 'application/json');
          res.end(result.body);
        } catch (e) {
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: String(e?.message || e) }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Make XAI_API_KEY visible to the dev middleware via process.env
  if (env.XAI_API_KEY) process.env.XAI_API_KEY = env.XAI_API_KEY;
  return {
    plugins: [react(), planDevMiddleware(env)],
    server: { port: 5174 },
  };
});
