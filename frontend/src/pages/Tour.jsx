import { useState } from "react";
import CommonSection from "../shared/CommonSection";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import tourData from "../assets/data/tours";

const ITEMS_PER_PAGE = 8;

const Tour = () => {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil((tourData?.length || 0) / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const visibleTours = tourData?.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <CommonSection title="All Tours" />

      {/* Search bar section */}
      <section className="bg-bg pt-8 pb-4">
        <div className="container-x">
          <SearchBar />
        </div>
      </section>

      {/* Tours grid */}
      <section className="section bg-bg pt-8">
        <div className="container-x">
          {visibleTours?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted py-16">
              No tours available.
            </p>
          )}

          {/* Pagination */}
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