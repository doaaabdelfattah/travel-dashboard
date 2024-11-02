import { useDispatch } from "react-redux";
import AllOrders from "../../components/orders/allOrders";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/reducers/OrderSlice";

import PrimaryHeader from "../../components/shared/PrimaryHeader";
const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <PrimaryHeader>Orders</PrimaryHeader>
      <AllOrders />
    </div>
  );
};

export default Orders;
