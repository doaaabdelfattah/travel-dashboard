import { IoCart } from "react-icons/io5";
import { IoCubeSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";

// ======== Submenus
export const menuItems = [
  {
    name: "Services",
    path: "/services",
    icon: <IoCubeSharp size="25px" />,
    submenu: false,
    // submenu: [
    //    { name: "All Services", path: "/services/all/" },
    //    { name: "Manage services", path: "/services/manage/" },
    // ],
  },

  {
    name: "Orders",
    path: "/orders",
    icon: <IoCart size="25px" />,
    submenu: false,
  },

  {
    name: "Customers",
    path: "/customers",
    icon: <FaUsers size="25px" />,
    submenu: false,
  },
  {
    name: "Promotions",
    path: "/promotions",
    icon: <MdDiscount size="25px" />,
    submenu: false,
  },
];
