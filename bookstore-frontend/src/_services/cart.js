import { API } from "../_api";

// Mengambil isi keranjang customer
export const getCart = async () => {
  return await API.get("/cart");
};

// Menambahkan buku ke keranjang
export const addToCart = async (data) => {
  return await API.post("/cart", data);
};

// Memperbarui jumlah buku di keranjang
export const updateCart = async (id, data) => {
  return await API.put(`/cart/${id}`, data);
};

// Menghapus buku dari keranjang
export const deleteCart = async (id) => {
  return await API.delete(`/cart/${id}`);
};
