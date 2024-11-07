import React from "react";
import { useParams } from "react-router-dom";

const RideDetails = () => {
  const { rideId } = useParams();
  console.log("rideid: ", rideId);
  return (
    <div>
      <h1>{rideId}</h1>
    </div>
  );
};

export default RideDetails;
