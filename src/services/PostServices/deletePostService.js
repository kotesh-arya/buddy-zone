import api from "../api"; 

export const deletePostService = async (postId) => {
  const response = await api.delete(`posts/${postId}`);
  return response;
};
