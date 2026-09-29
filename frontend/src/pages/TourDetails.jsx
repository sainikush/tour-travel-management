import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Users, Tag, ArrowLeft, Loader2 } from "lucide-react";

import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/images/avatar.jpg";
import Newsletter from "../shared/Newsletter";
import Booking from "../Components/Booking/Booking";
import calculateAvgRating from "../utils/avgRating";

const formatDate = (input) => {
  const d = new Date(input);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tourRating, setTourRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  /* ---- Fetch tour from API ---- */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    api
      .get(`/api/tours/${id}`)
      .then((data) => {
        if (!cancelled) setTour(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Tour not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ---- Loading ---- */
  if (loading) {
    return (
      <section className="section bg-bg">
        <div className="container-x flex justify-center py-20">
          <Loader2 className="animate-spin text-text-muted" size={32} />
        </div>
      </section>
    );
  }

  /* ---- Error / not found ---- */
  if (error || !tour) {
    return (
      <section className="section bg-bg">
        <div className="container-x text-center">
          <h1 className="mb-4">Tour not found</h1>
          <p className="text-text-muted mb-6">{error}</p>
          <Link to="/tours" className="btn-primary inline-flex">
            Back to all tours
          </Link>
        </div>
      </section>
    );
  }

  /* ---- Destructure what we need ---- */
  const {
    photo,
    title,
    description,
    desc,
    price,
    reviews = [],
    address,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  /* ---- Submit a review ---- */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isAuthed) {
      navigate("/login");
      return;
    }

    if (!tourRating || !reviewText.trim()) {
      alert("Please select a rating and write a review.");
      return;
    }

    setSubmittingReview(true);

    try {
      const updatedTour = await api.post(`/api/tours/${tour._id}/reviews`, {
        rating: tourRating,
        text: reviewText.trim(),
      });

      setTour(updatedTour);
      setTourRating(0);
      setReviewText("");
    } catch (err) {
      alert(err.message || "Could not submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <>
      <section className="section bg-bg">
        <div className="container-x">
          {/* Back link */}
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted
                       hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            Back to all tours
          </Link>

          <div className="grid grid-cols-12 gap-8 lg:gap-10">
            {/* ---- LEFT ---- */}
            <div className="col-span-12 lg:col-span-8">
              {/* Hero image */}
              <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-sm mb-6 bg-secondary-soft">
                <img
                  src={photo}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info card */}
              <div className="bg-surface border border-border rounded-lg p-6 mb-8">
                <h2 className="mb-3">{title}</h2>

                <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={16} className="fill-accent text-accent" strokeWidth={0} />
                    <span className="text-text">
                      {avgRating === 0 ? "Not rated" : avgRating}
                    </span>
                    {totalRating > 0 && (
                      <span className="text-text-muted">
                        ({reviews.length} reviews)
                      </span>
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    <MapPin size={16} strokeWidth={1.75} />
                    {address}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-y border-border mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-accent" strokeWidth={1.75} />
                    <span className="text-sm text-text">{city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-accent" strokeWidth={1.75} />
                    <span className="text-sm text-text">₹{price}/person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-accent" strokeWidth={1.75} />
                    <span className="text-sm text-text">{distance} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-accent" strokeWidth={1.75} />
                    <span className="text-sm text-text">{maxGroupSize} people</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-text mb-2">
                  Description
                </h3>
                <p className="leading-relaxed">{description || desc}</p>
              </div>

              {/* ---- Reviews ---- */}
              <div className="mt-8">
                <h3 className="mb-6">Reviews ({reviews.length})</h3>

                <form
                  onSubmit={submitHandler}
                  className="bg-surface border border-border rounded-lg p-5 mb-6"
                >
                  <p className="text-sm text-text mb-3">
                    {tourRating === 0
                      ? "How would you rate this tour?"
                      : `You rated it ${tourRating} star${tourRating > 1 ? "s" : ""}`}
                  </p>

                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setTourRating(n)}
                        aria-label={`Rate ${n} stars`}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={
                            n <= tourRating
                              ? "fill-accent text-accent"
                              : "text-border"
                          }
                          strokeWidth={n <= tourRating ? 0 : 1.5}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Share your thoughts..."
                      required
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="btn-primary shrink-0 disabled:opacity-60"
                    >
                      {submittingReview ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>

                {reviews.length === 0 ? (
                  <p className="text-sm text-text-muted py-8 text-center border border-dashed border-border rounded-lg">
                    No reviews yet. Be the first to write one.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {reviews.map((r, i) => (
                      <li
                        key={i}
                        className="bg-surface border border-border rounded-lg p-5 flex gap-4"
                      >
                        <img
                          src={avatar}
                          alt=""
                          className="w-11 h-11 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h5 className="text-sm font-medium text-text">
                              {r.name || "Anonymous"}
                            </h5>
                            <p className="text-xs text-text-muted">
                              {formatDate(r.date)}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, k) => (
                              <Star
                                key={k}
                                size={12}
                                className={
                                  k < (r.rating || 0)
                                    ? "fill-accent text-accent"
                                    : "text-border"
                                }
                                strokeWidth={0}
                              />
                            ))}
                          </div>

                          <p className="text-sm text-text-muted">
                            {r.text || "Great tour!"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ---- RIGHT: sticky booking sidebar ---- */}
            <div className="col-span-12 lg:col-span-4">
              <Booking tour={tour} avgRating={avgRating} />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default TourDetails;