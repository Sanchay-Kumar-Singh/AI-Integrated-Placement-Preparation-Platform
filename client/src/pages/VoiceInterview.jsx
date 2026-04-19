import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInterview = () => {
  const { getToken } = useAuth();
  
  // Basic Settings
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  
  // UI & Interaction States
  const [question, setQuestion] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState("");
  const [transcript, setTranscript] = useState("");

  // Refs for stable data across re-renders/async events
  const countRef = useRef(0);
  const answersRef = useRef([]);

  // 🔊 AI SPEAK FUNCTION
  const speak = (text) => {
    window.speechSynthesis.cancel(); 
    setSpeaking(true);
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1.0;
    
    speech.onend = () => {
      setSpeaking(false);
      // Optional: Auto-trigger listening here if you want it hands-free
    };

    window.speechSynthesis.speak(speech);
  };

  // 🚀 STEP 1: START INTERVIEW
  const startInterview = async () => {
    if (!topic) return alert("Please enter a topic");
    try {
      const { data } = await axios.post(
        "/api/ai/voice/start",
        { topic, difficulty },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      
      countRef.current = 1;
      setQuestion(data.question);
      speak(data.question);
    } catch (err) {
      console.error("Start Error:", err);
    }
  };

  // 🎤 STEP 2: LISTEN & AUTO-SUBMIT
  const startListening = () => {
    if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setTranscript("Listening...");
    };

    recognition.onresult = async (event) => {
      const userAnswer = event.results[0][0].transcript;
      setTranscript(userAnswer);
      setListening(false);
      
      // Add answer to our history
      answersRef.current.push(userAnswer);

      // Call Backend for Next Step
      try {
        const isLastQuestion = countRef.current >= 5;
        
        const { data } = await axios.post(
          "/api/ai/voice/next",
          { 
            topic, 
            difficulty, 
            answer: isLastQuestion ? answersRef.current.join("\n") : userAnswer 
          },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        if (isLastQuestion) {
          setResult(data.content);
          setCompleted(true);
          speak("Interview completed. Take a look at your feedback.");
        } else {
          // Extract the next question from response
          const nextQ = data.content.split("Next Question:")[1] || data.content;
          
          countRef.current += 1; // Increment question count
          setQuestion(nextQ);
          speak(nextQ); // AI asks the new question immediately
        }
      } catch (err) {
        console.error("Transition Error:", err);
        setListening(false);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      setTranscript("Error capturing audio. Try again.");
    };

    recognition.start();
  };

  return (
<>{/* TOP HEADING */}<h1 className="text-2xl  bg-slate-900  md:text-3xl font-extrabold mb-4 text-center w-full max-w-md mx-auto ">

    <span className="text-purple-500  ">AI Voice</span>{" "}
  <span className="text-white">Interview</span>

</h1>
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-white  -mt-5 md:-mt-20">
      {/* TOP HEADING */}
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-lg font-bold text-purple-400">AI Interviewer</h2>
            <p className="text-xs text-slate-400">{topic || "Setup Phase"}</p>
          </div>
          {question && !completed && (
            <div className="px-3 py-1 bg-slate-700 rounded-full text-xs font-mono">
              Q: {countRef.current} / 5
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Central AI Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Visual Pulse for Speaking */}
              {speaking && (
                <div className="absolute -inset-4 bg-purple-500/20 rounded-full animate-ping"></div>
              )}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl border-2 transition-all duration-300 ${
                speaking ? "bg-purple-600 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "bg-slate-700 border-slate-600"
              }`}>
                {completed ? "🏁" : "🤖"}
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {speaking ? "AI is Speaking..." : listening ? "Listening to you..." : "Ready"}
            </p>
          </div>

          {/* 1. SETUP UI */}
          {!question && !completed && (
            <div className="space-y-4 animate-in fade-in">
              <input
                placeholder="Topic (e.g. Java, HR, React)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-700 border-none rounded-xl p-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-700 border-none rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Easy</option>
                <option>Intermediate</option>
                <option>Hard</option>
              </select>
              <button
                onClick={startInterview}
                className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold transition-all transform active:scale-95"
              >
                Start Interview
              </button>
            </div>
          )}

          {/* 2. ACTIVE INTERVIEW UI */}
          {question && !completed && (
            <div className="space-y-6 text-center animate-in slide-in-from-bottom-4">
              <div className="min-h-[80px] flex items-center justify-center">
                <p className="text-lg text-slate-200 font-medium leading-relaxed italic">
                   "{question}"
                </p>
              </div>

              {transcript && (
                <div className="p-3 bg-slate-900/50 rounded-lg text-sm text-purple-300 border border-purple-500/20">
                  <span className="text-slate-500 mr-2">You:</span> {transcript}
                </div>
              )}

              <button
                disabled={speaking}
                onClick={startListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  listening 
                    ? "bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                    : "bg-green-600 hover:bg-green-500 shadow-lg"
                } ${speaking ? "opacity-30 cursor-not-allowed" : "mx-auto"}`}
              >
                <span className="text-3xl">{listening ? "⏹️" : "🎤"}</span>
              </button>
              
              <p className="text-xs text-slate-500 font-medium">
                {listening ? "Talking..." : "Click mic to answer"}
              </p>
            </div>
          )}

          {/* 3. COMPLETED / RESULT UI */}
          {completed && (
            <div className="space-y-4 animate-in zoom-in-95 text-left">
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 max-h-64 overflow-y-auto">
                <h3 className="text-purple-400 font-bold mb-2">Performance Feedback</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-700 hover:bg-slate-600 py-4 rounded-xl font-bold transition-all"
              >
                Restart Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
</>
  );
};

export default VoiceInterview;

