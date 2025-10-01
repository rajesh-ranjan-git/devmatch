import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";
import {
  loginRequestMiddleware,
  registerRequestMiddleware,
} from "../middlewares/request.js";

const userRouter = express.Router();

userRouter.post("/register", registerRequestMiddleware, register);

userRouter.post("/login", loginRequestMiddleware, login);

userRouter.get("/logout", logout);

userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
