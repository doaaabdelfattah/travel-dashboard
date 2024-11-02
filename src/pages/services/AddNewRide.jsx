import { FaUsers } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaChildren } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "../../redux/reducers/currencySlice";
import MainBtn from "../../components/shared/MainBtn";
import { addNewRide } from "../../redux/reducers/airBalloonRidesSlice";
import { fetchServices } from "../../redux/reducers/servicesSlice";
import ImageUploader from "../../components/shared/ImageUploader";

const AddNewRide = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { currency } = useSelector((state) => state.currency);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    dispatch(fetchCurrency());
    dispatch(fetchServices());
  }, [dispatch]);

  const [ride, setRide] = useState({
    title: "",
    location: [],
    price: "",
    description: "",
    seatsAvailable: "",
    discount: "",
    currency: "",
    isAvailable: true,
    adultPrice: "",
    childPrice: "",
    imageUrl: [],
    imageUrls: [],
    company: "",
    service: "",
  });
  console.log("ride: ", ride);

  const createFormData = (dataObject) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(dataObject)) {
      formData.append(key, value);
    }
    return formData;
  };
  const handleInput = (e) => {
    setRide({
      ...ride,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddRide = (e) => {
    e.preventDefault();
    const formData = createFormData(ride);
    if (selectedFile) {
      formData.append("imageUrl", selectedFile); // Append the file
    }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("imageUrls", file));
    }
    dispatch(addNewRide(formData));
  };

  return (
    <div>
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
            <label htmlFor="currency" className="font-semibold text-lg">
              Currency
            </label>
            <select
              className=" px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
              name="currency"
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
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="price" className="font-semibold text-lg">
                Price
              </label>
              <input
                onChange={handleInput}
                value={ride.price}
                type="number"
                className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
                name="price"
                id="price"
                placeholder="Price $"
              />
            </div>
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

        <div className="text-right">
          <MainBtn handleOnClick={handleAddRide}>Add Ride</MainBtn>
        </div>
      </form>
    </div>
  );
};

export default AddNewRide;
