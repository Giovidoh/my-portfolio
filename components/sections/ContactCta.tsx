import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowRight } from '@/components/ui/icons';
import { makeT, pickLocale, withLocale } from '@/lib/i18n';
import type { HOME_QUERY_RESULT } from '@/sanity/types';

type CtaData = NonNullable<HOME_QUERY_RESULT>['contactCta'];

const ContactCta = ({
  locale,
  defaultLocale,
  data,
}: {
  locale: string;
  defaultLocale: string;
  data?: CtaData;
}) => {
  const t = makeT(locale, defaultLocale);
  const heading = pickLocale(data?.heading, locale, defaultLocale);

  return (
    <section className="section wrap" id="contact">
      <div className="cta-band reveal">
        <div className="glow" />
        <span className="eyebrow" style={{ color: 'var(--accent)', justifyContent: 'center' }}>
          {t(data?.eyebrow, 'Contact')}
        </span>
        {heading ? (
          <h2 style={{ marginTop: 'var(--s-4)' }}>{heading}</h2>
        ) : (
          <h2 style={{ marginTop: 'var(--s-4)' }}>
            Let&apos;s build something <em>worth shipping.</em>
          </h2>
        )}
        <p>
          {t(
            data?.body,
            'Open to full-stack roles and select freelance work. The fastest way to reach me is the form — I reply within a day.',
          )}
        </p>
        <div
          className="hero__cta"
          style={{ justifyContent: 'center', animation: 'none', opacity: 1 }}
        >
          <ButtonLink variant="primary" href={withLocale(locale, '/contact')}>
            {t(data?.ctaLabel, 'Get in touch')}
            <ArrowRight className="arr" />
          </ButtonLink>
          <a
            className="btn btn-ghost"
            style={{
              background: 'transparent',
              color: 'var(--cta-fg)',
              borderColor: 'color-mix(in srgb, var(--cta-fg) 38%, transparent)',
            }}
            href="mailto:hello@cgidoh.dev"
          >
            hello@cgidoh.dev
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
