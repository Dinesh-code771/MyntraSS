import React, { useEffect, useState } from "react";
import { IoIosClose} from "react-icons/io";
import { IoSearch } from 'react-icons/io5';

//API call fetching data
function fetchSuggestions(searchValue: string) {
  return fetch(`https://dummyjson.com/products/search?q=${searchValue}`).then(
    (res) => res.json()
  );
}
export default function SearchWithSuggestion() {

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);//the fetched data we store here
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    async function fetchData() { //its API call so we wrap in async-await
      const suggestions = await fetchSuggestions(searchValue);//whatEver data we fetched from API we are storing in "suggestions" 
      console.log(suggestions);
      setSuggestions(suggestions.products);
    }
    timeout = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);
  return (
    <div className="flex flex-col relative border gap-2  md:w-[50%] lg:w-[70%]
       xl:w-[35rem]  bg-[#f5f5f5] border-gray-200 px-3 py-1 rounded-md ">
      <div className="flex border-1 border-gray-400 items-center gap-2">
        <IoSearch size={20} color="gray"/>
        <input
          type="text"
          className="w-full bg-transparent px-3 py-1 text-small text-gray-800
            focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for products, categories..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <IoIosClose
          size={30}
          onClick={() => setSearchValue("")}
          className="cursor-pointer text-gray-600"
        />
      </div>
      {searchValue.length > 0 && isFocused && ( //display only when suggestion are there
        <div className="flex absolute top-10 p-5 w-full border text-gray-800 rounded-md shadow-md bg-white left-0 flex-col gap-2 max-h-[200px] overflow-y-auto">
          {suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              <div
                onClick={() => setSearchValue(suggestion.title)}
                className="text-sm hover:bg-gray-200 p-2 cursor-pointer"
                key={suggestion.id}
              >
                {suggestion.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}