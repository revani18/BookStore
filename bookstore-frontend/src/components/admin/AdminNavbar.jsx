export default function AdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-5">
        <span className="text-xl font-semibold text-gray-900">
          BookStore
        </span>

        <span className="text-sm font-semibold text-gray-700">
          Admin
        </span>
      </div>
    </nav>
  );
}
