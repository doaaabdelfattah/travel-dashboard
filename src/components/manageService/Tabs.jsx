import React from "react";
import { NavLink } from "react-router-dom";
import { BiCube } from "react-icons/bi";
import { LuPlusCircle } from "react-icons/lu";
import { RiCalendarScheduleLine } from "react-icons/ri";

const Tabs = ({ serviceId }) => {
  return (
    <div className="bg-white p-5">
      <ul className=" p-1 font-medium text-lg flex items-center gap-3">
        <li className="flex items-center">
          <NavLink
            to={`/services/${serviceId}/`}
            end
            className={({ isActive }) =>
              `p-4 flex items-center gap-2 ${
                isActive
                  ? "text-main-color bg-main-light/20 rounded-md"
                  : "hover:text-main-dark"
              }`
            }
          >
            <BiCube />
            All rides
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink
            to={`/services/${serviceId}/add`}
            className={({ isActive }) =>
              `p-4 flex items-center gap-2 ${
                isActive
                  ? "text-main-color bg-main-light/20 rounded-md"
                  : "hover:text-main-dark"
              }`
            }
          >
            <LuPlusCircle />
            add new ride
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink
            to={`/services/${serviceId}/schedule`}
            className={({ isActive }) =>
              `p-4 flex items-center gap-2 ${
                isActive
                  ? "text-main-color bg-main-light/20 rounded-md"
                  : "hover:text-main-dark"
              }`
            }
          >
            <RiCalendarScheduleLine />
            Ride Schedules
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
