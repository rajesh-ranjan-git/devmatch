import socket from "socket.io";

export const initializeSocket = (server) => {
  const io = socket(server, {
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
