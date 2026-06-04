import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fontVars } from '@/lib/fonts';
import ThemeProvider from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Cir-Giovanni IDOH',
};

// Root layout for non-localized utility routes (Studio, live demo, printable CV
// lives under the localized site). Fixed English document language.
export default function UtilityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVars}>
      <body className="antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
