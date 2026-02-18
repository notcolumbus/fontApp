# FontPick

FontPick is a developer-first font discovery app built with React, Vite, Tailwind, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Workers (Wrangler) deploy

This repo is configured to deploy as a Worker serving static assets from `dist/` with SPA fallback.

1. Authenticate Wrangler once:

```bash
npx wrangler login
```

2. (Optional) Update the Worker name in `wrangler.toml`:

```toml
name = "fontapp"
```

3. Deploy:

```bash
npm run cf:deploy
```

Useful commands:

```bash
npm run cf:dev    # local Worker + static assets
npm run cf:tail   # stream Worker logs
```
