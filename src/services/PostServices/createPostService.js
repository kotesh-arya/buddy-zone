import axios from "axios";

export const createPostService = async (postData, token) => {
  const response = await axios.post(
    "http://localhost:3001/api/posts",
    { postData },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
};
