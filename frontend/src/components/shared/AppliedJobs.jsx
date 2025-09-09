// import React from "react";
// import { useSelector } from "react-redux";

// function AppliedJobs() {
//   const {allAppliedJobs} = useSelector(store=>store.job);
//   console.log(allAppliedJobs)

//   return (
//     <div className="mt-5">
//       <h1 className="text-lg font-bold mb-3">Applied Jobs</h1>
//       <table className="w-full border border-gray-300 text-sm text-left rounded-md overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">Date</th>
//             <th className="px-4 py-2 border">Job Role</th>
//             <th className="px-4 py-2 border">Company</th>
//             <th className="px-4 py-2 border">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allAppliedJobs.map((appliedJob) => (
//             <tr key={appliedJob._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border">{appliedJob?.job?.status}</td>
//               <td className="px-4 py-2 border">{appliedJob?.job?.status}</td>
//               <td className="px-4 py-2 border">{appliedJob?.job?.status}</td>
//               <td className="px-4 py-2 border">
//                 <span
//                   className={`px-2 py-1 rounded-md text-xs font-medium ${
//                     appliedJob?.job?.status === "Selected"
//                       ? "bg-green-100 text-green-700"
//                       : appliedJob?.job?.status === "Rejected"
//                       ? "bg-red-100 text-red-700"
//                       : appliedJob?.job?.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-blue-100 text-blue-700"
//                   }`}
//                 >
//                   {appliedJob?.job?.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AppliedJobs;

import React from "react";
import { useSelector } from "react-redux";

function AppliedJobs() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log("Applied Jobs from Redux:", allAppliedJobs);

  const applications = allAppliedJobs?.applications || []; // ✅ fix
  // console.log(applications)

  // Helper for status badge
  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${
          colors[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold mb-3">Applied Jobs {allAppliedJobs.length}</h1>
      <table className="w-full border border-gray-300 text-sm text-left rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Job Role</th>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id} className="hover:bg-gray-50">
                {/* Date applied */}
                <td className="px-4 py-2 border">
                  {appliedJob?.createdAt
                    ? new Date(appliedJob.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                {/* Job title */}
                <td className="px-4 py-2 border">
                  {appliedJob?.job?.title || "—"}
                </td>

                {/* Company name */}
                <td className="px-4 py-2 border">
                  {appliedJob?.job?.company?.name || "—"}
                </td>

                {/* Status */}
                <td className="px-4 py-2 border">
                  {getStatusBadge(appliedJob?.status)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-500 italic"
              >
                No jobs applied yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobs;

