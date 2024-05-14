import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLogged", "false");
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("isGuest", "true");
    localStorage.setItem("userData", "");
    window.location.href = "/";
  }, [navigate]);

  return null;
};

export default SignOut;
