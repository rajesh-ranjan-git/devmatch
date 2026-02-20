const ansi = {
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

const formatDate = (dateString) => {
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

const serverPrint = (method = "log", color, label, args) => {
  console[method](`${color}${label}`, ...args);
};

export const logger = {
  info: (...args) => {
    serverPrint(
      "info",
      ansi.blue,
      `⏰ [${formatDate(Date.now())}] 📢 INFO\t=>`,
      args,
    );
  },

  log: (...args) => {
    serverPrint(
      "log",
      ansi.green,
      `⏰ [${formatDate(Date.now())}] 📝 LOG\t=>`,
      args,
    );
  },

  debug: (...args) => {
    serverPrint(
      "debug",
      ansi.magenta,
      `⏰ [${formatDate(Date.now())}] 🐞 DEBUG\t=>`,
      args,
    );
  },

  warn: (...args) => {
    serverPrint(
      "warn",
      ansi.yellow,
      `⏰ [${formatDate(Date.now())}] 🚨 WARNING\t=>`,
      args,
    );
  },

  error: (...args) => {
    serverPrint(
      "error",
      ansi.red,
      `⏰ [${formatDate(Date.now())}] ❌ ERROR\t=>`,
      args,
    );
  },
};

if (!globalThis.logger) {
  globalThis.logger = logger;
}
