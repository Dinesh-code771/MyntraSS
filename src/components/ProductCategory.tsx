import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import FilterComponent from './FilterComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { removeParticularFilter, resetFilterValues, setPrices } from '../Redux/filterSlice';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PCDropDown from './PCDropDown';

type ProductCategoryPropsType = {
  productDetails: {
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
  //for filters to select index(age,bundles)
  const [currentSelected, setCurrentSelected] = React.useState<null | number>(
    null
  );

  const [values, setValues] = React.useState<number[]>([0, 10000]);

  //we took static values
  const topFilters = [
    { name: 'Age', values: ['0-3', '3-6', '6-9', '9-12'] },
    { name: 'Bundles', values: ['Bundles', 'Single Styles'] },
    {
      name: 'Country Of Origin',
      values: [
        'All Countries',
        'India',
        'USA',
        'China',
        'Turkey',
        'Malaysia',
        'Portugal',
        'Vietnam',
        'Jordan',
      ],
    },
    { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] },
  ];

  const dispatch = useDispatch();

  const allFilterState = useSelector((state: any) => state.filterSlice);

  let allFilterStateValues: any = [];
  for (let key in allFilterState) {
    if (allFilterState[key].length > 0) {
      allFilterStateValues = [...allFilterStateValues, ...allFilterState[key]];
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
        type: filterDetails.type,
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
    if (Array.isArray(newValue)) {
      //checks if newValue is an array to avoid runtime errors
      setValues([newValue[0], newValue[1]]);
      dispatch(setPrices([newValue[0], newValue[1]]));
    }
  }

  //for getting values as 1,000 in slider
  const formattedValue = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0, // For integer values
  }).format(1000); // Replace 1000 with your dynamic value

  //useEffect to scroll Top
  // useEffect(()=>{
  //   window.scrollTo(0,0);
  // },[]);

  function handleClearAll(){
    dispatch(resetFilterValues());
  }

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
              {
              allFilterStateValues.length > 0 && (
              <p onClick = {()=>handleClearAll()}
               className="text-[#F76789] text-xs font-bold pt-1 cursor-pointer">
                 CLEAR ALL</p>
              ) 
              }
            </div>
            <div className="LeftBottomSection  border-t border-r">
              <div className="filtersWrapper">
                <FilterComponent
                  title={''}
                  componentType={'Gender'}
                  filterValues={[
                    { filterName: 'Men', type: 'Gender' },
                    { filterName: 'Women', type: 'Gender' },
                    { filterName: 'Boys', type: 'Gender' },
                    { filterName: 'Girls', type: 'Gender' },
                  ]}
                  isMultiSelect={false}
                  isSearchable={false}
                />
                <FilterComponent
                  title={'CATEGORIES'}
                  componentType={'CATEGORIES'}
                  filterValues={[
                    { filterName: 'T-Shirts', count: 100, type: 'CATEGORIES' },
                    { filterName: 'Shirts', count: 100, type: 'CATEGORIES' },
                    { filterName: 'Trousers', count: 100, type: 'CATEGORIES' },
                    { filterName: 'Dresses', count: 100, type: 'CATEGORIES' },
                    { filterName: 'Skirts', count: 100, type: 'CATEGORIES' },
                    { filterName: 'Pants', count: 100, type: 'CATEGORIES' },
                  ]}
                  isMultiSelect={true}
                  isSearchable={false}
                />
                <FilterComponent
                  title={'BRAND'}
                  componentType={'BRAND'}
                  filterValues={[
                    {
                      filterName: 'Louis Philippe',
                      count: 5268,
                      type: 'BRAND',
                    },
                    { filterName: 'Van Heusen', count: 4703, type: 'BRAND' },
                    { filterName: 'Arrow', count: 4105, type: 'BRAND' },
                    { filterName: 'Park Avenue', count: 2063, type: 'BRAND' },
                    { filterName: 'Allen Solly', count: 1705, type: 'BRAND' },
                    { filterName: 'Peter England', count: 1688, type: 'BRAND' },
                    { filterName: 'Raymond', count: 1474, type: 'BRAND' },
                    { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                    { filterName: 'Anand Sarees', count: 5268, type: 'BRAND' },
                    { filterName: 'Mitera', count: 4703, type: 'BRAND' },
                    { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                    { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                    { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                    { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                    { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                    { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                    { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                    { filterName: 'EMV', count: 4703, type: 'BRAND' },
                    {
                      filterName: 'Fashion Petals',
                      count: 4105,
                      type: 'BRAND',
                    },
                    { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                    { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                    { filterName: 'Iris', count: 1688, type: 'BRAND' },
                    { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                    { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                    {
                      filterName: 'Louis Philippe',
                      count: 5268,
                      type: 'BRAND',
                    },
                    { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                    { filterName: 'NUD', count: 4105, type: 'BRAND' },
                    { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                    { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                    { filterName: 'Suta', count: 1688, type: 'BRAND' },
                    { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                    { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                    { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                    { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                    { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                    { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                    { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                    { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                    { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                    { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                    { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                    { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                    { filterName: 'EMV', count: 4703, type: 'BRAND' },
                    {
                      filterName: 'Fashion Petals',
                      count: 4105,
                      type: 'BRAND',
                    },
                    { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                    { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                    { filterName: 'Iris', count: 1688, type: 'BRAND' },
                    { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                    { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                    {
                      filterName: 'Louis Philippe',
                      count: 5268,
                      type: 'BRAND',
                    },
                    { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                    { filterName: 'NUD', count: 4105, type: 'BRAND' },
                    { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                    { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                    { filterName: 'Suta', count: 1688, type: 'BRAND' },
                    { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                    { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                    { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                    { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                    { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                    { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                    { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                    { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                    { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                    { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                    { filterName: 'Kalini', count: 4105, type: 'BRAND' },
                    { filterName: 'Saree mall', count: 2063, type: 'BRAND' },
                    { filterName: 'Buta buti', count: 1705, type: 'BRAND' },
                    { filterName: 'Charukriti', count: 1688, type: 'BRAND' },
                    { filterName: 'Unnati silks', count: 1474, type: 'BRAND' },
                    { filterName: 'Turtle', count: 1445, type: 'BRAND' },
                    { filterName: 'DipDiya', count: 5268, type: 'BRAND' },
                    { filterName: 'EMV', count: 4703, type: 'BRAND' },
                    {
                      filterName: 'Fashion Petals',
                      count: 4105,
                      type: 'BRAND',
                    },
                    { filterName: 'Grancy', count: 2063, type: 'BRAND' },
                    { filterName: 'HandSel', count: 1705, type: 'BRAND' },
                    { filterName: 'Iris', count: 1688, type: 'BRAND' },
                    { filterName: 'Jaipure Print', count: 1474, type: 'BRAND' },
                    { filterName: 'Kalini', count: 1445, type: 'BRAND' },
                    {
                      filterName: 'Louis Philippe',
                      count: 5268,
                      type: 'BRAND',
                    },
                    { filterName: 'Meena Bazaar', count: 4703, type: 'BRAND' },
                    { filterName: 'NUD', count: 4105, type: 'BRAND' },
                    { filterName: 'OneWe', count: 2063, type: 'BRAND' },
                    { filterName: 'Qahal', count: 1705, type: 'BRAND' },
                    { filterName: 'Suta', count: 1688, type: 'BRAND' },
                    { filterName: 'Uttariya', count: 1474, type: 'BRAND' },
                    { filterName: 'Vimla', count: 1445, type: 'BRAND' },
                    { filterName: 'Wuxi', count: 1688, type: 'BRAND' },
                    { filterName: 'Yuvani', count: 1474, type: 'BRAND' },
                    { filterName: 'ZARA', count: 1445, type: 'BRAND' },
                  ]}
                  isMultiSelect={true}
                  isSearchable={true}
                />
                <div className="px-3 border-t py-4">
                  <h3 className="font-bold text-xs text-[#282c3e]">PRICE</h3>
                  <ThemeProvider theme={darkPinkTheme}>
                    <Slider
                      getAriaLabel={() => 'Timeline range'}
                      value={values}
                      min={0}
                      max={10000}
                      step={100}
                      size="small"
                      className=""
                      onChange={handleSlideChange}
                    />
                  </ThemeProvider>
                  <div className="flex text-xs  ">
                    <span className="font-bold">{'\u20B9'}</span>
                    <p className="font-bold pr-1">
                      {new Intl.NumberFormat('en-IN').format(values[0])}
                    </p>
                    <span className="font-bold"> - </span>
                    <span className="pl-1 font-bold">{'\u20B9'}</span>
                    <p className="font-bold ">
                      {new Intl.NumberFormat('en-IN').format(values[1])}
                    </p>
                    <span className="font-bold">+</span>
                  </div>
                </div>
                <FilterComponent
                  title={'COLOR'}
                  componentType={'COLOR'}
                  filterValues={[
                    { filterName: 'Blue', count: 5268, type: 'COLOR' },
                    { filterName: 'White', count: 4703, type: 'COLOR' },
                    { filterName: 'Grey', count: 4105, type: 'COLOR' },
                    { filterName: 'Navy Blue', count: 2063, type: 'COLOR' },
                    { filterName: 'Black', count: 1705, type: 'COLOR' },
                    { filterName: 'Green', count: 1688, type: 'COLOR' },
                    { filterName: 'Pink', count: 1474, type: 'COLOR' },
                    { filterName: 'Yellow', count: 1445, type: 'COLOR' },
                  ]}
                  isMultiSelect={true}
                  isSearchable={true}
                />
                <FilterComponent
                  title={'DISCOUNT RANGE'}
                  componentType={'DISCOUNT'}
                  filterValues={[
                    { filterName: '10% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '20% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '30% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '40% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '50% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '60% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '70% and above', type: 'DISCOUNT RANGE' },
                    { filterName: '80% and above', type: 'DISCOUNT RANGE' },
                  ]}
                  isMultiSelect={false}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
          <div className="search-rightContainer  flex-[8]  ">
            <div className="wrapperForTopRight flex flex-col  py-4 w-full  ">
              <div className="wrapper flex  justify-between">
                <div className="filters w-full flex flex-[6] pl-2 gap-2 cursor-pointer md:flex-wrap justify-start items-center">
                  {topFilters.map((filter, index) => {
                    return (
                      <div
                        onClick={() => {
                          if (currentSelected === index) {
                            return setCurrentSelected(null); //condition for toggle (" ^ " buttons)
                          }
                          setCurrentSelected(index);
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
                      { id: 0, name: 'Recommended' },
                      { id: 1, name: "What's New" },
                      { id: 2, name: 'Popularity' },
                      { id: 3, name: 'Better Discount' },
                      { id: 4, name: 'Price:High to Low' },
                      { id: 5, name: 'Price:Low to High' },
                      { id: 6, name: 'Customer Rating' },
                    ]}
                  />
                </div>
              </div>

              <div className="FilterDropdownValues w-full">
                {
                  // because if 1st index is 0(i.e,false)to make true we added !=null
                  currentSelected != null && (
                    <div className="dropdownFilters w-full grid grid-col gap-5 lg:grid-cols-3 xl:grid-cols-5 justify-start place-items-start pb-4 pl-4 pt-1">
                      {topFilters[currentSelected].values.map(
                        (value, index) => {
                          return (
                            <div
                              key={index}
                              className="flex gap-1 items-center"
                            >
                              <input type="checkbox" className=' accent-pink-500' />
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
                {allFilterStateValues.map((value: any) => {
                  return (
                    <div className="flex gap-1 max-w-[500px] min-w-[100px] justify-between items-center py-1 px-1 rounded-xl  border text-[#3e4152]">
                      <p className="text-[0.7rem] ">{value?.filterName}</p>
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
                {productDetails.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      title={product.title}
                      description={product.description}
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
    </div>
  );
}
