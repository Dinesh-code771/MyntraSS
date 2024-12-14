import React, { useEffect } from 'react';

export default function Banners({
  banner,
}: {
  banner: { src: string; alt: '' }[];
}) {
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banner.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="container  flex flex-col  gap-3">
      <div className="flex overflow-x-auto w-screen  ">
        {/*banner*/}
        <div className="imgWrapper flex flex-1 justify-center items-center ">
          <img
            className=" object-contain w-full flex justify-center items-center rounded-md"
            src={banner[current]?.src}
            alt={banner[current]?.alt}
          />
        </div>
      </div>
      {/*buttons*/}
      <div className="buttons flex justify-center items-center">
        {banner.map((banner, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 mx-1 rounded-full
               ${current === index ? 'bg-black' : 'bg-[#c6c6c6]'}`}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
