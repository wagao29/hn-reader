import { notFound } from 'next/navigation';
import { fetchStories } from '../lib/apis';
import { PAGE_ITEM_SIZE, STORY_TYPE } from '../lib/constants';
import { StoryType } from '../lib/types';
import { validatePageNum } from '../lib/utils';
import { Grid } from '../ui/grid';
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

  const itemIds = await fetchStories(params.story);
  const currentPage = validatePageNum(searchParams?.page);
  const totalPages = Math.ceil(itemIds.length / PAGE_ITEM_SIZE);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <main className="my-10 flex flex-grow flex-col items-center justify-center gap-10">
      <Grid itemIds={itemIds} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
