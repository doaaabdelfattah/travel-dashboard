import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/reducers/OrderSlice";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "orderNumber", headerName: "Order Number", width: 130 },
  { field: "customerName", headerName: "Customer", width: 130 },
  { field: "total", headerName: "Amount", type: "number", width: 90 },
  {
    field: "orderDate",
    headerName: "Date",
    width: 160,
    // type: "date",
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];

export default function DataTable() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Map the orders data to match the DataGrid row structure
  const rows = orders.map((order, index) => ({
    id: index + 1, // Assign unique id (if you don't have one)
    orderNumber: order.orderNumber,
    customerName: order.user.name || "Unknown", // Replace with real customer data if available
    total: order.total,
    orderDate: order.orderDate,
    status: order.status,
  }));

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
