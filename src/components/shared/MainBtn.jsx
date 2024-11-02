import React from "react";

const MainBtn = ({ children, handleOnClick, marginTop }) => {
  return (
    <button
      className={`p-4  ${marginTop} text-lg h-full text-white bg-main-color hover:bg-black hover:text-white duration-300 transition-all capitalize`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default MainBtn;
