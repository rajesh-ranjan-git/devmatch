export const BASE_HOST_URL = process.env.NEXT_PUBLIC_BRAINBOX_HOST_URL;
export const BASE_API_URL = `${BASE_HOST_URL}/api`;

export const apiUrls = {
  checkAuth: `${BASE_API_URL}/user/checkAuth`,
} as const;
