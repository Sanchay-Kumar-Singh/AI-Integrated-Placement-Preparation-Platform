import React from "react";

const ToolList = () => {
  const tools = [
    { name: "AI Roadmap", path: "/ai/roadmap-generator" },
    { name: "AI Quiz", path: "/ai/tech-quiz" },
    { name: "AI Voice Interview", path: "/ai/voice-interview" },
    { name: "AI Chat Interview", path: "/ai/mock-interview" },
    { name: "AI Coding Practice", path: "/ai/coding-practice" },
    { name: "AI Resume Analyzer", path: "/ai/review-resume" },
    { name: "AI Write Article", path: "/ai/write-article" },
    { name: "AI Blog Titles", path: "/ai/blog-titles" },
    { name: "AI Generate Images", path: "/ai/generate-images" },
    { name: "AI Remove Background", path: "/ai/remove-background" },
    { name: "AI Remove Object", path: "/ai/remove-object" },
  ];

  const textColors = [
    "text-red-600",
    "text-blue-600",
    "text-green-600",
    "text-purple-600",
    "text-yellow-600",
    "text-pink-600",
  ];

  return (
    <div className="overflow-hidden w-full relative select-none py-8 -mt-38">
      
      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track flex gap-4">
          {[...tools, ...tools].map((tool, index) => (
            <a
              key={index}
              href={tool.path}
              className={`px-4 py-2 bg-white shadow-md font-medium text-[1.05rem] rounded-xl border border-[#6674e0]/20 hover:shadow-lg hover:scale-105 transition cursor-pointer whitespace-nowrap ${
                textColors[index % textColors.length]
              }`}
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>

      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default ToolList;