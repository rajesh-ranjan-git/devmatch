import express from "express";

import {
  chats,
  chatMessages,
  groups,
  groupChatMessages,
} from "../controllers/connection.js";
import auth from "../middlewares/auth.js";

const conversationRouter = express.Router();

// conversationRouter.get("/calls", auth, callsList);
conversationRouter.get("/chats", auth, chats);
conversationRouter.get("/groups", auth, groups);
conversationRouter.get("/chats/:id", auth, chatMessages);
conversationRouter.get("/groups/:id", auth, groupChatMessages);
conversationRouter.patch("/messages/:id", auth, chatMessages);
conversationRouter.delete("/messages/:id", auth, groupChatMessages);

export default conversationRouter;
