import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-beige antialiased`}>
        <div className="bg-orange h-20"></div>
        {children}
      </body>
    </html>
  );
}
