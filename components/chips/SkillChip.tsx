import { SkillType } from '@/types';
import { FC } from 'react';

interface SkillChipProps {
  skill: SkillType;
}

const SkillChip: FC<SkillChipProps> = ({ skill }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border px-[clamp(0.75rem,_0.659rem_+_0.45vw,_1rem)] py-[10px] shadow-lg">
      {skill.Icon && <skill.Icon className="size-7" />}
      <span>{skill.name}</span>
    </div>
  );
};

export default SkillChip;
