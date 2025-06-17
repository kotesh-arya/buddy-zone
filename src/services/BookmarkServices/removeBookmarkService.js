import api from "../api"; // Adjust the path according to your folder structure

export const removePostFromBookmarkService = async (postId, userId) => {
  const response = await api.delete(`bookmarks/${userId}/${postId}`);
  return response;
};
