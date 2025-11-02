SANDBOX CONSOLE

A small developer-facing console built for the Zama technical challenge.
It simulates a gateway interface where users can sign in, manage fake API keys, and view basic usage analytics — all with synthetic, client-side data only.

🚀 Stack

React 18 + TypeScript – SPA with simple state management via hooks
Vite – lightweight, fast local dev setup
Playwright – end-to-end tests covering happy paths
LocalStorage – persistent mock data, no backend
Chart.js – simple analytics visualization
Vercel – for easy deployment and preview

🧭 Design decisions

Local-first approach: all data (auth, keys, usage) is generated client-side for speed and isolation.
Hooks & separation of concerns: stateful logic decoupled from rendering.
Simulates an actual backend API through localStorage updates.
Playwright testing: each user path behaves like a real session.
Minimal CSS: no framework, reusable classes for consistency.

✨ Data and feature flag

All analytics are fully synthetic.
A small local JSON file (usage-data.json) provides daily request counts and status codes.
API keys are generated locally using a simple utility that encodes a random UUID — no external service is ever called.

A visible toggle called “Compact mode” simulates a feature rollout.
When enabled, it reduces paddings and margins across the UI, illustrating how a product team could gradually release layout changes or new display modes without redeploying the whole app.

🧠 If I had more time

Add unit tests for pure logic (e.g. generateKey() or a reducer version of API keys).
Implement mobile-first responsive layout and improve accessibility contrast.
Add real routing protection (redirects for expired mock tokens).
Extend the feature flag system to simulate multiple rollout scenarios (e.g. new analytics view).
Enrich analytics with more synthetic dimensions (status codes, latency, etc.).

🤖 AI coding assistance

Used ChatGPT (GPT-5) as a coding assistant for refactors, hooks, and test debugging.s.
Some generated solutions were over-engineered or visually inconsistent.
Helpful for speed and structure final design choices were human-driven.

🧩 Run locally

pnpm install
pnpm dev        # start dev server (localhost:5173)
pnpm build      # build for production
pnpm preview    # preview build on localhost:4173
pnpm test:e2e   # run Playwright tests