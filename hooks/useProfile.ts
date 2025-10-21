import { sanityFetch } from '@/sanity/lib/live';
import { PROFILE_QUERY } from '@/sanity/lib/queries';
import { Profile } from '@/sanity/types';

export const selectedProfile = async () => {
  const { data: profile }: { data: Profile } = await sanityFetch({
    query: PROFILE_QUERY,
  });
  return profile;
};
