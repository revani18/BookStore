import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {confirmTransactionPayment, getTransactions } from "../../../_services/transaction";


let cachedTransactions = null;

export default function AdminTransactions() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(
    cachedTransactions || [],
  );
  const [loading, setLoading] = useState(!cachedTransactions);
  const [search, setSearch] = useState("");
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      if (!cachedTransactions) {
        setLoading(true);
      }

      const response = await getTransactions();

      cachedTransactions = response.data;
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data transaksi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      await fetchTransactions();
    };

    loadTransactions();
  }, [fetchTransactions]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleConfirmPayment = async (transaction) => {
    const confirmed = window.confirm(
      `Konfirmasi pembayaran untuk pesanan ${transaction.order_number}?`,
    );

    if (!confirmed) return;

    try {
      setConfirmingId(transaction.id);

      const response = await confirmTransactionPayment(transaction.id);
      const updatedTransaction = response.data.data;
      const updatedTransactions = transactions.map((item) =>
        item.id === updatedTransaction.id
          ? { ...item, ...updatedTransaction, user: item.user }
          : item,
      );

      setTransactions(updatedTransactions);
      alert("Pembayaran berhasil dikonfirmasi.");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Gagal mengonfirmasi pembayaran. Silakan coba kembali.",
      );
    } finally {
      setConfirmingId(null);
    }
  };

  const orderStatusLabel = {
    pending: "Menunggu",
    processing: "Diproses",
    shipped: "Dikirim",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  const paymentStatusLabel = {
    pending: "Menunggu Pembayaran",
    paid: "Lunas",
    failed: "Gagal",
    expired: "Kedaluwarsa",
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const keyword = search.toLowerCase();

    return (
      transaction.order_number?.toLowerCase().includes(keyword) ||
      transaction.recipient_name?.toLowerCase().includes(keyword) ||
      transaction.user?.name?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Data Transaksi
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pesanan dan pantau pembayaran pelanggan.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor pesanan atau pelanggan..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total{" "}
          <span className="font-semibold text-gray-800">
            {filteredTransactions.length}
          </span>{" "}
          transaksi
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">No. Pesanan</th>
              <th className="px-5 py-4">Pelanggan</th>
              <th className="px-5 py-4">Tanggal</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status Pesanan</th>
              <th className="px-5 py-4">Pembayaran</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Memuat data transaksi...
                </td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-receipt mb-2 block text-2xl text-gray-300" />
                  Data transaksi tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  {/* Nomor Pesanan */}
                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-900">
                      {transaction.order_number}
                    </p>
                  </td>

                  {/* Pelanggan */}
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-800">
                      {transaction.recipient_name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {transaction.user?.email || "-"}
                    </p>
                  </td>

                  {/* Tanggal */}
                  <td className="px-5 py-3">
                    {formatDate(transaction.created_at)}
                  </td>

                  {/* Total */}
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {formatRupiah(transaction.total_amount)}
                  </td>

                  {/* Status Pesanan */}
                  <td className="px-5 py-3">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {orderStatusLabel[transaction.order_status] ||
                        transaction.order_status}
                    </span>
                  </td>

                  {/* Status Pembayaran */}
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.payment_status === "paid"
                          ? "bg-green-50 text-green-700"
                          : transaction.payment_status === "failed" ||
                              transaction.payment_status === "expired"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {paymentStatusLabel[transaction.payment_status] ||
                        transaction.payment_status}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-3">
                      {transaction.payment_status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleConfirmPayment(transaction)}
                          disabled={confirmingId === transaction.id}
                          title="Konfirmasi pembayaran"
                          className="inline-flex! items-center! gap-1! border-0! bg-transparent! p-0! text-xs! font-medium! text-green-600! shadow-none! transition hover:text-green-800! disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {confirmingId === transaction.id ? (
                            <i className="fa-solid fa-spinner fa-spin text-lg" />
                          ) : (
                            <i className="fa-solid fa-circle-check text-lg" />
                          )}
                          <span>
                            {confirmingId === transaction.id
                              ? "Mengonfirmasi..."
                              : "Konfirmasi"}
                          </span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/transactions/${transaction.id}`)
                        }
                        title="Lihat detail transaksi"
                        className="border-0! bg-transparent! p-0! text-blue-600! shadow-none! transition hover:text-blue-800!"
                      >
                        <i className="fa-solid fa-eye text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
