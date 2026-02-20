import { errorTypes } from "../config/config.js";

class ErrorHandlerManager {
  constructor() {
    if (ErrorHandlerManager.instance) {
      return ErrorHandlerManager.instance;
    }

    this.config = {
      logToConsole: true,
      logLevel: "error",
      onError: null,
    };
    this.errorLog = [];

    ErrorHandlerManager.instance = this;
  }

  configure(options = {}) {
    this.config = { ...this.config, ...options };
  }

  logError(errorObject) {
    this.errorLog.push(errorObject);

    if (this.config.logToConsole) {
      this._logToConsole(errorObject);
    }

    if (typeof this.config.onError === "function") {
      try {
        this.config.onError(errorObject);
      } catch (callbackError) {
        console.error("❌ ERROR :: Error in onError callback:", callbackError);
      }
    }
  }

  _logToConsole(errorObject) {
    const logMessage = `[${errorObject.type}] ${errorObject.message}`;

    switch (this.config.logLevel) {
      case "error":
        console.error("❌ ERROR :: ", logMessage);
        break;
      case "warn":
        console.warn("🚨 WARNING :: ", logMessage);
        break;
      case "info":
        console.info("📢 INFO :: ", logMessage);
        break;
      case "debug":
        console.debug("🛠️ DEBUG :: ", logMessage);
      default:
        console.log("📝 LOG :: ", logMessage);
    }
  }

  getErrors() {
    return this.errorLog;
  }

  getErrorsByType(type) {
    return this.errorLog.filter((err) => err.type === type);
  }

  clearErrors() {
    this.errorLog = [];
  }

  getLastError() {
    return this.errorLog[this.errorLog.length - 1] || null;
  }

  getErrorCount() {
    return this.errorLog.length;
  }
}

const errorManager = new ErrorHandlerManager();

class CustomError extends Error {
  constructor(status, type, message, data = null, apiUrl = "") {
    super(message);
    this.name = type;
    this.status = status;
    this.apiUrl = apiUrl;
    this.type = type;
    this.data = data;
    this.timestamp = new Date().toISOString();

    if (Error?.captureStackTrace) {
      Error?.captureStackTrace(this, this.constructor);
    }

    errorManager.logError(this.toJSON());
  }

  toJSON() {
    return {
      name: this.name,
      status: this.status,
      apiUrl: this.apiUrl,
      type: this.type,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

class NetworkError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.NETWORK_ERROR, message, data, apiUrl);
  }
}

class DatabaseConfigError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.DATABASE_CONFIG_ERROR, message, data, apiUrl);
  }
}

class ValidationError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.VALIDATION_ERROR, message, data, apiUrl);
  }
}

class DatabaseError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.DATABASE_ERROR, message, data, apiUrl);
  }
}

class BcryptError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.BCRYPT_ERROR, message, data, apiUrl);
  }
}

class JwtError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.JWT_ERROR, message, data, apiUrl);
  }
}

class AuthenticationError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.AUTHENTICATION_ERROR, message, data, apiUrl);
  }
}

class ForbiddenError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.FORBIDDEN_ERROR, message, data, apiUrl);
  }
}

class ConnectionError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.CONNECTION_ERROR, message, data, apiUrl);
  }
}

class NotificationError extends CustomError {
  constructor(status, message, data = null, apiUrl) {
    super(status, errorTypes.CONNECTION_ERROR, message, data, apiUrl);
  }
}

export {
  CustomError,
  NetworkError,
  DatabaseConfigError,
  ValidationError,
  DatabaseError,
  BcryptError,
  JwtError,
  AuthenticationError,
  ForbiddenError,
  ConnectionError,
  NotificationError,
  errorManager,
};

export default CustomError;

errorManager.configure({
  logToConsole: true,
  logLevel: "error",
  onError: (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("‼️  ERROR LOG :: [Error] ", {
        status: error?.status?.message,
        statusCode: error?.status?.statusCode,
        url: error?.apiUrl || "",
        type: error?.type,
        message: error?.message,
        data: error?.data,
        timestamp: error?.timestamp,
      });
      // console.error("‼️  ERROR LOG :: [Error Stack trace] ", error?.stack);
    }
  },
});
