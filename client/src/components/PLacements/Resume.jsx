import React, { useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
// ─── DATA ───────────────────────────────────────────────────────────────────
 
const resumeSections = [
  {
    id: 'building',
    label: 'Building Guide',
    icon: '🏗️',
  },
  {
    id: 'tips',
    label: 'Pro Tips',
    icon: '💡',
  },
  {
    id: 'mistakes',
    label: 'Mistakes to Avoid',
    icon: '🚫',
  },
  {
    id: 'ats',
    label: 'ATS Guide',
    icon: '🤖',
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: '📄',
  },
  {
    id: 'platforms',
    label: 'Best Platforms',
    icon: '🌐',
  },
]
 
const buildingGuide = [
  {
    step: '01',
    title: 'Contact Information',
    icon: '👤',
    color: '#3B82F6',
    must: ['Full Name (large, prominent)', 'Professional Email (gmail/outlook)', 'Phone Number with country code', 'LinkedIn Profile URL', 'GitHub Profile (for tech roles)', 'Portfolio Website / Behance'],
    avoid: ['Home address (optional in 2024)', 'Personal photo (for US/UK jobs)', 'Age or Date of Birth', 'Unprofessional email (e.g. coolguy123@)'],
    tip: 'Make your name the largest text on the page. Your email should be firstname.lastname@gmail.com ideally.',
  },
  {
    step: '02',
    title: 'Professional Summary',
    icon: '📋',
    color: '#8B5CF6',
    must: ['2–3 lines max', 'Mention years of experience', 'Top 2–3 skills relevant to role', 'What value you bring', 'Tailored per job application'],
    avoid: ['Generic phrases like "hardworking team player"', 'Objective statements (outdated)', 'More than 4 lines', 'First-person pronouns (I, me, my)'],
    tip: '"Results-driven software engineer with 3+ years of experience building scalable web apps using React and Node.js, reducing load times by 40%."',
  },
  {
    step: '03',
    title: 'Work Experience',
    icon: '💼',
    color: '#10B981',
    must: ['Company Name + Location', 'Job Title + Employment Type', 'Start – End Date (Month Year)', '3–5 bullet points per role', 'Action verbs to start each bullet', 'Quantified achievements (numbers!)'],
    avoid: ['Job duties (what you did) — write impact instead', 'Paragraphs instead of bullets', 'Vague bullets: "worked on team projects"', 'Listing every job — curate relevance'],
    tip: 'Use the formula: "Action Verb + What you did + Result/Impact" — "Reduced API response time by 60% by implementing Redis caching."',
  },
  {
    step: '04',
    title: 'Education',
    icon: '🎓',
    color: '#F59E0B',
    must: ['Degree + Major', 'University Name', 'Graduation Year', 'CGPA (if 7.5+ or 3.5+)', 'Relevant Coursework (optional for freshers)', 'Honors/Awards if any'],
    avoid: ['High school details (if you have a degree)', 'CGPA if below 7.0', 'Semester-wise grades', 'Irrelevant coursework'],
    tip: 'For freshers: Education comes before Work Experience. For experienced: Put it after.',
  },
  {
    step: '05',
    title: 'Skills Section',
    icon: '⚙️',
    color: '#EF4444',
    must: ['Technical Skills (Languages, Frameworks, Tools)', 'Group by category', 'Only skills you can speak about in interview', 'Proficiency levels (optional but useful)', 'Soft skills very briefly or skip'],
    avoid: ['Microsoft Word / PowerPoint (too basic)', 'Skills you\'re not confident in', 'Skill bars / ratings (meaningless)', 'Listing 30+ skills'],
    tip: 'Group like: Languages: Python, Java | Frameworks: React, Django | Tools: Git, Docker | Cloud: AWS, GCP',
  },
  {
    step: '06',
    title: 'Projects',
    icon: '🚀',
    color: '#06B6D4',
    must: ['Project Name + Tech Stack used', 'Live URL or GitHub link', '2–3 bullets: problem, solution, impact', 'Most impressive projects first', 'Mention scale (users, data size, etc.)'],
    avoid: ['Academic projects with no real impact', 'Projects with no GitHub link', 'Listing too many minor projects', 'Copying tutorial projects without modification'],
    tip: '"Built a real-time chat app using Socket.io and React with 500+ daily users and 99.9% uptime on AWS EC2."',
  },
  {
    step: '07',
    title: 'Certifications & Awards',
    icon: '🏆',
    color: '#8B5CF6',
    must: ['Certification Name', 'Issuing Organization', 'Year / Validity', 'Credential ID or URL (optional)', 'Only relevant certifications'],
    avoid: ['Expired or outdated certifications', 'Too many unrelated ones', 'Basic course completions from YouTube', 'Faking certifications'],
    tip: 'Top valued certs in tech: AWS, Google Cloud, Meta React, Microsoft Azure, Coursera (top university courses)',
  },
]
 
const proTips = [
  {
    icon: '📏',
    title: 'Keep It 1 Page',
    desc: 'For 0–5 years of experience, stick to exactly 1 page. Recruiters spend only 6–7 seconds on a resume. Every word must earn its place.',
    tag: 'Format',
    color: '#3B82F6',
  },
  {
    icon: '🎯',
    title: 'Tailor for Every Job',
    desc: 'Never send the same resume to 100 jobs. Read the JD, match keywords, rearrange bullet points. A tailored resume has 3x higher callback rate.',
    tag: 'Strategy',
    color: '#10B981',
  },
  {
    icon: '📊',
    title: 'Quantify Everything',
    desc: '"Improved performance" is weak. "Improved API response time by 45%, serving 2M+ requests/day" is powerful. Numbers = credibility.',
    tag: 'Content',
    color: '#F59E0B',
  },
  {
    icon: '🔤',
    title: 'Use Strong Action Verbs',
    desc: 'Start every bullet with: Built, Designed, Engineered, Optimized, Led, Reduced, Increased, Architected, Deployed, Automated.',
    tag: 'Language',
    color: '#8B5CF6',
  },
  {
    icon: '🤫',
    title: 'White Space is Your Friend',
    desc: 'A cluttered resume gets skipped. Use consistent margins (0.5–1 inch), clean fonts (Calibri, Garamond, Georgia), and good line spacing.',
    tag: 'Design',
    color: '#EF4444',
  },
  {
    icon: '🔗',
    title: 'Hyperlink Everything',
    desc: 'Make LinkedIn, GitHub, and portfolio links clickable. Recruiters reading on screen should be one click away from your work.',
    tag: 'Tech',
    color: '#06B6D4',
  },
  {
    icon: '🧪',
    title: 'Test with Job Scanner',
    desc: 'Use Jobscan or Resume Worded to score your resume against a specific JD. Aim for 70%+ match score before applying.',
    tag: 'ATS',
    color: '#10B981',
  },
  {
    icon: '📤',
    title: 'Always Submit as PDF',
    desc: 'PDF preserves formatting across all devices and operating systems. Word docs (.docx) can look broken on different platforms.',
    tag: 'Format',
    color: '#F59E0B',
  },
]
 
const mistakes = [
  {
    icon: '❌',
    title: 'Using a Generic Objective Statement',
    desc: '"To obtain a position in a reputed organization..." — This tells recruiters nothing. Replace with a punchy 2-line Professional Summary.',
    severity: 'Critical',
    fix: 'Write a tailored 2–3 line summary with your top skills and years of experience.',
    sevColor: 'bg-red-100 text-red-700',
  },
  {
    icon: '❌',
    title: 'Spelling & Grammar Errors',
    desc: 'A single typo can get your resume rejected instantly. It signals lack of attention to detail — a dealbreaker for any professional role.',
    severity: 'Critical',
    fix: 'Use Grammarly Premium or Hemingway App. Read backwards sentence by sentence.',
    sevColor: 'bg-red-100 text-red-700',
  },
  {
    icon: '❌',
    title: 'No Quantified Achievements',
    desc: '"Worked on backend team." → This adds zero value. Every bullet must show impact through numbers, scale, or outcomes.',
    severity: 'Critical',
    fix: 'Add metrics: team size, users served, % improvement, time saved, money saved.',
    sevColor: 'bg-red-100 text-red-700',
  },
  {
    icon: '⚠️',
    title: 'Using Fancy Templates with Tables/Columns',
    desc: 'Two-column or heavily designed resumes look great to humans but ATS systems read them as garbled text — your resume may score 0%.',
    severity: 'High',
    fix: 'Use clean single-column, ATS-friendly templates. Simple > Fancy for job applications.',
    sevColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '⚠️',
    title: 'Including a Photo',
    desc: 'In US, UK, Canada, and Australia — adding a photo is highly discouraged. It introduces bias and can lead to automatic rejection.',
    severity: 'High',
    fix: 'Only include photo for European countries (Germany, France) where it\'s expected.',
    sevColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '⚠️',
    title: 'Listing Job Duties Instead of Achievements',
    desc: '"Responsible for managing database" is a job description. "Optimized database queries, reducing load time by 70%" is an achievement.',
    severity: 'High',
    fix: 'Ask yourself: "What changed because I was there?" That\'s your bullet point.',
    sevColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '⚠️',
    title: 'Outdated Contact Information',
    desc: 'Wrong phone number or old email = missed opportunity. Always verify your contact details before submitting.',
    severity: 'High',
    fix: 'Do a final check: dial your own number, send a test email to yourself.',
    sevColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '💡',
    title: 'Too Long (3+ Pages for Junior Roles)',
    desc: 'More pages ≠ more impressive. For 0–5 years experience, 1 page is the gold standard. Even 10-year veterans can do 2 pages.',
    severity: 'Medium',
    fix: 'Cut filler, remove old irrelevant experience, shorten bullets to 1 line each.',
    sevColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: '💡',
    title: 'Missing GitHub / Portfolio Links',
    desc: 'For tech roles, not having a GitHub link is a massive missed opportunity. Recruiters actively look for code samples.',
    severity: 'Medium',
    fix: 'Create a clean GitHub with pinned repos + README files. Link it prominently.',
    sevColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: '💡',
    title: 'Sending the Same Resume Everywhere',
    desc: 'Mass applying with one resume is lazy and ineffective. Personalize the summary and top skills for each role/company.',
    severity: 'Medium',
    fix: 'Keep a master resume. Clone and customize for each application in 10 minutes.',
    sevColor: 'bg-yellow-100 text-yellow-700',
  },
]
 
const atsGuide = {
  what: 'ATS (Applicant Tracking System) is software used by 98% of Fortune 500 companies to automatically scan, parse, and rank resumes before a human ever sees them. If your resume isn\'t ATS-optimized, it gets rejected automatically — no matter how qualified you are.',
  stats: [
    { value: '98%', label: 'Fortune 500 use ATS' },
    { value: '75%', label: 'Resumes rejected by ATS' },
    { value: '6 sec', label: 'Human scan time' },
    { value: '3x', label: 'Higher callback with ATS match' },
  ],
  dos: [
    'Use standard section headings: "Work Experience", "Education", "Skills"',
    'Match keywords directly from the job description',
    'Use standard fonts: Calibri, Arial, Georgia, Garamond',
    'Save and submit as PDF (or .docx if specified)',
    'Use simple single-column layout',
    'Spell out acronyms once: "Machine Learning (ML)"',
    'Include the job title from JD in your summary',
    'Use bullet points (–) instead of fancy symbols',
  ],
  donts: [
    'No tables, text boxes, or multi-column layouts',
    'No headers/footers for critical info',
    'No images, logos, or graphics',
    'No fancy fonts or colored text',
    'No skill rating bars or charts',
    'No abbreviations without spelling them out first',
    'No creative section names like "My Journey" or "Superpowers"',
    'Don\'t stuff keywords unnaturally',
  ],
  tools: [
    { name: 'Jobscan', desc: 'Compare resume vs JD — gives a match % score', url: 'https://www.jobscan.co', color: '#3B82F6' },
    { name: 'Resume Worded', desc: 'AI-powered score with detailed improvement suggestions', url: 'https://resumeworded.com', color: '#10B981' },
    { name: 'SkillSyncer', desc: 'Free keyword matching tool for ATS optimization', url: 'https://skillsyncer.com', color: '#8B5CF6' },
  ],
}
 
const templates = [
  {
    name: 'Jake\'s Resume',
    source: 'Overleaf (LaTeX)',
    icon: '🔬',
    color: '#047857',
    tag: 'Most Popular for SWE',
    tagColor: 'bg-emerald-600',
    desc: 'The gold standard for software engineering resumes. Used by FAANG employees. Clean, ATS-friendly single-column LaTeX template. Widely recommended on r/cscareerquestions.',
    features: ['Single column — 100% ATS safe', 'LaTeX formatting = pixel-perfect', 'Clean typography', 'Easy to customize sections', 'Free on Overleaf'],
    url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs',
    forWho: 'Software Engineers, CS Students, FAANG applicants',
  },
  {
    name: 'Deedy Resume',
    source: 'Overleaf (LaTeX)',
    icon: '⚡',
    color: '#1d4ed8',
    tag: 'Two-Column Classic',
    tagColor: 'bg-blue-600',
    desc: 'Created by a Google engineer, Deedy is a beautiful two-column LaTeX resume. Note: two-column may have ATS issues — best for human review / printed portfolios.',
    features: ['Two-column layout', 'Strong visual hierarchy', 'Great for print/PDF portfolio', 'Compact but information-rich', 'Free on Overleaf'],
    url: 'https://www.overleaf.com/latex/templates/deedy-resume/bjryvfsjdyxz',
    forWho: 'Experienced engineers, design-conscious applicants',
  },
  {
    name: 'Resumake',
    source: 'resumake.io',
    icon: '🎯',
    color: '#7c3aed',
    tag: 'Best Free Online Tool',
    tagColor: 'bg-violet-600',
    desc: 'Open-source online resume builder. Enter your details and export clean LaTeX-style PDF in seconds. No account needed. Simple and effective.',
    features: ['No signup required', 'Multiple clean themes', 'Export to PDF/LaTeX', 'GitHub-friendly JSON format', 'Completely free'],
    url: 'https://resumake.io',
    forWho: 'Students, developers who want quick clean resume',
  },
  {
    name: 'Resume.io SWE Template',
    source: 'Resume.io',
    icon: '💼',
    color: '#0369a1',
    tag: 'Best for Non-Designers',
    tagColor: 'bg-sky-600',
    desc: 'Professional ready-to-use templates with drag-and-drop editing. The software engineer template is ATS-optimized and looks clean for both technical and non-technical reviewers.',
    features: ['Drag-and-drop editor', 'ATS-optimized templates', 'AI content suggestions', 'Real-time PDF preview', 'Multiple download formats'],
    url: 'https://resume.io',
    forWho: 'Non-designers, quick professional resume needed',
  },
  {
    name: 'Canva Resume',
    source: 'Canva',
    icon: '🎨',
    color: '#7D2AE8',
    tag: 'Most Visual',
    tagColor: 'bg-purple-600',
    desc: 'Beautiful visually-rich templates. WARNING: Canva resumes are NOT ATS-friendly. Use only for creative roles (UI/UX, Design, Marketing) — never for bulk applications.',
    features: ['Drag-and-drop design', 'Beautiful visual templates', 'Great for creative portfolios', 'Easy sharing & collaboration', 'Free tier available'],
    url: 'https://www.canva.com/resumes',
    forWho: '⚠️ Designers, Creatives ONLY — NOT for software/tech ATS applications',
  },
]
 
const platforms = [
  {
    name: 'Kickresume',
    icon: '🚀',
    desc: 'AI-powered resume builder with 35+ ATS-friendly templates, AI bullet point generator, and LinkedIn import. Best for professionals and students.',
    tags: ['AI Writing', 'ATS Friendly', 'LinkedIn Import'],
    color: '#3B82F6',
    free: true,
    url: 'https://www.kickresume.com',
    rating: 4.8,
  },
  {
    name: 'Zety',
    icon: '⚡',
    desc: 'Smart resume builder with pre-written content suggestions for every job title. Intuitive interface with real-time content score meter.',
    tags: ['Content Suggestions', 'Score Meter', 'Cover Letter'],
    color: '#10B981',
    free: false,
    url: 'https://zety.com',
    rating: 4.7,
  },
  {
    name: 'Novoresume',
    icon: '✨',
    desc: 'Elegant minimalist templates trusted by 4M+ job seekers. Excellent ATS-optimized layouts with a built-in content analyzer.',
    tags: ['Minimalist', 'ATS Score', 'Content Analyzer'],
    color: '#8B5CF6',
    free: true,
    url: 'https://novoresume.com',
    rating: 4.6,
  },
  {
    name: 'Enhancv',
    icon: '🎯',
    desc: 'Unique infographic-style resumes with a focus on personality and story. Great for standing out — especially in startup and product roles.',
    tags: ['Infographic Style', 'Personal Branding', 'Story-Driven'],
    color: '#F59E0B',
    free: false,
    url: 'https://enhancv.com',
    rating: 4.5,
  },
  {
    name: 'Resume.io',
    icon: '💼',
    desc: 'Clean, professional templates with AI writing assistant. Most popular for corporate and tech job applications. Trusted by 10M+ users.',
    tags: ['AI Assistant', 'Corporate Style', 'PDF Export'],
    color: '#EF4444',
    free: false,
    url: 'https://resume.io',
    rating: 4.7,
  },
]
 
const actionVerbs = {
  Built: '#3B82F6', Designed: '#8B5CF6', Engineered: '#10B981', Optimized: '#F59E0B',
  Led: '#EF4444', Reduced: '#06B6D4', Increased: '#10B981', Architected: '#8B5CF6',
  Deployed: '#3B82F6', Automated: '#F59E0B', Developed: '#10B981', Implemented: '#EF4444',
  Improved: '#06B6D4', Delivered: '#F59E0B', Managed: '#8B5CF6', Created: '#3B82F6',
  Integrated: '#10B981', Launched: '#EF4444', Scaled: '#06B6D4', Mentored: '#8B5CF6',
}
 
// ─── COMPONENT ───────────────────────────────────────────────────────────────
 
const Resume = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('building')
  const [openStep, setOpenStep] = useState(null)
  const [openMistake, setOpenMistake] = useState(null)
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
  <img 
      src={logo} onClick={()=>navigate("/")}
      alt="logo"
      className="w-32 sm:w-45 cursor-pointer rounded-xl"
    />
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium md:text-[18px] text-slate-800">
            {resumeSections.slice(0, 4).map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)} className={`hover:text-emerald-600 transition-colors ${activeTab === s.id ? 'text-emerald-600 font-bold' : ''}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete Resume Guide 2026
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Build a Resume That<br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Gets You Hired</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Everything from structure to ATS optimization, top templates, common mistakes, and the best resume platforms — all in one place.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {[['7 sec', 'Recruiter scan time'], ['75%', 'Resumes ATS-rejected'], ['3x', 'Tailored resume callbacks'], ['1 Page', 'Ideal length (0–5 yrs)']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-emerald-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {resumeSections.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  activeTab === s.id
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                }`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── STICKY SECTION TABS ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {resumeSections.map(s => (
            <button key={s.id} onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === s.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-6 py-16">
 
        {/* ════════════════════════════════════════════
            TAB: BUILDING GUIDE
        ════════════════════════════════════════════ */}
        {activeTab === 'building' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🏗️ Resume Building Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Section-by-section breakdown of what to include, what to avoid, and pro writing tips.</p>
            </div>
 
            <div className="space-y-4">
              {buildingGuide.map((section, i) => {
                const isOpen = openStep === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden transition-all shadow-sm ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: section.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenStep(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0" style={{ backgroundColor: section.color }}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-400">STEP {section.step}</span>
                          <h3 className="text-xl font-extrabold text-slate-800">{section.title}</h3>
                        </div>
                      </div>
                      <span className={`text-slate-400 transition-transform text-lg ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
 
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Must Include */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-green-700 uppercase tracking-wider mb-3">✅ Must Include</p>
                          <ul className="space-y-2">
                            {section.must.map((m, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>{m}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Avoid */}
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-red-700 uppercase tracking-wider mb-3">🚫 Avoid These</p>
                          <ul className="space-y-2">
                            {section.avoid.map((a, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>{a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Pro Tip */}
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">💡 Pro Tip</p>
                          <p className="text-sm text-slate-300 leading-relaxed italic">"{section.tip}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
 
            {/* Action Verbs */}
            <div className="mt-14 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">⚡ Power Action Verbs for Your Resume</h3>
              <p className="text-slate-500 text-sm mb-6">Start every bullet point with one of these strong verbs to make an immediate impact.</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(actionVerbs).map(([verb, color]) => (
                  <span key={verb} className="px-4 py-2 rounded-xl text-sm font-extrabold text-white shadow-sm"
                    style={{ backgroundColor: color }}>
                    {verb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ════════════════════════════════════════════
            TAB: PRO TIPS
        ════════════════════════════════════════════ */}
        {activeTab === 'tips' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💡 Pro Resume Tips</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Insider knowledge that separates great resumes from average ones.</p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
              {proTips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${tip.color}18` }}>
                    {tip.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-3 inline-block"
                    style={{ backgroundColor: tip.color }}>
                    {tip.tag}
                  </span>
                  <h4 className="text-slate-800 font-extrabold text-base mb-2">{tip.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
 
            {/* Bullet formula */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🧪 The Perfect Bullet Point Formula</h3>
              <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                {[
                  { label: 'Action Verb', example: '"Built"', color: '#3B82F6' },
                  { label: '+', example: '', color: 'transparent' },
                  { label: 'What You Did', example: '"a REST API"', color: '#10B981' },
                  { label: '+', example: '', color: 'transparent' },
                  { label: 'Tech Used', example: '"using Node.js & Redis"', color: '#8B5CF6' },
                  { label: '+', example: '', color: 'transparent' },
                  { label: 'Result/Impact', example: '"reducing latency by 60%"', color: '#F59E0B' },
                ].map((item, i) => (
                  item.label === '+' ? (
                    <span key={i} className="text-slate-400 text-2xl font-bold">+</span>
                  ) : (
                    <div key={i} className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 min-w-[140px]">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-bold italic" style={{ color: item.color }}>{item.example}</p>
                    </div>
                  )
                ))}
              </div>
              <div className="mt-6 bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-emerald-400 font-bold text-sm">✨ Result:</p>
                <p className="text-white mt-1 font-semibold">"Built a REST API using Node.js & Redis, reducing API latency by 60% for 500K daily users."</p>
              </div>
            </div>
          </div>
        )}
 
        {/* ════════════════════════════════════════════
            TAB: MISTAKES
        ════════════════════════════════════════════ */}
        {activeTab === 'mistakes' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🚫 Resume Mistakes to Avoid</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">10 common mistakes that get resumes instantly rejected — and how to fix each one.</p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mistakes.map((m, i) => {
                const isOpen = openMistake === i
                return (
                  <div key={i}
                    className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-sm cursor-pointer ${isOpen ? 'border-2 shadow-lg' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: m.severity === 'Critical' ? '#EF4444' : m.severity === 'High' ? '#F97316' : '#EAB308' } : {}}
                    onClick={() => setOpenMistake(isOpen ? null : i)}
                  >
                    <div className="flex items-start gap-4 p-5">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{m.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-extrabold text-slate-800 text-base">{m.title}</h4>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${m.sevColor}`}>
                            {m.severity}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mx-5 mb-5 bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-xs font-extrabold text-green-700 uppercase tracking-wider mb-1">✅ How to Fix</p>
                        <p className="text-sm text-slate-700">{m.fix}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
 
        {/* ════════════════════════════════════════════
            TAB: ATS GUIDE
        ════════════════════════════════════════════ */}
        {activeTab === 'ats' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🤖 ATS Optimization Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Beat the bots before a human ever sees your resume.</p>
            </div>
 
            {/* What is ATS */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8">
              <h3 className="text-xl font-extrabold text-emerald-400 mb-3">What is ATS?</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{atsGuide.what}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {atsGuide.stats.map(s => (
                  <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-emerald-400">{s.value}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* DOs */}
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-green-700 mb-5">✅ ATS DO's</h3>
                <ul className="space-y-3">
                  {atsGuide.dos.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {/* DON'Ts */}
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-red-700 mb-5">🚫 ATS DON'Ts</h3>
                <ul className="space-y-3">
                  {atsGuide.donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✗</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
 
            {/* ATS Tools */}
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-5">🔧 Best ATS Checker Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {atsGuide.tools.map(t => (
                  <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all block">
                    <h4 className="font-extrabold text-slate-800 text-lg mb-2" style={{ color: t.color }}>{t.name}</h4>
                    <p className="text-slate-500 text-sm mb-4">{t.desc}</p>
                    <span className="text-xs font-bold" style={{ color: t.color }}>Visit {t.name} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ════════════════════════════════════════════
            TAB: TEMPLATES
        ════════════════════════════════════════════ */}
        {activeTab === 'templates' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📄 Best Resume Templates</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">From Overleaf LaTeX to online builders — the best templates for software engineers and job seekers.</p>
            </div>
 
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
              {templates.map((t, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="p-7" style={{ borderTop: `5px solid ${t.color}` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ backgroundColor: `${t.color}18` }}>
                          {t.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900">{t.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">Source: {t.source}</p>
                        </div>
                      </div>
                      <span className={`${t.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}>{t.tag}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{t.desc}</p>
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Features</p>
                      <div className="flex flex-wrap gap-2">
                        {t.features.map(f => (
                          <span key={f} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                            style={{ backgroundColor: `${t.color}15`, color: t.color }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 mb-5">
                      <p className="text-xs font-bold text-slate-500 mb-1">👤 Best For</p>
                      <p className="text-sm text-slate-700 font-medium">{t.forWho}</p>
                    </div>
                    <a href={t.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: t.color }}>
                      Use This Template →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* ════════════════════════════════════════════
            TAB: PLATFORMS
        ════════════════════════════════════════════ */}
        {activeTab === 'platforms' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🌐 Best Resume Building Platforms</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Top 5 platforms to build a professional resume — compared and rated.</p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mb-12">
              {platforms.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${p.color}15` }}>
                        {p.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">{p.name}</h4>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.free ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {p.free ? '✓ Free Plan' : '💳 Paid'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold" style={{ color: p.color }}>★ {p.rating}</div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-semibold text-white"
                        style={{ backgroundColor: p.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-bold transition-colors" style={{ color: p.color }}>
                    Build Resume on {p.name} →
                  </p>
                </a>
              ))}
            </div>
 
            {/* Comparison Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-7 py-5 border-b border-slate-100">
                <h3 className="text-2xl font-extrabold text-slate-800">Platform Quick Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {['Platform', 'Free Plan', 'AI Features', 'ATS Friendly', 'Rating', 'Best For'].map((h, i) => (
                        <th key={h} className={`text-left px-6 py-4 font-bold ${i === 0 ? 'rounded-tl-none' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((p, idx) => (
                      <tr key={p.name} className={`border-t border-slate-100 hover:bg-emerald-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-bold text-slate-800">{p.icon} {p.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.free ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                            {p.free ? '✓ Yes' : '✗ No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{p.tags.includes('AI Writing') || p.tags.includes('AI Assistant') || p.tags.includes('Content Suggestions') ? '✅ Yes' : '—'}</td>
                        <td className="px-6 py-4"><span className="text-xs font-bold text-green-700">✅ Yes</span></td>
                        <td className="px-6 py-4"><span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {p.rating}</span></td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{p.tags[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
 
      </div>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-lg">ResumeCraft</span>
          </div>
          <p className="text-sm mb-4">Your complete guide to building a job-winning resume in 2024.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-4">
            {resumeSections.map(s => <span key={s.id}>{s.icon} {s.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
            © 2026 aiplacprep@gmail.com  Built for students and professionals aiming for their dream job.
          </p>
        </div>
      </footer>
    </div>
  )
}
 
export default Resume