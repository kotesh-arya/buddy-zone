import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { USER_TOKEN } from "./constants";

const RequiresAuth = ({ children }) => {
  // const { isLoggedin } = useSelector((store) => store.auth);    
  const location = useLocation();
  console.log("iam from Requiresauth file:", location);
  return localStorage.getItem(USER_TOKEN) !== null ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/" replace />
  );
};

export { RequiresAuth };
