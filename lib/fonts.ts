import { Space_Grotesk, IBM_Plex_Sans, Space_Mono } from 'next/font/google';

// Shared font instances so every root layout applies the same CSS variables.
export const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

export const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

/** Combined class string to spread the three font variables onto <html>. */
export const fontVars = `${display.variable} ${body.variable} ${mono.variable}`;
