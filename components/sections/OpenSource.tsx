import { makeT, pickLocale } from '@/lib/i18n';
import type { LEARNING_PAGE_QUERY_RESULT, OPEN_SOURCE_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<LEARNING_PAGE_QUERY_RESULT>['openSourceSection'];

/** Open-source projects contributed to — one card per project. */
const OpenSource = ({
  locale,
  defaultLocale,
  heading,
  items,
  viewLabel,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  items?: OPEN_SOURCE_QUERY_RESULT;
  viewLabel?: string | null;
}) => {
  const t = makeT(locale, defaultLocale);
  if (!items || !items.length) return null;

  return (
    <section className="section wrap" id="open-source">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Giving back')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{t(heading?.heading, 'Open source')}</h2>
        </div>
      </div>
      <div className="oss">
        {items.map((o) => {
          const role = pickLocale(o.role, locale, defaultLocale);
          const description = pickLocale(o.description, locale, defaultLocale);
          return (
            <article className="oss__item reveal" key={o._id}>
              <div className="oss__top">
                <h3 className="oss__title">{o.project}</h3>
                {o.repo && <span className="oss__repo">{o.repo}</span>}
              </div>
              {role && <span className="oss__role">{role}</span>}
              {description && <p className="oss__desc">{description}</p>}
              {o.stack && o.stack.length > 0 && (
                <ul className="oss__stack">
                  {o.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
              {o.url && (
                <a className="cert__link" href={o.url} target="_blank" rel="noreferrer">
                  {viewLabel || 'View project'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default OpenSource;
