import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTransaction,
  updateTransactionStatus,
} from "../../../_services/transaction";

export default function TransactionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const fetchTransaction = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getTransaction(id);
      setTransaction(response.data);
      setOrderStatus(response.data.order_status);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Gagal mengambil detail transaksi.",
      );
      navigate("/admin/transactions");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    const loadTransaction = async () => {
      await fetchTransaction();
    };

    loadTransaction();
  }, [fetchTransaction]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const handleUpdateStatus = async () => {
    if (orderStatus === transaction.order_status) {
      alert("Status pesanan belum diubah.");
      return;
    }

    try {
      setUpdating(true);

      const response = await updateTransactionStatus(id, {
        order_status: orderStatus,
      });

      setTransaction(response.data);
      setOrderStatus(response.data.order_status);

      alert("Status pesanan berhasil diperbarui.");

      navigate("/admin/transactions");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Gagal memperbarui status pesanan.",
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center text-gray-500">
        <i className="fa-solid fa-spinner fa-spin mr-2" />
        Memuat detail transaksi...
      </div>
    );
  }

  if (!transaction) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Detail Transaksi
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Informasi lengkap pesanan dan pembayaran pelanggan.
        </p>
      </div>

      {/* Informasi Pesanan */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">Nomor Pesanan</p>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              {transaction.order_number}
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              {formatDate(transaction.created_at)}
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {orderStatusLabel[transaction.order_status] ||
              transaction.order_status}
          </span>
        </div>

        {/* Pelanggan dan Pengiriman */}
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Informasi Pelanggan
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Nama Penerima</p>
                <p className="mt-1 font-medium text-gray-900">
                  {transaction.recipient_name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="mt-1 break-all font-medium text-gray-900">
                  {transaction.user?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Nomor Telepon</p>
                <p className="mt-1 font-medium text-gray-900">
                  {transaction.phone}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Alamat Pengiriman
            </h3>

            <p className="text-sm leading-6 text-gray-700">
              {transaction.shipping_address}
              <br />
              {transaction.city}, {transaction.province}
              <br />
              Kode Pos: {transaction.postal_code}
            </p>
          </div>
        </div>

        {/* Daftar Buku */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Buku yang Dibeli
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Nama Buku</th>
                  <th className="px-4 py-3 text-center">Jumlah</th>
                  <th className="px-4 py-3 text-right">Harga</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {transaction.items?.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {item.book?.title || "Buku tidak tersedia"}
                    </td>
                    <td className="px-4 py-4 text-center">{item.quantity}</td>
                    <td className="px-4 py-4 text-right">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-gray-900">
                      {formatRupiah(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pembayaran */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Informasi Pembayaran
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Metode Pembayaran</p>
              <p className="mt-1 font-medium text-gray-900">
                {transaction.payment_method?.toUpperCase() || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status Pembayaran</p>
              <p
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
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
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ID Transaksi Midtrans</p>
              <p className="mt-1 break-all font-medium text-gray-900">
                {transaction.midtrans_transaction_id || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tanggal Pembayaran</p>
              <p className="mt-1 font-medium text-gray-900">
                {formatDate(transaction.paid_at)}
              </p>
            </div>
          </div>

          <div className="mt-6 ml-auto w-full space-y-3 sm:max-w-sm">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatRupiah(transaction.subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Biaya Pengiriman</span>
              <span>{formatRupiah(transaction.shipping_cost)}</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
              <span>Total Pembayaran</span>
              <span>{formatRupiah(transaction.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Ubah Status Pesanan */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Perbarui Status Pesanan
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:max-w-xs"
            >
              {Object.entries(orderStatusLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleUpdateStatus}
              disabled={updating || orderStatus === transaction.order_status}
              className="!inline-flex !items-center !justify-center !gap-2 !rounded-full !border-0 !bg-blue-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-none transition-all hover:!bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save" />
                  Simpan Status
                </>
              )}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Perubahan ini hanya memengaruhi status pesanan, bukan status
            pembayaran Midtrans.
          </p>
        </div>

        {/* Tombol Kembali */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/transactions")}
            className="!rounded-full !border !border-gray-300 !bg-white !px-6 !py-3 !text-sm !font-semibold !text-gray-600 !shadow-none transition hover:!bg-gray-50 active:scale-95"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
