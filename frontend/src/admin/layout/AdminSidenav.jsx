
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Users,
  LogOut,
  X,
} from "lucide-react";

const LINKS = [
  { to: "/admin",           label: "Dashboard",     icon: LayoutDashboard, end: true },
  { to: "/admin/tours",     label: "Tour Packages", icon: Package },
  { to: "/admin/bookings",  label: "Bookings",      icon: CalendarCheck },
  { to: "/admin/customers", label: "Customers",     icon: Users },
];

export default function AdminSidenav({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login?role=admin", { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky lg:top-0 z-40 lg:z-auto
          inset-y-0 left-0 w-64 shrink-0
          bg-primary text-text-inverse
          flex flex-col
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h1 className="font-display text-lg text-white leading-tight">
              Wayfare
            </h1>
            <p className="text-xs text-text-inverse/60 mt-0.5">Admin Panel</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center
                       w-8 h-8 rounded-md text-text-inverse/70
                       hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {LINKS.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
                     transition-colors ${
                       isActive
                         ? "bg-accent text-white font-medium"
                         : "text-text-inverse/80 hover:bg-white/10 hover:text-white"
                     }`
                  }
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md
                       text-sm text-text-inverse/80
                       hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={18} strokeWidth={1.75} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}





