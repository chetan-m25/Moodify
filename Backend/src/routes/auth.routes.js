import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", authUser, getMe);
authRouter.get("/logout", logoutUser);

export default authRouter;
