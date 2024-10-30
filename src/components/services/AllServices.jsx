import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/reducers/servicesSlice";
import { useEffect } from "react";
import DataTable from "../shared/Table/DataTable";
import { ServicesTableHeader } from "../shared/Table/TableHeaders";

const AllServices = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  console.log("service: ", services);
  return (
    <div className="wrapper">
      <h2 className="text-3xl font-semibold py-5 mt-5">All Services</h2>
      <div>
        <DataTable
          inputData={services}
          header={ServicesTableHeader}
          // itemRender={orderRenderer}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default AllServices;
