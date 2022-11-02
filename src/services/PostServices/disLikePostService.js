import axios from "axios";

export const disLikePostService = async (postId, token) => {
  const response = await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
};