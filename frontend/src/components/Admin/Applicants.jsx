import React, { useEffect, useState } from "react";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApllicants } from "@/redux/applicationSlice";
import axios from "axios";
import { MoreVertical } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApllicants(res.data.applicants));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [params.id, dispatch]);

  // ✅ handle status update
  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        // Update in Redux
        dispatch(
          setAllApllicants(
            applicants.map((a) =>
              a._id === id ? { ...a, status } : a
            )
          )
        );
        setOpenDropdown(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ✅ Badge helper
  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yel low-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="font-bold text-xl my-5">
        Applicants ({applicants.length})
      </h1>

      <div className="space-y-4">
        {applicants.length > 0 ? (
          applicants.map((app) => (
            <div
              key={app._id}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-center relative"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    app.applicant?.profile?.profilePhoto ||
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt={app.applicant?.fullname}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {app.applicant?.fullname}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {app.applicant?.email} • {app.applicant?.phoneNumber}
                  </p>
                  <a
                    href={app.applicant?.profile?.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-xs underline"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3 relative">
                {getStatusBadge(app.status)}

                {/* Ellipsis Dropdown */}
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === app._id ? null : app._id
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {openDropdown === app._id && (
                  <div className="absolute right-0 top-10 bg-white border shadow-md rounded-md text-sm w-32 z-50">
                    <button
                      onClick={() => handleStatusChange(app._id, "pending")}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "accepted")}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "rejected")}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Rejected
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No applicants yet</p>
        )}
      </div>
    </div>
  );
};

export default Applicants;