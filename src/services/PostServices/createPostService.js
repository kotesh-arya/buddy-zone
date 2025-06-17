import api from "../api"; // Adjust the import path as necessary

export const createPostService = async (postData) => {
  const response = await api.post("posts", postData); // ✅ postData passed directly
  return response;
};
