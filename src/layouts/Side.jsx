import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

import { menuItems } from "../components/data";
import { BiSolidDashboard } from "react-icons/bi";

const Side = ({ selectedMenuItem, handleSelectedMenu }) => {
  const [hoverTitle, setHoverTitle] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [submenu, setSubMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const removeSelected = () => {
    handleSelectedMenu(null);
  };

  const toggleSubmenu = (index) => {
    setSubMenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  console.log("selected: ", selectedMenuItem);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`h-screen  sticky top-0 transform transition-all duration-700 ease-in-out border-border-color border-r-[1.5px] w-[100px] z-[250] lg:w-[280px] ${
        isOpen ? "translate-x-0" : " "
      }`}
    >
      {/* Open & close Menu */}
      {/* <div
        className="text-white bg-slate-500 h-[50px] rounded-full flex justify-center items-center w-[50px] absolute top-6 -right-5 cursor-pointer hover:opacity-90 transition-all duration-300"
        onClick={toggle}
      >
        <span>
          {isOpen ? (
            <MdOutlineKeyboardArrowRight size="25px" />
          ) : (
            <MdOutlineKeyboardArrowLeft size="25px" />
          )}
        </span>
      </div> */}

      {/* USER ========== */}
      <div className="flex justify-start items-center my-12 pl-5 gap-2">
        <div className=" object-cover">
          <img
            src="../../public/pic-person-01.jpg"
            className="w-[60px] h-[60px] rounded-full "
          ></img>
        </div>
        <div className="hidden lg:block">
          <h1 className="font-medium text-navy-text  text-lg">Helen Darwin</h1>
          <p className="text-dark-grey text-sm font-normal">Sales Manager</p>
        </div>
      </div>
      <div className="flex z-[250] justify-center items-center border-border-color border-y-[1.5px] p-5 text-lg font-semibold ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "active-submenu flex gap-2 items-center"
              : "cursor-pointer flex gap-2 items-center"
          }
          onClick={() => removeSelected()}
        >
          <BiSolidDashboard size="25px" />
          <span className="hidden lg:block">Main Dashboard</span>
        </NavLink>
      </div>

      {/*  Main menu ======= */}
      <nav
        className={`${
          isOpen ? "mt-8" : "mt-14"
        }  text-main-text px-10 text-lg flex gap-6 flex-col`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverTitle(item.name)}
            onMouseLeave={() => setHoverTitle(null)}
          >
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `cursor-pointer pt-5 mx-3 rounded custom-hover-effect flex gap-7 items-center justify-center lg:justify-between ${
                  isActive
                    ? "active-submenu flex gap-2 items-center"
                    : "cursor-pointer flex gap-2 items-center"
                }`
              }
            >
              <div className="flex gap-7 items-center justify-start">
                <div className="">{item.icon}</div>
                <div
                  className={`hidden lg:block ${isOpen ? "block" : "hidden"}`}
                >
                  {item.name}
                </div>
              </div>
              {item.submenu && isOpen ? (
                <div className="hidden lg:flex justify-center items-center">
                  <span onClick={() => toggleSubmenu(index)} className="pr-5">
                    <RiArrowDropDownLine size="40px" />
                  </span>
                </div>
              ) : (
                ""
              )}
            </NavLink>
            <div className="relative">
              {hoverTitle === item.name && (
                <span className="lg:hidden w-fit p-1 text-center bg-white absolute left-[10px] text-main-navy top-[10px] shadow-lg drop-shadow-2xl rounded-md z-50">
                  {hoverTitle}
                </span>
              )}
            </div>

            {/* ========= sub menu ============ */}

            <div
              className={`flex submenu-wrapper border-border-color border-l-[1.5px] ml-6 ${
                submenu[index] ? "open" : ""
              } ${isOpen ? "block" : "hidden"}`}
            >
              {submenu[index] && item.submenu ? (
                <ul className="flex flex-col ml-4 gap-2 pt-5 ">
                  {item.submenu.map((item, index) => (
                    <li
                      key={index}
                      className=" hover:text-main-color hover:translate-x-1 duration-300 cursor-pointer text-base"
                    >
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-submenu" : ""
                        }
                        to={item.path}
                      >
                        • {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Side;
