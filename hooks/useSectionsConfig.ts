import { sanityFetch } from '@/sanity/lib/live';
import { SECTIONS_CONFIG_QUERY } from '@/sanity/lib/queries';

export const selectedSectionsConfig = async () => {
  const { data: sectionsConfig } = await sanityFetch({ query: SECTIONS_CONFIG_QUERY });
  return sectionsConfig;
};
