import { Server } from "socket.io";
import {
  BRAINBOX_HOST_URL,
  VISUALCORTEX_HOST_URL,
} from "../config/constants.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [BRAINBOX_HOST_URL, VISUALCORTEX_HOST_URL],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("-");

      socket.join(roomId);
    });

    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      const roomId = [userId, targetUserId].sort().join("-");

      io.to(roomId).emit("receivedMessage", {
        text: message,
        sentBy: userId,
        sentAt: new Date().toISOString(),
      });
    });

    socket.on("disconnect", ({ userId, targetUserId }) => {});
  });
};
