import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers";
import DashboardMain from "../pages/DashboardMain";
import Services from "../pages/Services";
import Promotions from "../pages/Promotions";
// import AllServices from "../pages/services/AllServices";
import ManageServices from "../components/manageService/ManageServices";
import OrderDetails from "../components/orders/OrderDetails";
import CustomersDetails from "../components/customers/CustomersDetails";
import AllRides from "../components/manageService/AllRides";
import AddNewRide from "../components/manageService/AddNewRide";
import RideSchedule from "../components/manageService/RideSchedule";
import RideDetails from "../components/manageService/RideDetails";

export const allRoutes = [
  { path: "/", element: <DashboardMain /> },

  // Services Paths ============
  { path: "/services", element: <Services /> },

  // ====== Detailed Service
  {
    path: "/services/:serviceId",
    element: <ManageServices />,
    children: [
      { index: true, element: <AllRides /> }, // Default route for /services/:id
      // { path: "all", element: <AllRides /> }, // Explicitly set the path as well
      { path: "add", element: <AddNewRide /> },
      { path: ":rideId", element: <RideDetails /> },
      { path: "schedule", element: <RideSchedule /> },
    ],
  },

  // Orders Paths ============
  { path: "/orders", element: <Orders /> },
  { path: "/orders/:id", element: <OrderDetails /> },

  // Customers Paths ============
  { path: "/customers", element: <Customers /> },
  { path: "/customers/:id", element: <CustomersDetails /> },

  // Promotions Paths ============
  { path: "/promotions", element: <Promotions /> },
];
