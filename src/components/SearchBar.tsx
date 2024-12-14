import React from 'react'
import { IoSearch } from 'react-icons/io5';

export default function SearchBar({className, placeholder}:{className?:string, placeholder:string}) {
  return (
    <div>
       <div className={`${className}search  flex items-center gap-3 px-3 py-1`}>
            <IoSearch size={20} color="gray" />
            <input
              type="text"
              placeholder={placeholder}
               className=" px-2 py-1  w-full focus:outline-none bg-transparent text-small  "
            />
          </div>
    </div>
  )
}
