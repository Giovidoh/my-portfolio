import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import React from 'react';
import BaseButton from '../buttons/BaseButton';

const Header = () => {
  return (
    <header className="h-screen min-h-[500px] p-4">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative h-70 w-70 overflow-hidden rounded-full">
          <Image src={me} alt="my photo" fill className="object-cover" />
        </div>
        <p className="text-center">
          Hi, I'm Cir-Giovanni. I'm a software engineer. I can help you bring your applications
          ideas to live.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <BaseButton>Download my Resume</BaseButton>
          <BaseButton>Get in touch</BaseButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
