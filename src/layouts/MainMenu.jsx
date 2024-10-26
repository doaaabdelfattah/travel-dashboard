import { NavLink } from "react-router-dom";
import { menuItems } from "../components/data";
import { useState } from "react";
import { IoDiamondSharp } from "react-icons/io5";
const MainMenu = ({ onSelectMenuItem }) => {
  const [hoverTitle, setHoverTitle] = useState("");

  return (
    <div className="h-screen text-dark-grey sticky top-0 w-[70px] bg-[#FBFBFC] z-[200] ">
      {/* ======== Logo ==== */}
      <div className="flex justify-center items-center my-20">
        <IoDiamondSharp size="40px" color="#4d6e9b" />
      </div>
      {/* Menu Icons */}
      <div className="mt-[70px] menu-item flex-col justify-center items-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="py-5 relative flex justify-center items-center  hover:text-main-color cursor-pointer rounded-md "
            onMouseEnter={() => setHoverTitle(item.name)}
            onMouseLeave={() => setHoverTitle(null)}
            onClick={() => onSelectMenuItem(item)}
          >
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "active-menu flex items-center" : "cursor-pointer"
              }
              // title={item.name}
            >
              {item.icon}
            </NavLink>
            <div className="relative">
              {hoverTitle === item.name && (
                <span className="w-fit p-1 text-center bg-white absolute left-[10px] text-main-color top-[10px] shadow-lg drop-shadow-2xl rounded-md">
                  {hoverTitle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
