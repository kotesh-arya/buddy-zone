import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequiresAuth = ({ children }) => {
  const { isLoggedin } = useSelector((store) => store.auth);
  console.log(isLoggedin);

  const location = useLocation();
  console.log("iam from Requiresauth file:", location);
  return isLoggedin  ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/" replace />
  );
};

export { RequiresAuth };
