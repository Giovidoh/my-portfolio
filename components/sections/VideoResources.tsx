import { makeT, pickLocale } from '@/lib/i18n';
import type { LEARNING_PAGE_QUERY_RESULT, VIDEO_RESOURCES_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<LEARNING_PAGE_QUERY_RESULT>['videosSection'];

/** Video courses, talks and series followed — a compact list. */
const VideoResources = ({
  locale,
  defaultLocale,
  heading,
  items,
  viewLabel,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  items?: VIDEO_RESOURCES_QUERY_RESULT;
  viewLabel?: string | null;
}) => {
  const t = makeT(locale, defaultLocale);
  if (!items || !items.length) return null;

  return (
    <section className="section wrap" id="videos">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Watch list')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{t(heading?.heading, 'Video resources')}</h2>
        </div>
      </div>
      <ul className="vids">
        {items.map((v) => {
          const takeaway = pickLocale(v.takeaway, locale, defaultLocale);
          const meta = [v.author, v.platform, v.duration].filter(Boolean).join(' · ');
          return (
            <li className="vid reveal" key={v._id}>
              <div className="vid__main">
                <h3 className="vid__title">{v.title}</h3>
                {meta && <span className="vid__meta">{meta}</span>}
                {takeaway && <p className="vid__takeaway">{takeaway}</p>}
              </div>
              {v.url && (
                <a className="cert__link" href={v.url} target="_blank" rel="noreferrer">
                  {viewLabel || 'Watch'}
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
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default VideoResources;
