import { Bookmark, Briefcase, DollarSign, MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendJob = ({
  job
}) => {
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const diff = currentTime - createdAt;
    return Math.floor(diff/(1000*24*60*60));
  }
  return (
    // <div className="p-5 rounded-md shadow-md bg-white border hover:shadow-xl transition">
    <div className="min-w-[340px] bg-white md:min-w-[380px] snap-center flex flex-col justify-between shadow-lg rounded-2xl p-6 transition transform hover:scale-101 hover:shadow-xl">
      {/* Company Info */}
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 object-contain rounded-md border bg-gray-50 p-1"
          src={
            job?.company?.logo ||
            "https://cdn.pixabay.com/photo/2022/09/18/07/41/logo-7462411_1280.png"
          }
          alt=""
        />
        <div>
          <h1 className="font-semibold text-gray-800 text-lg">
            {job?.company?.name}
          </h1>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" /> {job?.location}
          </p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-4">
        <h1 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full px-3 py-1">
          <Briefcase className="w-4 h-4" /> {job?.position} Positions
        </span>
        <span className="bg-red-50 text-red-700 text-xs font-medium rounded-full px-3 py-1">
          {job?.jobType}
        </span>
        <span className="flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full px-3 py-1">
          <DollarSign className="w-4 h-4" /> {job?.salary} LPA
        </span>
      </div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/description/${job?._id}`);
        }}
        className="mt-5 w-full py-2 text-white font-medium bg-gradient-to-r from-red-600 to-red-400 rounded-lg shadow-md hover:from-red-500 hover:to-red-500 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default RecommendJob;
