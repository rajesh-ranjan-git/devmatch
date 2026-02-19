import { Server } from "socket.io";
import {
  BRAINBOX_HOST_URL,
  VISUALCORTEX_HOST_URL,
} from "../config/constants.js";
import { getSecretRoomId } from "../utils/utils.js";
import { verifyJwtToken } from "../utils/authUtils.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [BRAINBOX_HOST_URL, VISUALCORTEX_HOST_URL],
      credentials: true,
    },
  });

  const onlineUsers = new Map();
  const typingUsers = new Map();

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error("Authentication required"));

    try {
      const payload = verifyJwtToken(token);
      socket.data.user = payload;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;

    if (userId) {
      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("joinChat", ({ targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.join(roomId);
    });

    socket.on("sendMessage", ({ targetUserId, message }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("receivedMessage", message);
    });

    socket.on("editMessage", ({ targetUserId, messageId, newText }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("messageEdited", { messageId, newText });
    });

    socket.on("deleteMessage", ({ targetUserId, messageId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("messageDeleted", { messageId });
    });

    socket.on("joinGroupChat", ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on("leaveGroupChat", ({ conversationId }) => {
      socket.leave(conversationId);
    });

    socket.on("sendGroupMessage", ({ conversationId, message }) => {
      io.to(conversationId).emit("receivedGroupMessage", message);
    });

    socket.on(
      "editGroupMessage",
      ({ conversationId, messageId, newMessage }) => {
        io.to(conversationId).emit("groupMessageEdited", {
          messageId,
          newMessage,
        });
      },
    );

    socket.on("deleteGroupMessage", ({ conversationId, messageId }) => {
      io.to(conversationId).emit("groupMessageDeleted", { messageId });
    });

    socket.on("typing", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.to(roomId).emit("userTyping", { userId });
    });

    socket.on("stopTyping", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.to(roomId).emit("userStoppedTyping", { userId });
    });

    socket.on("groupTyping", ({ userId, conversationId }) => {
      if (!typingUsers.has(conversationId)) {
        typingUsers.set(conversationId, new Set());
      }
      typingUsers.get(conversationId).add(userId);

      socket.to(conversationId).emit("usersTyping", {
        conversationId,
        typingUserIds: Array.from(typingUsers.get(conversationId)),
      });
    });

    socket.on("groupStopTyping", ({ userId, conversationId }) => {
      typingUsers.get(conversationId)?.delete(userId);

      socket.to(conversationId).emit("usersTyping", {
        conversationId,
        typingUserIds: Array.from(typingUsers.get(conversationId) || []),
      });
    });

    socket.on("disconnect", () => {
      typingUsers.forEach((users, conversationId) => {
        if (users.has(userId)) {
          users.delete(userId);
          io.to(conversationId).emit("usersTyping", {
            conversationId,
            typingUserIds: Array.from(users),
          });
        }
      });

      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};
