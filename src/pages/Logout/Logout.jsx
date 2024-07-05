import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
 
const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    logout();
    navigate("/home");
  }, [logout, navigate]);
 
  return null; // This component doesn't need to render anything
};
 
export default Logout;