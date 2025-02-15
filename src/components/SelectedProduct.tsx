import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { databases } from '../apis/appWrite';
import { listDocuments } from '../apis/listDocuments';
import ReviewComponent from './ReviewComponent';
import { GoStarFill } from 'react-icons/go';
import { HiShoppingBag } from 'react-icons/hi';
import { IoHeartOutline } from 'react-icons/io5';

export default function SelectedProduct() {
  const { id, name } = useParams<{ id: string; name: string }>();
  const [product, setProduct] = useState<any>(null);

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
      //   console.log(selectedProduct, 'selectedProduct');

      setProduct(selectedProduct);
    };
    fetchProduct();
  }, [id, name]);

  return (
    <div className="container flex flex-col gap-4 w-[70%] mx-auto h-[80%]">
      <div className="header pt-[20px] ">
        <h1 className="text-[#282c3f] p-2">{'This is a header'}</h1>
      </div>
      <div className="body flex gap-5 h-full flex-col lg:flex-row">
        <div className="left flex-1 grid grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-full h-[400px] bg-gray-200 shadow-md">
              {/* {product?.images.map((image:any)=>{})} */}
              <img
                src={product?.images[index]}
                alt={product?.title}
                className="w-full h-full object-cover cursor-zoom-in
                 hover:scale-[1.2] transition-all duration-300"
               
              />
            </div>
          ))}
        </div>
        <div className="right flex-1 flex flex-col gap-4">
          <div className="title_and_description_container">
            <h1 className="text-2xl font-bold text-[#282c3f]">
              {product?.title}
            </h1>
            {/* <p className="text-[#535665] font-light">
              {`${product?.price} lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
            </p> */}
            <p className="text-[#535665] font-light mt-1">
              {product?.description}
            </p>
            <div className="flex gap-2 border-1 p-1 w-[140px] rounded mt-3">
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
              <h1 className="text-md text-[20px] text-[#282c3f] font-semibold uppercase">Select Size</h1>
              <p className="flex gap-2 uppercase text-sm font-bold text-rose-500 pt-1">
                size chart <span>&gt;</span>
              </p>
            </div>
            <div className="size_container flex gap-2 my-3 cursor-pointer">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="size_box border cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  {index + 40}
                </div>
              ))}
            </div>
          </div>

          <div className="addToBag_and_wishlist_container flex gap-4 pb-6 border-b">
            <button className="bg-rose-500 flex-1 gap-1 py-4 px-2 border-none hover:bg-rose-400 cursor-pointer rounded-md flex items-center justify-center text-white font-bold uppercase">
              <HiShoppingBag size={20} />
              <p>Add to Bag</p>
            </button>
            <button className=" flex-1 border border-slate-200 hover:border-slate-600 bg-white py-4 px-2 rounded-md flex items-center justify-center gap-1">
              <IoHeartOutline size={20} />
              <p className="text-[#282c3f] font-bold text-[15px] uppercase">
                Wishlist</p>
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
    </div>
  );
}
