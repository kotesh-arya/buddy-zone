import api from "../api"; // Adjust the import path as needed

export const editUserService = async (userData, userId) => {
  const response = await api.put(`users/${userId}`, {userData});
  return response;
};
