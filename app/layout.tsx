import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-nastaliq',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Qanoon-e-Mufrad Aza — Eastern Functional Tissue Medicine',
    template: '%s · Qanoon-e-Mufrad Aza',
  },
  description:
    'Learn the classical Qanoon-e-Mufrad Aza tissue framework, take a private in-browser self-observation, and find verified practitioners.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1f5d5a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nastaliq.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
