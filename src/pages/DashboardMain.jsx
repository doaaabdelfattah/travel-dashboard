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
    </div>
  );
};

export default DashboardMain;
