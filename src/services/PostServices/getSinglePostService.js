import axios from "axios";
const getSinglePostService = async (postId) => {
  const response = await axios.get(`/api/posts/${postId}`);
  // console.log(response.data.users);
  return response;
};
export { getSinglePostService };
