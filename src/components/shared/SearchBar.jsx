import React from "react";
import { FiSearch } from "react-icons/fi";
import MainBtn from "./MainBtn";
const SearchBar = () => {
  return (
    <div className="w-full bg-main-grey rounded-sm flex items-center gap-5 h-[70px]">
      <div className="relative py-4 px-2 w-8/12">
        <span>
          <FiSearch
            className="absolute top-[50px] left-7 transform -translate-y-1/2 text-gray-400"
            size="20px"
          />
        </span>
        <input
          className="m-3 p-2 pl-10 w-full border-dark-grey outline-none border-2 bg-white rounded-sm "
          placeholder="Search for any item..."
        />
      </div>
      <MainBtn />
    </div>
  );
};

export default SearchBar;
