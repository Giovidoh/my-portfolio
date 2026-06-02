import Image from 'next/image';
import me from '@/public/assets/images/me.jpg';
import { FC } from 'react';
import GithubIcon from '@/public/assets/icons/github.svg';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import SkillChip from '../chips/SkillChip';
import { PROJECTS_QUERY_RESULT } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

type ProjectCardProject = PROJECTS_QUERY_RESULT[number];

interface ProjectCardProps {
  project: ProjectCardProject;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const mainImageUrl = project?.mainImage?.asset
    ? urlFor(project.mainImage).auto('format').url()
    : me;

  return (
    <article className="flex h-full w-full flex-col gap-3 rounded-2xl border p-[clamp(0.25rem,_0.159rem_+_0.45vw,_0.5rem)] pb-3">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
        <Image
          src={mainImageUrl}
          alt={project?.mainImage?.alt || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 px-2">
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-lg font-medium">{project.title}</h3>
          {(project.githubLink || project.liveLink) && (
            <div className="flex flex-wrap items-center gap-4">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  className="flex w-fit items-center gap-2"
                >
                  <GithubIcon className="size-5" /> Github
                </Link>
              )}
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="flex w-fit items-center gap-2"
                >
                  <ExternalLink className="size-5" /> Live
                </Link>
              )}
            </div>
          )}
          <p className="line-clamp-3">{project.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t pt-[clamp(0.25rem,_0.159rem_+_0.45vw,_0.5rem)]">
        {project?.skills &&
          project.skills.map((skill) => (
            <div key={skill._id} className="w-fit">
              <SkillChip skill={skill} size="sm" />
            </div>
          ))}
      </div>
    </article>
  );
};

export default ProjectCard;
