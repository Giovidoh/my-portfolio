'use client';

import { useState } from 'react';

type Cat = { k: string; label: string };
type SkillItem = {
  name: string;
  iconSlug: string;
  cat: string;
  iconUrl?: string;
  iconDarkUrl?: string;
};

const FALLBACK_CATS: Cat[] = [
  { k: 'all', label: 'All' },
  { k: 'front', label: 'Frontend' },
  { k: 'back', label: 'Backend' },
  { k: 'tools', label: 'Tooling' },
];

const FALLBACK_SKILLS: SkillItem[] = [
  { cat: 'front', name: 'React', iconSlug: 'react' },
  { cat: 'front', name: 'Next.js', iconSlug: 'nextdotjs' },
  { cat: 'front', name: 'TypeScript', iconSlug: 'typescript' },
  { cat: 'front', name: 'Tailwind', iconSlug: 'tailwindcss' },
  { cat: 'front', name: 'Vue', iconSlug: 'vuedotjs' },
  { cat: 'back', name: 'Node.js', iconSlug: 'nodedotjs' },
  { cat: 'back', name: 'PostgreSQL', iconSlug: 'postgresql' },
  { cat: 'back', name: 'Prisma', iconSlug: 'prisma' },
  { cat: 'back', name: 'GraphQL', iconSlug: 'graphql' },
  { cat: 'back', name: 'Redis', iconSlug: 'redis' },
  { cat: 'tools', name: 'Docker', iconSlug: 'docker' },
  { cat: 'tools', name: 'Vercel', iconSlug: 'vercel' },
  { cat: 'tools', name: 'Git', iconSlug: 'git' },
  { cat: 'tools', name: 'Figma', iconSlug: 'figma' },
  { cat: 'tools', name: 'Vitest', iconSlug: 'vitest' },
];

const Skills = ({
  heading,
  allLabel,
  categories,
  skills,
}: {
  heading?: { eyebrow: string; heading: string };
  allLabel?: string;
  categories?: Cat[];
  skills?: SkillItem[];
}) => {
  const cats: Cat[] =
    categories && categories.length
      ? [{ k: 'all', label: allLabel ?? 'All' }, ...categories]
      : FALLBACK_CATS;
  const allSkills: SkillItem[] = skills && skills.length ? skills : FALLBACK_SKILLS;

  const [cat, setCat] = useState<string>('all');
  const shown = allSkills.filter((s) => cat === 'all' || s.cat === cat);

  return (
    <section className="section wrap" id="skills">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{heading?.eyebrow ?? 'Toolkit'}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{heading?.heading ?? 'The stack I reach for'}</h2>
        </div>
      </div>
      <div className="skills__cats reveal" role="group" aria-label="Filter skills">
        {cats.map((c) => (
          <button key={c.k} aria-pressed={cat === c.k} onClick={() => setCat(c.k)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="skills__grid reveal" data-d="1">
        {shown.map((s) => (
          <div className="chip" key={s.name}>
            <span className="chip__ic">
              {s.iconUrl ? (
                <>
                  <img className="lg lg-l" src={s.iconUrl} alt="" loading="lazy" />
                  <img className="lg lg-d" src={s.iconDarkUrl ?? s.iconUrl} alt="" loading="lazy" />
                </>
              ) : s.iconSlug ? (
                <>
                  <img
                    className="lg lg-l"
                    src={`https://cdn.simpleicons.org/${s.iconSlug}/15140f`}
                    alt=""
                    loading="lazy"
                  />
                  <img
                    className="lg lg-d"
                    src={`https://cdn.simpleicons.org/${s.iconSlug}/f6f4ec`}
                    alt=""
                    loading="lazy"
                  />
                </>
              ) : null}
            </span>
            <span className="chip__name">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
