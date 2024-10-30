import {
  BarChart,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "1-5",
    orders: 10,
  },
  {
    day: "2/5",
    orders: 20,
  },
  {
    day: "3/5",
    orders: 5,
  },
  {
    day: "4/5",
    orders: 30,
  },
  {
    day: "5/5",
    orders: 30,
  },
  {
    day: "6/5",
    orders: 30,
  },
];

export const MyBarChart = ({ title, color }) => {
  return (
    <div className="h-[300px] mt-8">
      <h1 className="text-3xl font-semibold py-3"> {title}</h1>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart width={200} height={250} data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
