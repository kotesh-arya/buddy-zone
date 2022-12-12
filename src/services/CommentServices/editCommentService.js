import axios from "axios";

export const editCommentService = async (
  postId,
  commentId,
  commentData,
  token
) => {
  const response = await axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    { commentData },
    { headers: { authorization: token } }
  );
  return response;
};
