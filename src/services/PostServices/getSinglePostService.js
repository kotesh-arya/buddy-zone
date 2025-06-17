import axios from "axios";
const environment = process.env.NODE_ENV;

const getSinglePostService = async (postId) => {

  const API_BASE_URL =
    environment === "development"
      ? "http://localhost:3001/api/"
      : "https://buddy-zone-backend.onrender.com/api/"; // Replace with your actual API URL


  // const response = await axios.get(`/api/posts/${postId}`);

  const response = await axios.get(
    `${API_BASE_URL}posts/${postId}`,
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};
export { getSinglePostService };
