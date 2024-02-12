/* eslint-disable @next/next/no-img-element */
import { fetchItem } from '@/app/lib/data';
import { ItemId } from '@/app/lib/definition';
import { formatTimeAgo } from '@/app/lib/utils';
import { Icons } from '@/app/ui/icons';
import DOMPurify from 'isomorphic-dompurify';

export default async function Page({ params }: { params: { id: ItemId } }) {
  const item = await fetchItem(params.id);
  if (!item) return null;

  return (
    <main className="mx-20 my-10 flex flex-col">
      <h1 className="text-2xl">{item.title}</h1>
      <div className="flex w-full items-center justify-between text-sm text-gray">
        <Icons score={item.score} descendants={item.descendants} />
        <div className="flex gap-2">
          <span>{formatTimeAgo(item.time)}</span>
          <span>{`by ${item.by}`}</span>
        </div>
      </div>
      <div
        className="my-5"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.text),
        }}
      />
    </main>
  );
}
