import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div id="home" className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
            Temukan Buku Favoritmu
          </h1>

          <p className="lead">
            Temukan berbagai pilihan buku menarik untuk menemani waktu membaca
            kamu. Mulai dari cerita yang menginspirasi, petualangan yang seru,
            hingga buku yang menambah wawasan dan pengetahuan.
          </p>

          <p className="text-body-secondary">
            BookStore hadir untuk membantu kamu menemukan koleksi buku yang
            sesuai dengan minat dan kebutuhanmu. Jelajahi berbagai pilihan buku
            dan temukan cerita atau pengetahuan baru yang menarik untuk dibaca.
          </p>

          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <Link
              to="/books"
              className="btn btn-outline-primary btn-lg px-4"
            >
              Jelajahi Buku
            </Link>
          </div>
        </div>

        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img
            className="d-block mx-lg-auto img-fluid rounded"
            src="https://images.unsplash.com/photo-1597105026857-eda9652f9e49?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Koleksi buku di perpustakaan"
            width="700"
            height="500"
          />
        </div>
      </div>
    </div>
  );
}