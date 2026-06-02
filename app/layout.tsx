import type { Metadata } from 'next';
import '@/styles/globals.css';
import ThemeProvider from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
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
