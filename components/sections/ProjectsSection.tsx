import ProjectCard from '@/components/cards/ProjectCard';
import SectionContainer from '@/components/containers/SectionContainer';
import { sanityFetch } from '@/sanity/lib/live';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/sanity/types';
import { selectedSectionsConfig } from '@/hooks/useSectionsConfig';

const ProjectsSection = async () => {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const sectionsConfig = await selectedSectionsConfig();

  return (
    <SectionContainer>
      <h2>{sectionsConfig?.projectsSection?.heading || 'Projects'}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: Project) => (
          <div key={project._id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
