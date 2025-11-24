// lib/api/apiHandler.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Standardized API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    statusCode?: number;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Error types for comprehensive error handling
 */
export enum ApiErrorType {
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  CONFLICT_ERROR = "CONFLICT_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  CANCELLED_ERROR = "CANCELLED_ERROR",
}

/**
 * Configuration options for API calls
 */
export interface ApiCallOptions extends AxiosRequestConfig {
  withCredentials?: boolean;
  skipErrorToast?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
  customErrorHandler?: (error: ApiResponse) => void;
}

/**
 * Create a configured axios instance
 */
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BRAINBOX_HOST_URL,
    timeout: 30000, // 30 seconds default timeout
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Request interceptor for adding auth tokens, etc.
  instance.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

/**
 * Determine error type from axios error
 */
const getErrorType = (error: AxiosError): ApiErrorType => {
  if (!error.response) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return ApiErrorType.TIMEOUT_ERROR;
    }
    if (axios.isCancel(error)) {
      return ApiErrorType.CANCELLED_ERROR;
    }
    return ApiErrorType.NETWORK_ERROR;
  }

  const statusCode = error.response.status;

  switch (statusCode) {
    case 400:
      return ApiErrorType.VALIDATION_ERROR;
    case 401:
      return ApiErrorType.AUTHENTICATION_ERROR;
    case 403:
      return ApiErrorType.AUTHORIZATION_ERROR;
    case 404:
      return ApiErrorType.NOT_FOUND_ERROR;
    case 409:
      return ApiErrorType.CONFLICT_ERROR;
    case 429:
      return ApiErrorType.RATE_LIMIT_ERROR;
    case 500:
    case 502:
    case 503:
    case 504:
      return ApiErrorType.SERVER_ERROR;
    default:
      return ApiErrorType.UNKNOWN_ERROR;
  }
};

/**
 * Get user-friendly error message
 */
const getErrorMessage = (
  error: AxiosError,
  errorType: ApiErrorType
): string => {
  // Try to extract message from response
  if (error.response?.data) {
    const data = error.response.data as any;
    if (data.message) return data.message;
    if (data.error)
      return typeof data.error === "string" ? data.error : data.error.message;
  }

  // Fallback messages based on error type
  const fallbackMessages: Record<ApiErrorType, string> = {
    [ApiErrorType.NETWORK_ERROR]:
      "Network error. Please check your internet connection.",
    [ApiErrorType.TIMEOUT_ERROR]: "Request timed out. Please try again.",
    [ApiErrorType.VALIDATION_ERROR]:
      "Invalid request data. Please check your input.",
    [ApiErrorType.AUTHENTICATION_ERROR]:
      "Authentication failed. Please log in again.",
    [ApiErrorType.AUTHORIZATION_ERROR]:
      "You do not have permission to perform this action.",
    [ApiErrorType.NOT_FOUND_ERROR]: "The requested resource was not found.",
    [ApiErrorType.CONFLICT_ERROR]: "The requested resource already exists.",
    [ApiErrorType.SERVER_ERROR]: "Server error. Please try again later.",
    [ApiErrorType.RATE_LIMIT_ERROR]:
      "Too many requests. Please try again later.",
    [ApiErrorType.CANCELLED_ERROR]: "Request was cancelled.",
    [ApiErrorType.UNKNOWN_ERROR]: "An unexpected error occurred.",
  };

  return fallbackMessages[errorType] || "An error occurred. Please try again.";
};

/**
 * Sleep utility for retry mechanism
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Main API call handler with comprehensive error handling
 */
export async function apiCall<T = any>(
  config: AxiosRequestConfig,
  options: ApiCallOptions = {}
): Promise<ApiResponse<T>> {
  const {
    withCredentials = true,
    skipErrorToast = false,
    retryAttempts = 0,
    retryDelay = 1000,
    customErrorHandler,
    ...axiosConfig
  } = options;

  let lastError: AxiosError | Error | null = null;
  let attempt = 0;

  while (attempt <= retryAttempts) {
    try {
      const response: AxiosResponse<T> = await axiosInstance({
        ...config,
        ...axiosConfig,
      });

      return {
        success: true,
        data: response.data,
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: response.headers["x-request-id"],
        },
      };
    } catch (error) {
      lastError = error as AxiosError | Error;
      attempt++;

      // Don't retry on certain errors
      if (axios.isAxiosError(error)) {
        const errorType = getErrorType(error);
        const shouldRetry =
          attempt <= retryAttempts &&
          (errorType === ApiErrorType.NETWORK_ERROR ||
            errorType === ApiErrorType.TIMEOUT_ERROR ||
            errorType === ApiErrorType.SERVER_ERROR);

        if (!shouldRetry) {
          break;
        }

        // Exponential backoff
        if (attempt <= retryAttempts) {
          await sleep(retryDelay * Math.pow(2, attempt - 1));
        }
      } else {
        // Non-axios errors should not be retried
        break;
      }
    }
  }

  // Handle the final error
  if (axios.isAxiosError(lastError)) {
    const errorType = getErrorType(lastError);
    const errorMessage = getErrorMessage(lastError, errorType);

    const errorResponse: ApiResponse<T> = {
      success: false,
      error: {
        message: errorMessage,
        code: errorType,
        statusCode: lastError.response?.status,
        details: lastError.response?.data,
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };

    // Handle authentication errors (redirect to login)
    if (errorType === ApiErrorType.AUTHENTICATION_ERROR) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        // You can dispatch a logout action or redirect here
        // window.location.href = '/login';
      }
    }

    // Call custom error handler if provided
    if (customErrorHandler) {
      customErrorHandler(errorResponse);
    }

    return errorResponse;
  } else {
    // Handle non-axios errors (e.g., network errors, programming errors)
    const errorResponse: ApiResponse<T> = {
      success: false,
      error: {
        message: lastError?.message || "An unexpected error occurred",
        code: ApiErrorType.UNKNOWN_ERROR,
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };

    if (customErrorHandler) {
      customErrorHandler(errorResponse);
    }

    return errorResponse;
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T = any>(url: string, options?: ApiCallOptions) =>
    apiCall<T>({ method: "GET", url }, options),

  post: <T = any>(url: string, data?: any, options?: ApiCallOptions) =>
    apiCall<T>({ method: "POST", url, data }, options),

  put: <T = any>(url: string, data?: any, options?: ApiCallOptions) =>
    apiCall<T>({ method: "PUT", url, data }, options),

  patch: <T = any>(url: string, data?: any, options?: ApiCallOptions) =>
    apiCall<T>({ method: "PATCH", url, data }, options),

  delete: <T = any>(url: string, options?: ApiCallOptions) =>
    apiCall<T>({ method: "DELETE", url }, options),
};

/**
 * Create an abort controller for cancellable requests
 */
export const createCancellableRequest = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};

// Export axios instance for advanced usage
export { axiosInstance };
