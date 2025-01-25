import React from 'react';
import { IoSearch } from 'react-icons/io5';

export default function SearchBar({
  className,
  placeholder,
  onChange,
  value,
}: {
  className?: string;
  placeholder: string;
  onChange:(e:any)=>void; // void - it wont return anything
  value:string;
}) {
  return (
    <div>
      <div className={`${className}search  flex items-center gap-3 px-3 py-1`}>
        <IoSearch size={20} color="gray" />
        <input
          type="text"
          placeholder={placeholder}
          className=" px-2 py-1  w-full focus:outline-none bg-transparent text-small"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
