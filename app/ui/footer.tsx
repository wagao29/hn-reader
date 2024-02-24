import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
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
  );
}
