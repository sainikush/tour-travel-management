import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { id, title, photo, city, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <article className="group bg-surface border border-border rounded-lg overflow-hidden
                        shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* ---- Image + badge ---- */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary-soft">
        <img
          src={photo}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover
                     group-hover:scale-[1.03] transition-transform duration-300"
        />
        {featured && (
          <span className="absolute top-3 right-3
                           bg-accent text-white text-xs font-medium
                           px-2.5 py-1 rounded-sm">
            Featured
          </span>
        )}
      </div>

      {/* ---- Body ---- */}
      <div className="p-4">

        {/* Meta row: location + rating */}
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="inline-flex items-center gap-1.5 text-text-muted">
            <i className="ri-map-pin-line text-accent" />
            {city}
          </span>

          <span className="inline-flex items-center gap-1 text-text">
            <i className="ri-star-fill text-accent" />
            {avgRating === 0 ? null : avgRating}
            {totalRating === 0
              ? <span className="text-xs text-text-muted">Not rated</span>
              : <span className="text-xs text-text-muted">({reviews.length})</span>}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium mb-4 leading-snug">
          <Link
            to={`/tours/${id}`}
            className="text-text hover:text-accent transition-colors"
          >
            {title}
          </Link>
        </h3>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="text-text">
            <span className="text-lg font-semibold text-primary">${price}</span>
            <span className="text-xs text-text-muted ml-1">/per person</span>
          </p>

          <Link
            to={`/tours/${id}`}
            className="text-sm font-medium text-accent hover:text-accent-hover
                       inline-flex items-center gap-1 transition-colors"
          >
            Book Now
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TourCard;