import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRides } from "../../redux/reducers/airBalloonRidesSlice";
import RideCard from "./RideCard";

const AllRides = () => {
  const dispatch = useDispatch();
  const { rides } = useSelector((state) => state.rides);
  console.log("rides: ", rides);

  useEffect(() => {
    dispatch(fetchRides());
  }, [dispatch]);
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {rides.map((item, index) => (
        <RideCard ride={item} key={item.id} />
      ))}
    </div>
  );
};

export default AllRides;
