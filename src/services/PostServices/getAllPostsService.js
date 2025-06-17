import api from "../api"; // Adjust the import path as necessary

const getAllPostsService = async () => {
  const response = await api.get("posts");
  return response;
};

export { getAllPostsService };
