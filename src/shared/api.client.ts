import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/auth/auth.store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send/receive cookies
});

// attach token
api.interceptors.request.use((cfg) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

// auto-refresh
let refreshing: Promise<void> | null = null;

api.interceptors.response.use(undefined, async (err: AxiosError) => {
  if (err.response?.status !== 401) {
    throw err;
  }

  /* debounce concurrent 401s */
  refreshing ??= api
    .post('/auth/refresh')
    .then((res) => {
      useAuthStore.getState().setToken(res.data.accessToken);
    })
    .finally(() => {
      refreshing = null;
    });

  await refreshing;

  /* retry original request once */
  const cfg = err.config!;
  cfg.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;
  return api(cfg);
});
