import { Card } from '@/app/ui/cards';
import { notFound } from 'next/navigation';
import { fetchStories } from '../lib/data';
import { PAGE_ITEM_SIZE, STORY_TYPE, StoryType } from '../lib/definition';

export default async function Page({
  params,
}: {
  params: { story: StoryType };
}) {
  const isValidPath = STORY_TYPE.includes(params.story);
  if (!isValidPath) {
    notFound();
  }
  const itemIds = await fetchStories(params.story);

  return (
    <main className="my-10 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {itemIds.slice(0, PAGE_ITEM_SIZE).map((itemId, index) => {
          return <Card key={index} itemId={itemId} />;
        })}
      </div>
    </main>
  );
}
