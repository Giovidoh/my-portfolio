# TODO

Refonte complète à partir du design **Claude Design** (handoff HTML/CSS/JS).
Système : Space Grotesk (display) / IBM Plex Sans (body) / Space Mono (mono) · accent `#ffc814` ·
thème via `data-theme` · Lenis (smooth scroll) + Motion · light primaire + dark premium.
Réf. design extraite : `%TEMP%\portfolio-design\my-portfolio\` (README, chats, project/).

## In Progress
- [~] **Phase R7 — i18n data-driven** — blocker `schema:extract` **levé** (sanity 5.30.0) ; reste le gros chantier : langues gérées dans Sanity, routing `[locale]`, champs internationalisés, sélecteur FR/EN

## To Do
- [ ] **Phase R7 — i18n data-driven** : type `language` Sanity (actif/inactif), routing `[locale]`, champs internationalisés, sélecteur FR/EN dans la nav, `<html lang>` dynamique
- [ ] **Phase R8 — Expansion schéma Sanity + câblage** : hero (status/role/lede/photo), about (+ what-I-do), skills (catégories + logos clair/sombre), experience, testimonials, projet (featured/slug/case-study/galerie/liveLink), siteSettings (SEO/labels/social), **CV file (PDF)** → bouton « Download CV » pointe vers le PDF Sanity ; tout éditable sans code.

## Done
- [x] Phases 1-4 antérieures (déblocage, migration Next 16.2 / React 19.2, qualité, dark mode + theme provider)
- [x] Audit + direction design + prompt Claude Design + lecture du handoff
- [x] **R1 — Fondation** : fonts `next/font`, tokens `globals.css`, thème `data-theme`, Lenis (`SmoothScroll`), reveals (`ScrollReveals`)
- [x] **R2 — Shell** : `Nav` (scrolled + scroll-spy + drawer), `Footer`, `ButtonLink`, `ThemeToggle`, icônes
- [x] **R3 — Home** : Hero, Work, About, Skills (filtre), Experience, Testimonials, Contact CTA
- [x] **R4 — Page projet** `/projets/[slug]` : case study + **preview live iframe** (`/demo`) + **fallback no-link** (ex. `verdant`) + generateStaticParams. Build + rendu OK.
- [x] **R5 — Page** `/contact` : formulaire validé (client) + bannières succès/erreur + **dropdown custom** (`CustomSelect`) + méthodes alt + **server action Resend** (`app/actions/contact.ts`). Build + rendu OK.
- [x] **R6 — CV** `/cv` : page imprimable (Print/Save PDF). Build + rendu OK.

## Notes / dette
- **Action requise (toi)** : pour activer l'envoi du formulaire, mettre `RESEND_API_KEY` + `CONTACT_TO_EMAIL` dans `.env.local` (cf. `.env.example`). Sans ça → bannière « non configuré ».
- Contenu des pages = **placeholder du design** ; câblage Sanity = R8.
- « Download CV » pointe vers la page imprimable `/cv` ; le **PDF uploadé via Sanity** arrive en R8.
- Preview live projet : iframe vers `/demo` (les sites tiers bloquent souvent l'embed) ; en R8, embarquer le vrai `liveLink` quand permis, sinon fallback.

## Blocked
- (rien) — `schema:extract` **débloqué** le 2026-06-03 : `sanity` 5.30.0 corrige le bug `getWorkspace`. Flux `pnpm schema:extract` → `pnpm typegen` opérationnel (l'`extract.json` était périmé : 15 → 17 types).
