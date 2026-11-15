import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <AdminNavbar />

      <AdminSidebar />

      <main
        style={{
          marginLeft: "256px",
          paddingTop: "88px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "16px",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            minHeight: "calc(100vh - 104px)",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
