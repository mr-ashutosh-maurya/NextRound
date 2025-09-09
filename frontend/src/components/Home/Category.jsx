import React, { useRef, useState, useEffect } from "react";
import { Code, Database, Brain, Palette, Layers, Laptop } from "lucide-react";

const categories = [
  {
    title: "Frontend Developer",
    description: "Craft beautiful and responsive UIs with modern frameworks.",
    color: "bg-gradient-to-b from-blue-400 to-blue-300",
    salary: "Salary up to 15 LPA",
    icon: <Code className="h-10 w-10 text-white" />,
  },
  {
    title: "Backend Developer",
    description: "Build scalable APIs and manage server-side logic.",
    color: "bg-gradient-to-b from-green-400 to-green-300",
    salary: "Salary up to 18 LPA",
    icon: <Database className="h-10 w-10 text-white" />,
  },
  {
    title: "Data Science",
    description: "Analyze data, create models, and drive insights.",
    color: "bg-gradient-to-br from-purple-400 to-pink-300",
    salary: "Salary up to 20 LPA",
    icon: <Brain className="h-10 w-10 text-white" />,
  },
  {
    title: "Machine Learning",
    description: "Build intelligent systems that learn from data.",
    color: "bg-gradient-to-tr from-yellow-400 to-orange-300",
    salary: "Salary up to 22 LPA",
    icon: <Layers className="h-10 w-10 text-white" />,
  },
  {
    title: "Graphics Designer",
    description: "Design visually stunning graphics and experiences.",
    color: "bg-gradient-to-r from-pink-400 to-red-300",
    salary: "Salary up to 12 LPA",
    icon: <Palette className="h-10 w-10 text-white" />,
  },
  {
    title: "Fullstack Developer",
    description: "Master both frontend and backend development.",
    color: "bg-gradient-to-r from-indigo-400 to-cyan-300",
    salary: "Salary up to 25 LPA",
    icon: <Laptop className="h-10 w-10 text-white" />,
  },
];

const Category = () => {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrolled = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setProgress(scrolled);
      }
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="mt-16 px-6">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 ">
        🚀 Explore <span className="text-red-500">Job</span> Categories
      </h2>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex p-3 overflow-x-auto gap-4 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`min-w-[300px] md:min-w-[350px] snap-center flex flex-col justify-between ${cat.color} shadow-lg rounded-2xl p-6 transition transform hover:scale-105 hover:shadow-2xl`}
          >
            {/* Icon */}
            <div className="mb-4">{cat.icon}</div>

            {/* Title */}
            <h3 className="font-bold text-xl text-white">{cat.title}</h3>

            {/* Description */}
            <p className="text-white/90 text-sm mt-2 flex-grow">
              {cat.description}
            </p>

            {/* Salary */}
            <p className="text-white font-semibold mt-3">{cat.salary}</p>

            {/* Button */}
            <button className="mt-4 bg-white text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
              Explore Now
            </button>
          </div>
        ))}
      </div>

      {/* Progress Bar */}

    <div className="flex mt-2 items-center justify-center">
        <div className="w-20 h-2 bg-gray-200 rounded-full mb-4">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Category;
