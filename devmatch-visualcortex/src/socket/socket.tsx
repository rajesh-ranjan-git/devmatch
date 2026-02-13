import io from "socket.io-client";
import { BASE_HOST_URL } from "@/lib/api/apiUtils";

export const createSocketConnection = () => {
  return io(BASE_HOST_URL);
};
