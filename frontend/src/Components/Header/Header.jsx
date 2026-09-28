import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.png";

const NAV_LINKS = [
  { path: "/home",  display: "Home"  },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const linkBase   = "text-sm font-medium transition-colors duration-150 hover:text-accent";
  const linkActive = "text-accent";
  const linkIdle   = "text-text";

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-border">
      <div className="container-x">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/home" className="flex items-center shrink-0">
            <img src={logo} alt="logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : linkIdle}`
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"    className="btn-ghost">Log in</Link>
            <Link to="/register" className="btn-primary">Sign up</Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text hover:bg-primary-soft"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open
              ? <X size={22} strokeWidth={1.75} />
              : <Menu size={22} strokeWidth={1.75} />}
          </button>

        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="container-x py-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary-soft text-primary"
                          : "text-text hover:bg-primary-soft"
                      }`
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link to="/login"    onClick={closeMenu} className="btn-outline w-full">Log in</Link>
              <Link to="/register" onClick={closeMenu} className="btn-primary w-full">Sign up</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;