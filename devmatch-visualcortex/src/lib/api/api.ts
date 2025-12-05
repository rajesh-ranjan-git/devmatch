"use server";

import { api, ApiErrorType, ApiOptions, ApiResponse } from "./apiHandler";
import { setCookies } from "./cookiesHandler";

export type ApiMethod =
  | "GET"
  | "get"
  | "POST"
  | "post"
  | "PUT"
  | "put"
  | "PATCH"
  | "patch"
  | "DELETE"
  | "delete";

export interface ApiRequestParams<T = any> {
  method?: ApiMethod;
  url: string;
  data?: T;
  options?: ApiOptions;
}

export async function apiRequest<T = any, D = any>({
  method = "GET",
  url,
  data,
  options,
}: ApiRequestParams<D>): Promise<ApiResponse<T>> {
  switch (method) {
    case "GET":
    case "get":
      const getResult = await api.get<T>(url, options);

      if (getResult && getResult?.metadata && getResult?.metadata?.cookies) {
        await setCookies(getResult?.metadata?.cookies);
      }

      return getResult;
    case "POST":
    case "post":
      const postResult = await api.post<T>(url, data, options);

      if (postResult && postResult?.metadata && postResult?.metadata?.cookies) {
        await setCookies(postResult?.metadata?.cookies);
      }

      return postResult;
    case "PUT":
    case "put":
      const putResult = await api.put<T>(url, data, options);

      if (putResult && putResult?.metadata && putResult?.metadata?.cookies) {
        await setCookies(putResult?.metadata?.cookies);
      }

      return putResult;
    case "PATCH":
    case "patch":
      const patchResult = await api.patch<T>(url, data, options);
      if (
        patchResult &&
        patchResult?.metadata &&
        patchResult?.metadata?.cookies
      ) {
        await setCookies(patchResult?.metadata?.cookies);
      }

      return patchResult;
    case "DELETE":
    case "delete":
      const deleteResult = await api.delete<T>(url, options);
      if (
        deleteResult &&
        deleteResult?.metadata &&
        deleteResult?.metadata?.cookies
      ) {
        await setCookies(deleteResult?.metadata?.cookies);
      }

      return deleteResult;
    default:
      return {
        success: false,
        error: {
          message: `Unsupported HTTP method: ${method}`,
          code: ApiErrorType.VALIDATION_ERROR,
        },
      };
  }
}
