import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";

const RideCard = ({ ride, key, serviceId, currency }) => {
  const selectedCurrency = currency.find((cur) => ride.currency === cur._id);

  return (
    <div key={key} className="hover:scale-95 duration-700 transition-all">
      <Link
        className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
        to={`/services/${serviceId}/${ride._id}`}
        key={ride._id}
      >
        <img
          alt=""
          src={ride.imageUrl}
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <dl>
            <div className="my-2">
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

          <div className="mt-6 flex items-center flex-wrap gap-7 sm:gap-4 text-xs">
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

                <p className="font-medium">
                  {ride.adultPrice}
                  {selectedCurrency ? selectedCurrency.symbol : " N/A"}
                </p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FaUsers color="#c6783e" size="20px" />
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Kids Price</p>

                <p className="font-medium">
                  {ride.childPrice}
                  {selectedCurrency ? selectedCurrency.symbol : " N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RideCard;
