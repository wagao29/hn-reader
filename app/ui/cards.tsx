/* eslint-disable @next/next/no-img-element */
import { fetchItem, fetchOgpImage } from '../lib/data';
import { ItemId } from '../lib/definition';

export async function Card({ itemId }: { itemId: ItemId }) {
  const item = await fetchItem(itemId);
  if (!item) return null;

  const ogpImage = item.url
    ? await fetchOgpImage(item.url)
    : '/ogp-placeholder.svg';

  return (
    <div className="border-gray grid-item col-span-1 w-80 rounded-xl border-2 bg-white p-2">
      <img
        src={ogpImage || '/ogp-placeholder.svg'}
        alt={item.title}
        width={300}
        height={300}
      />
      <div className="p-4">
        <p className="font-bold"> {item.title}</p>
        <div className="flex gap-2">
          <p>{item.score}</p>
          <p>{item.time}</p>
          <p>{item.by}</p>
          <p>{item.descendants}</p>
        </div>
      </div>
    </div>
  );
}
