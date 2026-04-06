import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {
  FiCode,
  FiRefreshCw,
  FiExternalLink,
  FiPlayCircle,
  FiLayers,
} from "react-icons/fi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AICodingPractice = () => {
  const { getToken } = useAuth();

  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  // ==============================
  // SAFE LINK OPENER (FIXED)
  // ==============================
  const openLink = (link) => {
    if (!link) return toast.error("No link available");

    const safeLink =
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : `https://${link}`;

    window.open(safeLink, "_blank");
  };

  // ==============================
  // START GENERATION
  // ==============================
  const generateQuestions = async () => {
    if (!topic) return toast.error("Please enter a topic");

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
        setStep(2);
      } else {
        toast.error("Failed to generate questions");
      }
    } catch (err) {
      console.log(err);
      toast.error("AI error while generating questions");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // REFRESH QUESTIONS
  // ==============================
  const refreshQuestions = async () => {
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
        toast.success("New questions generated!");
      }
    } catch (err) {
      toast.error("Failed to refresh questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
            <FiCode className="text-purple-600" />
            AI Coding Practice
          </h1>
          <p className="text-slate-500 text-sm">
            Get daily 3 coding problems from LeetCode, GFG & Naukri powered by AI
          </p>
        </div>

        {/* ===================== STEP 1 ===================== */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">
            <div className="space-y-5">

              {/* TOPIC */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Enter Topic
                </label>
                <input
                  className="w-full mt-2 p-3 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Arrays, DP, Graph, SQL, Java, DSA..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              {/* DIFFICULTY */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Difficulty
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["Easy", "Medium", "Hard", "Mixed"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`p-2 rounded-lg border text-sm ${
                        difficulty === lvl
                          ? "bg-purple-600 text-white"
                          : "bg-white"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={generateQuestions}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                {loading ? "Generating..." : (
                  <>
                    <FiPlayCircle /> Generate Questions
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ===================== STEP 2 ===================== */}
        {step === 2 && (
          <div className="space-y-6">

            {/* TOP BAR */}
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FiLayers /> Your 3 AI Coding Questions
              </h2>

              <button
                onClick={refreshQuestions}
                disabled={loading}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                <FiRefreshCw />
                Next Day Questions
              </button>
            </div>

            {/* QUESTIONS LIST */}
            <div className="grid md:grid-cols-3 gap-5">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow p-5 border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-purple-600 uppercase">
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-500">
                      {q.platform}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2">
                    {q.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4">
                    {q.description}
                  </p>

                  <button
                    onClick={() => openLink(q.link)}
                    className="flex items-center gap-2 text-sm text-blue-600 font-semibold"
                  >
                    Solve Now <FiExternalLink />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AICodingPractice;