import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import first from "../assets/image.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();

  // outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Programming (DSA)",
      key: "programming",
      items: [
        { name: "C", path: "/c" },
        { name: "Python", path: "/python" },
        { name: "Java", path: "/java" },
        { name: "C++", path: "/cpp" }, // FIXED
        { name: "DSA", path: "/dsa" },
        { name: "DSA Coding", path: "/dsa-coding" },
          {name:"150 Days Code",path:"/100-days-code"},
                  { name: "Compiler", path: "/compiler" },
        { name: "Core Subjects", path: "/core-subjects" },
      ],
    },
    {
      title: "Placement Rounds",
      key: "placement",
      items: [
        { name: "Resume", path: "/resume" },
        { name: "Aptitude", path: "/aptitude" },
        { name: "Group Discussion", path: "/group-discussion" },
        { name: "Coding Round", path: "/coding-round" },
        { name: "Technical Interview", path: "/tech-interview" },
        { name: "HR Interview", path: "/hr-round" },
      ],
    },
    {
      title: "Companies",
      key: "companies",
      items: [
        { name: "Startup Companies", path: "/startups" },
        { name: "Service-Based Companies", path: "/service-companies" },
        { name: "Product-Based Companies", path: "/product-companies" },
        { name: "Big 4 Consulting Firms", path: "/big4-consulting" },
        { name: "FAANG / MAANG Companies", path: "/faang-maang" },
        { name: "Job Portals", path: "/job-portals" },
      ],
    },
    {
      title: "AI Tools Services",
      key: "ai",
   items: [
  // 🔥 Core / Entry
  // { name: "Dashboard", path: "/ai" },
  { name: "AI Roadmap", path: "/ai/roadmap-generator" },
  { name: "AI Quiz", path: "/ai/tech-quiz" },

  // 🎯 Interview & Career
  { name: "AI Voice Interview", path: "/ai/voice-interview" },
  { name: "AI Chat Interview", path: "/ai/mock-interview" },
    {name:"Ai Coding Practice", path:"/ai/coding-practice"},
  { name: "AI Resume Analyzer", path: "/ai/review-resume" },

  // ✍️ Content Creation
  { name: "AI Write Article", path: "/ai/write-article" },
  { name: "AI Blog Titles", path: "/ai/blog-titles" },

  // 🎨 AI Tools (Utilities)
  { name: "AI Generate Images", path: "/ai/generate-images" },
  { name: "AI Remove BGV", path: "/ai/remove-background" },
  { name: "AI Remove Object", path: "/ai/remove-object" },

  // 🌐 Social / Community
  // { name: "Community", path: "/ai/community" },
]
    },
  ];

return (
  <div
    ref={menuRef}
    className={`fixed top-0 left-0 z-50 w-full flex justify-between items-center py-2 px-4 sm:px-20 xl:px-32 transition-all duration-300 ${
      scrolled
        ? "bg-white/80 backdrop-blur-md shadow-sm"
        : "bg-transparent"
    }`}
  >
    {/* LOGO */}
    <img
      onClick={() => navigate("/")}
      src={first}
      alt="logo"
      className="w-32 sm:w-45 cursor-pointer rounded-xl"
    />

    {/* MENU */}
    <div className="hidden md:flex gap-8 text-sm font-medium md:text-[18px] text-gray-800">
      {menuItems.map((menu) => (
        <div key={menu.key} className="relative">

          {/* MAIN TITLE */}
          <div
            onClick={() =>
              setOpenMenu(openMenu === menu.key ? null : menu.key)
            }
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
          >
            {menu.title}
            <ChevronDown size={16} />
          </div>

          {/* DROPDOWN */}
          {openMenu === menu.key && (
            <div className="absolute top-full left-0 mt-2 md:text-[15px] bg-white shadow-lg rounded-lg w-52 py-2">
              {menu.items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    navigate(item.path);
                    setOpenMenu(null);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* RIGHT */}
    {user ? (
      <UserButton />
    ) : (
      <button
        onClick={openSignIn}
        className="flex items-center gap-2 rounded-full text-sm bg-blue-600 text-white px-6 py-2.5"
      >
        Get started <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);
}
export default Navbar;