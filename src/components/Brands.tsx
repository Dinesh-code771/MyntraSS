import React, {useEffect} from 'react';

export default function Brands({
  title,
  sections,
}: {
  title: string;
  sections: { src: string[]; alt: string[] }[]; //array of object type
}) {
  const [current, setCurrent] = React.useState(0);

  useEffect (()=>{
    const interval = setInterval(()=>{
      setCurrent((prev) => (prev+1) %sections.length)
    },3000);
    return ()=>{
      clearInterval(interval);
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className='text-center font-semibold text-opacity-75 text-4xl md:text-5xl text-orange-600 p-2 uppercase'>{title}</h3>
      <div className="sections ">
        {
          <div className="section flex">
            {sections[current].src.map((src, index) => {
              return (
                <div className="imageWrapper flex-1 cursor-pointer">
                  <img
                    src={src}
                    alt={sections[current].alt[current]}
                    className="w-full"
                    height={100}
                  />
                </div>
              );
            })}
          </div>
        }
      </div>
      <div className='buttons  flex justify-center items-center gap-1'>
       {
        sections.map((src,index)=>{
          return(
            <button 
            key={index}
            onClick={()=> setCurrent(index)}
            className={`w-2 h-2 rounded-full mx-1 
            ${current === index ? "bg-black" : "bg-[#c6c6c6]"}`}
            ></button>
          )
        })
       }
      </div>
    </div>
  );
}
