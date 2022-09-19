import axios from "axios";
const signupService = async (user) => {
  const response = await axios.post("api/auth/signup", user);
  return response;
};
export { signupService };

