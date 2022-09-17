import axios from "axios";
const getUserPostsService = async (username) => {
  const response = await axios.get(`/api/posts/user/${username}`);
  // console.log(response);
  return response;
};
export { getUserPostsService };
