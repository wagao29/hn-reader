import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Metadata } from 'next';
import { NavLinks } from './ui/nav-links';

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
      <body className={`${inter.className} bg-beige antialiased`}>
        <div className="flex h-20 flex-col items-center justify-center gap-2 bg-orange">
          <h1 className="text-2xl text-white">HN Reader</h1>
          <NavLinks />
        </div>
        {children}
      </body>
    </html>
  );
}
