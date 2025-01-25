import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';

export default function MultiFilterModel({
    onClose,
    values,
    componentType,
    handleClick,
}:{
    onClose:React.Dispatch<React.SetStateAction<boolean>>;
    values: {filterName:string; count?:number;type:string}[];
    componentType:string;
    handleClick:any;
}) {

    const storedValues =
    useSelector((state: any) => state.filterSlice)[componentType];

    const [searchValue, setSearchValue] = React.useState<string>('');

    const [filteredValues, setFilteredValues] =
    React.useState<{ filterName: string; count?: number; type: string }[]>(values);

    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const [hoveredAlphabet,setHoveredAlphabet] = React.useState<string>("");

    //filter values based on searchValue
    useEffect(()=>{
       const filteredValues =values.filter((value)=>{
        return value.filterName.toLowerCase().includes(searchValue.toLowerCase());
       });
       setFilteredValues(filteredValues);
    },[searchValue,values]);

  return (
    <div className='absolute top-0 left-0  shadow-md border rounded-md
     max-w-[1000px] min-w-[700px] xl:min-w-[900px]  max-h-[600px] bg-white z-40 overflow-x-auto'>
      <div className="navHeader flex justify-between sticky border-b py-4 px-4 items-center w-[100%]">
         <div className='wrapper gap-10 flex items-center'>
              <div className='search border '>
                  <input type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Search Brand'
                  className=" border-none p-1  text-sm " />
              </div>
              <div className='DisplayAlphabets flex gap-4 '>
                 {
                    alphabets?.map((alphabet,index)=>{
                     return(
                    <div key={index} className='cursor-pointer'>
                         <p onMouseOver={()=>setHoveredAlphabet(alphabet)} 
                            onMouseOut={()=> setHoveredAlphabet("")} 
                         className='text-sm text-[#ADAEAF] font-bold'>{alphabet}</p>
                    </div>
                   );
                  })
                 }
              </div>
         </div>
         <div onClick={()=>onClose(false)} className='cursor-pointer  text-gray-500'>
             <RxCross2 size={20}/>
         </div>
      </div>
      <div className='body mt-5 px-4 py-1 '>
          <ul className='flex flex-col gap-2 h-[400px] flex-wrap w-full'>
             {            //filteredValues=sortedFilteredValues
                filteredValues?.sort((a,b)=>{//sorting alphabets by filterName
                    return a.filterName.localeCompare(b.filterName);
                })
                ?.map((value,index)=>{
                    return(
                        <li key={index}
                         className={` text-sm cursor-pointer flex gap-2 items-center max-w-[180px] 
                           ${hoveredAlphabet === value.filterName.charAt(0) || hoveredAlphabet === "" ? "opacity-1" : "opacity-[0.2]"} `}
                        >
                   {  
                     value.filterName.length > 1 ? (      
                <input
                //   onClick={(e) => handleClick(e, filter.count, filter.type)}
                  type= 'checkbox' 
                  value={value.filterName}
                  onClick={(e) =>
                    handleClick(e, value.count, value.type)
                  }
                  className=" cursor-pointer  accent-pink-500  "
                  checked = {storedValues
                    ?.map((item: any) => item?.filterName)
                    .includes(value?.filterName)}
                />
                ) : null } 
                <p className={`text-sm ${value.filterName.length === 1 ? "text-md font-bold":""}`}
                 > {value.filterName} </p>
                {  
                 value.filterName.length > 1 ? ( 
                <p  className="text-[0.6rem] text-[#81838E]">
                    {`(${value.count})`}
                </p>
                   ) : null }
              </li>
                    )
                })
             }
          </ul>
      </div>
    </div>
  )
}
