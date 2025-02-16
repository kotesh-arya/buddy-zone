import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./features/auth/authSlice.js";

const RequiresAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

  if (user === null) return <p>Loading...</p>; // Show loading state

  return user ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export { RequiresAuth };
