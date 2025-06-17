import api from "../api"; // Adjust the path based on your folder structure

export const bookmarkPostService = async (postId, userId) => {
  const response = await api.post(`bookmarks/${userId}/${postId}`, {});
  return response;
};
