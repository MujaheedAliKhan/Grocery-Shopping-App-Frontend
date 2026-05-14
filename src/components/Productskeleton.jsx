import React from 'react'

const Productskeleton = () => {
  return (
    <div>
        <div className="rounded-xl p-4 shadow-sm">
      
      {/* Image Skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>

      {/* Title */}
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>

      {/* Price */}
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>

      {/* Button */}
      <div className="mt-4 h-8 bg-gray-200 rounded animate-pulse"></div>
      
    </div>
    </div>
  )
}

export default Productskeleton
