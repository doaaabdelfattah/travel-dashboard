import DataTable from "../components/shared/Table/DataTable";
import { UsersTableHeader } from "../components/shared/Table/TableHeaders";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/reducers/usersSlice";
import PrimaryHeader from "../components/shared/PrimaryHeader";
import SecondaryHeader from "../components/shared/SecondaryHeader";
const Customers = () => {
  // const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.users);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);
  // const userRender = (item, key) => {
  //   if (key === "isAdmin") {
  //     if (item.isAdmin) {
  //       return <p> User is Admin</p>;
  //     }
  //     return <p>Not Admin</p>;
  //   }
  //   return item[key];
  // };
  return (
    <div className="wrapper">
      {/* Header */}
      <PrimaryHeader>Customers</PrimaryHeader>
      <div>
        <SecondaryHeader>All users</SecondaryHeader>
        {/* <DataTable
          inputData={users}
          header={UsersTableHeader}
          itemRender={userRender}
          itemsPerPage={10}
        /> */}
      </div>
    </div>
  );
};

export default Customers;
