import { cn } from '@/lib/utils';
import { Skill } from '@/sanity/types';
import { FC } from 'react';

interface SkillChipProps {
  skill: Skill;
  size?: 'sm' | 'md' | 'lg';
}

const SkillChip: FC<SkillChipProps> = ({ skill, size = 'md' }) => {
  let style: string = '';
  if (size === 'sm') {
    style +=
      'text-sm [&_svg]:size-4 shadow-md px-[clamp(0.5rem,_0.409rem_+_0.45vw,_0.75rem)] py-[5px]';
  }

  return (
    <div
      className={cn(
        `flex items-center gap-2 rounded-full border px-[clamp(0.75rem,_0.659rem_+_0.45vw,_1rem)] py-[10px] shadow-lg`,
        style,
      )}
    >
      {/* {skill.icon && <skill.icon className="size-7" />} */}
      <span>{skill.title}</span>
    </div>
  );
};

export default SkillChip;
