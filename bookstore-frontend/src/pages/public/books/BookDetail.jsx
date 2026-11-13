
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API, bookImageStorage } from "../../../services/api";
import { useCart } from "../../../context/useCart";

export default function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/books/${id}`);
        setBook(response.data.data ?? response.data);
      } catch (err) {
        setError("Data buku tidak berhasil ditemukan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price ?? 0));

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;

    const path = image.startsWith("books/")
      ? image.slice(6)
      : image;

    return `${bookImageStorage}/${path}`;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat...</span>
        </div>
        <p className="text-body-secondary mt-3">
          Memuat detail buku...
        </p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">
          {error || "Buku tidak ditemukan."}
        </p>

        <Link to="/books" className="btn btn-outline-primary mt-3">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const title = book.title ?? book.judul ?? "Tanpa Judul";
  const image = getImageUrl(book.cover_image);

  const author =
    book.author?.name ??
    book.author?.author_name ??
    "-";

  const genre =
    book.genre?.name ??
    book.genre?.genre_name ??
    "-";

  const year =
    book.publication_year ??
    book.year ??
    "-";

  const isbn = book.isbn ?? "-";
  const stock = Number(book.stock ?? 0);

  const cartItem = cart.find(
    (item) => String(item.id) === String(book.id)
  );

  const alreadyInCart = Number(cartItem?.quantity ?? 0);

  const handleBuy = () => {
    const added = addToCart(book);

    if (added) {
      window.alert(`Buku "${title}" ditambahkan ke keranjang!`);
    } else {
      window.alert("Stok buku tidak mencukupi.");
    }
  };

  return (
    <section className="container py-5">
      {/* Navigasi kembali */}
      <div className="mb-4">
        <Link
          to="/books"
          className="text-decoration-none"
        >
          <i className="fa-solid fa-arrow-left me-2" />
          Kembali ke Katalog
        </Link>
      </div>

      {/* Informasi utama buku */}
      <div className="row g-5 align-items-start">
        {/* Sampul buku */}
        <div className="col-md-5">
          <div
            className="d-flex align-items-center justify-content-center rounded border bg-body-tertiary p-4"
            style={{ minHeight: "450px" }}
          >
            {image ? (
              <img
                src={image}
                alt={`Sampul ${title}`}
                className="img-fluid shadow"
                style={{
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center text-center text-white shadow p-4 bg-primary"
                style={{
                  width: "220px",
                  height: "320px",
                }}
              >
                <h2 className="fw-bold">{title}</h2>
              </div>
            )}
          </div>
        </div>

        {/* Informasi buku */}
        <div className="col-md-7">
          <p className="text-primary fw-semibold text-uppercase small mb-2">
            Detail Koleksi Buku
          </p>

          <h1 className="fw-bold mb-3">{title}</h1>

          <p className="text-body-secondary mb-4">
            <i className="fa-solid fa-user-pen me-2" />
            Penulis: {author}
          </p>

          <h2 className="text-primary fw-bold mb-4">
            {formatPrice(book.price)}
          </h2>

          <hr />

          {/* Spesifikasi buku */}
          <h5 className="fw-bold mt-4 mb-3">
            Informasi Buku
          </h5>

          <div className="row g-3 py-2">
            <div className="col-5 text-body-secondary">
              Kategori
            </div>
            <div className="col-7 fw-semibold">
              {genre}
            </div>

            <div className="col-5 text-body-secondary">
              ISBN
            </div>
            <div className="col-7 fw-semibold">
              {isbn}
            </div>

            <div className="col-5 text-body-secondary">
              Tahun Terbit
            </div>
            <div className="col-7 fw-semibold">
              {year}
            </div>

            <div className="col-5 text-body-secondary">
              Ketersediaan
            </div>
            <div className="col-7 fw-semibold">
              {stock > 0 ? (
                <span className="text-success">
                  Tersedia ({stock} buku)
                </span>
              ) : (
                <span className="text-danger">
                  Stok Habis
                </span>
              )}
            </div>

            <div className="col-5 text-body-secondary">
              Di Keranjang
            </div>
            <div className="col-7 fw-semibold">
              {alreadyInCart} buku
            </div>
          </div>

          <hr />

          {/* Deskripsi lengkap */}
          <h5 className="fw-bold mt-4 mb-3">
            Deskripsi Buku
          </h5>

          <p
            className="text-body-secondary"
            style={{
              lineHeight: "1.8",
              whiteSpace: "pre-line",
              textAlign: "justify",
            }}
          >
            {book.description ||
              "Belum ada deskripsi untuk buku ini."}
          </p>

          {/* Tombol keranjang */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              disabled={stock <= alreadyInCart}
              onClick={handleBuy}
            >
              <i className="fa-solid fa-cart-plus me-2" />

              {stock <= 0
                ? "Stok Habis"
                : stock <= alreadyInCart
                  ? "Stok Sudah Maksimal"
                  : "Tambah ke Keranjang"}
            </button>

            <Link
              to="/cart"
              className="btn btn-outline-primary btn-lg"
            >
              <i className="fa-solid fa-cart-shopping me-2" />
              Lihat Keranjang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
