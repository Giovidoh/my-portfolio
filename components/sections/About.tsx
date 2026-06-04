import { pickLocale } from '@/lib/i18n';
import type { HOME_QUERY_RESULT } from '@/sanity/types';

type AboutData = NonNullable<HOME_QUERY_RESULT>['about'];

const FALLBACK_DO = [
  { h: 'Product engineering', p: 'End-to-end features — schema, API, UI, tests, ship.' },
  {
    h: 'Interface & design systems',
    p: 'Accessible, reusable components teams actually enjoy using.',
  },
  { h: 'Performance & DX', p: 'Fast pages, clean codebases, tooling that gets out of the way.' },
];

const About = ({
  locale,
  defaultLocale,
  data,
}: {
  locale: string;
  defaultLocale: string;
  data?: AboutData;
}) => {
  const lead = pickLocale(data?.lead, locale, defaultLocale);
  const body = pickLocale(data?.body, locale, defaultLocale);
  const paragraphs = body
    ? body
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
  const items =
    data?.whatIDo && data.whatIDo.length
      ? data.whatIDo.map((w) => ({
          h: pickLocale(w.title, locale, defaultLocale) ?? '',
          p: pickLocale(w.description, locale, defaultLocale) ?? '',
        }))
      : FALLBACK_DO;

  return (
    <section className="section wrap" id="about">
      <div className="about__grid">
        <div className="about__intro reveal">
          <span className="eyebrow">{pickLocale(data?.eyebrow, locale, defaultLocale) ?? 'About'}</span>
          {lead ? (
            <p className="about__lead" style={{ marginTop: 'var(--s-5)' }}>
              {lead}
            </p>
          ) : (
            <p className="about__lead" style={{ marginTop: 'var(--s-5)' }}>
              I&apos;m a developer who cares as much about <span className="hl">how it feels</span> as
              how it works.
            </p>
          )}
        </div>
        <div className="about__body reveal" data-d="1">
          {paragraphs ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <>
              <p>
                Based in Paris, I&apos;ve spent the last six years building web products for startups
                and agencies — shipping everything from design systems and dashboards to high-traffic
                marketing sites. I&apos;m happiest in the seam between design and engineering, turning
                sharp ideas into things that load fast and feel effortless.
              </p>
              <p>
                Right now I&apos;m looking for a full-stack role on a small, ambitious team that
                sweats the details and ships often.
              </p>
            </>
          )}
          <ul className="dowhat">
            {items.map((d, i) => (
              <li key={i}>
                <span className="k">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{d.h}</h4>
                  <p>{d.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
