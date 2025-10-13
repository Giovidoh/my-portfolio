import { FC, SVGProps } from 'react';

export type SkillType = {
  Icon?: FC<SVGProps<SVGElement>>;
  name: string;
};
