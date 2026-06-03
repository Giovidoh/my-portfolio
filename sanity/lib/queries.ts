import { defineQuery } from 'next-sanity';

// NOTE: These collection queries are rewritten locale-aware (GROQ `coalesce`) when
// the sections are wired to Sanity in step 3 (R8). Kept here so typegen has stable
// query handles to type.

export const SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(order asc)`);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc){ ..., "skills": skills[]-> }`,
);
