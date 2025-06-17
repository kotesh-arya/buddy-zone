import axios from "axios";

export const editPostService = async (postId, postData) => {
  const response = await axios.put(
    `http://localhost:3001/api/posts/${postId}`,
    { postData },
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};
