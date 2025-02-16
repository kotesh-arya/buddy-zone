import axios from "axios";

export const createPostService = async (postData) => {
  const response = await axios.post(
    "http://localhost:3001/api/posts",
    postData, // ✅ Don't wrap postData in an object
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};
