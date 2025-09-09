import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJob";

const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();

  const { allAdminJobs } = useSelector((store) => store.job); // ✅ get jobs from job slice
  const [filter, setFilter] = useState("");

  // ✅ Filter jobs by title
  const filteredJobs = allAdminJobs?.filter((j) =>
    j.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl my-10 mx-auto px-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <input
          className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
          type="text"
          placeholder="Filter by job title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <button
          className="w-full sm:w-auto bg-red-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-600 transition"
          onClick={() => navigate("/admin/jobs/create")}
        >
          + New Job
        </button>
      </div>

      {/* Job Table */}
      <AdminJobTable jobs={filteredJobs} />
    </div>
  );
};

export default AdminJobs;
