import axios from "axios";
export const upVoteCommentService = async (postId, commentId, token) => {
  const response = await axios.post(
    `/api/comments/upvote/${postId}/${commentId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
  
};
