import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "01",
    userEmail: "examples@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  // ✅ FIX 1: bracket notation for computed key
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ FIX 2: correct math — subtotal + fee, not × fee
  const serviceFee = 10;
  const subtotal = Number(price) * Number(credentials.guestSize);
  const totalAmount = subtotal + Number(serviceFee);

  // ✅ FIX 3: navigate to "/thank-you" (your route name)
  const handleClick = (e) => {
    e.preventDefault();
    console.log({ tourId: tour.id, ...credentials, totalAmount });
    navigate("/thank-you");
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 lg:sticky lg:top-24 h-fit">

      {/* ========= booking top ============ */}
      <div className="flex items-baseline justify-between pb-5 mb-5 border-b border-border">
        <h3 className="flex items-baseline gap-1.5">
          <span className="text-2xl font-display font-semibold text-primary">
            ${price}
          </span>
          <span className="text-sm text-text-muted font-normal">
            /per person
          </span>
        </h3>

        <span className="inline-flex items-center gap-1 text-sm text-text">
          <i className="ri-star-s-fill text-accent"></i>
          {avgRating === 0 ? "Not rated" : avgRating}
          {" "}({reviews?.length || 0})
        </span>
      </div>

      {/* ========= booking form ============ */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-text mb-4">Information</h5>

        <form onSubmit={handleClick} className="space-y-3">
          {/* ✅ FIX 4: input id matches state key exactly — "fullName" not "fullname" */}
          <input
            type="text"
            id="fullName"
            placeholder="Full name"
            required
            value={credentials.fullName}
            onChange={handleChange}
            className="input"
          />

          <input
            type="tel"
            id="phone"
            placeholder="Phone number"
            required
            value={credentials.phone}
            onChange={handleChange}
            className="input"
          />

          {/* ✅ FIX 5: id="bookAt" matches state key — was "date" */}
          <input
            type="date"
            id="bookAt"
            required
            value={credentials.bookAt}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            id="guestSize"
            placeholder="Guests"
            min={1}
            required
            value={credentials.guestSize}
            onChange={handleChange}
            className="input"
          />

          {/* ========= price breakdown (inside form so it submits together) ========= */}
          <div className="pt-4 border-t border-border space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">
                ${price} × {credentials.guestSize}{" "}
                {Number(credentials.guestSize) === 1 ? "person" : "people"}
              </span>
              <span className="text-text">${subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Service charge</span>
              <span className="text-text">${serviceFee}</span>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border">
              <span className="font-medium text-text">Total</span>
              <span className="text-xl font-display font-semibold text-primary">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Book now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;