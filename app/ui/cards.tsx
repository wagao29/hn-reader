/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { fetchItem, fetchOgpImageUrl } from '../lib/apis';
import { ItemId } from '../lib/types';
import { formatTimeAgo } from '../lib/utils';
import { Icons } from './icons';
import { OgpImage } from './ogp-image';

export async function Card({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item || item.dead || item.deleted) return null;

  const ogpImageUrl = item.url
    ? await fetchOgpImageUrl(item.url)
    : '/opengraph-image.png';

  return (
    <Link
      href={`/item/${itemId}`}
      className="grid-item col-span-1 w-80 rounded-xl bg-white shadow-md hover:shadow-xl"
    >
      <OgpImage
        title={item.title}
        url={ogpImageUrl || '/opengraph-image.png'}
      />
      <div className="flex h-40 flex-col justify-between p-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray">{formatTimeAgo(item.time)}</span>
          <p className="font-bold">{item.title}</p>
        </div>
        <div className="flex w-full items-center justify-between text-sm text-gray">
          <Icons score={item.score} descendants={item.descendants} />
          <span>{`by ${item.by}`}</span>
        </div>
      </div>
    </Link>
  );
}
