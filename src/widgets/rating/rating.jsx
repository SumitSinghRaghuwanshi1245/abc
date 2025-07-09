export const renderRating = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">

      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <svg
            key={`full-${index}`}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.513 8.332 1.151-6.064 5.833 1.496 8.256L12 18.897l-7.432 4.443 1.496-8.256L0 9.251l8.332-1.151z" />
          </svg>
        ))}

      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            className="h-4 w-4 fill-gray-300 text-gray-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.513 8.332 1.151-6.064 5.833 1.496 8.256L12 18.897l-7.432 4.443 1.496-8.256L0 9.251l8.332-1.151z" />
          </svg>
        ))}

      <span className="ml-2 text-sm font-medium text-gray-500">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
