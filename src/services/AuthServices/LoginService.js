import axios from "axios";
export const loginService = async (user) => {
  const response = await axios.post("/api/auth/login", user);
  return response;
};
