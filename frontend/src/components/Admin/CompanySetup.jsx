import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";

const CompanySetup = () => {
  const { id } = useParams(); // companyId from route
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch company details initially
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setForm({
            name: res.data.company.name || "",
            description: res.data.company.description || "",
            website: res.data.company.website || "",
            location: res.data.company.location || "",
            logo: null,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load company details");
      }
    };

    if (id) fetchCompany();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  // Handle update
  const handleUpdate = async () => {
    if (!form.name.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("website", form.website);
      formData.append("location", form.location);
      if (form.logo) formData.append("logo", form.logo);

      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Company profile updated!");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800">Setup Company Profile</h1>
      <p className="text-gray-600 mt-2">
        Provide complete details to make your company stand out to job seekers.
      </p>

      <div className="mt-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Tell us about your company"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium">Website</label>
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="https://yourcompany.com"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="New York, USA"
          />
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm font-medium">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>
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
          onClick={handleUpdate}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CompanySetup;
