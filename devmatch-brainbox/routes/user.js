import express from "express";

import {
  checkAuth,
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import {
  registerForgotPasswordRequestMiddleware,
  loginRequestMiddleware,
  requestMiddleware,
} from "../middlewares/request.js";

const userRouter = express.Router();

userRouter.get("/checkAuth", auth, checkAuth);

userRouter.post("/register", registerForgotPasswordRequestMiddleware, register);

userRouter.post("/login", loginRequestMiddleware, login);

userRouter.get("/logout", requestMiddleware, logout);

userRouter.patch(
  "/forgotPassword",
  registerForgotPasswordRequestMiddleware,
  forgotPassword
);

export default userRouter;
