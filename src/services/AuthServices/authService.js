import axios from "axios";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// export const loginService = async (user) => {
//   try {
//     const response = await axios.post("/api/auth/login", user);
//     console.log(response, "core response at the API call function");
//     return response;
//   } catch (error) {
//     console.log(error, "error while loggin in the user");
//   }
// };

// Register new user
export const registerUser = async (registeringUser) => {
  try {
    console.log("Registering user:", registeringUser);
    const { email, password } = registeringUser;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("User successfully created:", user);

    // Return user object if registration is successful
    return user;
  } catch (error) {
    // Improved error handling
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    // throw new Error("Error while registering the user, please try again.");
    return error;
  }
};

// Log in existing user
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Log out user
export const logoutUser = async () => {
  await signOut(auth);
};
