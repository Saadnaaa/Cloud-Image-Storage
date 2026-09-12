import express from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/get-me", protectRoute, getMe);
