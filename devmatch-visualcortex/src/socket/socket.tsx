import io from "socket.io-client";
import { BASE_API_URL } from "@/lib/api/apiUtils";

export const createSocketConnection = () => {
  return io(BASE_API_URL);
};
