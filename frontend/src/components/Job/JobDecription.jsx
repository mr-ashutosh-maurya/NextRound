import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "react-toastify";
import Footer from "../Home/Footer";

const JobDecription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // ✅ check if already applied (after populate)
  const isApplied =
    singleJob?.applications?.some(
      (app) => String(app.applicant?._id) === String(user?.id)
    ) || false;

  const applyHandler = async () => {
  try {
    const res = await axios.post(
      `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
      {},
      { withCredentials: true }
    );
    
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(setSingleJob(res.data.job)); // ✅ job already populated
    }
  } catch (error) {
    console.error(error);
    toast.error( "Login to apply");
  }
};


  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    if (jobId) fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-md border">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
          <p className="text-gray-500 mt-1">
            {singleJob?.company?.companyName || "Unknown"} • {singleJob?.location}
          </p>
          <div className="flex flex-wrap gap-3 my-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-2xl text-sm font-medium">
              {singleJob?.position} Positions
            </span>
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-2xl text-sm font-medium">
              {singleJob?.jobType}
            </span>
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-2xl text-sm font-medium">
              {singleJob?.salary} LPA
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <div>
          <button
            onClick={isApplied ? null : applyHandler}
            disabled={isApplied}
            className={`rounded-lg px-5 py-2 font-semibold transition ${
              isApplied
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white shadow"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
        <hr className="my-3" />

        <div className="space-y-2 text-gray-700 leading-relaxed">
          <p>
            <span className="font-bold">Role: </span>
            {singleJob?.title}
          </p>
          <p>
            <span className="font-bold">Location: </span>
            {singleJob?.location}
          </p>
          <p>
            <span className="font-bold">Salary: </span>
            {singleJob?.salary} LPA
          </p>
          <p>
            <span className="font-bold">Experience: </span>
            {singleJob?.experience || "N/A"} Years
          </p>
          <p>
            <span className="font-bold">Requirements: </span>
            {singleJob?.requirement?.join(", ")}
          </p>
          <p>
            <span className="font-bold">Total Applicants: </span>
            {singleJob?.applications?.length || 0}
          </p>
          <p>
            <span className="font-bold">Description: </span>
            {singleJob?.description}
          </p>
          <p>
            <span className="font-bold">Posted Date: </span>
            {singleJob?.updatedAt
              ? new Date(singleJob.updatedAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JobDecription;
