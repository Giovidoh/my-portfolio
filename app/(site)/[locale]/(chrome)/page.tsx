import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import ContactCta from '@/components/sections/ContactCta';
import { getDefaultLocale, pickLocale } from '@/lib/i18n';
import {
  getHome,
  getProjects,
  getSkills,
  getSkillCategories,
  getExperiences,
  getTestimonials,
} from '@/lib/content';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [defaultLocale, home, projects, skills, categories, experiences, testimonials] =
    await Promise.all([
      getDefaultLocale(),
      getHome(),
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

  const L = { locale, defaultLocale };

  return (
    <main id="top">
      <Hero {...L} data={home?.hero} />
      <Work {...L} heading={home?.workSection} projects={projects} />
      <About {...L} data={home?.about} />
      <Skills
        heading={skillsHeading}
        allLabel={allLabel}
        categories={skillCats}
        skills={skillItems}
      />
      <Experience {...L} heading={home?.experienceSection} items={experiences} />
      <Testimonials {...L} heading={home?.testimonialsSection} items={testimonials} />
      <ContactCta {...L} data={home?.contactCta} />
    </main>
  );
}
