import { Suspense } from 'react';
import { PAGE_ITEM_SIZE } from '../lib/constants';
import { ItemId } from '../lib/types';
import { Card } from './cards';
import { CardSkeleton } from './skeletons';

export function Grid({
  itemIds,
  currentPage,
}: {
  itemIds: ItemId[];
  currentPage: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {itemIds
        .slice((currentPage - 1) * PAGE_ITEM_SIZE, currentPage * PAGE_ITEM_SIZE)
        .map((itemId) => {
          return (
            <Suspense key={itemId} fallback={<CardSkeleton />}>
              <Card itemId={itemId} />
            </Suspense>
          );
        })}
    </div>
  );
}
