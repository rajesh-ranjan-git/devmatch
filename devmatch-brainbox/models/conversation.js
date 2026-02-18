import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
