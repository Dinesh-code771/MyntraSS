import React from "react";
import ProductCard from "./ProductCard";

export default function ProductCategory() {
  const topFilters = [
    { name: "Age" },
    { name: "Buddles" },
    { name: "Country of origin" },
    { name: "Size" },
  ];
  return (
    <div className="wrapper h-[88%]">
      <div className="w-[80%] border-2 h-full mx-auto py-5">
        <div className="Container1 flex flex-col gap-4 pb-2 border-b">
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

          <div className="flex justify-between">
            <div className="flex flex-[3] justify-between items-center ">
              <div>
                <p className="font-bold text-black text-md uppercase">
                  Filters
                </p>
              </div>
              <div className="flex gap-3 justify-between items-center">
                {topFilters.map((filter, index) => {
                  return (
                    <div key={index}>
                      <p className="text-[#8b8d95] text-sm  font-bold cursor-pointer hover:bg-slate-200 rounded-lg px-3 py-2">
                        {filter.name}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <div className="flex flex-[3] justify-between ">
                  <div className="flex-[7] items-end">
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
        </div>

        <div className="flex">
          <div className="leftWrapper flex-[2]"></div>
          <div className="rightWrapper flex-[8] p-5  grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 auto-cols-auto">
            <ProductCard
              title={"H&M"}
              description={"Boys Teddy Hoody"}
              price={1999}
              images={["/product1.png", "/product2.png"]}
              rating={4.5}
              likes={4.4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
