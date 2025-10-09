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
  action: {
    type: String,
    enum: ["pending", "accepted", "ignored", "rejected", "blocked"],
    required: true,
    default: "pending",
    set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
  },
  rejectedCount: {
    type: Number,
    required: true,
    default: 0,
    max: 5,
  },
  rejectedByReceiverCount: {
    type: Number,
    required: true,
    default: 0,
    max: 5,
  },
});

const Connection = mongoose.Model("Connection", connectionSchema);

export default Connection;
