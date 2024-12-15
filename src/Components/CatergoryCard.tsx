import React from "react";

export default function CatergoryCard({
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
    <div className="flex flex-col gap-3 justify-center  text-black border rounded-md items-center px-2 py-1 min-w-[0px] max-w-[80px] shadow-lg ">
      <img className="w-full h-full" src={src} alt="catergoryImage" />
      <p className="text-xs py-1 px-2">{title}</p>
    </div>
  );
}
