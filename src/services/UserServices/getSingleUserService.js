import api from "../api"; // Adjust the path based on your folder structure

const getSingleUserService = async () => {
  const response = await api.get("auth/me");
  return response;
};

export { getSingleUserService };
