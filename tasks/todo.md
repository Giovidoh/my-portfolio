# TODO

Plan validé le 2026-06-02. Cible migration : **Next 16.2.7 + React 19.2.7**.
Sanity : projet `edikydib`, dataset `production` (public). **Dataset vide** → ajouter du contenu via `/studio`.

## In Progress
(rien — Phase 1 terminée, prête pour la Phase 2)

## To Do

### Phase 2 — Migration Next 16.2.7 + React 19.2.7
- [ ] 2.1 package.json : next@^16.2.7, react/react-dom@19.2.7, eslint-config-next@^16, retirer overrides.motion
- [ ] 2.2 codemod `npx @next/codemod@latest upgrade latest` + corrections manuelles
- [ ] 2.3 Porter SVGR sur Turbopack (turbopack.rules) + déclaration type `*.svg` — Turbopack par défaut en Next 16
- [ ] 2.4 Validation : build + lint + dev verts, SVG affichés

### Phase 3 — Qualité / correction
- [ ] 3.1 Vraie metadata (reco : generateMetadata depuis le profil Sanity)
- [ ] 3.2 Afficher `liveLink` dans ProjectCard
- [x] 3.3 Fallback image (Header + ProjectCard) — FAIT en Phase 1 (bloquait le démarrage)
- [ ] 3.4 Vrai `<h1>` dans le Header
- [ ] 3.5 Retirer cast `skill as unknown as Skill` + typer `onClick` (plus de `any`)
- [ ] 3.6 Renommer useProfile/useSectionsConfig → fetchers serveur + React.cache()
- [ ] 3.7 README personnalisé
- [ ] 3.8 (optionnel) silencer warnings serverToken/browserToken de defineLive

### Phase 4 — Nettoyage + Theme provider
- [ ] 4.1 Retirer deps inutilisées (motion, lucide-react)
- [ ] 4.2 Résoudre incohérence couleur primaire (primary-500 vert vs --primary jaune)
- [ ] 4.3 Theme provider next-themes + toggle (emplacement à trancher) — dark mode conservé

## Done
- [x] État des lieux du portfolio (2026-06-02)
- [x] **Phase 1 — Projet débloqué et fonctionnel** (validé : `/` 200 + `/studio` 200)
  - [x] 1.1 useId→_id dans SkillsSection/ProjectsSection/ProjectCard (runtime OK)
  - [x] 1.2 Env Sanity : .env.local rempli (edikydib/production), typegen OK, .env.example créé
  - [x] 1.3 Validation démarrage `npm run dev`
  - [x] 1.x Fix fallback image (urlFor guardé) — démarre même avec dataset vide

## Blocked
(rien)
