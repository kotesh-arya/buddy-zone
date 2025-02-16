import axios from "axios";
const getUsersService = async () => {
  const response = await axios.get(
    "http://localhost:3001/api/users/suggestions"
  );
  return response;
};
export { getUsersService };
