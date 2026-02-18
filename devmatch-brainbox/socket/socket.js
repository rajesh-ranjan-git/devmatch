import { Server } from "socket.io";
import {
  BRAINBOX_HOST_URL,
  VISUALCORTEX_HOST_URL,
} from "../config/constants.js";
import { getSecretRoomId } from "../utils/utils.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [BRAINBOX_HOST_URL, VISUALCORTEX_HOST_URL],
    },
  });

  const onlineUsers = new Map();
  const typingUsers = new Map();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query?.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      socket.join(roomId);
    });

    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("receivedMessage", message);
    });

    socket.on("editMessage", ({ userId, targetUserId, messageId, newText }) => {
      const roomId = getSecretRoomId([userId, targetUserId]);

      io.to(roomId).emit("messageEdited", { messageId, newText });
    });

    socket.on("deleteMessage", ({ userId, targetUserId, messageId }) => {
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
