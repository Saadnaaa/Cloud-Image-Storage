import express from "express";
import {
  createMemory,
  deleteMemory,
  getMemories,
} from "../controllers/memory.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

export const memoryRouter = express.Router();

memoryRouter.post("/", protectRoute, createMemory);
memoryRouter.get("/", protectRoute, getMemories);
memoryRouter.delete("/:id", protectRoute, deleteMemory);
