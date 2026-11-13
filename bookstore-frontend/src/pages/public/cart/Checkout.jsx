import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/useCart";
import { API } from "../../../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    shipping_address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  // Mengambil data profil untuk mengisi formulir secara otomatis
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const response = await API.get("/profile");
        const user = response.data.user;

        setForm({
          recipient_name: user.name ?? "",
          phone: user.phone ?? "",
          shipping_address: user.address ?? "",
          city: user.city ?? "",
          province: user.province ?? "",
          postal_code: user.postal_code ?? "",
        });
      } catch (error) {
        console.error(
          "Gagal mengambil profil:",
          error.response?.data || error.message
        );
      }
    };

    getProfile();
  }, [navigate]);

  // Mengubah nilai formulir
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Membuat pesanan dan menuju pembayaran Midtrans
  const handleCheckout = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (cart.length === 0) {
      alert("Keranjang belanja kamu masih kosong.");
      navigate("/books");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/transactions", form);
      const transaction = response.data.data;

      if (transaction?.payment_url) {
        window.location.href = transaction.payment_url;
      } else {
        setErrorMessage(
          "Pesanan berhasil dibuat, tetapi tautan pembayaran tidak tersedia."
        );
        setLoading(false);
      }
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)
          .flat()[0];

        setErrorMessage(firstError || "Periksa kembali data pesanan.");
      } else {
        setErrorMessage(
          responseData?.message ||
            "Pesanan gagal diproses. Silakan coba kembali."
        );
      }

      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h3 className="fw-bold">Keranjang Belanja Kosong</h3>
        <p className="text-body-secondary">
          Tambahkan buku sebelum melanjutkan checkout.
        </p>
        <Link to="/books" className="btn btn-primary">
          Jelajahi Buku
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="fw-bold mb-4">Checkout</h1>

      <form onSubmit={handleCheckout}>
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  Informasi Pengiriman
                </h5>

                <div className="mb-3">
                  <label className="form-label">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    name="recipient_name"
                    className="form-control"
                    value={form.recipient_name}
                    onChange={handleChange}
                    maxLength="100"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength="20"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Alamat Lengkap
                  </label>
                  <textarea
                    name="shipping_address"
                    className="form-control"
                    rows="3"
                    value={form.shipping_address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Kota / Kabupaten
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={form.city}
                      onChange={handleChange}
                      maxLength="100"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Provinsi
                    </label>
                    <input
                      type="text"
                      name="province"
                      className="form-control"
                      value={form.province}
                      onChange={handleChange}
                      maxLength="100"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    className="form-control"
                    value={form.postal_code}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="alert alert-danger mt-3">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  Ringkasan Pesanan
                </h5>

                {cart.map((item) => (
                  <div
                    key={item.cart_item_id}
                    className="d-flex justify-content-between gap-3 mb-3"
                  >
                    <div>
                      <div className="fw-semibold">
                        {item.title ?? item.judul}
                      </div>
                      <small className="text-body-secondary">
                        {item.quantity} buku
                      </small>
                    </div>

                    <strong className="text-nowrap">
                      {formatPrice(
                        Number(item.price) * item.quantity
                      )}
                    </strong>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Ongkos Kirim</span>
                  <span>Gratis</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <strong>Total Pembayaran</strong>
                  <strong className="text-primary">
                    {formatPrice(cartTotal)}
                  </strong>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Memproses Pesanan..." : "Buat Pesanan"}
                </button>

                <Link
                  to="/cart"
                  className="btn btn-outline-secondary w-100 mt-2"
                >
                  Kembali ke Keranjang
                </Link>

                <small className="text-body-secondary d-block mt-3">
                  Pembayaran akan dilanjutkan melalui Midtrans
                  Sandbox setelah pesanan berhasil dibuat.
                </small>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}