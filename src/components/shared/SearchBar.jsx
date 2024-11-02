import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div className="my-5 w-full rounded-md bg-white shadow-sm flex items-center justify-center  h-[70px]">
      <div className="relative py-4 px-2 w-full">
        <div>
          <FiSearch
            className="absolute top-[36px] left-[20px] transform -translate-y-1/2 text-dark-grey"
            size="20px"
          />
        </div>

        <input
          className="p-2 pl-10 w-full border-dark-grey outline-none border-[1.5px] bg-white rounded-sm "
          placeholder="Search for any item . . ."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
