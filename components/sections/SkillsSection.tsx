import SectionContainer from '@/components/containers/SectionContainer';
import SkillChip from '@/components/chips/SkillChip';
import { sanityFetch } from '@/sanity/lib/live';
import { SKILLS_QUERY } from '@/sanity/lib/queries';
import { Skill } from '@/sanity/types';
import { selectedSectionsConfig } from '@/hooks/useSectionsConfig';

const SkillsSection = async () => {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });
  const sectionsConfig = await selectedSectionsConfig();

  return (
    <SectionContainer>
      <h2>{sectionsConfig?.skillsSection?.heading || 'My Technical Skills'}</h2>
      <div className="flex items-center gap-3">
        {skills.map((skill: Skill) => (
          <SkillChip key={skill._id} skill={skill} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
