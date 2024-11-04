export const OrdersTableHeader = [
  { id: 1, KEY: "orderNumber", LABEL: "Order Id", hiddenOnSmall: false }, // Changed to match actual data field
  { id: 2, KEY: "orderDate", LABEL: "Date", hiddenOnSmall: true },
  { id: 3, KEY: "user", LABEL: "Customer", hiddenOnSmall: false },
  // { id: 4, KEY: "trips", LABEL: "Trips", hiddenOnSmall: false },
  { id: 5, KEY: "total", LABEL: "Amount £", hiddenOnSmall: false },
  { id: 6, KEY: "paymentMethod", LABEL: "Payment Method", hiddenOnSmall: true },
  { id: 7, KEY: "status", LABEL: "Status", hiddenOnSmall: false },
];

export const UsersTableHeader = [
  { id: 1, KEY: "name", LABEL: "Name", hiddenOnSmall: false },
  { id: 2, KEY: "email", LABEL: "Email", hiddenOnSmall: false },
  { id: 2, KEY: "isAdmin", LABEL: "Admin", hiddenOnSmall: true },
];
export const ServicesTableHeader = [
  { id: 1, KEY: "name", LABEL: "Name", hiddenOnSmall: false },
  { id: 2, KEY: "description", LABEL: "Description", hiddenOnSmall: false },
];
