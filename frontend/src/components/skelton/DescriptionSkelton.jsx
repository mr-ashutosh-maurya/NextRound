import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <Skeleton height={20} width={150} className="mb-3" />
      <Skeleton height={15} width={100} className="mb-2" />
      <Skeleton count={2} height={15} className="mb-2" />
      <Skeleton height={30} width={120} className="mt-4" />
    </div>
  );
};

export default JobSkeleton;
