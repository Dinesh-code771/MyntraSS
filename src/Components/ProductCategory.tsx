import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import FilterComponents from "./FilterComponents";
// import FilterComponent from "./FilterComponent";
import { RxCross2 } from "react-icons/rx";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

import {
  fetctSelectedFilter,
  removePaticularFilter,
  resetFilterValues,
  setParams,
  setPrice,
} from "../Redux/FilterSlice";
// } from "../Redux/filterSlice";
import Slider from "@mui/material/Slider";
import { pink } from "@mui/material/colors";
import { useEffect } from "react";
import ts from "typescript";
import DropDown from "./DropDown";
import Brands from "./Brands";
import Categories from "./Categories";
import { listDocuments } from "../apis/listDocuments";
import { useParams } from "react-router-dom";
import { insertDataIntoDocument } from "../apis/insertDataIntoDocument";
type productDetailsProps = {
  productDetails: {
    title: string;
    decription: string;
    price: number;
    images: string[];
    size?: string;
    rating: number;
    likes?: number;
    // likes?: string;
  }[];
};
export default function ProductCategory({
  productDetails,
}: productDetailsProps) {
  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();

  const [currentSelected, setCurrentSelected] = useState<null | number>(null);
  const [filterDetails, setFilterDetails] = useState({
    brands: [],
    categories: [],
    colors: [],
    discountRange: [],
    Gender: [],
  });
  const [refetch, setRefetch] = useState(false);

  // const allFilters = useSelector((state: any) => state.filterSlice);

  const [categorySearch, setCatgegorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [searchfilterdDetails, setSearhFilterDetails] = useState({
    searchFilteredBrands: [],
    searchfilterdCategories: [],
  });

  const [values, setValues] = useState<number[]>([0, 0]);
  const color = pink[500];
  const allFilterState = useSelector((state: any) => state.filterSlice);
  const [selectedTopFilter, setSelectedTopFilter] = useState<string[]>([]);

  // {
  //   Categorie: [{},{}.{}],
  //    Brand: [{},{}],
  //    Colors: [],
  //    Discount: [],
  //  }
  let allFilterStateValues: any = [];
  for (let key in allFilterState) {
    // key = Brand
    if (allFilterState[key]?.length > 0) {
      allFilterStateValues = [...allFilterStateValues, ...allFilterState[key]];
    } else {
      if (Object.keys(allFilterState[key]).length > 0 && key !== "params") {
        allFilterStateValues = [...allFilterStateValues, allFilterState[key]];
      }
    }
  }

  //constants
  const topFiltes = [
    {
      name: "Age",
      values: [
        "0-3",
        "3-6",
        "6-9",
        "9-12",
        "12-15",
        "15-18",
        "18-21",
        "21-24",
        "24-27",
        "27-30",
        "30-33",
        "33-36",
        "36-39",
        "39-42",
        "42-45",
        "45-48",
      ],
    },
    { name: "Bundles", values: ["budles", "singleStyles"] },
    { name: "Color", values: ["Red", "Blue", "Green"] },

    { name: "Country of origin", values: ["India", "China", "USA"] },
    { name: "Size", values: ["S", "M", "L", "XL"] },
  ];

  function handleRemoveFilter(filterDetails: {
    filterName: string;
    count?: number;
    type: string;
  }) {
    dispatch(
      removePaticularFilter({
        type: filterDetails.type,
        value: filterDetails.filterName,
      })
    );
  }

  function handleSlideChange(event: Event, newValue: number | number[]) {
    //storing in local state and in redux store
    // @ts-ignore
    setValues([newValue[0], newValue[1]]);
    // @ts-ignore
    dispatch(setPrice([newValue[0], newValue[1]]));

    //inserting into server
    if (!Array.isArray(newValue)) return;
    const obj: any = {
      filterName: `Rs. ${newValue[0]} To Rs. ${newValue[1]}`,
      isChecked: true,
    };
    insertData({ ...allFilterState, prices: obj });
  }

  function handleClearAll() {
    dispatch(resetFilterValues([]));
  }

  useEffect(() => {
    //if prices is empty obj return
    if (!Object.keys(allFilterState.prices).length) return;
    //if prices is not empty obj
    let name = allFilterState.prices?.filterName;
    let newValue = name?.split(" ");
    console.log(newValue, "df");

    setValues([newValue[1], newValue[newValue.length - 1]]);
  }, [allFilterState.prices]);

  useEffect(() => {
    const categoryNameValue = name;
    async function fetchDetails() {
      const details: any = await listDocuments(
        "676a1ec4001bf5b712d9",
        "676a1ee4001ae452e2df",
        "CategoryType",
        name,
        ["brands", "categories", "colors", "Gender"]
      );
      setFilterDetails(details);
      setSearhFilterDetails({
        searchFilteredBrands: details?.brands,
        searchfilterdCategories: details?.categories,
      });
    }
    fetchDetails();
  }, []);

  //filter details

  useEffect(() => {
    let categories = searchfilterdDetails.searchfilterdCategories;
    let searchCategories = categories.filter((item: any) => {
      return item?.filterName
        .toLowerCase()
        .includes(categorySearch.toLowerCase());
    });
    setSearhFilterDetails({
      ...searchfilterdDetails,
      searchfilterdCategories: searchCategories,
    });
  }, [categorySearch]);

  useEffect(() => {
    dispatch(setParams(name));
  }, [name]);

  // useEffect(() => {
  //   dispatch(fetctSelectedFilter() as any);
  // }, []);

  async function insertData(allFilterState: any) {
    const res = await insertDataIntoDocument(
      JSON.stringify(allFilterState),
      "676a1ec4001bf5b712d9",
      "676a1ee4001ae452e2df",
      "CategoryType",
      name
    );
    // if (!res) {
    //   console.log("throewinf");
    //   return new Error("error");
    // }
    setRefetch(!refetch);
  }

  useEffect(() => {
    async function fetchAndInsertData() {
      let dispatchRes = await dispatch(fetctSelectedFilter() as any);
    }
    fetchAndInsertData();
  }, [refetch]);

  useEffect(() => {
    async function updateDataInServer() {
      if (allFilterState.params) {
        let dispatchRes = await dispatch(fetctSelectedFilter() as any);
        console.log(dispatchRes.payload.selectedFilters, "dispatchRes");
        insertData({
          ...dispatchRes.payload.selectedFilters,
          params: allFilterState.params,
        });
        console.log(allFilterState, "reddy");
      }
    }
    updateDataInServer();
  }, [allFilterState.params]);

  return (
    <div className="wrapper h-[88%]">
      <div className="w-[80%]  h-full mx-auto py-5 flex flex-col gap-4">
        {/* top section */}
        <div className="container1 flex flex-col gap-4 pb-2 ">
          <div className="">
            <p className=" text-xs text-[#8b8d95]">
              Home /{" "}
              <span className="text-[#9c9ea5] font-bold">
                {" "}
                Kids Wear Online Store
              </span>
            </p>
          </div>
          <div>
            <p className="text-[#282c3e] text-sm font-bold">
              Kids Wear Online Store -{" "}
              <span className="text-[#9c9ea5]"> 376222 items</span>
            </p>
          </div>
        </div>
        {/* bottom section */}
        <div className="flex">
          {/* left section  */}
          <div className="leftWrapper flex-[2] flex flex-col ">
            {/* left section top  */}
            <div className="flex justify-between items-center ">
              <p className="text-sm font-bold uppercase text-black p-3 flex-[0.5] ">
                Filters
              </p>
              {allFilterStateValues.length > 0 && (
                <p
                  onClick={handleClearAll}
                  className="text-xs cursor-pointer text-[#ff3f6c] pr-5 uppercase font-bold"
                >
                  Clear All
                </p>
              )}
            </div>

            {/* left section bottom */}
            <div className="filtersWrapper border-t border-r flex-[9.5]">
              <FilterComponents
                title={""}
                componentType={"Gender"}
                filterValues={[
                  {
                    filterName: "Boys",
                    type: "Gender",
                  },
                  {
                    filterName: "Girls",
                    type: "Gender",
                  },
                  {
                    filterName: "Men",
                    type: "Gender",
                  },
                  {
                    filterName: "Women",
                    type: "Gender",
                  },
                ]}
                isMultiSelect={false}
                isSearchable={false}
                onSelectedFilter={insertData}
                searchValue={""}
                setSearchValue={() => {}}
              />
              <FilterComponents
                title={"Categorie"}
                componentType={"Categorie"}
                filterValues={searchfilterdDetails.searchfilterdCategories}
                isMultiSelect={true}
                isSearchable={true}
                searchValue={categorySearch}
                onSelectedFilter={insertData}
                setSearchValue={setCatgegorySearch}
              />
              <FilterComponents
                title={"Brand"}
                componentType={"Brand"}
                filterValues={searchfilterdDetails.searchFilteredBrands}
                isMultiSelect={true}
                searchValue={brandSearch}
                onSelectedFilter={insertData}
                setSearchValue={setBrandSearch}
                isSearchable={true}
              />
              {/* price slide */}
              <div className="px-2 border-t border-b py-4">
                <h3 className="uppercase text-sm text-black font-bold">
                  Price
                </h3>
                <Slider
                  getAriaLabel={() => "Timeline range"}
                  value={values}
                  min={0}
                  max={100000}
                  step={100}
                  size="small"
                  onChange={handleSlideChange}
                />
                <div className="flex  text-xs text-black gap-1 font-bold">
                  <p>$ {values[0]}</p>
                  <span>-</span>
                  <p>${values[1]}</p>
                </div>
              </div>

              <FilterComponents
                title="Colors"
                componentType="Colors"
                filterValues={filterDetails?.colors}
                isMultiSelect={true}
                searchValue={""}
                setSearchValue={() => {}}
                isSearchable={false}
                onSelectedFilter={insertData}
              />
              <FilterComponents
                title={"Discount Range"}
                componentType={"Discount"}
                filterValues={[
                  {
                    filterName: "10-50",
                    type: "Discount",
                  },
                  {
                    filterName: "40-60",
                    type: "Discount",
                  },
                  {
                    filterName: "96-50",
                    type: "Discount",
                  },
                  {
                    filterName: "0-5",
                    type: "Discount",
                  },
                ]}
                isMultiSelect={false}
                searchValue={""}
                setSearchValue={() => {}}
                isSearchable={false}
                onSelectedFilter={insertData}
              />
            </div>
          </div>
          {/* right section */}
          <div className="rightWrapper flex-[8] flex flex-col gap-[11px]">
            {/* right section top */}
            <div className="flex  justify-between">
              <div className="flex flex-[4] justify-between items-center">
                <div className="flex gap-3 items-center justify-center">
                  {topFiltes?.map((filter, index) => {
                    return (
                      <div
                        onClick={() => {
                          if (currentSelected === index) {
                            return setCurrentSelected(null);
                          }
                          setCurrentSelected(index);
                        }}
                        key={index}
                      >
                        <p
                          className={`text-[#8b8d95] flex gap-2 items-center cursor-pointer ${
                            currentSelected === index ? "bg-slate-200" : ""
                          } text-sm hover:bg-slate-200 rounded-lg px-2 py-1 `}
                        >
                          {filter.name}
                          {currentSelected != index ? (
                            <RiArrowDownWideLine />
                          ) : (
                            <RiArrowUpWideLine />
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex-[6] items-end ">
                <div className="flex gap-3 justify-end relative">
                  <DropDown
                    title="Sort By"
                    values={[
                      { id: "352623", name: "Recommended" },
                      {
                        id: "352624",
                        name: "Popularity",
                      },
                      {
                        id: "352625",
                        name: "Newest",
                      },
                      {
                        id: "352626",
                        name: "Price: Low to High",
                      },
                      {
                        id: "352627",
                        name: "Price: High to Low",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* right section middle */}
            {currentSelected != null && (
              <div className="dropdownfilters  pl-3 pb-4 grid lg:grid-cols-6 xl:grid-cols-9">
                {topFiltes[currentSelected].values?.map((value, index) => {
                  return (
                    <div key={index} className="flex gap-[0.5] items-center ">
                      <input
                        onClick={() => {
                          setSelectedTopFilter([...selectedTopFilter, value]);
                        }}
                        checked={selectedTopFilter.includes(value)}
                        className="accent-pink-500"
                        type="checkbox"
                      />
                      <p className="text-[#8b8d95] cursor-pointer text-sm  rounded-lg px-2 py-1 ">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* selectedFilter */}
            <div className="selectedFilter flex flex-wrap gap-3 px-2">
              {allFilterStateValues?.map((value: any) => {
                return (
                  <div className="flex gap-1 max-w-[500px] min-w-[100px] px-1 py-1 rounded-xl items-center justify-between border text-[#3e4152]">
                    <p className="text-[0.7rem] ">
                      {value.type === "Colors"
                        ? parse(value?.filterName)
                        : value.filterName}
                    </p>
                    <RxCross2
                      onClick={() => {
                        handleRemoveFilter(value);
                      }}
                      size={15}
                      color="#3e4152"
                    />
                  </div>
                );
              })}
            </div>
            {/* right section bottom */}
            <div className="cardsWrapper ] w-full gap-5  p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 border-t border-l ">
              {// map the product details
              productDetails?.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    title={product.title}
                    description={product.decription}
                    price={product.price}
                    images={product.images}
                    rating={product.rating}
                    likes={product.likes}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import ProductCard from "./ProductCard";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
// import FilterComponents from "./FilterComponents";
// import { useDispatch, useSelector } from "react-redux";
// import { RxCross1 } from "react-icons/rx";
// import {
//   removeParticularFilter,
//   resetFilterValues,
//   setPrice,
// } from "../Redux/FilterSlice";
// import Slider from "@mui/material/Slider";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import DropDown from "./DropDown";
// import { useEffect } from "react";

// type productDetailsProps = {
//   productDetails: {
//     title: string;
//     description: string;
//     price: number;
//     images: string[];
//     size?: number;
//     rating: number;
//     likes?: number;
//   }[];
// };

// export default function ProductCategory({
//   productDetails,
// }: productDetailsProps) {
//   //states
//   const [currentSelected, setCurrentSelected] = useState<null | number>(null);

//   const [filterDetails, setFilterDetails] = useState({
//     Brands: [],
//     Categories: [],
//   });

//   const dispatch = useDispatch();

//   const [values, setValues] = React.useState<number[]>([0, 10000]);

//   const allFilterState = useSelector((state: any) => state.filterSlice);
//   const [selectedTopFilter, setSelectedTopFilter] = React.useState<string[]>(
//     []
//   );

//   console.log(allFilterState, "allfilterState");

//   let allFilterStateValues: any[] = [];
//   for (let key in allFilterState) {
//     //key=Brand
//     if (allFilterState[key]?.length > 0) {
//       allFilterStateValues = [...allFilterStateValues, ...allFilterState[key]];
//     }

//     // allFilterStateValues = [...allFilterStateValues, ...allFilterState[key]];
//     // allFilterStateValues.push(allFilterState[key]);
//   }

//   // let flatedValues = allFilterStateValues.flatMap((value, index) => {
//   //   return value;
//   // });

//   // console.log(allFilterStateValues, "fd");

//   // console.log(allFilterStateValues, "allFilterStateValues");
//   // console.log(
//   //   allFilterStateValues.flatMap((value, index) => {
//   //     return value;
//   //   }),
//   //   "allFilterStateValues"
//   // );

//   //constants
//   const topFilters = [
//     {
//       name: "Age",
//       values: ["0-3", "3-6", "6-8", "8-12", "12-15", "15-17", "17-20"],
//     },
//     { name: "Buddles", values: ["Bundles", "Single Styles"] },
//     { name: "Country of origin", values: ["Red", "Blue", "Green"] },
//     { name: "Size", values: ["S", "M", "L", "XL"] },
//   ];

//   function handleRemoveFilter(filterDetails: {
//     filterName: string;
//     count?: number;

//     type: string;
//   }) {
//     console.log(filterDetails);
//     dispatch(
//       removeParticularFilter({
//         type: filterDetails.type,
//         value: filterDetails.filterName,
//       })
//     );
//   }

//   //for adding color to slider
//   const darkPinkTheme = createTheme({
//     components: {
//       MuiSlider: {
//         styleOverrides: {
//           root: {
//             color: "#ec407a",
//           },
//           thumb: {
//             borderColor: "#F76789",
//           },
//           rail: {
//             color: "#f5c1d6",
//           },
//         },
//       },
//     },
//   });

//   function handleSliderChange(event: Event, newValue: number | number[]) {
//     if (Array.isArray(newValue)) {
//       //checks if newValue is an array to avoid runtime

//       setValues([newValue[0], newValue[1]]);
//       //@ts-ignore
//       dispatch(setPrice([newValue[0], newValue[1]]));
//     }
//   }

//   //for getting values as 1,00 in slider
//   const formattedValue = new Intl.NumberFormat("en-IN", {}).format(1000); //Replace 1000 with your dynamic value

//   function handleClearAll() {
//     dispatch(resetFilterValues());
//   }
//   return (
//     <div className="wrapper h-[88%]">
//       <div className="w-[80%]  h-full mx-auto py-5 flex flex-col gap-4">
//         {/* top section */}
//         <div className="Container1 flex flex-col gap-4 pb-2 ">
//           <div className="text-[#8b8d95] text-[0.9rem]">
//             <p>
//               Home/
//               <span className="text-[#282c3f] font-bold">
//                 Kids Wear Online Store
//               </span>
//             </p>
//           </div>
//           <div className="text-[#282c3f] font-bold">
//             Kids Wear Online Store -{" "}
//             <span className="text-[#8b8d95] ">413233 items</span>
//           </div>
//         </div>

//         {/* bottom section */}
//         <div className="flex">
//           {/* left section */}
//           <div className="leftWrapper flex-[2] flex flex-col">
//             {/* left section top */}
//             <div className="flex justify-between items-center ">
//               <p className="text-sm font-bold uppercase text-black p-3 flex-[0.5] ">
//                 Filters
//               </p>

//               {allFilterStateValues.length > 0 && (
//                 <p
//                   onClick={handleClearAll}
//                   className="text-xs cursor-pointer  text-[#ff3f6c] pr-5 uppercase font-bold"
//                 >
//                   Clear All
//                 </p>
//               )}
//             </div>
//             {/* left section bottom */}
//             <div className="filtersWrapper border-t border-r flex-[9.5]">
//               {/* filtercomponents */}
//               <FilterComponents
//                 title={""}
//                 componentType={"Gender"}
//                 filterValues={[
//                   {
//                     filterName: "Boys",
//                     type: "Discount",
//                   },
//                   {
//                     filterName: "Girls",
//                     type: "Discount",
//                   },
//                 ]}
//                 isMultiSelect={false}
//                 isSearchable={false}
//               />

//               <FilterComponents
//                 title={"Categories"}
//                 componentType={"Categories"}
//                 filterValues={[
//                   {
//                     filterName: "T-shirts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shirts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Perfume",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Organisers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shirts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Perfume",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Wall Decor",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Perfume",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Organisers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shirts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nail Art and Nail Care",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Wall Decor",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nail Art and Nail Care",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Organisers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shirts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nail Art and Nail Care",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Wall Decor",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Wall Decor",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Accessories",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nightdress",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nightdress",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Nightdress",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Trousers",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Baby Pillow",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Baby Pillow",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Baby Pillow",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Baby Pillow",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "pyjamas",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "pyjamas",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "pyjamas",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "jeans",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "jeans",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "jeans",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "pyjamas",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Dresses",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Yoga Mats",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },

//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Massage Oils",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Massage Oils",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Leggings",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Massage Oils",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "Shorts",
//                     count: 100,
//                     type: "Categories",
//                   },
//                   {
//                     filterName: "kurta",
//                     count: 100,
//                     type: "Categories",
//                   },
//                 ]}
//                 isMultiSelect={true}
//                 isSearchable={true}
//               />

//               <FilterComponents
//                 title={"Brand"}
//                 componentType={"Brand"}
//                 filterValues={[
//                   {
//                     filterName: "Puma",
//                     count: 100,
//                     type: "Brand",
//                   },
//                   {
//                     filterName: "Nike",
//                     count: 100,
//                     type: "Brand",
//                   },
//                   {
//                     filterName: "Adidas",
//                     count: 100,
//                     type: "Brand",
//                   },
//                   {
//                     filterName: "Reebok",
//                     count: 100,
//                     type: "Brand",
//                   },
//                   {
//                     filterName: "Levis",
//                     count: 100,
//                     type: "Brand",
//                   },
//                 ]}
//                 isMultiSelect={true}
//                 isSearchable={true}
//               />

//               {/* price Slide */}
//               <div className="px-3 border-t py-4">
//                 <h3 className="font-bold text-xs text-[#282c3e] uppercase">
//                   Price
//                 </h3>

//                 <ThemeProvider theme={darkPinkTheme}>
//                   <Slider
//                     getAriaLabel={() => "Timeline range"}
//                     value={values}
//                     min={0}
//                     max={100000}
//                     step={100}
//                     size="small"
//                     onChange={handleSliderChange}
//                   />
//                 </ThemeProvider>

//                 <div className="flex justify-between text-xs text-black">
//                   <span className="font-bold">{"\u20B9"}</span>
//                   <p className="font-bold pr-1">
//                     {new Intl.NumberFormat("en-IN").format(values[0])}
//                   </p>
//                   <span className="font-bold"> - </span>
//                   <span className="font-bold">{"\u20B9"}</span>
//                   <p className="font-bold pr-1">
//                     {new Intl.NumberFormat("en-IN").format(values[1])}
//                   </p>
//                   <span className="font-bold"> + </span>
//                 </div>
//               </div>

//               <FilterComponents
//                 title={"Colors"}
//                 componentType={"Colors"}
//                 filterValues={[
//                   {
//                     filterName: "Red",
//                     type: "Colors",
//                   },
//                   {
//                     filterName: "Blue",
//                     type: "Colors",
//                   },
//                   {
//                     filterName: "Green",
//                     type: "Colors",
//                   },
//                   {
//                     filterName: "yellow",
//                     type: "Colors",
//                   },
//                   {
//                     filterName: "purple",
//                     type: "Colors",
//                   },
//                 ]}
//                 isMultiSelect={true}
//                 isSearchable={true}
//               />

//               <FilterComponents
//                 title={"Discount Range"}
//                 componentType={"Discount"}
//                 filterValues={[
//                   {
//                     filterName: "0-10",
//                     type: "Discount",
//                   },
//                   {
//                     filterName: "10-20",
//                     type: "Discount",
//                   },
//                   {
//                     filterName: "20-30",
//                     type: "Discount",
//                   },
//                   {
//                     filterName: "30-40",
//                     type: "Discount",
//                   },
//                   {
//                     filterName: "40-50",
//                     type: "Discount",
//                   },
//                 ]}
//                 isMultiSelect={false}
//                 isSearchable={false}
//               />
//             </div>
//           </div>

//           {/* right section */}
//           <div className="rightWrapper flex-[8]  flex flex-col gap-[11px]">
//             {/* right section top */}
//             <div className="flex  justify-between ">
//               <div className="flex flex-[4] justify-between items-center ">
//                 <div className="flex justify-between">
//                   <div className="flex flex-[3] justify-between items-center ">
//                     <div className="flex gap-3 justify-between items-center">
//                       {topFilters.map((filter, index) => {
//                         return (
//                           <div
//                             onClick={() => {
//                               if (currentSelected === index) {
//                                 return setCurrentSelected(null);
//                               }
//                               setCurrentSelected(index);
//                             }}
//                             key={index}
//                           >
//                             <p
//                               className={`text-[#8b8d95] text-sm ${currentSelected === index ? "bg-slate-200" : ""} font-bold cursor-pointer hover:bg-slate-200 flex gap-2 items-center rounded-lg px-3 py-1`}
//                             >
//                               {filter.name}
//                               {currentSelected !== index ? (
//                                 <IoIosArrowUp />
//                               ) : (
//                                 <IoIosArrowDown />
//                               )}
//                             </p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="flex justify-between">
//                   <div className="flex flex-[3] justify-between "> */}
//                 <div className="flex justify-end gap-3 relative">
//                   <DropDown
//                     title="Sort By"
//                     values={[
//                       { id: "352623", name: "Recommeded" },
//                       {
//                         id: "352625",
//                         name: "Popularity",
//                       },
//                       {
//                         id: "352624",
//                         name: "Newest",
//                       },
//                       {
//                         id: "352626",
//                         name: "Price: Low to High",
//                       },
//                       {
//                         id: "352627",
//                         name: "Price: High to Low",
//                       },
//                     ]}
//                   />
//                   {/* <div className="flex gap-3 justify-end ">
//                         <div className="wrapper border-[#d1d1d1] border flex items-center px-3">
//                           <div>
//                             <p className="text-[#8b8d95] text-sm">Sort By:</p>
//                           </div>

//                           <div>
//                             <select className="p-2 focus:outline-none text-sm rounded-lg">
//                               <option value="newest">Recommended</option>
//                               <option value="oldest">oldest</option>
//                               <option value="price">price</option>
//                             </select>
//                           </div>
//                         </div>
//                       </div> */}
//                 </div>
//               </div>
//             </div>
//             {/* </div>
//             </div> */}

//             {/* right section middle*/}
//             {currentSelected != null && (
//               <div className="dropdownfilters  pl-3 pb-4 grid lg:grid-cols-6 xl:grid-cols-9 ">
//                 {topFilters[currentSelected].values.map((value, index) => {
//                   return (
//                     <div key={index} className="flex gap-[0.5] items-center">
//                       <input
//                         onClick={() => {
//                           setSelectedTopFilter([
//                             ...(selectedTopFilter || []),
//                             value,
//                           ]);
//                         }}
//                         checked={selectedTopFilter?.includes(value)}
//                         className="accent-pink-500"
//                         type="checkbox"
//                       />
//                       <p className="text-[#8b8d95] cursor-pointer text-sm rounded-lg px-2">
//                         {value}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* selected Filters */}
//             <div className="selectedFilter flex flex-wrap gap-3 px-2">
//               {allFilterStateValues.map((value: any) => {
//                 return (
//                   <div className=" flex gap-1 py-1 px-1 max-w-[500px] min-w-[100px] rounded-xl items-center justify-between border text-[#3e4152]">
//                     <p className="text-[0.7rem]">{value?.filterName}</p>
//                     <RxCross1
//                       onClick={() => {
//                         handleRemoveFilter(value);
//                       }}
//                       size={15}
//                       color="#3e4152"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* right section bottom */}
//             <div className="cardsWrapper  w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 flex border-t border-l">
//               {/* map the product productDetails */}
//               {productDetails.map((product, index) => {
//                 return (
//                   <ProductCard
//                     key={index}
//                     title={product.title}
//                     description={product.description}
//                     price={product.price}
//                     images={product.images}
//                     size={product.size}
//                     rating={product.rating}
//                     likes={product.likes}
//                   />
//                 );
//               })}

//               {/* <ProductCard */}
//               {/* //   title={"H&M"}
//               //   description={"Boys Teddy Hoody"}
//               //   price={1999}
//               //   images={["/product1.png", "/product2.png"]}
//               //   rating={4.5}
//               //   likes={4.4}
//               // /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
