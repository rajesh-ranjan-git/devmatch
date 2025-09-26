import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";
import { loginRequestValidator } from "../validations/validations.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", loginRequestValidator, login);

userRouter.get("/logout", logout);

userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
