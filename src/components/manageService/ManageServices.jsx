import { Outlet, useParams } from "react-router-dom";
import PrimaryHeader from "../shared/PrimaryHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchServices,
  servicesCleanUp,
} from "../../redux/reducers/servicesSlice";
import { useEffect } from "react";
import BreadCrumb from "../shared/BreadCrumb"; // Import the BreadCrumb component
import Tabs from "./Tabs";

const ManageServices = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  let { serviceId } = useParams();

  useEffect(() => {
    dispatch(fetchServices());
    return () => {
      dispatch(servicesCleanUp());
    };
  }, [dispatch]);

  const selectedService = services.find((ser) => ser._id === serviceId);

  return (
    <div className="wrapper">
      <PrimaryHeader>Service Management</PrimaryHeader>

      <div className="m-6">
        <BreadCrumb services={services} />
      </div>

      <div className="my-8">
        <Tabs serviceId={serviceId} />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageServices;
