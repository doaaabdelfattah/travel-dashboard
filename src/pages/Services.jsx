import SecondaryHeader from "../components/shared/SecondaryHeader";
import AllServices from "../components/services/AllServices";
import AddNewService from "../components/services/AddNewService";
import PrimaryHeader from "../components/shared/PrimaryHeader";
import { IoMdAddCircleOutline } from "react-icons/io";

const Services = () => {
  return (
    <div className="wrapper">
      <PrimaryHeader>Services</PrimaryHeader>
      <div className="mt-8">
        <SecondaryHeader>All Services</SecondaryHeader>
        <AllServices />
      </div>
      <div className="my-8 bg-white p-4">
        <SecondaryHeader>
          <IoMdAddCircleOutline />
          Add new Service
        </SecondaryHeader>
        <AddNewService />
      </div>
    </div>
  );
};

export default Services;
