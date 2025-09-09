import React, { useState } from "react";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
    profile: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // to show the loading animation
  const { loading } = useSelector((store) => store.auth);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setForm({ ...form, profile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle submit
   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", form.fullName);
    formData.append("email", form.email);
    formData.append("phoneNumber", form.phone);
    formData.append("password", form.password);
    formData.append("role", form.role);
    if (form.profile) {
      formData.append("file", form.profile);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful 🎉"); // ✅ success toast
        setTimeout(() => navigate("/login"), 1500); // small delay so user sees toast
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Try again."
      ); // ✅ error toast
    } finally {
          dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 py-5">
      <div className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter phone number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Register As</label>
            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={form.role === "student"}
                  onChange={handleChange}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === "recruiter"}
                  onChange={handleChange}
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2">
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
              Sign Up
            </button>
          )}
          </div>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
