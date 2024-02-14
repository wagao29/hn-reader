import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchItem } from '../lib/data';
import { ItemId, ORIGIN_URL } from '../lib/definition';
import { formatTimeAgo } from '../lib/utils';

export async function Comment({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item || item.dead || item.deleted) return null;

  return (
    <div className="w-full rounded-xl bg-white px-4 pb-2 pt-4 shadow-md">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.text),
        }}
      />
      <div className="mt-2 flex justify-between text-sm text-gray">
        <div className="flex gap-2">
          <span>{formatTimeAgo(item.time)}</span>
          <Link
            className="underline-offset-2 hover:underline"
            href={`${ORIGIN_URL}/user?id=${item.by}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {`by ${item.by}`}
          </Link>
        </div>
        <Link
          className="underline underline-offset-2"
          href={`${ORIGIN_URL}/item?id=${itemId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          read more
        </Link>
      </div>
    </div>
  );
}
