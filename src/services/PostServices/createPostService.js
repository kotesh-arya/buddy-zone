import axios from "axios";

export const createPostService = async (postData, token) => {
  const response = await axios.post(
    "/api/posts",
    { postData },
    { headers: { authorization: token } }
  );
  return response;
};