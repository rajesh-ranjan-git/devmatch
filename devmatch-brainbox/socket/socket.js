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
    socket.on("joinChat", () => {});
    socket.on("sendMessage", () => {});
    socket.on("disconnect", () => {});
  });
};
