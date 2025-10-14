import React, { useRef, useState, useEffect } from "react";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import RecommendJob from "./JobCrousel";
import JobSkeleton from "../skelton/jobSkelton";

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState([]);
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/similar-viewed`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) setSimilarJobs(res.data.similar);
      } catch (err) {
        console.error("Error fetching similar jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSimilar();

    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrolled = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setProgress(scrolled);
      }
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="my-10 rounded-lg max-w-7xl mx-auto px-6 bg-gray-50 py-10">
      <h2 className="text-2xl font-bold mb-4">
        What are you looking for today?
      </h2>
      <h2 className="text-2xl font-bold text-gray-500 mb-4">
        May You intrested{" "}
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <JobSkeleton key={idx} />
          ))}
        </div> )
        : similarJobs.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex p-3 overflow-x-auto gap-4 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {similarJobs.map((job, idx) => (
            <RecommendJob key={idx} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No similar jobs found.</p>
      )}

      <div className="flex gap-2 mt-4 items-center justify-center">
        <div className="w-20 h-1 bg-gray-200 flex rounded-full ">
           <div
            className="h-1 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SimilarJobs;
