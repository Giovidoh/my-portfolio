'use client';

import { useState } from 'react';

type Cat = 'all' | 'front' | 'back' | 'tools';

const CATS: { k: Cat; label: string }[] = [
  { k: 'all', label: 'All' },
  { k: 'front', label: 'Frontend' },
  { k: 'back', label: 'Backend' },
  { k: 'tools', label: 'Tooling' },
];

const SKILLS: { cat: Exclude<Cat, 'all'>; name: string; icon: string }[] = [
  { cat: 'front', name: 'React', icon: 'react' },
  { cat: 'front', name: 'Next.js', icon: 'nextdotjs' },
  { cat: 'front', name: 'TypeScript', icon: 'typescript' },
  { cat: 'front', name: 'Tailwind', icon: 'tailwindcss' },
  { cat: 'front', name: 'Vue', icon: 'vuedotjs' },
  { cat: 'back', name: 'Node.js', icon: 'nodedotjs' },
  { cat: 'back', name: 'PostgreSQL', icon: 'postgresql' },
  { cat: 'back', name: 'Prisma', icon: 'prisma' },
  { cat: 'back', name: 'GraphQL', icon: 'graphql' },
  { cat: 'back', name: 'Redis', icon: 'redis' },
  { cat: 'tools', name: 'Docker', icon: 'docker' },
  { cat: 'tools', name: 'Vercel', icon: 'vercel' },
  { cat: 'tools', name: 'Git', icon: 'git' },
  { cat: 'tools', name: 'Figma', icon: 'figma' },
  { cat: 'tools', name: 'Vitest', icon: 'vitest' },
];

const Skills = () => {
  const [cat, setCat] = useState<Cat>('all');
  const shown = SKILLS.filter((s) => cat === 'all' || s.cat === cat);

  return (
    <section className="section wrap" id="skills">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">Toolkit</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>The stack I reach for</h2>
        </div>
      </div>
      <div className="skills__cats reveal" role="group" aria-label="Filter skills">
        {CATS.map((c) => (
          <button key={c.k} aria-pressed={cat === c.k} onClick={() => setCat(c.k)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="skills__grid reveal" data-d="1">
        {shown.map((s) => (
          <div className="chip" key={s.name}>
            <span className="chip__ic">
              <img
                className="lg lg-l"
                src={`https://cdn.simpleicons.org/${s.icon}/15140f`}
                alt=""
                loading="lazy"
              />
              <img
                className="lg lg-d"
                src={`https://cdn.simpleicons.org/${s.icon}/f6f4ec`}
                alt=""
                loading="lazy"
              />
            </span>
            <span className="chip__name">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
