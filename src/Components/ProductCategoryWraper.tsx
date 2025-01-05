import React from "react";
import ProductCategory from "./ProductCategory";
import { useEffect } from "react";
export default function ProductCategoryWraper() {
  //useEffect to scroll to top
  useEffect(() => {
    console.log("scrolling to top");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProductCategory
        productDetails={[
          {
            title: "H&M",
            description: "Boys Teddy Hoody",
            price: 1999,
            images: ["/product1.png", "/product2.png"],
            rating: 4.5,
            likes: 4.5,
          },
          {
            title: "H&M",
            description: "Boys Teddy Hoody",
            price: 1999,
            images: ["/product2.png", "/product1.png"],
            rating: 4.5,
            likes: 4.5,
          },
          {
            title: "H&M",
            description: "Boys Teddy Hoody",
            price: 1999,
            images: ["/product3.png", "/product2.png"],
            rating: 4.5,
            likes: 4.5,
          },
        ]}
      />
    </div>
  );
}
