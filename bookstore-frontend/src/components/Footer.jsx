import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container">
      <footer className="py-2 my-2">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Beranda
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/books" className="nav-link px-2 text-body-secondary">
              Buku
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-body-secondary">
              Tim
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 text-body-secondary">
              Kontak
            </Link>
          </li>
        </ul>

        <p className="text-center text-body-secondary">
          &copy; 2026 BookStore. Dibuat oleh Revani.
        </p>
      </footer>
    </div>
  );
}