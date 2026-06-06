import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import ContactCta from '@/components/sections/ContactCta';
import { getDefaultLocale, pickLocale } from '@/lib/i18n';
import { imageBuilder } from '@/sanity/lib/image';
import {
  getHome,
  getSiteSettings,
  getProjects,
  getSkills,
  getSkillCategories,
  getExperiences,
  getTestimonials,
} from '@/lib/content';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [defaultLocale, home, settings, projects, skills, categories, experiences, testimonials] =
    await Promise.all([
      getDefaultLocale(),
      getHome(),
      getSiteSettings(),
      getProjects(),
      getSkills(),
      getSkillCategories(),
      getExperiences(),
      getTestimonials(),
    ]);

  // Skills is a client component — resolve its data to plain props server-side.
  const skillCats =
    categories && categories.length
      ? categories.map((c) => ({
          k: c.key ?? '',
          label: pickLocale(c.title, locale, defaultLocale) ?? c.key ?? '',
        }))
      : undefined;
  const skillItems =
    skills && skills.length
      ? skills.map((s) => ({
          name: s.title ?? '',
          iconSlug: s.simpleIconSlug ?? '',
          iconUrl: imageBuilder(s.icon)?.width(80).height(80).fit('max').url(),
          iconDarkUrl: imageBuilder(s.iconDark)?.width(80).height(80).fit('max').url(),
          cat: s.category?.key ?? '',
        }))
      : undefined;
  const skillsHeading = home?.skillsSection
    ? {
        eyebrow: pickLocale(home.skillsSection.eyebrow, locale, defaultLocale) ?? 'Toolkit',
        heading:
          pickLocale(home.skillsSection.heading, locale, defaultLocale) ?? 'The stack I reach for',
      }
    : undefined;
  const allLabel = pickLocale(home?.skillsSection?.allLabel, locale, defaultLocale);

  const workLabels = {
    gotProject: pickLocale(settings?.gotProject, locale, defaultLocale),
    code: pickLocale(settings?.code, locale, defaultLocale),
    live: pickLocale(settings?.live, locale, defaultLocale),
    liveDemo: pickLocale(settings?.liveDemo, locale, defaultLocale),
  };
  const ctaEmail = settings?.email ?? 'hello@cgidoh.dev';

  const L = { locale, defaultLocale };
  // Section visibility — undefined defaults to shown; only an explicit `false` hides.
  const vis = home?.sectionsVisibility;

  return (
    <main id="top">
      <Hero {...L} data={home?.hero} />
      {vis?.work !== false && (
        <Work {...L} heading={home?.workSection} projects={projects} labels={workLabels} />
      )}
      {vis?.about !== false && <About {...L} data={home?.about} />}
      {vis?.skills !== false && (
        <Skills
          heading={skillsHeading}
          allLabel={allLabel}
          categories={skillCats}
          skills={skillItems}
        />
      )}
      {vis?.experience !== false && (
        <Experience {...L} heading={home?.experienceSection} items={experiences} />
      )}
      {vis?.testimonials !== false && (
        <Testimonials {...L} heading={home?.testimonialsSection} items={testimonials} />
      )}
      {vis?.contact !== false && <ContactCta {...L} data={home?.contactCta} email={ctaEmail} />}
    </main>
  );
}
