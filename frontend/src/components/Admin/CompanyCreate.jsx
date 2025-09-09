import axios from "axios";
import React, { useState } from "react";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register company");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800">Register Your Company</h1>
      <p className="text-gray-600 mt-2">
        Provide your company details to get started.
      </p>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Microsoft, Google"
          className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          onClick={() => navigate("/admin/companies")}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={registerNewCompany}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default CompanyCreate;
