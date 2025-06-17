import api from "../api"; // Adjust the path based on your folder structure

export const deleteCommentsofPostService = async (postId) => {
  const response = await api.delete(`posts/${postId}/comments`);
  return response;
};
