import React from "react";
import useAuth from "../hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";

const ProtectRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!authUser) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectRoute;
