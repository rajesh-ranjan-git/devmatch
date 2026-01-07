export const BASE_HOST_URL = process.env.NEXT_PUBLIC_BRAINBOX_HOST_URL;
export const BASE_API_URL = `${BASE_HOST_URL}/api`;

export const apiUrls = {
  checkAuth: `${BASE_API_URL}/user/checkAuth`,
  register: `${BASE_API_URL}/user/register`,
  login: `${BASE_API_URL}/user/login`,
  logout: `${BASE_API_URL}/user/logout`,
  forgotPassword: `${BASE_API_URL}/user/forgot-password`,
  viewProfile: `${BASE_API_URL}/profile/view`,
  updateProfile: `${BASE_API_URL}/profile/update`,
  deleteAccount: `${BASE_API_URL}/profile/delete`,
  explore: `${BASE_API_URL}/explore`,
  connect: `${BASE_API_URL}/connection/connect`,
  viewConnections: `${BASE_API_URL}/connection/connections`,
  viewRequests: `${BASE_API_URL}/connection/requests`,
} as const;
