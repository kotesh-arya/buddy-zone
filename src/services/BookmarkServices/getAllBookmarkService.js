import api from "../api"; // Adjust path as needed

export const getAllBookmarkService = async (userId) => {
  const response = await api.get(`bookmarks/${userId}`);
  return response;
};
