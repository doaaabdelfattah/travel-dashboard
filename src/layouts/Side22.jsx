import { NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

const Side = ({ selectedMenuItem, handleSelectedMenu }) => {
  const removeSelected = () => {
    handleSelectedMenu(null);
  };
  console.log("selected: ", selectedMenuItem);
  return (
    <header className="h-screen sticky top-0 transform transition-all duration-700 ease-in-out border-border-color border-r-[1.5px] w-[250px]">
      <div className="flex justify-start items-center my-12 pl-5 gap-2">
        <div className=" object-cover">
          <img
            src="../../public/pic-person-01.jpg"
            className="w-[60px] h-[60px] rounded-full "
          ></img>
        </div>
        <div>
          <h1 className="font-medium text-navy-text  text-lg">Helen Darwin</h1>
          <p className="text-dark-grey text-sm font-normal">Sales Manager</p>
        </div>
      </div>
      <div className="flex justify-center items-center border-border-color border-y-[1.5px] p-5 text-lg font-semibold ">
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
          <span>Main Dashboard</span>
        </NavLink>
      </div>
      <div className="px-4">
        <h1 className="font-bold text-lg text-navy-text my-5">
          {selectedMenuItem?.name}
        </h1>
        {selectedMenuItem &&
          Array.isArray(selectedMenuItem.submenu) &&
          selectedMenuItem.submenu.length > 0 && (
            <ul>
              {selectedMenuItem.submenu.map((subItem, index) => (
                <div key={index} className="pl-3 hover:bg-main-grey ">
                  <li className="py-4  text-grey-text hover:text-main-navy cursor-pointer ">
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        isActive
                          ? "active-submenu flex items-center"
                          : "cursor-pointer"
                      }
                    >
                      {subItem.name}
                    </NavLink>
                  </li>
                </div>
              ))}
            </ul>
          )}
      </div>
    </header>
  );
};

export default Side;
