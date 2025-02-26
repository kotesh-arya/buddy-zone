import axios from "axios";
const environment = process.env.NODE_ENV;


export const deleteCommentService = async (commentId) => {
  const API_BASE_URL =
    environment === "development"
      ? "http://localhost:3001/api/"
      : "https://buddy-zone-backend.onrender.com/api/"; // Replace with your actual API URL

  const response = await axios.delete(
    `${API_BASE_URL}comments/${commentId}`,
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};
