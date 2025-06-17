import axios from "axios";

const environment = process.env.NODE_ENV;

const API_BASE_URL =
  environment !== "development"
    ? "http://localhost:3001/api/"
    : "https://buddy-zone-backend.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ Ensures cookies (token) are sent
});

export default api;
