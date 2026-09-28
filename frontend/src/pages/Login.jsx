import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

const Login = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [role, setRole] = useState(
    params.get("role") === "admin" ? "admin" : "customer",
  );

  // Keep the URL in sync with the active tab
  useEffect(() => {
    setParams(role === "admin" ? { role: "admin" } : {}, { replace: true });
  }, [role, setParams]);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: real auth call. Backend returns { user, role, token }.
    if (role === "admin") {
      localStorage.setItem("admin_token", "dev");
      navigate("/admin");
    } else {
      localStorage.setItem("customer_token", "dev");
      navigate("/home");
    }
  };

  const isAdmin = role === "admin";

  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-4xl mx-auto">
          <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left: illustration */}
            <div
              className="hidden md:flex items-center justify-center
                            bg-secondary-soft p-8 lg:p-10"
            >
              <img
                src={loginImg}
                alt=""
                className="w-full max-w-xs object-contain"
              />
            </div>

            {/* Right: form */}
            <div className="p-8 md:p-10">
              {/* Admin mode: extra brand line above form */}
              {isAdmin && (
                <div
                  className="flex items-center justify-between mb-6 pb-4
                                border-b border-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="font-display text-base text-primary">
                      Wayfare Admin
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    Role-based access
                  </span>
                </div>
              )}

              {/* Role tabs */}
              <div className="flex justify-center mb-6">
                <div
                  className="inline-flex items-center gap-1 bg-bg border border-border
                                rounded-md p-1"
                >
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`px-5 py-2 text-sm font-medium rounded-sm transition-colors ${
                      !isAdmin
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`px-5 py-2 text-sm font-medium rounded-sm transition-colors ${
                      isAdmin
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* User icon */}
              <div
                className="w-14 h-14 mx-auto mb-5 rounded-full
                              bg-accent text-white
                              flex items-center justify-center"
              >
                <img src={userIcon} alt="" className="w-7 h-7 object-contain" />
              </div>

              {/* Headings */}
              <h2 className="text-center mb-1">
                {isAdmin ? "Admin sign in" : "Login"}
              </h2>
              <p className="text-center text-sm text-text-muted mb-8">
                {isAdmin
                  ? "Manage packages, bookings & customers"
                  : "Welcome back — sign in to continue"}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  id="email"
                  placeholder={isAdmin ? "Admin email" : "Email address"}
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="input"
                />

                <button type="submit" className="btn-primary w-full">
                  {isAdmin ? "Log in to dashboard" : "Login"}
                </button>
              </form>

              {/* Footer text */}
              {!isAdmin && (
                <p className="text-center text-sm text-text-muted mt-6">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-accent font-medium hover:text-accent-hover"
                  >
                    Create one
                  </Link>
                </p>
              )}

              {isAdmin && (
                <p className="text-center text-xs text-text-muted mt-6">
                  Admin access is role-restricted and logged.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
