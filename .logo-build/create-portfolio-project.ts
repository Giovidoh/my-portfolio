/* Add the portfolio itself as a project in Sanity.
   Uploads the homepage screenshot as mainImage, then creates the document
   following the existing projects' data conventions. */
import { createReadStream } from 'node:fs';
import { getCliClient } from 'sanity/cli';

const SKILL_IDS = {
  'Next.js': 'f08c3590-b607-4dbd-8547-14b81192631e',
  React: 'afe4c8de-2ae3-4d3f-82a9-2ab9cf802fac',
  TypeScript: 'c03ea5da-2f64-4230-9c1f-c9cc7a286578',
  'Tailwind CSS': '6f21a45e-81f2-4c94-acd2-69f1a2aa75ab',
  Sanity: '3ea606ab-9d6d-4e70-89f8-fa64eeb62e4e',
};

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });

  const existing = await client.fetch(
    `count(*[_type == "project" && slug.current == "icgreborns-portfolio"])`,
  );
  if (existing > 0) {
    console.log('ABORT: a project with slug "icgreborns-portfolio" already exists.');
    return;
  }

  const asset = await client.assets.upload(
    'image',
    createReadStream('.logo-build/portfolio-screenshot.png'),
    { filename: 'icgreborns-portfolio-home.png' },
  );
  console.log('image uploaded:', asset._id);

  const i18nString = (key: string, en: string, fr: string) => [
    { _key: `${key}-en`, _type: 'internationalizedArrayStringValue', language: 'en', value: en },
    { _key: `${key}-fr`, _type: 'internationalizedArrayStringValue', language: 'fr', value: fr },
  ];
  const i18nText = (key: string, en: string, fr: string) => [
    { _key: `${key}-en`, _type: 'internationalizedArrayTextValue', language: 'en', value: en },
    { _key: `${key}-fr`, _type: 'internationalizedArrayTextValue', language: 'fr', value: fr },
  ];

  const doc = await client.create({
    _type: 'project',
    title: 'ICGreborns — Portfolio',
    slug: { _type: 'slug', current: 'icgreborns-portfolio' },
    order: 3,
    featured: false,
    badge: i18nString('badge', 'Open source', 'Open source'),
    description: i18nText(
      'desc',
      'This very site — my personal portfolio. A multilingual Next.js 16 app (App Router, Turbopack) with a fully Sanity-driven content layer, light/dark themes and a printable CV. Designed and built end-to-end.',
      "Ce site — mon portfolio personnel. Application Next.js 16 multilingue (App Router, Turbopack), contenu entièrement géré via Sanity, thèmes clair/sombre et CV imprimable. Conçu et développé de bout en bout.",
    ),
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity'],
    mainImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Homepage of the ICGreborns portfolio — hero with portrait',
    },
    githubLink: 'https://github.com/Giovidoh/my-portfolio',
    liveLink: 'https://icg-reborns.com',
    allowEmbed: false,
    skills: Object.entries(SKILL_IDS).map(([title, _ref]) => ({
      _key: title.toLowerCase().replace(/[^a-z]/g, ''),
      _type: 'reference',
      _ref,
    })),
  });
  console.log('created:', doc._id, (doc.slug as { current: string }).current);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
