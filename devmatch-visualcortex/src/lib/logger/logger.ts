const isServer = typeof window === "undefined";

const ansi = {
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

const css = {
  info: "color:#3b82f6;font-weight:bold;",
  log: "color:#22c55e;font-weight:bold;",
  debug: "color:#a855f7;font-weight:bold;",
  warn: "color:#f59e0b;font-weight:bold;",
  error: "color:#ef4444;font-weight:bold;",
};

const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "N/A";

  return new Date(dateString)
    .toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase());
};

const serverPrint = (
  method: "info" | "log" | "warn" | "error" | "debug",
  color: string,
  label: string,
  args: unknown[],
) => {
  console[method](`${color}${label}`, ...args);
};

const browserPrint = (
  method: "info" | "log" | "warn" | "error" | "debug",
  style: string,
  label: string,
  args: unknown[],
) => {
  console[method](`%c${label}`, style, ...args);
};

export const logger = {
  info: (...args: unknown[]) => {
    if (isServer)
      serverPrint(
        "info",
        ansi.blue,
        `⏰ [${formatDate(new Date())}] 📢 INFO =>`,
        args,
      );
    else
      browserPrint(
        "info",
        css.info,
        `⏰ [${formatDate(new Date())}] 📢 INFO =>`,
        args,
      );
  },

  log: (...args: unknown[]) => {
    if (isServer)
      serverPrint(
        "log",
        ansi.green,
        `⏰ [${formatDate(new Date())}] 📝 LOG =>`,
        args,
      );
    else
      browserPrint(
        "log",
        css.log,
        `⏰ [${formatDate(new Date())}] 📝 LOG =>`,
        args,
      );
  },

  debug: (...args: unknown[]) => {
    if (isServer)
      serverPrint(
        "debug",
        ansi.magenta,
        `⏰ [${formatDate(new Date())}] 🐞 DEBUG =>`,
        args,
      );
    else
      browserPrint(
        "log",
        css.debug,
        `⏰ [${formatDate(new Date())}] 🐞 DEBUG =>`,
        args,
      );
  },

  warn: (...args: unknown[]) => {
    if (isServer)
      serverPrint(
        "warn",
        ansi.yellow,
        `⏰ [${formatDate(new Date())}] 🚨 WARNING =>`,
        args,
      );
    else
      browserPrint(
        "warn",
        css.warn,
        `⏰ [${formatDate(new Date())}] 🚨 WARNING =>`,
        args,
      );
  },

  error: (...args: unknown[]) => {
    if (isServer)
      serverPrint(
        "error",
        ansi.red,
        `⏰ [${formatDate(new Date())}] ❌ ERROR =>`,
        args,
      );
    else
      browserPrint(
        "error",
        css.error,
        `⏰ [${formatDate(new Date())}] ❌ ERROR =>`,
        args,
      );
  },
};

if (!globalThis.logger) {
  globalThis.logger = logger;
}
