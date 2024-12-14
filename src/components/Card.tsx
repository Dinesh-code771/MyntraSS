import React from 'react'

export default function Card({
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
    <div className=''>
    <div className="flex flex-col gap-3 rounded justify-center items-center text-black bg-[#becff5] my-2 min-w-[80px] max-w-[80px] shadow-lg">
    <img className="bg-gradient-to-r from-[#6EB6F2] to-[#166CF6] ... w-full h-full" src={src} alt="categoryImage"  />
    <p className="text-xs font-semibold px-2 ">{title}</p>
    </div>
    </div>
  )
}
