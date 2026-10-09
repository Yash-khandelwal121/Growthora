import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'http://localhost:5000/api/v1' : '/api/v1'),
  withCredentials: true,
  timeout: 30_000,
});

function getVisitorId() {
  const key = 'growthora.visitorId';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

api.interceptors.request.use((config) => {
  config.headers.set('X-Visitor-Id', getVisitorId());
  const token = localStorage.getItem('growthora.adminToken');
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401 && localStorage.getItem('growthora.adminToken') && !error.config?.url?.includes('/admin/auth/login')) {
    localStorage.removeItem('growthora.adminToken');
    localStorage.removeItem('growthora.adminUser');
    window.location.assign('/admin/login');
  }
  return Promise.reject(error);
});

export function visitorId() {
  return getVisitorId();
}

export async function getData(url, params) {
  const response = await api.get(url, { params });
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'The API returned an unexpected response.');
  }
  return response.data.data;
}

export async function postData(url, body) {
  const response = await api.post(url, body);
  return response.data.data;
}

export function apiError(error) {
  const axiosError = error;
  if (axiosError.code === 'ECONNABORTED' || /timeout/i.test(axiosError.message || '')) {
    return 'This review took longer than expected. Try again with fewer links, or review your website and social profiles separately.';
  }
  return axiosError.response?.data?.meta?.errors?.[0]?.message
    || axiosError.response?.data?.message
    || axiosError.message
    || 'Something went wrong. Please try again.';
}

export async function track(type, path, meta) {
  try {
    await api.post('/track', { visitorId: getVisitorId(), type, path, meta, referrer: document.referrer });
  } catch (err) {
    // ignore tracking errors
  }
}

export default api;
