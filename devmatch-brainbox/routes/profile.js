import express from "express";

import { view, update, updatePassword } from "../controllers/profile.js";
import auth from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/view/:id", auth, view);

profileRouter.get("/view", auth, view);

profileRouter.post("/update", auth, update);

profileRouter.post("/updatePassword", auth, updatePassword);

export default profileRouter;
