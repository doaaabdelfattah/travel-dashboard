import { FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaChildren } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "../../redux/reducers/currencySlice";

import MainBtn from "../shared/MainBtn";
import {
  addNewRide,
  resetLoadingState,
} from "../../redux/reducers/airBalloonRidesSlice";
import { fetchServices } from "../../redux/reducers/servicesSlice";
import ImageUploader from "../shared/ImageUploader";

import WarningMsg from "../shared/WarningMsg";
import MapComponent from "../shared/MapComponent";

const AddNewRide = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { currency } = useSelector((state) => state.currency);

  const { loadingAddRide } = useSelector((state) => state.rides);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const closeWarning = () => {
    dispatch(resetLoadingState());
  };
  useEffect(() => {
    dispatch(fetchCurrency());
    dispatch(fetchServices());
  }, [dispatch]);

  const [ride, setRide] = useState({
    title: "",
    location: {},
    description: "",
    seatsAvailable: 0,
    discount: 0,
    currency: "",
    isAvailable: true,
    adultPrice: 0,
    childPrice: 0,
    imageUrl: [],
    imageUrls: [],

    service: "",
  });
  console.log("ride: ", ride);

  const handleMapClick = (lat, lng) => {
    setRide((prevRide) => {
      const updatedRide = {
        ...prevRide,
        location: { type: "Point", coordinates: [lat, lng] },
      };
      console.log("Updated location:", updatedRide.location);
      return updatedRide;
    });
  };

  const createFormData = (dataObject) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(dataObject)) {
      // Check if the key is 'location' and handle it separately
      if (key === "location" && typeof value === "object") {
        // Convert location object to a JSON string
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRide({
      ...ride,
      [name]:
        name === "adultPrice" ||
        name === "childPrice" ||
        name === "seatsAvailable" ||
        name === "discount"
          ? Number(value)
          : value,
    });
  };

  const handleAddRide = (e) => {
    e.preventDefault();
    const formData = createFormData(ride);
    if (selectedFile) {
      formData.set("imageUrl", selectedFile); // Append the file
    }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("imageUrls", file));
    }
    // Log each item in the FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    dispatch(addNewRide(formData));
  };

  return (
    <div className="relative mb-9">
      {" "}
      <form className="flex flex-wrap flex-col lg:flex-nowrap gap-16">
        {/* ROW ONE 111111 ================== */}
        <div className="flex gap-4 flex-col w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="font-semibold text-lg">
              Title
            </label>
            <input
              onChange={handleInput}
              value={ride.title}
              type="text"
              className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color rounded-sm"
              name="title"
              id="title"
              placeholder="Ride's Title"
            />
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="service" className="font-semibold text-lg">
              Service
            </label>
            <select
              className=" px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
              name="service"
              value={ride.service}
              onChange={handleInput}
            >
              <option value="">Select a service</option>
              {services.map((item) => (
                <option value={item._id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="font-semibold text-lg">
              Description
            </label>
            <input
              onChange={handleInput}
              value={ride.description}
              type="text"
              className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color rounded-sm"
              name="description"
              id="description"
              placeholder="description"
            />
          </div>
          {/* ROW TWO 222222 ================== */}
          <div className="flex gap-2 w-full">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="currency" className="font-semibold text-lg">
                Currency
              </label>
              <select
                className=" px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
                name="currency"
                value={ride.currency}
                onChange={handleInput}
              >
                <option value="">Select a currency</option>
                {currency.map((item) => (
                  <option value={item._id} key={item.id}>
                    {item.name} {item.symbol}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="discount" className="font-semibold text-lg">
                Discount
              </label>
              <input
                onChange={handleInput}
                value={ride.discount}
                type="number"
                className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
                name="discount"
                id="discount"
                placeholder="Discount %"
              />
            </div>
          </div>
          {/* ROW THREE 33333333 ================== */}
          <div className="flex gap-2 w-full">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="seatsAvailable"
                className="font-semibold text-lg gap-3 "
              >
                <span>Seats Available</span>
              </label>
              <input
                onChange={handleInput}
                value={ride.seatsAvailable}
                type="text"
                className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
                name="seatsAvailable"
                id="seatsAvailable"
                placeholder="Seats Available"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="adultPrice"
                className="font-semibold text-lg flex gap-3 items-center"
              >
                <FaUsers /> <span>Adult Price</span>
              </label>
              <input
                onChange={handleInput}
                value={ride.adultPrice}
                type="number"
                className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color rounded-sm"
                name="adultPrice"
                id="adultPrice"
                placeholder="Adult Price"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="childPrice"
                className="font-semibold text-lg flex gap-3 items-center"
              >
                <FaChildren /> <span>Child Price</span>
              </label>
              <input
                onChange={handleInput}
                value={ride.childPrice}
                type="text"
                className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
                name="childPrice"
                id="childPrice"
                placeholder="Child Price"
              />
            </div>
          </div>
        </div>
        <div className=" w-full">
          <ImageUploader
            setSelectedFile={setSelectedFile}
            setSelectedFiles={setSelectedFiles}
          />
        </div>
        <div>
          {/* <MyMap onMapClick={handleMapClick} /> */}
          <MapComponent onMapClick={handleMapClick} />
        </div>

        <div className=" w-full flex justify-between items-start ">
          <div>
            <MainBtn handleOnClick={handleAddRide}>Add Ride</MainBtn>
          </div>
          {loadingAddRide != "idle" && (
            // <div style={{ position: "absolute", top: "60px", right: "0" }}>
            <WarningMsg
              header={loadingAddRide}
              msgType={loadingAddRide}
              content={
                loadingAddRide === "succeeded"
                  ? "Your ride was added successfully."
                  : loadingAddRide === "loading"
                  ? "Please wait while your item is being uploaded."
                  : "Item upload failed. Please try again."
              }
              onClose={closeWarning}
            />
            // </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddNewRide;
