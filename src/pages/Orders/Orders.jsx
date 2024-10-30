import { useDispatch } from "react-redux";
import AllOrders from "../../components/orders/allOrders";
import DataTable from "../../components/shared/Table/DataTable";
import PageHeader from "../../components/shared/PageHeader";
import SearchBar from "../../components/shared/SearchBar";
import {
  OrdersTableHeader,
  UsersTableHeader,
} from "../../components/shared/Table/TableHeaders";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/reducers/OrderSlice";
import ItemStatus from "../../assets/ItemStatus";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../redux/reducers/usersSlice";
const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="bg-main-grey">
      <div className="wrapper">
        <PageHeader header={"Orders"} />
        <SearchBar />
        <AllOrders />
      </div>
    </div>
  );
};

export default Orders;
