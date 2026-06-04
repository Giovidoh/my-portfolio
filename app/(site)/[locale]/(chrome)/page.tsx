import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import ContactCta from '@/components/sections/ContactCta';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main id="top">
      <Hero locale={locale} />
      <Work locale={locale} />
      <About />
      <Skills />
      <Experience />
      <Testimonials />
      <ContactCta locale={locale} />
    </main>
  );
}
