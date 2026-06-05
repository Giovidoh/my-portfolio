# TODO

Refonte complète à partir du design **Claude Design** (handoff HTML/CSS/JS).
Système : Space Grotesk (display) / IBM Plex Sans (body) / Space Mono (mono) · accent `#ffc814` ·
thème via `data-theme` · Lenis (smooth scroll) + Motion · light primaire + dark premium.
Réf. design extraite : `%TEMP%\portfolio-design\my-portfolio\` (README, chats, project/).

## In Progress
- [~] **Reste mineur (optionnel)** : poignée de libellés purement structurels encore en dur — titres de sections du CV (Profile/Experience/Skills/Education), marque du logo (CG/IDOH), quelques textes d'état de la page projet (« A look inside », « Not public — by request », « Open »…), crédit police du footer. Tout le **contenu + labels d'UI + SEO + CV + images** est éditable/traduisible.

## To Do
- [ ] **Nettoyer les docs legacy** : supprimer (ou repeupler) les anciens docs `project`/`skill`/`profile` pré-refonte (champs en chaînes simples) — sinon la grille Work lit ces vieux docs (titre seul) au lieu du placeholder
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
- [x] **Chantier i18n — Étape 4 (Câblage Sanity)** : couche données (10 requêtes GROQ + fetchers `lib/content.ts`) ; home complet, page projet (case study + preview live `liveLink`/`allowEmbed`), chrome (Nav/Footer ← `siteSettings`, **bouton CV → `cvUrl`**), page contact + formulaire — tout lu depuis Sanity via `pickLocale`/`makeT` avec **fallback placeholder**. Garde `Array.isArray` contre les champs legacy. Commits `c3802a6`/`e1a45ca`/`38bcaf6`/`8f38e57`/`aca5a63`. build (SSG)/lint OK.
- [x] **Chantier i18n — Étape 5 (Finitions 100%)** : libellés d'UI complets (boutons, eyebrows case study, footer, formulaire) éditables/traduisibles via `siteSettings`/`contactPage` ; fuite email ContactCta corrigée ; **SEO** dynamique (`generateMetadata` ← `siteSettings` metaTitle/description/ogImage) ; page **/cv** alimentée par Sanity (profil/expériences/skills/formation) ; **rendu des images** (hero, cover projet, galerie, avatars, icônes) via `imageBuilder` (urlFor gardé). Commits `4a9deff`/`0581a81`/`f46e541`/`c49ba85`. build (SSG)/lint OK à chaque palier.

## Notes / dette
- **Action requise (toi)** : pour activer l'envoi du formulaire, mettre `RESEND_API_KEY` + `CONTACT_TO_EMAIL` dans `.env.local` (cf. `.env.example`). Sans ça → bannière « non configuré ».
- **Câblage (étape 4) fait** : chaque section/page lit Sanity (`pickLocale`/`makeT`), **fallback sur le placeholder** si champ/collection vide. Le placeholder reste visible tant que le Studio n'est pas rempli.
- « Download CV » → `cvFile` (`cvUrl`) si présent, sinon page imprimable `/cv` (elle-même alimentée par Sanity : profil/expériences/skills/formation).
- Preview live projet : `liveLink` embarqué si `allowEmbed`, sinon « ouvrir » (public non-embeddable) ou fallback « privé » ; placeholder → iframe `/demo`.
- **Images** : rendues via `imageBuilder` (hero, cover projet, galerie, avatars, icônes skill uploadées > CDN simple-icons), repli `.ph` si aucune image. Aucune image = aucun crash.
- **Docs legacy** : le dataset contient d'anciens docs (`project`/`skill`/`profile`) en chaînes simples → garde `Array.isArray` dans `pickLocale`. À nettoyer dans le Studio.
- **Modèle (étape 2)** : textes traduisibles = `internationalizedArrayString/Text` (helpers `sanity/schemaTypes/i18n.ts`). Catégories de skills = data (`skillCategory`), comme les langues. Singletons via `structure.ts` (documentId fixe) + `document.newDocumentOptions` (pas de doublon).

## Blocked
- (rien) — `schema:extract` **débloqué** le 2026-06-03 : `sanity` 5.30.0 corrige le bug `getWorkspace`. Flux `pnpm schema:extract` → `pnpm typegen` opérationnel (l'`extract.json` était périmé : 15 → 17 types).
