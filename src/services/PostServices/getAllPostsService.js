import axios from "axios";
const getAllPostsService = async () => {
  const response = await axios.get("http://localhost:3001/api/posts");
  return response;
};
export { getAllPostsService };
