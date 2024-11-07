import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRideByServiceID } from "../../redux/reducers/airBalloonRidesSlice";

import RideCard from "./RideCard";
import SearchBar from "../shared/SearchBar";
import { useParams } from "react-router-dom";

const AllRides = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedRides, loadingSelectedRides } = useSelector(
    (state) => state.rides
  );
  const { currency } = useSelector((state) => state.currency);

  let { serviceId } = useParams();

  useEffect(() => {
    dispatch(fetchRideByServiceID(serviceId));
  }, [dispatch, serviceId]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filter orders based on the search term
  const filteredRides = selectedRides.filter(
    (ride) =>
      ride.title.toLowerCase().includes(searchTerm) ||
      ride.description.toLowerCase().includes(searchTerm)
  );
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {filteredRides.length === 0 ? (
          loadingSelectedRides === "loading" ? (
            <div className="loader m-8"> </div>
          ) : (
            <p className="p-6 text-lg">No Rides Available !</p>
          )
        ) : (
          filteredRides.map((item, index) => (
            <RideCard
              ride={item}
              currency={currency}
              serviceId={serviceId}
              key={index}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AllRides;
