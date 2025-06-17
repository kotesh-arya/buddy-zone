import axios from "axios";
const environment = process.env.NODE_ENV;


const getSingleUserService = async () => {

  const API_BASE_URL =
    environment === "development"
      ? "http://localhost:3001/api/"
      : "https://buddy-zone-backend.onrender.com/api/"; // Replace with your actual API URL


  const response = await axios.get(`${API_BASE_URL}auth/me`, {
    withCredentials: true, // ✅ Ensures cookies (token) are sent
  });
  return response;
};
export { getSingleUserService };
