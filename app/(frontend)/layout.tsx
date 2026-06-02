import type { Metadata } from 'next';
import { SanityLive } from '@/sanity/lib/live';
import Header from '@/components/layouts/Header';
import Main from '@/components/layouts/Main';
import Footer from '@/components/layouts/Footer';
import { getProfile } from '@/sanity/lib/getProfile';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: profile?.fullName ? `${profile.fullName} — Portfolio` : 'Portfolio',
    description: profile?.bio || undefined,
  };
}

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
