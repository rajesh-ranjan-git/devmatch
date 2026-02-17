import http from "http";
import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  BRAINBOX_PORT,
  BRAINBOX_HOST_URL,
  VISUALCORTEX_HOST_URL,
} from "../config/constants.js";
import { status } from "../config/config.js";
import connectDB from "../db/connectDB.js";
import userRouter from "../routes/user.js";
import profileRouter from "../routes/profile.js";
import connectionRouter from "../routes/connection.js";
import notificationRouter from "../routes/notification.js";
import conversationRouter from "../routes/conversation.js";
import exploreRouter from "../routes/explore.js";
import { showDevMatchBanner } from "../banner/banner.js";
import { initializeSocket } from "../socket/socket.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? "env/env-production"
    : "env/env-development";

dotenv.config({ path: path.resolve(process.cwd(), "env", envFile) });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [BRAINBOX_HOST_URL, VISUALCORTEX_HOST_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/", exploreRouter);

app.get("/", (req, res) => {
  res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: `Server is running at ${BRAINBOX_HOST_URL}`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ ERROR :: Global error :", err);
  console.error("❌ ERROR :: Global error message :", err?.message);
  console.error("❌ ERROR :: Global error stack:", err.stack);

  const statusCode = err?.statusCode || 500;

  return res.status(statusCode).json({
    status: status.internalServerError.message,
    statusCode: status.internalServerError.statusCode,
    apiUrl: req?.url,
    error: {
      message: err?.message || status.internalServerError.message,
    },
  });
});

const server = http.createServer(app);

initializeSocket(server);

server.listen(BRAINBOX_PORT, async () => {
  await connectDB();
  console.log(`ℹ️️  INFO :: Server is running at ${BRAINBOX_HOST_URL}`);
  await showDevMatchBanner(BRAINBOX_PORT);
});
