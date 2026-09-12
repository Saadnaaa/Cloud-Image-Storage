import React from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200">
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={authUser ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
