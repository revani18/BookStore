import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className="grow">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}