import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import { ProjectType } from '@/types';
import { FC } from 'react';
import GithubIcon from '@/public/assets/icons/github.svg';
import Link from 'next/link';
import SkillChip from '../chips/SkillChip';

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="flex w-full flex-col gap-3 rounded-2xl border p-[clamp(0.25rem,_0.159rem_+_0.45vw,_0.5rem)] pb-5">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
        <Image src={project.img.src || me} alt={project.img.alt} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3 px-2">
        <div className="flex w-full flex-grow flex-col gap-3">
          <h3>{project.name}</h3>
          <div>
            Tools:{' '}
            {project.skills.map((skill, index) => (
              <SkillChip skill={skill} />
            ))}
          </div>
          <p className="line-clamp-3">{project.description}</p>
        </div>
        {project.githubLink && (
          <Link href={project.githubLink} target="_blank" className="flex w-fit items-center gap-2">
            <GithubIcon className="size-6" /> Github
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
