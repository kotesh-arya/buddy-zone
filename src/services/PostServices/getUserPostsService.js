import axios from "axios";
const environment = process.env.NODE_ENV;

const getUserPostsService = async (userId) => {
  const API_BASE_URL =
    environment === "development"
      ? "http://localhost:3001/api/"
      : "https://buddy-zone-backend.onrender.com/api/"; // Replace with your actual API URL

  const response = await axios.get(`${API_BASE_URL}posts/users/${userId}`, {
    withCredentials: true, // ✅ Ensures cookies (token) are sent
  });
  return response;
};
export { getUserPostsService };
