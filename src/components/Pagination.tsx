import React from 'react';
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

export default function Pagination({
    totalData,
    dataPerPage,
    currentPage,
    onPageChange,
  }: {
    totalData: number;
     onPageChange: (page: number) => void;
    dataPerPage: number;
    currentPage: number;
  }) {
    return (
      <div className="flex items-center justify-center gap-4 mb-10">
        
        <button
          disabled={currentPage === 1}
          className="bg-white flex text-[#282c3f] border border-gray-400 px-4 py-2
           cursor-pointer text-[15px] rounded-md font-bold gap-1 disabled:opacity-50"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
         <FaLessThan size={15} className='text-[#282c3f] mt-1 '/>
          Previous
        </button>
       
        {Array.from({ length: Math.ceil(totalData / dataPerPage) }).map(
          (_, index) => (
            <button
              className={`${
                currentPage === index + 1
                  ? "bg-gray-400 text-[#282c3f] "
                  : "text-[#282c3f] bg-indigo-50 "
              } px-4 py-2 rounded-md font-bold cursor-pointer border border-gray-400`}
              key={index}
              onClick={() => {
                onPageChange(index + 1);
              }}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          disabled={currentPage === Math.ceil(totalData / dataPerPage)}
          className="bg-white flex text-[#282c3f] border border-gray-400 px-4 py-2 
          rounded-md cursor-pointer disabled:opacity-50 text-[15px] gap-1 font-bold "
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          Next
          <FaGreaterThan size={15} className='text-[#282c3f] mt-1' />
        </button>
      </div>
    );
  }