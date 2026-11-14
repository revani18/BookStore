import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();

  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");

  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch {
      user = null;
    }
  }

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/"}
        replace
      />
    );
  }

  return <Outlet />;
}