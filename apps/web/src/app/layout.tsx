import { Barlow_Condensed, Bebas_Neue } from 'next/font/google';

import type { Metadata } from 'next';

import { Providers } from '@/components/providers';

import './globals.css';

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'A production-ready fullstack portfolio application.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
