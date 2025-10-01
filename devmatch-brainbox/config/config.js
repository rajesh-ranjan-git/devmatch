import dotenv from "dotenv";
import path from "path";

import { DatabaseError } from "../errors/CustomError.js";

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

let DB_URI = "";

try {
  if (!DB_BASE_URI || !DB_CLUSTER || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new DatabaseError("Database configuration not found!", {
      DB_BASE_URI,
      DB_CLUSTER,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
    });
  }

  DB_URI = `${DB_BASE_URI}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/`;
} catch (error) {
  DB_URI = process.env.DB_URI || "mongodb://localhost:27017/";
}

export const DB_URL = DB_URI;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
