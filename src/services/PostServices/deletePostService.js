import axios from "axios";

export const deletePostService = async (postId, token) => {
  const response = await axios.delete(
    `http://localhost:3001/api/posts/${postId}`,
    {
      withCredentials: true, // ✅ Ensures cookies (token) are sent
    }
  );
  return response;
};
