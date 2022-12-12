import axios from "axios";

export const getAllBookmarkService = async (token) => {
  const response = await axios.get("/api/users/bookmark", {
    headers: { authorization: token },
  });
  return response;
};