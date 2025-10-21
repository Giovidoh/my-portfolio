import SectionContainer from '@/components/containers/SectionContainer';
import SkillChip from '@/components/chips/SkillChip';
import { Fragment, useId } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { SKILLS_QUERY } from '@/sanity/lib/queries';
import { Skill } from '@/sanity/types';
import { selectedSectionsConfig } from '@/hooks/useSectionsConfig';

const SkillsSection = async () => {
  const id = useId();
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });
  const sectionsConfig = await selectedSectionsConfig();

  return (
    <SectionContainer>
      <h2>{sectionsConfig?.skillsSection?.heading || 'My Technical Skills'}</h2>
      <div className="flex items-center gap-3">
        {skills.map((skill: Skill, index: number) => (
          <Fragment key={`${id}-${index}`}>
            <SkillChip skill={skill} />
          </Fragment>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
