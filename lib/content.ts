import { sanityFetch } from '@/sanity/lib/live';
import {
  HOME_QUERY,
  SITE_SETTINGS_QUERY,
  CONTACT_PAGE_QUERY,
  PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  SKILLS_QUERY,
  SKILL_CATEGORIES_QUERY,
  EXPERIENCES_QUERY,
  TESTIMONIALS_QUERY,
} from '@/sanity/lib/queries';

// Thin, typed fetchers over the live Sanity client. They return the raw
// documents (translatable fields still as internationalized arrays); callers
// resolve the active locale with `pickLocale` and fall back to placeholder copy
// when a field — or the whole document — is absent.

export const getSiteSettings = async () => (await sanityFetch({ query: SITE_SETTINGS_QUERY })).data;
export const getHome = async () => (await sanityFetch({ query: HOME_QUERY })).data;
export const getContactPage = async () => (await sanityFetch({ query: CONTACT_PAGE_QUERY })).data;

export const getProjects = async () => (await sanityFetch({ query: PROJECTS_QUERY })).data;
export const getProjectBySlug = async (slug: string) =>
  (await sanityFetch({ query: PROJECT_QUERY, params: { slug } })).data;
export const getProjectSlugs = async () => (await sanityFetch({ query: PROJECT_SLUGS_QUERY })).data;

export const getSkills = async () => (await sanityFetch({ query: SKILLS_QUERY })).data;
export const getSkillCategories = async () =>
  (await sanityFetch({ query: SKILL_CATEGORIES_QUERY })).data;

export const getExperiences = async () => (await sanityFetch({ query: EXPERIENCES_QUERY })).data;
export const getTestimonials = async () => (await sanityFetch({ query: TESTIMONIALS_QUERY })).data;
