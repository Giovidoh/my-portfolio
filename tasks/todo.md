# TODO

Refonte complète à partir du design **Claude Design** (handoff HTML/CSS/JS).
Système : Space Grotesk (display) / IBM Plex Sans (body) / Space Mono (mono) · accent `#ffc814` ·
thème via `data-theme` · Lenis (smooth scroll) + Motion (reveals/signature) · light primaire + dark premium.
Réf. design extraite : `%TEMP%\portfolio-design\my-portfolio\` (README, chats, project/).

## In Progress
- (prochaine : **Phase R4 — page projet** `/projets/[slug]`)

## To Do
- [ ] **Phase R4 — Page projet** `/projets/[slug]` : case study + **preview live iframe** (frame navigateur) + fallback no-link (Motion pour la transition signature)
- [ ] **Phase R5 — Page** `/contact` : formulaire validé + bannières succès/erreur + dropdown custom + méthodes alt + **backend e-mail** (server action)
- [ ] **Phase R6 — CV** : bouton de téléchargement (PDF uploadé via Sanity)
- [ ] **Phase R7 — i18n data-driven** : type `language` Sanity (actif/inactif), routing `[locale]`, champs internationalisés, sélecteur FR/EN dans la nav, `<html lang>` dynamique
- [ ] **Phase R8 — Expansion schéma Sanity** : experience, testimonials, what-I-do, hero (status/role/lede), projet (featured/slug/case-study/galerie), siteSettings (SEO/labels/social), CV file → **tout éditable sans code**

## Done
- [x] Phases 1-4 antérieures (déblocage, migration Next 16.2 / React 19.2, qualité, dark mode + theme provider)
- [x] Audit structure + direction design (personal-brand/recruteurs, archi sections, « expressif mais maîtrisé »)
- [x] Rédaction du prompt Claude Design + récupération/lecture du handoff design
- [x] **Phase R1 — Fondation** : fonts `next/font` (Space Grotesk/IBM Plex Sans/Space Mono), système de tokens dans `globals.css`, thème `data-theme` (next-themes), provider Lenis (`SmoothScroll`), reveals au scroll (`ScrollReveals`)
- [x] **Phase R2 — Shell** : `Nav` (état `scrolled` + scroll-spy + drawer mobile), `Footer`, `ButtonLink`, `ThemeToggle` (icônes pilotées par `data-theme`), icônes du design
- [x] **Phase R3 — Home** : Hero (anim. CSS), Work (6 projets, 2 featured), About (+ what-I-do), Skills (filtre catégories, logos teintés simple-icons), Experience (timeline), Testimonials, Contact CTA — contenu placeholder du design (câblage Sanity en R8). Build + lint + tsc verts, rendu confirmé sur :3000.

## Notes / dette
- Les routes `/contact`, `/cv`, `/projets/[slug]` sont liées depuis la nav/les cartes mais arrivent en R4/R5/R6 (404 d'ici là).
- Anciens composants (Header/Main/SkillsSection/ProjectsSection/ProjectCard/SkillChip/BaseButton/SectionContainer/ui-button) supprimés.
- Contenu de la home en dur pour l'instant → à brancher sur Sanity en R8 (schéma à étendre).

## Blocked
- [!] `pnpm schema:extract` — bug upstream sanity 5.28 (`getWorkspace`). À **re-tester** avant la Phase R8 (modif de structure → régénération de types nécessaire).
