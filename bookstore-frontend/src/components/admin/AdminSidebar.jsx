import { Link, NavLink, useNavigate } from "react-router-dom";
import { API } from "../../_api";

const firstMenus = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "fa-solid fa-chart-pie",
  },
  { label: "Users", path: "/admin/users", icon: "fa-solid fa-clipboard-list" },
  {
    label: "Authors",
    path: "/admin/authors",
    icon: "fa-solid fa-clipboard-list",
  },
  {
    label: "Genres",
    path: "/admin/genres",
    icon: "fa-solid fa-clipboard-list",
  },
];

const secondMenus = [
  { label: "Books", path: "/admin/books", icon: "fa-solid fa-clipboard-list" },
  {
    label: "Transactions",
    path: "/admin/transactions",
    icon: "fa-solid fa-bag-shopping",
  },
];

function MenuItems({ items }) {
  return items.map((item) => (
    <li key={item.path} style={{ listStyle: "none", margin: 0, padding: 0 }}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center p-2 text-base font-medium rounded-lg group no-underline ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-900 hover:bg-gray-100"
          }`
        }
        style={{ textDecoration: "none" }}
      >
        <i className={`${item.icon} w-6 h-6 flex-shrink-0 text-gray-500`} />
        <span className="ml-3">{item.label}</span>
      </NavLink>
    </li>
  ));
}

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        await API.post("/logout");
      }
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-white border-r border-gray-200">
      <div className="overflow-y-auto py-5 px-3 h-full bg-white">
        <ul
          className="space-y-2"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <MenuItems items={firstMenus} />
        </ul>

        <ul
          className="pt-5 mt-5 space-y-2 border-t border-gray-200"
          style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
        >
          <MenuItems items={secondMenus} />

          <li style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <Link
              to="/"
              onClick={(event) => {
                event.preventDefault();
                handleLogout();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#dc2626",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#fef2f2";
                event.currentTarget.style.color = "#b91c1c";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "transparent";
                event.currentTarget.style.color = "#dc2626";
              }}
            >
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ width: "20px", textAlign: "center" }}
              />
              <span style={{ marginLeft: "12px" }}>Keluar</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
