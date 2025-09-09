import { MoreHorizontal, Pen, Users } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminJobTable = ({ jobs }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // track which row is open

  return (
    <div>
      <h1 className="text-lg font-bold mb-3">Recent Posted Jobs</h1>
      <p className="text-sm text-gray-500 mb-3">Total: {jobs?.length || 0}</p>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Job Title</th>
              <th className="px-4 py-2 border">Company</th>
              <th className="px-4 py-2 border">Posted</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={job._id || index} className="hover:bg-gray-50 relative">
                  <td className="px-4 py-2 border font-medium text-gray-800">
                    {job.title}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {job.company?.name || "—"}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === job._id ? null : job._id)
                      }
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Dropdown */}
                    {openDropdown === job._id && (
                      <div className="absolute right-4 top-10 bg-white border shadow-md rounded-md text-sm w-32 z-10">
                        <Link
                          to={`/admin/companies/${job._id}`}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        >
                          <Pen className="w-4 h-4" /> Edit
                        </Link>
                        <Link
                          to={`/admin/jobs/${job._id}/applicants`}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        >
                          <Users className="w-4 h-4" /> Applicants
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No jobs posted yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={job._id || index}
              className="border rounded-lg p-4 shadow-sm flex items-center justify-between relative"
            >
              <div>
                <h2 className="font-semibold text-gray-800">{job.title}</h2>
                <p className="text-xs text-gray-500">
                  {job.company?.name || "—"} •{" "}
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === job._id ? null : job._id)
                }
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* Dropdown for mobile */}
              {openDropdown === job._id && (
                <div className="absolute right-4 top-14 bg-white border shadow-md rounded-md text-sm w-32 z-10">
                  <Link
                    to={`/admin/jobs/${job._id}`}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <Pen className="w-4 h-4" /> Edit
                  </Link>
                  <Link
                    to={`/admin/jobs/${job._id}/applicants`}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <Users className="w-4 h-4" /> Applicants
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No jobs posted yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobTable;
