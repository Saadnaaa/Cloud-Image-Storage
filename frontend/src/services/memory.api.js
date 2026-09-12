import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const memoryApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const createMemory = async (memoryData) => {
  const response = await memoryApi.post("/memories", memoryData);
  return response.data;
};

export const getMemories = async () => {
  const response = await memoryApi.get("/memories");
  return response.data;
};

export const deleteMemory = async (memeoryId) => {
  const response = memoryApi.delete(`/memories/${memeoryId}`);
  return response.data;
};
