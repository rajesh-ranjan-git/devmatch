import express from "express";

import { request, review } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/connect/:status/:id", auth, request);

export default connectionRouter;
