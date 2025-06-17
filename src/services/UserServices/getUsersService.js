import api from "../api"; // Adjust the path as needed

const getUsersService = async () => {
  const response = await api.get("users/suggestions");
  return response;
};

export { getUsersService };
