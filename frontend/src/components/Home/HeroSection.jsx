import { Search } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="px-6 bg-gradient-to-r from-red-50 via-white to-red-100 ">
      {/* <div className="max-w-7xl mx-auto flex  flex-col lg:flex-row item-center  justify-between px-6 sm:px-10 lg:px-16 "> */}
      <div className="flex flex-col md:flex-row flex-wrap rounded-lg ">

        {/* Left Content */}
        {/* <div className="flex flex-col  text-center py-12 lg:py-20 lg:text-left"> */}
        <div className="md:w-1/2 px-4 flex flex-col items-start justify-center gap-4  m-auto md:py-[8vw] md:mb-[-30px]">

          {/* Badge */}
          <span className="px-4 py-2 mt-7 md:mt-0 lg:mt-0 rounded-full bg-red-100 text-red-600 font-semibold text-xs sm:text-sm shadow-sm animate-bounce self-center lg:self-start">
            🚀 No. 1 Job Hunt Website
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mt-3 leading-snug lg:leading-tight">
            Apply to Get Your <span className="text-red-500">Dream Job</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600  max-w-xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg">
            Discover thousands of opportunities and take the next step in your
            career journey with us.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md sm:max-w-lg flex items-stretch border border-gray-200 shadow-lg rounded-full mt-4 sm:mt-4 p-2 bg-white transition focus-within:ring-2 focus-within:ring-red-400 mx-auto lg:mx-0">
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
        <div className="md:w-1/2 sm:w-2/3 relative flex items-end">
          <img
            className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            src="./girls-4.png"
            alt="hero"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
