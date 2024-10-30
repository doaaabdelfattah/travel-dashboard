import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/reducers/OrderSlice";
import { fetchUsers } from "../../redux/reducers/usersSlice";
import DataTable from "../shared/Table/DataTable";
import ItemStatus from "../../assets/ItemStatus";

import { OrdersTableHeader } from "../shared/Table/TableHeaders";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orderRenderer = (item, key) => {
    if (key === "orderNumber") {
      return (
        <Link to={`/orders/${item._id}`} className="hover:text-main-color">
          {" "}
          {item.orderNumber}
        </Link>
      );
    }
    if (key === "orderDate") {
      return (
        <div className="flex flex-col">
          <span>
            {new Date(item.orderDate).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <span>
            {new Date(item.orderDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // AM/PM format
            })}
          </span>
        </div>
      );
    }
    if (key === "user") {
      return (
        <Link
          className="hover:text-main-color"
          to={`/customers/${item.user._id}`}
        >
          {item.user.name}
        </Link>
      );
    }
    if (key === "trips") {
      return (
        <Link to={`/orders/${item._id}`} className="hover:text-main-color">
          {item.cart.items[0].service.name} ...{" "}
        </Link>
      );
    }
    if (key === "status") {
      return <ItemStatus inputStatus={item.status} />;
    }
    return item[key] ? item[key] : "N/A"; // Safely handle missing or undefine values
  };
  return (
    <div className="mt-5 bg-white p-4 shadow-sm rounded-md ">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold py-3">All Orders</h2>
      </div>
      <DataTable
        inputData={orders}
        header={OrdersTableHeader}
        itemRender={orderRenderer}
        itemsPerPage={10}
      />
    </div>
  );
};

export default AllOrders;
