import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CodingQuestions = () => {
  const { getToken } = useAuth();

  const [questions, setQuestions] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState({}); // local progress

  // 🔥 FETCH QUESTIONS (DAILY 3)
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/daily",
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      console.log("API RESPONSE:", data);

      // ✅ SAFE parsing (prevents crash)
      setQuestions(Array.isArray(data?.questions) ? data.questions : []);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setQuestions([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // 💾 LOAD COMPLETED STATE
  useEffect(() => {
    const saved = localStorage.getItem("dsa_completed");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted({});
      }
    }
  }, []);

  // 💾 SAVE COMPLETED STATE
  useEffect(() => {
    localStorage.setItem("dsa_completed", JSON.stringify(completed));
  }, [completed]);

  // 🚀 LOAD ON MOUNT
  useEffect(() => {
    fetchQuestions();
  }, []);

  // ✅ TOGGLE COMPLETED
  const toggleDone = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-400">
              🧠 Daily DSA Practice
            </h1>
            <p className="text-sm text-slate-400">
              3 AI-generated questions every day
            </p>
          </div>

          <button
            onClick={fetchQuestions}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
          >
            Refresh
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-slate-400">Generating your questions...</p>
        )}

        {/* EMPTY STATE */}
        {!loading && questions.length === 0 && (
          <p className="text-slate-500">
            No questions found. Click refresh.
          </p>
        )}

        {/* QUESTIONS LIST */}
        <div className="space-y-5">
          {questions?.map((q) => (
            <div
              key={q.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5"
            >

              {/* TITLE */}
              <h2 className="text-lg font-semibold text-white">
                {q.title}
              </h2>

              {/* TAGS */}
              <div className="flex gap-2 mt-2 text-xs text-slate-400">
                <span className="bg-slate-700 px-2 py-1 rounded">
                  {q.difficulty}
                </span>
                <span className="bg-slate-700 px-2 py-1 rounded">
                  {q.topic}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-300 mt-3 text-sm">
                {q.description}
              </p>

              {/* LINKS */}
              <div className="flex gap-4 mt-4 text-sm">
                {q.leetcodeUrl && (
                  <a
                    href={q.leetcodeUrl}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    LeetCode
                  </a>
                )}

                {q.gfgUrl && (
                  <a
                    href={q.gfgUrl}
                    target="_blank"
                    className="text-green-400 hover:underline"
                  >
                    GFG
                  </a>
                )}

                {q.naukriUrl && (
                  <a
                    href={q.naukriUrl}
                    target="_blank"
                    className="text-yellow-400 hover:underline"
                  >
                    Naukri
                  </a>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-5">

                <button
                  onClick={() => toggleDone(q.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    completed[q.id]
                      ? "bg-green-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  {completed[q.id] ? "✔ Completed" : "Mark Done"}
                </button>

                {completed[q.id] && (
                  <span className="text-green-400 text-sm">
                    Completed 🎯
                  </span>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CodingQuestions;