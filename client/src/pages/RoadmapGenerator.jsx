import { useState } from "react";
import { Sparkles, Map, Copy } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RoadmapGenerator = () => {
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) return toast.error("Enter a topic");

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/generate-roadmap",
        { topic, level },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Roadmap Generated 🚀");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied");
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      
      {/* LEFT PANEL */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">
            AI Roadmap Generator
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Topic</p>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Web Development, DSA, AI..."
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-4 text-sm font-medium">Level</p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {levels.map((item) => (
            <span
              key={item}
              onClick={() => setLevel(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                level === item
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Map className="w-5" />
          )}
          Generate Roadmap
        </button>
      </form>

      {/* RIGHT PANEL */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">
              Generated Roadmap
            </h1>
          </div>

          {content && (
            <button
              onClick={copyToClipboard}
              className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
            >
              <Copy size={14} />
              Copy
            </button>
          )}
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
              <Map className="w-9 h-9" />
              <p>Enter a topic and generate roadmap</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;

// import { useState } from "react";
// import { Sparkles, Map, Copy, ChevronRight, GraduationCap, Layout, Target, Zap } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Markdown from "react-markdown";
// import { useAuth } from "@clerk/clerk-react";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const RoadmapGenerator = () => {
//   const levels = [
//     { name: "Easy", icon: <Zap size={14} />, color: "text-green-600", bg: "bg-green-50" },
//     { name: "Intermediate", icon: <Target size={14} />, color: "text-blue-600", bg: "bg-blue-50" },
//     { name: "Hard", icon: <Sparkles size={14} />, color: "text-red-600", bg: "bg-red-50" },
//   ];

//   const [topic, setTopic] = useState("");
//   const [level, setLevel] = useState("Easy");
//   const [loading, setLoading] = useState(false);
//   const [content, setContent] = useState("");

//   const { getToken } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!topic.trim()) return toast.error("Please enter a topic");

//     try {
//       setLoading(true);
//       const { data } = await axios.post(
//         "/api/ai/generate-roadmap",
//         { topic, level },
//         {
//           headers: { Authorization: `Bearer ${await getToken()}` },
//         }
//       );

//       if (data.success) {
//         setContent(data.content);
//         toast.success("Roadmap Crafted! 🚀");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error("AI is resting. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(content);
//     toast.success("Copied to clipboard");
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
//         {/* LEFT: INPUT SECTION */}
//         <div className="lg:col-span-4 space-y-6">
//           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-100/50 border border-purple-50">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200">
//                 <Layout className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold tracking-tight">Roadmap AI</h1>
//                 <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Mastery Engine</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="text-sm font-bold text-slate-600 ml-1">Learning Topic</label>
//                 <input
//                   type="text"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                   placeholder="e.g. Master Three.js"
//                   className="w-full mt-2 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-purple-400 focus:bg-white transition-all outline-none text-slate-700 font-medium"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-bold text-slate-600 ml-1 mb-3 block">Complexity</label>
//                 <div className="grid grid-cols-1 gap-3">
//                   {levels.map((item) => (
//                     <button
//                       key={item.name}
//                       type="button"
//                       onClick={() => setLevel(item.name)}
//                       className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
//                         level === item.name
//                           ? "border-purple-500 bg-purple-50/50 shadow-sm"
//                           : "border-slate-100 hover:border-slate-200 bg-white"
//                       }`}
//                     >
//                       <div className={`p-2 rounded-lg ${level === item.name ? "bg-purple-500 text-white" : "bg-slate-100 text-slate-400"}`}>
//                         {item.icon}
//                       </div>
//                       <span className={`font-bold ${level === item.name ? "text-purple-700" : "text-slate-500"}`}>
//                         {item.name}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 disabled={loading}
//                 className="w-full group relative flex justify-center items-center gap-3 bg-slate-900 hover:bg-purple-600 text-white py-5 rounded-2xl font-bold transition-all duration-300 overflow-hidden"
//               >
//                 {loading ? (
//                   <span className="w-6 h-6 rounded-full border-3 border-white/30 border-t-white animate-spin"></span>
//                 ) : (
//                   <>
//                     <span>Generate Journey</span>
//                     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* RIGHT: THE VISUAL ROADMAP */}
//         <div className="lg:col-span-8">
//           <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col min-h-[700px]">
//             <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                 <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Generated Path</h2>
//               </div>
              
//               {content && (
//                 <button
//                   onClick={copyToClipboard}
//                   className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
//                 >
//                   <Copy size={14} />
//                   COPY RAW
//                 </button>
//               )}
//             </div>

//             <div className="p-8 md:p-12 flex-1 relative">
//               {/* THE PURPLE LINE */}
//               {content && (
//                 <div className="absolute left-12 md:left-16 top-10 bottom-10 w-1 bg-gradient-to-b from-purple-500 via-indigo-400 to-transparent rounded-full hidden sm:block"></div>
//               )}

//               {!content && !loading ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-purple-200 blur-3xl opacity-30 rounded-full"></div>
//                     <Map className="w-24 h-24 text-slate-200 relative z-10" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-400">Ready to start?</h3>
//                     <p className="text-slate-400 mt-2 max-w-sm font-medium">
//                       Enter a topic to generate a beautiful, step-by-step visual learning path.
//                     </p>
//                   </div>
//                 </div>
//               ) : loading ? (
//                 <div className="space-y-10 animate-pulse mt-4">
//                     {[1,2,3].map(i => (
//                         <div key={i} className="flex gap-6">
//                             <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
//                             <div className="flex-1 space-y-3">
//                                 <div className="h-6 bg-slate-100 rounded w-1/4"></div>
//                                 <div className="h-20 bg-slate-50 rounded-2xl w-full"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//               ) : (
//                 <div className="relative z-10">
//                   <article className="prose prose-slate max-w-none 
//                     prose-h1:text-3xl prose-h1:font-black prose-h1:text-slate-900 prose-h1:mb-10
//                     prose-h2:text-xl prose-h2:font-bold prose-h2:text-purple-600 prose-h2:mt-12
//                     prose-p:text-slate-500 prose-p:leading-relaxed
//                     prose-li:list-none prose-li:pl-0">
//                     <Markdown
//                       components={{
//                         // This transforms every list item into a "Roadmap Card"
//                         li: ({ children }) => (
//                           <div className="relative pl-10 md:pl-14 mb-8 group">
//                             <div className="absolute left-[-11px] md:left-[-7px] top-1 w-5 h-5 bg-white border-4 border-purple-500 rounded-full z-20 transition-transform group-hover:scale-125"></div>
//                             <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300">
//                               <span className="text-slate-700 font-bold text-lg leading-tight block">
//                                 {children}
//                               </span>
//                             </div>
//                           </div>
//                         ),
//                         h1: ({children}) => <h1 className="flex items-center gap-4">🚀 {children}</h1>,
//                         h2: ({children}) => <h2 className="flex items-center gap-2 border-b-2 border-purple-50 pb-2 mb-6">📍 {children}</h2>
//                       }}
//                     >
//                       {content}
//                     </Markdown>
//                   </article>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadmapGenerator;