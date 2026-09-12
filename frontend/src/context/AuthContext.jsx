import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  resgisterUser,
} from "../services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setAuthUser(data.user);
      } catch (error) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register User
  const register = async (userData) => {
    const data = await resgisterUser(userData);
    setAuthUser(data.user);
    return data;
  };

  // Login User
  const login = async (userData) => {
    const data = await loginUser(userData);
    setAuthUser(data.user);
    return data;
  };

  //Logout user
  const logout = async () => {
    await logoutUser();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
