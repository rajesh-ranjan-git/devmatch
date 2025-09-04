import express from "express";

import { request, view, review } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/request/:status/:id", auth, request);
connectionRouter.get("/view", auth, view);
connectionRouter.get("/review", auth, review);

export default connectionRouter;
