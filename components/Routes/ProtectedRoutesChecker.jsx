import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoutesChecker() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const checkAuthStatus = () => {
    if (
      !currentUser &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Initial check on component mount
    checkAuthStatus();

    // Event listener for back navigation
    window.addEventListener("popstate", checkAuthStatus);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("popstate", checkAuthStatus);
  }, [currentUser, navigate]);

  return null; // This component does not render anything to the DOM
}
