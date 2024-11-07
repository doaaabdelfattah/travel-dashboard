import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearInput = () => {
    setSearchValue("");
    onSearch(""); // Optionally, reset the search state
  };

  return (
    <div className="my-5 w-full rounded-md bg-white shadow-sm flex items-center justify-center h-[70px]">
      <div className="relative py-4 px-2 w-full">
        <FiSearch
          className="absolute top-[36px] left-[20px] transform -translate-y-1/2 text-dark-grey"
          size="20px"
        />

        <input
          className="p-2 pl-10 w-full border-dark-grey outline-none border-[1.5px] bg-white rounded-sm"
          placeholder="Search for any item . . ."
          value={searchValue}
          onChange={handleInputChange}
        />

        {searchValue && (
          <FiX
            className="absolute top-[36px] right-[20px] transform -translate-y-1/2 text-dark-grey cursor-pointer"
            size="20px"
            onClick={handleClearInput}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
