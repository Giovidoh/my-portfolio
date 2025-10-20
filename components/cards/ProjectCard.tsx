import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import { FC, useId } from 'react';
import GithubIcon from '@/public/assets/icons/github.svg';
import Link from 'next/link';
import SkillChip from '../chips/SkillChip';
import { Project } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const id = useId();

  return (
    <article className="flex h-full w-full flex-col gap-3 rounded-2xl border p-[clamp(0.25rem,_0.159rem_+_0.45vw,_0.5rem)] pb-3">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
        <Image
          src={
            urlFor(project?.mainImage || '')
              .auto('format')
              .url() || me
          }
          alt={project?.mainImage?.alt || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 px-2">
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-lg font-medium">{project.title}</h3>
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              className="flex w-fit items-center gap-2"
            >
              <GithubIcon className="size-5" /> Github
            </Link>
          )}
          <p className="line-clamp-3">{project.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t pt-[clamp(0.25rem,_0.159rem_+_0.45vw,_0.5rem)]">
        {project?.skills &&
          project?.skills.map((skill, index) => (
            <div key={`${id}-${index}`} className="w-fit">
              <SkillChip skill={skill} size="sm" />
            </div>
          ))}
      </div>
    </article>
  );
};

export default ProjectCard;
