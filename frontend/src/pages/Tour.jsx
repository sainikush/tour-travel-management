import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import CommonSection from "../shared/CommonSection";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import { api } from "../lib/api";

const ITEMS_PER_PAGE = 8;

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/api/tours")
      .then((data) => {
        if (!cancelled) setTours(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pageCount = Math.ceil(tours.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const visibleTours = tours.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <CommonSection title="All Tours" />

      <section className="bg-bg pt-8 pb-4">
        <div className="container-x">
          <SearchBar />
        </div>
      </section>

      <section className="section bg-bg pt-8">
        <div className="container-x">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-text-muted" size={28} />
            </div>
          ) : error ? (
            <p className="text-center text-danger-fg py-12">{error}</p>
          ) : visibleTours.length === 0 ? (
            <p className="text-center text-text-muted py-16">
              No tours available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center
                    text-sm font-medium transition-colors
                    ${
                      page === i
                        ? "bg-primary text-white"
                        : "border border-border text-text hover:bg-primary-soft"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default Tour;