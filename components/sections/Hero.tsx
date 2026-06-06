import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowRight } from '@/components/ui/icons';
import { makeT, withLocale } from '@/lib/i18n';
import { imageBuilder } from '@/sanity/lib/image';
import type { HOME_QUERY_RESULT } from '@/sanity/types';

type HeroData = NonNullable<HOME_QUERY_RESULT>['hero'];

const FALLBACK_MARQUEE = [
  'Frontend',
  'Backend',
  'UI Engineering',
  'Accessibility',
  'Performance',
  'Design Systems',
];

const Hero = ({
  locale,
  defaultLocale,
  data,
  hiddenSections = [],
}: {
  locale: string;
  defaultLocale: string;
  data?: HeroData;
  hiddenSections?: string[];
}) => {
  const t = makeT(locale, defaultLocale);
  const marquee = data?.marquee?.length ? data.marquee : FALLBACK_MARQUEE;
  const photoUrl = imageBuilder(data?.photo)?.width(900).height(1100).fit('crop').url();

  // A CTA pointing to an anchor (#work) of a hidden section would be a dead link.
  const isDeadAnchor = (href?: string | null) =>
    !!href && href.startsWith('#') && hiddenSections.includes(href.slice(1));
  const primaryHref = data?.ctaPrimary?.href ?? '/contact';
  const secondaryHref = data?.ctaSecondary?.href ?? '#work';

  return (
    <header className="hero wrap">
      <div className="hero__grid">
        <div className="hero__intro">
          <span className="hero__status">
            <span className="dot" />
            {t(data?.status, 'Open to full-stack roles — 2026')}
          </span>
          <h1>
            <span className="line">
              <span>{data?.firstName ?? 'Cir-Giovanni'}</span>
            </span>
            <span className="line">
              <span>{data?.lastName ?? 'IDOH'}</span>
            </span>
          </h1>
          <p className="hero__role">
            <b>{t(data?.roleLabel, 'Full-Stack Web Developer')}</b>
            {' — '}
            {data?.roleStack ?? 'React · Next.js · Node · TypeScript'}
          </p>
          <p className="hero__lede">
            {t(
              data?.lede,
              'I design and build fast, accessible web products end-to-end — from the database to the last pixel. Equal parts engineer and craftsman.',
            )}
          </p>
          <div className="hero__cta">
            {!isDeadAnchor(primaryHref) && (
              <ButtonLink variant="primary" href={withLocale(locale, primaryHref)}>
                {t(data?.ctaPrimary?.label, 'Get in touch')}
                <ArrowRight className="arr" />
              </ButtonLink>
            )}
            {!isDeadAnchor(secondaryHref) && (
              <ButtonLink variant="ghost" href={withLocale(locale, secondaryHref)}>
                {t(data?.ctaSecondary?.label, 'View work')}
              </ButtonLink>
            )}
          </div>
        </div>
        <div className="hero__photo">
          <div className="ph">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={data?.photo?.alt ?? ''}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <span className="ph__label">portrait — hero</span>
            )}
          </div>
          <div className="yblock" />
          <div className="badge">{t(data?.badge, '6+ yrs shipping')}</div>
        </div>
      </div>
      <div className="hero__marquee" aria-hidden="true">
        <div className="track">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Hero;
