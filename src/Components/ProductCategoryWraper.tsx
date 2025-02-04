import React from "react";
import ProductCategory from "./ProductCategory";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { listDocuments } from "../apis/listDocuments";
import { useSelector } from "react-redux";

export default function ProductCategoryWraper() {
  //useEffect to scroll to top
  const { name } = useParams<{ name: string }>();
  const globalSearchValue = useSelector(
    (state: any) => state.navBarSlice.globalSearchValue
  );

  const selectedCategory = useSelector(
    (state: any) => state.filterSlice.Categorie
  );
  const selectedBrand = useSelector((state: any) => state.filterSlice.Brand);
  const selectedDiscount = useSelector(
    (state: any) => state.filterSlice.Discount
  );
  const selectedColor = useSelector((state: any) => state.filterSlice.Colors);
  const prices = useSelector((state: any) => state.filterSlice.prices);
  const [productDetails, setProductDetails] = React.useState<any[]>([]);
  const [searchedProductDetails, setSearchedProductDetails] = React.useState<
    any[]
  >([]);

  //fetch products from database
  useEffect(() => {
    const categoryNameValue = name;
    async function fetchDetails() {
      const details: any = await listDocuments(
        "676a1ec4001bf5b712d9",
        "676a1ee4001ae452e2df",
        "CategoryType",
        name,
        ["productDetails"]
      );
      console.log(details, "details");
      setProductDetails(details?.productDetails);
    }
    fetchDetails();
    // databases
    //   .listDocuments("676a1ec4001bf5b712d9", "676a1ee4001ae452e2df", [
    //     Query.equal("CategoryType", categoryNameValue as any),
    //   ])
    //   .then((response: any) => {
    //     console.log("API Response:", response); // Log entire response
    //     if (response?.documents?.length) {
    //       const { documents }: { documents: any } = response;
    //       console.log(documents, "documents fetched");
    //       const productDetails = JSON.parse(
    //         documents[0]?.productDetails || "{}"
    //       );
    //       setProductDetails(productDetails);
    //     } else {
    //       console.warn("No documents found for this category.");
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.error("API Error:", error);
    //   });
  }, []);

  //search functionality
  useEffect(() => {
    let categoryName = selectedCategory?.map((category: any) =>
      category.filterName?.toLowerCase()
    );
    let selectedColorNames = selectedColor?.map((color: any) =>
      color.filterName?.toLowerCase()
    );

    console.log(selectedColor, "rss", selectedColorNames);
    let pricesString = prices.filterName;
    let [min, max] = ["0", "0"];
    if (pricesString?.length > 0) {
      [min, max] = [pricesString.split(" ")[1], pricesString.split(" ")[3]];
    }

    let brandsName = selectedBrand.map((brand: any) =>
      brand.filterName.toLowerCase()
    );

    let selectedDiscountValue = selectedDiscount?.map((discount: any) =>
      discount.filterName?.toLowerCase()
    );

    console.log(selectedDiscountValue, "DiscountRangeFromRedux");

    let filteredProducts = productDetails
      //filter by categoryType
      ?.filter((product: any) => {
        if (categoryName.includes(product.categoryType?.toLowerCase())) {
          return product;
        } else if (categoryName.length === 0) {
          return product;
        }
      })

      //filter by brands
      .filter((product: any) => {
        if (brandsName.includes(product.brand?.toLowerCase())) {
          return product;
        } else if (brandsName.length === 0) {
          return product;
        }
      })

      //filter by Discount Range
      ?.filter((product: any) => {
        //checking whether it is an array because include works on array
        //(string(product.discount))-converts product.discount a number into string

        if (
          Array.isArray(selectedDiscountValue)
            ? selectedDiscountValue[0]?.includes(product.discount)
            : false
        ) {
          // if (Discount?.includes(product.discountRange?.toLowerCase())) {
          return product;
        } else if (selectedDiscountValue?.length === 0) {
          return product;
        }
      })

      //filter by price
      ?.filter((product: any) => {
        if (parseInt(min) && parseInt(max)) {
          return (
            product.price >= parseInt(min) && product.price <= parseInt(max)
          );
        } else {
          return product;
        }
      })

      //color filter
      ?.filter((product: any) => {
        console.log(product, selectedColorNames, "colors");
        if (
          // Array.isArray(product.colors) &&
          product?.colors?.some((item: any) => {
            return selectedColorNames.join("").includes(item?.toLowerCase());
          })
        ) {
          return product;
        } else if (selectedColorNames.length === 0) {
          return product;
        }
      })

      //search by title
      ?.filter((product: any) => {
        return product.title
          .toLowerCase()
          .includes(globalSearchValue.toLowerCase());
      });
    setSearchedProductDetails(filteredProducts);
  }, [
    globalSearchValue,
    productDetails,
    prices,
    selectedCategory,
    selectedBrand,
    selectedColor,
    selectedDiscount,
  ]);

  return (
    <>
      <ProductCategory productDetails={searchedProductDetails} />
    </>
  );
}

// import React from "react";
// import ProductCategory from "./ProductCategory";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { listDocuments } from "../apis/listDocuments";

// export default function ProductCategoryWraper() {
//   const { name } = useParams<{ name: string }>();
//   const [productDetails, setproductDetails] = React.useState<any[]>([]);

//   //useEffect to scroll to top
//   useEffect(() => {
//     const categoryNameValue = name;
//     //   databases
//     //     .listDocuments("676a1ec4001bf5b712d9", "676a1ee4001ae452e2df", [
//     //       Query.equal("CategoryType", categoryNameValue as any),
//     //     ])
//     //     .then((response) => {
//     //       const { documents }: { documents: any } = response;
//     //       const productDetails = JSON.parse(documents[0].productDetails);
//     //       setproductDetails(productDetails);
//     //       console.log(productDetails, "productDetails");
//     //     })
//     //     .catch((error:any)=>{
//     //       console.log(error);
//     //     })
//     // }, []);

//     listDocuments(
//       "676a1ec4001bf5b712d9",
//       "676a1ee4001ae452e2df",
//       "categoryType",
//       name,
//       ["productDetails"]
//     );
//     console.log("details")
//   }, []);

//   return (
//     <>
//       <ProductCategory productDetails={productDetails} />
//       {/* // productDetails={[  */}
//       {/* //     title: "H&M",
//         //     description: "Boys Teddy Hoody",
//         //     price: 1999,
//         //     images: ["/product1.png", "/product2.png"],
//         //     rating: 4.5,
//         //     likes: 4.5,
//         //   },
//         //   { */}
//       {/* //     title: "H&M",
//         //     description: "Boys Teddy Hoody",
//         //     price: 1999,
//         //     images: ["/product2.png", "/product1.png"],
//         //     rating: 4.5,
//         //     likes: 4.5,
//         //   }, */}
//       {/* //   {
//         //     title: "H&M",
//         //     description: "Boys Teddy Hoody",
//         //     price: 1999,
//         //     images: ["/product3.png", "/product2.png"],
//         //     rating: 4.5,
//         //     likes: 4.5,
//         //   },
//         // ]}
//       // /> */}
//     </>
//   );
// }
