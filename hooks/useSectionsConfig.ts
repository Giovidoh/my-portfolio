import { sanityFetch } from '@/sanity/lib/live';
import { SECTIONS_CONFIG_QUERY } from '@/sanity/lib/queries';
import { SectionsConfig } from '@/sanity/types';

export const selectedSectionsConfig = async () => {
  const { data: sectionsConfig }: { data: SectionsConfig } = await sanityFetch({
    query: SECTIONS_CONFIG_QUERY,
  });
  return sectionsConfig;
};
