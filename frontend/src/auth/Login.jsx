import React, { useState } from "react";
import axios from "axios"; // ✅ import axios
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { USER_API_ENDPOINT } from "@/utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // to show the loading animation
  const { loading } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student", // ✅ added role so radio buttons work
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, form, {
        headers: {
          "Content-Type": "application/json", // ✅ fixed capitalisation
        },
        withCredentials: true, // ✅ fixed spelling
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "student") {
          navigate("/");
        } else if (res.data.user.role === "recruiter") {
          navigate("/companies");
        }
        toast.success(res.data.message || "Signup successful 🎉"); // ✅ success toast
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed. Try again."); // ✅ error toast
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          )}
        </form>

        {/* Signup link */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
