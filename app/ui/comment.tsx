import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchItem } from '../lib/apis';
import { ORIGIN_URL } from '../lib/constants';
import { ItemId } from '../lib/types';
import { formatTimeAgo } from '../lib/utils';

export async function Comment({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item || item.dead || item.deleted) return null;

  return (
    <Link
      href={`${ORIGIN_URL}/item?id=${itemId}`}
      rel="noopener noreferrer"
      target="_blank"
      className="w-full rounded-xl bg-white px-4 pb-2 pt-4 shadow-md hover:shadow-xl"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            item.text.replace(/<a\b[^>]*>(.*?)<\/a>/g, '<span>$1</span>'),
          ),
        }}
      />
      <div className="mt-2 flex justify-end gap-2 text-sm text-gray">
        <span>{formatTimeAgo(item.time)}</span>
        <span>{`by ${item.by}`}</span>
      </div>
    </Link>
  );
}
