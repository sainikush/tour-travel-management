import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AdminSidenav from "./AdminSidenav";
import AdminTopbar from "./AdminTopbar";

const TITLES = {
  "/admin":           "Dashboard",
  "/admin/tours":     "Tour Packages",
  "/admin/bookings":  "Bookings",
  "/admin/customers": "Customers",
};

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const title =
    TITLES[pathname] ||
    Object.entries(TITLES).find(([path]) => pathname.startsWith(path + "/"))?.[1] ||
    "Admin";

  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidenav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar title={title} onMenuClick={() => setMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />       {/* ← MUST BE HERE */}
        </main>
      </div>
    </div>
  );
}