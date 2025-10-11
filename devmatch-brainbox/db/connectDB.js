import mongoose from "mongoose";

import { DB_URL } from "../config/dbConfig.js";
import { errorMessages, successMessages } from "../config/config.js";

const connectDB = async () => {
  try {
    if (DB_URL.includes("srv")) {
      console.log("INFO :: Connecting DevMatch database...");
    } else {
      console.log("INFO :: Connecting Local DevMatch database...");
    }
    await mongoose.connect(DB_URL);
    console.log(`SUCCESS :: ${successMessages.DB_CONNECTION_SUCCESS}`);
  } catch (error) {
    console.error(
      `ERROR :: ${errorMessages.DB_CONNECTION_ERROR} : ${error.message}`
    );
    process.exit(1);
  }
};

export default connectDB;
