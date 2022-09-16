import axios from "axios";
const getSingleUserService = async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  console.log(response.data.user);
  return response;
};
export { getSingleUserService };
