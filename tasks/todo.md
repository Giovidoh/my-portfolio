# TODO

Plan validé le 2026-06-02. Stack : **Next 16.2.7 + React 19.2.7 + Sanity 5 / next-sanity 13**.
Sanity : projet `edikydib`, dataset `production` (public, vide → contenu via /studio).

## In Progress
(rien — Phase 3 terminée, reste la Phase 4)

## To Do

### Phase 4 — Nettoyage + Theme provider
- [ ] 4.1 Retirer `motion` (inutilisé). NB : `lucide-react` est désormais utilisé (ExternalLink dans ProjectCard) → conservé. `overrides.motion` déjà retiré en Phase 2
- [ ] 4.2 Résoudre incohérence couleur primaire (`--color-primary-500` vert vs `--primary` jaune)
- [ ] 4.3 Theme provider next-themes + toggle — dark mode conservé

## Done
- [x] État des lieux (2026-06-02)
- [x] **Phase 1 — Déblocage** (`/` 200, `/studio` 200) : useId→_id, env Sanity, fallback image, CORS
- [x] **Phase 2 — Migration Next 16.2.7 + React 19.2.7** : cascade Sanity 5 / next-sanity 13 / @sanity/client, Turbopack+SVGR, ESLint flat config, contournement schema extract
- [x] **Phase 3 — Qualité** (typecheck + lint + build verts)
  - [x] 3.1 Metadata dynamique (generateMetadata depuis le profil + fallback)
  - [x] 3.2 liveLink affiché dans ProjectCard (icône lucide ExternalLink)
  - [x] 3.3 Fallback image (fait en Phase 1)
  - [x] 3.4 `<h1>` sémantique dans le Header (visuel préservé)
  - [x] 3.5 Cast supprimé (P2) + `onClick` typé (MouseEventHandler)
  - [x] 3.6 Fetchers → sanity/lib/get*, renommés + React.cache() ; dossier hooks/ supprimé
  - [x] 3.7 README personnalisé (+ note bug schema extract)
  - [x] 3.8 defineLive serverToken/browserToken false (warnings silencés)

## Blocked
- [!] `pnpm schema:extract` — bug upstream sanity 5.28 (getWorkspace). Contourné ; types régénérables via `pnpm typegen` tant que le schéma de contenu ne change pas.
