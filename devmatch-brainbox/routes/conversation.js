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
// conversationRouter.get("/groups", auth, groups);
conversationRouter.post("/chats/:id", auth, chatMessages);
// conversationRouter.post("/groups/:id", auth, groupChatMessages);

export default conversationRouter;
