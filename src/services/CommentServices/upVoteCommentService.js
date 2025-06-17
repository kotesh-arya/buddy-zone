import api from "../api"; // Adjust the path as per your folder structure

export const upVoteCommentService = async (commentId) => {
  const response = await api.post(`comments/${commentId}/upvote`, {});
  return response;
};
