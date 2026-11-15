import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../_api";
import { useModal } from "../../../context/useModal";


export default function OrderDetail() {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await API.get(`/my-transactions/${id}`);
        if (!response.data) {
          const message = "Pesanan tidak ditemukan.";
          setError(message);
          showModal(message, "error", {
            title: "Pesanan tidak ditemukan",
            onOk: () => navigate("/orders"),
          });
          return;
        }

        setOrder(response.data);
      } catch (err) {
        const message =
          err.response?.data?.message || "Gagal mengambil detail pesanan.";
        setError(message);
        showModal(message, "error", {
          title: "Gagal memuat detail pesanan",
          onOk: () => navigate("/orders"),
        });
      } finally {
        setLoading(false);
      }
    };

    getOrderDetail();
  }, [id, navigate, showModal]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  const paymentLabels = {
    paid: "Berhasil",
    pending: "Menunggu Pembayaran",
    failed: "Gagal",
    expired: "Kedaluwarsa",
  };

  const orderLabels = {
    pending: "Menunggu Diproses",
    processing: "Sedang Diproses",
    shipped: "Sedang Dikirim",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Memuat detail pesanan...</p>
      </div>
    );
  }

  if (error || !order) {
    return null;
  }

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="fw-bold mb-0">Detail Pesanan</h1>
        <Link to="/orders" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2" />
          Kembali
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Informasi Pesanan</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-body-secondary">Nomor Pesanan</small>
              <p className="fw-bold">{order.order_number}</p>
            </div>

            <div className="col-md-6">
              <small className="text-body-secondary">Tanggal Pesanan</small>
              <p className="fw-bold">
                {new Date(order.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="col-md-6">
              <small className="text-body-secondary">Status Pembayaran</small>
              <p>
                <span className={`badge text-bg-${
                  order.payment_status === "paid"
                    ? "success"
                    : order.payment_status === "pending"
                    ? "warning"
                    : "secondary"
                }`}>
                  {paymentLabels[order.payment_status] || order.payment_status}
                </span>
              </p>
            </div>

            <div className="col-md-6">
              <small className="text-body-secondary">Status Pesanan</small>
              <p className="fw-bold">
                {orderLabels[order.order_status] || order.order_status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Buku yang Dibeli</h5>

          {order.items?.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center gap-3 border-bottom py-3"
            >
              <div>
                <h6 className="fw-semibold mb-1">
                  {item.book?.title || "Buku"}
                </h6>
                <small className="text-body-secondary">
                  {item.quantity} buku × {formatPrice(item.price)}
                </small>
              </div>

              <strong className="text-nowrap">
                {formatPrice(item.subtotal)}
              </strong>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-3">
            <span>Subtotal</span>
            <strong>{formatPrice(order.subtotal)}</strong>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>Ongkos Kirim</span>
            <strong>{formatPrice(order.shipping_cost)}</strong>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <strong>Total Pembayaran</strong>
            <strong className="text-primary fs-5">
              {formatPrice(order.total_amount)}
            </strong>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Informasi Pengiriman</h5>

          <p className="mb-1 fw-semibold">{order.recipient_name}</p>
          <p className="mb-1">{order.phone}</p>
          <p className="mb-0">
            {order.shipping_address}, {order.city}, {order.province},{" "}
            {order.postal_code}
          </p>
        </div>
      </div>
    </section>
  );
}
