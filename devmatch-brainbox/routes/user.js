import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
