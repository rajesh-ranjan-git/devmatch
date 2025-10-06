import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";
import {
  registerForgotPasswordRequestMiddleware,
  loginRequestMiddleware,
  requestMiddleware,
} from "../middlewares/request.js";

const userRouter = express.Router();

userRouter.post("/register", registerForgotPasswordRequestMiddleware, register);

userRouter.post("/login", loginRequestMiddleware, login);

userRouter.get("/logout", requestMiddleware, logout);

userRouter.patch("/forgotPassword", registerForgotPasswordRequestMiddleware, forgotPassword);

export default userRouter;
