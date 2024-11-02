import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/reducers/servicesSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AllServices = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  // console.log("service: ", services);
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, index) => (
        <div
          className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg hover:scale-[1.02] cursor-pointer duration-500"
          key={service._id}
        >
          <img
            alt=""
            src="../../public/iStock-1623610947.jpg"
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllServices;
