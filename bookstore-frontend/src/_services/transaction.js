import { API } from "../_api";

// Membuat transaksi baru (customer)
export const createTransaction = async (data) => {
  return await API.post("/transactions", data);
};

// Mengambil riwayat transaksi customer
export const getMyTransactions = async () => {
  return await API.get("/my-transactions");
};

// Mengambil detail transaksi customer
export const getMyTransaction = async (id) => {
  return await API.get(`/my-transactions/${id}`);
};

// Mengambil semua transaksi (admin)
export const getTransactions = async () => {
  return await API.get("/transactions");
};

// Mengambil detail transaksi (admin)
export const getTransaction = async (id) => {
  return await API.get(`/transactions/${id}`);
};

// Memperbarui status transaksi (admin)
export const updateTransactionStatus = async (id, data) => {
  return await API.patch(`/transactions/${id}/status`, data);
};

// Mengonfirmasi pembayaran transaksi (admin)
export const confirmTransactionPayment = async (id) => {
  return await API.patch(`/transactions/${id}/payment-status`);
};
