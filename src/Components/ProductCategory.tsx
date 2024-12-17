import React from "react";
import ProductCard from "./ProductCard";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import FilterComponents from "./FilterComponents";

type productDetailsProps = {
  productDetails: {
    title: string;
    description: string;
    price: number;
    images: string[];
    size?: number;
    rating: number;
    likes?: number;
  }[];
};

export default function ProductCategory({
  productDetails,
}: productDetailsProps) {
  //states
  const [currentSelected, setCurrentSelected] = React.useState<null | number>(
    null
  );

  //constants
  const topFilters = [
    {
      name: "Age",
      values: ["0-3", "3-6", "6-8", "8-12", "12-15", "15-17", "17-20"],
    },
    { name: "Buddles", values: ["Bundles", "Single Styles"] },
    { name: "Country of origin", values: ["Red", "Blue", "Green"] },
    { name: "Size", values: ["S", "M", "L", "XL"] },
  ];
  return (
    <div className="wrapper h-[88%]">
      <div className="w-[80%]  h-full mx-auto py-5 flex flex-col gap-4">
        {/* top section */}
        <div className="Container1 flex flex-col gap-4 pb-2 ">
          <div className="text-[#8b8d95] text-[0.9rem]">
            <p>
              Home/
              <span className="text-[#282c3f] font-bold">
                Kids Wear Online Store
              </span>
            </p>
          </div>
          <div className="text-[#282c3f] font-bold">
            Kids Wear Online Store -{" "}
            <span className="text-[#8b8d95] ">413233 items</span>
          </div>
        </div>

        {/* bottom section */}
        <div className="flex">
          {/* left section */}
          <div className="leftWrapper flex-[2] flex flex-col">
            {/* left section top */}
            <p className="text-md font-bold text-black p-3 flex-[0.5] ">
              Filter
            </p>
            {/* left section bottom */}
            <div className="filtersWrapper border-t border-r flex-[9.5]">
              {/* filtercomponents */}
              <FilterComponents
                title={"Categories"}
                filterValues={[
                  {
                    filterName: "T-shirts",
                    count: 100,
                  },
                  {
                    filterName: "Shirts",
                    count: 100,
                  },
                  {
                    filterName: "Trousers",
                    count: 100,
                  },
                  {
                    filterName: "Shorts",
                    count: 100,
                  },
                  {
                    filterName: "Dresses",
                    count: 100,
                  },
                ]}
                isMultiSelect={true}
                isSearchable={true}
              />
            </div>
          </div>

          {/* right section */}
          <div className="rightWrapper flex-[8]  flex flex-col gap-[11px]">
            {/* right section top */}
            <div className="flex flex-[0.5] justify-between ">
              <div className="flex flex-[4] justify-between items-center ">
                <div className="flex justify-between">
                  <div className="flex flex-[3] justify-between items-center ">
                    <div className="flex gap-3 justify-between items-center">
                      {topFilters.map((filter, index) => {
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
                              className={`text-[#8b8d95] text-sm ${currentSelected === index ? "bg-slate-200" : ""} font-bold cursor-pointer hover:bg-slate-200 flex gap-2 items-center rounded-lg px-3 py-1`}
                            >
                              {filter.name}
                              {currentSelected !== index ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-[3] justify-between ">
                    <div className="flex-[6] items-end">
                      <div className="flex gap-3 justify-end ">
                        <div className="wrapper border-[#d1d1d1] border flex items-center px-3">
                          <div>
                            <p className="text-[#8b8d95] text-sm">Sort By:</p>
                          </div>

                          <div>
                            <select className="  p-2 focus:outline-none text-sm rounded-lg">
                              <option value="newest">Recommended</option>
                              <option value="oldest">oldest</option>
                              <option value="price">price</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right section middle*/}
            {currentSelected != null && (
              <div className="dropdownfilters  pl-3 pb-4 grid lg:grid-cols-6 xl:grid-cols-9 ">
                {topFilters[currentSelected].values.map((value, index) => {
                  return (
                    <div key={index} className="flex gap-[0.5] items-center">
                      <input type="checkbox" />
                      <p className="text-[#8b8d95] cursor-pointer text-sm">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* right section bottom */}
            <div className="cardsWrapper flex-[9.5] w-full gap-5 p-5 flex border-t border-l">
              {/* map the product productDetails */}
              {productDetails.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    images={product.images}
                    size={product.size}
                    rating={product.rating}
                    likes={product.likes}
                  />
                );
              })}

              {/* <ProductCard */}
              {/* //   title={"H&M"}
              //   description={"Boys Teddy Hoody"}
              //   price={1999}
              //   images={["/product1.png", "/product2.png"]}
              //   rating={4.5}
              //   likes={4.4}
              // /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
