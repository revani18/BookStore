import { API } from "../_api";

// Mengambil semua genre
export const getGenres = async () => {
  return await API.get("/genres");
};

// Mengambil detail genre
export const getGenre = async (id) => {
  return await API.get(`/genres/${id}`);
};

// Menambahkan genre
export const createGenre = async (data) => {
  return await API.post("/genres", data);
};

// Memperbarui genre
export const updateGenre = async (id, data) => {
  return await API.put(`/genres/${id}`, data);
};

// Menghapus genre
export const deleteGenre = async (id) => {
  return await API.delete(`/genres/${id}`);
};
