import express from "express";

import { view, mark } from "../controllers/notification.js";
import auth from "../middlewares/auth.js";

const notificationRouter = express.Router();

notificationRouter.get("/view", auth, view);
notificationRouter.post("/mark/:status", auth, mark);

export default notificationRouter;
