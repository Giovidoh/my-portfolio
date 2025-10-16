import { SanityLive } from '@/sanity/lib/live';
import Header from '@/components/layouts/Header';
import Main from '@/components/layouts/Main';
import Footer from '@/components/layouts/Footer';

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <SanityLive />
    </>
  );
}
