import { io, Socket } from "socket.io-client";
import { CLIENT_URL, HOST_URL, MODE } from "@/constants/env.constants";
import { useAppStore } from "@/store/store";
import { SocketConfigType } from "@/types/types/socket.types";

let socketInstance: Socket | null = null;
let socketToken: string | null = null;

export const createSocketConnection = ({ token }: SocketConfigType): Socket => {
  const accessToken = token ?? useAppStore.getState().accessToken;

  if (!accessToken) {
    throw new Error("Socket connection failed!");
  }

  if (socketInstance && socketToken === accessToken) {
    socketInstance.auth = { token: accessToken };

    if (!socketInstance.connected && !socketInstance.active) {
      socketInstance.connect();
    }

    return socketInstance;
  }

  socketInstance?.disconnect();

  const isLocal =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  const socketBaseUrl = MODE === "production" ? CLIENT_URL : HOST_URL;

  const socket = io(socketBaseUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    auth: { token: accessToken },
    path: MODE === "production" ? "/brainbox/socket.io" : "/socket.io",
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1_000,
    reconnectionDelayMax: 30_000,
    randomizationFactor: 0.5,
    timeout: 20_000,
  });

  socketInstance = socket;
  socketToken = accessToken;

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

export const disconnectSocketConnection = () => {
  socketInstance?.disconnect();
  socketInstance = null;
  socketToken = null;
};
