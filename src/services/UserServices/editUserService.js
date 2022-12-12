import axios from "axios";
export const editUserService = async (userData, token) => {
  const response = await axios.post(
    "/api/users/edit",
    { userData },
    { headers: { authorization: token } }
  );
  return response;
};
