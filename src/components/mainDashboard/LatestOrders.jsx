import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/reducers/OrderSlice";
import { fetchUsers } from "../../redux/reducers/usersSlice";
import { fetchServices } from "../../redux/reducers/servicesSlice";
import { fetchRides } from "../../redux/reducers/airBalloonRidesSlice";
const LatestOrders = () => {
  const dispatch = useDispatch();
  const { orders, loadingOrders } = useSelector((state) => state.orders);
  // const { users, loadingUsers } = useSelector((state) => state.users);
  const { rides, loadingRides } = useSelector((state) => state.rides);

  useEffect(() => {
    dispatch(fetchOrders());
    // dispatch(fetchUsers());
    dispatch(fetchRides());
  }, [dispatch]);

  // Function to find user details by userId
  // const getUserById = (userId) => {
  //   return users.find((user) => user._id === userId) || null;
  // };
  // Sort orders by orderDate in descending order (most recent first)
  const sortedOrders = orders
    .slice() // Create a copy of the array to avoid mutating the original
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sorting based on date

  // console.log("orders: ", orders);

  console.log("rides: ", rides);
  console.log("loading status: ", loadingRides);

  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold py-3">Recent Orders</h1>
        <Link className="underline py-3 hover:text-main-color" to="/orders">
          Check all orders
        </Link>
      </div>
      <table className="table-fixed w-full ">
        <thead>
          <tr className="font-semibold p-3 border-b-2 bg-dark-grey/30 border-dark-grey ">
            <th className="px-2 py-4 text-left w-[20%]">Order Id</th>
            <th className="px-2 py-4  text-left w-[20%]">Date</th>
            <th className="px-2 py-4  text-left ">Customer</th>
            <th className="px-2 py-4  text-left">Trip</th>
            <th className="px-2 py-4  text-left">Amount £</th>
            <th className="px-2 py-4  text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.slice(0, 5).map((item) => {
            // const user = getUserById(item.user);
            return (
              <tr
                className="border-b border-dark-grey hover:bg-dark-grey/10"
                key={item._id}
              >
                <td className="p-2 hover:text-main-color">
                  {" "}
                  <Link to="/orders/">{item.orderNumber}</Link>
                </td>
                <td className="p-2 text-sm flex flex-col">
                  {/* Format Date */}
                  <span>
                    {new Date(item.orderDate).toLocaleDateString("en-GB", {
                      // weekday: "long", // "Monday"
                      year: "numeric", // "2024"
                      month: "short", // "October"
                      day: "numeric", // "23"
                    })}
                  </span>

                  {/* Format Time */}
                  <span>
                    {new Date(item.orderDate).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      // second: "2-digit",
                      hour12: true, // AM/PM format
                    })}
                  </span>
                </td>
                <td className="p-2 hover:text-main-color ">
                  <Link to={`/customers/`}>{item.user.name}</Link>
                </td>
                <td className="p-2">AirBallon</td>
                <td className="p-2">{item.total}£</td>
                <td className="p-2">
                  <span className="text-yellow bg-yellow-200 p-1 rounded-md text-sm">
                    Pending
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestOrders;
