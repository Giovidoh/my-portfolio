import { sanityFetch } from '@/sanity/lib/live';
import { PROFILE_QUERY } from '@/sanity/lib/queries';

export const selectedProfile = async () => {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });
  return profile;
};
