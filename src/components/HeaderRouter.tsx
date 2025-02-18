import React from "react";
import { Link } from "react-router-dom";

export default function HeaderRouter({
  titles, //array of objects
}: {
  titles: { title: string; link: string }[];
}) {
  return (
    <div className="flex gap-4">
      {titles.map((title, index) => (
        <div key={index} className="flex items-center gap-2">
          {index !== titles.length - 1 ? ( //Checks if the item is NOT the last one.
            <Link className="text-[#535665] text-sm hover:underline" to={`/${title.link}`}>
              {title.title}
            </Link>
          ) : (//render plain text for last item
            <p className="text-[#535665] text-sm font-bold">{title.title}</p>
          )}
          {index !== titles.length - 1 && (
            <div className=" flex items-center justify-center text-[#535665]">/</div>
          )}
        </div>
      ))}
    </div>
  );
}