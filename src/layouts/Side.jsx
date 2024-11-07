import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { CgToggleSquare } from "react-icons/cg";

import { menuItems } from "../router/menuItems";
import { BiSolidDashboard } from "react-icons/bi";

const Side = ({ selectedMenuItem, handleSelectedMenu }) => {
  const [hoverTitle, setHoverTitle] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [submenu, setSubMenu] = useState(false);

  const removeSelected = () => {
    handleSelectedMenu(null);
  };

  const toggleSubmenu = (index) => {
    setSubMenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // console.log("selected: ", selectedMenuItem);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header
      className={`h-screen  sticky top-0 transform transition-all duration-700 ease-in-out flex justify-between flex-col border-border-color border-r-[1.5px] z-[250] ${
        isOpen ? "w-[240px]" : "w-[100px]"
      }`}
    >
      <div>
        <div
          onClick={() => toggleSidebar()}
          className="flex justify-end m-4 cursor-pointer hover:text-main-color"
        >
          <CgToggleSquare size={"30px"} />
        </div>

        <div className="flex justify-center items-center lg:flex-nowrap flex-wrap mb-10  gap-5">
          <div className=" object-cover">
            <img
              src="../../public/pic-person-01.jpg"
              className="w-[60px] h-[60px] rounded-full "
            ></img>
          </div>
          <div className={` ${isOpen ? "lg:block" : "lg:hidden hidden"}`}>
            <h1 className="font-medium text-navy-text  text-lg">
              Helen Darwin
            </h1>
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
            <span className={`${isOpen ? "block" : "hidden"}`}>
              Main Dashboard
            </span>
          </NavLink>
        </div>

        {/*  Main menu ======= */}
        <nav
          className={`${
            isOpen ? "mt-8" : "mt-14 items-center"
          }  text-main-text px-10 text-lg flex justify-center  gap-6 flex-col`}
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
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
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
                className={`lg:flex hidden  submenu-wrapper border-border-color border-l-[1.5px] ml-6 ${
                  submenu[index] ? "open" : ""
                } ${isOpen ? "block" : "hidden"}  `}
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
      </div>
      {/* USER ========== */}
      <div className=" hover:text-main-color flex justify-center p-5 items-center cursor-pointer gap-2 my-8">
        <span className={`${isOpen ? "" : "hidden"}`}>Sign out</span>
        <VscSignOut size={"25px"} />
      </div>
    </header>
  );
};

export default Side;
