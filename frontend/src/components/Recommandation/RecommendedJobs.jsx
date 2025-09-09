import { useEffect, useState } from "react";
import axios from "axios";
import Jobs from "@/components/Job/Jobs";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import JobSkeleton from "../skelton/jobSkelton";

const RecommendedJobs = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/recommendations`, { withCredentials: true });
        console.log(res);
        if (res.data.success) {
          setRecommendedJobs(res.data.recommendations);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 my-10">
      <h2 className="text-3xl font-bold mb-4">
        Recommended <span className="text-red-500">Jobs</span>
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <JobSkeleton key={idx} />
          ))}
        </div> )
        : recommendedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {recommendedJobs.map((job, index) => (
            <Jobs key={index} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recommendations found. Add skills to your profile!</p>
      )}
    </div>
  );
};

export default RecommendedJobs;
