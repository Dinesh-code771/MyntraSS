import React, {useEffect} from 'react'


export default function Banners({
    banner,
}:{
    banner:{src:string;alt:""}[];
}) {
    const [current,setCurrent]= React.useState(0);
                                                                                                                                                                                                                                                                                                                                  
    useEffect(()=>{
        const interval=
        setInterval(()=>{
        
            setCurrent((prev)=> {
                console.log(prev,"prev");
                return (prev+1) % banner.length
            })
        },3000)
        return()=>{
            clearInterval(interval);
        }
   
    },[])

  return (
    <div className="container flex flex-col gap-4">
    <div className="flex overflow-x-auto gap-2">
        {/* {banner.map((banner,index)=>{ */}
            {/* return( */}

            {/* banners */}
                <div  className="flex min-w-full justify-center items-center flex-1">
                <img className="min-w-full  object-content rounded-md" 
                src={banner[current].src}
                alt={banner[current].alt}/>


                </div>
                </div>
            {/* ); */}
        {/* })} */}
        
        

        {/* buttons */}
       <div className="buttons flex justify-center">
       {banner.map((banner,index)=>{
           return(
               <button key={index}
               onClick={()=>setCurrent(index)}
               className={`w-2 h-2 rounded-full ${current==index? "bg-black": "bg-gray"} bg-gray-500 mx-1`}>
               </button>
           )
   
       })}
   </div> 
   </div>                
  );
}
