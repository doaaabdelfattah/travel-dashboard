import { Outlet } from "react-router-dom";
import Side from "./Side";
// import MainMenu from "./MainMenu";
import { useState } from "react";

const Root = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleSelectedMenu = (menuItem) => {
    setSelectedMenu(menuItem);
  };
  return (
    <>
      <div className="flex ">
        {/* <MainMenu onSelectMenuItem={handleSelectedMenu} /> */}
        <Side
          selectedMenuItem={selectedMenu}
          handleSelected={handleSelectedMenu}
        />
        <div className="flex-1 bg-main-grey">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
