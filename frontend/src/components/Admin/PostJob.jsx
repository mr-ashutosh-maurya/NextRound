import React, { useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ recruiter’s company from redux
  const { companies } = useSelector((store) => store.company);

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    experience: "",
    position: "",
    companyId: companies?.[0]?._id || "", // default to first company
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, form, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job posted successfully 🎉");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Job description..."
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium">Requirements (comma-separated)</label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. React, Node.js, MongoDB"
          ></textarea>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. ₹8 LPA"
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
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. Bangalore"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium">Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium">Experience (in years)</label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. 2"
          />
        </div>

        {/* Positions */}
        <div>
          <label className="block text-sm font-medium">Number of Positions</label>
          <input
            type="number"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="e.g. 3"
          />
        </div>

        {/* Company Selection */}
        <div>
          <label className="block text-sm font-medium">Company</label>
          <select
            name="companyId"
            value={form.companyId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          >
            {companies?.length > 0 ? (
              companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))
            ) : (
              <option value="">No company registered</option>
            )}
          </select>
        </div>

        {/* Submit */}
        {loading ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md font-medium opacity-80 cursor-not-allowed"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            Please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition"
          >
            Post Job
          </button>
        )}
      </form>
    </div>
  );
};

export default PostJob;
