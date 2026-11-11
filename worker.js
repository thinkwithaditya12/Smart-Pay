// Static SPA host: SPA fallback is handled by `spa: true` in deploy.json.
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
