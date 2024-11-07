import { useSelector, useDispatch } from "react-redux";
import {
  fetchServices,
  deleteService,
  servicesCleanUp,
} from "../../redux/reducers/servicesSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import Popup from "../shared/PopUp";

const AllServices = () => {
  const dispatch = useDispatch();
  const [deletePop, setDeletePop] = useState(null);
  const openPopUp = (id) => setDeletePop(id);
  const closePopup = () => setDeletePop(null);

  const { services, loadingServices } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
    return () => {
      dispatch(servicesCleanUp());
    };
  }, [dispatch]);

  const handleDelete = async (id) => {
    // Dispatch delete action and close popup on success
    const result = await dispatch(deleteService(id));
    if (result.meta.requestStatus === "fulfilled") {
      closePopup();
    } else {
      console.error("Failed to delete service");
    }
  };
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, _) => (
        <div
          className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg hover:scale-[1.02] cursor-pointer duration-500"
          key={service._id}
        >
          <img
            alt=""
            src={service.imageUrl}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div className="p-4 sm:p-6">
              <Link
                to={`/services/${service._id}`}
                state={{
                  name: service.name,
                }}
              >
                <h3 className="mt-0.5 text-3xl capitalize font-semibold text-white hover:text-main-color">
                  {service.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-md/relaxed text-white/95">
                  {service.description}
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </Link>
              <div
                className="absolute z-50 text-white top-4 hover:text-red-500 cursor-pointer right-4"
                onClick={() => openPopUp(service._id)}
              >
                <ImBin size={"20px"} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {deletePop && (
        <Popup
          id={deletePop}
          onClose={closePopup}
          data={services}
          loadingData={loadingServices}
          clickFunc={() => handleDelete(deletePop)}
        />
      )}
    </div>
  );
};

export default AllServices;
