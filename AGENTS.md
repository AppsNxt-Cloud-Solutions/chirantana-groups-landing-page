<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Chirantana Group — project rules

Marketing site for Chirantana Group (Tumkur, Karnataka) and its five verticals:
Chirantana Foundation, Chirantana Naturals, Chirantana Swadeshi Bhandara, SV Lots India
Pvt Ltd and Karoli Konnect. Sibling of `../svlots-landing-page`, which is the reference
for engineering conventions — not for the look.

## Scope, deliberately

No forms, no backend, no database, no auth, no secrets. Enquiries are `tel:`, `wa.me`
and `mailto:` links. There is no `proxy.ts`, no server action and no `.env` secret. If a
feature needs one of those, stop and ask before adding it.

## Next.js 16 gotchas

- `cookies()`, `headers()`, `params`, `searchParams` are **all async**. Use the generated
  `PageProps<'/route'>` / `LayoutProps` helpers (`npm run typecheck` runs `next typegen`
  first — the types don't exist on a fresh clone until it has run once).
- `opengraph-image.tsx` default exports also receive `params` as a Promise.
- `images.qualities` defaults to `[75]`; every other `quality` prop is silently coerced.
  Declared tiers live in `next.config.ts`.
- Turbopack is the default for `dev` and `build`; no `--turbopack` flag, and no webpack
  loaders — GLSL lives in `lib/shaders/*.ts` as template literals.
- `next/dynamic(..., { ssr: false })` is an error inside a Server Component. Only
  `components/motion/shader-field.tsx` ("use client") may import `shader-canvas.tsx`.
- Next no longer overrides `scroll-behavior` on navigation. Lenis drives scrolling — never
  set `scroll-behavior: smooth` on `html`.

## Conventions

- **Styling:** Tailwind v4 only. Every token is declared once in `app/globals.css` under
  `@theme`. Never hardcode a hex in a component, never add a `<style>` block.
- **Accents:** components never name a vertical. Use `accent-*` utilities
  (`text-accent-600`, `border-accent-500`, `bg-accent-100`); they resolve through the
  `[data-accent]` attribute set by `<Section accent>` or the vertical page root. Tailwind
  v4 has no safelist and generates no dynamic class names — this is why. The aliases live
  in a **`@theme inline`** block: a plain `@theme` would substitute `var(--v-*)` once at
  `:root` and every descendant would inherit brass. In raw CSS and `bg-[...]` arbitrary
  values, reference `var(--v-500)` directly, never `var(--color-accent-500)`.
- **Motion:** use the primitives in `components/motion/`. They all honour
  `prefers-reduced-motion`. Anything that mounts at `opacity: 0` must carry
  `data-motion="reveal"` so the no-JS / failed-hydration fallback in `app/layout.tsx` can
  clear it.
- **WebGL:** at most one live canvas per page (the hero). Everything else is CSS or `motion`.
- **Content:** copy lives in `content/` as typed data, not inline in components.
- **Images:** always `next/image` with explicit `width`/`height` (or `fill` + sized parent)
  and real `alt` text. Static imports from `assets/`; `public/` is for stable-path files only.
- **Links:** internal navigation is always `next/link`. Never a bare `<a href="/...">`.
