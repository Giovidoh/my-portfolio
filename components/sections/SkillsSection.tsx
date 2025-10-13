import SectionContainer from '@/components/containers/SectionContainer';
import SkillChip from '@/components/chips/SkillChip';
import NextjsIcon from '@/public/assets/icons/nextjs.svg';
import TailwindIcon from '@/public/assets/icons/tailwind.svg';

const SkillsSection = () => {
  return (
    <SectionContainer>
      <h2>My Technical Skills</h2>
      <div className="flex items-center gap-3">
        <SkillChip Icon={NextjsIcon} name="NEXT.JS" />
        <SkillChip Icon={TailwindIcon} name="tailwindcss" />
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
