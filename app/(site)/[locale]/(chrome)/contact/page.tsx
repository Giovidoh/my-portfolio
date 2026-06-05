import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { GithubMark, MailIcon, ArrowOut } from '@/components/ui/icons';
import { getContactPage, getSiteSettings } from '@/lib/content';
import { getDefaultLocale, makeT, pickLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Contact · Cir-Giovanni IDOH',
  description: 'Get in touch — open to full-stack roles and select freelance work.',
};

const LinkedInMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={19} height={19}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4z" />
  </svg>
);

const BackArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const strip = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [defaultLocale, page, settings] = await Promise.all([
    getDefaultLocale(),
    getContactPage(),
    getSiteSettings(),
  ]);
  const t = makeT(locale, defaultLocale);
  const heading = pickLocale(page?.heading, locale, defaultLocale);

  const email = settings?.email ?? 'hello@cgidoh.dev';
  const linkedin = settings?.linkedinUrl ?? 'https://linkedin.com';
  const github = settings?.githubUrl ?? 'https://github.com';

  const formLabels = {
    name: pickLocale(page?.nameLabel, locale, defaultLocale),
    namePlaceholder: pickLocale(page?.namePlaceholder, locale, defaultLocale),
    nameError: pickLocale(page?.nameError, locale, defaultLocale),
    email: pickLocale(page?.emailLabel, locale, defaultLocale),
    emailPlaceholder: pickLocale(page?.emailPlaceholder, locale, defaultLocale),
    emailError: pickLocale(page?.emailError, locale, defaultLocale),
    subject: pickLocale(page?.subjectLabel, locale, defaultLocale),
    message: pickLocale(page?.messageLabel, locale, defaultLocale),
    messagePlaceholder: pickLocale(page?.messagePlaceholder, locale, defaultLocale),
    messageError: pickLocale(page?.messageError, locale, defaultLocale),
    required: pickLocale(page?.requiredLabel, locale, defaultLocale),
    send: pickLocale(page?.sendLabel, locale, defaultLocale),
    sending: pickLocale(page?.sendingLabel, locale, defaultLocale),
    successTitle: pickLocale(page?.successTitle, locale, defaultLocale),
    successBody: pickLocale(page?.successBody, locale, defaultLocale),
    errorInvalid: pickLocale(page?.errorInvalid, locale, defaultLocale),
    errorConfig: pickLocale(page?.errorConfig, locale, defaultLocale),
    errorSend: pickLocale(page?.errorSend, locale, defaultLocale),
  };
  const subjects = (page?.subjects ?? [])
    .map((s) => ({ value: s.value ?? '', label: pickLocale(s.label, locale, defaultLocale) ?? s.value ?? '' }))
    .filter((s) => s.value);

  return (
    <main className="contact">
      <div className="subnav-pad" />
      <section className="section wrap" style={{ paddingTop: 'clamp(28px,5vw,56px)' }}>
        <Link className="back-link" href={`/${locale}`}>
          <BackArrow />
          <span>{t(page?.backLabel, 'Home')}</span>
        </Link>
        <div className="contact__grid" style={{ marginTop: 'var(--s-5)' }}>
          <div className="reveal">
            <span className="eyebrow">{t(page?.eyebrow, 'Contact')}</span>
            {heading ? (
              <h1 style={{ marginTop: 'var(--s-4)' }}>{heading}</h1>
            ) : (
              <h1 style={{ marginTop: 'var(--s-4)' }}>
                Let&apos;s <em>talk.</em>
              </h1>
            )}
            <p className="contact__lede">
              {t(
                page?.pitch,
                "Whether you're hiring, have a project, or just want to say hi — drop me a line. I read everything and reply within a day.",
              )}
            </p>
            <div className="contact__alt">
              <a className="alt-row" href={`mailto:${email}`}>
                <span className="ic">
                  <MailIcon />
                </span>
                <span>
                  <span className="k">Email</span>
                  <br />
                  <span className="v">{email}</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
              <a className="alt-row" href={linkedin} target="_blank" rel="noopener">
                <span className="ic">
                  <LinkedInMark />
                </span>
                <span>
                  <span className="k">LinkedIn</span>
                  <br />
                  <span className="v">{strip(linkedin)}</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
              <a className="alt-row" href={github} target="_blank" rel="noopener">
                <span className="ic">
                  <GithubMark />
                </span>
                <span>
                  <span className="k">GitHub</span>
                  <br />
                  <span className="v">{strip(github)}</span>
                </span>
                <span className="arr2">
                  <ArrowOut width={18} height={18} />
                </span>
              </a>
            </div>
          </div>
          <div className="reveal" data-d="1">
            <ContactForm labels={formLabels} subjects={subjects} email={email} />
          </div>
        </div>
      </section>
    </main>
  );
}
