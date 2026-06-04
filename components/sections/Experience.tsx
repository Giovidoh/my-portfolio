import { makeT, pickLocale } from '@/lib/i18n';
import type { HOME_QUERY_RESULT, EXPERIENCES_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<HOME_QUERY_RESULT>['experienceSection'];

type Role = {
  company: string;
  short: string;
  when: string;
  role: string;
  desc: string;
  stack: string[];
};

const FALLBACK_ROLES: Role[] = [
  {
    company: 'Northwind Studio',
    short: 'Senior Full-Stack Dev',
    when: '2023 — Present · Paris',
    role: 'Senior Full-Stack Developer',
    desc: 'Lead developer on a multi-tenant SaaS platform. Rebuilt the design system, cut page load by 40%, and mentored two juniors.',
    stack: ['Next.js', 'tRPC', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'Atelier Onze',
    short: 'Full-Stack Developer',
    when: '2021 — 2023 · Lyon',
    role: 'Full-Stack Developer',
    desc: 'Shipped client web apps end-to-end in a small agency — from pitch decks to production, often the only engineer in the room.',
    stack: ['React', 'Node', 'GraphQL'],
  },
  {
    company: 'Freelance',
    short: 'Web Developer',
    when: '2020 — 2021 · Remote',
    role: 'Freelance Web Developer',
    desc: 'Built marketing sites and small tools for founders and creators. Learned to scope, price, and ship under real constraints.',
    stack: ['Vue', 'Nuxt', 'Figma'],
  },
];

const Experience = ({
  locale,
  defaultLocale,
  heading,
  items,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  items?: EXPERIENCES_QUERY_RESULT;
}) => {
  const t = makeT(locale, defaultLocale);
  const roles: Role[] =
    items && items.length
      ? items.map((e) => ({
          company: e.company ?? '',
          short: pickLocale(e.short, locale, defaultLocale) ?? '',
          when: pickLocale(e.period, locale, defaultLocale) ?? '',
          role: pickLocale(e.role, locale, defaultLocale) ?? '',
          desc: pickLocale(e.description, locale, defaultLocale) ?? '',
          stack: e.stack ?? [],
        }))
      : FALLBACK_ROLES;

  return (
    <section className="section wrap" id="experience">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Career')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{t(heading?.heading, "Where I've worked")}</h2>
        </div>
      </div>
      <div className="timeline">
        {roles.map((r, i) => (
          <div className="tl-item reveal" key={`${r.company}-${i}`}>
            <div className="tl-when">
              <span className="co">{r.company}</span>
              <span>{r.short}</span>
              <span>{r.when}</span>
            </div>
            <div>
              <h3 className="tl-role">{r.role}</h3>
              <p className="tl-desc">{r.desc}</p>
              <div className="tl-stack">
                {r.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
