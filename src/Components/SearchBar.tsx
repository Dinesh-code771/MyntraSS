import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function searchBar({className,placeHolder}:{className:string, placeHolder:string}) {
  return (
    <div className={`${className} flex items-center  px-3 py-1 gap-3`}> 
    <CiSearch />
    <input
      type="text" 
      placeholder={placeHolder}
      className="w-full bg-transparent px-3 py-1 
      focus:outline-none"
    />
  </div>
  )
}
