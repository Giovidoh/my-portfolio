import SectionContainer from '@/components/containers/SectionContainer';
import SkillChip from '@/components/chips/SkillChip';
import { Fragment } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { SKILLS_QUERY } from '@/sanity/lib/queries';

const SkillsSection = async () => {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

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
