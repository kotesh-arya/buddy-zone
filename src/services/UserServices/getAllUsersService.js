import axios from "axios";
const getAllUsersService = async () => {
  const response = await axios.get("http://localhost:3001/api/users");
  return response;
};
export { getAllUsersService };
