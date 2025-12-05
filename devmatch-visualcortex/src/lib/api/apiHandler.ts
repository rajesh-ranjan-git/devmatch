import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    statusCode?: number;
    details?: any;
  };
}

export enum ApiErrorType {
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  FORBIDDEN_ERROR = "FORBIDDEN_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  CONFLICT_ERROR = "CONFLICT_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
  CANCELLED_ERROR = "CANCELLED_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface ApiOptions
  extends Omit<AxiosRequestConfig, "method" | "url" | "data"> {
  retryAttempts?: number;
  retryDelay?: number;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BRAINBOX_HOST_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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
  const errorMap: Record<number, ApiErrorType> = {
    400: ApiErrorType.VALIDATION_ERROR,
    401: ApiErrorType.AUTHENTICATION_ERROR,
    403: ApiErrorType.FORBIDDEN_ERROR,
    404: ApiErrorType.NOT_FOUND_ERROR,
    409: ApiErrorType.CONFLICT_ERROR,
    429: ApiErrorType.RATE_LIMIT_ERROR,
    500: ApiErrorType.SERVER_ERROR,
    502: ApiErrorType.SERVER_ERROR,
    503: ApiErrorType.SERVER_ERROR,
    504: ApiErrorType.SERVER_ERROR,
  };

  return errorMap[statusCode] || ApiErrorType.UNKNOWN_ERROR;
};

const getErrorMessage = (
  error: AxiosError,
  errorType: ApiErrorType
): string => {
  if (error.response?.data) {
    const data = error.response.data as any;
    if (data.message) return data.message;
    if (data.error)
      return typeof data.error === "string" ? data.error : data.error.message;
  }

  const messages: Record<ApiErrorType, string> = {
    [ApiErrorType.NETWORK_ERROR]:
      "Network error. Please check your internet connection.",
    [ApiErrorType.TIMEOUT_ERROR]: "Request timed out. Please try again.",
    [ApiErrorType.VALIDATION_ERROR]:
      "Invalid request data. Please check your input.",
    [ApiErrorType.AUTHENTICATION_ERROR]:
      "Authentication failed. Please log in again.",
    [ApiErrorType.FORBIDDEN_ERROR]:
      "You do not have permission to perform this action.",
    [ApiErrorType.NOT_FOUND_ERROR]: "The requested resource was not found.",
    [ApiErrorType.CONFLICT_ERROR]: "The requested resource already exists.",
    [ApiErrorType.SERVER_ERROR]: "Server error. Please try again later.",
    [ApiErrorType.RATE_LIMIT_ERROR]:
      "Too many requests. Please try again later.",
    [ApiErrorType.CANCELLED_ERROR]: "Request was cancelled.",
    [ApiErrorType.UNKNOWN_ERROR]: "An unexpected error occurred.",
  };

  return messages[errorType];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleRequest<T>(
  config: AxiosRequestConfig,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { retryAttempts = 0, retryDelay = 1000, ...axiosConfig } = options;

  let lastError: AxiosError | null = null;
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
      };
    } catch (error) {
      lastError = error as AxiosError;
      attempt++;

      if (axios.isAxiosError(error)) {
        const errorType = getErrorType(error);
        const shouldRetry =
          attempt <= retryAttempts &&
          (errorType === ApiErrorType.NETWORK_ERROR ||
            errorType === ApiErrorType.TIMEOUT_ERROR ||
            errorType === ApiErrorType.SERVER_ERROR);

        if (shouldRetry && attempt <= retryAttempts) {
          await sleep(retryDelay * Math.pow(2, attempt - 1));
          continue;
        }
      }
      break;
    }
  }

  const errorType = getErrorType(lastError!);
  const errorMessage = getErrorMessage(lastError!, errorType);

  return {
    success: false,
    error: {
      message: errorMessage,
      code: errorType,
      statusCode: lastError?.response?.status,
      details: lastError?.response?.data,
    },
  };
}

export const api = {
  get: <T = any>(url: string, options?: ApiOptions) =>
    handleRequest<T>({ method: "GET", url }, options),

  post: <T = any>(url: string, data?: any, options?: ApiOptions) =>
    handleRequest<T>({ method: "POST", url, data }, options),

  put: <T = any>(url: string, data?: any, options?: ApiOptions) =>
    handleRequest<T>({ method: "PUT", url, data }, options),

  patch: <T = any>(url: string, data?: any, options?: ApiOptions) =>
    handleRequest<T>({ method: "PATCH", url, data }, options),

  delete: <T = any>(url: string, options?: ApiOptions) =>
    handleRequest<T>({ method: "DELETE", url }, options),
};

export { axiosInstance };
