export default function Contact() {
  return (
    <div className="container my-5">
      {/* Judul Halaman */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Kontak BookStore</h2>
        <p className="text-muted">
          Hubungi kami jika kamu memiliki pertanyaan atau membutuhkan bantuan.
        </p>
      </div>

      <div className="row g-4">
        {/* Informasi Kontak */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Informasi Kontak</h5>

              <div className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-book text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">BookStore</h6>
                  <p className="text-muted mb-0 small">
                    Platform toko buku online.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-envelope text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0 small">
                    Informasi email akan segera tersedia.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <i className="fa-solid fa-location-dot text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Alamat</h6>
                  <p className="text-muted mb-0 small">
                    Informasi alamat akan segera tersedia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Pesan */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Kirim Pesan</h5>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Terima kasih telah menghubungi BookStore!");
                  e.target.reset();
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan nama kamu"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Masukkan email kamu"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subjek</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan subjek pesan"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pesan</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Tuliskan pesan kamu"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
