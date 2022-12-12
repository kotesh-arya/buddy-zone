import { Navigate, useLocation } from "react-router-dom";
import { USER_TOKEN } from "./constants";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  return localStorage.getItem(USER_TOKEN) !== null ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/" replace />
  );
};

export { RequiresAuth };
