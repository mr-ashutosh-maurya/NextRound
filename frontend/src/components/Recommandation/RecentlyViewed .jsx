import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import RecommendJob from "./JobCrousel";
import JobSkeleton from "../skelton/jobSkelton";

const RecentlyViewed = () => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/recently-viewed`, { withCredentials: true });
        if (res.data.success) setRecentJobs(res.data.jobs);
        console.log(res.data.jobs);
      } catch (err) {
        console.error("Error fetching recently viewed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="my-10  max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed <span className="text-red-500">Jobs</span> </h2>
      { isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <JobSkeleton key={idx} />
          ))}
        </div> )
        : recentJobs.length > 0 ? (
        <div className="flex p-3 overflow-x-auto gap-4 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {recentJobs.map((job, idx) => <RecommendJob key={idx} job={job} />)}
        </div>
      ) : <p className="text-gray-500">No recently viewed jobs.</p>}
    </div>
  );
};

export default RecentlyViewed;
