import express from "express";

import { request, review } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/request/:action/:id", auth, request);
connectionRouter.post("/review/:action/:id", auth, review);

export default connectionRouter;
