export const CategorySkeleton = () => {
    return (
      <div className="flex items-center bg-gray-100 rounded-lg shadow p-4 animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="ml-4">
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }