import { useLocation } from "react-router-dom";
import PrimaryHeader from "../../components/shared/PrimaryHeader";
import AddNewRide from "./AddNewRide";

const ManageServices = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="wrapper">
      <PrimaryHeader>{state?.name} service</PrimaryHeader>
      <div>
        <h2 className="text-3xl font-semibold py-5 mt-5">Add new Ride</h2>
        <AddNewRide />
      </div>
    </div>
  );
};

export default ManageServices;
