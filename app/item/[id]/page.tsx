import { fetchItem } from '@/app/lib/apis';
import { ORIGIN_URL } from '@/app/lib/constants';
import { ItemId } from '@/app/lib/types';
import { formatTimeAgo } from '@/app/lib/utils';
import { Comment } from '@/app/ui/comment';
import { Icons } from '@/app/ui/icons';
import { CommentSkeleton } from '@/app/ui/skeletons';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: ItemId } }) {
  const item = await fetchItem(params.id);
  if (!item) {
    notFound();
  }

  return (
    <main className="mx-5 my-10 flex-grow md:mx-20">
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
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.text),
        }}
      />
      <div className="mt-10 flex flex-col gap-5">
        {item.kids ? (
          item.kids.map((itemId) => {
            return (
              <Suspense key={itemId} fallback={<CommentSkeleton />}>
                <Comment itemId={itemId} />
              </Suspense>
            );
          })
        ) : (
          <p className="text-center text-lg text-gray">No comments</p>
        )}
      </div>
    </main>
  );
}
