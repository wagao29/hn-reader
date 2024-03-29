'use client';

import { generatePagination, validatePageNum } from '@/app/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = validatePageNum(searchParams.get('page'));

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      {currentPage > 1 && (
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
        />
      )}

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page === '...' ? `ellipsis-${index}` : page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      {currentPage < totalPages && (
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
        />
      )}
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm text-gray',
    {
      'z-10 underline underline-offset-4 text-orange': isActive,
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
}: {
  href: string;
  direction: 'left' | 'right';
}) {
  return (
    <Link
      className="flex h-10 w-10 items-center justify-center rounded-md text-gray"
      href={href}
    >
      {direction === 'left' ? (
        <ChevronLeftIcon className="w-4" />
      ) : (
        <ChevronRightIcon className="w-4" />
      )}
    </Link>
  );
}
