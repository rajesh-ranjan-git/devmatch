import mongoose from "mongoose";
import { DB_URL } from "../config/config.js";

const connectDB = async () => {
  console.log("INFO :: Connecting DevMatch database...");

  try {
    await mongoose.connect(DB_URL);
    console.log("INFO :: DEVMATCH DB CONNECTED");
  } catch (error) {
    console.error(
      `ERROR :: DB connection failed with message : ${error.message}`
    );
    process.exit(1);
  }
};

export default connectDB;
