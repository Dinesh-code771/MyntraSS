import React from 'react';

export default function CategoryCard({
  src,
  alt,
  width,
  height,
  title,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3  justify-center items-center text-black bg-cyan-500 my-2 min-w-[80px] max-w-[80px] shadow-lg">
      <img className="bg-gradient-to-r from-cyan-500 to-blue-500 ... w-full h-full" src={src} alt="categoryImage"  />
      <p className="text-xs font-semibold px-2 pb-1">{title}</p>
    </div>
  );
}
