import { Pen } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Companiestable = ({ companies }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-lg font-bold mb-3">Registered Companies</h1>
      <p className="text-sm text-gray-500 mb-3">
        Total: {companies?.length || 0}
      </p>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Logo</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Created</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies && companies.length > 0 ? (
              companies.map((company, index) => (
                <tr key={company._id || index} className="hover:bg-gray-50">
                  {/* Logo */}
                  <td className="px-4 py-2 border">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={
                        company.logo ||
                        "https://via.placeholder.com/40x40.png?text=C"
                      }
                      alt={company.name}
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 border font-medium text-gray-800">
                    {company.name}
                  </td>

                  {/* Created Date */}
                  <td className="px-4 py-2 border text-gray-600">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-2 border">
                    <button
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm"
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                    >
                      Edit <Pen className="w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No companies registered yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {companies && companies.length > 0 ? (
          companies.map((company, index) => (
            <div
              key={company._id || index}
              className="border rounded-lg p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    company.logo ||
                    "https://via.placeholder.com/40x40.png?text=C"
                  }
                  alt={company.name}
                />
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {company.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm"
                onClick={() => navigate(`/admin/companies/${company._id}`)}
              >
                Edit <Pen className="w-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No companies registered yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Companiestable;
