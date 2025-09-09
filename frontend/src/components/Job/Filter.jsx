// import React from "react";

// const filterData = [
//   {
//     filterType: "Location",
//     data: ["Delhi", "Noida", "Bangalore", "Gurugram", "Pune"],
//   },
//   {
//     filterType: "Industry",
//     data: ["Frontend", "Backend", "Full-Stack", "Data Scientist", "UI/UX", "ML", "DevOps"],
//   },
//   {
//     filterType: "Salary",
//     data: ["3-5 LPA", "5-10 LPA", "10-20 LPA", "20-50 LPA", "50+ LPA"],
//   },
// ];

// const Filter = ({ onFilterChange, onClearFilters }) => {
//   const handleChange = (filterType, value) => {
//     onFilterChange(filterType, value);
//   };

//   return (
//     <div className="bg-white p-5 rounded-md shadow-md">
//       <h1 className="text-xl font-bold mb-3">Filter Jobs</h1>
//       <hr className="mb-4" />

//       {filterData.map((item, index) => (
//         <div key={index} className="mb-5">
//           <h2 className="font-semibold text-gray-700 mb-2">{item.filterType}</h2>

//           <div className="flex flex-col gap-2">
//             {item.data.map((value, idx) => (
//               <label
//                 key={idx}
//                 className="flex items-center gap-2 cursor-pointer text-gray-600"
//               >
//                 <input
//                   type="radio"
//                   name={item.filterType}
//                   className="accent-red-500"
//                   onChange={() => handleChange(item.filterType, value)}
//                 />
//                 {value}
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* ✅ Clear Filters Button */}
//       <button
//         onClick={onClearFilters}
//         className="mt-4 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-red-600 transition"
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// };

// export default Filter;


import React from "react";

const filterData = [
  {
    filterType: "Location",
    data: ["Delhi", "Noida", "Bangalore", "Gurugram", "Pune"],
  },
  {
    filterType: "Industry",
    data: [
      "Frontend",
      "Backend",
      "Full-Stack",
      "Data Scientist",
      "UI/UX",
      "ML",
      "DevOps",
    ],
  },
  {
    filterType: "Salary",
    data: ["3-5 LPA", "5-10 LPA", "10-20 LPA", "20-50 LPA", "50+ LPA"],
  },
];

const Filter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (filterType, value) => {
    onFilterChange(filterType, value === "All" ? null : value);
  };

  return (
    <div className="bg-white p-5 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-3">Filter Jobs</h1>
      <hr className="mb-4" />

      {filterData.map((item, index) => (
        <div key={index} className="mb-5">
          <h2 className="font-semibold text-gray-700 mb-2">
            {item.filterType}
          </h2>

          <div className="flex flex-col gap-2">
            {/* All option */}
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="radio"
                name={item.filterType}
                className="accent-red-500"
                checked={!filters[item.filterType]} // if no filter applied, "All" is active
                onChange={() => handleChange(item.filterType, "All")}
              />
              All
            </label>

            {/* Other options */}
            {item.data.map((value, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer text-gray-600"
              >
                <input
                  type="radio"
                  name={item.filterType}
                  className="accent-red-500"
                  checked={filters[item.filterType] === value}
                  onChange={() => handleChange(item.filterType, value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* ✅ Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="mt-4 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
