/* eslint-disable @next/next/no-img-element */
import { fetchItem } from '@/app/lib/data';
import { ItemId, ORIGIN_URL } from '@/app/lib/definition';
import { formatTimeAgo } from '@/app/lib/utils';
import { Comment } from '@/app/ui/comment';
import { Icons } from '@/app/ui/icons';
import { CommentSkeleton } from '@/app/ui/skeletons';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: ItemId } }) {
  const item = await fetchItem(params.id);
  if (!item) return null;

  return (
    <main className="mx-5 my-10 md:mx-20">
      {item.url ? (
        <Link
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
          className="text-xl underline-offset-2 hover:underline"
        >
          {item.title}
        </Link>
      ) : (
        <h1 className="text-xl">{item.title}</h1>
      )}
      <div className="flex w-full items-center justify-between text-sm text-gray">
        <Icons score={item.score} descendants={item.descendants} />
        <div className="flex gap-2">
          <span>{formatTimeAgo(item.time)}</span>
          <Link
            href={`${ORIGIN_URL}/user?id=${item.by}`}
            rel="noopener noreferrer"
            target="_blank"
            className="underline-offset-2 hover:underline"
          >{`by ${item.by}`}</Link>
        </div>
      </div>
      <div
        className="my-5"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.text),
        }}
      />
      <div className="flex flex-col gap-5">
        {item.kids &&
          item.kids.map((itemId) => {
            return (
              <Suspense key={itemId} fallback={<CommentSkeleton />}>
                <Comment itemId={itemId} />
              </Suspense>
            );
          })}
      </div>
    </main>
  );
}
