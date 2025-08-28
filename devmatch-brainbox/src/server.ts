import express from "express";
import * as dotenv from "dotenv";
import path from "path";

import connectDB from "../db/connectDB.ts";

// Determine environment
const envFile =
  process.env.NODE_ENV === "production" ? ".env-production" : ".env-local";

// Load the .env file from env folder
dotenv.config({ path: path.resolve(process.cwd(), "env", envFile) });

const BRAINBOX_PORT = process.env.BRAINBOX_PORT || 7000;
const BRAINBOX_HOST_URL =
  process.env.BRAINBOX_HOST_URL || "http://localhost:7000/";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: `Server is running at ${BRAINBOX_HOST_URL} on PORT : ${BRAINBOX_PORT}`,
  });
});

server.listen(BRAINBOX_PORT, () => {
  connectDB().then(() => {
    console.log(
      `Server is running at ${BRAINBOX_HOST_URL} on PORT : ${BRAINBOX_PORT}`
    );
  });
});
