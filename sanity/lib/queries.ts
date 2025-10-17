import { defineQuery } from 'next-sanity';

export const SKILLS_QUERY = defineQuery(`*[_type == "skill" ]`);
