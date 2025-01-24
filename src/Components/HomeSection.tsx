import React from "react";
import Categories from "./Categories";
import Banners from "./Banners";
import Search from "./SearchBar";
import useWindowSize from "../Hooks/useWindowSize";
import Brands from "./Brands";
import ShopByCategory from "./ShopByCategory";

export default function HomeSection() {
  const { width, height } = useWindowSize();

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="bg-white p-2 sticky top-[55px]">
        <Search
          onChange={(e) => console.log(e.target.value)}
          value=""
          placeHolder={"search by brand and categories"}
          className="rounded-full shadow-lg overflow-hidden px-2 md:hidden "
        />
      </div>
      <Categories />
      <Banners
        banner={
          width > 880
            ? [
                { src: "banner1.png", alt: "" },
                { src: "Banner4.png", alt: "" },
              ]
            : [
                { src: "Banner3.png", alt: "" },
                { src: "Banner2.png", alt: "" },
              ]

          // {src:"https://assets.myntassets.com/f_webp,w_980,c_limit…ed0a83b801733424846403-Sale_1920x504-HP-----5.jpg",alt:""},
          // {src:"",alt:""},
        }
      />

      <Brands
        title="First Time On Discounts"
        sections={[
          {
            src: [
              "deals1.png",
              "deals2.png",
              "deals3.png",
              "deals1.png",
              "deals3.png",
              "deals2.png",
            ],
            alt: ["brand1", "brand2", "brand3", "brand1", "brand3", "brand2"],
          },
          {
            src: [
              "deals2.png",
              "deals2.png",
              "deals3.png",
              "deals1.png",
              "deals3.png",
              "deals2.png",
            ],
            alt: ["brand1", "brand2", "brand3", "brand1", "brand3", "brand2"],
          },
          {
            src: [
              "deals3.png",
              "deals2.png",
              "deals3.png",
              "deals1.png",
              "deals3.png",
              "deals2.png",
            ],
            alt: ["brand1", "brand2", "brand3", "brand1", "brand3", "brand2"],
          },
          {
            src: [
              "deals1.png",
              "deals2.png",
              "deals3.png",
              "deals1.png",
              "deals3.png",
              "deals2.png",
            ],
            alt: ["brand1", "brand2", "brand3", "brand1", "brand3", "brand2"],
          },
        ]}
      />

      <ShopByCategory
        title="Shop By Category"
        images={[
          { categoryName: "mens-clothing", src: "category1.png" },
          { categoryName: "Womens-clothing", src: "category2.png" },
          { categoryName: "Kids-clothing", src: "category4.png" },
          { categoryName: "ethical-clothing", src: "category5.png" },
          { categoryName: "western", src: "category6.png" },
          { categoryName: "footware", src: "category1.png" },
          { categoryName: "handbags", src: "category2.png" },
          { categoryName: "beauty", src: "category3.png" },
          { categoryName: "Kids-clothing", src: "category4.png" },
          { categoryName: "beauty", src: "category5.png" },
          { categoryName: "mens", src: "category6.png" },
        ]}
      />
    </div>
  );
}
