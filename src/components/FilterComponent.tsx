import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterValues } from '../Redux/filterSlice';
import MultiFilterModel from './MultiFilterModel';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

export default function FilterComponent({
  title,
  componentType,
  filterValues,
  isMultiSelect = false,
  isSearchable = false,
  searchValue,
  setSearchValue,
  onSelectedFilter,
}: {
  title: string;
  componentType: string;
  filterValues: { filterName: string; count?: number; type: string }[];
  isMultiSelect?: boolean;
  isSearchable?: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onSelectedFilter: (value: any) => void; //void means it won't return anything
}) {
  //   const [storeSelectedValues, setStoreSelectedValues] = React.useState<
  //     { filterName: string; count?: number }[]>([]);

  const storedValues = useSelector((state: any) => state.filterSlice)[
    componentType
  ];
  //console.log(storedValues, '####storedValues');
  //console.log(componentType, '####componentType');

  const allFilterState = useSelector((state: any) => state.filterSlice);

  const dispatch = useDispatch();

  const [isSearchEnable, setIsSearchEnable] = React.useState<boolean>(false);

  // const [myFilteredValues, setMyFilteredValues] =
  //   React.useState<{ filterName: string; count?: number; type: string }[]>(
  //     filterValues
  //   );

  //const [searchValue, setSearchValue] = React.useState<string>('');

  const [isMultiSelectEnabled, setIsMultiSelectEnabled] =
    React.useState<boolean>(false);

  // const [filteredValuesState, setFilteredValuesState] =
  // React.useState<{ filterName: string; count?: number; type: string }[]>(
  //   filterValues
  // );

  const { name } = useParams<{ name: string }>();
  //console.log(name,"params");
  // console.log(filterValues,"filterValues");

  //const firstItems = filterValues?.slice(0,8);
  const firstItems = Array.isArray(filterValues)? filterValues?.slice(0, 9): [];
  
  //const firstItems = filterValues?.slice(0, 9);

  let sortedFilteredValues: any = []; //sort and stored here
  //console.log(sortedFilteredValues, 'sortedFilteredValues');

  let Alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // useEffect(()=>{
  if (filterValues?.length > 9) {
    for (let i = 0; i < filterValues.length; i++) {
      if (Alphabets.includes(filterValues[i]?.filterName.charAt(0))) {
        //charAt(0)-first character "A"
        let obj = {
          filterName: filterValues[i]?.filterName.charAt(0),
          count: 100,
          type: 'Categorie',
        };
        sortedFilteredValues = [obj, ...filterValues];
        // setFilteredValuesState((prev)=> [...prev,obj]);
        Alphabets = Alphabets.filter(
          //remove logic to remove duplicates
          (item) => item !== filterValues[i].filterName.charAt(0)
        );
      }
    }
  }
  // },[filterValues]);

  // useEffect(() => {
  //   //post selected values to the server
  // }, [storedValues]);

  // //fetch data from server
  // useEffect(() => {
  //   //placing static data
  //   const dataFromServer = [
  //     { filterName: 'Shirts', count: 100, type: 'CATEGORIES' },
  //   ];
  //   //setStoreSelectedValues(dataFromServer);
  //   dispatch(setFilterValues({
  //     title: componentType,
  //      values: dataFromServer,
  //      name:name }));
  // }, []);

  // useEffect(()=>{
  //   console.log(filteredValuesState,"FVS");
  // },[filteredValuesState]);

  // useEffect(() => {
  //   let filteredValues = filterValues?.filter((item) => {
  //     return item?.filterName.toLowerCase().includes(searchValue.toLowerCase());
  //   });
  //    setMyFilteredValues(filteredValues);
  //   setFilteredValuesState(filterValues);
  // }, [searchValue,filterValues]);

  //to add(update) checked(clicked) items into array
  async function handleClick(
    e: React.MouseEvent<HTMLInputElement>,
    count: number | undefined,
    type: string
  ) {
    //console.log(e.target, count, type, 'FC handleClick');
    if (isMultiSelect) {
      if (e.currentTarget.checked) {
        //console.log(storedValues, 'FC storedValues');
        // setStoreSelectedValues([
        //   ...storedValues,
        //   { filterName: e.currentTarget.value, count: count ? count : 0 },
        // ]); //store values
        //update on redux tool kit/store
        // dispatch(
        //   setFilterValues({
        //     title: componentType,
        //     values: [
        //       ...storedValues,
        //       {
        //         filterName: e.currentTarget.value,
        //         count: count ? count : 0,
        //         type: type,
        //       },
        //     ],
        //   })
        // );
        // update on server
        onSelectedFilter({
          //[inserts data in dataBase]
          ...allFilterState,
          [componentType]: [
            ...storedValues,
            {
              filterName: e.currentTarget.value,
              count: count ? count : 0,
              type: type,
            },
          ],
        });
      } else {
        // setStoreSelectedValues(      //for removing
        //  [ { filterName: e.currentTarget.value, count: count ? count : 0 },])
        //  storedValues.filter(
        //     (item:any) => item.filterName !== e.currentTarget.value
        //   )
        // );
        let storeImage = {
          title: componentType,
          values: storedValues,
        };
        //console.log(storedValues, 'store');
        // dispatch(
        //   //for removing [insert's data in redux]
        //   setFilterValues({
        //     title: componentType,
        //     values: storedValues?.filter(
        //       (item: any) => item?.filterName !== e.currentTarget.value
        //     ),
        //   })
        // );
        //when we got some issue with server it won't update that's why we wrap in try-catch block
        try {
          // update on server
          let returned = onSelectedFilter({
            ...allFilterState,
            [componentType]: storedValues?.filter(
              //key:value
              (item: any) => item?.filterName !== e.currentTarget.value
            ),
          });
          throw returned;
        } catch (error) {
          console.log('entered');
          setTimeout(() => {
            dispatch(setFilterValues(storeImage));
          }, 1000);

          // revert back my redux store
        }
      }
    } else {
      // setStoreSelectedValues([
      //     {filterName: e.currentTarget.value, count: count ? count : 0},
      // ]);
      // dispatch(
      //   setFilterValues({
      //     title: componentType,
      //     values: [
      //       //key:[value]
      //       {
      //         filterName: e.currentTarget.value,
      //         count: count ? count : 0,
      //         type: type,
      //       },
      //     ],
      //   })
      // );
      onSelectedFilter({
        ...allFilterState,
        [componentType]: [
          {
            filterName: e.currentTarget.value,
            count: count ? count : 0,
            type: type,
          },
        ],
      });
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
          {firstItems?.map((filter, index) => {
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
                    ?.map((item: any) => item?.filterName)
                    .includes(filter?.filterName)}
                />

                <p className="flex gap-2 text-[#282C3F]">
                  {parse(filter?.filterName)}
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
        {filterValues?.length > 9 ? (
          <span
            onClick={() => {
              setIsMultiSelectEnabled(true);
            }}
            className="text-[#F76789] text-sm p-1 ml-6 cursor-pointer"
          >
            +{filterValues?.length - 9} more
          </span>
        ) : null}
      </div>
      <div>
        {isMultiSelectEnabled && (
          <MultiFilterModel
            onClose={setIsMultiSelectEnabled}
            values={sortedFilteredValues}
            componentType={componentType}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}
