



const calculateAvgRating = (reviews = []) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return { totalRating: 0, avgRating: 0, reviewCount: 0 };
  }

  const totalRating = reviews.reduce(
    (sum, r) => sum + (Number(r?.rating) || 0),
    0
  );

  const avgRating = Number((totalRating / reviews.length).toFixed(1));

  return {
    totalRating,
    avgRating,
    reviewCount: reviews.length,
  };
};

export default calculateAvgRating;