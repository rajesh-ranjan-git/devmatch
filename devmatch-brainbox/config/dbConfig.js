import dotenv from "dotenv";
import path from "path";

import { DatabaseConfigError } from "../errors/CustomError.js";
import { errorMessages, status } from "./config.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env-production"
    : ".env-development";

dotenv.config({
  path: path.resolve(process.cwd(), "env", envFile),
});

const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
const DB_BASE_URI = process.env.DB_BASE_URI;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

let DB_URI = "";

try {
  if (!DB_BASE_URI || !DB_CLUSTER || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new DatabaseConfigError(
      status.internalServerError,
      errorMessages.DB_CONFIG_ERROR,
      {
        DB_BASE_URI,
        DB_CLUSTER,
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
      }
    );
  }

  DB_URI = `${DB_BASE_URI}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;
} catch (error) {
  DB_URI = DB_LOCAL_URI || "mongodb://localhost:27017/";
}

export const DB_URL = DB_URI;
