import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { addToWishList,resetWishList,setRefetch } from '../Redux/wishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { insertParticularColumn } from '../apis/insertParticularColumn';
import { useParams } from 'react-router-dom';
import { GoStarFill } from 'react-icons/go';
import { databases } from "../apis/appWrite.js";
import { Query } from "appwrite";
import fetchDataFromCollection from "../apis/fetchDataFromCollection";
import updateDocument from "../apis/updateDocument";

export default function ProductCard({
  id,
  title,
  description,
  price,
  images,
  size,
  rating,
  likes,
  isWishListItem = false, // condition to check whether it is wishListItem/productCard as we have 2 stylings as "WishList" : "WishListed"
  product,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  size?: string;
  rating: number;
  likes?: string;
  isWishListItem?: boolean;
  product: any;
}) {
  const [currentImage, setCurrentImage] = React.useState(0); //for images
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  //const wishList = useSelector((state: any) => state.wishListSlice.wishList);
  const [wishListItems, setWishListItems] = React.useState<any[]>([]);
  const refetch = useSelector((state: any) => state.wishListSlice.refetch);

  //setInterval callback fun updates the state to track which image is displayed in carousel
  //clearInterval(cleanup fun)called when component unmounts or before useEffect re-runs
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval); //it stops the timer9for the 1st time images change & stop
  }, [isHovered]);
 
  async function fetchAndUpdateData(
    product: any,
    isRemove = false //if you want to remove product
  ) {
    //fetch data from server & update data in server everyTime it run's 
    let items = await fetchDataFromCollection(
      "676a1ec4001bf5b712d9",
      "67a9650e00254ea62e60",
      "67a966630010d16c0e61",
      "$id",
      "wishtListProducts"
    );
    if (isRemove) {
      items = items.filter((item: any) => item.id !== product.id); //removing
    }
    // update data in server
    const res = await updateDocument(
      "676a1ec4001bf5b712d9",
      "67a9650e00254ea62e60",
      "67a966630010d16c0e61",
      "wishtListProducts",
      isRemove ? [...items] : [...items, product]
    );

    //update state
    isRemove ? setWishListItems(items) : setWishListItems([...items, product]);
    if (isRemove) {
      dispatch(setRefetch(!refetch));//refetching again
    }
    return res;
  }

  //Adding wishListItems in LocalStorage
  function handleWishList(product: any) {
    //onClick we have to send whole productCard so we gave "id"
    //when we selected 1 item it will save in wishList & no duplicates allowed
    if (wishListItems.includes(id)) {
      return;
    } //we are disabling the button because it already added to wishList
    //console.log('clicked');
    //dispatch(addToWishList(id));
    fetchAndUpdateData(product);
  }

  function handleRemove(product: any) {
    fetchAndUpdateData(product, true);//isRemove-true
  }

  //fetch items only once & store in useState "WishListItems"
  useEffect(() => {
    async function fetchItems() {
      const data = await fetchDataFromCollection(
        "676a1ec4001bf5b712d9",
        "67a9650e00254ea62e60",
        "67a966630010d16c0e61",
        "$id",
        "wishtListProducts"
      );
      setWishListItems(data);
    }
    fetchItems();
  }, []);

  return (
    <div
      className={`p-2 ${!isWishListItem ? 'hover:shadow-lg' : 'border relative'}`}
      onClick={() => {
        if (isWishListItem) return; //if it is wishlist item return
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0); //for get 1st image
      }}
    >
      <div className="w-auto ">
        {/* top section */}
        <div
          className={`cursor-pointer w-full  h-auto relative
           ${isHovered ? 'h-auto' : ''}
             transition ease-in-out`}
        >
          <img
            src={images[currentImage]}
            alt="productImages"
            className="w-full  h-full object-cover"
          />
          {!isWishListItem && !isHovered && (
            <div className="rating absolute flex gap-2 bottom-1 left-1 bg-[#D4D4D4] px-1 py-1.5 rounded">
              <p className="font-bold text-xs flex text-black ">
                {rating} <GoStarFill className="text-sky-400 mx-1 mt-[2px]" /> |{' '}
              </p>
              <p className="font-bold text-xs text-black">{likes}</p>
            </div>
          )}
        </div>
        <div className="wrapper flex flex-col gap-1 p-3 ">
          <div className="dotsWrapper flex justify-center gap-3 py-2">
            {isHovered &&
              images.length > 1 &&
              images.map((image, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    className={`w-1 h-1 rounded-full mx-1  ${
                      currentImage === index ? 'bg-[#F76789]' : 'bg-[#c6c6c6]'
                    }`}
                  ></div>
                );
              })}
          </div>
          <div className="bottomSection flex flex-col gap-2 ">
            {isHovered ? (
              <>
                <div
                  className={`wishList cursor-pointer mt-2 ${
                    wishListItems.map((item) => item.id).includes(id) ? 'bg-[lightGrey]' : 'bg-white'
                  } flex justify-center gap-2 items-center border py-2  rounded-md`}
                >
                  {wishListItems.includes(id) ? (
                    <FaHeart
                      size={15}
                      onClick={() => handleWishList(product)}
                      color={'red'}
                    />
                  ) : (
                    <FaRegHeart size={15} onClick={() => handleWishList(product)} />
                  )}
                  <p className="font-bold uppercase text-sm text-[#282C3F] ">
                    {/* //converting product to id & comparing */}
                    {wishListItems.map((item) => item.id).includes(id) ? 'WishListed' : 'WISHLIST'}
                  </p>
                </div>
                <div className="size ">
                  <span>
                    <p className="text-xs  text-[#868893]">Sizes:40</p>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-xs font-bold text-[#282C3F]">{title}</h4>
                <p className="text-xs text-[#868893]">{description}</p>
              </>
            )}

            <p className="text-xs font-bold text-[#282C3F]">{`Rs.${price}`}</p>
            {/* if it is wishList item then show this style in productCard */}
            {isWishListItem ? (
              <div className="w-full flex justify-center items-center border-t ">
                <button className="pt-2 font-semibold text-[#ff3e6c] text-sm">
                  Move To Bag
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="cross cursor-pointer absolute top-2 right-2">
          <button onClick={() => handleRemove(product)}
          className="text-xs bg-[lightgrey] py-2 px-3 rounded-full">
            X
          </button>
        </div>
      </div>
    </div>
  );
}
