import express from "express";

import {
  chats,
  chatMessages,
  groupChats,
  groupChatMessages,
  editMessage,
  deleteMessage,
} from "../controllers/conversation.js";
import auth from "../middlewares/auth.js";

const conversationRouter = express.Router();

// conversationRouter.get("/calls", auth, calls);
conversationRouter.get("/chats", auth, chats);
conversationRouter.get("/chats/:id", auth, chatMessages);
conversationRouter.get("/group-chats", auth, groupChats);
conversationRouter.get("/groups-chats/:id", auth, groupChatMessages);
conversationRouter.patch("/message/:id", auth, editMessage);
conversationRouter.delete("/message/:id", auth, deleteMessage);

export default conversationRouter;
