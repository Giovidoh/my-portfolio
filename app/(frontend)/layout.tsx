import { SanityLive } from '@/sanity/lib/live';
import Nav from '@/components/layouts/Nav';
import Footer from '@/components/layouts/Footer';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollReveals from '@/components/motion/ScrollReveals';

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroll />
      <ScrollReveals />
      <Nav />
      {children}
      <Footer />
      <SanityLive />
    </>
  );
}
