import api from "../api"; // Adjust path as needed

export const likePostService = async (postId, userId) => {
  const response = await api.post(`posts/${postId}/like`, { userId });
  return response;
};
