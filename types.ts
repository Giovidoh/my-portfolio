import { StaticImageData } from 'next/image';
import { FC, SVGProps } from 'react';

export type SkillType = {
  icon?: FC<SVGProps<SVGElement>>;
  title: string;
};

export type ProjectType = {
  name: string;
  description: string;
  img: {
    src: StaticImageData;
    alt: string;
  };
  githubLink?: string;
  liveLink?: string;
  skills: Array<SkillType>;
};
