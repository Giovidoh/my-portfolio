import ProjectCard from '@/components/cards/ProjectCard';
import SectionContainer from '@/components/containers/SectionContainer';
import { sanityFetch } from '@/sanity/lib/live';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';

const ProjectsSection = async () => {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <SectionContainer>
      <h2>Projects</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={`project-${index}`}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
