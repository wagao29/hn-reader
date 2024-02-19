/* eslint-disable @next/next/no-img-element */
'use client';

export function OgpImage({ title, url }: { title: string; url: string }) {
  return (
    <img
      src={url}
      alt={title}
      className="h-40 w-full rounded-t-xl object-cover"
      width={320}
      height={160}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/opengraph-image.png';
      }}
    />
  );
}
