import axios from "axios";
const getSinglePostService = async (postId) => {
  const response = await axios.get(`/api/posts/${postId}`);
  return response;
};
export { getSinglePostService };
