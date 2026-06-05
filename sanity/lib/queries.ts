import { defineQuery } from 'next-sanity';

// Raw documents are fetched with translatable fields kept as internationalized
// arrays ([{_key, value}]); the locale is resolved in the components via
// `pickLocale` (see lib/i18n.ts), which keeps these queries simple and makes
// the per-language fallback explicit at the point of use.

// --- Singletons ---
export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  ...,
  "cvUrl": cvFile.asset->url,
  "ogUrl": ogImage.asset->url
}`);
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]`);
export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage"][0]`);

// --- Collections ---
export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc){
    ...,
    "skills": skills[]->{ _id, title }
  }`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    ...,
    "skills": skills[]->{ _id, title }
  }`,
);

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
);

export const SKILLS_QUERY = defineQuery(
  `*[_type == "skill"] | order(order asc){
    ...,
    "category": category->{ _id, key, title }
  }`,
);

export const SKILL_CATEGORIES_QUERY = defineQuery(`*[_type == "skillCategory"] | order(order asc)`);

export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experience"] | order(order asc)`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(order asc)`);
