import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";

// PROGRAMMING (components/programming)
import C from "./components/Programming/C";
import Python from "./components/Programming/Python";
import Java from "./components/Programming/Java";
import CPP from "./components/Programming/Cpp";
import Compiler from "./components/Programming/Compiler";
import DSA from "./components/Programming/DSA";
import DSACoding from "./components/Programming/DSACoding";
import CoreSubjects from "./components/Programming/CoreSubjects";

// PLACEMENT (components/placement)
import Resume from "./components/PLacements/Resume";
import Aptitude from "./components/PLacements/Aptitude";
import GD from "./components/PLacements/Gd";
import CodingRound from "./components/PLacements/Coding";
import TechInterview from "./components/PLacements/TechInterview";
import HRRound from "./components/PLacements/HrInterview";

// COMPANIES (components/companies)
import Startups from "./components/Companies/StartupCompanies";
import ServiceCompanies from "./components/Companies/Service";
import ProductCompanies from "./components/Companies/Product";
import Big4Consulting from "./components/Companies/BigFour";
import FaangMaang from "./components/Companies/FaangMaang";
import JobPortals from "./components/Companies/JobPortal";

// AI (UNCHANGED)
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import TechQuizGenerator from "./pages/TechQuizGenerator";
import HundredDays from "./components/Programming/HundredDays";
import Community from "./pages/Community";
import MockInterview from "./pages/MockInterview";
// import VideoInterview from "./pages/VideoInterview";
import VoiceInterview from "./pages/VoiceInterview";
import AICodingPractice from "./pages/AICodingPractice";
const App = () => {
  return (
    <div>
      <Toaster />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PROGRAMMING */}
        <Route path="/c" element={<C />} />
        <Route path="/python" element={<Python />} />
        <Route path="/java" element={<Java />} />
        <Route path="/cpp" element={<CPP />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/dsa-coding" element={<DSACoding />} />
        <Route path="/core-subjects" element={<CoreSubjects />} />
        <Route path="/100-days-code" element={<HundredDays />} />

        {/* PLACEMENT */}
        <Route path="/resume" element={<Resume />} />
        <Route path="/aptitude" element={<Aptitude />} />
        <Route path="/group-discussion" element={<GD />} />
        <Route path="/coding-round" element={<CodingRound />} />
        <Route path="/tech-interview" element={<TechInterview />} />
        <Route path="/hr-round" element={<HRRound />} />

        {/* COMPANIES */}
        <Route path="/startups" element={<Startups />} />
        <Route path="/service-companies" element={<ServiceCompanies />} />
        <Route path="/product-companies" element={<ProductCompanies />} />
        <Route path="/big4-consulting" element={<Big4Consulting />} />
        <Route path="/faang-maang" element={<FaangMaang />} />
        <Route path="/job-portals" element={<JobPortals />} />

        {/* AI (UNCHANGED) */}
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="roadmap-generator" element={<RoadmapGenerator />} />
          <Route path="tech-quiz" element={<TechQuizGenerator />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="mock-interview" element={<MockInterview />} />
          {/* <Route path="video-interview" element={<VideoInterview />} /> */}
          <Route path="voice-interview" element={<VoiceInterview />} />

          <Route path="coding-practice" element={<AICodingPractice />} />
          <Route path="community" element={<Community />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;