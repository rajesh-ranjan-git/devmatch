import express from "express";

import { connect } from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const connectionRouter = express.Router();

connectionRouter.post("/connect/:status/:id", auth, connect);

export default connectionRouter;
