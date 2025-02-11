import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../src/config/firebase"; // Import Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>; // Show a loading state while checking auth status

  return user ? children : <Navigate state={{ from: location }} to="/" replace />;
};

export { RequiresAuth };
