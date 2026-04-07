
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Description = () => {
//   const navigate = useNavigate();

//   // ✅ GROUPED DATA (taken from your Navbar + Routes)
//   const sections = [
//     {
//       title: "Programming / DSA",
//       items: [
//         { name: "C", path: "/c" },
//         { name: "Python", path: "/python" },
//         { name: "Java", path: "/java" },
//         { name: "C++", path: "/cpp" },
//         { name: "Compiler", path: "/compiler" },
//         { name: "DSA", path: "/dsa" },
//         { name: "DSA Coding", path: "/dsa-coding" },
//         { name: "Core Subjects", path: "/core-subjects" },
//         { name: "100 Days Code", path: "/100-days-code" },
//       ],
//     },
//     {
//       title: "Placement Rounds",
//       items: [
//         { name: "Resume", path: "/resume" },
//         { name: "Aptitude", path: "/aptitude" },
//         { name: "Group Discussion", path: "/group-discussion" },
//         { name: "Coding Round", path: "/coding-round" },
//         { name: "Technical Interview", path: "/tech-interview" },
//         { name: "HR Interview", path: "/hr-round" },
//       ],
//     },
//     {
//       title: "Companies",
//       items: [
//         { name: "Startup Companies", path: "/startups" },
//         { name: "Service-Based", path: "/service-companies" },
//         { name: "Product-Based", path: "/product-companies" },
//         { name: "Big 4 Consulting", path: "/big4-consulting" },
//         { name: "FAANG / MAANG", path: "/faang-maang" },
//         { name: "Job Portals", path: "/job-portals" },
//       ],
//     },
//     {
//       title: "AI Tools",
//       items: [
//         { name: "AI Dashboard", path: "/ai" },
//         { name: "Roadmap Generator", path: "/ai/roadmap-generator" },
//         { name: "Tech Quiz", path: "/ai/tech-quiz" },
//         { name: "Resume Review", path: "/ai/review-resume" },
//         { name: "Write Article", path: "/ai/write-article" },
//         { name: "Blog Titles", path: "/ai/blog-titles" },
//         { name: "Generate Images", path: "/ai/generate-images" },
//         { name: "Remove Background", path: "/ai/remove-background" },
//         { name: "Remove Object", path: "/ai/remove-object" },
//       ],
//     },
//   ];

//   return (
//     <div className="w-full flex flex-col items-center py-12 px-4">
      
//       {/* TITLE */}
//       <h1 className="text-3xl md:text-5xl font-semibold text-slate-600 mb-6 text-center">
//         <span className="text-blue-600">Placement</span> Essentials
//       </h1>

//       {/* TOP LINE */}
//       <div className="w-full max-w-6xl border-t-2 border-gray-400 mb-6"></div>

//       {/* SMALL DESIGN LINES */}
//       <div className="flex flex-wrap justify-center gap-6 mb-10">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="w-24 h-[2px] bg-gray-400"></div>
//         ))}
//       </div>

//       {/* ✅ MIXED SECTIONS */}
//       <div className="w-full max-w-6xl space-y-10">
//         {sections.map((section, index) => (
//           <div key={index}>
            
//             {/* SECTION TITLE */}
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//               {section.title}
//             </h2>

//             {/* BUTTON GRID */}
//             <div className="flex flex-wrap justify-center gap-4">
//               {section.items.map((item, i) => (
//                 <button
//                   key={i}
//                   onClick={() => navigate(item.path)}
//                   className="px-5 py-3 border border-gray-400 rounded-lg bg-white text-gray-800 text-sm md:text-base font-medium
//                   hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Description;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Description = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ SAME ITEMS (used for search also)
  const items = [
    { name: "Quantitative Aptitude", path: "/aptitude" },
    { name: "Java", path: "/java" },
    { name: "Technical Concepts", path: "/tech-interview" },
    { name: "Coding Round", path: "/coding-round" },
    { name: "HR Round", path: "/hr-round" },

    { name: "Data Structures & Algorithms", path: "/dsa" },
    { name: "Coding Practice", path: "/dsa-coding" },
    { name: "MCQ Practice", path: "/aptitude" },
    { name: "Resume Build", path: "/resume" },
    { name: "150 Days Code", path: "/100-days-code" },

    { name: "TCS", path: "/service-companies" },
    { name: "Infosys", path: "/service-companies" },
    { name: "AI Dashboard", path: "/ai" },
    { name: "Write Article", path: "/ai/write-article" },
    { name: "Wipro", path: "/service-companies" },
    { name: "Core Subjects", path: "/core-subjects" },

    { name: "Roadmap Generator", path: "/ai/roadmap-generator" },
    { name: "Tech Quiz", path: "/ai/tech-quiz" },
    { name: "Resume Review", path: "/ai/review-resume" },
    { name: "Blog Titles", path: "/ai/blog-titles" },
    { name: "Accenture", path: "/service-companies" },
    { name: "Generate Images", path: "/ai/generate-images" },
    { name: "Big 4 Consulting Firms", path: "/big4-consulting" },
    { name: "Remove Background", path: "/ai/remove-background" },
    { name: "Remove Object", path: "/ai/remove-object" },
    { name: "Job Portals", path: "/job-portals" },
  ];

  // 🔍 SEARCH FUNCTION
  const handleSearch = () => {
    if (!search.trim()) return;

    const found = items.find((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (found) {
      navigate(found.path);
    } else {
      alert("No matching page found!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-semibold text-slate-600 mb-6 text-center">
        <span className="text-blue-600"> Placement</span> Essentials
      </h1>

      {/* Top Line */}
      <div className="w-full max-w-6xl border-t-2 border-gray-400 mb-6"></div>

      {/* Small lines */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-24 h-[2px] bg-gray-400"></div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="px-5 py-3 border border-gray-400 rounded-lg bg-white text-gray-800 text-sm md:text-base font-medium
                       hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 🔍 SEARCH BAR (CENTER) */}
      <div className="mt-10 md:w-full w-70 max-w-xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Search anything (Java, DSA, Resume...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

    </div>
  );
};

export default Description;