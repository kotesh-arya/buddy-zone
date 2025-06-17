import api from "../api"; // Adjust the import path as needed

export const unfollowUserService = async (userId) => {
  const response = await api.post(`users/unfollow/${userId}`, {});
  return response;
};
