import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Badge from "../admin/components/Badge";

const statusVariant = (status) =>
  status === "confirmed" ? "success" :
  status === "pending"   ? "pending" :
  status === "cancelled" ? "danger"  :
  status === "completed" ? "neutral" :
  "neutral";

const statusLabel = (status) => {
  if (status === "pending") return "Pending payment";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const MyBookings = () => {
  const { user, isAuthed, loading: authLoading } = useAuth();

  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [saved, setSaved] = useState(false);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    api
      .get("/api/bookings")
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // TODO: wire to a real PATCH /api/auth/me endpoint (not built yet)
    setSaved(true);
  };

  // Redirect if not logged in (after auth finishes loading)
  if (authLoading) {
    return (
      <section className="section bg-bg">
        <div className="container-x flex justify-center py-20">
          <Loader2 className="animate-spin text-text-muted" size={32} />
        </div>
      </section>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-4xl mx-auto">

          <h1 className="mb-8">My account</h1>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-surface border border-border rounded-md p-1">
              <button
                type="button"
                onClick={() => setTab("bookings")}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-colors ${
                  tab === "bookings"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Booking history
              </button>
              <button
                type="button"
                onClick={() => setTab("profile")}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-colors ${
                  tab === "profile"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* Booking history tab */}
          {tab === "bookings" && (
            <>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="animate-spin text-text-muted" size={28} />
                </div>
              ) : error ? (
                <p className="text-center text-danger-fg py-12">{error}</p>
              ) : bookings.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-text-muted mb-4">
                    You haven't booked any tours yet.
                  </p>
                  <Link to="/tours" className="btn-primary inline-flex">
                    Browse tours
                  </Link>
                </div>
              ) : (
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left uppercase text-xs font-semibold tracking-[0.04em] text-text-muted px-4 py-3">
                            Tour
                          </th>
                          <th className="text-left uppercase text-xs font-semibold tracking-[0.04em] text-text-muted px-4 py-3">
                            Date
                          </th>
                          <th className="text-left uppercase text-xs font-semibold tracking-[0.04em] text-text-muted px-4 py-3">
                            Travellers
                          </th>
                          <th className="text-left uppercase text-xs font-semibold tracking-[0.04em] text-text-muted px-4 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr
                            key={b._id}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="px-4 py-3.5">
                              <Link
                                to={`/tours/${b.tour?._id || b.tour}`}
                                className="text-text hover:text-accent transition-colors"
                              >
                                {b.tour?.title || "Tour"}
                              </Link>
                            </td>
                            <td className="px-4 py-3.5 text-text-muted">
                              {formatDate(b.bookAt)}
                            </td>
                            <td className="px-4 py-3.5 text-text">
                              {b.travellers}
                            </td>
                            <td className="px-4 py-3.5">
                              <Badge variant={statusVariant(b.status)}>
                                {statusLabel(b.status)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Profile tab */}
          {tab === "profile" && (
            <form
              onSubmit={handleProfileSave}
              className="max-w-md mx-auto space-y-5"
            >
              <div>
                <label className="block text-xs font-medium text-text mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="+91 98xxxxxxx0"
                  className="input"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="btn-primary rounded-md">
  Save changes
</button>
                {saved && (
                  <span className="text-sm text-success-fg">
                    Saved locally
                  </span>
                )}
              </div>

              <p className="text-xs text-text-muted pt-2">
                Profile updates will sync to the backend once the API is
                connected.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default MyBookings;