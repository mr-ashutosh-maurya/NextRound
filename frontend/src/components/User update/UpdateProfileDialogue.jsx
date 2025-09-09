import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice"; // adjust path
import { USER_API_ENDPOINT } from "@/utils/constants"; // adjust path

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio); // correct: backend looks for bio
    formData.append("skills", input.skills); // send as comma-separated string
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Profile updated 🎉");
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed. Try again.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Update Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div> */}

          <div>
            <label className="block text-gray-600 text-sm mb-1">Contact</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your contact number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Bio</label>
            <input
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Write a short bio..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* <div>
            <label className="block text-gray-600 text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Write a short bio..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none resize-none"
              rows="3"
            />
          </div> */}

          <div>
            <label className="block text-gray-600 text-sm mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="E.g. React, Node.js, MongoDB"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate multiple skills with commas
            </p>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Resume</label>
            <input
              type="file"
              name="file"
              onChange={fileHandler}
              accept="application/pdf"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            {loading ? (
              <button
                disabled
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium opacity-80 cursor-not-allowed"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialogue;
