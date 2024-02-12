import Image from 'next/image';

export function Icons({
  score,
  descendants,
}: {
  score: number;
  descendants: number | undefined;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        <Image src={'/ic-score.svg'} alt="score icon" width={18} height={18} />
        <span>{score}</span>
      </div>
      <div className="flex items-center">
        <Image
          src={'/ic-comment.svg'}
          alt="comment icon"
          width={24}
          height={24}
        />
        <span>{descendants}</span>
      </div>
    </div>
  );
}
