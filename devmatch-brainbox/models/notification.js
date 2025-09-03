import mongoose from "mongoose";
import User from "./user";

const notificationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["request", "chat"],
    set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
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
});

const Notification = mongoose.Model("Notification", notificationSchema);

export default Notification;
