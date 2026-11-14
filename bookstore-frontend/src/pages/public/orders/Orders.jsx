import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../_api";


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await API.get("/my-transactions");
        setOrders(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Gagal mengambil riwayat pesanan."
        );
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  const statusColor = {
    paid: "success",
    pending: "warning",
    failed: "danger",
    expired: "secondary",
  };

  const statusLabel = {
    paid: "Berhasil",
    pending: "Menunggu Pembayaran",
    failed: "Gagal",
    expired: "Kedaluwarsa",
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Memuat riwayat pesanan...</p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="fw-bold mb-4">Riwayat Pesanan</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {!error && orders.length === 0 && (
        <div className="text-center py-5">
          <i className="fa-solid fa-receipt fa-3x text-body-secondary mb-3" />
          <h5>Belum Ada Pesanan</h5>
          <p className="text-body-secondary">
            Pesanan yang kamu buat akan muncul di sini.
          </p>
          <Link to="/books" className="btn btn-primary">
            Mulai Belanja
          </Link>
        </div>
      )}

      <div className="row g-3">
        {orders.map((order) => (
          <div className="col-12" key={order.id}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                  <div>
                    <small className="text-body-secondary">
                      Nomor Pesanan
                    </small>
                    <h6 className="fw-bold mb-0">
                      {order.order_number}
                    </h6>
                  </div>

                  <span
                    className={`badge text-bg-${
                      statusColor[order.payment_status] || "secondary"
                    } align-self-start`}
                  >
                    {statusLabel[order.payment_status] ||
                      order.payment_status}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-body-secondary">
                    Jumlah jenis buku
                  </span>
                  <strong>{order.items?.length || 0} jenis</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-body-secondary">
                    Total Pembayaran
                  </span>
                  <strong className="text-primary">
                    {formatPrice(order.total_amount)}
                  </strong>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-body-secondary">
                    {new Date(order.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </small>

                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}