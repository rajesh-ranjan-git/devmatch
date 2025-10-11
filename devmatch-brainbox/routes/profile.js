import express from "express";

import { view, update, updatePassword } from "../controllers/profile.js";
import auth from "../middlewares/auth.js";
import {
  updatePasswordRequestMiddleware,
  updateProfileRequestMiddleware,
} from "../middlewares/request.js";

const profileRouter = express.Router();

profileRouter.get("/view", auth, view);

profileRouter.get("/view/:id", auth, view);

profileRouter.post("/update", auth, updateProfileRequestMiddleware, update);

profileRouter.post(
  "/updatePassword",
  auth,
  updatePasswordRequestMiddleware,
  updatePassword
);

export default profileRouter;
