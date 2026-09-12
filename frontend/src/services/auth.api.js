import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const resgisterUser = async (userData) => {
  const response = await authApi.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await authApi.post("/auth/login", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await authApi.get("/auth/get-me");
  return response.data;
};
