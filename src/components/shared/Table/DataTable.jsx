import { useState } from "react";
import Caret from "../../../assets/Caret";
// Input: header: array of objects
//
const DataTable = ({ header, inputData, itemRender, itemsPerPage = 10 }) => {
  // ============ Sorting State =============
  const [sort, setSort] = useState({
    keyToSort: "orderDate", // Default sort by date
    direction: "des", // Default direction
  });

  // ============ Pagination State =============
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  // Sorting Function ==============================
  const getSortedArray = (inputData) => {
    const dataCopy = [...inputData];
    if (sort.direction === "asc") {
      return dataCopy.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      );
    }
    return dataCopy.sort((a, b) =>
      a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
    );
  };

  // ======= Pagination Logic ==============
  const indexOfLastData = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastData - itemsPerPage;
  const sortedData = getSortedArray(inputData);
  const currentData = sortedData.slice(indexOfFirstOrder, indexOfLastData);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // ========= Pagination Functions =======
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // ============ Handle Sorting Functions ===============
  const handleHeaderClick = (header) => {
    setSort({
      keyToSort: header.KEY,
      direction:
        header.KEY === sort.keyToSort
          ? sort.direction === "asc"
            ? "des"
            : "asc"
          : "asc",
    });
  };

  return (
    <div>
      <table className="table-fixed w-full ">
        <thead>
          <tr className="font-semibold p-3 bg-black/80 text-white border-y-2 border-dark-grey ">
            {header.map((header, index) => (
              <th
                className={`px-2 py-4 text-left cursor-pointer ${
                  header.hiddenOnSmall ? "hidden sm:table-cell" : ""
                }`}
                key={index}
                onClick={() => handleHeaderClick(header)}
              >
                <div className="w-full h-full flex items-center justify-between pr-5">
                  {header.LABEL}
                  {header.KEY === sort.keyToSort && (
                    <span className="cursor-pointer">
                      <Caret
                        direction={
                          sort.keyToSort === header.KEY ? sort.direction : "asc"
                        }
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              className="border-b border-dark-grey hover:bg-main-color/10"
              key={item._id || index}
            >
              {header.map((col, colIndex) => (
                <td
                  className={`p-2 ${
                    col.hiddenOnSmall ? "hidden sm:table-cell" : ""
                  }`}
                  key={colIndex}
                >
                  {itemRender
                    ? itemRender(item, col.KEY)
                    : typeof item[col.KEY] === "object" &&
                      item[col.KEY] !== null
                    ? JSON.stringify(item[col.KEY]) // or access specific fields like item[col.KEY].name
                    : item[col.KEY] !== undefined
                    ? item[col.KEY]
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* ========== Pagination Control ====== */}
      <div className="mt-4 flex gap-3 items-center justify-end">
        <button
          onClick={handlePrevPage}
          className="bg-dark-grey text-white rounded-md py-2 px-4"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-dark-grey text-white rounded-md py-2 px-4"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
