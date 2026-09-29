import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register({
        name: credentials.userName,
        email: credentials.email,
        password: credentials.password,
      });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Registration failed.");
      setSubmitting(false);
    }
  };

  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-4xl mx-auto">
          <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center bg-secondary-soft p-8 lg:p-10">
              <img
                src={registerImg}
                alt=""
                className="w-full max-w-xs object-contain"
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent text-white flex items-center justify-center">
                <img src={userIcon} alt="" className="w-7 h-7 object-contain" />
              </div>

              <h2 className="text-center mb-1">Create account</h2>
              <p className="text-center text-sm text-text-muted mb-8">
                Join us — start booking tours in minutes
              </p>

              {error && (
                <div className="mb-4 px-3 py-2 rounded-md bg-danger-bg text-danger-fg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  id="userName"
                  placeholder="Username"
                  required
                  value={credentials.userName}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
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
                  minLength={6}
                  value={credentials.password}
                  onChange={handleChange}
                  className="input"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {submitting ? "Creating account..." : "Create account"}
                </button>
              </form>

              <p className="text-center text-sm text-text-muted mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-accent font-medium hover:text-accent-hover"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
