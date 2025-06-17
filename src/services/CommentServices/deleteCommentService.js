import api from "../api"; // Adjust the import path as needed

export const deleteCommentService = async (commentId) => {
  const response = await api.delete(`comments/${commentId}`);
  return response;
};
