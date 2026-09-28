import TourCard from "../../shared/TourCard";
import tourData from "../../assets/data/tours";

const FeaturedTourList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tourData?.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default FeaturedTourList;