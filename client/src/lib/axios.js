import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "https://fullstack-chat-video-gamma.vercel.app/" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
