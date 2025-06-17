import axios from "axios";
const environment = process.env.NODE_ENV;


export const likePostService = async (postId, userId) => {

  const API_BASE_URL =
    environment === "development"
      ? "http://localhost:3001/api/"
      : "https://buddy-zone-backend.onrender.com/api/"; // Replace with your actual API URL

  const response = await axios.post(
    `${API_BASE_URL}posts/${postId}/like`,
    { userId },
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};