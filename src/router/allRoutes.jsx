import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import DashboardMain from "../pages/DashboardMain";
import Services from "../pages/Services";
import Promotions from "../pages/Promotions";
import AllServices from "../pages/services/AllServices";
import ManageServices from "../pages/services/ManageServices";

export const allRoutes = [
  { path: "/", element: <DashboardMain /> },

  // Services Paths ============
  { path: "/services", element: <Services /> },
  { path: "/services/all", element: <AllServices /> },
  { path: "/services/manage", element: <ManageServices /> },

  // Orders Paths ============
  { path: "/orders", element: <Orders /> },

  // Customers Paths ============
  { path: "/customers", element: <Customers /> },

  // Promotions Paths ============
  { path: "/promotions", element: <Promotions /> },
];
