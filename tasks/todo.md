# TODO

Refonte complète à partir du design **Claude Design** (handoff HTML/CSS/JS).
Système : Space Grotesk (display) / IBM Plex Sans (body) / Space Mono (mono) · accent `#ffc814` ·
thème via `data-theme` · Lenis (smooth scroll) + Motion · light primaire + dark premium.
Réf. design extraite : `%TEMP%\portfolio-design\my-portfolio\` (README, chats, project/).

## In Progress
- [~] **Chantier i18n+contenu — Étape 4 : câblage Sanity** : chaque section/page lit Sanity (GROQ `coalesce` / `pickLocale`) → le placeholder disparaît ; « Download CV » → `cvFile` Sanity ; preview live = `liveLink` si `allowEmbed`, sinon fallback

## To Do
- [ ] **Bootstrap contenu** : créer les docs `language` (en défaut + fr), les singletons `siteSettings`/`homePage`/`contactPage`, puis projets/skills/catégories/expériences/témoignages, et remplir les traductions dans `/studio`

## Done
- [x] Phases 1-4 antérieures (déblocage, migration Next 16.2 / React 19.2, qualité, dark mode + theme provider)
- [x] Audit + direction design + prompt Claude Design + lecture du handoff
- [x] **R1 — Fondation** : fonts `next/font`, tokens `globals.css`, thème `data-theme`, Lenis (`SmoothScroll`), reveals (`ScrollReveals`)
- [x] **R2 — Shell** : `Nav` (scrolled + scroll-spy + drawer), `Footer`, `ButtonLink`, `ThemeToggle`, icônes
- [x] **R3 — Home** : Hero, Work, About, Skills (filtre), Experience, Testimonials, Contact CTA
- [x] **R4 — Page projet** `/projets/[slug]` : case study + **preview live iframe** (`/demo`) + **fallback no-link** (ex. `verdant`) + generateStaticParams. Build + rendu OK.
- [x] **R5 — Page** `/contact` : formulaire validé (client) + bannières succès/erreur + **dropdown custom** (`CustomSelect`) + méthodes alt + **server action Resend** (`app/actions/contact.ts`). Build + rendu OK.
- [x] **R6 — CV** `/cv` : page imprimable (Print/Save PDF). Build + rendu OK.
- [x] **Chantier i18n — Étape 1 (Fondation langues)** : type `language` (actif/défaut/ordre) + plugin `internationalized-array` (langues chargées du dataset, `string`/`text`).
- [x] **Chantier i18n — Étape 3 (Routing `[locale]`)** : groupes de routes `(site)/[locale]` (+ sous-groupe `(chrome)` pour Nav/Footer/scroll) et `(utility)` (Studio/démo) = **2 root layouts**, `<html lang>` dynamique ; pages déplacées (`.NET File.Move` pour gérer `()[]`) ; `proxy.ts` redirige `/`→langue défaut ; tous les liens internes locale-aware ; **sélecteur de langue** (caché si <2 langues) ; locales = data Sanity (`getLanguages`) avec fallback `en` (le site ne 404 jamais faute de doc). typegen/build (`/en/*` + `/demo` + `/studio`)/lint OK.
- [x] **Chantier i18n — Étape 2 (Modèle de contenu)** : singletons `siteSettings`/`homePage`/`contactPage` ; collections `experience`/`testimonial`/`skillCategory` ; `project`/`skill` étendus (slug, featured, case-study, galerie, `allowEmbed`, catégorie, `iconDark`) ; tous les textes traduisibles via `internationalizedArrayString/Text` ; helpers `i18n.ts`/`helpers.ts` ; `structure.ts` (singletons) ; suppression `profile`/`sectionsConfig` (code mort). **extract ✅ · typegen ✅ (28 types) · build ✅ (13 routes) · lint ✅**.

## Notes / dette
- **Action requise (toi)** : pour activer l'envoi du formulaire, mettre `RESEND_API_KEY` + `CONTACT_TO_EMAIL` dans `.env.local` (cf. `.env.example`). Sans ça → bannière « non configuré ».
- Contenu des pages = **placeholder du design** ; câblage Sanity = étape 4.
- « Download CV » pointe vers la page imprimable `/cv` ; le **PDF uploadé via Sanity** (`cvFile`) arrive à l'étape 4.
- Preview live projet : iframe vers `/demo` (les sites tiers bloquent souvent l'embed) ; à l'étape 4, embarquer le vrai `liveLink` quand `allowEmbed`, sinon fallback.
- **Modèle (étape 2)** : textes traduisibles = `internationalizedArrayString/Text` (helpers `sanity/schemaTypes/i18n.ts`). Catégories de skills = data (`skillCategory`), comme les langues. Singletons via `structure.ts` (documentId fixe) + `document.newDocumentOptions` (pas de doublon).

## Blocked
- (rien) — `schema:extract` **débloqué** le 2026-06-03 : `sanity` 5.30.0 corrige le bug `getWorkspace`. Flux `pnpm schema:extract` → `pnpm typegen` opérationnel (l'`extract.json` était périmé : 15 → 17 types).
