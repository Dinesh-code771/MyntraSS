import React from "react";
import CatergoryCard from "./CatergoryCard";
// import {title} from "process";

export default function Categories() {
  let catergories = [
    {
      src: "deals1.png",
      title: "Grocery",
    },
    {
      src: "deals2.png",
      title: "Electronics",
    },
    {
      src: "deals3.png",
      title: "Fashion",
    },
    {
      src: "deals4.png",
      title: "Furniture",
    },
    {
      src: "deals1.png",
      title: "Books",
    },
    {
      src: "deals2.png",
      title: "Stationary",
    },
  ];

  return (
    <div className="w-full flex overflow-x-auto gap-5 md:hidden">
      {catergories.map((catergory, index) => {
        return (
          <>
            <CatergoryCard
              key={index}
              src={catergory.src}
              title={catergory.title}
            />
          </>
        );
      })}
    </div>
  );
}
