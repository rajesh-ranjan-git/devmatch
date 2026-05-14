import { io, Socket } from "socket.io-client";
import { HOST_URL } from "@/constants/env.constants";
import { useAppStore } from "@/store/store";
import { SocketConfigType } from "@/types/types/socket.types";

export const createSocketConnection = ({ token }: SocketConfigType): Socket => {
  const accessToken = token ?? useAppStore.getState().accessToken;

  if (!accessToken) {
    throw new Error("Socket connection failed!");
  }

  const isLocal =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  const socket = io(HOST_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    auth: { token: accessToken },
    ...(!isLocal && { path: "/brainbox/socket.io" }),
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1_000,
    reconnectionDelayMax: 30_000,
    randomizationFactor: 0.5,
    timeout: 20_000,
  });

  const manager = socket.io;
  logger.info("[Socket.io] URL:", (manager as any).uri);
  logger.info("[Socket.io] Path:", socket.io.opts.path);

  socket.on("connect", () => {
    logger.info("[Socket.io] Connected — ID:", socket.id);
    logger.info("[Socket.io] Transport:", socket.io.engine.transport.name);
  });

  socket.io.on("open", () => {
    console.log("[Socket.io] Engine URL:", socket.io.engine.transport.name);
    console.log("[Socket.io] Hostname:", (socket.io.engine as any).hostname);
    console.log("[Socket.io] Port:", (socket.io.engine as any).port);
  });

  socket.io.on("reconnect_attempt", () => {
    socket.auth = { token: useAppStore.getState().accessToken };
  });

  return socket;
};
