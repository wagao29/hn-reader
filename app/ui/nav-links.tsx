'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'New', href: '/new' },
  { name: 'Top', href: '/top' },
  { name: 'Best', href: '/best' },
  { name: 'Ask', href: '/ask' },
  { name: 'Show', href: '/show' },
  { name: 'Job', href: '/job' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 text-white">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={
              pathname === link.href ? 'underline underline-offset-4' : ''
            }
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
