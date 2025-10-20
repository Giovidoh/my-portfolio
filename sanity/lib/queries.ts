import { defineQuery } from 'next-sanity';

export const SKILLS_QUERY = defineQuery(`*[_type == "skill" ]`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" ]{..., "skills": skills[]-> }`);
