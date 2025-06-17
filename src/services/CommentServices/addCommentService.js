import api from "../api";

export const addCommentService = async (postId, text) => {
  try {
    const response = await api.post("/comments", { postId, text });
    return response;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
    throw error;
  }
};