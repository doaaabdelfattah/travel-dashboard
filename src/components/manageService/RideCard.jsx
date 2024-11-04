import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCurrency } from "../../redux/reducers/currencySlice";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
const RideCard = ({ ride, key }) => {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.currency);
  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const selectedCurrency = currency.filter((cur) => ride.currency === cur._id);

  console.log("currency", selectedCurrency);
  return (
    <div key={key} className="hover:scale-95 duration-700 transition-all">
      <Link className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Price</dt>

              <dd className="text-sm text-gray-500">
                {ride.price}
                {selectedCurrency ? selectedCurrency.symbol : " N/A"}
              </dd>
            </div>

            <div>
              <dt className="sr-only">Title</dt>

              <dd className="font-medium">{ride.title}</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FaCheckCircle color="#c6783e" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Seats Available</p>

                <p className="font-medium">{ride.seatsAvailable} seats</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FaChildren color="#c6783e" size="20px" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Adult Price</p>

                <p className="font-medium">{ride.adultPrice}</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FaUsers color="#c6783e" size="20px" />
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Kids Price</p>

                <p className="font-medium">{ride.childPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RideCard;
