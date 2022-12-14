import axios from "axios";

export const unfollowUserService = async (followUserId, token) => {
  const response = await axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
};