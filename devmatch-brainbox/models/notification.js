import mongoose from "mongoose";
import User from "./user.js";

const notificationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["connection", "chat"],
      set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      required: true,
      enum: ["read", "unread"],
      default: "unread",
      set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
