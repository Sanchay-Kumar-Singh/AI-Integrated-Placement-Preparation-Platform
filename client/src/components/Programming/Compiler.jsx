import React from "react";
import logo from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import {Code2} from "lucide-react";

export default function Compiler() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-950 p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex flex-col items-start mb-8">
            <div className="text-3xl mb-2">
         <img src={logo} onClick={() => navigate("/")}
              alt="logo"
              className="w-32 sm:w-41 cursor-pointer rounded"
            />
            </div> <br />
            <h1 className="text-xl font-bold flex gap-2">   <Code2 /> Dev Compiler</h1>
          </div>
        </div>
        <div className="text-sm text-gray-500">Scroll Mode</div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Navbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
          <h2 className="text-xl font-semibold">Scroll & Use Multiple Compilers</h2>
          <p className="text-sm text-gray-400">Each section runs separately</p>
        </div>

        {/* C Compiler */}
        <Section title="C Compiler" url="https://onecompiler.com/c" />

        {/* C++ Compiler */}
        <Section title="C++ Compiler" url="https://onecompiler.com/cpp" />

        {/* Python Compiler */}
        <Section title="Python Compiler" url="https://onecompiler.com/python" />

        {/* Java Compiler */}
        <Section title="Java Compiler" url="https://onecompiler.com/java" />

        {/* JavaScript Compiler */}
        <Section title="JavaScript Compiler" url="https://onecompiler.com/javascript" />

        {/* Info */}
        <div className="p-4 bg-slate-900 border-t border-slate-700">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-400 text-sm">
            Scroll and use different language compilers. Each compiler runs independently, so you can code in multiple languages on the same screen.
          </p>
        </div>

      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, url }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-[500px] border border-slate-700 rounded-xl overflow-hidden">
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
