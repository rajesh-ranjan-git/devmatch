import express from "express";

import { explore } from "../controllers/explore.js";

const exploreRouter = express.Router();

exploreRouter.get("/explore", explore);

export default exploreRouter;
