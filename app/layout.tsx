import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-beige antialiased`}
      >
        <header className="flex h-20 flex-col items-center justify-center gap-2 bg-orange">
          <h1 className="text-2xl text-white">HN Reader</h1>
          <NavLinks />
        </header>
        {children}
        <footer className="flex h-10 items-center justify-center gap-2 bg-orange">
          <p>
            {'© 2024 '}
            <Link
              href="https://twitter.com/_wagao_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              wagao
            </Link>
          </p>
          <Link
            href="https://github.com/wagao29/hn-reader"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={'/ic-github.svg'} width={25} height={25} alt="github" />
          </Link>
        </footer>
      </body>
    </html>
  );
}
