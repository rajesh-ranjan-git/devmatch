import express from "express";

import { request, view, review } from "../controllers/connection.js";

const connectionRouter = express.Router();

connectionRouter.post("/request/:status/:id", request);
connectionRouter.get("/view", view);
connectionRouter.get("/review", review);

export default connectionRouter;
