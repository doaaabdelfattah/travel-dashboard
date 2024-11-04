import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5001/api/v1",
  baseURL: "https://ballon-booking-backend.vercel.app/api/v1",
});

export default api;
