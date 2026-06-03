import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import ContactCta from '@/components/sections/ContactCta';

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Work />
      <About />
      <Skills />
      <Experience />
      <Testimonials />
      <ContactCta />
    </main>
  );
}
