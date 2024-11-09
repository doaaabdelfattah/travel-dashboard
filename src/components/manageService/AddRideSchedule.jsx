import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRideByServiceID } from "../../redux/reducers/airBalloonRidesSlice";
import { useParams } from "react-router-dom";

const AddRideSchedule = () => {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const { selectedRides, loadingSelectedRides } = useSelector(
    (state) => state.rides
  );
  const [schedule, setSchedule] = useState({
    balloonRide: "",
    date: "",
    day: "",
    startTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    endTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    timeZone: "",
    totalSeats: 0, // Will be set from BalloonRide.seatsAvailable
    bookedSeats: 0, // Track booked seats over time
  });

  useEffect(() => {
    dispatch(fetchRideByServiceID(serviceId));
  }, [dispatch, serviceId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };
  return (
    <div className="relative mb-9">
      <form className="flex flex-wrap flex-col lg:flex-nowrap gap-16">
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="balloonRide" className="font-semibold text-sm">
            Balloon Ride
          </label>
          <select
            className=" px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
            name="balloonRide"
            value={schedule.balloonRide}
            onChange={handleInput}
          >
            <option value="">Select Ride</option>
            {selectedRides.map((item) => (
              <option value={item._id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 gap-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="date">Pick the date</label>

            <input
              type="date"
              placeholder="Choose Date"
              className="py-3 w-full px-5 rounded-full bg-white text-gray-800 outline-main-color focus:ring-2 focus:ring-hover-color transition duration-300 ease-in-out cursor-pointer "
              value={schedule.date}
              name="date"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="startTime">Start time</label>
            <input
              className="py-3 w-full px-5 rounded-full text-gray-800 outline-none focus:ring-2 focus:ring-hover-color transition duration-300 ease-in-out cursor-pointer"
              type="time"
              value={schedule.startTime}
              name="startTime"
            ></input>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="endTime">End time</label>
            <input
              className="py-3 w-full px-5 rounded-full bg-white text-gray-800 outline-main-color focus:ring-2 focus:ring-hover-color transition duration-300 ease-in-out cursor-pointer"
              type="time"
              value={schedule.startTime}
              name="endTime"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRideSchedule;
