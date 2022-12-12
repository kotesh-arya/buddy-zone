import axios from "axios";
export const downVoteCommentService = async (postId, commentId, token) => {
  const response = await axios.post(
    `/api/comments/downvote/${postId}/${commentId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
  
};
