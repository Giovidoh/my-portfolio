import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { getProfile } from '@/sanity/lib/getProfile';
import { urlFor } from '@/sanity/lib/image';

const Header = async () => {
  const profile = await getProfile();

  const profileImageUrl = profile?.profileImage?.asset
    ? urlFor(profile.profileImage).auto('format').url()
    : me;

  return (
    <header className="h-screen min-h-[500px] p-4">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative h-70 w-70 overflow-hidden rounded-full">
          <Image
            src={profileImageUrl}
            alt={profile?.profileImage?.alt || 'my photo'}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-center text-base font-normal">
          {profile?.greeting} {profile?.fullName}. {profile?.bio}
        </h1>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {profile?.callToActions?.map((callToAction) => (
            <BaseButton key={callToAction._key} isLink={true} href={callToAction.url || ''}>
              {callToAction.label}
            </BaseButton>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
