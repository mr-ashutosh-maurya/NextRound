import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Funnel, Menu, X } from "lucide-react";
import Filter from "@/components/Job/Filter";
import Jobs from "@/components/Job/Jobs";
import Footer from "@/components/Home/Footer";

const Job = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const checkSalaryRange = (salary, range) => {
    if (!salary) return false;
    const salaryValue = parseInt(salary); // assumes "12 LPA"
    switch (range) {
      case "3-5 LPA":
        return salaryValue >= 3 && salaryValue <= 5;
      case "5-10 LPA":
        return salaryValue >= 5 && salaryValue <= 10;
      case "10-20 LPA":
        return salaryValue >= 10 && salaryValue <= 20;
      case "20-50 LPA":
        return salaryValue >= 20 && salaryValue <= 50;
      case "50+ LPA":
        return salaryValue > 50;
      default:
        return true;
    }
  };

  const filteredJobs = allJobs.filter((job) => {
    return (
      (!filters.Location || job.location === filters.Location) &&
      (!filters.Industry ||
        job.title?.toLowerCase().includes(filters.Industry.toLowerCase())) &&
      (!filters.Salary || checkSalaryRange(job.salary, filters.Salary))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Available <span className="text-red-500">Jobs</span>
        </h1>
        <button
          onClick={() => setShowFilter(true)}
          className="p-2 border rounded-md"
        >
          <Funnel />
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filter */}
        <div
          className={`fixed md:static top-0 left-0 h-full md:h-auto w-3/5 md:w-1/5 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
            ${showFilter ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Filter Header for mobile */}
          <div className="flex justify-between items-center p-4 border-b md:hidden">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={() => setShowFilter(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable filter content */}
          <div className="h-[calc(100vh-56px)] md:h-auto p-4">
            <Filter
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Overlay for mobile */}
        {showFilter && (
          <div
            onClick={() => setShowFilter(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
          ></div>
        )}

        {/* Job Listings */}
        <div className="flex-1">
          <h1 className="hidden md:block text-3xl font-bold mb-6">
            Available <span className="text-red-500">Jobs</span>
          </h1>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job, index) => (
                <Jobs key={index} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No jobs found for selected filters.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Job;
