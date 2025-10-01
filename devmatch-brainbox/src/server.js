import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { status } from "../config/config.js";
import connectDB from "../db/connectDB.js";

import userRouter from "../routes/user.js";
import profileRouter from "../routes/profile.js";
import connectionRouter from "../routes/connection.js";
import notificationRouter from "../routes/notification.js";
import exploreRouter from "../routes/explore.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? "env/env-production"
    : "env/env-development";

dotenv.config({ path: path.resolve(process.cwd(), "env", envFile) });

const BRAINBOX_PORT = process.env.BRAINBOX_PORT || 5000;
const BRAINBOX_HOST_URL =
  process.env.BRAINBOX_HOST_URL || "http://localhost:5000";
const VISUALCORTEX_HOST_URL =
  process.env.VISUALCORTEX_HOST_URL || "http://localhost:3000";

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: [BRAINBOX_HOST_URL, VISUALCORTEX_HOST_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
server.use(cookieParser());

server.use("/user", userRouter);
server.use("/profile", profileRouter);
server.use("/connection", connectionRouter);
server.use("/notification", notificationRouter);
server.use("/", exploreRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    status: status.SUCCESS,
    message: `Server is running at ${BRAINBOX_HOST_URL}`,
  });
});

server.use((err, req, res, next) => {
  console.error("Global Error :", err.message);
  // console.error("Global Error Stack:", err.stack);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    status: status.FAILURE,
    error: {
      apiURL: req?.url,
      message: err.message || "Internal Server Error",
    },
  });
});

server.listen(BRAINBOX_PORT, () => {
  connectDB().then(() => {
    console.log(`INFO :: Server is running at ${BRAINBOX_HOST_URL}`);
  });
});
