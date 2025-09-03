import express from "express";

import {
  view,
  update,
  updatePassword,
  forgotPassword,
} from "../controllers/profile.js";

const profileRouter = express.Router();

profileRouter.get("/view/:id", view);

profileRouter.get("/view", view);

profileRouter.post("/update", update);

profileRouter.post("/updatePassword", updatePassword);

profileRouter.post("/forgotPassword", forgotPassword);

export default profileRouter;
