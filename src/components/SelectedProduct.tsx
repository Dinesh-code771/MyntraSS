import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { databases } from '../apis/appWrite';
import { listDocuments } from '../apis/listDocuments';
import ReviewComponent from './ReviewComponent';
import { GoStarFill } from 'react-icons/go';
import { HiShoppingBag } from 'react-icons/hi';
//import { IoHeartOutline } from 'react-icons/io5';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { TbCards } from 'react-icons/tb';
import HeaderRouter from './HeaderRouter';
import updateDocument from '../apis/updateDocument';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetch } from '../Redux/wishListSlice';
import fetchDataFromCollection from '../apis/fetchDataFromCollection';
import { IoCloseOutline } from 'react-icons/io5';
import { PiLessThan, PiGreaterThan } from "react-icons/pi";

export default function SelectedProduct() {

  const { id, name } = useParams<{ id: string; name: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [wishListItems, setWishListItems] = useState<any>([]);
  const dispatch = useDispatch();
  const refetch = useSelector((state: any) => state.wishListSlice.refetch);

  //for model
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | undefined>(undefined);
  //for Previous(<)and Next(>)buttons
  const [currentIndex, setCurrentIndex] = useState(
    product?.images.indexOf(selectedImage) || 0
   );

  async function fetchAndUpdateData(product: any, isRemove = false) {
    //fetch data from server
    let items = await fetchDataFromCollection(
      //[{}]
      '676a1ec4001bf5b712d9',
      '67a9650e00254ea62e60',
      '67a966630010d16c0e61',
      '$id',
      'wishtListProducts'
    );

    if (isRemove) {
      items = items.filter((item: any) => item.id !== product.id); //9
    }
    // update data in server
    const res = await updateDocument(
      '676a1ec4001bf5b712d9',
      '67a9650e00254ea62e60',
      '67a966630010d16c0e61',
      'wishtListProducts',
      isRemove ? [...items] : [...items, product]
    );
    console.log(items, 'items');
    //update state
    isRemove ? setWishListItems(items) : setWishListItems([...items, product]);
    if (isRemove) {
      dispatch(setRefetch(!refetch));
    }
    return res;
  }

  function handleWishList(product: any) {
    if (wishListItems.includes(id)) {
      return;
    }
    console.log('clicked');
    // dispatch(addToWishList(id));
    fetchAndUpdateData(product);
  }

  //fetching productDetails from server name=kids,mens,women id-productCardId
  useEffect(() => {
    const fetchProduct = async () => {
      const product: any = await listDocuments(
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        name,
        ['productDetails']
      );
      let selectedProduct = product?.productDetails.find(
        //product.id === id (as we are getting id as string so we converted into number)
        (product: any) => product.id === parseInt(id as any)
      );
        console.log(selectedProduct, 'selectedProduct');

      setProduct(selectedProduct);
    };
    fetchProduct();
  }, [id, name]);

  //for model

  useEffect(()=>{
    setSelectedImage(product?.images[currentIndex]);
  },[currentIndex]);

  function openModel(image: any) {
    setSelectedImage(image);
    setIsModelOpen(true);
  }

  function closeModel() {
    setIsModelOpen(false);
  }

    //for Previous(<)and Next(>)buttons
    const handleNext = () => {
      console.log("called",currentIndex)
      setCurrentIndex((prevIndex:number) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex:number) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    };

  return (
    <div className="container  flex flex-col gap-4 w-[70%] mx-auto h-[80%]">
      <div className="header my-5 ">
        <HeaderRouter
          titles={[
            { title: 'Home', link: '' },
            { title: name as string, link: `category/${name}` },
            { title: product?.brand, link: '' },
          ]}
        />
        {/* <h1 className="text-[#282c3f] p-2">{'This is a header'}</h1> */}
      </div>
      <div className="body flex gap-5 h-full flex-col lg:flex-row">
        <div className="left  flex-1 grid grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full h-[400px] bg-gray-200 shadow-md"
            >
              {/* {product?.images.map((image:any)=>{})} */}
              <img
                src={product?.images[index]}
                alt={product?.title}
                className="w-full h-full object-cover cursor-pointer
                 hover:scale-[1.1] transition-all duration-300 "
                onClick={() => openModel(product?.images[index])}
              />
              {index === 1 && ( //to display for only 2nd image
                <div
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="absolute bottom-5 right-5 bg-white cursor-pointer rounded-full flex items-center justify-between px-2
                   hover:w-40 transition-all duration-300 h-10 w-10 border-2 border-gray-200 
                  shadow-lg"
                >
                  {isHovering && (
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-rose-500 font-semibold text-sm uppercase">
                      View similar
                    </p>
                  )}
                  <TbCards size={40} className="text-rose-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="right flex-1 flex flex-col gap-4">
          <div className="title_and_description_container">
            <h1 className="text-2xl font-bold text-[#282c3f]">
              {product?.brand}
            </h1>
            {/* <p className="text-[#535665] font-light">
              {`${product?.price} lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
            </p> */}
            <p className="text-[#535665] font-light mt-1">
              {product?.description}
            </p>
            <div className="flex gap-2 border p-1.5 w-[140px] rounded mt-3">
              <p className="text-sm text-[#282c3f] font-bold">
                {product?.rating}
              </p>
              <GoStarFill className="mt-0.5 text-teal-400" />
              <p className="text-[#535665] font-light text-sm">
                | {product?.likes} Likes
              </p>
            </div>
          </div>
          <div className="price_and_discount_container flex gap-2 items-center border-t ">
            <p className="text-[#282c3f] text-xl font-bold mt-4">{`₹${product?.price}`}</p>
            <p className="text-[#535665] font-light mt-4">{`${product?.discount}% off`}</p>
            <p className="text-orange-400 font-bold mt-4">{`( ₹ ${
              product?.price - product?.discount
            } )`}</p>
          </div>
          <p className="text-teal-500 text-sm font-semibold">
            inclusive of all taxes
          </p>

          <div className="moreColors_container flex flex-col gap-2">
            <h1 className="text-sm font-bold uppercase text-[#282c3f]">
              More Colors
            </h1>
            <div className="colors_container flex gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className=" h-[80px] w-[80px] bg-gray-200 my-2">
                  <img
                    src={product?.images[index]}
                    alt={product?.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="selectSize flex flex-col gap-2">
            <div className="flex gap-8">
              <h1 className="text-md text-[20px] text-[#282c3f] font-semibold uppercase">
                Select Size
              </h1>
              <p className="flex gap-2 uppercase text-sm font-bold text-rose-500 pt-1">
                size chart <span>&gt;</span>
              </p>
            </div>
            <div className="size_container flex gap-4 my-3  cursor-pointer">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="size_box border border-gray-400 cursor-pointer w-[45px] h-[45px] rounded-full flex items-center justify-center">
                  {index + 40}
                </div>
              ))}
            </div>
          </div>

          <div className="addToBag_and_wishlist_container flex gap-4 pb-6 ">
            <button className="bg-rose-500 flex-1 gap-1 py-4 px-2 border-none hover:bg-rose-400 cursor-pointer rounded-md flex items-center justify-center text-white font-bold uppercase">
              <HiShoppingBag size={20} />
              <p>Add to Bag</p>
            </button>
            <button
              onClick={() => handleWishList(product)}
              className=" flex-1 border cursor-pointer border-slate-300 hover:border-slate-600 bg-white py-4 px-2 rounded-md flex items-center justify-center gap-1"
            >
              {wishListItems.find((item: any) => item.id === product.id) ? (
                <FaHeart size={20} className="text-rose-500 " />
              ) : (
                <FaRegHeart size={18} className="text-[#535665]" />
              )}
              {/* <IoHeartOutline size={20} /> */}
              <p className="text-[#282c3f] font-bold text-[15px] uppercase">
                {wishListItems.find((item: any) => item.id === product.id)
                  ? 'WishListed'
                  : ' Wishlist'}
              </p>
            </button>
          </div>
          <div className="review_container order-3 lg:order-none">
            <ReviewComponent
              review={product?.review}
              rating={product?.rating}
              images={product?.images}
            />
          </div>
        </div>
      </div>
      {/* Model */}
      {isModelOpen && (
        <div className=" fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-75 flex items-center justify-center ">
          <div className="relative w-[80%] h-full bg-white bg-opacity-75 max-w-3xl">
            {/* close button */}
            <button
              onClick={() => {
                closeModel();
              }}
              className=" absolute m-4 bg-white rounded top-0 right-0  border-none 
               cursor-pointer  "
            >
              <IoCloseOutline size={50} className=" text-gray-400" />
            </button>
            {/* large image display */}
            <div className=''>
              <button onClick={handlePrev}
              className='absolute left-2 top-[380px] bg-white p-2 rounded shadow-lg hover:bg-gray-200 transition'>
              <PiLessThan size={25} className='text-gray-400 '/>
              </button>

              <img src={selectedImage} alt="productImage" 
                className="w-full h-full object-contain " />

              <button onClick={handleNext}
              className='absolute right-2 top-[380px] bg-white p-2 rounded shadow-lg hover:bg-gray-200 transition'>
              <PiGreaterThan size={25} className='text-gray-400 '/>
              </button>
            </div>
            {/* Image Thumbnails(small Images) */}
            <div className="flex flex-col gap-2 justify-center top-5 left-3  absolute  ">
              {product?.images.map((img:any, index:number) => (
                <img
                  key={index}
                  src={img}
                  alt={`ThumbnailSmallImages ${index}`}
                  className={`w-10 h-10 object-cover  gap-2 cursor-pointer border-2 ${
                    selectedImage === img ? "border-rose-500" : "border-white"
                  }`}
                  onClick={() => setSelectedImage(img)} // Update large image on click
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
