import { cn } from '@/lib/utils';
import { Skill } from '@/sanity/types';
import { FC } from 'react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface SkillChipProps {
  skill: Skill;
  size?: 'sm' | 'md' | 'lg';
}

const SkillChip: FC<SkillChipProps> = ({ skill, size = 'md' }) => {
  let containerStyle: string = '';
  let iconStyle: string = '';

  if (size === 'sm') {
    containerStyle +=
      'text-sm [&_svg]:size-4 shadow-md px-[clamp(0.5rem,_0.409rem_+_0.45vw,_0.75rem)] py-[5px]';
    iconStyle += 'h-5 w-5';
  }

  return (
    <div
      className={cn(
        `flex items-center gap-2 rounded-full border px-[clamp(0.75rem,_0.659rem_+_0.45vw,_1rem)] py-[10px] shadow-lg`,
        containerStyle,
      )}
    >
      {skill.icon?.asset && (
        <Image
          src={urlFor(skill.icon).auto('format').url()}
          alt={skill.icon?.alt || ''}
          width={16}
          height={16}
          className="h-7 w-7"
        />
      )}
      <span>{skill.title}</span>
    </div>
  );
};

export default SkillChip;
