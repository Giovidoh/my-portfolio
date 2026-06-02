# TODO

Chantier terminé le 2026-06-02. Stack : **Next 16.2.7 + React 19.2.7 + Sanity 5 / next-sanity 13**, dark mode via next-themes.
Sanity : projet `edikydib`, dataset `production` (public, vide → contenu via /studio).

## In Progress
(rien)

## To Do
(rien — les 4 phases sont terminées)

## Done
- [x] État des lieux (2026-06-02)
- [x] **Phase 1 — Déblocage** : useId→_id, env Sanity, fallback image, CORS localhost:3000
- [x] **Phase 2 — Migration Next 16.2.7 + React 19.2.7** : cascade Sanity 5 / next-sanity 13 / @sanity/client, Turbopack+SVGR, ESLint flat config, contournement schema extract
- [x] **Phase 3 — Qualité** : metadata dynamique, liveLink, `<h1>`, onClick typé, fetchers+React.cache, README
- [x] **Phase 4 — Nettoyage + Theme** : retrait `motion`, couleur primaire nettoyée, theme provider next-themes + toggle flottant (build + lint + tsc verts)

## Blocked
- [!] `pnpm schema:extract` — bug upstream sanity 5.28 (getWorkspace). Contourné ; types régénérables via `pnpm typegen` tant que le schéma de contenu ne change pas.
