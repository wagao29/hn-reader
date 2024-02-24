import { NavLinks } from './nav-links';

export function Header() {
  return (
    <header className="flex h-20 flex-col items-center justify-center gap-2 bg-orange">
      <h1 className="text-2xl text-white">HN Reader</h1>
      <NavLinks />
    </header>
  );
}
