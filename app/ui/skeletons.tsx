// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-lightgray/60 before:to-transparent';

export function CommentSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-32 w-full overflow-hidden rounded-xl bg-whitesmoke p-2 shadow-md`}
    ></div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} grid-item relative col-span-1 h-80 w-80 overflow-hidden rounded-xl bg-whitesmoke p-2 shadow-md hover:shadow-xl`}
    ></div>
  );
}

export default function CardsSkeleton() {
  return (
    <main className="my-10 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </main>
  );
}
