import Link from 'next/link';
import type { Metadata } from 'next';
import Certifications from '@/components/sections/Certifications';
import OpenSource from '@/components/sections/OpenSource';
import VideoResources from '@/components/sections/VideoResources';
import {
  getLearningPage,
  getSiteSettings,
  getCertifications,
  getOpenSource,
  getVideoResources,
} from '@/lib/content';
import { getDefaultLocale, makeT, pickLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [defaultLocale, page] = await Promise.all([getDefaultLocale(), getLearningPage()]);
  const t = makeT(locale, defaultLocale);
  return {
    title: t(page?.metaTitle, 'Learning · Cir-Giovanni IDOH'),
    description: t(
      page?.metaDescription,
      'Courses & certifications, open-source contributions and the video resources I learn from.',
    ),
  };
}

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

export default async function LearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [defaultLocale, page, settings, certifications, openSource, videos] = await Promise.all([
    getDefaultLocale(),
    getLearningPage(),
    getSiteSettings(),
    getCertifications(),
    getOpenSource(),
    getVideoResources(),
  ]);
  const t = makeT(locale, defaultLocale);
  const heading = pickLocale(page?.heading, locale, defaultLocale);

  const L = { locale, defaultLocale };
  // Section visibility — undefined defaults to shown; only an explicit `false` hides.
  const vis = page?.sectionsVisibility;

  return (
    <main className="learning">
      <div className="subnav-pad" />
      <section className="section wrap" style={{ paddingTop: 'clamp(28px,5vw,56px)', paddingBottom: 0 }}>
        <Link className="back-link" href={`/${locale}`}>
          <BackArrow />
          <span>{t(page?.backLabel, 'Home')}</span>
        </Link>
        <div className="learning__intro reveal" style={{ marginTop: 'var(--s-5)' }}>
          <span className="eyebrow">{t(page?.eyebrow, 'Always learning')}</span>
          {heading ? (
            <h1 style={{ marginTop: 'var(--s-4)' }}>{heading}</h1>
          ) : (
            <h1 style={{ marginTop: 'var(--s-4)' }}>
              What I&apos;m <em>learning.</em>
            </h1>
          )}
          <p className="learning__lede">
            {t(
              page?.pitch,
              'Courses and certifications I completed, open-source projects I contributed to, and the video resources I keep coming back to.',
            )}
          </p>
        </div>
      </section>

      {vis?.certifications !== false && (
        <Certifications
          {...L}
          heading={page?.certificationsSection}
          items={certifications}
          viewLabel={pickLocale(settings?.viewCredential, locale, defaultLocale)}
        />
      )}
      {vis?.openSource !== false && (
        <OpenSource
          {...L}
          heading={page?.openSourceSection}
          items={openSource}
          viewLabel={pickLocale(page?.openSourceLinkLabel, locale, defaultLocale)}
        />
      )}
      {vis?.videos !== false && (
        <VideoResources
          {...L}
          heading={page?.videosSection}
          items={videos}
          viewLabel={pickLocale(page?.videosLinkLabel, locale, defaultLocale)}
          statusLabels={page?.videoStatusLabels}
          otherTopicLabel={pickLocale(page?.videosOtherTopic, locale, defaultLocale)}
        />
      )}
    </main>
  );
}
