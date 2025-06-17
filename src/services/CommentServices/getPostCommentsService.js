
import api from "../api";


const getPostCommentsService = async (postId) => {
  const response = await api.get(`comments/post/${postId}`);
  return response;
};
export { getPostCommentsService };
