// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "./ProductCard";
// import { setWishList } from "../Redux/wishListSlice";
// import { listDocuments } from "../apis/listDocuments";
// import { useParams } from "react-router-dom";
// import { setProductsDetails } from "../Redux/navBarSlice";
// import { store } from "../Redux/store";

// let categoryType = ["Women"];

// export default function Wishlist() {
//   const wishListItems = useSelector(
//     (state: any) => state.wishListSlice.wishList || []
//   );

//   const productDetails = useSelector(
//     (state: any) => state.navBarSlice.productsDetails || []
//   );

//   const dispatch = useDispatch();
//   const { name } = useParams<{ name: string }>();

//   const productWishListItems = productDetails.filter((product: any) =>
//     wishListItems.includes(product.id)
//   );

//   //fetch
//   useEffect(() => {
//     async function fetchDetails(typeOfCategory: string) {
//       console.log("fetchingDetails", typeOfCategory);
//       const details: any = await listDocuments(
//         "676a1ec4001bf5b712d9",
//         "676a1ee4001ae452e2df",
//         "CategoryType",
//         typeOfCategory,
//         ["productDetails", "wishListItems"]
//       );

//       // // Get the latest state before updating
//       const currentWishList = store.getState().wishListSlice.wishList;
//       const currentProducts = store.getState().navBarSlice.productsDetails;

//       dispatch(
//         //[1]    ,,,    [2]
//         setWishList([...currentWishList, ...(details?.whishListItems || [])])
//       );
//       dispatch(
//         setProductsDetails([
//           ...currentProducts,
//           ...(details?.productDetails || []),
//         ])
//       );
//     }
//     categoryType.forEach((type) => {
//       fetchDetails(type);
//     });
//   }, []);

//   console.log("productWishListItems");

//   return (
//     <div className="wrapper w-[80%] mx-auto flex flex-col gap-2 py-10">
//       <h3>{`My WishList  ${productWishListItems?.length}`} Items</h3>
//       <div className="grid w-[80%] mx-auto  grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
//         {productWishListItems?.map((product: any, index: number) => (
//           <ProductCard
//             id={product.id}
//             key={product.title}
//             title={product.title}
//             description={product.description}
//             price={product.price}
//             images={product.images}
//             rating={product.rating}
//             isWishListItem={true}
//             product={product}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { listDocuments } from "../apis/listDocuments";
import { setWishList } from "../Redux/wishListSlice";
import { useParams } from "react-router-dom";
import { setProductsDetails } from "../Redux/navBarSlice";
import { store } from "../Redux/store";
import { databases } from "../apis/appWrite";
import { Query } from "appwrite";
import fetchDataFromCollection from "../apis/fetchDataFromCollection";
export default function WishList() {
  const [wishListItems, setWishListItems] = React.useState<any[]>([]);
  const refetch = useSelector((state: any) => state.wishListSlice.refetch);
  useEffect(() => {
    //fetch wishList items from database
    async function fetchWishListItems() {
      const data = await fetchDataFromCollection(
        "676a1ec4001bf5b712d9",
        "67a9650e00254ea62e60",
        "67a966630010d16c0e61",
        "$id",
        "wishtListProducts"
      );
      setWishListItems(data);
    }
    fetchWishListItems();
  }, [refetch]);

  return (
    <div className="wrapper  w-[80%] mx-auto flex flex-col gap-2 py-10">
      <h3>{`My wishList  ${wishListItems?.length} Items`}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
        {wishListItems?.map((product: any, index: number) => (
          <ProductCard
            id={product.id}
            key={product.title}
            title={product.title}
            decription={product.description}
            price={product.price}
            images={product.images}
            rating={product.rating}
            isWishListItem={true}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
