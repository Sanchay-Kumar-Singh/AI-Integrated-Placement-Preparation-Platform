// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const MockInterview = () => {
//   const { getToken } = useAuth();

//   const [topic, setTopic] = useState("");
//   const [difficulty, setDifficulty] = useState("Easy");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const startInterview = async () => {
//     if (!topic) return toast.error("Enter topic");

//     try {
//       setLoading(true);

//       const { data } = await axios.post(
//         "/api/ai/mock/start",
//         { topic, difficulty },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       if (data.success) {
//         setQuestion(data.question);
//       }
//     } catch {
//       toast.error("Error starting interview");
//     }

//     setLoading(false);
//   };

//   const submitAnswer = async () => {
//     if (!answer) return toast.error("Write answer");

//     try {
//       setLoading(true);

//       const { data } = await axios.post(
//         "/api/ai/mock/next",
//         { topic, difficulty, answer },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       setHistory((prev) => [
//         ...prev,
//         { question, answer, response: data.content },
//       ]);

//       const nextQ = data.content.split("Next Question:")[1];
//       setQuestion(nextQ || "No next question");

//       setAnswer("");
//     } catch {
//       toast.error("Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">

//       <h1 className="text-2xl font-bold mb-4">AI Mock Interview</h1>

//       {!question && (
//         <>
//           <input
//             className="border p-2 w-full mb-3"
//             placeholder="Enter topic (DSA, HR...)"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//           />

//           <select
//             className="border p-2 w-full mb-3"
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//           >
//             <option>Easy</option>
//             <option>Intermediate</option>
//             <option>Hard</option>
//           </select>

//           <button
//             onClick={startInterview}
//             className="bg-purple-600 text-white px-4 py-2"
//           >
//             {loading ? "Starting..." : "Start Interview"}
//           </button>
//         </>
//       )}

//       {question && (
//         <>
//           <div className="bg-gray-100 p-4 mb-3">
//             <b>Question:</b> {question}
//           </div>

//           <textarea
//             className="w-full border p-2 mb-3"
//             placeholder="Write your answer..."
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />

//           <button
//             onClick={submitAnswer}
//             className="bg-green-600 text-white px-4 py-2"
//           >
//             {loading ? "Submitting..." : "Submit Answer"}
//           </button>
//         </>
//       )}

//       <div className="mt-6">
//         {history.map((item, i) => (
//           <div key={i} className="border p-3 mb-3">
//             <p><b>Q:</b> {item.question}</p>
//             <p><b>Your Answer:</b> {item.answer}</p>
//             <p><b>AI:</b> {item.response}</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default MockInterview;
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { 
  FiBookOpen, FiCode, FiSend, FiChevronRight, 
  FiCheckCircle, FiActivity, FiArrowLeft 
} from "react-icons/fi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const MockInterview = () => {
  const { getToken } = useAuth();

  // State Management
  const [step, setStep] = useState(1); // 1: Setup, 2: Interview, 3: Feedback
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 5;

  const startInterview = async () => {
    if (!topic) return toast.error("Please enter a topic or subject.");
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/ai/mock/start",
        { topic, difficulty },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setQuestion(data.question);
        setStep(2);
      }
    } catch (err) {
      toast.error("Failed to initialize AI session.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer) return toast.error("Please provide an answer before submitting.");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/ai/mock/next",
        { topic, difficulty, answer, question },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      const newHistory = [
        ...history,
        { question, answer, feedback: data.content, score: data.score || 0 },
      ];
      setHistory(newHistory);

      if (currentRound < totalRounds) {
        const nextQ = data.content.split("Next Question:")[1] || "Please solve the following...";
        setQuestion(nextQ);
        setAnswer("");
        setCurrentRound((prev) => prev + 1);
      } else {
        setStep(3); // Move to final evaluation
      }
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              AI Career <span className="text-purple-600">Simulate</span>
            </h1>
            <p className="text-slate-500 text-sm">Professional Placement Readiness Platform</p>
          </div>
          {step === 2 && (
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <div className="flex gap-1">
                {[...Array(totalRounds)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-6 rounded-full transition-all duration-500 ${i < currentRound ? 'bg-purple-500' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 1: Configuration */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FiActivity size={24}/></div>
              <h2 className="text-xl font-bold">Configure Your Session</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Interview Topic</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="e.g. Java Data Structures, System Design, React"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Easy', 'Intermediate', 'Hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        difficulty === level 
                        ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-purple-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startInterview}
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-4 hover:bg-slate-800 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? "Initializing..." : <>Begin Interview <FiChevronRight /></>}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Active Interview */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-700">
            {/* Left Column: Question & Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
                  <FiBookOpen /> <span>Question {currentRound} of {totalRounds}</span>
                </div>
                <div className="text-lg leading-relaxed text-slate-700 font-medium grow">
                  {question || <div className="animate-pulse bg-slate-100 h-24 rounded-lg"></div>}
                </div>
              </div>
            </div>

            {/* Right Column: IDE / Text Area */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-slate-400 ml-4 font-mono">Solution_Buffer.java</span>
                  </div>
                  <FiCode className="text-slate-400" />
                </div>
                <textarea
                  className="w-full h-80 bg-slate-900 text-purple-300 p-6 font-mono text-sm outline-none resize-none"
                  placeholder={topic.toLowerCase().includes("code") ? "// Paste your Java code here..." : "Type your detailed explanation here..."}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <button
                onClick={submitAnswer}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? "Processing..." : <>Submit Answer <FiSend /></>}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Final Report */}
        {step === 3 && (
          <div className="animate-in zoom-in duration-500">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-purple-600 p-8 text-white text-center">
                <FiCheckCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Session Completed!</h2>
                <p className="opacity-90 mt-2">Here is your AI-generated performance breakdown.</p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {history.map((item, i) => (
                    <div key={i} className="group border-b border-slate-100 pb-6 last:border-0">
                      <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Question {i+1}</h4>
                      <p className="text-slate-800 font-semibold mb-3">{item.question}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-sm italic text-slate-600 border border-slate-100">
                          <span className="font-bold block mb-1 text-slate-400 not-italic">Your Submission:</span>
                          {item.answer}
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-900 border border-purple-100">
                          <span className="font-bold block mb-1 text-purple-500">AI Feedback:</span>
                          {item.feedback}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <FiArrowLeft /> Start New Session
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MockInterview;