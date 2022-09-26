import axios from "axios";

export const deleteCommentService = async (postId, commentId, token) => {
  const response = await axios.post(
    ` /api/comments/delete/${postId}/${commentId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
};
