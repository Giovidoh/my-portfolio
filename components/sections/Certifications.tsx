import { makeT, pickLocale } from '@/lib/i18n';
import type { LEARNING_PAGE_QUERY_RESULT, CERTIFICATIONS_QUERY_RESULT } from '@/sanity/types';

type Heading = NonNullable<LEARNING_PAGE_QUERY_RESULT>['certificationsSection'];

type Cert = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  url: string;
};

const FALLBACK_CERTS: Cert[] = [
  {
    id: 'ph-1',
    title: 'Chainlink Fundamentals',
    issuer: 'Cyfrin Updraft',
    issued: 'June 2026',
    credentialId: '',
    url: '',
  },
  {
    id: 'ph-2',
    title: 'Foundry Fundamentals',
    issuer: 'Cyfrin Updraft',
    issued: 'June 2026',
    credentialId: '',
    url: '',
  },
  {
    id: 'ph-3',
    title: 'Solidity Smart Contract Development',
    issuer: 'Cyfrin Updraft',
    issued: 'May 2026',
    credentialId: '',
    url: '',
  },
];

/** Courses & certifications — one card per credential, newest first. */
const Certifications = ({
  locale,
  defaultLocale,
  heading,
  items,
  viewLabel,
}: {
  locale: string;
  defaultLocale: string;
  heading?: Heading;
  items?: CERTIFICATIONS_QUERY_RESULT;
  viewLabel?: string | null;
}) => {
  const t = makeT(locale, defaultLocale);
  const certs: Cert[] =
    items && items.length
      ? items.map((c) => ({
          id: c._id,
          title: c.title ?? '',
          issuer: c.issuer ?? '',
          issued: pickLocale(c.issued, locale, defaultLocale) ?? '',
          credentialId: c.credentialId ?? '',
          url: c.url ?? '',
        }))
      : FALLBACK_CERTS;

  return (
    <section className="section wrap" id="certifications">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">{t(heading?.eyebrow, 'Always learning')}</span>
          <h2 style={{ marginTop: 'var(--s-4)' }}>
            {t(heading?.heading, 'Courses & certifications')}
          </h2>
        </div>
      </div>
      <div className="certs">
        {certs.map((c) => (
          <article className="cert reveal" key={c.id}>
            <span className="cert__when">{c.issued}</span>
            <h3 className="cert__title">{c.title}</h3>
            {c.issuer && <p className="cert__issuer">{c.issuer}</p>}
            {c.credentialId && <span className="cert__id">{c.credentialId}</span>}
            {c.url && (
              <a className="cert__link" href={c.url} target="_blank" rel="noreferrer">
                {viewLabel || 'View credential'}
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
        ))}
      </div>
    </section>
  );
};

export default Certifications;
