import BarChart from "../components/mainDashboard/BarChart";
import LatestOrders from "../components/mainDashboard/LatestOrders";
import LatestStats from "../components/mainDashboard/LatestStats";

const DashboardMain = () => {
  const user = "Alshaimaa";
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Main Dashboard</h1>
        </header>
        <div className="mt-2">
          <p className="text-base font-normal">Welcome, {user}</p>
        </div>
      </div>
      <LatestStats />
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <LatestOrders />
        <LatestOrders />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <BarChart title={"Orders Last Week"} color={"#3d78e3"} />
        <BarChart title={"Orders Last Week"} color={"#dcae8b"} />
      </div>
    </div>
  );
};

export default DashboardMain;
