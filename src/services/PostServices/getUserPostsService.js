import api from "../api"; // Adjust the import path as needed

const getUserPostsService = async (userId) => {
  const response = await api.get(`posts/users/${userId}`);
  return response;
};

export { getUserPostsService };
