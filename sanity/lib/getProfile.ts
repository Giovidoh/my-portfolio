import { cache } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { PROFILE_QUERY } from '@/sanity/lib/queries';

// Server-side fetcher (not a React hook). Wrapped in cache() so multiple
// callers in the same render (e.g. Header, Footer, generateMetadata) share one fetch.
export const getProfile = cache(async () => {
  const { data } = await sanityFetch({ query: PROFILE_QUERY });
  return data;
});
