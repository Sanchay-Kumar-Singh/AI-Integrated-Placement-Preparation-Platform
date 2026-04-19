import { useState } from "react";
import { Brain, Trophy, RotateCcw, ChevronRight, Clock } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ── Parse raw markdown into structured quiz questions ──────────────────────
function parseQuiz(raw) {
  const questions = [];
  const blocks = raw.split(/\n(?=\*{0,2}(?:Q?\d+[\.\)])\*{0,2}\s)/);

  for (const block of blocks) {
    if (!block.trim()) continue;
    const lines = block.trim().split("\n").filter((l) => l.trim());
    if (lines.length < 2) continue;

    const questionLine = lines[0]
      .replace(/^\*{0,2}Q?\d+[\.\)]\*{0,2}\s*/, "")
      .replace(/\*\*/g, "")
      .trim();

    const options = [];
    let answer = null;

    for (const line of lines.slice(1)) {
      const optMatch = line.match(/^[-*\s]*([A-D])[\.\)]\s*\*{0,2}(.+?)\*{0,2}$/);
      if (optMatch) options.push({ label: optMatch[1], text: optMatch[2].trim() });
      const ansMatch = line.match(/answer[:\s]+([A-D])/i);
      if (ansMatch) answer = ansMatch[1].toUpperCase();
    }

    if (questionLine && options.length === 4 && answer) {
      questions.push({ question: questionLine, options, answer });
    }
  }
  return questions.slice(0, 10);
}

// ── Shared styles ──────────────────────────────────────────────────────────
const styles = {
  wrap: {
    minHeight: "100vh",
    background: "#0b0b10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  card: {
    background: "#111118",
    border: "1px solid #1e1e2c",
    borderRadius: 20,
    padding: "2rem",
    width: "100%",
    maxWidth: 660,
  },
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b6b88",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid #1e1e2c",
    background: "#16161f",
    color: "#e0e0ec",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  },
  chip: (active) => ({
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: `1px solid ${active ? "#6d56c4" : "#1e1e2c"}`,
    background: active ? "#1f1840" : "transparent",
    color: active ? "#a48af5" : "#5a5a72",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .15s",
  }),
  primaryBtn: (disabled = false) => ({
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "none",
    background: disabled ? "#1f1840" : "#4f36c8",
    color: disabled ? "#5a4f90" : "#e8e0ff",
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "inherit",
    transition: "opacity .15s",
    marginTop: 24,
  }),
};

// ── Main Component ─────────────────────────────────────────────────────────
export default function TechQuizGenerator() {
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [phase, setPhase] = useState("setup");

  const { getToken } = useAuth();

  // ── Generate ───────────────────────────────────────────────────────────
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
          toast.error("Couldn't parse quiz — try a different topic.");
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

  const pickOption = (label) => {
    if (selected) return;
    setSelected(label);
  };

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
  const progress = questions.length ? (current / questions.length) * 100 : 0;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrap}  >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0%   { transform: scale(.94); opacity: 0; }
          60%  { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fadeUp { animation: fadeUp .35s ease both; }
        .pop    { animation: pop .3s cubic-bezier(.34,1.56,.64,1) both; }
        .opt-row { transition: border-color .12s, background .12s, transform .1s; }
        .opt-row:hover:not(.locked) { transform: translateX(4px); border-color: #3a3a52 !important; }
      `}</style>

      {/* ── SETUP ──────────────────────────────────────────────────────── */}
      {phase === "setup" && (
        <div className="fadeUp " style={styles.card}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 34, borderRadius: 9,
              background: "#1f1840", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={16} color="#a48af5" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 600, color: "#e0e0ec" }}>
             AI Quiz generator
            </span>
          </div>
          <p style={{ fontSize: 16, color: "#5a5a72", marginBottom: 28 }}>
            10 questions · instant feedback ·<span style={{color:"#0bd95a"}} > final score</span>
          </p>

          <form onSubmit={handleGenerate}>
            <div style={{ marginBottom: 20 }}>
              <label style={styles.label}>Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="React, Machine Learning, DBMS…"
                style={styles.input}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Difficulty</label>
              <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                {difficulties.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    style={styles.chip(difficulty === d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.primaryBtn(loading)}>
              {loading ? (
                <span style={{
                  width: 16, height: 16, border: "2px solid #a48af5",
                  borderTopColor: "transparent", borderRadius: "50%",
                  animation: "spin .7s linear infinite", display: "inline-block",
                }} />
              ) : (
                <><Brain size={15} /> Generate quiz</>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ── QUIZ ───────────────────────────────────────────────────────── */}
      {phase === "quiz" && (
        <div className="fadeUp" style={styles.card}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#7c5fde", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              {topic}
            </span>
            <span style={{ fontSize: 12, color: "#5a5a72" }}>
              {current + 1} / {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#1e1e2c", borderRadius: 3, marginBottom: 22, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "#4f36c8", borderRadius: 3,
              transition: "width .4s ease",
            }} />
          </div>

          {/* Question */}
          <p
            key={current}
            className="pop"
            style={{ fontSize: 15, fontWeight: 500, color: "#e0e0ec", lineHeight: 1.6, marginBottom: 18 }}
          >
            {q.question}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.options?.map((opt) => {
              const isCorrect = opt.label === q.answer;
              const isChosen = opt.label === selected;

              let borderColor = "#1e1e2c";
              let bg = "#16161f";
              let textColor = "#b0b0c8";
              let labelBg = "#1e1e2c";
              let labelColor = "#5a5a72";

              if (selected) {
                if (isCorrect) {
                  bg = "#0d2318"; borderColor = "#1a5c35"; textColor = "#4ade80";
                  labelBg = "#1a5c35"; labelColor = "#4ade80";
                } else if (isChosen) {
                  bg = "#220f18"; borderColor = "#7f2d3a"; textColor = "#f87171";
                  labelBg = "#7f2d3a"; labelColor = "#f87171";
                }
              }

              return (
                <button
                  key={opt.label}
                  onClick={() => pickOption(opt.label)}
                  className={`opt-row${selected ? " locked" : ""}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "11px 14px", borderRadius: 10,
                    border: `1px solid ${borderColor}`,
                    background: bg, color: textColor,
                    fontSize: 13, fontWeight: 400, textAlign: "left",
                    cursor: selected ? "default" : "pointer",
                    width: "100%", fontFamily: "inherit",
                  }}
                >
                  <span style={{
                    minWidth: 26, height: 26, borderRadius: 7,
                    background: labelBg, color: labelColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 600,
                  }}>
                    {opt.label}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Next button */}
          {selected && (
            <button onClick={next} className="pop" style={styles.primaryBtn()}>
              {current + 1 < questions.length ? "Next question" : "See results"}
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      )}

      {/* ── RESULT ─────────────────────────────────────────────────────── */}
      {phase === "result" && (
        <div className="fadeUp" style={styles.card}>
          {/* Trophy + heading */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Trophy
              size={36}
              color={score >= 7 ? "#f59e0b" : score >= 4 ? "#94a3b8" : "#f87171"}
              style={{ margin: "0 auto 10px" }}
            />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#e0e0ec", marginBottom: 4 }}>
              Quiz complete!
            </h2>
            <p style={{ fontSize: 13, color: "#5a5a72" }}>
              {topic} · {difficulty}
            </p>
          </div>

          {/* Score ring */}
          <div style={{
            width: 110, height: 110, borderRadius: "50%", margin: "0 auto 24px",
            border: `5px solid ${score >= 7 ? "#22c55e" : score >= 4 ? "#f59e0b" : "#f87171"}`,
            background: "#16161f",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontSize: 34, fontWeight: 600, lineHeight: 1,
              color: score >= 7 ? "#4ade80" : score >= 4 ? "#fbbf24" : "#f87171",
            }}>
              {score}
            </span>
            <span style={{ fontSize: 12, color: "#5a5a72", marginTop: 2 }}>
              / {questions.length}
            </span>
          </div>

          {/* Review */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
            {answers.map((a, i) => {
              const pass = a.chosen === a.correct;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px", borderRadius: 9,
                    background: pass ? "#0d2318" : "#220f18",
                    border: `1px solid ${pass ? "#1a5c35" : "#7f2d3a"}`,
                  }}
                >
                  <span style={{ fontSize: 13, minWidth: 18, color: pass ? "#4ade80" : "#f87171" }}>
                    {pass ? "✓" : "✗"}
                  </span>
                  <span style={{ color: "#b0b0c8", fontSize: 12, flex: 1 }}>
                    Q{i + 1} — {questions[i]?.question?.slice(0, 58)}{questions[i]?.question?.length > 58 ? "…" : ""}
                  </span>
                  {!pass && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#4ade80" }}>
                      Ans: {a.correct}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button onClick={restart} style={{ ...styles.primaryBtn(), marginTop: 0 }}>
            <RotateCcw size={14} /> Try again
          </button>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { RotateCcw, ChevronRight, Clock } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "@clerk/clerk-react";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// // ── Parse raw markdown into structured quiz questions ──────────────────────
// function parseQuiz(raw) {
//   const questions = [];
//   const blocks = raw.split(/\n(?=\*{0,2}(?:Q?\d+[\.\)])\*{0,2}\s)/);

//   for (const block of blocks) {
//     if (!block.trim()) continue;

//     const lines = block.trim().split("\n").filter((l) => l.trim());
//     if (lines.length < 2) continue;

//     const questionLine = lines[0]
//       .replace(/^\*{0,2}Q?\d+[\.\)]\*{0,2}\s*/, "")
//       .replace(/\*\*/g, "")
//       .trim();

//     const options = [];
//     let answer = null;

//     for (const line of lines.slice(1)) {
//       const optMatch = line.match(/^[-*\s]*([A-D])[\.\)]\s*\*{0,2}(.+?)\*{0,2}$/);
//       if (optMatch) {
//         options.push({ label: optMatch[1], text: optMatch[2].trim() });
//       }
//       const ansMatch = line.match(/answer[:\s]+([A-D])/i);
//       if (ansMatch) answer = ansMatch[1].toUpperCase();
//     }

//     if (questionLine && options.length === 4 && answer) {
//       questions.push({ question: questionLine, options, answer });
//     }
//   }
//   return questions.slice(0, 10);
// }

// // ── Shared styles ──────────────────────────────────────────────────────────
// const s = {
//   wrap: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2rem",
//     fontFamily: "'Inter', system-ui, sans-serif",
//   },
//   card: {
//     background: "#ffffff",
//     border: "1px solid #e5e5e3",
//     borderRadius: 16,
//     padding: "2rem",
//     width: "100%",
//   },
//   tag: {
//     fontSize: 11,
//     fontWeight: 600,
//     letterSpacing: "0.07em",
//     textTransform: "uppercase",
//     color: "#888",
//     marginBottom: 6,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 600,
//     color: "#111",
//     marginBottom: 4,
//   },
//   sub: {
//     fontSize: 13,
//     color: "#888",
//     lineHeight: 1.6,
//   },
//   fieldLabel: {
//     display: "block",
//     fontSize: 11,
//     fontWeight: 600,
//     letterSpacing: "0.06em",
//     textTransform: "uppercase",
//     color: "#888",
//     marginBottom: 8,
//   },
//   input: {
//     width: "100%",
//     padding: "10px 14px",
//     fontSize: 15,
//     borderRadius: 10,
//     border: "1px solid #e0e0de",
//     background: "#fafaf8",
//     color: "#111",
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   divider: {
//     height: 1,
//     background: "#f0f0ee",
//     margin: "1.25rem 0",
//   },
//   chip: (active) => ({
//     flex: 1,
//     padding: "8px",
//     fontSize: 13,
//     borderRadius: 8,
//     border: `1px solid ${active ? "#111" : "#e0e0de"}`,
//     background: active ? "#111" : "transparent",
//     color: active ? "#fff" : "#666",
//     cursor: "pointer",
//     fontWeight: active ? 500 : 400,
//     transition: "all 0.15s",
//   }),
//   btnPrimary: {
//     width: "100%",
//     padding: "11px",
//     fontSize: 14,
//     fontWeight: 500,
//     borderRadius: 10,
//     border: "1px solid #e0e0de",
//     background: "#111",
//     color: "#fff",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   btnSecondary: {
//     width: "100%",
//     padding: "11px",
//     fontSize: 14,
//     fontWeight: 500,
//     borderRadius: 10,
//     border: "1px solid #e0e0de",
//     background: "#fff",
//     color: "#111",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
// };

// // ── Main Component ─────────────────────────────────────────────────────────
// const TechQuizGenerator = () => {
//   const difficulties = ["Beginner", "Intermediate", "Advanced"];

//   const [topic, setTopic] = useState("");
//   const [difficulty, setDifficulty] = useState("Beginner");
//   const [loading, setLoading] = useState(false);

//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [phase, setPhase] = useState("setup");

//   const { getToken } = useAuth();

//   // ── Generate quiz ──────────────────────────────────────────────────────
//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     if (!topic.trim()) return toast.error("Enter a topic");

//     try {
//       setLoading(true);

//       const prompt = `Generate exactly 10 multiple-choice quiz questions about "${topic}" at ${difficulty} level.

// Format STRICTLY as:
// 1. <question text>
// A) <option>
// B) <option>
// C) <option>
// D) <option>
// Answer: <letter>

// Repeat for all 10 questions. No extra commentary.`;

//       const { data } = await axios.post(
//         "/api/ai/generate-quiz",
//         { topic: prompt, difficulty },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       if (data.success) {
//         const parsed = parseQuiz(data.content);
//         if (parsed.length < 2) {
//           toast.error("Couldn't parse quiz. Try a different topic.");
//         } else {
//           setQuestions(parsed);
//           setCurrent(0);
//           setSelected(null);
//           setAnswers([]);
//           setPhase("quiz");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//     setLoading(false);
//   };

//   // ── Handle option pick ─────────────────────────────────────────────────
//   const pickOption = (label) => {
//     if (selected) return;
//     setSelected(label);
//   };

//   // ── Next question ──────────────────────────────────────────────────────
//   const next = () => {
//     const q = questions[current];
//     const newAnswers = [...answers, { chosen: selected, correct: q.answer }];
//     setAnswers(newAnswers);

//     if (current + 1 < questions.length) {
//       setCurrent(current + 1);
//       setSelected(null);
//     } else {
//       setPhase("result");
//     }
//   };

//   // ── Restart ────────────────────────────────────────────────────────────
//   const restart = () => {
//     setPhase("setup");
//     setQuestions([]);
//     setCurrent(0);
//     setSelected(null);
//     setAnswers([]);
//     setTopic("");
//   };

//   const score = answers.filter((a) => a.chosen === a.correct).length;
//   const q = questions[current] || {};
//   const progress = questions.length ? (current / questions.length) * 100 : 0;
//   const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

//   const scoreMsg =
//     score >= 8 ? "Excellent work!" : score >= 5 ? "Good effort!" : "Keep going!";
//   const scoreSub =
//     score >= 8
//       ? `You really know your ${topic}`
//       : score >= 5
//       ? `Keep practicing ${topic}`
//       : `Review the basics of ${topic}`;

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div style={s.wrap}>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
//         rel="stylesheet"
//       />

//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .fade-up { animation: fadeUp 0.3s ease both; }
//         .opt-btn { transition: border-color 0.15s, background 0.15s; }
//         .opt-btn:hover:not(.locked) { border-color: #999 !important; background: #fafaf8 !important; }
//         .gen-btn:hover:not(:disabled) { background: #222 !important; }
//         .secondary-btn:hover { background: #f5f5f3 !important; }
//         .next-btn:hover { background: #f5f5f3 !important; }
//         .chip-btn:hover { opacity: 0.85; }
//         .spin-icon { animation: spin 0.7s linear infinite; }
//       `}</style>

//       {/* ── SETUP ─────────────────────────────────────────────────────── */}
//       {phase === "setup" && (
//         <div className="fade-up" style={{ width: "100%", maxWidth: 460 }}>
//           <div style={{ marginBottom: "1.25rem", paddingLeft: 4 }}>
//             <div style={s.title}>AI Quiz Generator</div>
//             <div  className="text-[15px]">Build your quiz</div>
//             <div style={s.sub}>10 questions · instant feedback · final score</div>
//           </div>

//           <div style={s.card}>
//             <form onSubmit={handleGenerate}>
//               <label style={s.fieldLabel}>Topic</label>
//               <input
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="e.g. React, DSA, DBMS, Networks…"
//                 style={s.input}
//                 required
//               />

//               <div style={s.divider} />

//               <label style={s.fieldLabel}>Difficulty</label>
//               <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
//                 {difficulties.map((d) => (
//                   <button
//                     key={d}
//                     type="button"
//                     className="chip-btn"
//                     onClick={() => setDifficulty(d)}
//                     style={s.chip(difficulty === d)}
//                   >
//                     {d}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 type="submit"
//                 className="gen-btn"
//                 disabled={loading}
//                 style={{
//                   ...s.btnPrimary,
//                   opacity: loading ? 0.7 : 1,
//                   cursor: loading ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spin-icon"
//                       style={{
//                         display: "inline-block",
//                         width: 15,
//                         height: 15,
//                         border: "1.5px solid #fff",
//                         borderTopColor: "transparent",
//                         borderRadius: "50%",
//                       }}
//                     />
//                     Generating…
//                   </>
//                 ) : (
//                   <>
//                     <Clock size={15} />
//                     Generate quiz
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── QUIZ ──────────────────────────────────────────────────────── */}
//       {phase === "quiz" && (
//         <div className="fade-up" style={{ width: "100%", maxWidth: 560 }}>
//           {/* Header above card */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-end",
//               marginBottom: "1rem",
//               paddingLeft: 4,
//               paddingRight: 4,
//             }}
//           >
//             <div>
//               <div style={s.tag}>{topic}</div>
//               <div style={{ fontSize: 15, fontWeight: 500, color: "#111" }}>
//                 {difficulty} level
//               </div>
//             </div>
//             <div style={{ fontSize: 13, color: "#888" }}>
//               {current + 1} / {questions.length}
//             </div>
//           </div>

//           <div style={s.card}>
//             {/* Progress bar */}
//             <div
//               style={{
//                 height: 3,
//                 background: "#f0f0ee",
//                 borderRadius: 4,
//                 overflow: "hidden",
//                 marginBottom: "1.5rem",
//               }}
//             >
//               <div
//                 style={{
//                   height: "100%",
//                   width: `${progress}%`,
//                   background: "#111",
//                   borderRadius: 4,
//                   transition: "width 0.4s ease",
//                 }}
//               />
//             </div>

//             {/* Question */}
//             <p
//               key={current}
//               style={{
//                 fontSize: 16,
//                 fontWeight: 500,
//                 color: "#111",
//                 lineHeight: 1.6,
//                 marginBottom: "1.25rem",
//               }}
//             >
//               {q.question}
//             </p>

//             {/* Options */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {q.options?.map((opt) => {
//                 const isCorrect = opt.label === q.answer;
//                 const isChosen = opt.label === selected;

//                 let bg = "#fafaf8";
//                 let border = "#e5e5e3";
//                 let color = "#333";
//                 let labelBg = "#f0f0ee";
//                 let labelColor = "#666";

//                 if (selected) {
//                   if (isCorrect) {
//                     bg = "#f0faf4";
//                     border = "#86efac";
//                     color = "#166534";
//                     labelBg = "#dcfce7";
//                     labelColor = "#166534";
//                   } else if (isChosen) {
//                     bg = "#fff5f5";
//                     border = "#fca5a5";
//                     color = "#991b1b";
//                     labelBg = "#fee2e2";
//                     labelColor = "#991b1b";
//                   }
//                 }

//                 return (
//                   <button
//                     key={opt.label}
//                     onClick={() => pickOption(opt.label)}
//                     className={`opt-btn${selected ? " locked" : ""}`}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 12,
//                       padding: "12px 14px",
//                       borderRadius: 10,
//                       border: `1px solid ${border}`,
//                       background: bg,
//                       color,
//                       fontSize: 14,
//                       textAlign: "left",
//                       cursor: selected ? "default" : "pointer",
//                       width: "100%",
//                     }}
//                   >
//                     <span
//                       style={{
//                         minWidth: 28,
//                         height: 28,
//                         borderRadius: 7,
//                         background: labelBg,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: 12,
//                         fontWeight: 600,
//                         color: labelColor,
//                         flexShrink: 0,
//                       }}
//                     >
//                       {opt.label}
//                     </span>
//                     {opt.text}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Next button */}
//             {selected && (
//               <button
//                 onClick={next}
//                 className="next-btn"
//                 style={{
//                   ...s.btnSecondary,
//                   marginTop: "1.25rem",
//                   borderTop: "1px solid #f0f0ee",
//                   paddingTop: "1.25rem",
//                   borderRadius: 0,
//                   border: "none",
//                   borderTop: "1px solid #f0f0ee",
//                 }}
//               >
//                 {current + 1 < questions.length ? "Next question" : "See results"}
//                 <ChevronRight size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ── RESULT ────────────────────────────────────────────────────── */}
//       {phase === "result" && (
//         <div className="fade-up" style={{ width: "100%", maxWidth: 520 }}>
//           <div style={{ marginBottom: "1rem", paddingLeft: 4 }}>
//             <div style={s.tag}>Quiz complete</div>
//             <div style={s.title}>Your results</div>
//           </div>

//           {/* Score summary card */}
//           <div style={{ ...s.card, marginBottom: "1rem" }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem",
//               }}
//             >
//               {/* Score ring */}
//               <div
//                 style={{
//                   width: 88,
//                   height: 88,
//                   minWidth: 88,
//                   borderRadius: "50%",
//                   border: `3px solid ${
//                     score >= 7 ? "#86efac" : score >= 4 ? "#fcd34d" : "#fca5a5"
//                   }`,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: 28,
//                     fontWeight: 600,
//                     color:
//                       score >= 7 ? "#166534" : score >= 4 ? "#92400e" : "#991b1b",
//                     lineHeight: 1,
//                   }}
//                 >
//                   {score}
//                 </span>
//                 <span style={{ fontSize: 12, color: "#888" }}>
//                   / {questions.length}
//                 </span>
//               </div>

//               <div>
//                 <div
//                   style={{ fontSize: 16, fontWeight: 600, color: "#111", marginBottom: 4 }}
//                 >
//                   {scoreMsg}
//                 </div>
//                 <div style={s.sub}>{scoreSub}</div>
//               </div>
//             </div>

//             {/* Stat boxes */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: 10,
//                 marginBottom: "1.5rem",
//               }}
//             >
//               {[
//                 { label: "Correct", value: score, color: "#166534", bg: "#f0faf4" },
//                 {
//                   label: "Wrong",
//                   value: questions.length - score,
//                   color: "#991b1b",
//                   bg: "#fff5f5",
//                 },
//                 { label: "Score", value: `${pct}%`, color: "#111", bg: "#f5f5f3" },
//               ].map(({ label, value, color, bg }) => (
//                 <div
//                   key={label}
//                   style={{
//                     background: bg,
//                     borderRadius: 10,
//                     padding: "12px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ fontSize: 22, fontWeight: 600, color }}>
//                     {value}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 11,
//                       color: "#888",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.05em",
//                       marginTop: 2,
//                     }}
//                   >
//                     {label}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={restart}
//               className="secondary-btn"
//               style={s.btnSecondary}
//             >
//               <RotateCcw size={15} />
//               Try another quiz
//             </button>
//           </div>

//           {/* Per-question breakdown card */}
//           <div style={s.card}>
//             <div
//               style={{
//                 fontSize: 11,
//                 fontWeight: 600,
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//                 color: "#888",
//                 marginBottom: 12,
//               }}
//             >
//               Question breakdown
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//               {answers.map((a, i) => {
//                 const ok = a.chosen === a.correct;
//                 const qtext = questions[i]?.question?.slice(0, 58);
//                 const truncated = questions[i]?.question?.length > 58;

//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 10,
//                       padding: "9px 12px",
//                       borderRadius: 10,
//                       border: `1px solid ${ok ? "#86efac" : "#fca5a5"}`,
//                       background: ok ? "#f0faf4" : "#fff5f5",
//                       fontSize: 13,
//                     }}
//                   >
//                     <span
//                       style={{
//                         color: ok ? "#166534" : "#991b1b",
//                         fontSize: 14,
//                         minWidth: 18,
//                       }}
//                     >
//                       {ok ? "✓" : "✗"}
//                     </span>
//                     <span
//                       style={{ flex: 1, color: ok ? "#166534" : "#991b1b" }}
//                     >
//                       Q{i + 1} — {qtext}
//                       {truncated ? "…" : ""}
//                     </span>
//                     {!ok && (
//                       <span
//                         style={{
//                           fontSize: 12,
//                           color: "#166534",
//                           fontWeight: 500,
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         Ans: {a.correct}
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TechQuizGenerator;