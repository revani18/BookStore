export default function About() {
  return (
    <div className="container my-5">
      {/* Judul Halaman */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Tentang BookStore</h2>
        <p className="text-muted">
          Informasi mengenai platform BookStore.
        </p>
      </div>

      {/* Informasi BookStore */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-md-5">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80"
              alt="Rak buku perpustakaan"
              className="img-fluid w-100 rounded-start"
              style={{
                height: "320px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body p-4">
              <h4 className="fw-bold text-primary mb-3">
                Apa itu BookStore?
              </h4>

              <p className="text-muted">
                BookStore merupakan platform toko buku online
                yang dirancang untuk memudahkan pelanggan dalam
                mencari dan membeli berbagai pilihan buku.
              </p>

              <p className="text-muted">
                Melalui platform ini, pelanggan dapat melihat
                koleksi buku, mengetahui informasi buku,
                menambahkan buku ke keranjang, serta melakukan
                pemesanan dan pembayaran secara online.
              </p>

              <p className="text-muted mb-0">
                BookStore menyediakan pengalaman berbelanja
                buku yang praktis dan mudah diakses oleh
                pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fitur BookStore */}
      <h5 className="fw-bold mb-3">Fitur BookStore</h5>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="fa-solid fa-book-open text-primary fs-3 mb-3"></i>
              <h6 className="fw-bold">Koleksi Buku</h6>
              <p className="text-muted small mb-0">
                Menampilkan berbagai pilihan buku beserta
                informasi dan detailnya.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="fa-solid fa-cart-shopping text-primary fs-3 mb-3"></i>
              <h6 className="fw-bold">Keranjang Belanja</h6>
              <p className="text-muted small mb-0">
                Memudahkan pelanggan mengelola buku yang
                ingin dipesan.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="fa-solid fa-credit-card text-primary fs-3 mb-3"></i>
              <h6 className="fw-bold">Pembayaran Online</h6>
              <p className="text-muted small mb-0">
                Mendukung proses pembayaran pesanan melalui
                Midtrans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}