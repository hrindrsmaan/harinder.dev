# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # tsc -b && vite build  -> dist/
npm run lint       # eslint . (flat config, TS + react-hooks + react-refresh)
npm run preview    # serve the built dist/

docker compose up --build   # multi-stage build -> nginx on http://localhost:3000
```

There is no test framework configured — no test runner, no test files. `npm run build` (type-check + bundle) and `npm run lint` are the only verification gates.

## Architecture

Static single-page portfolio: React 19 + TypeScript + Vite, no backend, no data fetching beyond one IP lookup. Packaged as an nginx image (`Dockerfile` + `nginx.conf`) for deployment (e.g. to GCP); Nginx provides the SPA fallback rewrite to `index.html`.

`src/App.tsx` is the whole app shell: `Header` + `<Routes>` + `Footer`. Two routes:

- `/` — the portfolio, composed of section components (`Hero`, `Experience`, `Education`, `Projects`, `Contact`) rendered in sequence
- `/job-tracker` — `JobTrackerPage` (= `PasswordGate` wrapping `JobTracker`)

**Content lives in `src/data/`, not in components.** `portfolio.ts` (bio, socials, experience, education) and `projects.ts` are plain exported objects/arrays that the section components map over. Copy edits, a new job, or a new project belong there.

**Adding a route requires three edits, not one:** the `<Route>` in `App.tsx`, the `switch` in `src/hooks/useCanonicalUrl.ts` (otherwise the page canonicalizes to the site root), and `sitemap.xml`.

### Component and styling convention

Every component is `src/components/<Name>/<Name>.tsx` plus a sibling `<Name>.css` imported by that `.tsx`. Plain CSS with hand-written semantic class names (`.job-card`, `.hero-title`) — no CSS modules, no `styled-components`, so **all class names share one global namespace**; prefix new ones with the component's name.

`src/styles/variables.css` is the single source of truth for color and type: it is `@import`ed on the first line of `globals.css` (which `App.tsx` imports), and **every component stylesheet now references tokens only — no raw hex outside `variables.css`**. Keep it that way: a new color or size belongs in `:root`, not inline. Token set: `--bg-*`, `--text-*` (also `--text-base`/`--text-sm`/`--text-xs` sizes), `--border-color`/`--border-dark`/`--border-strong`, `--accent-color`, `--font-sans`/`--font-serif`, `--max-width`.

### TypeScript state

`tsconfig.app.json` is `strict` with `noUnusedLocals`/`noUnusedParameters`, so unused variables break `npm run build`. Prefer typing new code properly rather than adding `@ts-nocheck`.

### Feature-specific notes

**Analytics** (`src/utils/analytics.ts`, called from `main.tsx`): fetches the visitor's IP from `api.ipify.org`, and skips injecting the gtag script for one hardcoded IP (the owner's, to avoid self-tracking). It is `async`, so GA loads a network round trip after mount.

**JobTracker**: state is `localStorage` only, key `job-tracker-jobs`. `PasswordGate` is presentation-level privacy, not access control: it stores a non-cryptographic 32-bit hash under `job-tracker-password-hash` and the *first* visitor sets the password. The bundle and the data are fully client-side.

### SEO files

`public/` is the only directory Vite copies to `dist/`. `public/robots.txt` advertises `https://harinder.dev/sitemap.xml`, but `sitemap.xml` sits at the repo root, so **it is not in `dist/` and 404s in production**. Move it to `public/` when touching SEO.
