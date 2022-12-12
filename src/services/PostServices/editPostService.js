import axios from "axios";

export const editPostService = async (postId, postData, token) => {
  const response = await axios.post(
    `/api/posts/edit/${postId}`,
    { postData },
    {
      headers: { authorization: token },
    }
  );
  return response;
};
