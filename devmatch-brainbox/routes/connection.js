import express from "express";

import { connect, connections, requests } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/connect/:status/:id", auth, connect);
connectionRouter.get("/connections", auth, connections);
connectionRouter.get("/requests", auth, requests);

export default connectionRouter;
