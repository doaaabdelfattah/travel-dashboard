import PageHeader from "../components/shared/PageHeader";
import DataTable from "../components/shared/Table/DataTable";
import { UsersTableHeader } from "../components/shared/Table/TableHeaders";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/reducers/usersSlice";
const Customers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const userRender = (item, key) => {
    if (key === "isAdmin") {
      if (item.isAdmin) {
        return <p> User is Admin</p>;
      }
      return <p>Not Admin</p>;
    }
    return item[key];
  };
  return (
    <div className="wrapper">
      {/* Header */}
      <PageHeader header={"Customers"} />
      <div>
        <h2 className="text-3xl font-semibold py-3">All users</h2>
        <DataTable
          inputData={users}
          header={UsersTableHeader}
          itemRender={userRender}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default Customers;
