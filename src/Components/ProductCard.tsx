import React from "react";
import { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({
  title,
  description,
  price,
  images,
  size,
  rating,
  likes,
}: {
  title: string;
  description: string;
  price: number;
  images: string[];
  size?: number;
  rating: number;
  likes?: number;
}) {
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);
  return (
    <div
      onClick={() => setIsHovered(!isHovered)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className=" hover:shadow-lg "
    >
      <div
        className={`w-[200px] relative h-auto  cursor-pointer ${isHovered ? "h-[200px]" : ""} transition-ease-in-out`}
      >
        <img
          src={images[current]}
          alt=""
          className="w-full  h-full object-cover"
        />
        {!isHovered && (
          <div className="rating absolute bottom-1 items-center flex gap-3 left-1 bg-[#D4D4D4] px-2 py-3 text-black rounded-sm">
            <p className="text-[0.8rem] font-bold ">{rating}</p>
            <p className="text-[0.6rem] font-bold ">{likes}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="dotsWrapper flex justify-center gap-3">
          {isHovered &&
            images.length > 1 &&
            images.map((image, index) => {
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                  className={`w-[6px] h-[6px] rounded-full bg-slate-300 ${current === index ? "bg-pink-400" : "bg-slate-300"}`}
                ></div>
              );
            })}
        </div>
        <div className="flex gap-3 flex-col">
          {isHovered ? (
            <>
              <div className="wishlist mt-2 flex justify-center gap-3 items-center border py-2 border-[] rounded-md">
                <FaRegHeart />
                <p className="uppercase font-bold text-xs"> WishList</p>
              </div>
              <div className="size">
                <p className="text-xs ">Size: 40</p>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-sm font-bold">{title}</h4>
              <p className="text-xs">{description}</p>
            </>
          )}
          <p className="text-xs font-bold">{`Rs.${price}`}</p>
        </div>
      </div>
    </div>
  );
}
