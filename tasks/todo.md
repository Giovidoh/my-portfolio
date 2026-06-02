# TODO

Plan validé le 2026-06-02. Stack migrée : **Next 16.2.7 + React 19.2.7 + Sanity 5 / next-sanity 13**.
Sanity : projet `edikydib`, dataset `production` (public, vide → contenu via /studio).

## In Progress
(rien — Phase 2 terminée, prête pour la Phase 3)

## To Do

### Phase 3 — Qualité / correction
- [ ] 3.1 Vraie metadata (reco : generateMetadata depuis le profil Sanity)
- [ ] 3.2 Afficher `liveLink` dans ProjectCard
- [x] 3.3 Fallback image (Header + ProjectCard) — FAIT en Phase 1
- [~] 3.5 Cast `skill as unknown as Skill` SUPPRIMÉ (Phase 2) ; reste à typer `onClick` (plus de `any`) dans BaseButton
- [ ] 3.4 Vrai `<h1>` dans le Header
- [ ] 3.6 Renommer useProfile/useSectionsConfig → fetchers serveur + React.cache() (typage nullable déjà corrigé en Phase 2)
- [ ] 3.7 README personnalisé (+ documenter le bug schema extract / workaround typegen)
- [ ] 3.8 (optionnel) silencer warnings serverToken/browserToken de defineLive

### Phase 4 — Nettoyage + Theme provider
- [ ] 4.1 Retirer deps inutilisées (motion, lucide-react) — note : `overrides.motion` déjà retiré en Phase 2
- [ ] 4.2 Résoudre incohérence couleur primaire (primary-500 vert vs --primary jaune)
- [ ] 4.3 Theme provider next-themes + toggle — dark mode conservé

## Done
- [x] État des lieux (2026-06-02)
- [x] **Phase 1 — Déblocage** (`/` 200, `/studio` 200) : useId→_id, env Sanity, fallback image, CORS
- [x] **Phase 2 — Migration Next 16.2.7 + React 19.2.7** (build + lint + dev verts)
  - [x] next 16.2.7, react/react-dom 19.2.7, eslint-config-next 16.2.7, retrait override motion
  - [x] Cascade Sanity : next-sanity 13, sanity 5.28, @sanity/client 7 (dep directe pour le typage)
  - [x] Turbopack par défaut + SVGR via turbopack.rules + svg.d.ts ; prefetchInlining
  - [x] next lint → ESLint CLI (flat config native Next 16)
  - [x] Corrections de typage (cast supprimé, hooks nullable)
  - [x] Contournement bug upstream `schema extract` (typegen generate découplé)

## Blocked
- [!] `pnpm schema:extract` (régénération du schéma Sanity) — bug upstream sanity 5.28 (`getWorkspace`). Contourné ; types régénérables via `pnpm typegen` tant que le schéma de contenu ne change pas.
