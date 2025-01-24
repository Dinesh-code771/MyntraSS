import React from "react";
import { CiSearch } from "react-icons/ci";

export default function searchBar({
  className,
  placeHolder,
  value,
  onChange,
}: {
  className: string;
  placeHolder: string;
  onChange: (e: any) => void;
  value: string;
}) {
  return (
    <div className={`${className} flex items-center  px-3 py-1 gap-3`}>
      <CiSearch />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="w-full bg-transparent px-3 py-1 
      focus:outline-none"
      />
    </div>
  );
}
