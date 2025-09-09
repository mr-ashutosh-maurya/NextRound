import { Search } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-red-50 via-white to-red-100 md:pt-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-12 lg:py-20 gap-10">
        {/* Left Content */}
        <div className="flex flex-col text-center lg:text-left">
          {/* Badge */}
          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-xs sm:text-sm shadow-sm animate-bounce self-center lg:self-start">
            🚀 No. 1 Job Hunt Website
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mt-6 leading-snug lg:leading-tight">
            Apply to Get Your <span className="text-red-500">Dream Job</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mt-4 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg">
            Discover thousands of opportunities and take the next step in your
            career journey with us.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md sm:max-w-lg flex items-stretch border border-gray-200 shadow-lg rounded-full mt-6 sm:mt-8 p-2 bg-white transition focus-within:ring-2 focus-within:ring-red-400 mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="🔍 Find your dream job..."
              className="flex-grow px-4 py-2 rounded-l-full outline-none text-gray-700 text-sm sm:text-base"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 py-2 rounded-full flex items-center justify-center gap-2 transition">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-sm sm:text-base">
                Search
              </span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end  w-full lg:w-3/4">
          <img
            className="w-3/4 sm:w-2/3 lg:w-full max-w-sm sm:max-w-md lg:max-w-xl object-contain drop-shadow-xl"
            src="./girls-4.png"
            alt="Job search illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
