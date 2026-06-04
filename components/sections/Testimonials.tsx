import { makeT, pickLocale } from '@/lib/i18n';
import type { HOME_QUERY_RESULT, TESTIMONIALS_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<HOME_QUERY_RESULT>['testimonialsSection'];

type Quote = { text: string; name: string; role: string; delay?: '1' | '2' };

const FALLBACK_QUOTES: Quote[] = [
  {
    text: 'Cir-Giovanni is the rare engineer who can own a feature from the database to the typography. Our product got measurably faster and noticeably more beautiful.',
    name: 'Marie Lefèvre',
    role: 'CTO, Northwind Studio',
  },
  {
    text: 'He shipped our entire client platform almost single-handedly, on time, and was a joy to work with. I’d hire him again in a heartbeat.',
    name: 'Thomas Bähr',
    role: 'Founder, Atelier Onze',
    delay: '1',
  },
  {
    text: 'Thoughtful, fast, and genuinely cares about accessibility and craft. The kind of teammate who quietly raises the bar for everyone.',
    name: 'Aïcha N’Diaye',
    role: 'Product Lead, Verdant',
    delay: '2',
  },
];

const Testimonials = ({
  locale,
  defaultLocale,
  heading,
  items,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  items?: TESTIMONIALS_QUERY_RESULT;
}) => {
  const t = makeT(locale, defaultLocale);
  const quotes: Quote[] =
    items && items.length
      ? items.map((q) => ({
          text: pickLocale(q.quote, locale, defaultLocale) ?? '',
          name: q.author ?? '',
          role: pickLocale(q.authorRole, locale, defaultLocale) ?? '',
        }))
      : FALLBACK_QUOTES;

  return (
    <section className="section wrap">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Kind words')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{t(heading?.heading, 'What people say')}</h2>
        </div>
      </div>
      <div className="quotes">
        {quotes.map((q, i) => (
          <figure className="quote reveal" key={`${q.name}-${i}`} data-d={q.delay}>
            <div className="mark">&ldquo;</div>
            <p>{q.text}</p>
            <figcaption className="quote__who">
              <span className="ph quote__av" />
              <div>
                <div className="n">{q.name}</div>
                <div className="r">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
