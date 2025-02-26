import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setSelectedSortValue } from '../Redux/navBarSlice';

export default function PCDropDown({
  title,
  values,
}: {
  title: string;
  values: { id: number; name: string }[];
}) {
  const [selectedValue, setSelectedValue] = React.useState<{
    id: number;
    name: string;
  }>(values[0]);

  const dispatch = useDispatch();

  return (
    <div className="wrapper absolute z-40 -mt-3 h-[40px] border bg-white  min-w-[250px] hover:h-auto overflow-hidden ">
      <div className="box px-2 py-3 flex items-center cursor-pointer justify-between">
        <div className="flex gap-2 ">
          <span className="text-xs text-[#282C3F] ">{title}</span>
          <span className="text-xs text-[#282c3e] font-bold ml-auto">
            {selectedValue.name}
          </span>
        </div>
        <MdKeyboardArrowDown />
      </div>
      {values.map((value) => {
        return (
          <span
            className={`box px-4 py-3 flex text-sm hover:bg-[#F5F5F6] cursor-pointer
             ${value.name === selectedValue.name ? 'bg-gray-200' : ''}`}
            onClick={() => {
              setSelectedValue(value);
              dispatch(setSelectedSortValue(value));
            }}
          >
            {value.name}
          </span>
        );
      })}
    </div>
  );
}
