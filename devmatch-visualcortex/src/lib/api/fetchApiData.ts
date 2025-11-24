// lib/api/fetchApiData.ts
import {
  api,
  createCancellableRequest,
  ApiResponse,
  ApiCallOptions,
} from "./apiHandler";

/**
 * HTTP methods supported by the API
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Configuration options for universal API requests
 */
export interface FetchApiOptions extends ApiCallOptions {
  method?: HttpMethod;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  cancellable?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiResponse["error"]) => void;
  enableLogging?: boolean;
}

/**
 * Result returned from fetchApiData
 */
export interface FetchApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: ApiResponse["error"];
  cancel?: () => void;
}

/**
 * Universal function to make any API call with comprehensive error handling
 *
 * @param url - API endpoint URL
 * @param options - Configuration options for the request
 * @returns Promise with result and optional cancel function
 *
 * @example
 * // Simple GET request
 * const result = await fetchApiData('/api/users');
 * if (result.success) {
 *   console.log(result.data);
 * }
 *
 * @example
 * // POST request with data
 * const result = await fetchApiData('/api/orders', {
 *   method: 'POST',
 *   data: { productId: 123, quantity: 2 }
 * });
 *
 * @example
 * // With retry logic
 * const result = await fetchApiData('/api/payment', {
 *   method: 'POST',
 *   data: paymentData,
 *   retryAttempts: 3,
 *   retryDelay: 1000
 * });
 *
 * @example
 * // Cancellable request
 * const result = await fetchApiData('/api/search', {
 *   params: { q: searchTerm },
 *   cancellable: true
 * });
 * // Later cancel if needed: result.cancel?.();
 *
 * @example
 * // With custom handlers
 * const result = await fetchApiData('/api/submit', {
 *   method: 'POST',
 *   data: formData,
 *   onSuccess: (data) => toast.success('Submitted successfully!'),
 *   onError: (error) => toast.error(error?.message)
 * });
 *
 * @example
 * // With query parameters
 * const result = await fetchApiData('/api/products', {
 *   params: { category: 'electronics', page: 1, limit: 20 }
 * });
 */
export async function fetchApiData<T = any>(
  url: string,
  options: FetchApiOptions = {}
): Promise<FetchApiResult<T>> {
  const {
    method = "GET",
    data,
    params,
    headers,
    withCredentials = true,
    cancellable = false,
    retryAttempts = 0,
    retryDelay = 1000,
    timeout,
    onSuccess,
    onError,
    enableLogging = process.env.NODE_ENV === "development",
    customErrorHandler,
    skipErrorToast = false,
  } = options;

  let cancelFunction: (() => void) | undefined;
  let apiResponse: ApiResponse<T>;

  try {
    // Log request if enabled
    if (enableLogging) {
      console.group(`🌐 API Request: ${method} ${url}`);
      console.log("Payload:", data);
      console.log("Params:", params);
      console.log("Options:", { withCredentials, retryAttempts, timeout });
      console.groupEnd();
    }

    // Setup cancellable request if needed
    const requestOptions: ApiCallOptions = {
      retryAttempts,
      retryDelay,
      skipErrorToast,
      customErrorHandler,
      params,
      headers,
      withCredentials,
    };

    if (timeout) {
      requestOptions.timeout = timeout;
    }

    if (cancellable) {
      const { signal, cancel } = createCancellableRequest();
      requestOptions.signal = signal;
      cancelFunction = cancel;
    }

    // Make the API call based on method
    switch (method.toUpperCase()) {
      case "GET":
        apiResponse = await api.get<T>(url, requestOptions);
        break;
      case "POST":
        apiResponse = await api.post<T>(url, data, requestOptions);
        break;
      case "PUT":
        apiResponse = await api.put<T>(url, data, requestOptions);
        break;
      case "PATCH":
        apiResponse = await api.patch<T>(url, data, requestOptions);
        break;
      case "DELETE":
        apiResponse = await api.delete<T>(url, requestOptions);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    // Log response if enabled
    if (enableLogging) {
      console.group(`📡 API Response: ${method} ${url}`);
      console.log("Success:", apiResponse.success);
      if (apiResponse.success) {
        console.log("Data:", apiResponse.data);
      } else {
        console.error("Error:", apiResponse.error);
      }
      console.groupEnd();
    }

    // Handle success case
    if (apiResponse.success) {
      // Call success callback if provided
      if (onSuccess && apiResponse.data) {
        try {
          onSuccess(apiResponse.data);
        } catch (callbackError) {
          console.error("Error in onSuccess callback:", callbackError);
        }
      }

      return {
        success: true,
        data: apiResponse.data,
        cancel: cancelFunction,
      };
    }

    // Handle error case
    // Call error callback if provided
    if (onError && apiResponse.error) {
      try {
        onError(apiResponse.error);
      } catch (callbackError) {
        console.error("Error in onError callback:", callbackError);
      }
    }

    return {
      success: false,
      error: apiResponse.error,
      cancel: cancelFunction,
    };
  } catch (error) {
    // This catch block handles any unexpected errors that might occur
    // The apiHandler already handles all axios errors, so this is just a safety net
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    if (enableLogging) {
      console.error("❌ Unexpected error in fetchApiData:", error);
    }

    const unexpectedError = {
      message: errorMessage,
      code: "UNEXPECTED_ERROR",
    };

    // Call error callback if provided
    if (onError) {
      try {
        onError(unexpectedError);
      } catch (callbackError) {
        console.error("Error in onError callback:", callbackError);
      }
    }

    return {
      success: false,
      error: unexpectedError,
      cancel: cancelFunction,
    };
  }
}

/**
 * Convenience methods for common use cases
 */
export const apiClient = {
  /**
   * Make a GET request
   */
  get: <T = any>(url: string, options?: Omit<FetchApiOptions, "method">) =>
    fetchApiData<T>(url, { ...options, method: "GET" }),

  /**
   * Make a POST request
   */
  post: <T = any>(
    url: string,
    data?: any,
    options?: Omit<FetchApiOptions, "method" | "data">
  ) => fetchApiData<T>(url, { ...options, method: "POST", data }),

  /**
   * Make a PUT request
   */
  put: <T = any>(
    url: string,
    data?: any,
    options?: Omit<FetchApiOptions, "method" | "data">
  ) => fetchApiData<T>(url, { ...options, method: "PUT", data }),

  /**
   * Make a PATCH request
   */
  patch: <T = any>(
    url: string,
    data?: any,
    options?: Omit<FetchApiOptions, "method" | "data">
  ) => fetchApiData<T>(url, { ...options, method: "PATCH", data }),

  /**
   * Make a DELETE request
   */
  delete: <T = any>(url: string, options?: Omit<FetchApiOptions, "method">) =>
    fetchApiData<T>(url, { ...options, method: "DELETE" }),
};
