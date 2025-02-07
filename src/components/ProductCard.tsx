import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { addToWishList } from '../Redux/wishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { insertParticularColumn } from '../apis/insertParticularColumn';
import { useParams } from 'react-router-dom';
import { GoStarFill } from 'react-icons/go';

export default function ProductCard({
  id,
  title,
  description,
  price,
  images,
  size,
  rating,
  likes,
  isWishListItem = false, //there should be a condition to check whether it is wishList item on productCard
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
}) {
  const [currentImage, setCurrentImage] = React.useState(0); //for images
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  const wishList = useSelector((state: any) => state.wishListSlice.wishList);

  //setInterval callback fun updates the state to track which image is displayed in carousel
  //clearInterval(cleanup fun)called when component unmounts or before useEffect re-runs
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval); //it stops the timer
  }, [isHovered]);

  function handleWishList(id: number) {
    //onClick we have to send whole productCard so instead of this we send "title" as title is unique
    //when we selected 1 item it will save in wishList so
    if (wishList.includes(id)) {
      return;
    } //we are disabling the button because it already added to wishList
    //console.log('clicked');
    dispatch(addToWishList(id));
    //console.log(wishList, 'wishList');
  }

  //update wishListItems in DB
  useEffect(() => {
    async function updateDataInServerForTopFilter(data: any) {
      const res = await insertParticularColumn(
        data,
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        name,
        'wishListItems',
        false
      );
      return res;
    }
    if (!name) return;
    updateDataInServerForTopFilter(wishList);
  }, [wishList]);

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
                    wishList.includes(id) ? 'bg-[lightGrey]' : 'bg-white'
                  } flex justify-center gap-2 items-center border py-2  rounded-md`}
                >
                  { wishList.includes(id) ? (
                    <FaHeart
                      size={15}
                      onClick={() => handleWishList(id)}
                      color={'red'}
                    />
                  ) : (
                    <FaRegHeart size={15} onClick={() => handleWishList(id)} />
                  )}
                  <p className="font-bold uppercase text-sm text-[#282C3F] ">
                    { wishList.includes(id) ? 'WishListed' : 'WISHLIST'}
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
          <button className="text-xs bg-[lightgrey] py-2 px-3 rounded-full">
            X
          </button>
        </div>
      </div>
    </div>
  );
}
