import express from "express";
import * as dotenv from "dotenv";
import path from "path";

// Determine environment
const envFile =
  process.env.NODE_ENV === "production" ? ".env-production" : ".env-local";

// Load the .env file from env folder
dotenv.config({ path: path.resolve(process.cwd(), "env", envFile) });

const BRAINBOX_PORT = process.env.BRAINBOX_PORT;
const BRAINBOX_HOST_URL = process.env.BRAINBOX_HOST_URL;

const server = express();

server.listen(BRAINBOX_PORT, () => {
  console.log(
    `Server is running at ${BRAINBOX_HOST_URL} on PORT : ${BRAINBOX_PORT}`
  );
});
