import SectionContainer from '@/components/containers/SectionContainer';
import SkillChip from '@/components/chips/SkillChip';
import NextjsIcon from '@/public/assets/icons/nextjs.svg';
import TailwindIcon from '@/public/assets/icons/tailwind.svg';
import { SkillType } from '@/types';
import { Fragment } from 'react';

const SkillsSection = () => {
  const skills: Array<SkillType> = [
    {
      Icon: NextjsIcon,
      name: 'NEXT.JS',
    },
    {
      Icon: TailwindIcon,
      name: 'tailwindcss',
    },
  ];

  return (
    <SectionContainer>
      <h2>My Technical Skills</h2>
      <div className="flex items-center gap-3">
        {skills.map((skill, index) => (
          <Fragment key={`skills-section-skill-${index}`}>
            <SkillChip skill={skill} />
          </Fragment>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
