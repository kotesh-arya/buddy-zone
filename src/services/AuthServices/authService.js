import axios from "axios";

const environment = process.env.NODE_ENV;
const API_BASE_URL = environment === "development" ?  "http://localhost:3001/api/auth" : "https://buddy-zone-backend.onrender.com/api/auth"; // Replace with your actual API URL

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
      withCredentials: true, // Ensures cookies are sent
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Log in existing user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, {
      withCredentials: true, // Ensures cookies are sent
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Log out user by calling API
export const logoutUser = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
    throw error;
  }
};

// Get current user
export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      withCredentials: true, // Ensures cookies are sent
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
