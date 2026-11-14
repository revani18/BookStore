import { useEffect, useState } from "react";
import { getBooks } from "../../_services/books";
import { getGenres } from "../../_services/genres";
import { getAuthors } from "../../_services/authors";
import { getUsers } from "../../_services/users";
import { getTransactions } from "../../_services/transaction";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [statistics, setStatistics] = useState([
    {
      title: "Total Buku",
      value: "—",
      description: "Jumlah buku terdaftar",
      icon: "▤",
    },
    {
      title: "Total Genre",
      value: "—",
      description: "Genre buku",
      icon: "▧",
    },
    {
      title: "Total Penulis",
      value: "—",
      description: "Penulis terdaftar",
      icon: "♙",
    },
    {
      title: "Total Pelanggan",
      value: "—",
      description: "Pelanggan terdaftar",
      icon: "♧",
    },
  ]);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          booksResponse,
          genresResponse,
          authorsResponse,
          usersResponse,
          transactionsResponse,
        ] = await Promise.all([
          getBooks(),
          getGenres(),
          getAuthors(),
          getUsers(),
          getTransactions(),
        ]);

        setStatistics([
          {
            title: "Total Buku",
            value: booksResponse.data.length,
            description: "Jumlah buku terdaftar",
            icon: "▤",
          },
          {
            title: "Total Genre",
            value: genresResponse.data.length,
            description: "Genre buku",
            icon: "▧",
          },
          {
            title: "Total Penulis",
            value: authorsResponse.data.length,
            description: "Penulis terdaftar",
            icon: "♙",
          },
          {
            title: "Total Pelanggan",
            value: usersResponse.data.length,
            description: "Pelanggan terdaftar",
            icon: "♧",
          },
        ]);

        const latestTransactions = [...transactionsResponse.data]
          .sort(
            (a, b) =>
              new Date(b.created_at) - new Date(a.created_at),
          )
          .slice(0, 5);

        setTransactions(latestTransactions);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

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

  return (
    <div className="space-y-8 px-3 pt-8 pb-5 md:px-6 md:pt-10 md:pb-6">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Selamat datang, {user.name || "Administrator"}.
          Berikut ringkasan pengelolaan BookStore.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-500">
                {item.title}
              </p>

              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl text-blue-600">
                {item.icon}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              {item.value}
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Transaksi Terbaru */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Transaksi Terbaru
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Lima transaksi terbaru yang masuk ke BookStore.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-4">No. Pesanan</th>
                <th className="px-5 py-4">Pelanggan</th>
                <th className="px-5 py-4">Tanggal</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status Pesanan</th>
                <th className="px-5 py-4">Pembayaran</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    <i className="fa-solid fa-spinner fa-spin mr-2" />
                    Memuat data transaksi...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    <i className="fa-solid fa-receipt mb-2 block text-2xl text-gray-300" />
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-3 font-semibold text-gray-900">
                      {transaction.order_number}
                    </td>

                    <td className="px-5 py-3">
                      {transaction.recipient_name ||
                        transaction.user?.name ||
                        "-"}
                    </td>

                    <td className="px-5 py-3">
                      {formatDate(transaction.created_at)}
                    </td>

                    <td className="px-5 py-3 font-medium text-gray-900">
                      {formatRupiah(transaction.total_amount)}
                    </td>

                    <td className="px-5 py-3">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {orderStatusLabel[transaction.order_status] ||
                          transaction.order_status}
                      </span>
                    </td>

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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
