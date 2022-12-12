import axios from "axios";
const getUserPostsService = async (username) => {
  const response = await axios.get(`/api/posts/user/${username}`);
  return response;
};
export { getUserPostsService };
