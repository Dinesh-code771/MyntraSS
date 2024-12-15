import React from 'react'


export default function Brands({
    title,
    sections,
}:{
    title:string;
    sections:{src:string[], alt:string[]}[];
}) {

    const [current,setCurrent]=React.useState(0);

  return (
    <div className="flex flex-col gap-4">
        <h3 className="text-center font-semibold text-opacity-75 text-4xl md:text-5xl text-orange-600 p-2 uppercase">{title}</h3>
        <div className="sections">
            {
                <div className="section flex">       
                        
                       { sections[current].src.map((src,index)=>{
                            return (
                            <div className="imgWrapper flex-1">
                            <img className="w-full" src={src} width={150} height={150} alt={sections[current].alt[current]}/>
                        </div>
                            )
                        })}
                    
                </div>
            }
        </div>

{/* buttons */}
        <div className="buttons flex justify-center items-center gap-1">
            {sections.map((src,index)=>{
                return(
                    <button key={index} 
                    onClick={()=>setCurrent(index)}
                    className={`w-2 h-2 rounded-full ${current ===index? "bg-black":"bg-[#c6c6c6]"} mx-1`}></button>
                )
            })}
           

        </div>


       

    </div>
  );
}
