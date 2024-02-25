import { Card } from '@/app/ui/cards';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { fetchStories } from '../lib/data';
import { PAGE_ITEM_SIZE, STORY_TYPE, StoryType } from '../lib/definition';
import { validatePageNum } from '../lib/utils';
import Pagination from '../ui/pagination';
import { CardSkeleton } from '../ui/skeletons';

export default async function Page({
  params,
  searchParams,
}: {
  params: { story: StoryType };
  searchParams: { page?: string };
}) {
  const isValidPath = STORY_TYPE.includes(params.story);
  if (!isValidPath) {
    notFound();
  }

  const currentPage = validatePageNum(searchParams?.page);
  const itemIds = await fetchStories(params.story);
  const totalPages = Math.ceil(itemIds.length / PAGE_ITEM_SIZE);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <main className="my-10 flex flex-grow flex-col items-center justify-center gap-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {itemIds
          .slice(
            (currentPage - 1) * PAGE_ITEM_SIZE,
            currentPage * PAGE_ITEM_SIZE,
          )
          .map((itemId) => {
            return (
              <Suspense key={itemId} fallback={<CardSkeleton />}>
                <Card itemId={itemId} />
              </Suspense>
            );
          })}
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
