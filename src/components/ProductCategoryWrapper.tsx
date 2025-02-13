import React from 'react';
import ProductCategory from './ProductCategory';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listDocuments } from '../apis/listDocuments';
import { useSelector, useDispatch } from 'react-redux';
//import { setGlobalSearch } from '../Redux/navBarSlice.js';
import { setProductsDetails } from '../Redux/navBarSlice';

export default function ProductCategoryWrapper() {
  const { name } = useParams<{ name: string }>();
  //console.log(name, 'params');

  //we are fetchingData and storing in "productDetails"(orginal array)
  const [productDetails, setProductDetails] = React.useState<any[]>([]);

  //for storing searchValues [it is also filtering for sortBy(dropDown) also ]
  const [searchedProductDetails, setSearchedProductDetails] = React.useState<
    any[]
  >([]);
  //console.log(searchedProductDetails, 'searchedProductDetails');

  //getting search value from redux
  const globalSearchValue = useSelector(
    (state: any) => state.navBarSlice.globalSearchValue
  );
  //console.log(globalSearchValue, 'globalSearchValue');

  const selectedCategory = useSelector((state: any) => state.filterSlice.Categorie || []);
  const selectedBrand = useSelector((state: any) => state.filterSlice.Brand || []);
  const prices = useSelector((state: any) => state.filterSlice.prices);
  const selectedColor = useSelector((state: any) => state.filterSlice.Colors || []);
  const selectedDiscount = useSelector((state: any) => state.filterSlice.Discount || []);

  const topFilters = useSelector((state: any) => state.navBarSlice.topFilters);
  console.log(topFilters, 'topFilters');

  const currentSelectedFilter = useSelector(
    (state: any) => state.navBarSlice.currentTopFilterSelected
  );
  //console.log(currentSelectedFilter, 'currentSelectedFilter');

  const selectedSortValue = useSelector(
    (state: any) => state.navBarSlice.selectedSortValue
  );

  const dispatch = useDispatch();

  //fetch products from dataBase
  useEffect(() => {
    const categoryNameValue = name;
    async function fetchDetails() {
      const details: any = await listDocuments(
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        name,
        ['productDetails']
      );
      //console.log(details, 'productDetails');
      setProductDetails(details?.productDetails);
      dispatch(setProductsDetails(details?.productDetails));
    }
    fetchDetails();
  }, []); //if "name" changes run the function we have to give as dependency

  function handleSortProducts(filteredProducts: any) {
    console.log(
      `selectedSortValue.name inside handleSortProducts = ${selectedSortValue.name}`
    );
    switch (selectedSortValue.name) {
      case 'Price:Low to High':
        return filteredProducts.sort((a: any, b: any) => a.price - b.price);
      case 'Price:High to Low':
        return filteredProducts.sort((a: any, b: any) => b.price - a.price);
      case 'Popularity': //we are doing using rating
        return filteredProducts.sort((a: any, b: any) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }

  //useEffect runs when component mounts,when updates,when component unmount
  //search functionality       //selectedCategory - shirt,jeans
  useEffect(() => {
    let categoryName = selectedCategory.map((category: any) =>
      category.filterName?.toLowerCase()
    );
    let brandName = selectedBrand.map((brand: any) =>
      brand.filterName?.toLowerCase()
    );
    let selectedColorNames = selectedColor.map((color: any) =>
      color.filterName?.toLowerCase()
    );
    let selectedDiscountValue = selectedDiscount.map((discount: any) =>
      discount.filterName?.toLowerCase()
    );
    let topFilterNames = topFilters?.map((filter:any)=>filter.filterName?.toLowerCase());
    console.log(topFilterNames,"topFilterNames");
    
    //console.log(selectedDiscountValue, 'DiscountRangeFromRedux');
    console.log(productDetails, 'productDetails before filtering');
    //priceString - Rs. 7000 To Rs. 3400 [0-RS.,1-7000,2-To,3-Rs.,4-3400]index
    let pricesString = prices?.filterName; //prices.filterName = 0 to 0
    //let pricesString = prices?.filterName ||'';//if filterName is undefined or not a string it throws error so
    let [min, max] = ['0', '0'];
    if (pricesString?.length > 0) {
      [min, max] = [pricesString.split('')[1], pricesString.split('')[4]];
    }

    let filteredProducts = productDetails //filter by category

      //?(optionalParameter) - indicates if product is not null or undefined thenOnly proceed.
      ?.filter((product: any) => {
        //filter by category
        if (categoryName?.includes(product.categoryType?.toLowerCase())) {
          return product;
        } else if (categoryName.length === 0) {
          return product; //return all products
        }
      }) //filter by brand
      ?.filter((product: any) => {
        if (brandName?.includes(product.brand?.toLowerCase())) {
          return product;
        } else if (brandName.length === 0) {
          return product;
        }
      }) //filter by price
      ?.filter((product: any) => {
        //as min-max are strings we have to convert them into numbers
        if (parseInt(min) && parseInt(max)) {
          return (
            product.price >= parseInt(min) && product.price <= parseInt(max)
          );
        } else {
          return product;
        }
      }) //color filter
      ?.filter((product: any) => {
        if (
          product?.colors?.some((item: any) => {
            return selectedColorNames.join('').includes(item.toLowerCase());
          })
        ) {
          return product;
        } else if (selectedColorNames.length === 0) {
          return product;
        }
      }) //discountRange filter
      ?.filter((product: any) => {
        //checking whether it is an array because includes works on arrays
        //(String(product.discount))-converts product.discount a number into string
        if (
          Array.isArray(selectedDiscountValue)
            ? selectedDiscountValue[0]?.includes(product.discount)
            : false
        ) {
          //if it is not array it returns false
          return product;
        } else if (selectedDiscountValue.length === 0) {
          return product;
        }
      }) //filter for topFilters for Ages,bundles,size,coo
      .filter((product) => {
        console.log(product, 'topFilters product');
        // ['3-9'] ---> "3-9" ===> [3,9]
        if (currentSelectedFilter === null) return product;
        if (topFilters[currentSelectedFilter].selectedValues.length === 0)
          return product;
        let selectedAges = topFilters[currentSelectedFilter].selectedValues
          .join()
          .split('-');
        if (topFilters[currentSelectedFilter].name != "Ages") return product;
        let productAge = product.age;
        let [min, max] = [parseInt(selectedAges[0]), parseInt(selectedAges[1])];
        if (productAge && min >= productAge[0] && min <= productAge[1]) {
          return product;
        } else if ( max >= productAge[0] && max <= productAge[1]) {
          return product;
        } else if (selectedAges.length === 0) {
          return product;
        }
      }) //search by title
      ?.filter((product: any) => {
        return product.title
          .toLowerCase()
          .includes(globalSearchValue?.toLowerCase());
      });
    const sortedValues = handleSortProducts(filteredProducts);
    console.log(filteredProducts, 'filteredProducts after filtering');
    setSearchedProductDetails(sortedValues);
  }, [
    globalSearchValue,
    productDetails,
    selectedCategory,
    selectedBrand,
    selectedColor,
    prices,
    selectedDiscount,
    topFilters,
    currentSelectedFilter,
    selectedSortValue,
  ]);

  return (
    <div>
      <ProductCategory productDetails={searchedProductDetails} />
    </div>
  );
}
// productDetails={[
//   {
//     title: 'Raymond',
//     description: 'Pure Cotton Formal shirt',
//     price: 799,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…/12/N9JXwusW_527a68db55844f32b7abfa2d18b2b77a.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…ur-Men-Opaque-Casual-Shirt-6981711007527917-1.jpg'],
//     rating: 4.5,
//     likes: '3.2k',
//   },
//   {
//     title: 'H&M',
//     description: 'T-shirt',
//     price: 1999,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…Y/1/AzuLsxja_60c1ec2af1314ab994556d21b8c97f90.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…Y/1/pyIxbBCJ_6e93138c6531463787fe32482b37c406.jpg'],
//     rating: 4.5,
//     likes: '3.2k',
//   },
//   {
//     title: 'StyleCast',
//     description: 'Jackets',
//     price: 1500,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…-Blue-Solid-Quilted-Jacket-9721625817615005-1.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…-Self-Design-Bomber-Jacket-9361704882060268-1.jpg'],
//     rating: 4.1,
//     likes: '3.2k',
//   },
//   {
//     title: 'Roadster',
//     description: 'Jeans',
//     price: 2000,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…-Straight-Fit-Indigo-Jeans-2551730701982420-1.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…m-Straight-Fit-Light-Fade-Stretchable-Jeans-1.jpg'],
//     rating: 4.5,
//     likes: '3.2k',
//   },
//   {
//     title: 'MAX',
//     description: 'Track Pants',
//     price: 1000,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…c11-86f0-23fc404211121647493962571TrackPants1.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…24532BOLDFITMenCottonMid-RiseSlim-FitJoggers1.jpg'],
//     rating: 3.5,
//     likes: '4.2k',
//   },
//   {
//     title: 'Jompers',
//     description: 'Kurta Sets',
//     price: 1999,
//     images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…yon-Chikankari-sequinned-embroidered-kurta--1.jpg',
//              'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,…78196516JompersMenGreyGeometricAnarkaliKurta1.jpg'],
//     rating: 4.5,
//     likes: '3.2k',
//   },
// ]}
