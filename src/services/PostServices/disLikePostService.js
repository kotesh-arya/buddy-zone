import api from "../api"; // Adjust the import path as needed

export const disLikePostService = async (postId, userId) => {
  const response = await api.post(`posts/${postId}/dislike`, { userId });
  return response;
};
