import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle, LogIn, Mail, Lock, ArrowRight } from "lucide-react";

import useAuth from "../hooks/useAuth.js";
import CloudMemoryStorageLogo from "../svgs/CloudMemoryStorageLogo.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { authUser, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4 relative transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8 sm:p-10">
        {/* Logo Container */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-2xl">
            <CloudMemoryStorageLogo />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <LogIn size={16} />
            <span>Welcome Back</span>
          </div>
          <h1 className="text-2xl font-extrabold text-base-content tracking-tight">
            Login to Memory Cloud
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            Enter your credentials to access your stored memories
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-base-content/80 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-base-content/80 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-500/20 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-base-content/60 mt-6 pt-6 border-t border-base-200">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
