import api from "../api"; // Adjust the path as needed

export const editCommentService = async (text, commentId) => {
  const response = await api.put(`comments/${commentId}`, { text });
  return response;
};
