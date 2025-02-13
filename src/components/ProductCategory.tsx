import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import FilterComponent from './FilterComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import {
  removeParticularFilter,
  resetFilterValues,
  setPrices,
  fetchSelectedFilter,
  setParams,
} from '../Redux/filterSlice';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PCDropDown from './PCDropDown';
import { listDocuments } from '../apis/listDocuments';
import { useParams } from 'react-router-dom';
import { insertDataIntoDocument } from '../apis/insertDataIntoDocument';
import { insertParticularColumn } from '../apis/insertParticularColumn';
import parse from 'html-react-parser';
import {
  setTopFilters,
  setCurrentTopFilterSelected,
} from '../Redux/navBarSlice';
import { setWishList } from "../Redux/wishListSlice";

type ProductCategoryPropsType = {
  productDetails: {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    size?: string;
    rating: number;
    likes?: string;
  }[];
};

//we have prop-productDetails we can add other props also
export default function ProductCategory({
  productDetails,
}: ProductCategoryPropsType) {

  //for slider(price)
  const [values, setValues] = React.useState<number[]>([0, 0]);

  //const [selectedTopFilter, setSelectedTopFilter] = React.useState<string[]>();
  //as we removed static topFilters we need state to save

  //const [topFilters, setTopFilters] = React.useState([]);
  //here we get[bundles,countryOfOrigin,size]
  const topFilters = useSelector((state: any) => state.navBarSlice.topFilters);
  //console.log(topFilters,"topFilters");
  const currentSelected = useSelector(
    (state: any) => state.navBarSlice.currentTopFilterSelected
  );

  //for topFilters to select index(age,bundles)
  //const [currentSelected, setCurrentSelected] = React.useState<null | number>(
  // null);
  //console.log(currentSelected,"currentSelected");//it shows index(0,1,2)

  //filterDetails has all values
  const [filterDetails, setFilterDetails] = React.useState({
    brands: [],
    categories: [],
    colors: [],
    discountRange: [],
    Gender: [],
    selectedFilters: [],
  });

  //searched values are stored here
  const [searchFilterDetails, setSearchFilterDetails] = React.useState({
    searchFilteredCategories: [],
    searchFilteredBrands: [],
  });
  const [categorySearch, setCategorySearch] = React.useState<string>('');
  const [brandSearch, setBrandSearch] = React.useState('');

  const [refetch, setRefetch] = React.useState(false);

  //we took static values
  // const topFilters = [
  //   { name: 'Age', values: ['0-3', '3-6', '6-9', '9-12'] },
  //   { name: 'Bundles', values: ['Bundles', 'Single Styles'] },
  //   {
  //     name: 'Country Of Origin',
  //     values: [
  //       'All Countries',
  //       'India',
  //       'USA',
  //       'China',
  //       'Turkey',
  //       'Malaysia',
  //       'Portugal',
  //       'Vietnam',
  //       'Jordan',
  //     ],
  //   },
  //   { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] },
  // ];

  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();

  //we will get whole obj from initialState(ReduxStore)
  const allFilterState = useSelector((state: any) => state.filterSlice);

  let allFilterStateValues: any = []; //has whole obj key-value pairs into one single array
  // console.log(
  //   '@@@@@@@@ allFilterState , before for loop = ' +
  //     JSON.stringify(Object.keys(allFilterState))
  // );
  for (let key in allFilterState) {
    //converts obj into array [key(params)-brand,colors,categories,discount]
    if (!allFilterState[key]) {
      console.log(`allFilterState[key] is undefined for key = ${key}`);
      continue;
    }
    // console.log(
    //   '@@@@@@@@ allFilterState[key] = ' + JSON.stringify(allFilterState[key])
    // );

    if (allFilterState[key]?.length > 0 && key !== 'params') {
      allFilterStateValues = [...allFilterStateValues, ...allFilterState[key]]; //converting into single array & store in "allFilterStateValues"
    } //prices is obj so it goes to else
    else {
      if (Object.keys(allFilterState[key])?.length > 0 && key !== 'params') {
        allFilterStateValues = [...allFilterStateValues, allFilterState[key]];
      }
    }
  }

  //   allFilterStateValues.push(allFilterState[key]);
  // }
  // let flatedValues = allFilterStateValues.flatMap((value,index)=>{
  //   return value;
  // });

  function handleRemoveFilter(filterDetails: {
    filterName: string;
    count?: number;
    type: string;
  }) {
    dispatch(
      removeParticularFilter({
        type: filterDetails?.type,
        value: filterDetails.filterName,
      })
    );
  }

  //for adding color to slider
  const darkPinkTheme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#ec407a',
          },
          thumb: {
            borderColor: '#F76789',
          },
          rail: {
            color: '#f5c1d6',
          },
        },
      },
    },
  });

  function handleSlideChange(event: Event, newValue: number | number[]) {
    console.log(newValue, 'new ');
    //storing in redux(localState)
    //@ts-ignore
    setValues([newValue[0], newValue[1]]);
    //@ts-ignore
    dispatch(setPrices([newValue[0], newValue[1]]));

    //inserting into server
    if (!Array.isArray(newValue)) return;
    const obj: any = {
      filterName: `Rs. ${newValue[0]} To Rs. ${newValue[1]}`,
      type: 'prices',
      isChecked: true,
    }; //we are converting into obj and inserting
    insertData({ ...allFilterState, prices: obj }); //spread(keep all values, only insert prices)
  }

  //in redux when it is fetching(&storing) it takes time so useEffect run so giving empty obj is notCorrect that's why we gave if condition
  useEffect(() => {   
    //console.log('&&&&&&&&&&' + allFilterState.prices);
    if (!Object.keys(allFilterState.prices).length) return; //if obj.keys=empty return(exit)
    let name = allFilterState.prices?.filterName;
    //console.log(name,"name");
    let newValue = name?.split(' '); //gap is mandatory
    setValues([newValue[1], newValue[newValue.length - 1]]);
    //console.log(newValue, 'newValue');
  }, [allFilterState.prices]);

  //for getting values as 1,000 in slider
  // const formattedValue = new Intl.NumberFormat('en-IN', {
  //   maximumFractionDigits: 0, // For integer values
  // }).format(1000); // Replace 1000 with your dynamic value

  //useEffect to scroll Top
  // useEffect(()=>{
  //   window.scrollTo(0,0);
  // },[]);

  function handleClearAll() {
    dispatch(resetFilterValues([]));
  }

  //here we are fetching data from DB using listDocuments
  useEffect(() => {
    const categoryNameValue = name;
    async function fetchDetails() {
      const details: any = await listDocuments(
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        name, //we will have prices in "selectedFilter" so we didn't mention in array
        [
          'brands',
          'categories',
          'colors',
          'discountRange',
          // 'Gender',
          'selectedFilters',
          'topFilters',
        ]
      ); //this names should match with DB attributes
      setFilterDetails(details); //Original details it won't change it has all values/details from D.B
      setSearchFilterDetails({
        searchFilteredBrands: details?.brands,
        searchFilteredCategories: details?.categories,
      });
      dispatch(setTopFilters(details?.topFilters));
      //console.log(details, 'details');
    }
    fetchDetails();
  }, [refetch]);

  useEffect(() => {
    let categories = searchFilterDetails?.searchFilteredCategories;
    let searchCategories = categories.filter((item: any) => {
      return item?.filterName
        .toLowerCase()
        .includes(categorySearch.toLowerCase());
    });
    setSearchFilterDetails({
      ...searchFilterDetails,
      searchFilteredCategories: searchCategories,
    });
  }, [categorySearch]);

  //when my page loads i am sending name to redux
  useEffect(() => {
    dispatch(setParams(name));
  }, [name]);

  // useEffect(() => {
  //   dispatch(fetchSelectedFilter() as any);
  // }, []);

  //if you add/remove data[checkboxes] we have to update in DB
  //here "allFilterState" holds data to be inserted into "DB"
  async function insertData(allFilterState: any) {
    //we are giving this fun as a prop to FilterComponent
    console.log('allFilterState', allFilterState); //it is called when checkboxes are selected.
    const res = await insertDataIntoDocument(
      JSON.stringify(allFilterState),
      '676a1ec4001bf5b712d9',
      '676a1ee4001ae452e2df',
      'CategoryType',
      name
    );
    setRefetch(!refetch);
  }

  //if you add/remove data[checkboxes] we have to update in DB same as above we did for topFilters
  async function updateDataInServerForTopFilter(value: any, index: number) {
    console.log(value,'value',index,'index',
      'inside updateDataInServerForTopFilter'
    );
    const res = await insertParticularColumn(
      { value: value, index: index },
      '676a1ec4001bf5b712d9',
      '676a1ee4001ae452e2df',
      'CategoryType',
      name,
      'topFilters',
      true,
    );
    //console.log(refetch, 'refetch_updateDataInServerForTopFilter');
    setRefetch(!refetch);
  }

  // setTimeout(() => {
  //   insertData();
  // }, 4000);
  // }, [allFilterState]);

  //for reduxStore
  useEffect(() => {
    async function fetchAndInsertData() {
      let dispatchRes = await dispatch(fetchSelectedFilter() as any);
      //insertData(dispatchRes.payload.selectedFilters);
    }
    fetchAndInsertData();
  }, [refetch]);

  useEffect(() => {
    async function updateDataInServer() {
      if (allFilterState.params) {
        let dispatchRes = await dispatch(fetchSelectedFilter() as any);
        //console.log(dispatchRes.payload.selectedFilters, 'dispatchRes');
        insertData({
          ...dispatchRes.payload.selectedFilters,
          params: allFilterState.params,
        });
        //console.log(allFilterState, 'allFilterState');
      }
    }
    updateDataInServer();
  }, [allFilterState.params]);

  return (
    <div className="h-[100%] w-full">
      <div className="wrapper lg:w-[80%] md:w-auto md:px-1 h-full lg:mx-auto  ">
        <div className="Top-section flex flex-col gap-3 mt-2 p-2 pb-5">
          <div className="first-line">
            <p className="text-[#282C3F] text-sm cursor-pointer">
              Home / Clothing /
              <span className=" text-[#282c3e] font-bold"> Loungewear</span>
            </p>
          </div>
          <div className="second-line">
            <p className="text-[#282C3F] text-sm">
              <b> Loungewear</b>
              <span className="text-[#878B94] "> - 39534 items</span>
            </p>
          </div>
        </div>
        <div className="Bottom-section flex  ">
          <div className="search-leftContainer flex-[2.5]  ">
            <div className="headingSection flex  pb-1 pt-4 justify-between items-center">
              <p className="text-black font-bold  ">FILTERS</p>
              {allFilterStateValues.length > 0 && (
                <p
                  onClick={handleClearAll}
                  className="text-[#F76789] text-xs font-bold pt-1 cursor-pointer"
                >
                  CLEAR ALL
                </p>
              )}
            </div>
            <div className="LeftBottomSection  border-t border-r">
              <div className="filtersWrapper">
                <FilterComponent
                  title={''}
                  componentType={'Gender'}
                  filterValues={filterDetails?.Gender}
                  // filterValues={[
                  //   { filterName: 'Men', type: 'Gender' },
                  //   { filterName: 'Women', type: 'Gender' },
                  //   { filterName: 'Boys', type: 'Gender' },
                  //   { filterName: 'Girls', type: 'Gender' },
                  // ]}
                  isMultiSelect={false}
                  isSearchable={false}
                  onSelectedFilter={insertData} //added
                  searchValue=""
                  setSearchValue={() => {}}
                />
                <FilterComponent
                  title={'CATEGORIES'}
                  componentType={'Categorie'}
                  filterValues={searchFilterDetails.searchFilteredCategories}
                  // filterValues={[
                  //   { filterName: 'Shirts', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'T-Shirts', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'Kurtas', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'Jackets', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'Jeans', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'Shoes', count: 100, type: 'CATEGORIES' },
                  //   { filterName: 'Watches', count: 100, type: 'CATEGORIES' },
                  // ]}
                  isMultiSelect={true}
                  isSearchable={true}
                  onSelectedFilter={insertData}
                  searchValue={categorySearch}
                  setSearchValue={setCategorySearch}
                />
                <FilterComponent
                  title={'BRAND'}
                  componentType={'Brand'}
                  filterValues={searchFilterDetails.searchFilteredBrands}
                  // filterValues={[
                  //   {
                  //     filterName: 'Louis Philippe',
                  //     count: 5268,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Van Heusen', count: 4703, type: 'BRAND' },
                  //   { filterName: 'Arrow', count: 4105, type: 'BRAND' },
                  //   { filterName: 'Park Avenue', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Allen Solly', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Peter England', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Raymond', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Anand Sarees', count: 5268, type: 'BRAND' },
                  //   { filterName: 'Mitera', count: 4703, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                  //   { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                  //   { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                  //   { filterName: 'EMV', count: 4703, type: 'BRAND' },
                  //   {
                  //     filterName: 'Fashion Petals',
                  //     count: 4105,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                  //   { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Iris', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                  //   {
                  //     filterName: 'Louis Philippe',
                  //     count: 5268,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                  //   { filterName: 'NUD', count: 4105, type: 'BRAND' },
                  //   { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Suta', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                  //   { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                  //   { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                  //   { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                  //   { filterName: 'EMV', count: 4703, type: 'BRAND' },
                  //   {
                  //     filterName: 'Fashion Petals',
                  //     count: 4105,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                  //   { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Iris', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                  //   {
                  //     filterName: 'Louis Philippe',
                  //     count: 5268,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                  //   { filterName: 'NUD', count: 4105, type: 'BRAND' },
                  //   { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Suta', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                  //   { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                  //   { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                  //   { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                  //   { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                  //   { filterName: 'EMV', count: 4703, type: 'BRAND' },
                  //   {
                  //     filterName: 'Fashion Petals',
                  //     count: 4105,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                  //   { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Iris', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                  //   {
                  //     filterName: 'Louis Philippe',
                  //     count: 5268,
                  //     type: 'BRAND',
                  //   },
                  //   { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                  //   { filterName: 'NUD', count: 4105, type: 'BRAND' },
                  //   { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                  //   { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                  //   { filterName: 'Suta', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                  //   { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                  //   { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                  //   { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                  //   { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                  // ]}
                  isMultiSelect={true}
                  isSearchable={true}
                  searchValue={brandSearch}
                  setSearchValue={setBrandSearch}
                  onSelectedFilter={insertData}
                />
                {/* price slide */}
                <div className="px-3 border-t py-4">
                  <h3 className="font-bold text-xs text-[#282c3e]">PRICE</h3>
                  <ThemeProvider theme={darkPinkTheme}>
                    <Slider
                      getAriaLabel={() => 'Timeline range'}
                      value={values}
                      min={0}
                      max={100000}
                      step={100}
                      size="small"
                      onChange={handleSlideChange}
                    />
                  </ThemeProvider>
                  <div className="flex text-xs  ">
                    <span className="font-bold">{'\u20B9'}</span>
                    {/* <p className="font-bold pr-1">
                      {new Intl.NumberFormat('en-IN').format(values[0])}
                    </p> */}
                    <p className="font-bold pr-1">{values[0]}</p>
                    <span className="font-bold"> - </span>
                    <span className="pl-1 font-bold">{'\u20B9'}</span>
                    {/* <p className="font-bold ">
                      {new Intl.NumberFormat('en-IN').format(values[1])}
                    </p> */}
                    <p className="font-bold pr-1">{values[1]}</p>
                    <span className="font-bold">+</span>
                  </div>
                </div>
                <FilterComponent
                  title={'COLOR'}
                  componentType={'Colors'}
                  filterValues={filterDetails?.colors}
                  // filterValues={[
                  //   { filterName: 'Blue', count: 5268, type: 'COLOR' },
                  //   { filterName: 'White', count: 4703, type: 'COLOR' },
                  //   { filterName: 'Grey', count: 4105, type: 'COLOR' },
                  //   { filterName: 'Navy Blue', count: 2063, type: 'COLOR' },
                  //   { filterName: 'Black', count: 1705, type: 'COLOR' },
                  //   { filterName: 'Green', count: 1688, type: 'COLOR' },
                  //   { filterName: 'Pink', count: 1474, type: 'COLOR' },
                  //   { filterName: 'Yellow', count: 1445, type: 'COLOR' },
                  // ]}
                  isMultiSelect={true}
                  isSearchable={false}
                  searchValue={''}
                  setSearchValue={() => {}}
                  onSelectedFilter={insertData}
                />
                <FilterComponent
                  title={'DISCOUNT RANGE2'}
                  componentType={'Discount'}
                  filterValues={filterDetails?.discountRange}
                  isMultiSelect={false}
                  isSearchable={false}
                  searchValue=""
                  setSearchValue={() => {}}
                  onSelectedFilter={insertData}
                />
              </div>
            </div>
          </div>
          <div className="search-rightContainer  flex-[8]  ">
            <div className="wrapperForTopRight flex flex-col  py-4 w-full  ">
              <div className="wrapper flex  justify-between">
                <div className="filters w-full flex flex-[6] pl-2 gap-2 cursor-pointer md:flex-wrap justify-start items-center">
                  {topFilters?.map((filter: any, index: number) => {
                    return (
                      <div
                        onClick={() => {
                          if (currentSelected === index) {
                            return dispatch(setCurrentTopFilterSelected(null)); //condition for toggle (" ^ " buttons)
                          }
                          dispatch(setCurrentTopFilterSelected(index));
                        }} //to select filter(Age)
                        key={index}
                        className="flex flex-col gap-1 items-center mb-2"
                      >
                        <p
                          className={`text-[#282C3F] flex gap-1 items-center text-sm ${
                            currentSelected === index ? 'bg-slate-200' : ''
                          } hover:bg-slate-200 rounded-xl px-1 py-1`}
                        >
                          {filter.name}
                          {currentSelected === index ? (
                            <MdKeyboardArrowUp />
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="rightTopSectionSortBy relative flex flex-[4] gap-3 ">
                  <PCDropDown
                    title={'Sort By:'}
                    values={[
                      { id: 352623, name: 'Recommended' },
                      // { id: 352624, name: "What's New" },
                      { id: 352625, name: 'Popularity' },
                      // { id: 352626, name: 'Better Discount' },
                      { id: 352627, name: 'Price:High to Low' },
                      { id: 352628, name: 'Price:Low to High' },
                      // { id: 352629, name: 'Customer Rating' },
                    ]}
                  />
                </div>
              </div>

              <div className="FilterDropdownValues w-full">
                {
                  // because if 1st index is 0(i.e,false)to make true we added !=null
                  currentSelected != null && (
                    <div className="dropdownFilters w-full grid grid-col gap-5 lg:grid-cols-3 xl:grid-cols-5 justify-start place-items-start pb-4 pl-4 pt-1">
                      {/* @ts-ignore */}
                      {topFilters[currentSelected].values?.map(
                        (value: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="flex gap-1 items-center"
                            >
                              <input
                                onClick={() =>
                                  updateDataInServerForTopFilter(
                                    value,
                                    currentSelected
                                  )
                                }
                                checked={topFilters[
                                  currentSelected
                                  //@ts-ignore
                                ].selectedValues.includes(value)}
                                // setSelectedTopFilter([
                                //   ...(selectedTopFilter || []),
                                //   value,
                                // ]);
                                //}}
                                //checked={selectedTopFilter?.includes(value)}
                                type="checkbox"
                                className=" accent-pink-500"
                              />
                              <p className="text-[#8b8d95] cursor-pointer text-sm rounded-lg">
                                {value}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )
                }
              </div>
              {/*selected filter*/}
              <div className="selectedFilter w-full flex flex-wrap gap-3 px-2">
                {allFilterStateValues
                  ?.filter((value: any) => {
                    if (value.type === 'prices') {
                      let newValue = value.filterName.split('');
                      //console.log(newValue,"newValue");
                      return newValue[1] !== '0' || newValue[4] !== '0';
                    } else {
                      return value;
                    }
                  })
                  ?.map((value: any) => {
                    return (
                      <div className="flex gap-1 max-w-[500px] min-w-[100px] justify-between items-center py-1 px-1 rounded-xl  border text-[#3e4152]">
                        <p className="text-[0.7rem] ">
                          {value.type === 'Colors'
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
            </div>

            <div className="RightBottomSection flex-[8] flex border-l border-t p-5">
              <div className="cardContainer w-full gap-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
                {productDetails?.map((product, index) => {
                  return (
                    <ProductCard
                      id={product.id}
                      key={index}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      images={product.images}
                      rating={product.rating}
                      likes={product.likes}
                      product={product}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
