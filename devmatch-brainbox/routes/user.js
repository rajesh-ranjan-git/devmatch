import express from "express";

import {
  checkAuth,
  register,
  login,
  logout,
  forgotPassword,
  deleteAccount,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import {
  registerRequestMiddleware,
  loginRequestMiddleware,
  forgotPasswordRequestMiddleware,
  requestMiddleware,
} from "../middlewares/request.js";

const userRouter = express.Router();

userRouter.get("/checkAuth", auth, checkAuth);

userRouter.post("/register", registerRequestMiddleware, register);

userRouter.post("/login", loginRequestMiddleware, login);

userRouter.get("/logout", requestMiddleware, logout);

userRouter.patch(
  "/forgot-password",
  forgotPasswordRequestMiddleware,
  forgotPassword,
);

userRouter.delete("/delete-account", auth, deleteAccount);

export default userRouter;
