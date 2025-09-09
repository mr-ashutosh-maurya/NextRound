import React, { useState } from "react";
import Companiestable from "./Companiestable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();

  const { companies } = useSelector((store) => store.company);
  const [filter, setFilter] = useState("");

  // ✅ Filter companies by name (case-insensitive)
  const filteredCompanies = companies?.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl my-10 mx-auto px-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <input
          className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <button
          className="w-full sm:w-auto bg-red-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-600 transition"
          onClick={() => navigate("/admin/companies/create")}
        >
          + New Company
        </button>
      </div>

      {/* Company Table */}
      <Companiestable companies={filteredCompanies} />
    </div>
  );
};

export default Companies;
