import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRides } from "../../redux/reducers/airBalloonRidesSlice";
import { fetchServices } from "../../redux/reducers/servicesSlice";

const BreadCrumb = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { serviceId, rideId } = useParams();

  const { services } = useSelector((state) => state.services);
  const { rides } = useSelector((state) => state.rides);

  const [serviceName, setServiceName] = useState("");
  const [rideName, setRideName] = useState("");

  useEffect(() => {
    if (!services.length) dispatch(fetchServices());
    if (!rides.length) dispatch(fetchRides());
  }, [dispatch, services.length, rides.length]);

  // Fetch service name based on serviceId
  useEffect(() => {
    if (serviceId && services.length) {
      const service = services.find((service) => service._id === serviceId);
      if (service) setServiceName(service.name);
    }
  }, [serviceId, services]);

  // Fetch ride name based on rideId
  useEffect(() => {
    if (rideId && rides.length) {
      const ride = rides.find((ride) => ride._id === rideId);
      if (ride) setRideName(ride.title);
    }
  }, [rideId, rides]);

  // Split the pathname into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Map path segments to breadcrumb links
  const breadcrumbLinks = pathSegments.map((segment, index) => {
    let name = segment;

    // Replace segment values if they match serviceId or rideId
    if (segment === serviceId) name = serviceName || "Loading service...";
    if (segment === rideId) name = rideName || "Loading ride...";

    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    return { name, href };
  });
  // Inserts new elements at the start of an array
  breadcrumbLinks.unshift({ name: "Home", href: "/" });

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-md text-gray-600">
          {breadcrumbLinks.map((link, index) => (
            <React.Fragment key={index}>
              <li>
                <a
                  href={link.href}
                  className="block transition hover:text-gray-700"
                >
                  <span className="sr-only">{link.name}</span>
                  {index === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  ) : (
                    <span>{link.name}</span>
                  )}
                </a>
              </li>
              {index < breadcrumbLinks.length - 1 && (
                <li className="rtl:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
