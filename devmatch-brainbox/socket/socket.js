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

      console.log("debug from server socket roomId : ", roomId);

      socket.join(roomId);
    });
    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      console.log(
        `debug from server socket userId : ${userId} sent message : ${message} to targetUserId : ${targetUserId}`,
      );
    });
    socket.on("disconnect", ({ userId, targetUserId }) => {});
  });
};
