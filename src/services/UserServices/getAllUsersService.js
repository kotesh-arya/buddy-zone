import axios from "axios";
const getAllUsersService = async () => {
  const response = await axios.get("/api/users");
  // console.log(response.data.users);
  return response;
};
export { getAllUsersService };
