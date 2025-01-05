import React, { useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import filterSlice, { setFilterValues } from '../Redux/filterSlice';
import MultiFilterModel from './MultiFilterModel';

export default function FilterComponent({
  title,
  componentType,
  filterValues,
  isMultiSelect = false,
  isSearchable = false,
}: {
  title: string;
  componentType: string;
  filterValues: { filterName: string; count?: number; type: string }[];
  isMultiSelect?: boolean;
  isSearchable?: boolean;
}) {
  //   const [storeSelectedValues, setStoreSelectedValues] = React.useState<
  //     { filterName: string; count?: number }[]>([]);

  const storedValues =
    useSelector((state: any) => state.filterSlice[componentType]) || [];
  //console.log(filterSlice,"filterSlice");
  console.log(storedValues, 'storedValues');

  const dispatch = useDispatch();

  const [isSearchEnable, setIsSearchEnable] = React.useState<boolean>(false);

  const [myFilteredValues, setMyFilteredValues] =
    React.useState<{ filterName: string; count?: number; type: string }[]>(
      filterValues
    );

  const [searchValue, setSearchValue] = React.useState<string>('');

  const [isMultiSelectEnabled, setIsMultiSelectEnabled] =
    React.useState<boolean>(false);

    const [filteredValuesState, setFilteredValuesState] =
    React.useState<{ filterName: string; count?: number; type: string }[]>(
      filterValues
    );

    let Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    useEffect(()=>{
      if (filterValues.length > 8){
        for(let i = 0; i < filteredValuesState.length; i++ ){
          if (Alphabets.includes(filteredValuesState[i].filterName.charAt(0))){
          let obj = {
            filterName: filteredValuesState[i].filterName.charAt(0),
          count:100,
          type:"Category",
          };
          setFilteredValuesState((prev)=> [...prev,obj]);
          Alphabets = Alphabets.filter((item)=> item !== filterValues[i].filterName.charAt(0));
        }
      }
      }
    },[]);

  useEffect(() => {
    //post selected values to the server
  }, [storedValues]);

  //fetch data from server
  useEffect(() => {
    //placing static data
    const dataFromServer = [
      { filterName: 'Shirts', count: 100, type: 'CATEGORIES' },
    ];
    //setStoreSelectedValues(dataFromServer);
    dispatch(setFilterValues({ title: componentType, values: dataFromServer }));
  }, []);

  useEffect(() => {
    let filteredValues = filterValues?.filter((item) => {
      return item?.filterName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setMyFilteredValues(filteredValues);
    //setStoreSelectedValues(filteredValues);
  }, [searchValue]);

  function handleClick(
    e: React.MouseEvent<HTMLInputElement>,
    count: number | undefined,
    type: string
  ) {
    if (isMultiSelect) {
      if (e.currentTarget.checked) {
        // setStoreSelectedValues([
        //   ...storedValues,
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
        // setStoreSelectedValues(      //for removing
        //  [ { filterName: e.currentTarget.value, count: count ? count : 0 },])
        //  storedValues.filter(
        //     (item:any) => item.filterName !== e.currentTarget.value
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
      //     {filterName: e.currentTarget.value, count: count ? count : 0},
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

  return (
    <div className="filterContainerWrapper relative p-3 flex flex-col justify-center gap-2.5 border-t">
      <div className="filterHeader flex justify-between">
        <>
          {isSearchEnable ? (
            <div className="searchField flex flex-1 items-center rounded-full overflow-hidden p-1.5 px-2.5 bg-[#F5F5F6]">
              <input
                type="text"
                placeholder="Search for Brand"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 focus:outline-none text-xs text-[#8D8D8D] bg-transparent"
              />
              <RxCross2
                onClick={() => {
                  setIsSearchEnable(false);
                  setSearchValue(''); //we are making search value empty
                }}
                className="text-[#545866]"
              />
            </div>
          ) : (
            <>
              <p className="text-sm font-bold flex  items-center text-[#282c3e]">
                {title}
              </p>
              {isSearchable && (
                <div
                  onClick={() => {
                    setIsSearchEnable(true);
                  }}
                  className="rounded-full p-1.5 bg-[#F5F5F6] cursor-pointer items-center justify-center"
                >
                  <IoSearch color="grey" size={18} />
                </div>
              )}
            </>
          )}
        </>
      </div>
      <div className="filterBody pt-2">
        <ul className="flex flex-col gap-2">
          {myFilteredValues.slice(0, 9).map((filter, index) => {
            return (
              <li
                key={index}
                className=" text-sm cursor-pointer flex gap-2 items-center "
              >
                <input
                  onClick={(e) => handleClick(e, filter.count, filter.type)}
                  type={isMultiSelect ? 'checkbox' : 'radio'}
                  value={filter?.filterName}
                  className=" cursor-pointer  accent-pink-500 [#F76789] "
                  checked={storedValues
                    .map((item: any) => item?.filterName)
                    .includes(filter?.filterName)}
                />

                <p className="flex gap-2 text-[#282C3F]">
                  {filter?.filterName}
                  {filter.count && (
                    <span className="text-[0.6rem] font-bold  text-[#81838E]">
                      {`(${filter.count})`}
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Filter Model(footer) */}
      {/* total -8 if elements are 30 we show 8 */}
      <div className="FilterModel">
        {filterValues.length > 8 ? (
          <span
            onClick={() => setIsMultiSelectEnabled(true)}
            className="text-[#F76789] text-sm p-1 ml-6 cursor-pointer"
          >
            +{filterValues.length - 8} more
          </span>
        ) : null}
      </div>
      <div>
         {
         isMultiSelectEnabled && 
         <MultiFilterModel 
         onClose = {setIsMultiSelectEnabled} 
         values={filteredValuesState}
         componentType={componentType}
         />
         }
      </div>
    </div>
  );
}
