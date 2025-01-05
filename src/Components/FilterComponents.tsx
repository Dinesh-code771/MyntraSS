import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValues } from "../Redux/FilterSlice";
import MultifilterComponent from "./MultifilterComponent";

export default function FilterComponents({
  title,
  filterValues,
  isMultiSelect = false,
  isSearchable = false,
  componentType,
}: {
  title: string;
  filterValues: { filterName: string; count?: number; type: string }[];
  isMultiSelect?: boolean;
  isSearchable?: boolean;
  componentType: string;
}) {
  // const [storeSelectedValues, setStoreSelectedValues] = React.useState<
  //   { filterName: string; count?: number }[]
  // >([]);

  const dispatch = useDispatch();

  //this below line of code is used to get values from redux

  const storedValues =
    useSelector((state: any) => state.filterSlice[componentType]) || [];

  const [filterValuesState, setFilterValuesState] =
    React.useState<{ filterName: string; count?: number; type: string }[]>(
      filterValues
    );

  let Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    if (filterValues.length > 9) {
      for (let i = 0; i < filterValuesState.length; i++) {
        if (Alphabets.includes(filterValuesState[i].filterName.charAt(0))) {
          let obj = {
            filterName: filterValuesState[i].filterName.charAt(0),
            count: 100,
            type: "Categories",
          };
          setFilterValuesState((prev) => [...prev, obj]);

          Alphabets = Alphabets.filter(
            (item) => item !== filterValues[i].filterName.charAt(0)
          );
          // setAlphabets(newAlphabets);
        }
      }
    }
  }, []);

  const [isMultiSelectEnabled, setIsMultiSelectEnabled] =
    React.useState<boolean>(false);

  //for filtersearch
  const [IsSearchEnabled, setIsSearchEnabled] = React.useState<boolean>(false);

  //what we are searching product values to store
  const [searchValue, setSearchValue] = React.useState<string>("");

  //myfilterValues are 6 values(tshirts,shirts,...)
  const [myFilterValues, setMyFilterValues] =
    React.useState<{ filterName: string; count?: number; type: string }[]>(
      filterValues
    );

  useEffect(() => {
    //post selected values to the server. i.e, wev are sending values to server to save
  }, [storedValues]);

  //fetch data from the server and give it to storeSelectedValues
  useEffect(() => {
    //placing static data
    const dataFromServer = [
      { filterName: "Dresses", count: 100, type: "Categories" },
    ];
    // setStoreSelectedValues(dataFromServer);
    dispatch(
      setFilterValues({
        title: componentType,
        values: dataFromServer,
      })
    );
  }, []);

  //for searching values in searchbar
  useEffect(() => {
    let filteredValues = filterValues?.filter((item) => {
      return item?.filterName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setMyFilterValues(filteredValues);
    //products you search will be stored in setmyfiltervalues
  }, [searchValue]);

  //Handle click function

  function handleClick(
    e: React.MouseEvent<HTMLInputElement>,
    count: number | undefined,
    type: string
  ) {
    if (isMultiSelect) {
      if (e.currentTarget.checked) {
        //if checkbox clicked
        // setStoreSelectedValues([
        //   ...StoredValues,
        //   { filterName: e.currentTarget.value, count: count ? count : 0 },
        // ]); //store values
        dispatch(
          setFilterValues({
            title: componentType,
            values: [
              ...storedValues,
              {
                filterName: e.currentTarget.value,
                count: count ? count : 0,
                type: type,
              },
            ],
          })
        );
      } else {
        // setStoreSelectedValues(
        //   //for removing(i.e, filteringOut the values)
        //   StoredValues.filter(
        //     (item: any) => item.filterName !== e.currentTarget.value
        //   )
        // );
        dispatch(
          setFilterValues({
            title: componentType,
            values: storedValues?.filter(
              (item: any) => item?.filterName !== e.currentTarget.value
            ),
          })
        );
      }
    } else {
      // setStoreSelectedValues([
      //   { filterName: e.currentTarget.value, count: count ? count : 0 },
      // ]);
      dispatch(
        setFilterValues({
          title: componentType,
          values: [
            {
              filterName: e.currentTarget.value,
              count: count ? count : 0,
              type: type,
            },
          ],
        })
      );
    }
  }

  // console.log(storedValues);
  return (
    <div className="relative border-b filterContainerWrapper p-3 flex flex-col gap-3">
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
          {myFilterValues.slice(0, 9).map((filter, index) => {
            return (
              <li
                key={index}
                className={`text-sm cursor-pointer flex gap-3 items-center 
                 text-black  rounded-lg px-2 py-1`}
              >
                <input
                  className="accent-pink-500 cursor-pointer"
                  onClick={(e) => handleClick(e, filter.count, filter.type)}
                  type={isMultiSelect ? "checkbox" : "radio"}
                  value={filter?.filterName}
                  checked={storedValues
                    .map((item: any) => item?.filterName)
                    .includes(filter?.filterName)}
                />

                <p className="flex gap-2">
                  {filter?.filterName}
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

      {/* filter footer */}

      <>
        {filterValues.length > 9 ? (
          <span
            onClick={() => {
              setIsMultiSelectEnabled(true);
            }}
            className="text-center text-sm text-[#ff3f6c] ml-10 cursor-pointer"
          >
            +{filterValues.length - 9} more
          </span>
        ) : null}
      </>
      {isMultiSelectEnabled && (
        <MultifilterComponent
          values={filterValuesState}
          onClose={setIsMultiSelectEnabled}
          componentType={componentType}
        />
        // Pass the filter values to the component
      )}
    </div>
  );
}
