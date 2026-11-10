import axios from 'axios';

/**
 * Same-origin now that the API lives in this project's own Route Handlers
 * (src/app/api/v1/**) — no separate API host/CORS to configure.
 */
export const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      // Outside React render/event-handler context (axios interceptor) — useRouter() isn't
      // available here, and a hard navigation is correct anyway to clear stale client state.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  },
);
