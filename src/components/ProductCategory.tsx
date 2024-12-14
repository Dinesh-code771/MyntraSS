import React from 'react';
import ProductCard from './ProductCard';

export default function ProductCategory() {
//for filters to select index(age,bundles)
 const [currentSelected,setCurrentSelected] = React.useState<null | number>(null);

  const topFilters = [
    { name: 'Age',values: ["0-3","3-6","6-9","9-12"] },
    { name: 'Bundles',values:["Bundles","Single Styles"] },
    { name: 'Country Of Origin',values:["All Countries","India","USA","China"]  },
    { name: 'Size',values:["XS","S","M","L","XL"] },
  ];

  return (
    <div className="h-[100%] w-full">
      <div className="wrapper lg:w-[80%] md:w-[100%] h-full lg:mx-auto  ">
        <div className="top-container flex flex-col gap-3 mt-2 p-2">
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
        <div className="body-section flex  ">
          <div className="search-leftContainer flex-[2] flex flex-col justify-center ">
              <div className='leftTopSection flex-[0.8] flex  justify-between items-center'>
                  <p className="text-black font-bold  ">FILTERS</p>
                  <p className="text-[#F76789] text-xs font-bold pt-1">CLEAR ALL</p>
              </div>
              <div className='leftBottomSection flex-[9] border-t'>
                  <div className='filtersWrapper'>

                  </div>
              </div>
          </div>
          <div className="search-rightContainer  flex-[8] p-1 flex flex-col  ">
              <div className='wrapperForTopRight flex justify-between items-center'>
                  <div className=" flex pl-2 gap-3 cursor-pointer sm:flex-wrap justify-center items-center">
                     {topFilters.map((filter, index) => {
                      return (
                      <div key={index}>
                         <p className="text-[#282C3F] text-sm  hover:bg-slate-200 rounded-lg px-3 py-2">
                            {filter.name}
                         </p>
                      </div>
                        );
                     })}
                  </div>
                   {
                    // because if 1st index is 0(i.e,false)to make true we added !=null
                    currentSelected !=null &&
                    <div className='dropdownFilters flex flex-wrap'>
                      {
                        topFilters[currentSelected].values.map((value,index)=>{
                            return(
                                <div onClick ={()=>{setCurrentSelected(index)}} 
                                    key={index} className='flex gap-1 items-center'>
                                    <input type="checkbox"/>
                                    <p className='text-[#8b8d95] cursor-pointer text-sm'>
                                       {value}
                                    </p>
                                </div>
                            )
                        })
                      }
                    </div>
                   }
                  <div className=" border flex items-center p-2">
                      <div className="">
                         <p className="text-[#282C3F] text-xs">Sort by:</p>
                      </div>
                      <div className="text-xs font-bold text-[#282c3e]">
                          <select className="rounded-lg focus:outline-none">
                             <option value="recommended">Recommended</option>
                             <option value="price">Price:High to Low</option>
                             <option value="price">Price:Low to High</option>
                             <option value="rating">Customer Rating</option>
                          </select>
                      </div>
                   </div>
               </div>
               <div className="bottomRightSection flex-[8] flex border-l border-t p-5">
                    <div className="cardContainer w-full flex">
                      <ProductCard
                         title={'H&M'}
                         description={'Pure Cotton Formal shirt'}
                         price={1999}
                         images={[
                         '/MensShirt.jpg',
                         '/MensShirt1.jpg',
                         '/MensShirt2.jpg',
                         ]}
                         rating={4.5}
                         likes="3.2k"
                       />
                   </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
}
