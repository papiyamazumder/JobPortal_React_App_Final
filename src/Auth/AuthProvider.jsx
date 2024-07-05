import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../Api/usersApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const login = (email) => {
    // Logic to set isAuthenticated and userEmail based on successful login
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole(''); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,userEmail,userRole, setUserRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};