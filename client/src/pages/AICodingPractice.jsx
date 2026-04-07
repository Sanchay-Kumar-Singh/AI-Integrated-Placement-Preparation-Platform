import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { FiCode, FiPlayCircle } from "react-icons/fi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function AICodingQuiz() {
  const { getToken } = useAuth();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

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
        setAnswers({});
        setScore(null);
      }
    } catch {
      toast.error("Error generating questions");
    } finally {
      setLoading(false);
    }
  };

  // ================= ANSWER SELECT =================
  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    setScore(correct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-200 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FiCode /> AI Coding Quiz
          </h1>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter Topic (DSA, DBMS, OS...)"
            className="w-full p-3 border rounded-lg mb-3"
          />

          <div className="flex gap-2 mb-4">
            {["Easy", "Medium", "Hard", "Mixed"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3 py-1 rounded ${
                  difficulty === lvl
                    ? "bg-purple-600 text-white"
                    : "border"
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
            <FiPlayCircle /> {loading ? "Generating..." : "Start Quiz"}
          </button>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">
                {i + 1}. {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`block p-2 border rounded cursor-pointer ${
                      answers[i] === opt
                        ? "bg-purple-100 border-purple-500"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => handleSelect(i, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {/* SHOW CORRECT AFTER SUBMIT */}
              {score !== null && (
                <p className="mt-2 text-sm">
                  ✅ Correct Answer:{" "}
                  <span className="font-bold text-green-600">
                    {q.answer}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        {questions.length > 0 && score === null && (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit Quiz
          </button>
        )}

        {/* SCORE */}
        {score !== null && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold">
              Your Score: {score} / {questions.length}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}