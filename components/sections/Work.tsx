import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowOut, GithubMark, LiveIcon } from '@/components/ui/icons';
import { PROJECTS } from '@/lib/projects';

const Work = ({ locale }: { locale: string }) => (
  <section className="section wrap" id="work">
    <div className="section-head reveal">
      <div>
        <span className="eyebrow">Selected work</span>
        <h2 style={{ marginTop: 'var(--s-4)' }}>Things I&apos;ve designed &amp; built</h2>
      </div>
      <ButtonLink variant="ghost" size="sm" href="#contact">
        Got a project? Let&apos;s talk
      </ButtonLink>
    </div>
    <div className="proj__grid">
      {PROJECTS.map((p) => (
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
            <div className="ph">
              <span className="ph__label">{p.big ? 'project cover — 21:8' : 'project cover'}</span>
            </div>
            <span className="card__num">{p.num}</span>
            <span className="card__open">
              <ArrowOut />
            </span>
          </Link>
          <div className="card__body">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="card__tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="card__links">
            <a href="https://github.com" target="_blank" rel="noopener">
              <GithubMark />
              Code
            </a>
            <Link href={`/${locale}/projects/${p.slug}`}>
              <LiveIcon />
              {p.big ? 'Live demo' : 'Live'}
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Work;
