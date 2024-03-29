import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Footer } from './ui/footer';
import { Header } from './ui/header';

export const metadata: Metadata = {
  title: 'HN Reader',
  description: 'Hacker News reader built with Next.js App Router.',
  metadataBase: new URL('https://next-hn-reader.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-beige antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
