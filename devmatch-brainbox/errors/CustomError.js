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
        console.error("Error in onError callback:", callbackError);
      }
    }
  }

  _logToConsole(errorObject) {
    const logMessage = `[${errorObject.type}] ${errorObject.message}`;

    switch (this.config.logLevel) {
      case "error":
        console.error("ERROR :: ", logMessage, errorObject.data || "");
        break;
      case "warn":
        console.warn("WARNING :: ", logMessage, errorObject.data || "");
        break;
      case "info":
        console.info("INFO :: ", logMessage, errorObject.data || "");
        break;
      default:
        console.log("LOG :: ", logMessage, errorObject.data || "");
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
  constructor(type, message, data = null) {
    super(message);
    this.name = type;
    this.type = type;
    this.data = data;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    errorManager.logError(this.toJSON());
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

class NetworkError extends CustomError {
  constructor(message, data = null) {
    super("NETWORK_ERROR", message, data);
  }
}

class DatabaseError extends CustomError {
  constructor(message, data = null) {
    super("DATABASE_ERROR", message, data);
  }
}

class ValidationError extends CustomError {
  constructor(message, data = null) {
    super("VALIDATION_ERROR", message, data);
  }
}

class AuthenticationError extends CustomError {
  constructor(message, data = null) {
    super("AUTHENTICATION_ERROR", message, data);
  }
}

export {
  CustomError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  DatabaseError,
  errorManager,
};

export default CustomError;

errorManager.configure({
  logToConsole: true,
  logLevel: "error",
  onError: (error) => {
    if (process.env.NODE_ENV === "development") {
      console.log("LOG :: [Error Data] ", error.data);
      console.log("LOG :: [Error Stack trace] ", error.stack);
    }
  },
});
