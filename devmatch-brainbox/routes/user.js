import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/user.js";
import {
  loginRequestValidator,
  registerRequestValidator,
} from "../middlewares/requests.js";

const userRouter = express.Router();

userRouter.post("/register", registerRequestValidator, register);

userRouter.post("/login", loginRequestValidator, login);

userRouter.get("/logout", logout);

userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
