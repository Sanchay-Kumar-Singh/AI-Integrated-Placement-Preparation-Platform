import { useState } from "react";
import { Brain, Sparkles, Trophy, RotateCcw, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ── Parse raw markdown into structured quiz questions ──────────────────────
function parseQuiz(raw) {
  const questions = [];
  // Split by question number patterns like "1." "**1.**" "Q1."
  const blocks = raw.split(/\n(?=\*{0,2}(?:Q?\d+[\.\)])\*{0,2}\s)/);

  for (const block of blocks) {
    if (!block.trim()) continue;

    // Extract question text (first line, strip numbering/markdown bold)
    const lines = block.trim().split("\n").filter((l) => l.trim());
    if (lines.length < 2) continue;

    const questionLine = lines[0]
      .replace(/^\*{0,2}Q?\d+[\.\)]\*{0,2}\s*/, "")
      .replace(/\*\*/g, "")
      .trim();

    const options = [];
    let answer = null;

    for (const line of lines.slice(1)) {
      // Option lines: "A) ...", "- A) ...", "**A)**", etc.
      const optMatch = line.match(/^[-*\s]*([A-D])[\.\)]\s*\*{0,2}(.+?)\*{0,2}$/);
      if (optMatch) {
        options.push({ label: optMatch[1], text: optMatch[2].trim() });
      }
      // Answer line: "Answer: A" or "**Answer:** B"
      const ansMatch = line.match(/answer[:\s]+([A-D])/i);
      if (ansMatch) answer = ansMatch[1].toUpperCase();
    }

    if (questionLine && options.length === 4 && answer) {
      questions.push({ question: questionLine, options, answer });
    }
  }
  return questions.slice(0, 10);
}

// ── Main Component ─────────────────────────────────────────────────────────
const TechQuizGenerator = () => {
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  // quiz state
  const [questions, setQuestions] = useState([]);  // parsed questions
  const [current, setCurrent] = useState(0);       // current question index
  const [selected, setSelected] = useState(null);  // chosen option label
  const [answers, setAnswers] = useState([]);       // { chosen, correct }[]
  const [phase, setPhase] = useState("setup");      // setup | quiz | result

  const { getToken } = useAuth();

  // ── Generate quiz ──────────────────────────────────────────────────────
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return toast.error("Enter a topic");

    try {
      setLoading(true);

      const prompt = `Generate exactly 10 multiple-choice quiz questions about "${topic}" at ${difficulty} level.

Format STRICTLY as:
1. <question text>
A) <option>
B) <option>
C) <option>
D) <option>
Answer: <letter>

Repeat for all 10 questions. No extra commentary.`;

      const { data } = await axios.post(
        "/api/ai/generate-quiz",
        { topic: prompt, difficulty },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        const parsed = parseQuiz(data.content);
        if (parsed.length < 2) {
          toast.error("Couldn't parse quiz. Try a different topic.");
        } else {
          setQuestions(parsed);
          setCurrent(0);
          setSelected(null);
          setAnswers([]);
          setPhase("quiz");
        }
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  // ── Handle option pick ─────────────────────────────────────────────────
  const pickOption = (label) => {
    if (selected) return; // already answered
    setSelected(label);
  };

  // ── Next question ──────────────────────────────────────────────────────
  const next = () => {
    const q = questions[current];
    const newAnswers = [...answers, { chosen: selected, correct: q.answer }];
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setPhase("result");
    }
  };

  // ── Restart ────────────────────────────────────────────────────────────
  const restart = () => {
    setPhase("setup");
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTopic("");
  };

  const score = answers.filter((a) => a.chosen === a.correct).length;
  const q = questions[current] || {};
  const progress = questions.length ? ((current) / questions.length) * 100 : 0;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pop  {
          0%   { transform: scale(0.92); opacity: 0; }
          60%  { transform: scale(1.03); }
          100% { transform: scale(1);    opacity: 1; }
        }
        .card { animation: fadeUp .4s ease both; }
        .opt  { transition: background .15s, border-color .15s, transform .1s; }
        .opt:hover:not(.locked) { transform: translateX(4px); }
        .spin { animation: spin .8s linear infinite; }
        .pop  { animation: pop .35s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* ── SETUP ─────────────────────────────────────────────────────── */}
      {phase === "setup" && (
        <div
          className="card"
          style={{
            background: "#16161f",
            border: "1px solid #2a2a3a",
            borderRadius: 20,
            padding: "2.5rem",
            width: "100%",
            maxWidth: 460,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Sparkles size={22} color="#a78bfa" />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#e8e8f0",
              }}
            >
              Quiz Generator
            </span>
          </div>
          <p style={{ color: "#6b6b8a", fontSize: 13, marginBottom: 28 }}>
            10 questions · instant feedback · final score
          </p>

          <form onSubmit={handleGenerate}>
            <label style={labelStyle}>Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="React, DSA, DBMS…"
              style={inputStyle}
              required
            />

            <label style={{ ...labelStyle, marginTop: 20 }}>Difficulty</label>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {difficulties.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  style={{
                    ...chipStyle,
                    background: difficulty === d ? "#2d1f52" : "transparent",
                    borderColor: difficulty === d ? "#a78bfa" : "#2a2a3a",
                    color: difficulty === d ? "#c4b5fd" : "#6b6b8a",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 32,
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span
                  className="spin"
                  style={{
                    display: "inline-block",
                    width: 18,
                    height: 18,
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <>
                  <Brain size={18} /> Generate Quiz
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ── QUIZ ──────────────────────────────────────────────────────── */}
      {phase === "quiz" && (
        <div
          className="card"
          style={{
            background: "#16161f",
            border: "1px solid #2a2a3a",
            borderRadius: 20,
            padding: "2.5rem",
            width: "100%",
            maxWidth: 560,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: "#a78bfa",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {topic}
            </span>
            <span style={{ color: "#6b6b8a", fontSize: 13 }}>
              {current + 1} / {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 4,
              background: "#2a2a3a",
              borderRadius: 4,
              marginBottom: 28,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#7c3aed,#a855f7)",
                borderRadius: 4,
                transition: "width .4s ease",
              }}
            />
          </div>

          {/* Question */}
          <p
            key={current}
            className="pop"
            style={{
              color: "#e8e8f0",
              fontSize: 17,
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            {q.question}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options?.map((opt) => {
              const isCorrect = opt.label === q.answer;
              const isChosen = opt.label === selected;
              let bg = "#1e1e2e";
              let border = "#2a2a3a";
              let color = "#c0c0d8";

              if (selected) {
                if (isCorrect) { bg = "#14281e"; border = "#22c55e"; color = "#4ade80"; }
                else if (isChosen) { bg = "#2a1520"; border = "#f87171"; color = "#f87171"; }
              }

              return (
                <button
                  key={opt.label}
                  onClick={() => pickOption(opt.label)}
                  className={`opt${selected ? " locked" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: `1.5px solid ${border}`,
                    background: bg,
                    color,
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: selected ? "default" : "pointer",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: 8,
                      background: selected
                        ? isCorrect
                          ? "#166534"
                          : isChosen
                          ? "#7f1d1d"
                          : "#2a2a3a"
                        : "#2a2a3a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: selected
                        ? isCorrect
                          ? "#4ade80"
                          : isChosen
                          ? "#f87171"
                          : "#6b6b8a"
                        : "#6b6b8a",
                    }}
                  >
                    {opt.label}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Next button */}
          {selected && (
            <button
              onClick={next}
              className="pop"
              style={{
                marginTop: 24,
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {current + 1 < questions.length ? "Next Question" : "See Results"}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* ── RESULT ────────────────────────────────────────────────────── */}
      {phase === "result" && (
        <div
          className="card"
          style={{
            background: "#16161f",
            border: "1px solid #2a2a3a",
            borderRadius: 20,
            padding: "2.5rem",
            width: "100%",
            maxWidth: 520,
            textAlign: "center",
          }}
        >
          <Trophy size={48} color="#f59e0b" style={{ margin: "0 auto 16px" }} />
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "#e8e8f0",
              marginBottom: 6,
            }}
          >
            Quiz Complete!
          </h2>
          <p style={{ color: "#6b6b8a", fontSize: 14, marginBottom: 28 }}>
            {topic} · {difficulty}
          </p>

          {/* Score ring */}
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: `6px solid ${score >= 7 ? "#22c55e" : score >= 4 ? "#f59e0b" : "#f87171"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
              background: "#1e1e2e",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: 36,
                color: score >= 7 ? "#4ade80" : score >= 4 ? "#fbbf24" : "#f87171",
              }}
            >
              {score}
            </span>
            <span style={{ color: "#6b6b8a", fontSize: 13 }}>/ {questions.length}</span>
          </div>

          {/* Per-question review */}
          <div style={{ textAlign: "left", marginBottom: 28 }}>
            {answers.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 10,
                  marginBottom: 6,
                  background: a.chosen === a.correct ? "#14281e" : "#2a1520",
                  border: `1px solid ${a.chosen === a.correct ? "#166534" : "#7f1d1d"}`,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    minWidth: 22,
                    color: a.chosen === a.correct ? "#4ade80" : "#f87171",
                  }}
                >
                  {a.chosen === a.correct ? "✓" : "✗"}
                </span>
                <span style={{ color: "#c0c0d8", fontSize: 13, flex: 1 }}>
                  Q{i + 1} — {questions[i]?.question?.slice(0, 60)}…
                </span>
                {a.chosen !== a.correct && (
                  <span style={{ color: "#4ade80", fontSize: 12 }}>Ans: {a.correct}</span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={restart}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <RotateCcw size={16} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TechQuizGenerator;

// ── Shared micro-styles ────────────────────────────────────────────────────
const labelStyle = {
  display: "block",
  color: "#9090b0",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #2a2a3a",
  background: "#1e1e2e",
  color: "#e8e8f0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const chipStyle = {
  flex: 1,
  padding: "8px 0",
  borderRadius: 8,
  border: "1.5px solid",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};