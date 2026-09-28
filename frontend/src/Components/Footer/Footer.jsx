import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const QUICK_LINKS = [
  { path: "/home",  display: "Home"  },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
];

const SUPPORT_LINKS = [
  { path: "/gallery",  display: "Gallery"  },
  { path: "/login",    display: "Login"    },
  { path: "/register", display: "Register" },
];

const SOCIALS = [
  { label: "YouTube",   icon: "ri-youtube-line",   href: "#" },
  { label: "GitHub",    icon: "ri-github-fill",    href: "#" },
  { label: "Facebook",  icon: "ri-facebook-fill",  href: "#" },
  { label: "Instagram", icon: "ri-instagram-line", href: "#" },
];

const CONTACT = [
  { icon: "ri-map-pin-line", label: "Address", value: "Yamuna Nagar, Haryana" },
  { icon: "ri-mail-line",    label: "Email",   value: "viveksaini2@gmail.com" },
  { icon: "ri-phone-line",   label: "Phone",   value: "+43 5461 2654" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-text-inverse">
      <div className="container-x py-12 md:py-16">

        {/* ---- Top: 4 columns ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/home" className="inline-block mb-5">
              <img src={logo} alt="TravelWorld" className="h-9 w-auto" />
            </Link>

            <p className="text-sm text-text-inverse/70 max-w-xs mb-6 leading-relaxed">
              Curated tours, honest pricing, and local guides who actually
              know the places they show you.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-9 h-9
                             rounded-md border border-white/15
                             text-text-inverse/80
                             hover:bg-white/10 hover:text-text-inverse
                             transition-colors"
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-2">
            <h5 className="text-sm font-semibold uppercase tracking-[0.12em]
                           text-text-inverse/60 mb-4">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-text-inverse/85 hover:text-accent
                               transition-colors"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav className="lg:col-span-2">
            <h5 className="text-sm font-semibold uppercase tracking-[0.12em]
                           text-text-inverse/60 mb-4">
              Support
            </h5>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-text-inverse/85 hover:text-accent
                               transition-colors"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h5 className="text-sm font-semibold uppercase tracking-[0.12em]
                           text-text-inverse/60 mb-4">
              Contact
            </h5>
            <ul className="space-y-4">
              {CONTACT.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center
                                   w-8 h-8 rounded-md bg-white/5 shrink-0
                                   text-accent">
                    <i className={`${c.icon} text-base`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide
                                  text-text-inverse/50 mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-sm text-text-inverse/90 break-words">
                      {c.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ---- Bottom: copyright ---- */}
        <div className="mt-12 pt-6 border-t border-white/10
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-inverse/60">
            © {year} TravelWorld. All rights reserved.
          </p>
          <p className="text-xs text-text-inverse/60">
            Designed & developed by{" "}
            <span className="text-text-inverse/90">Vivek Saini</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;