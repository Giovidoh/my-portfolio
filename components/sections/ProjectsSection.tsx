import me from '@/public/assets/images/me.jpg';
import ProjectCard from '@/components/cards/ProjectCard';
import { ProjectType } from '@/types';
import SectionContainer from '@/components/containers/SectionContainer';
import NextjsIcon from '@/public/assets/icons/nextjs.svg';
import TailwindIcon from '@/public/assets/icons/tailwind.svg';

const ProjectsSection = () => {
  const projects: Array<ProjectType> = [
    {
      name: 'My Portfolio',
      description:
        'This is my portfolio Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat a, facilis earum totam soluta dolorum voluptatum minima nobis! Id repudiandae nobis illo officiis hic ut delectus. Porro velit iure tempora!',
      img: {
        src: me,
        alt: 'My portfolio image',
      },
      githubLink: 'https://github.com/Giovidoh/my-portfolio',
      liveLink: 'https://github.com/Giovidoh/my-portfolio',
      skills: [
        {
          Icon: NextjsIcon,
          name: 'NEXT.JS',
        },
        {
          Icon: TailwindIcon,
          name: 'tailwindcss',
        },
      ],
    },
    {
      name: 'My Portfolio',
      description:
        'This is my portfolio Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat a, facilis earum totam soluta dolorum voluptatum minima nobis! Id repudiandae nobis illo officiis hic ut delectus. Porro velit iure tempora!',
      img: {
        src: me,
        alt: 'My portfolio image',
      },
      githubLink: 'https://github.com/Giovidoh/my-portfolio',
      liveLink: 'https://github.com/Giovidoh/my-portfolio',
      skills: [
        {
          Icon: NextjsIcon,
          name: 'NEXT.JS',
        },
        {
          Icon: TailwindIcon,
          name: 'tailwindcss',
        },
      ],
    },
  ];

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
