import { cache } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { SECTIONS_CONFIG_QUERY } from '@/sanity/lib/queries';

// Server-side fetcher (not a React hook). Wrapped in cache() to dedupe
// the lookup across sections in the same render.
export const getSectionsConfig = cache(async () => {
  const { data } = await sanityFetch({ query: SECTIONS_CONFIG_QUERY });
  return data;
});
