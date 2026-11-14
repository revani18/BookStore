import { API } from "../_api";

// Mengambil semua data pelanggan
export const getUsers = async () => {
  return await API.get("/users");
};

// Mengambil detail pelanggan
export const getUser = async (id) => {
  return await API.get(`/users/${id}`);
};
