import React from "react";
import logo from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function Compiler() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-950 p-4 md:p-5 flex md:flex-col justify-between shadow-xl">
        <div className="w-full">
          <div className="flex flex-col md:items-start items-center mb-4 md:mb-8">
            <img
              src={logo}
              onClick={() => navigate("/")}
              alt="logo"
              className="w-32 md:w-40 cursor-pointer rounded"
            />

            <h1 className="text-lg md:text-xl font-bold flex items-center gap-2 mt-3">
              <Code2 size={22} />
              Dev Compiler
            </h1>
          </div>
        </div>

        <div className="hidden md:block text-sm text-gray-500">
          Scroll Mode
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Navbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
          <h2 className="text-lg md:text-xl font-semibold">
            Scroll & Use Multiple Compilers
          </h2>
          <p className="text-xs md:text-sm text-gray-400">
            Each section runs separately
          </p>
        </div>

        <Section title="C Compiler" url="https://onecompiler.com/c" />
        <Section title="C++ Compiler" url="https://onecompiler.com/cpp" />
        <Section title="Python Compiler" url="https://onecompiler.com/python" />
        <Section title="Java Compiler" url="https://onecompiler.com/java" />
        <Section title="JavaScript Compiler" url="https://onecompiler.com/javascript" />

        {/* Info */}
        <div className="p-4 bg-slate-900 border-t border-slate-700">
          <h3 className="text-base md:text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-400 text-sm">
            Scroll and use different language compilers. Each compiler runs
            independently, so you can code in multiple languages on the same screen.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, url }) => {
  return (
    <div className="p-3 md:p-4">
      <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
      <div className="h-[350px] md:h-[500px] border border-slate-700 rounded-xl overflow-hidden">
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};