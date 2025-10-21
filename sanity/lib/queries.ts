import { defineQuery } from 'next-sanity';

export const SKILLS_QUERY = defineQuery(`*[_type == "skill" ]`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" ]{..., "skills": skills[]-> }`);

export const PROFILE_QUERY = defineQuery(`*[_type == "profile" ][0]`);

export const SECTIONS_CONFIG_QUERY = defineQuery(`*[_type == "sectionsConfig" ][0]`);