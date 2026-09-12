import { makeT, pickLocale } from '@/lib/i18n';
import type { LEARNING_PAGE_QUERY_RESULT, VIDEO_RESOURCES_QUERY_RESULT } from '@/sanity/types';

type Page = NonNullable<LEARNING_PAGE_QUERY_RESULT>;
type Video = VIDEO_RESOURCES_QUERY_RESULT[number];

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17 17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Video courses, talks and series followed — a compact list, grouped by topic.
 * Videos without a topic land in a trailing "Other" group.
 */
const VideoResources = ({
  locale,
  defaultLocale,
  heading,
  items,
  viewLabel,
  statusLabels,
  otherTopicLabel,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Page['videosSection'];
  items?: VIDEO_RESOURCES_QUERY_RESULT;
  viewLabel?: string | null;
  statusLabels?: Page['videoStatusLabels'];
  otherTopicLabel?: string | null;
}) => {
  const t = makeT(locale, defaultLocale);
  if (!items || !items.length) return null;

  // Group by topic, preserving the query order (topic order, then item order).
  // `null` is the key for videos with no topic — always rendered last.
  const groups = new Map<string | null, { topic: Video['topic']; videos: Video[] }>();
  for (const video of items) {
    const key = video.topic?._id ?? null;
    const group = groups.get(key);
    if (group) group.videos.push(video);
    else groups.set(key, { topic: video.topic, videos: [video] });
  }
  const ordered = [...groups.entries()].sort(([a], [b]) => (a === null ? 1 : b === null ? -1 : 0));

  const statusLabel = (status: Video['status']) => {
    if (status === 'in-progress') return t(statusLabels?.inProgress, 'In progress');
    if (status === 'completed') return t(statusLabels?.completed, 'Completed');
    if (status === 'planned') return t(statusLabels?.planned, 'Planned');
    return null;
  };

  return (
    <section className="section wrap" id="videos">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Watch list')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{t(heading?.heading, 'Video resources')}</h2>
        </div>
      </div>

      {ordered.map(([key, { topic, videos }]) => {
        const title = topic
          ? pickLocale(topic.title, locale, defaultLocale)
          : otherTopicLabel || 'Other';
        const note = topic ? pickLocale(topic.note, locale, defaultLocale) : null;
        return (
          <div className="vid-group" key={key ?? '__other'}>
            <div className="vid-group__head reveal">
              <span className="eyebrow">{title}</span>
              {note && <p className="vid-group__note">{note}</p>}
            </div>
            <ul className="vids">
              {videos.map((v) => {
                const takeaway = pickLocale(v.takeaway, locale, defaultLocale);
                const status = statusLabel(v.status);
                return (
                  <li className="vid reveal" key={v._id}>
                    <div className="vid__main">
                      <h3 className="vid__title">{v.title}</h3>
                      {v.author && <span className="vid__meta">{v.author}</span>}
                      {(v.platform || v.duration || status) && (
                        <ul className="vid__badges">
                          {v.platform && <li>{v.platform}</li>}
                          {v.duration && <li>{v.duration}</li>}
                          {status && (
                            <li className={`vid__status vid__status--${v.status}`}>{status}</li>
                          )}
                        </ul>
                      )}
                      {takeaway && <p className="vid__takeaway">{takeaway}</p>}
                    </div>
                    {v.url && (
                      <a className="cert__link" href={v.url} target="_blank" rel="noreferrer">
                        {viewLabel || 'Watch'}
                        <ExternalIcon />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
};

export default VideoResources;
