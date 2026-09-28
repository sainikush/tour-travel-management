import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    // TODO: real register call → then navigate
    console.log(credentials);
    navigate("/home");
  };

  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-4xl mx-auto">
          <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2">

            {/* ---- Illustration ---- */}
            <div className="hidden md:flex items-center justify-center
                            bg-secondary-soft p-8">
              <img
                src={registerImg}
                alt=""
                className="w-full max-w-xs object-contain"
              />
            </div>

            {/* ---- Form ---- */}
            <div className="p-8 md:p-10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full
                              bg-accent text-white
                              flex items-center justify-center">
                <img src={userIcon} alt="" className="w-7 h-7 object-contain" />
              </div>

              <h2 className="text-center mb-1">Create account</h2>
              <p className="text-center text-sm text-text-muted mb-8">
                Join us — start booking tours in minutes
              </p>

              <form onSubmit={handleClick} className="space-y-4">
                {/* ✅ FIX: id="userName" matches state key */}
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
                  value={credentials.password}
                  onChange={handleChange}
                  className="input"
                />

                <button type="submit" className="btn-primary w-full">
                  Create account
                </button>
              </form>

              <p className="text-center text-sm text-text-muted mt-6">
                Already have an account?{" "}
                {/* ✅ FIX: /loginr → /login */}
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