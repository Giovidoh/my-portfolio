import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { selectedProfile } from '@/hooks/useProfile';
import { urlFor } from '@/sanity/lib/image';

const Header = async () => {
  const profile = await selectedProfile();

  return (
    <header className="h-screen min-h-[500px] p-4">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative h-70 w-70 overflow-hidden rounded-full">
          <Image
            src={
              urlFor(profile?.profileImage || '')
                .auto('format')
                .url() || me
            }
            alt={profile?.profileImage?.alt || 'my photo'}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center">
          {profile?.greeting} {profile?.fullName}. {profile?.bio}
        </p>
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
