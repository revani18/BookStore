import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductList.module.css";
import { useCart } from "../context/useCart";
import { useModal } from "../context/useModal";
import { API, bookImageStorage } from "../_api";

export default function ProductList({ showFilters = false }) {
  const [booksList, setBooksList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { totalItems, addToCart, cart } = useCart();
  const { showModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const requests = [API.get("/books")];

        if (showFilters) {
          requests.push(API.get("/genres"));
        }

        const [booksResponse, genresResponse] = await Promise.all(requests);

        const booksData = booksResponse.data.data ?? booksResponse.data;
        const genresData = genresResponse
          ? (genresResponse.data.data ?? genresResponse.data)
          : [];

        setBooksList(Array.isArray(booksData) ? booksData : []);
        setCategories(Array.isArray(genresData) ? genresData : []);
      } catch (err) {
        console.error(err);
        const message = "Gagal mengambil data buku. Silakan coba kembali.";
        setError(message);
        showModal(message, "error", { title: "Buku gagal dimuat" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showFilters, showModal]);

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

  const filteredBooks = booksList.filter((book) => {
    const title = book.title ?? book.judul ?? "";
    const genreId = String(book.genre_id ?? book.genre?.id ?? "");

    return (
      title.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || genreId === selectedCategory)
    );
  });

  const handleBuy = async (book) => {
    const added = await addToCart(book);

    if (added) {
      showModal(
        `Buku "${book.title ?? book.judul}" berhasil ditambahkan ke keranjang!`,
        "success",
        { title: "Buku ditambahkan ke keranjang", icon: "fa-cart-plus" },
      );
    }
  };

  const selectedBookCartItem = selectedBook
    ? cart.find(
        (item) =>
          String(item.book_id ?? item.id) === String(selectedBook.id),
      )
    : null;
  const selectedBookInCart = Number(selectedBookCartItem?.quantity ?? 0);
  const selectedBookStock = Number(selectedBook?.stock ?? 0);
  const selectedBookTitle =
    selectedBook?.title ?? selectedBook?.judul ?? "Tanpa Judul";
  const selectedBookImage = selectedBook
    ? getImageUrl(selectedBook.cover_image)
    : null;

  return (
    <>
      <section id="book" className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h1 className="fw-light">Jelajahi Koleksi Buku Kami</h1>

            <p className="lead text-body-secondary">
              Temukan berbagai pilihan buku yang telah kami pilih untuk memenuhi
              kebutuhan setiap pembaca. Mulai dari cerita yang menginspirasi,
              petualangan yang menarik, hingga buku yang menambah pengetahuan
              dan pengembangan diri. BookStore membantu kamu menemukan buku yang
              sesuai dengan minat dan kebutuhanmu.
            </p>

            {showFilters && (
              <div className="row g-3 justify-content-center mt-3 mb-3">
                <div className="col-md-6">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Cari judul buku..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="col-md-5">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                  >
                    <option value="">Semua Kategori</option>

                    {categories.map((category) => (
                      <option key={category.id} value={String(category.id)}>
                        {category.name ?? category.genre_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <span className={styles.cartCounter} aria-live="polite">
              <i
                className="fa-solid fa-cart-shopping me-1"
                aria-hidden="true"
              />
              Keranjang: {totalItems}
            </span>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          {loading ? (
            <p className="text-center py-5 text-body-secondary">
              Memuat koleksi buku...
            </p>
          ) : error ? (
            null
          ) : filteredBooks.length === 0 ? (
            <p className="text-center py-5 text-body-secondary">
              Buku tidak ditemukan.
            </p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {filteredBooks.map((book) => {
                const title = book.title ?? book.judul ?? "Tanpa Judul";
                const author =
                  book.author?.name ?? book.author?.author_name ?? "Penulis";
                const image = getImageUrl(book.cover_image);
                const stock = Number(book.stock ?? 0);

                return (
                  <div className="col" key={book.id}>
                    <article className={`card h-100 ${styles.bookCard}`}>
                      <div className={styles.bookImageWrap}>
                        {image ? (
                          <img
                            src={image}
                            alt={`Sampul buku ${title}`}
                            className={styles.bookCover}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.classList.add(
                                styles.bookCoverUnavailable,
                              );
                            }}
                          />
                        ) : (
                          <div className={styles.bookCoverFallback}>
                            {title}
                          </div>
                        )}
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h3 className={`card-title ${styles.bookTitle}`}>
                          {title}
                        </h3>

                        <small className="text-body-secondary">
                          Penulis: {author}
                        </small>

                        <p
                          className={`card-text mt-2 ${styles.bookDescription}`}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {book.description ||
                            "Belum ada deskripsi untuk buku ini."}
                        </p>

                        <div className="d-flex justify-content-between align-items-center gap-2 mt-auto pt-3">
                          <div
                            className="btn-group"
                            role="group"
                            aria-label={`Aksi untuk ${title}`}
                          >
                            <button
                              type="button"
                              className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
                              onClick={() => setSelectedBook(book)}
                            >
                              <i
                                className="fa-regular fa-eye me-1"
                                aria-hidden="true"
                              />
                              Lihat
                            </button>

                            <button
                              type="button"
                              className={`btn btn-sm btn-primary ${styles.actionButton}`}
                              disabled={stock <= 0}
                              onClick={() => handleBuy(book)}
                            >
                              <i
                                className="fa-solid fa-cart-plus me-1"
                                aria-hidden="true"
                              />
                              Tambah
                            </button>
                          </div>

                          <strong className={styles.bookPrice}>
                            {formatPrice(book.price)}
                          </strong>
                        </div>

                        <small className="text-body-secondary mt-2">
                          Stok: {stock}
                        </small>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedBook && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBook(null);
            }
          }}
        >
          <section
            className={styles.bookModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-modal-title"
          >
            <button
              type="button"
              className={styles.modalClose}
              aria-label="Tutup detail buku"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button>

            <div className={styles.modalContent}>
              <div className={styles.modalImageWrap}>
                {selectedBookImage ? (
                  <img
                    src={selectedBookImage}
                    alt={`Sampul ${selectedBookTitle}`}
                  />
                ) : (
                  <div className={styles.modalCoverFallback}>
                    {selectedBookTitle}
                  </div>
                )}
              </div>

              <div className={styles.modalDetails}>
                <p className="text-primary fw-semibold text-uppercase small mb-2">
                  Detail Koleksi Buku
                </p>

                <h2 id="book-modal-title" className="fw-bold mb-3">
                  {selectedBookTitle}
                </h2>

                <p className="text-body-secondary mb-1">
                  <i className="fa-solid fa-user-pen me-2" aria-hidden="true" />
                  Penulis:{" "}
                  {selectedBook.author?.name ??
                    selectedBook.author?.author_name ??
                    "-"}
                </p>

                <p className="fs-4 fw-bold text-primary my-3">
                  {formatPrice(selectedBook.price)}
                </p>

                <hr />

                <h3 className="h5 fw-bold mt-4 mb-3">Informasi Buku</h3>
                <div className={styles.bookMetadata}>
                  <span className="text-body-secondary">Kategori</span>
                  <strong>
                    {selectedBook.genre?.name ??
                      selectedBook.genre?.genre_name ??
                      "-"}
                  </strong>

                  <span className="text-body-secondary">ISBN</span>
                  <strong>{selectedBook.isbn ?? "-"}</strong>

                  <span className="text-body-secondary">Ketersediaan</span>
                  <strong>
                    {selectedBookStock > 0 ? (
                      <span className="text-success">
                        Tersedia ({selectedBookStock} buku)
                      </span>
                    ) : (
                      <span className="text-danger">Stok Habis</span>
                    )}
                  </strong>

                  <span className="text-body-secondary">Di Keranjang</span>
                  <strong>{selectedBookInCart} buku</strong>
                </div>

                <hr />

                <h3 className="h5 fw-bold mt-4 mb-3">Deskripsi Buku</h3>
                <p className={styles.modalDescription}>
                  {selectedBook.description ||
                    "Belum ada deskripsi untuk buku ini."}
                </p>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={selectedBookStock <= selectedBookInCart}
                    onClick={() => {
                      handleBuy(selectedBook);
                    }}
                  >
                    <i
                      className="fa-solid fa-cart-plus me-2"
                      aria-hidden="true"
                    />
                    {selectedBookStock <= 0
                      ? "Stok Habis"
                      : selectedBookStock <= selectedBookInCart
                        ? "Stok Sudah Maksimal"
                        : "Tambah ke Keranjang"}
                  </button>

                  <Link to="/cart" className="btn btn-outline-primary">
                    <i
                      className="fa-solid fa-cart-shopping me-2"
                      aria-hidden="true"
                    />
                    Lihat Keranjang
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
