import { Link } from "react-router-dom";
import { FaSackDollar } from "react-icons/fa6";
import { DiCssTricks } from "react-icons/di";
import { FaUserGroup } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const LatestStats = () => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ===== Card 1 ========= */}
      <div className="bg-dark-grey/30 relative shadow-lg p-4 rounded-sm hover:scale-[1.05] cursor-pointer duration-500">
        <h1 className="font-bold  text-lg uppercase tracking-wider py-2">
          Total Trips
        </h1>
        <div className="flex items-center flex-col justify-center text-4xl py-2">
          55
          <span className="font-normal text-sm uppercase py-1 tracking-widest">
            Trips
          </span>
        </div>
        <div className="absolute bottom-3 right-4 text-dark-grey/60">
          <DiCssTricks size="60px" />
        </div>
        <Link className="underline hover:text-main-color" to="/services/all">
          View all trips
        </Link>
      </div>
      {/* ===== Card 2 || Orders ========= */}
      <div className="bg-dark-grey/30  shadow-lg p-4 rounded-sm hover:scale-[1.05] cursor-pointer duration-500 relative">
        <h1 className="font-bold  text-lg uppercase tracking-wider py-2">
          Total Orders
        </h1>
        <div className="flex items-center flex-col justify-center text-4xl py-2">
          87
          <span className="font-normal text-sm uppercase py-1 tracking-widest">
            Order
          </span>
        </div>
        <div className="absolute bottom-3 right-4 text-dark-grey/60">
          <FaShoppingCart size="60px" />
        </div>
        <Link className="underline hover:text-main-color" to="/orders/">
          View all orders
        </Link>
        <span></span>
      </div>
      {/* ===== Card 3 ========= */}
      <div className="bg-dark-grey/30 relative shadow-lg p-4 rounded-sm hover:scale-[1.05] cursor-pointer duration-500">
        <h1 className="font-bold text-lg uppercase tracking-wider py-2">
          Total revenue
        </h1>
        <div className="flex items-center flex-col justify-center text-4xl py-2">
          30,567
          <span className="font-normal text-sm uppercase py-1 tracking-widest">
            pounds
          </span>
        </div>
        <div className="absolute bottom-3 right-4 text-dark-grey/60">
          <FaSackDollar size="60px" />
        </div>
        <Link className="underline hover:text-main-color" to="/services/all">
          View all trips
        </Link>
      </div>
      {/* ===== Card 4 ========= */}
      <div className="bg-dark-grey/30 relative shadow-lg p-4 rounded-sm hover:scale-[1.05] cursor-pointer duration-500">
        <h1 className="font-bold text-lg uppercase tracking-wider py-2">
          Total customers
        </h1>
        <div className="flex items-center flex-col justify-center text-4xl py-2">
          43
          <span className="font-normal text-sm uppercase py-1 tracking-widest">
            customers
          </span>
        </div>
        <div className="absolute bottom-3 right-4 text-dark-grey/60">
          <FaUserGroup size="60px" />
        </div>
        <Link className="underline hover:text-main-color" to="/services/all">
          View all customers
        </Link>
      </div>
    </div>
  );
};

export default LatestStats;
