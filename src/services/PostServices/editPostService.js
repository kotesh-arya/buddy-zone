import api from "../api"; // Adjust path as needed

export const editPostService = async (postId, postData) => {
  const response = await api.put(`posts/${postId}`, { postData }); // ✅ No need to wrap postData again
  return response;
};
