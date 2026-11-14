import axios from "axios";

const url =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL: `${url}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const storageUrl = `${url}/storage`;
export const bookImageStorage = `${storageUrl}/books`;
export const authorImageStorage = `${storageUrl}/authors`;
export const profileImageStorage = `${storageUrl}/profile-photos`;