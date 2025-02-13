import axios from "axios";

export const editPostService = async (postId, postData, token) => {
  const response = await axios.put(
    `http://localhost:3001/api/posts/${postId}`,
    { postData },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response;
};
