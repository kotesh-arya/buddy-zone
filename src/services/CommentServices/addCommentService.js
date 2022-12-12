import axios from "axios";

export const addCommentService = async (postId, commentData, token) => {
  const response = await axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    { headers: { authorization: token } }
  );
  return response;
};
