import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
// import { setWishList } from '../Redux/wishListSlice';
// import { listDocuments } from '../apis/listDocuments';
// import { useParams } from 'react-router-dom';
// import { setProductsDetails } from '../Redux/navBarSlice';
// import { store } from '../Redux/store.js';
// import { databases } from "../apis/appWrite";
// import { Query } from "appwrite";
import fetchDataFromCollection from "../apis/fetchDataFromCollection";

export default function WishListedItems() {

    //fetched whishListItems from DB we are storing here in this useState
    const [wishListItems, setWishListItems] = React.useState<any[]>([]);
    const refetch = useSelector((state: any) => state.wishListSlice.refetch);

    //fetch wishList items from database
    useEffect(() => {
      //we are getting using "fetchDataFromCollection" & wrap inside a function
      async function fetchWishListItems() {
        const data = await fetchDataFromCollection(
          "676a1ec4001bf5b712d9",  //DB ID
          "67a9650e00254ea62e60", // Wishlist(collectionID)
          "67a966630010d16c0e61", // Wishlist(DocumentID)
          "$id",                  //queryKey(based on row)
          "wishtListProducts"    //selectKey Attribute(col)
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
              description={product.description}
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
  