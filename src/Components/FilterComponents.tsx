import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export default function FilterComponents({
  title,
  filterValues,
  isMultiSelect = false,
  isSearchable = false,
}: {
  title: string;
  filterValues: { filterName: string; count?: number }[];
  isMultiSelect: boolean;
  isSearchable: boolean;
}) {
  const [storeSelectedValues, setStoreSelectedValues] = React.useState<
    { filterName: string; count?: number }[]
  >([]);

  const [IsSearchEnabled, setIsSearchEnabled] = React.useState<boolean>(false);

  const [searchValue, setSearchValue] = React.useState<string>("");

  const [myFilterValues, setMyFilterValues] =
    React.useState<{ filterName: string; count?: number }[]>(filterValues);

  useEffect(() => {
    //post selected values to the server
  }, [storeSelectedValues]);

  useEffect(() => {
    //fetch data from the server
    const dataFromServer = [{ filterName: "Dresses", count: 100 }];
    setStoreSelectedValues(dataFromServer);
  }, []);

  useEffect(() => {
    let filteredValues = filterValues.filter((item) => {
      return item.filterName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setMyFilterValues(filteredValues);
    // setStoreSelectedValues(filteredValues);
  }, [searchValue]);

  function handleClick(
    e: React.MouseEvent<HTMLInputElement>,
    count: number | undefined
  ) {
    if (isMultiSelect) {
      if (e.currentTarget.checked) {
        setStoreSelectedValues([
          ...storeSelectedValues,
          { filterName: e.currentTarget.value, count: count ? count : 0 },
        ]);
      } else {
        setStoreSelectedValues(
          storeSelectedValues.filter(
            (item) => item.filterName !== e.currentTarget.value
          )
        );
      }
    }
  }

  console.log(storeSelectedValues);
  return (
    <div className="filterContainerWrapper p-3 flex flex-col gap-3">
      {/* filter Header */}
      <div className="FilterHeader flex justify-between items-center">
        <>
          {!IsSearchEnabled ? (
            <>
              <p className="text-sm font-bold uppercase">{title}</p>
              {isSearchable && (
                <div
                  onClick={() => {
                    console.log("search");
                    setIsSearchEnabled(true);
                  }}
                  className="p-2 bg-slate-100 cursor-pointer rounded-full"
                >
                  <CiSearch />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-1 gap-2 items-center border bg-[#F5F5F6] overflow-hidden p-1 px-2 rounded-xl">
              <input
                type="text"
                className="flex-1 focus:outline-none bg-transparent text-xs"
                placeholder="Search for Category"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <RxCross1
                onClick={() => {
                  setIsSearchEnabled(false);
                }}
              />
            </div>
          )}
        </>
      </div>

      {/* filter body */}
      <div className="wrapper">
        <ul className="flex flex-col gap-3">
          {myFilterValues.map((filter, index) => {
            // console.log(storeSelectedValues.includes(filter), "storee", filter);

            return (
              <li
                key={index}
                className={`text-sm cursor-pointer flex gap-3 items-center 
                 text-black  rounded-lg px-2 py-1`}
              >
                <input
                  className="accent-pink-500"
                  onClick={(e) => handleClick(e, filter.count)}
                  type={isMultiSelect ? "checkbox" : "radio"}
                  value={filter.filterName}
                  checked={storeSelectedValues
                    .map((item) => item.filterName)
                    .includes(filter.filterName)}
                />

                <p className="flex gap-2">
                  {filter.filterName}
                  {filter.count && (
                    <span className="text-[0.5rem] text-[#94969f] font-bold">
                      {`(${filter.count})`}
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
