import express from "express";

import { connect, view } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/connect/:status/:id", auth, connect);
connectionRouter.get("/view", auth, view);

export default connectionRouter;
