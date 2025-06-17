import api from "../api"; // Adjust the path as necessary

const getSinglePostService = async (postId) => {
  const response = await api.get(`posts/${postId}`);
  return response;
};

export { getSinglePostService };
