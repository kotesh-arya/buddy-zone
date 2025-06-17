import api from "../api"; // Update path based on your structure

export const downVoteCommentService = async (commentId) => {
  const response = await api.post(`comments/${commentId}/downvote`, {});
  return response;
};
