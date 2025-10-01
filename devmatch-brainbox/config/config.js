import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env-production"
    : ".env-development";

dotenv.config({
  path: path.resolve(process.cwd(), "env", envFile),
});

const DB_BASE_URI = process.env.DB_BASE_URI;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// if (!DB_BASE_URI || !DB_CLUSTER || !DB_NAME || !DB_USER || !DB_PASSWORD) {
//   throw new Error("DB CONFIGURATION NOT FOUND");
// }

// export const DB_URL = `${DB_BASE_URI}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/`;
export const DB_URL = process.env.DB_URI || "mongodb://localhost:27017/";
