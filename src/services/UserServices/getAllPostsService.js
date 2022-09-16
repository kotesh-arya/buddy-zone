import axios from "axios";
const getAllPostsService = async () => {
  const response = await axios.get("/api/posts");
  // console.log(response.data.users);
  return response;
};
export { getAllPostsService };
