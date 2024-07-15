import React from "react";
import { Skeleton } from "../ui/skeleton";
export const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Skeleton className="w-10 h-10 rounded-full mr-2" />
          <div>
            <Skeleton className="w-24 h-4 rounded mb-1" />
            <Skeleton className="w-32 h-4 rounded" />
          </div>
        </div>
        <Skeleton className="w-full h-6 rounded" />
      </div>
    </div>
  );
};
