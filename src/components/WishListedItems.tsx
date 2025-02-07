import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { setWishList } from '../Redux/wishListSlice';
import { listDocuments } from '../apis/listDocuments';
import { useParams } from 'react-router-dom';
import { setProductsDetails } from '../Redux/navBarSlice';
import { store } from '../Redux/store.js';

let categoryType = ["mens", "kids","women"];

export default function WishListedItems() {

    const dispatch = useDispatch();
    const { name } = useParams<{ name: string }>();

  const wishListItems = useSelector(
    (state: any) => state.wishListSlice.wishList
  );
  const productDetails = useSelector(
    (state: any) => state.navBarSlice.productsDetails
  );
  const productWishListItems = productDetails.filter((product: any) =>
    wishListItems.includes(product.id)
  );
//   console.log(
//     productWishListItems,
//     'productWishListItems',
//     productDetails,
//     'productDetails',
//     wishListItems,
//     'wishListItems'
//   );

  //here we are fetching data from DB using listDocuments
  useEffect(() => {
    async function fetchDetails(typeOfCategory: string) {
        console.log("fetching details", typeOfCategory);
      const details: any = await listDocuments(
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        typeOfCategory,
        ['wishListItems','productDetails' ]
      ); 
      console.log(details?.wishListItems, "details?.wishListItems");

      // Get the latest state before updating
      const currentWishList = store.getState().wishListSlice.wishList;
      const currentProducts = store.getState().navBarSlice.productsDetails;

      dispatch(
        setWishList([...currentWishList, ...(details?.wishListItems || [])])
      );
      dispatch(
        setProductsDetails([
          ...currentProducts,
          ...(details?.productDetails || []),
        ])
      );
    }

    categoryType.forEach((type) => {
      fetchDetails(type);
    });
  }, []);
  console.log(productWishListItems, "productWishListItems", wishListItems);

  return (
    <div className="wrapper h-auto w-[100%] mx-auto flex flex-col gap-2 py-10 pl-[20px]">
      <h3 className="font-bold text-[#282c3e]">
        {`You have  ${productWishListItems?.length} Items in your WishList :`}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
        {productWishListItems?.map((product: any) => (
          <ProductCard
            id={product.id}
            key={product.title}
            title={product.title}
            description={product.description}
            price={product.price}
            images={product.images}
            rating={product.rating}
            isWishListItem={true}
          />
        ))}
      </div>
    </div>
  );
}
