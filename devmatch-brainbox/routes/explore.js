import express from "express";

import { explore } from "../controllers/explore.js";
import auth from "../middlewares/auth.js";

const exploreRouter = express.Router();

exploreRouter.get("/explore", auth, explore);

export default exploreRouter;
