import io from "socket.io-client";
import { BASE_HOST_URL } from "@/lib/api/apiUtils";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_HOST_URL);
  } else {
    return io(BASE_HOST_URL, { path: "/api/socket.io" });
  }
};
