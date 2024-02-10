import { Card } from '@/app/ui/cards';
import { notFound } from 'next/navigation';
import { fetchStories } from '../lib/data';
import { PAGE_ITEM_SIZE, STORY_TYPE, StoryType } from '../lib/definition';
import { validatePageNum } from '../lib/utils';
import Pagination from '../ui/pagination';

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
  const cards = itemIds
    .slice((currentPage - 1) * PAGE_ITEM_SIZE, currentPage * PAGE_ITEM_SIZE)
    .map((itemId) => <Card key={itemId} itemId={itemId} />);
  const totalPages = Math.ceil(itemIds.length / PAGE_ITEM_SIZE);

  return (
    <main className="my-10 flex flex-col items-center justify-center gap-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards}
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
