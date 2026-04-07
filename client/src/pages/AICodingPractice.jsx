import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { FiCode, FiRefreshCw, FiExternalLink, FiPlayCircle } from "react-icons/fi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function AICodingPractice() {
  const { getToken } = useAuth();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState({}); // { '2026-04-07': true }

  const today = new Date().toISOString().split("T")[0];

  // ================= API =================
  const generateQuestions = async () => {
    if (!topic) return toast.error("Enter topic");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/ai/coding/start",
        { topic, difficulty },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setQuestions(data.questions);
      }
    } catch {
      toast.error("Error generating questions");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = () => {
    setProgress((prev) => ({ ...prev, [today]: true }));
    toast.success("Day marked complete ✅");
  };

  // ================= CALENDAR =================
  const getDaysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, i) => {
      const d = new Date(year, month, i + 1)
        .toISOString()
        .split("T")[0];
      return d;
    });
  };

  const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FiCode /> AI Coding Practice
          </h1>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter Topic"
            className="w-full p-3 border rounded-lg mb-3"
          />

          <div className="flex gap-2 mb-4">
            {["Easy", "Medium", "Hard", "Mixed"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3 py-1 rounded ${
                  difficulty === lvl ? "bg-purple-600 text-white" : "border"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={generateQuestions}
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlayCircle /> Generate
          </button>

          {/* QUESTIONS */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {questions.map((q, i) => (
              <div key={i} className="border p-4 rounded-xl">
                <h3 className="font-bold">{q.title}</h3>
                <p className="text-sm text-gray-500">{q.description}</p>
                <button
                  onClick={() => window.open(q.link, "_blank")}
                  className="text-blue-600 mt-2 flex items-center gap-1"
                >
                  Solve <FiExternalLink />
                </button>
              </div>
            ))}
          </div>

          {questions.length > 0 && (
            <button
              onClick={markCompleted}
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
            >
              Mark Today Complete
            </button>
          )}
        </div>

        {/* RIGHT PANEL - CALENDAR */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Monthly Progress</h2>

          <div className="grid grid-cols-7 gap-2 text-center">
            {days.map((day, i) => (
              <div
                key={i}
                className={`p-2 rounded text-sm ${
                  progress[day]
                    ? "bg-green-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {new Date(day).getDate()}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
