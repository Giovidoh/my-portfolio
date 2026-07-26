/* Fill the case-study fields of the "ICGreborns — Portfolio" project (en + fr). */
import { getCliClient } from 'sanity/cli';

const i18nString = (key: string, en: string, fr: string) => [
  { _key: `${key}-en`, _type: 'internationalizedArrayStringValue', language: 'en', value: en },
  { _key: `${key}-fr`, _type: 'internationalizedArrayStringValue', language: 'fr', value: fr },
];
const i18nText = (key: string, en: string, fr: string) => [
  { _key: `${key}-en`, _type: 'internationalizedArrayTextValue', language: 'en', value: en },
  { _key: `${key}-fr`, _type: 'internationalizedArrayTextValue', language: 'fr', value: fr },
];

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const id = await client.fetch(
    `*[_type == "project" && slug.current == "icgreborns-portfolio"][0]._id`,
  );
  if (!id) throw new Error('portfolio project not found');

  await client
    .patch(id)
    .set({
      caseType: i18nString('casetype', 'Personal website', 'Site personnel'),
      year: '2026',
      sub: i18nText(
        'sub',
        'A portfolio that practices what it preaches: every line of copy served from a CMS, two languages, light and dark themes, a printable CV — all wrapped in a design system built from scratch.',
        'Un portfolio qui applique ce qu’il prêche : chaque ligne de texte servie par un CMS, deux langues, thèmes clair et sombre, CV imprimable — le tout dans un design system construit de zéro.',
      ),
      facts: {
        role: i18nString('frole', 'Design & development — solo', 'Design & développement — solo'),
        timeline: i18nString('ftimeline', '2026 — ongoing', '2026 — en cours'),
        stack: 'Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Sanity v5',
        team: i18nString('fteam', 'Solo', 'Solo'),
      },
      caseStudy: {
        problem: i18nText(
          'problem',
          'A developer’s portfolio should prove the skills it claims. Most are static pages: copy hardcoded in components, a single language, no content workflow — every text tweak means a commit and a redeploy.\n\nI wanted a site that demonstrates the full stack I sell: content architecture, multilingual delivery, accessibility and performance — not just screenshots of other work.',
          'Un portfolio de développeur doit prouver les compétences qu’il affiche. La plupart sont des pages statiques : textes en dur dans les composants, une seule langue, aucun workflow de contenu — chaque retouche implique un commit et un redéploiement.\n\nJe voulais un site qui démontre la stack complète que je vends : architecture de contenu, multilingue, accessibilité et performance — pas seulement des captures d’autres projets.',
        ),
        role: i18nText(
          'role',
          'Everything, end-to-end: brand and design system (tokens, typography, themes), content modeling in Sanity, the Next.js front-end, the contact pipeline and deployment. No template, no UI kit — every component and every GROQ query is hand-written.',
          'Tout, de bout en bout : marque et design system (tokens, typographies, thèmes), modélisation du contenu dans Sanity, front-end Next.js, pipeline de contact et déploiement. Aucun template, aucun UI kit — chaque composant et chaque requête GROQ est écrit à la main.',
        ),
        solution: i18nText(
          'solution',
          'Next.js 16 (App Router, Turbopack) and React 19 on the front; Sanity v5 as a headless CMS with the Studio embedded at /studio. Locales are data, not config: translatable fields use internationalized arrays resolved per request with graceful fallbacks, so the site never breaks on missing content.\n\nThe next-sanity live content API keeps published edits fresh; the contact form runs through a server action (Resend) with server-side validation; deploys ship from Coolify behind Cloudflare.',
          'Next.js 16 (App Router, Turbopack) et React 19 côté front ; Sanity v5 en CMS headless avec le Studio embarqué sur /studio. Les langues sont des données, pas de la configuration : les champs traduisibles utilisent des tableaux internationalisés résolus à la requête avec repli gracieux — le site ne casse jamais si un contenu manque.\n\nL’API live de next-sanity garde les contenus publiés à jour ; le formulaire de contact passe par une server action (Resend) avec validation côté serveur ; le déploiement tourne sur Coolify derrière Cloudflare.',
        ),
        outcome: i18nText(
          'outcome',
          'The site now runs like a product: copy, projects and even languages are edited in the Studio and ship without a redeploy. This very case study follows that pipeline — written in the CMS, rendered by the app.',
          'Le site fonctionne désormais comme un produit : textes, projets et même langues s’éditent dans le Studio et sont publiés sans redéploiement. Cette étude de cas elle-même suit ce pipeline — rédigée dans le CMS, rendue par l’application.',
        ),
        metrics: [
          {
            _key: 'm1',
            value: '100%',
            label: i18nString('m1l', 'of page copy served from Sanity', 'du contenu servi par Sanity'),
          },
          {
            _key: 'm2',
            value: '2',
            label: i18nString('m2l', 'locales (EN/FR), data-driven', 'langues (EN/FR), pilotées par les données'),
          },
          {
            _key: 'm3',
            value: '0',
            label: i18nString('m3l', 'hardcoded copy strings', 'texte en dur dans le code'),
          },
        ],
      },
    })
    .commit();
  console.log('case study filled for', id);

  const check = await client.fetch(
    `*[_id == $id][0]{ caseType, year, "hasSub": defined(sub), "metrics": count(caseStudy.metrics) }`,
    { id },
  );
  console.log(JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
