import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/useCart";
import { bookImageStorage } from "../../../_api";

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;

    const path = image.startsWith("books/") ? image.slice(6) : image;

    return `${bookImageStorage}/${path}`;
  };

  return (
    <section className="container py-5">
      <h1 className="fw-bold mb-4">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-cart-shopping fa-3x text-body-secondary mb-3" />
          <p className="text-body-secondary">Keranjang kamu masih kosong.</p>
          <Link to="/books" className="btn btn-primary">
            Jelajahi Buku
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => (
              <div className="card mb-3" key={item.cart_item_id}>
                <div className="card-body">
                  <div className="row align-items-center g-3">
                    <div className="col-3 col-md-2">
                      {getImageUrl(item.cover_image) ? (
                        <img
                          src={getImageUrl(item.cover_image)}
                          alt={`Sampul ${item.title}`}
                          className="img-fluid"
                          style={{
                            maxHeight: "120px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div className="bg-body-tertiary p-3 text-center">
                          {item.title}
                        </div>
                      )}
                    </div>

                    <div className="col-9 col-md-5">
                      <h5 className="fw-bold">{item.title ?? item.judul}</h5>

                      <p className="text-body-secondary mb-1">
                        {item.author?.name ??
                          item.author?.author_name ??
                          "Penulis"}
                      </p>

                      <strong>{formatPrice(item.price)}</strong>
                    </div>

                    <div className="col-7 col-md-3">
                      <label className="form-label small">Jumlah</label>

                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        className="form-control"
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(
                            item.cart_item_id,
                            Number(event.target.value),
                          )
                        }
                      />
                    </div>

                    <div className="col-5 col-md-2 text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.cart_item_id)}
                      >
                        <i className="fa-solid fa-trash me-1" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Ringkasan Belanja</h5>

                <div className="d-flex justify-content-between mb-3">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={() => navigate("/checkout")}
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
