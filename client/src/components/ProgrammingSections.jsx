import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Database, Cpu, Braces } from "lucide-react";

const ProgrammingSections = () => {
  const navigate = useNavigate();

  const items = [
    { title: "C", icon: <Code />, path: "/c" },
    { title: "Python", icon: <Code />, path: "/python" },
    { title: "Java", icon: <Code />, path: "/java" },
    { title: "C++", icon: <Code />, path: "/cpp" },

    { title: "DSA", icon: <Database />, path: "/dsa" },
    { title: "DSA Coding", icon: <Database />, path: "/dsa-coding" },
    { title: "Core Subjects", icon: <Cpu />, path: "/core-subjects" },

    { title: "100 Days Code", icon: <Code />, path: "/100-days-code" },
  ];

  return (
    <div className="w-full bg-gray-100 py-16 px-6 md:px-20">
      
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Programming / DSA
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl">
          Learn programming languages, DSA, and core CS subjects with structured
          content designed for placement preparation.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            {/* ICON */}
            <div className="text-blue-600 mb-3">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-sm font-semibold text-gray-700 text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingSections;