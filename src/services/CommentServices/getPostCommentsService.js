import axios from "axios";
const getPostCommentsService = async (postId) => {
  const response = await axios.get(`/api/comments/${postId}`);
  // console.log(response.data.users);
  return response;
};
export { getPostCommentsService };
