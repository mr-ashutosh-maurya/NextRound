import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Jobs = ({
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
    <div className="p-5 rounded-md shadow-md bg-white border hover:shadow-xl transition">
      {/* current info */}
      <div className="flex justify-between">
        <p className="text-sm gap-2 text-gray-600 bg-gray-200 rounded-2xl px-2">
          <span>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</span>
        </p>
        <button>
          <Bookmark />
        </button>
      </div>
      {/* Company Info */}
      <div className="flex gap-3 py-2" >
        <button className="h-10 w-10">
          <img
            src={job?.company?.logo ||  "https://cdn.pixabay.com/photo/2022/09/18/07/41/logo-7462411_1280.png"}
            alt=""
          />
        </button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg my-1">{job?.title}</h1>
        <p className="text-sm text-gray-700 mb-2">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-50 text-blue-700 rounded-xl px-2 py-1">
          {job?.position} Positions
        </span>
        <span className="bg-red-50 text-red-700 rounded-xl px-2 py-1">
          {job?.jobType}
        </span>
        <span className="bg-purple-50 text-purple-700 rounded-xl px-2 py-1">
          {job?.salary} LPA
        </span>
      </div>
      <div className="flex gap-3 my-2">
        <button onClick={()=>navigate(`/description/${job?._id}`)} className="px-3 py-2 cursor-pointer rounded-sm border-2 hover:bg-gray-200">Details</button>
        <button className="px-3 py-2 cursor-pointer bg-red-500 rounded-sm text-white hover:bg-red-400">Quick Apply</button>
      </div>
    </div>
  );
};

export default Jobs;
