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

- `/` — the portfolio, composed of section components (`Hero`, `Experience`, `Education`) rendered in sequence; `#contact` is the footer
- `/job-tracker` — `JobTrackerPage` (= `PasswordGate` wrapping `JobTracker`)

**Content lives in `src/data/`, not in components.** `portfolio.ts` (bio, socials, experience, education) holds plain exported objects/arrays that the section components map over. Copy edits or a new job belong there.

**Adding a route requires three edits, not one:** the `<Route>` in `App.tsx`, the `switch` in `src/hooks/useCanonicalUrl.ts` (otherwise the page canonicalizes to the site root), and `sitemap.xml`.

### Component and styling convention

UI is Tailwind CSS v4 + shadcn/ui. There are no component `.css` files and no CSS modules; the only stylesheet is `src/styles/globals.css`.

- **UI components come only from the shadcn CLI** (`npx shadcn@latest add <name>`), never hand-written. They land in `src/components/ui/` (lowercase, CLI-owned). Restyle them through tokens or `className`, not by editing the generated files. If shadcn has no equivalent, compose existing shadcn components and say so rather than inventing one.
- Feature components keep the `src/components/<Name>/<Name>.tsx` layout and style layout/typography with Tailwind utilities inline. Don't add `.css` files. Use `cn()` from `@/lib/utils` (re-exported from the `cn` package) for conditional classes. The `@/*` alias points to `src/`.
- `components.json`: Radix base, `vega` preset, neutral base color, CSS file `src/styles/globals.css`.

**Tokens:** `src/styles/globals.css` is the single source of truth. `:root` holds the shadcn tokens (`--background`, `--primary`, `--muted-foreground`, `--border`, `--ring`…) plus `--highlight` (red accent), `--border-strong`, `--status-*`, `--fs-base`/`--fs-xs` and `--max-width`; fonts and the `md` breakpoint live in `@theme`; `@theme inline` maps tokens to Tailwind colors so utilities like `bg-muted`, `text-highlight`, `border-border-strong` and `bg-status-offer/10` work. **No raw hex outside `globals.css`.** A new color or size belongs in `:root` (and `@theme inline` if it needs a utility), not inline.

**Intentional theme choices:**
- `--radius: 0px` and every `--shadow-*` set to `0 0 #0000` (editorial look: square, flat). Not `none`: Tailwind composes rings and shadows into one `box-shadow` list, and `none` would wipe out card rings and focus rings.
- `--breakpoint-md: 769px`, so `md:`/`max-md:` split at the site's original `max-width: 768px` (768px = iPad portrait stays mobile). The tracker's extra breakpoints use exclusive arbitrary variants: `max-[701px]`, `max-[421px]`, `max-[401px]` mean "≤700/420/400px".
- Light mode only (the `.dark` variant exists but is never applied). Body text is serif; headings and controls are sans.
- The fixed header is `z-40` so shadcn overlays and popovers (`z-50`) render above it.

**Cascade gotchas:**
- Never define `--text-*` in `:root`. That namespace is Tailwind's font-size scale, and overriding it silently resizes every shadcn component.
- Global element styles (`a`, `h1`–`h6`, `p`, `section`) live in `@layer base` so utilities can override them. Unlayered CSS beats Tailwind utilities.
- In Tailwind v4, named sizes like `text-base`/`text-sm` also set line-height. Use arbitrary sizes (`text-[1rem]`) when only the font size should change.
- Form controls get `line-height: normal` in the base layer; preflight would otherwise inherit the body's 1.6.

### TypeScript state

`tsconfig.app.json` is `strict` with `noUnusedLocals`/`noUnusedParameters`, so unused variables break `npm run build`. ESLint bans `@ts-nocheck` and `any`, so type new code properly.

### Feature-specific notes

**Analytics** (`src/utils/analytics.ts`, called from `main.tsx`): fetches the visitor's IP from `api.ipify.org`, and skips injecting the gtag script for one hardcoded IP (the owner's, to avoid self-tracking). It is `async`, so GA loads a network round trip after mount.

**JobTracker**: state is `localStorage` only, key `job-tracker-jobs`. `PasswordGate` is presentation-level privacy, not access control: it stores a non-cryptographic 32-bit hash under `job-tracker-password-hash` and the *first* visitor sets the password. The bundle and the data are fully client-side.

### SEO files

`public/` is the only directory Vite copies to `dist/`. `public/robots.txt` advertises `https://harinder.dev/sitemap.xml`, but `sitemap.xml` sits at the repo root, so **it is not in `dist/` and 404s in production**. Move it to `public/` when touching SEO.
