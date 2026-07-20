# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

Personal portfolio for **Cir-Giovanni IDOH** — a single-page site (plus project
case-study pages, a contact page and a printable CV) built with **Next.js 16**
(App Router, Turbopack) and **React 19.2**, using **Sanity v5** as a headless
CMS with the Studio embedded at `/studio`. All site content (copy, projects,
skills, experience, languages, UI labels) is managed in the Studio and fetched
via GROQ; there is no hardcoded content database.

- Package manager: **pnpm** (Node.js >= 20.9).
- The app is multilingual: locales are **data** (`language` documents in
  Sanity), not config. Translatable fields use
  `sanity-plugin-internationalized-array` (`internationalizedArrayString/Text`).
- Contact form sends email via **Resend** (server action); without the env
  keys it degrades to a "not configured" error state.

## Build and test commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server (auto-runs `typegen` first via `predev`) |
| `pnpm build` | Production build (auto-runs `typegen` first) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config, ESLint CLI — `next lint` is gone in Next 16) |
| `pnpm typegen` | Regenerate `sanity/types.ts` from `sanity/extract.json` + `defineQuery` GROQ queries |
| `pnpm schema:extract` | Re-extract the schema from `sanity.config.ts` into `sanity/extract.json` |

There is **no test suite** in this project; verification is `pnpm lint` +
`pnpm build` and manual checks in the browser (app at `http://localhost:3000`,
Studio at `http://localhost:3000/studio`).

**Schema-change workflow:** after editing files in `sanity/schemaTypes/`, run
`pnpm schema:extract` **then** `pnpm typegen`, and commit the regenerated
`sanity/extract.json` and `sanity/types.ts`. (`schema:extract` was broken on
sanity 5.28 — `getWorkspace is not a function` — and is fixed since sanity
5.30.0; see `tasks/lessons.md`. The README's note about it being broken is
stale.)

## Repository layout

```
app/
  (site)/[locale]/        Localized site. [locale] layout renders <html lang>
    (chrome)/             Sub-group with shared Nav/Footer/smooth scroll
      page.tsx            Home (all sections)
      contact/page.tsx    Contact page
      projects/[slug]/    Project case-study pages (generateStaticParams)
    cv/page.tsx           Printable CV page (no chrome)
    layout.tsx            Root layout for the site zone (fonts, ThemeProvider, SanityLive)
  (utility)/              Non-localized zone with its own root layout
    studio/[[...tool]]/   Embedded Sanity Studio
    demo/                 Demo page used as live-preview iframe placeholder
  actions/contact.ts      'use server' Resend contact-form action
  route.ts                GET / → redirect to the default locale (force-dynamic)
components/
  sections/               Home sections (Hero, Work, About, Skills, Experience, …)
  layouts/                Nav, Footer, LanguageSwitcher
  ui/                     Small primitives (ButtonLink, CustomSelect, icons)
  theme/                  ThemeProvider (next-themes), ThemeToggle
  motion/ providers/      ScrollReveals (Motion), SmoothScroll (Lenis)
  contact/ cv/            ContactForm, PrintButton
lib/
  i18n.ts                 getLanguages (React cache, no-store), pickLocale, makeT,
                          withLocale, localeFromPathname, FALLBACK_LOCALE='en'
  content.ts              Thin typed fetchers over sanityFetch (one per GROQ query)
  fonts.ts                next/font wiring, exposed as CSS var classes
  projects.ts utils.ts    Project helpers; cn() (clsx + tailwind-merge)
sanity/
  schemaTypes/            Content model; i18n.ts/helpers.ts wrap internationalized fields
  structure.ts            Studio structure: singletons with fixed documentIds
  lib/queries.ts          All GROQ queries via defineQuery (typed by typegen)
  lib/client.ts           Sanity clients (note configClient: useCdn:false)
  lib/live.ts             sanityFetch + SanityLive (next-sanity live preview)
  lib/image.ts            imageBuilder / urlFor (guard against missing assets!)
  extract.json types.ts   Generated — do not hand-edit
styles/globals.css        Tailwind v4 + design tokens; theme via [data-theme]
tasks/todo.md lessons.md  Project's working notes (French): roadmap + pitfalls log
```

## Architecture notes (things that bite)

- **Two root layouts, no `app/layout.tsx`.** The localized zone
  (`app/(site)/[locale]/layout.tsx`) and the utility zone
  (`app/(utility)/layout.tsx`) each render their own `<html><body>` so the
  Studio stays outside locale routing. `/` has no page: `app/route.ts`
  redirects to the Sanity-configured default locale.
- **Locales are Sanity data.** `getLanguages()` (React `cache`, client with
  `useCdn:false` + `{ cache: 'no-store' }`) reads active `language` documents
  fresh per request, and falls back to `['en']` when the dataset is empty or
  unreachable — the site must never 404 for lack of language docs. Keep that
  try/catch fallback intact.
- **Internationalized fields are arrays.** Queries fetch raw documents;
  components resolve the active locale with `pickLocale(field, locale,
  defaultLocale)` / `makeT(...)` from `lib/i18n.ts`, always with a hardcoded
  placeholder fallback so empty Studio content renders instead of crashing.
  The plugin stores the locale in the **`language`** field (the `_key` is a
  random hash); `pickLocale` matches both and guards with `Array.isArray`
  against legacy plain-string data.
- **Singletons** (`siteSettings`, `homePage`, `contactPage`) have fixed
  documentIds via `sanity/structure.ts` and are hidden from the global
  "new document" menu in `sanity.config.ts` — don't create duplicates.
- **Sanity images:** never call `urlFor()` on a possibly-missing image — it
  throws on empty sources and crashes SSR. Guard with `image?.asset ? ... :
  fallback` (see `sanity/lib/image.ts` usage). Remote images are limited to
  `cdn.sanity.io` in `next.config.ts`.
- **SVG imports** become React components via SVGR, configured for Turbopack
  through `turbopack.rules` in `next.config.ts` (no `webpack()`).
- **Turbopack cache:** after moving/deleting route files or route groups,
  `next dev` can loop on stale `.next` state. Stop dev, delete `.next/`,
  restart. Not a code bug.
- **Theme:** next-themes with `attribute="data-theme"` (matching the handoff
  CSS), fonts loaded via `next/font` and wired to `--font-*` tokens — no
  Google Fonts `@import`. In the theme toggle, switch icon visibility with CSS
  (`hidden dark:block`), not JS mounted-state, to satisfy
  `react-hooks/set-state-in-effect`.
- **`async` Server Components can't use hooks** — use Sanity `_id`s as React
  keys, never `useId()`.
- `@sanity/client` is a **direct** dependency on purpose: the typegen
  `declare module '@sanity/client'` augmentation fails without it.

## Code style guidelines

- TypeScript, strict mode; path alias `@/*` → repo root.
- Prettier: semicolons, single quotes, `printWidth: 100`, 2-space tabs,
  trailing commas, `prettier-plugin-tailwindcss` (class sorting). Formatting
  is not enforced by a script — match existing style.
- ESLint flat config (`eslint.config.mjs`): `eslint-config-next/core-web-vitals`
  + `/typescript`. Notably relaxed: `no-explicit-any`, `no-unused-vars`,
  `react/no-unescaped-entities`, and `@next/next/no-img-element` are off
  (plain `<img>` is intentional for CDN skill icons).
- App code comments and docs are in **English** (`tasks/` working notes and
  `.env.example` are in French — follow the language of the file you touch).
- Design system: Space Grotesk / IBM Plex Sans / Space Mono, accent `#ffc814`,
  light + dark themes driven by CSS custom properties in
  `styles/globals.css`. Prefer existing tokens over new hardcoded values.
- Minimal diffs: match surrounding patterns (fetchers in `lib/content.ts`,
  `defineQuery` in `sanity/lib/queries.ts`, `defineField` wrappers in
  `sanity/schemaTypes/i18n.ts`) instead of introducing new abstractions.

## Security considerations

- Secrets live in `.env.local` (gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`, and
  for the contact form `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL`. Never commit `.env.local`; `.env.example` documents
  the expected keys.
- The contact server action (`app/actions/contact.ts`) re-validates all input
  server-side (email regex, min lengths) — never trust the client.
- `next.config.ts` serves SVGs with `contentDispositionType: 'attachment'` and
  a restrictive CSP, and restricts remote images to `cdn.sanity.io`.
- The embedded Studio requires the app origin in the Sanity project's CORS
  origins **with credentials**: `pnpm exec sanity cors add
  http://localhost:3000 --credentials` (and the production URL when
  deploying). Deployment is otherwise a standard Next.js build; set the same
  env vars on the host.
