import api from "../api";

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// Log in existing user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Log out user
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
    throw error;
  }
};

// Get current user
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    throw error;
  }
};