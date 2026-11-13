import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, bookImageStorage } from "../services/api";
import styles from "../styles/ProductList.module.css";
import { useCart } from "../context/useCart";

export default function ProductList({ showFilters = false }) {
  const [booksList, setBooksList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { totalItems, addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [booksResponse, genresResponse] = await Promise.all([
          API.get("/books"),
          API.get("/genres"),
        ]);

        const booksData = booksResponse.data.data ?? booksResponse.data;
        const genresData = genresResponse.data.data ?? genresResponse.data;

        setBooksList(Array.isArray(booksData) ? booksData : []);
        setCategories(Array.isArray(genresData) ? genresData : []);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data buku. Silakan coba kembali.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const filteredBooks = booksList.filter((book) => {
    const title = book.title ?? book.judul ?? "";
    const genreId = String(book.genre_id ?? book.genre?.id ?? "");

    return (
      title.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || genreId === selectedCategory)
    );
  });

  const handleBuy = (book) => {
    const added = addToCart(book);

    if (added) {
      window.alert(
        `Buku "${book.title ?? book.judul}" berhasil ditambahkan ke keranjang!`
      );
    } else {
      window.alert("Stok buku tidak mencukupi.");
    }
  };

  return (
    <>
      <section id="book" className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h1 className="fw-light">Jelajahi Koleksi Buku Kami</h1>

            <p className="lead text-body-secondary">
              Temukan berbagai pilihan buku yang telah kami pilih untuk memenuhi
              kebutuhan setiap pembaca. Mulai dari cerita yang menginspirasi,
              petualangan yang menarik, hingga buku yang menambah pengetahuan dan
              pengembangan diri. BookStore membantu kamu menemukan buku yang
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
                      <option
                        key={category.id}
                        value={String(category.id)}
                      >
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
            <p className="text-center py-5 text-danger">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center py-5 text-body-secondary">
              Buku tidak ditemukan.
            </p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {filteredBooks.map((book) => {
                const title = book.title ?? book.judul ?? "Tanpa Judul";
                const author =
                  book.author?.name ??
                  book.author?.author_name ??
                  "Penulis";
                const year =
                  book.publication_year ?? book.year ?? "-";
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
                                styles.bookCoverUnavailable
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

                        <p className="text-body-secondary small mb-1">
                          Tahun: {year}
                        </p>

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
              {getImageUrl(selectedBook.cover_image) ? (
                <img
                  src={getImageUrl(selectedBook.cover_image)}
                  alt={`Sampul ${
                    selectedBook.title ?? selectedBook.judul
                  }`}
                />
              ) : (
                <div className={styles.bookCoverFallback}>
                  {selectedBook.title ?? selectedBook.judul}
                </div>
              )}

              <div>
                <p className="text-primary fw-semibold mb-2">
                  DETAIL BUKU
                </p>

                <h2 id="book-modal-title">
                  {selectedBook.title ?? selectedBook.judul}
                </h2>

                <p className="text-body-secondary mb-1">
                  Penulis:{" "}
                  {selectedBook.author?.name ??
                    selectedBook.author?.author_name ??
                    "-"}
                </p>

                <p className="text-body-secondary">
                  Tahun terbit:{" "}
                  {selectedBook.publication_year ??
                    selectedBook.year ??
                    "-"}
                </p>

                <p>
                  {selectedBook.description ||
                    "Belum ada deskripsi untuk buku ini."}
                </p>

                <p className="fs-5 fw-bold">
                  {formatPrice(selectedBook.price)}
                </p>

                <p className="text-body-secondary">
                  Stok: {selectedBook.stock ?? 0}
                </p>

                <div className="d-flex gap-2 flex-wrap">
                  <Link
                    to={`/books/${selectedBook.id}`}
                    className="btn btn-outline-primary"
                  >
                    Detail Buku
                  </Link>

                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={Number(selectedBook.stock ?? 0) <= 0}
                    onClick={() => {
                      handleBuy(selectedBook);
                      setSelectedBook(null);
                    }}
                  >
                    <i
                      className="fa-solid fa-cart-plus me-2"
                      aria-hidden="true"
                    />
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
