import { CircleAlert } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const InfoCard = () => {
    const navigate = useNavigate();
  return (
    <div className="rounded-2xl max-w-7xl mx-6 p-10 md:pb-0 bg-gradient-to-r from-white to-red-100 border border-red-200 flex items-center justify-between shadow-sm">
      {/* left side */}
      <div className="md:w-1/2">
        <div className="flex items-start gap-3 mb-4">
          <CircleAlert className="text-red-500 w-6 h-6 mt-1" />
          <h1 className="text-3xl font-bold text-gray-800">
            Register Now to Unlock Benefits
          </h1>
        </div>

        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Find AI personalised job matches</li>
          <li>Get contacted by top recruiters</li>
          <li>Apply faster with Quick Apply</li>
        </ul>

        <div className="flex gap-4">
          <button onClick={()=>navigate('/login')} className="px-6 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition">
            Login
          </button>
          <button onClick={()=>navigate('/register')} className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 rounded-lg text-white font-medium transition">
            Register
          </button>
        </div>
      </div>

      {/* right side */}
      <div className="w-1/2 hidden md:flex">
        <img
          src="./boy-job.png"
          alt="Job Search Illustration"
          className="w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default InfoCard;