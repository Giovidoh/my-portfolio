import { StaticImageData } from 'next/image';
import { FC, SVGProps } from 'react';

export type SkillType = {
  Icon?: FC<SVGProps<SVGElement>>;
  name: string;
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
