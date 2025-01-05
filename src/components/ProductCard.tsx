import React, {useEffect} from 'react';
import { FaRegHeart } from "react-icons/fa";


export default function ProductCard({
    title,
    description,
    price,
    images,
    size,
    rating,
    likes,
}:{
    title:string;
    description:string;
    price:number;
    images:string[];
    size?:string;
    rating:number;
    likes?:string;
}) {
 
    const [currentImage, setCurrentImage] = React.useState(0);  //for images
    const [isHovered,setIsHovered] = React.useState(false);

//setInterval callback fun updates the state to track which image is displayed in carousel
//clearInterval(cleanup fun)called when component unmounts or before useEffect re-runs 
    useEffect (()=>{
        let interval: NodeJS.Timeout;
        if (isHovered){
        interval = setInterval(()=>{     
          setCurrentImage((prev) => (prev+1) % images.length)
        },2000);
        };
        return ()=> clearInterval(interval);  //it stops the timer
      },[isHovered]);

  return (
    <div className='p-2' 
        onClick={()=>{
        setIsHovered(!isHovered);
        }}
        onMouseLeave={()=>{
            setIsHovered(false);
            setCurrentImage(0); //for get 1st image
        }}
        >
       <div className="w-auto hover:shadow-lg">
          {/* top section */}
          <div className={`cursor-pointer w-full  h-auto relative ${isHovered ? "h-[250px]" : ""}
             transition ease-in-out`}>
             <img src={images[currentImage]} alt="shirts" 
                 className='w-full  h-full object-cover'/>
               {
                 !isHovered && (
                  <div className="rating absolute flex gap-2 bottom-1 left-1 bg-[#D4D4D4] px-2 py-1.5 rounded">
                     <p className='font-bold text-xs text-black'>{rating}</p>
                     <p className='font-bold text-xs text-black'>{likes}</p>
                  </div> )
               }
          </div>
          <div className='wrapper flex flex-col gap-1 p-3 '>
              <div className='dotsWrapper flex justify-center gap-3 py-2'>
                 {
                  isHovered && images.length > 1 &&
                  images.map((image, index)=>{
                  return <div onClick={(e)=>{
                       e.stopPropagation(); 
                       setCurrentImage(index)}}
                   className={`w-1 h-1 rounded-full mx-1  ${currentImage === index ? 
                    "bg-[#F76789]" : "bg-[#c6c6c6]"}`}></div>
                  })
                 }
              </div>
              <div className='bottomSection flex flex-col gap-2 '>
                 {
                  isHovered ? (
                    <> 
                     <div className='flex justify-center items-center gap-2 border rounded-md px-2 py-1'>
                         <FaRegHeart size={15}/>
                         <p className='font-bold text-sm text-[#282C3F]'>WISHLIST</p>
                     </div>
                     <div className='size '>
                         <span>
                            <p className='text-xs  text-[#868893]'>Sizes:40</p>
                         </span>
                     </div>
                    </>
                 ):( 
                 <> 
                    <h4 className='text-xs font-bold text-[#282C3F]'>{title}</h4>
                   <p className='text-xs text-[#868893]'>{description}</p>
                 </>)
                 }
              
                 <p className='text-xs font-bold text-[#282C3F]'>Rs.{price}</p>
              </div>
          </div>
       </div>
    </div>
  )
}
