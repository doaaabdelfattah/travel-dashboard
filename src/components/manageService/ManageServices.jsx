import { Outlet, useLocation, useParams } from "react-router-dom";
import PrimaryHeader from "../shared/PrimaryHeader";
import AddNewRide from "./AddNewRide";
import Tabs from "./Tabs";

const ManageServices = () => {
  const location = useLocation();
  const { state } = location;
  let { id } = useParams();

  return (
    <div className="wrapper">
      <PrimaryHeader>Service Management</PrimaryHeader>
      <div className="my-8">
        <Tabs id={id} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageServices;
