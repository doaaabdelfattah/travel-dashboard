import { Link } from "react-router-dom";
const CardStats = ({ icon }) => {
  return (
    <>
      <div className="bg-dark-grey/30 relative shadow-lg p-4 rounded-sm hover:scale-[1.05] cursor-pointer duration-500">
        <h1 className="font-bold text-main-color text-lg uppercase tracking-wider py-2">
          Total Trips
        </h1>
        <div className="flex items-center flex-col justify-center text-4xl py-2">
          55
          <span className="font-normal text-sm uppercase py-1 tracking-widest">
            Trips
          </span>
        </div>
        <div className="absolute bottom-3 right-4 text-dark-grey/60">
          {icon}
        </div>
        <Link className="underline hover:text-main-color" to="/services/all">
          View all trips
        </Link>
      </div>
    </>
  );
};

export default CardStats;
