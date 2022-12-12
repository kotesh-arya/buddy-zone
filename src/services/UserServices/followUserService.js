import axios from "axios";

export const followUserService = async (followUserId, token) => {
  const response = await axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    { headers: { authorization: token } }
  );
  return response;
};
