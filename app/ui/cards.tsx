/* eslint-disable @next/next/no-img-element */
import { fetchItem, fetchOgpImage } from '../lib/data';
import { ItemId } from '../lib/definition';
import { formatTimeAgo } from '../lib/utils';

export async function Card({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item) return null;

  const ogpImage = item.url
    ? await fetchOgpImage(item.url)
    : '/ogp-placeholder.svg';

  return (
    <div className="grid-item col-span-1 w-80 rounded-xl bg-white">
      <img
        src={ogpImage || '/ogp-placeholder.svg'}
        alt={item.title}
        className="h-40 w-full rounded-t-xl object-cover"
        width={320}
        height={160}
      />
      <div className="flex h-40 flex-col justify-between p-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray">{formatTimeAgo(item.time)}</span>
          <p className="font-bold">{item.title}</p>
        </div>
        <div className="flex w-full items-center justify-between text-sm text-gray">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <img
                src={'/ic-score.svg'}
                alt="score icon"
                width={18}
                height={18}
              />
              <span>{item.score}</span>
            </div>
            <div className="flex items-center">
              <img
                src={'/ic-comment.svg'}
                alt="comment icon"
                width={24}
                height={24}
              />
              <span>{item.descendants}</span>
            </div>
          </div>
          <span>{`by ${item.by}`}</span>
        </div>
      </div>
    </div>
  );
}
