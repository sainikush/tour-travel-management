import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import TourCard from "../../shared/TourCard";
import { api } from "../../lib/api";

const FeaturedTourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    api
      .get("/api/tours?featured=true")
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

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-text-muted" size={28} />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-danger-fg py-12">{error}</p>
    );
  }

  if (tours.length === 0) {
    return (
      <p className="text-center text-text-muted py-12">
        No featured tours yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default FeaturedTourList;