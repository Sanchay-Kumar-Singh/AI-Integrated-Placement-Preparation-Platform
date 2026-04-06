import { useEffect, useRef, useState } from "react";

const VideoInterview = () => {
  const videoRef = useRef(null);
  const [question, setQuestion] = useState("Tell me about yourself");

  useEffect(() => {
    startCamera();
    speak(question);
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoRef.current.srcObject = stream;
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const next = () => {
    const q = "What are your strengths?";
    setQuestion(q);
    speak(q);
  };

  return (
    <div className="p-6 text-center">

      <h1 className="text-xl font-bold">AI Video Interview</h1>

      <video ref={videoRef} autoPlay className="w-80 mx-auto mt-4 rounded-lg" />

      <p className="mt-4 bg-gray-100 p-3">{question}</p>

      <button
        onClick={next}
        className="mt-4 bg-purple-600 text-white px-4 py-2"
      >
        Next Question
      </button>

    </div>
  );
};

export default VideoInterview;