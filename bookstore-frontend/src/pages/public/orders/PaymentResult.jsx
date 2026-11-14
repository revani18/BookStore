import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../../_api";


export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transaction_id");

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTransaction = async () => {
      if (!transactionId) {
        setError("Nomor transaksi tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/my-transactions/${transactionId}`);

        setTransaction(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Gagal mengambil informasi pesanan.",
        );
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, [transactionId]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  const paymentStatus = {
    paid: {
      label: "Pembayaran Berhasil",
      color: "success",
      icon: "fa-circle-check",
    },
    pending: {
      label: "Menunggu Pembayaran",
      color: "warning",
      icon: "fa-clock",
    },
    failed: {
      label: "Pembayaran Gagal",
      color: "danger",
      icon: "fa-circle-xmark",
    },
    expired: {
      label: "Pembayaran Kedaluwarsa",
      color: "secondary",
      icon: "fa-circle-xmark",
    },
  };

  const status = transaction
    ? paymentStatus[transaction.payment_status] || paymentStatus.pending
    : null;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Memeriksa pembayaran...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <Link to="/orders" className="btn btn-primary">
          Lihat Riwayat Pesanan
        </Link>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "650px" }}>
        <div className="card-body p-4 text-center">
          <i
            className={`fa-solid ${status.icon} fa-4x text-${status.color} mb-3`}
          />

          <h2 className="fw-bold">{status.label}</h2>

          <p className="text-body-secondary">
            {transaction.payment_status === "paid"
              ? "Terima kasih! Pembayaran pesanan kamu sudah berhasil."
              : "Berikut informasi status pembayaran pesanan kamu."}
          </p>

          <hr />

          <div className="text-start">
            <div className="d-flex justify-content-between mb-3">
              <span>Nomor Pesanan</span>
              <strong>{transaction.order_number}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Status Pembayaran</span>
              <span className={`badge text-bg-${status.color}`}>
                {status.label}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Status Pesanan</span>
              <strong>{transaction.order_status}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Total Pembayaran</span>
              <strong className="text-primary">
                {formatPrice(transaction.total_amount)}
              </strong>
            </div>
          </div>

          <hr />

          <button
            className="btn btn-outline-primary w-100 mb-2"
            onClick={() => window.location.reload()}
          >
            <i className="fa-solid fa-rotate me-2" />
            Periksa Status Pembayaran
          </button>

          <Link to="/orders" className="btn btn-primary w-100">
            Lihat Riwayat Pesanan
          </Link>

          <Link to="/books" className="btn btn-link text-decoration-none mt-2">
            Kembali Belanja
          </Link>
        </div>
      </div>
    </section>
  );
}
