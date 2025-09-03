import express from "express";

import { view, mark } from "../controllers/notification.js";

const notificationRouter = express.Router();

notificationRouter.get("/view", view);
notificationRouter.post("/mark/:status", mark);

export default notificationRouter;
