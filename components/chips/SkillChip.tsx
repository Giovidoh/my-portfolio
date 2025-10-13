import { SkillType } from '@/types';
import { FC } from 'react';

const SkillChip: FC<SkillType> = ({ Icon, name }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border px-[clamp(0.75rem,_0.659rem_+_0.45vw,_1rem)] py-[10px] shadow-lg">
      {Icon && <Icon className="size-7" />}
      <span>{name}</span>
    </div>
  );
};

export default SkillChip;
