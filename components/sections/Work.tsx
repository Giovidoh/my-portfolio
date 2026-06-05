import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowOut, GithubMark, LiveIcon } from '@/components/ui/icons';
import { PROJECTS } from '@/lib/projects';
import { makeT, pickLocale } from '@/lib/i18n';
import { imageBuilder } from '@/sanity/lib/image';
import type { HOME_QUERY_RESULT, PROJECTS_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<HOME_QUERY_RESULT>['workSection'];

type Card = {
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  big?: boolean;
  delay?: '1' | '2';
  github?: string;
  coverUrl?: string;
};

const Work = ({
  locale,
  defaultLocale,
  heading,
  projects,
  labels,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  projects?: PROJECTS_QUERY_RESULT;
  labels?: { gotProject?: string; code?: string; live?: string; liveDemo?: string };
}) => {
  const t = makeT(locale, defaultLocale);

  const cards: Card[] = projects?.length
    ? projects.map((p, i) => {
        const badge = pickLocale(p.badge, locale, defaultLocale);
        return {
          slug: p.slug?.current ?? '',
          num: `${String(i + 1).padStart(2, '0')}${badge ? ` / ${badge}` : ''}`,
          title: p.title ?? '',
          desc: pickLocale(p.description, locale, defaultLocale) ?? '',
          tags: p.tags ?? [],
          big: p.featured ?? false,
          github: p.githubLink ?? undefined,
          coverUrl: imageBuilder(p.mainImage)?.width(900).height(560).fit('crop').url(),
        };
      })
    : PROJECTS.map((p) => ({
        slug: p.slug,
        num: p.num,
        title: p.title,
        desc: p.desc,
        tags: p.tags,
        big: p.big,
        delay: p.delay,
      }));

  return (
    <section className="section wrap" id="work">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Selected work')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>
            {t(heading?.heading, "Things I've designed & built")}
          </h2>
        </div>
        <ButtonLink variant="ghost" size="sm" href="#contact">
          {labels?.gotProject ?? "Got a project? Let's talk"}
        </ButtonLink>
      </div>
      <div className="proj__grid">
        {cards.map((p) => (
          <article
            key={p.slug}
            className={`card reveal${p.big ? ' card--big' : ''}`}
            data-d={p.delay}
          >
            <Link
              href={`/${locale}/projects/${p.slug}`}
              className="card__cover"
              aria-label={`Open ${p.title} case study`}
            >
              {p.coverUrl ? (
                <img className="card__img" src={p.coverUrl} alt={p.title} loading="lazy" />
              ) : (
                <div className="ph">
                  <span className="ph__label">
                    {p.big ? 'project cover — 21:8' : 'project cover'}
                  </span>
                </div>
              )}
              <span className="card__num">{p.num}</span>
              <span className="card__open">
                <ArrowOut />
              </span>
            </Link>
            <div className="card__body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="card__tags">
                {p.tags.map((tg) => (
                  <span className="tag" key={tg}>
                    {tg}
                  </span>
                ))}
              </div>
            </div>
            <div className="card__links">
              <a href={p.github ?? 'https://github.com'} target="_blank" rel="noopener">
                <GithubMark />
                {labels?.code ?? 'Code'}
              </a>
              <Link href={`/${locale}/projects/${p.slug}`}>
                <LiveIcon />
                {p.big ? (labels?.liveDemo ?? 'Live demo') : (labels?.live ?? 'Live')}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
