import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser, logOut } from "./features/auth/authSlice.js";

const RequiresAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]); // Runs when `user` state changes

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
