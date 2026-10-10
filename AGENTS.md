# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

**Mid-migration to Tailwind CSS v4 + shadcn/ui.** Phase 1 (tooling and theming) is done. Sections still use their legacy sibling `.css` files until they are migrated. The target state:

- **UI components come only from the shadcn CLI** (`npx shadcn@latest add <name>`), never hand-written. They land in `src/components/ui/` (lowercase, CLI-owned). Restyle them through tokens or `className`, not by editing the generated files. Feature components compose them and keep the `src/components/<Name>/<Name>.tsx` layout.
- Layout and typography use Tailwind utilities, with no new `.css` files. Use `cn()` from `@/lib/utils` (re-exported from the `cn` package) for conditional classes. The `@/*` alias points to `src/`.
- `components.json`: Radix base, `vega` preset, neutral base color, CSS file `src/styles/globals.css`.

Legacy `.css` class names share one global namespace, so prefix any you touch with the component's name.

**Tokens:** `src/styles/variables.css` is the single source of truth for color, type and size. It holds the shadcn tokens (`--background`, `--primary`, `--muted-foreground`, `--border`, `--ring`…), plus `--highlight` (red accent), `--strong`, `--border-strong`, `--status-*`, `--fs-base/sm/xs` and `--max-width`. Fonts (`--font-sans`, `--font-serif`) live in its `@theme` block. `globals.css` maps the tokens to Tailwind colors in `@theme inline`, so utilities like `bg-muted`, `text-highlight` and `bg-status-offer/10` work. **No raw hex outside `variables.css`.** The old names (`--bg-*`, `--text-primary`, `--accent-color`, `--border-color`…) are temporary aliases for unmigrated CSS.

**Intentional theme choices:** `--radius: 0` and every `--shadow-*` set to `none` (the editorial look), light mode only (the `.dark` variant exists but is never applied), serif body text with sans controls and headings.

**Cascade gotchas:**
- Never define `--text-*` in `:root`. That namespace is Tailwind's font-size scale, and overriding it silently resizes every shadcn component.
- Global element styles must stay inside `@layer base`. Unlayered CSS beats Tailwind utilities.
- `.container` is deliberately unlayered so it beats Tailwind's own `container` utility. Use `mx-auto max-w-(--max-width) px-8 max-md:px-4` in migrated code instead.
- Form controls get `line-height: normal` in the base layer. Preflight would otherwise inherit the body's 1.6 and make legacy inputs taller.

### TypeScript state

`tsconfig.app.json` is `strict` with `noUnusedLocals`/`noUnusedParameters`, so unused variables break `npm run build`. ESLint bans `@ts-nocheck` and `any`, so type new code properly.

### Feature-specific notes

**Analytics** (`src/utils/analytics.ts`, called from `main.tsx`): fetches the visitor's IP from `api.ipify.org`, and skips injecting the gtag script for one hardcoded IP (the owner's, to avoid self-tracking). It is `async`, so GA loads a network round trip after mount.

**JobTracker**: state is `localStorage` only, key `job-tracker-jobs`. `PasswordGate` is presentation-level privacy, not access control: it stores a non-cryptographic 32-bit hash under `job-tracker-password-hash` and the *first* visitor sets the password. The bundle and the data are fully client-side.

### SEO files

`public/` is the only directory Vite copies to `dist/`. `public/robots.txt` advertises `https://harinder.dev/sitemap.xml`, but `sitemap.xml` sits at the repo root, so **it is not in `dist/` and 404s in production**. Move it to `public/` when touching SEO.
