import { BASE_API_URL } from "@/lib/api/apiUtils";
import io from "socket.io-client";

export const createSocketConnection = () => {
  return io(BASE_API_URL);
};
