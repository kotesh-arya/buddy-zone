import axios from "axios";
const getSingleUserService = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response;
};
export { getSingleUserService };
