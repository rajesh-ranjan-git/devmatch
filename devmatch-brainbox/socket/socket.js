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
    const userId = socket.data.user;

    if (userId) {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    }

    socket.on("join-chat", ({ targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.join(roomId);
    });

    socket.on("send-message", ({ targetUserId, message }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("received-message", message);
    });

    socket.on("edit-message", ({ targetUserId, messageId, newText }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("message-edited", { messageId, newText });
    });

    socket.on("delete-message", ({ targetUserId, messageId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("message-deleted", { messageId });
    });

    socket.on("join-group-chat", ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on("leave-group-chat", ({ conversationId }) => {
      socket.leave(conversationId);
    });

    socket.on("send-group-message", ({ conversationId, message }) => {
      io.to(conversationId).emit("received-group-message", message);
    });

    socket.on(
      "edit-group-message",
      ({ conversationId, messageId, newMessage }) => {
        io.to(conversationId).emit("group-message-edited", {
          messageId,
          newMessage,
        });
      },
    );

    socket.on("delete-group-message", ({ conversationId, messageId }) => {
      io.to(conversationId).emit("group-message-deleted", { messageId });
    });

    socket.on("typing", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.to(roomId).emit("user-typing", { userId });
    });

    socket.on("stop-typing", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.to(roomId).emit("user-stopped-typing", { userId });
    });

    socket.on("group-typing", ({ userId, conversationId }) => {
      if (!typingUsers.has(conversationId)) {
        typingUsers.set(conversationId, new Set());
      }
      typingUsers.get(conversationId).add(userId);

      socket.to(conversationId).emit("usersTyping", {
        conversationId,
        typingUserIds: Array.from(typingUsers.get(conversationId)),
      });
    });

    socket.on("group-stop-typing", ({ userId, conversationId }) => {
      typingUsers.get(conversationId)?.delete(userId);

      socket.to(conversationId).emit("users-typing", {
        conversationId,
        typingUserIds: Array.from(typingUsers.get(conversationId) || []),
      });
    });

    socket.on("disconnect", () => {
      typingUsers.forEach((users, conversationId) => {
        if (users.has(userId)) {
          users.delete(userId);
          io.to(conversationId).emit("users-typing", {
            conversationId,
            typingUserIds: Array.from(users),
          });
        }
      });

      onlineUsers.delete(userId);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};
