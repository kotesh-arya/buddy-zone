import api from "../api"; // Adjust the path as needed

export const followUserService = async (userId) => {
  const response = await api.post(`users/follow/${userId}`, {});
  return response;
};
