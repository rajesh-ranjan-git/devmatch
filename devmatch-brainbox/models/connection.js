import mongoose from "mongoose";
import User from "./user";

const connectionSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  status: {
    type: String,
    enum: ["pending", "accept", "reject", "blocked"],
    required: true,
    default: "pending",
    set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
  },
});

const Connection = mongoose.Model("Connection", connectionSchema);

export default Connection;
