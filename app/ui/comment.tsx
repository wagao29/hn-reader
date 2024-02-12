import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchItem } from '../lib/data';
import { ItemId } from '../lib/definition';
import { formatTimeAgo } from '../lib/utils';

export async function Comment({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item) return null;

  return (
    <div className="w-full rounded-xl bg-white px-4 pb-2 pt-4">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.text),
        }}
      />
      <div className="flex justify-between text-sm text-gray">
        <div className="flex gap-2">
          <span>{formatTimeAgo(item.time)}</span>
          <span>{`by ${item.by}`}</span>
        </div>
        <Link
          className="underline underline-offset-2"
          href={`https://news.ycombinator.com/item?id=${itemId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          read more
        </Link>
      </div>
    </div>
  );
}
