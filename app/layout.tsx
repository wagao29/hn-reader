import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { NavLinks } from './ui/nav-links';

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
