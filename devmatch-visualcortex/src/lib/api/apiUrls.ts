export const BASE_HOST_URL = process.env.NEXT_PUBLIC_BRAINBOX_HOST_URL;
export const BASE_API_URL = `${BASE_HOST_URL}/api`;

export const apiUrls = {
  checkAuth: `${BASE_API_URL}/user/checkAuth`,
  register: `${BASE_API_URL}/user/register`,
  login: `${BASE_API_URL}/user/login`,
  forgotPassword: `${BASE_API_URL}/user/forgot-password`,
} as const;
