import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const SERVICE_FEE = 10;

const Booking = ({ tour, avgRating }) => {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bookAt: "",
    guestSize: 1,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const guestSize = Number(form.guestSize) || 1;
  const subtotal = Number(tour.price) * guestSize;
  const totalAmount = subtotal + SERVICE_FEE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthed) {
      navigate("/login");
      return;
    }

    // Guard: tour must have a real MongoDB id
    if (!tour._id) {
      setError("This tour cannot be booked right now (missing id).");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/api/bookings", {
        tourId: tour._id,
        travellers: guestSize,
        bookAt: form.bookAt,
        phone: form.phone,
      });

      navigate("/thank-you");
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <aside className="lg:sticky lg:top-24 bg-surface border border-border rounded-lg p-6 h-fit">
      {/* Top: price + rating */}
      <div className="flex items-baseline justify-between pb-5 mb-5 border-b border-border">
        <p className="flex items-baseline gap-1.5">
          <span className="text-2xl font-display font-semibold text-primary">
            ${tour.price}
          </span>
          <span className="text-sm text-text-muted">/ per person</span>
        </p>

        <span className="inline-flex items-center gap-1 text-sm text-text">
          <Star size={14} className="fill-accent text-accent" strokeWidth={0} />
          {avgRating || "New"}
          <span className="text-text-muted">({tour.reviews?.length || 0})</span>
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <h5 className="text-sm font-medium text-text">Information</h5>

        {/* Full name */}
        <input
          type="text"
          id="fullName"
          placeholder="Full name"
          required
          value={form.fullName}
          onChange={handleChange}
          className="input"
        />

        {/* Phone */}
        <input
          type="tel"
          id="phone"
          placeholder="Phone number"
          required
          value={form.phone}
          onChange={handleChange}
          className="input"
        />

        {/* Date */}
        <input
          type="date"
          id="bookAt"
          required
          value={form.bookAt}
          onChange={handleChange}
          className="input"
        />

        {/* Guests — full-width row, matches other inputs */}
        <input
          type="number"
          id="guestSize"
          min={1}
          max={tour.maxGroupSize || 10}
          placeholder="Guests"
          required
          value={form.guestSize}
          onChange={handleChange}
          className="input"
        />

        {/* Error */}
        {error && (
          <div className="px-3 py-2 rounded-md bg-danger-bg text-danger-fg text-sm">
            {error}
          </div>
        )}

        {/* Price breakdown */}
        <div className="pt-4 border-t border-border space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">
              ${tour.price} × {guestSize} {guestSize === 1 ? "person" : "people"}
            </span>
            <span className="text-text">${subtotal.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Service charge</span>
            <span className="text-text">${SERVICE_FEE}</span>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border">
            <span className="font-medium text-text">Total</span>
            <span className="text-xl font-display font-semibold text-primary">
              ${totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full rounded-md disabled:opacity-60"
        >
          {submitting ? "Booking..." : "Book now"}
        </button>
      </form>
    </aside>
  );
};

export default Booking;