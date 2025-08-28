import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
const envFile =
  process.env.NODE_ENV === "production" ? ".env-production" : ".env-dev";

dotenv.config({
  path: path.resolve(process.cwd(), "env", envFile),
});

const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

if (!DB_URI || !DB_NAME) {
  throw new Error("DB CONFIGURATION NOT FOUND");
}

const connectDB = async () => {
  console.log("Connecting DevMatch database...");

  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log("DEVMATCH DB CONNECTED");
  } catch (error) {
    console.error(
      `ERROR :: DB connection failed with message : ${error.message}`
    );
    process.exit(1);
  }
};

export default connectDB;
