import { logger as loggerInstance } from "@/lib/logger";

declare global {
  var logger: typeof loggerInstance;
}

export {};
