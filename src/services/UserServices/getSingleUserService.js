import axios from "axios";
const getSingleUserService = async (_id) => {
  const response = await axios.get(`/api/users/${_id}`);
  return response;
};
export { getSingleUserService };
