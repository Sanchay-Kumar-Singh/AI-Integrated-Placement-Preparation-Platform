import React, { useState } from 'react'
import logo from '../../assets/image.png';
import { useNavigate } from 'react-router-dom';
import Sanchay from "../../assets/Sanchay.png";
import prince from "../../assets/Prince.jpg";
import SanchayResume from '../../assets/Sanchay.pdf';
import PrinceResume from '../../assets/Prince.pdf';

// ─── DATA ───────────────────────────────────────────────────────────────────

const resumeSections = [
  { id: 'building', label: 'Building Guide', icon: '🏗️' },
  { id: 'tips', label: 'Pro Tips', icon: '💡' },
  { id: 'mistakes', label: 'Mistakes to Avoid', icon: '🚫' },
  { id: 'ats', label: 'ATS Guide', icon: '🤖' },
  { id: 'templates', label: 'Templates', icon: '📄' },
  { id: 'platforms', label: 'Best Platforms', icon: '🌐' },
]

const buildingGuide = [
  {
    step: '01', title: 'Contact Information', icon: '👤', color: '#1a56db',
    must: ['Full Name (large, prominent)', 'Professional Email (gmail/outlook)', 'Phone Number with country code', 'LinkedIn Profile URL', 'GitHub Profile (for tech roles)', 'Portfolio Website / Behance'],
    avoid: ['Home address (optional in 2024)', 'Personal photo (for US/UK jobs)', 'Age or Date of Birth', 'Unprofessional email (e.g. coolguy123@)'],
    tip: 'Make your name the largest text on the page. Your email should be firstname.lastname@gmail.com ideally.',
  },
  {
    step: '02', title: 'Professional Summary', icon: '📋', color: '#6d28d9',
    must: ['2–3 lines max', 'Mention years of experience', 'Top 2–3 skills relevant to role', 'What value you bring', 'Tailored per job application'],
    avoid: ['Generic phrases like "hardworking team player"', 'Objective statements (outdated)', 'More than 4 lines', 'First-person pronouns (I, me, my)'],
    tip: '"Results-driven software engineer with 3+ years of experience building scalable web apps using React and Node.js, reducing load times by 40%."',
  },
  {
    step: '03', title: 'Work Experience', icon: '💼', color: '#065f46',
    must: ['Company Name + Location', 'Job Title + Employment Type', 'Start – End Date (Month Year)', '3–5 bullet points per role', 'Action verbs to start each bullet', 'Quantified achievements (numbers!)'],
    avoid: ['Job duties (what you did) — write impact instead', 'Paragraphs instead of bullets', 'Vague bullets: "worked on team projects"', 'Listing every job — curate relevance'],
    tip: 'Use the formula: "Action Verb + What you did + Result/Impact" — "Reduced API response time by 60% by implementing Redis caching."',
  },
  {
    step: '04', title: 'Education', icon: '🎓', color: '#92400e',
    must: ['Degree + Major', 'University Name', 'Graduation Year', 'CGPA (if 7.5+ or 3.5+)', 'Relevant Coursework (optional for freshers)', 'Honors/Awards if any'],
    avoid: ['High school details (if you have a degree)', 'CGPA if below 7.0', 'Semester-wise grades', 'Irrelevant coursework'],
    tip: 'For freshers: Education comes before Work Experience. For experienced: Put it after.',
  },
  {
    step: '05', title: 'Skills Section', icon: '⚙️', color: '#991b1b',
    must: ['Technical Skills (Languages, Frameworks, Tools)', 'Group by category', 'Only skills you can speak about in interview', 'Proficiency levels (optional but useful)', 'Soft skills very briefly or skip'],
    avoid: ['Microsoft Word / PowerPoint (too basic)', "Skills you're not confident in", 'Skill bars / ratings (meaningless)', 'Listing 30+ skills'],
    tip: 'Group like: Languages: Python, Java | Frameworks: React, Django | Tools: Git, Docker | Cloud: AWS, GCP',
  },
  {
    step: '06', title: 'Projects', icon: '🚀', color: '#0e7490',
    must: ['Project Name + Tech Stack used', 'Live URL or GitHub link', '2–3 bullets: problem, solution, impact', 'Most impressive projects first', 'Mention scale (users, data size, etc.)'],
    avoid: ['Academic projects with no real impact', 'Projects with no GitHub link', 'Listing too many minor projects', 'Copying tutorial projects without modification'],
    tip: '"Built a real-time chat app using Socket.io and React with 500+ daily users and 99.9% uptime on AWS EC2."',
  },
  {
    step: '07', title: 'Certifications & Awards', icon: '🏆', color: '#5b21b6',
    must: ['Certification Name', 'Issuing Organization', 'Year / Validity', 'Credential ID or URL (optional)', 'Only relevant certifications'],
    avoid: ['Expired or outdated certifications', 'Too many unrelated ones', 'Basic course completions from YouTube', 'Faking certifications'],
    tip: 'Top valued certs in tech: AWS, Google Cloud, Meta React, Microsoft Azure, Coursera (top university courses)',
  },
]

const proTips = [
  { icon: '📏', title: 'Keep It 1 Page', desc: 'For 0–5 years of experience, stick to exactly 1 page. Recruiters spend only 6–7 seconds on a resume. Every word must earn its place.', tag: 'Format', color: '#1a56db' },
  { icon: '🎯', title: 'Tailor for Every Job', desc: 'Never send the same resume to 100 jobs. Read the JD, match keywords, rearrange bullet points. A tailored resume has 3x higher callback rate.', tag: 'Strategy', color: '#065f46' },
  { icon: '📊', title: 'Quantify Everything', desc: '"Improved performance" is weak. "Improved API response time by 45%, serving 2M+ requests/day" is powerful. Numbers = credibility.', tag: 'Content', color: '#92400e' },
  { icon: '🔤', title: 'Use Strong Action Verbs', desc: 'Start every bullet with: Built, Designed, Engineered, Optimized, Led, Reduced, Increased, Architected, Deployed, Automated.', tag: 'Language', color: '#6d28d9' },
  { icon: '🤫', title: 'White Space is Your Friend', desc: 'A cluttered resume gets skipped. Use consistent margins (0.5–1 inch), clean fonts (Calibri, Garamond, Georgia), and good line spacing.', tag: 'Design', color: '#991b1b' },
  { icon: '🔗', title: 'Hyperlink Everything', desc: 'Make LinkedIn, GitHub, and portfolio links clickable. Recruiters reading on screen should be one click away from your work.', tag: 'Tech', color: '#0e7490' },
  { icon: '🧪', title: 'Test with Job Scanner', desc: 'Use Jobscan or Resume Worded to score your resume against a specific JD. Aim for 70%+ match score before applying.', tag: 'ATS', color: '#065f46' },
  { icon: '📤', title: 'Always Submit as PDF', desc: 'PDF preserves formatting across all devices and operating systems. Word docs (.docx) can look broken on different platforms.', tag: 'Format', color: '#92400e' },
]

const mistakes = [
  { icon: '❌', title: 'Using a Generic Objective Statement', desc: '"To obtain a position in a reputed organization..." — This tells recruiters nothing. Replace with a punchy 2-line Professional Summary.', severity: 'Critical', fix: 'Write a tailored 2–3 line summary with your top skills and years of experience.', sevColor: 'sev-critical' },
  { icon: '❌', title: 'Spelling & Grammar Errors', desc: 'A single typo can get your resume rejected instantly. It signals lack of attention to detail — a dealbreaker for any professional role.', severity: 'Critical', fix: 'Use Grammarly Premium or Hemingway App. Read backwards sentence by sentence.', sevColor: 'sev-critical' },
  { icon: '❌', title: 'No Quantified Achievements', desc: '"Worked on backend team." → This adds zero value. Every bullet must show impact through numbers, scale, or outcomes.', severity: 'Critical', fix: 'Add metrics: team size, users served, % improvement, time saved, money saved.', sevColor: 'sev-critical' },
  { icon: '⚠️', title: 'Using Fancy Templates with Tables/Columns', desc: 'Two-column or heavily designed resumes look great to humans but ATS systems read them as garbled text — your resume may score 0%.', severity: 'High', fix: 'Use clean single-column, ATS-friendly templates. Simple > Fancy for job applications.', sevColor: 'sev-high' },
  { icon: '⚠️', title: 'Including a Photo', desc: "In US, UK, Canada, and Australia — adding a photo is highly discouraged. It introduces bias and can lead to automatic rejection.", severity: 'High', fix: "Only include photo for European countries (Germany, France) where it's expected.", sevColor: 'sev-high' },
  { icon: '⚠️', title: 'Listing Job Duties Instead of Achievements', desc: '"Responsible for managing database" is a job description. "Optimized database queries, reducing load time by 70%" is an achievement.', severity: 'High', fix: 'Ask yourself: "What changed because I was there?" That\'s your bullet point.', sevColor: 'sev-high' },
  { icon: '⚠️', title: 'Outdated Contact Information', desc: 'Wrong phone number or old email = missed opportunity. Always verify your contact details before submitting.', severity: 'High', fix: 'Do a final check: dial your own number, send a test email to yourself.', sevColor: 'sev-high' },
  { icon: '💡', title: 'Too Long (3+ Pages for Junior Roles)', desc: 'More pages ≠ more impressive. For 0–5 years experience, 1 page is the gold standard. Even 10-year veterans can do 2 pages.', severity: 'Medium', fix: 'Cut filler, remove old irrelevant experience, shorten bullets to 1 line each.', sevColor: 'sev-medium' },
  { icon: '💡', title: 'Missing GitHub / Portfolio Links', desc: 'For tech roles, not having a GitHub link is a massive missed opportunity. Recruiters actively look for code samples.', severity: 'Medium', fix: 'Create a clean GitHub with pinned repos + README files. Link it prominently.', sevColor: 'sev-medium' },
  { icon: '💡', title: 'Sending the Same Resume Everywhere', desc: 'Mass applying with one resume is lazy and ineffective. Personalize the summary and top skills for each role/company.', severity: 'Medium', fix: 'Keep a master resume. Clone and customize for each application in 10 minutes.', sevColor: 'sev-medium' },
]

const atsGuide = {
  what: "ATS (Applicant Tracking System) is software used by 98% of Fortune 500 companies to automatically scan, parse, and rank resumes before a human ever sees them. If your resume isn't ATS-optimized, it gets rejected automatically — no matter how qualified you are.",
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
    "Don't stuff keywords unnaturally",
  ],
  tools: [
    { name: 'Jobscan', desc: 'Compare resume vs JD — gives a match % score', url: 'https://www.jobscan.co', color: '#1a56db' },
    { name: 'Resume Worded', desc: 'AI-powered score with detailed improvement suggestions', url: 'https://resumeworded.com', color: '#065f46' },
    { name: 'SkillSyncer', desc: 'Free keyword matching tool for ATS optimization', url: 'https://skillsyncer.com', color: '#6d28d9' },
  ],
}

const templates = [
  {
    name: "Jake's Resume", source: 'Overleaf (LaTeX)', icon: '🔬', color: '#065f46',
    tag: 'Most Popular for SWE', tagColor: '#065f46',
    desc: "The gold standard for software engineering resumes. Used by FAANG employees. Clean, ATS-friendly single-column LaTeX template.",
    features: ['Single column — 100% ATS safe', 'LaTeX formatting = pixel-perfect', 'Clean typography', 'Easy to customize', 'Free on Overleaf'],
    url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs',
    forWho: 'Software Engineers, CS Students, FAANG applicants',
  },
  {
    name: 'Deedy Resume', source: 'Overleaf (LaTeX)', icon: '⚡', color: '#1a56db',
    tag: 'Two-Column Classic', tagColor: '#1a56db',
    desc: 'Created by a Google engineer. Beautiful two-column LaTeX resume. Best for human review / printed portfolios.',
    features: ['Two-column layout', 'Strong visual hierarchy', 'Great for print/PDF', 'Information-rich', 'Free on Overleaf'],
    url: 'https://www.overleaf.com/latex/templates/deedy-resume/bjryvfsjdyxz',
    forWho: 'Experienced engineers, design-conscious applicants',
  },
  {
    name: 'Resumake', source: 'resumake.io', icon: '🎯', color: '#6d28d9',
    tag: 'Best Free Online Tool', tagColor: '#6d28d9',
    desc: 'Open-source online resume builder. Enter details and export clean LaTeX-style PDF in seconds. No account needed.',
    features: ['No signup required', 'Multiple clean themes', 'Export to PDF/LaTeX', 'GitHub-friendly JSON', 'Completely free'],
    url: 'https://resumake.io',
    forWho: 'Students, developers who want quick clean resume',
  },
  {
    name: 'Resume.io SWE Template', source: 'Resume.io', icon: '💼', color: '#0e7490',
    tag: 'Best for Non-Designers', tagColor: '#0e7490',
    desc: 'Professional ready-to-use templates with drag-and-drop editing. ATS-optimized for both technical and non-technical reviewers.',
    features: ['Drag-and-drop editor', 'ATS-optimized', 'AI content suggestions', 'Real-time preview', 'Multiple formats'],
    url: 'https://resume.io',
    forWho: 'Non-designers, quick professional resume needed',
  },
  {
    name: 'Canva Resume', source: 'Canva', icon: '🎨', color: '#7D2AE8',
    tag: 'Most Visual', tagColor: '#7D2AE8',
    desc: '⚠️ Beautiful visually-rich templates. NOT ATS-friendly. Use only for creative roles (UI/UX, Design, Marketing).',
    features: ['Drag-and-drop design', 'Beautiful templates', 'Creative portfolios', 'Easy sharing', 'Free tier available'],
    url: 'https://www.canva.com/resumes',
    forWho: '⚠️ Designers & Creatives ONLY — NOT for software/tech ATS applications',
  },
]

const platforms = [
  { name: 'Kickresume', icon: '🚀', desc: 'AI-powered resume builder with 35+ ATS-friendly templates, AI bullet point generator, and LinkedIn import.', tags: ['AI Writing', 'ATS Friendly', 'LinkedIn Import'], color: '#1a56db', free: true, url: 'https://www.kickresume.com', rating: 4.8 },
  { name: 'Zety', icon: '⚡', desc: 'Smart resume builder with pre-written content suggestions for every job title. Intuitive interface with real-time content score meter.', tags: ['Content Suggestions', 'Score Meter', 'Cover Letter'], color: '#065f46', free: false, url: 'https://zety.com', rating: 4.7 },
  { name: 'Novoresume', icon: '✨', desc: 'Elegant minimalist templates trusted by 4M+ job seekers. Excellent ATS-optimized layouts with a built-in content analyzer.', tags: ['Minimalist', 'ATS Score', 'Content Analyzer'], color: '#6d28d9', free: true, url: 'https://novoresume.com', rating: 4.6 },
  { name: 'Enhancv', icon: '🎯', desc: 'Unique infographic-style resumes with a focus on personality and story. Great for standing out in startup and product roles.', tags: ['Infographic Style', 'Personal Branding', 'Story-Driven'], color: '#92400e', free: false, url: 'https://enhancv.com', rating: 4.5 },
  { name: 'Resume.io', icon: '💼', desc: 'Clean, professional templates with AI writing assistant. Most popular for corporate and tech job applications. Trusted by 10M+ users.', tags: ['AI Assistant', 'Corporate Style', 'PDF Export'], color: '#991b1b', free: false, url: 'https://resume.io', rating: 4.7 },
]

const actionVerbs = {
  Built: '#1a56db', Designed: '#6d28d9', Engineered: '#065f46', Optimized: '#92400e',
  Led: '#991b1b', Reduced: '#0e7490', Increased: '#065f46', Architected: '#6d28d9',
  Deployed: '#1a56db', Automated: '#92400e', Developed: '#065f46', Implemented: '#991b1b',
  Improved: '#0e7490', Delivered: '#92400e', Managed: '#6d28d9', Created: '#1a56db',
  Integrated: '#065f46', Launched: '#991b1b', Scaled: '#0e7490', Mentored: '#6d28d9',
}

const teamMembers = [
  {
    name: 'Sanchay Kumar Singh',
    role: 'Co-Founder & Java + Full Stack Developer',
    initials: 'SK',
    color: '#1a56db',
    photo: Sanchay,
    bio: 'Full-stack developer with expertise in building career tools and web platforms.',
    resumeLabel: 'View Resume (PDF)',
    resumeUrl: SanchayResume,   // ✅ FIXED
  },
  {
    name: 'Prince Kumar Sinha',
    role: 'Co-Founder & C++ + Full Stack Designer',
    initials: 'PK',
    color: '#065f46',
    photo: prince,
    bio: 'UI/UX designer and developer focused on creating intuitive job-seeker experiences.',
    resumeLabel: 'View Resume (PDF)',
    resumeUrl: PrinceResume,   // ✅ FIXED
  },
];
// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Source Sans 3', sans-serif; }

  .resume-root {
    min-height: 100vh;
    background: #f8f7f4;
    font-family: 'Source Sans 3', sans-serif;
    color: #1c1917;
  }

  /* NAVBAR */
  .r-nav {
    background: #fff;
    border-bottom: 2px solid #e7e4dd;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .r-nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .r-nav-logo { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
  .r-nav-logo img { height: 40px; border-radius: 8px; }
  .r-nav-links { display: flex; gap: 2rem; }
  .r-nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.875rem; font-weight: 600;
    color: #57534e; letter-spacing: 0.025em;
    text-transform: uppercase; transition: color 0.2s;
    padding: 0.25rem 0;
    border-bottom: 2px solid transparent;
  }
  .r-nav-links button:hover { color: #1a56db; }
  .r-nav-links button.active { color: #1a56db; border-bottom-color: #1a56db; }

  /* HERO */
  .r-hero {
  background: radial-gradient(circle at center, #065f46 0%, #052e2b 80%);  /* Tailwind slate-900 vibe */
    padding: 5rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .r-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 60px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 60px
    );
  }
  .r-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to top, #f8f7f4, transparent);
  }
  .r-hero-inner {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .r-hero-badge {
    display: inline-block;
    background: rgba(26,86,219,0.15);
    border: 1px solid rgba(26,86,219,0.3);
    color: #93c5fd;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.4rem 1.2rem;
    border-radius: 2px;
    margin-bottom: 1.5rem;
  }
  .r-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: #f9fafb;
    line-height: 1.15;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }
  .r-hero h1 span {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .r-hero-sub {
    color: #9ca3af;
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto 2.5rem;
    font-weight: 300;
  }
  .r-hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-width: 700px;
    margin: 0 auto 2.5rem;
  }
  @media (max-width: 640px) { .r-hero-stats { grid-template-columns: repeat(2, 1fr); } }
  .r-stat-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 1rem 0.75rem;
    text-align: center;
  }
  .r-stat-val { font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 700; color: #60a5fa; }
  .r-stat-lbl { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; font-weight: 400; }

  /* TAB PILLS IN HERO */
  .r-hero-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
  .r-pill {
    padding: 0.5rem 1.1rem;
    border-radius: 2px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
    color: #d1d5db;
    cursor: pointer;
    transition: all 0.2s;
  }
  .r-pill:hover { background: rgba(255,255,255,0.12); }
  .r-pill.active { background: #1a56db; border-color: #1a56db; color: #fff; }

  /* SECTION TABS BAR */
  .r-tabs-bar {
    background: #fff;
    border-bottom: 2px solid #e7e4dd;
    position: sticky;
    top: 64px;
    z-index: 40;
  }
  .r-tabs-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    gap: 0.25rem;
    overflow-x: auto;
  }
  .r-tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.25rem;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: #78716c;
    transition: all 0.2s;
  }
  .r-tab-btn:hover { color: #1c1917; border-bottom-color: #d6d3d1; }
  .r-tab-btn.active { color: #1a56db; border-bottom-color: #1a56db; }

  /* CONTENT AREA */
  .r-content { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }

  /* SECTION HEADER */
  .r-section-header { text-align: center; margin-bottom: 3rem; }
  .r-section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }
  .r-section-header p {
    color: #78716c;
    font-size: 1.05rem;
    max-width: 500px;
    margin: 0 auto;
    font-weight: 300;
  }
  .r-divider {
    width: 48px; height: 3px;
    background: #1a56db;
    margin: 1rem auto 0;
  }

  /* ACCORDION CARDS */
  .r-accordion { display: flex; flex-direction: column; gap: 0.75rem; }
  .r-acc-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.25s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .r-acc-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
  .r-acc-card.open { border-color: #1a56db; box-shadow: 0 4px 20px rgba(26,86,219,0.1); }
  .r-acc-btn {
    width: 100%; display: flex; align-items: center;
    gap: 1rem; padding: 1.25rem 1.5rem;
    text-align: left; background: none; border: none;
    cursor: pointer; transition: background 0.2s;
  }
  .r-acc-btn:hover { background: #fafaf8; }
  .r-step-badge {
    width: 44px; height: 44px;
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.25rem;
    color: #fff;
  }
  .r-acc-meta { flex: 1; }
  .r-acc-num {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.15em; color: #9ca3af;
    text-transform: uppercase; margin-bottom: 0.2rem;
  }
  .r-acc-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700;
    color: #111827;
  }
  .r-chevron { color: #9ca3af; font-size: 0.8rem; transition: transform 0.3s; }
  .r-chevron.open { transform: rotate(180deg); }

  /* ACCORDION BODY */
  .r-acc-body { padding: 0 1.5rem 1.5rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
  @media (max-width: 900px) { .r-acc-body { grid-template-columns: 1fr; } }
  .r-acc-panel { border-radius: 4px; padding: 1.25rem; }
  .r-acc-panel.must { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .r-acc-panel.avoid { background: #fef2f2; border: 1px solid #fecaca; }
  .r-acc-panel.tip { background: #111827; }
  .r-acc-panel-label {
    font-size: 0.65rem; font-weight: 800;
    letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 0.75rem;
  }
  .r-acc-panel.must .r-acc-panel-label { color: #15803d; }
  .r-acc-panel.avoid .r-acc-panel-label { color: #b91c1c; }
  .r-acc-panel.tip .r-acc-panel-label { color: #fbbf24; }
  .r-panel-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .r-panel-list li { display: flex; gap: 0.5rem; font-size: 0.875rem; color: #374151; align-items: flex-start; }
  .r-panel-list li span { flex-shrink: 0; margin-top: 2px; }
  .r-tip-text { font-size: 0.875rem; color: #d1d5db; line-height: 1.65; font-style: italic; font-weight: 300; }

  /* ACTION VERBS */
  .r-verbs-box {
    margin-top: 3rem;
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    padding: 2rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .r-verbs-box h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700; color: #111827;
    margin-bottom: 0.4rem;
  }
  .r-verbs-box p { color: #78716c; font-size: 0.875rem; margin-bottom: 1.25rem; }
  .r-verbs-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .r-verb {
    padding: 0.4rem 1rem;
    border-radius: 2px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.03em;
  }

  /* PRO TIPS GRID */
  .r-tips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 3rem; }
  .r-tip-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    padding: 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: all 0.25s;
  }
  .r-tip-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
  .r-tip-icon-wrap {
    width: 44px; height: 44px;
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem; margin-bottom: 0.85rem;
  }
  .r-tip-tag {
    display: inline-block;
    font-size: 0.65rem; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; padding: 0.25rem 0.6rem;
    border-radius: 2px; margin-bottom: 0.65rem;
  }
  .r-tip-card h4 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
  .r-tip-card p { font-size: 0.875rem; color: #78716c; line-height: 1.6; font-weight: 300; }

  /* FORMULA BOX */
  .r-formula-box { background: #111827; border-radius: 4px; padding: 2.5rem; }
  .r-formula-box h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700; color: #f9fafb;
    text-align: center; margin-bottom: 2rem;
  }
  .r-formula-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; justify-content: center; }
  .r-formula-piece {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    padding: 0.85rem 1.25rem;
    min-width: 130px;
    text-align: center;
  }
  .r-formula-piece-lbl { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; margin-bottom: 0.35rem; }
  .r-formula-piece-val { font-size: 0.85rem; font-weight: 700; font-style: italic; }
  .r-formula-plus { color: #4b5563; font-size: 1.25rem; font-weight: 700; }
  .r-formula-result {
    margin-top: 1.5rem;
    background: rgba(26,86,219,0.15);
    border: 1px solid rgba(26,86,219,0.3);
    border-radius: 4px;
    padding: 1rem 1.5rem;
    text-align: center;
  }
  .r-formula-result-lbl { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #93c5fd; margin-bottom: 0.4rem; }
  .r-formula-result-text { color: #e5e7eb; font-size: 0.925rem; font-weight: 500; line-height: 1.5; }

  /* MISTAKES */
  .r-mistakes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  @media (max-width: 768px) { .r-mistakes-grid { grid-template-columns: 1fr; } }
  .r-mistake-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .r-mistake-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.09); }
  .r-mistake-card.open { border-width: 2px; }
  .r-mistake-inner { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem; }
  .r-mistake-icon { font-size: 1.5rem; flex-shrink: 0; }
  .r-mistake-content { flex: 1; }
  .r-mistake-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.4rem; }
  .r-mistake-title { font-family: 'Playfair Display', serif; font-size: 0.975rem; font-weight: 700; color: #111827; }
  .r-sev-badge { font-size: 0.65rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 2px; white-space: nowrap; flex-shrink: 0; letter-spacing: 0.05em; text-transform: uppercase; }
  .sev-critical { background: #fee2e2; color: #b91c1c; }
  .sev-high { background: #ffedd5; color: #c2410c; }
  .sev-medium { background: #fef9c3; color: #a16207; }
  .r-mistake-desc { font-size: 0.85rem; color: #6b7280; line-height: 1.55; font-weight: 300; }
  .r-mistake-fix { margin: 0 1.25rem 1.25rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 0.85rem 1rem; }
  .r-fix-lbl { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #15803d; margin-bottom: 0.3rem; }
  .r-fix-text { font-size: 0.85rem; color: #374151; }

  /* ATS */
  .r-ats-intro { background: #111827; border-radius: 4px; padding: 2rem; margin-bottom: 2rem; }
  .r-ats-intro h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #60a5fa; margin-bottom: 0.75rem; }
  .r-ats-intro p { font-size: 0.875rem; color: #9ca3af; line-height: 1.7; font-weight: 300; }
  .r-ats-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1.5rem; }
  @media (max-width: 640px) { .r-ats-stats { grid-template-columns: repeat(2, 1fr); } }
  .r-ats-do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
  @media (max-width: 768px) { .r-ats-do-dont { grid-template-columns: 1fr; } }
  .r-ats-panel { border-radius: 4px; padding: 1.75rem; }
  .r-ats-panel.do { background: #f0fdf4; border: 2px solid #bbf7d0; }
  .r-ats-panel.dont { background: #fef2f2; border: 2px solid #fecaca; }
  .r-ats-panel h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; }
  .r-ats-panel.do h3 { color: #15803d; }
  .r-ats-panel.dont h3 { color: #b91c1c; }
  .r-ats-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
  .r-ats-list li { display: flex; gap: 0.75rem; font-size: 0.875rem; color: #374151; align-items: flex-start; }
  .r-num-badge {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 800; color: #fff; flex-shrink: 0; margin-top: 1px;
  }
  .r-ats-tools { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  @media (max-width: 768px) { .r-ats-tools { grid-template-columns: 1fr; } }
  .r-tool-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    padding: 1.5rem;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .r-tool-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
  .r-tool-card h4 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
  .r-tool-card p { font-size: 0.85rem; color: #6b7280; margin-bottom: 0.85rem; font-weight: 300; }
  .r-tool-card span { font-size: 0.8rem; font-weight: 700; }

  /* TEMPLATES */
  .r-templates-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  @media (max-width: 900px) { .r-templates-grid { grid-template-columns: 1fr; } }
  .r-tmpl-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: all 0.25s;
  }
  .r-tmpl-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
  .r-tmpl-accent { height: 4px; }
  .r-tmpl-body { padding: 1.75rem; }
  .r-tmpl-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem; }
  .r-tmpl-id { display: flex; align-items: center; gap: 0.85rem; }
  .r-tmpl-icon { width: 48px; height: 48px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  .r-tmpl-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #111827; }
  .r-tmpl-src { font-size: 0.75rem; color: #9ca3af; margin-top: 0.15rem; }
  .r-tmpl-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; padding: 0.3rem 0.75rem; border-radius: 2px; white-space: nowrap; }
  .r-tmpl-desc { font-size: 0.875rem; color: #6b7280; line-height: 1.65; margin-bottom: 1rem; font-weight: 300; }
  .r-features { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .r-feature { font-size: 0.75rem; font-weight: 600; padding: 0.3rem 0.7rem; border-radius: 2px; }
  .r-for-who { background: #f8f7f4; border-radius: 3px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; }
  .r-for-who-lbl { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.25rem; }
  .r-for-who-val { font-size: 0.85rem; color: #374151; font-weight: 500; }
  .r-tmpl-btn {
    display: flex; align-items: center; justify-content: center;
    width: 100%; padding: 0.85rem;
    border-radius: 3px; font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase;
    color: #fff; text-decoration: none;
    transition: opacity 0.2s;
  }
  .r-tmpl-btn:hover { opacity: 0.88; }

  /* PLATFORMS */
  .r-platforms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2.5rem; }
  @media (max-width: 900px) { .r-platforms-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) { .r-platforms-grid { grid-template-columns: 1fr; } }
  .r-plat-card {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    padding: 1.5rem;
    text-decoration: none;
    display: block;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: all 0.25s;
  }
  .r-plat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); }
  .r-plat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .r-plat-id { display: flex; align-items: center; gap: 0.65rem; }
  .r-plat-icon-wrap { width: 42px; height: 42px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
  .r-plat-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #111827; }
  .r-plat-free {
    font-size: 0.65rem; font-weight: 800;
    padding: 0.25rem 0.6rem; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase;
  }
  .r-plat-free.free { background: #f0fdf4; color: #15803d; }
  .r-plat-free.paid { background: #eff6ff; color: #1d4ed8; }
  .r-rating { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; }
  .r-plat-desc { font-size: 0.85rem; color: #6b7280; line-height: 1.6; margin-bottom: 1rem; font-weight: 300; }
  .r-plat-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .r-plat-tag { font-size: 0.7rem; font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 2px; color: #fff; }
  .r-plat-cta { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }

  /* COMPARISON TABLE */
  .r-table-wrap {
    background: #fff;
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .r-table-head { padding: 1.25rem 1.75rem; border-bottom: 1px solid #e7e4dd; }
  .r-table-head h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #111827; }
  .r-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .r-table thead tr { background: #111827; }
  .r-table thead th { padding: 1rem 1.25rem; text-align: left; color: #f9fafb; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
  .r-table tbody tr { border-top: 1px solid #f3f4f6; transition: background 0.15s; }
  .r-table tbody tr:nth-child(even) { background: #fafaf8; }
  .r-table tbody tr:hover { background: #eff6ff; }
  .r-table td { padding: 0.9rem 1.25rem; color: #374151; vertical-align: middle; }

  /* TEAM SECTION */
  .r-team-section {
    background: #fff;
    border-top: 2px solid #e7e4dd;
    padding: 5rem 2rem;
    margin-top: 0;
  }
  .r-team-inner { max-width: 1100px; margin: 0 auto; }
  .r-team-header { text-align: center; margin-bottom: 3.5rem; }
  .r-team-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700; color: #111827;
    margin-bottom: 0.6rem; letter-spacing: -0.02em;
  }
  .r-team-header p { color: #78716c; font-size: 1rem; font-weight: 300; }
  .r-team-divider { width: 40px; height: 3px; background: #1a56db; margin: 0.85rem auto 0; }

  .r-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  @media (max-width: 768px) { .r-team-grid { grid-template-columns: 1fr; } }

  .r-member-card {
    border: 1.5px solid #e7e4dd;
    border-radius: 4px;
    overflow: hidden;
    background: #fafaf8;
    display: flex;
    align-items: stretch;
    transition: box-shadow 0.25s;
  }
  .r-member-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); }

  .r-member-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    border-right: 1.5px solid #e7e4dd;
    background: #fff;
    min-width: 160px;
  }
  .r-avatar {
    width: 88px; height: 88px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700;
    color: #fff;
    margin-bottom: 0.85rem;
    border: 3px solid #e7e4dd;
  }
  .r-member-name {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-weight: 700; color: #111827;
    text-align: center; margin-bottom: 0.3rem; line-height: 1.3;
  }
  .r-member-role {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: #9ca3af; text-align: center;
  }

  .r-member-right {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .r-member-bio { font-size: 0.9rem; color: #57534e; line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem; }

  .r-resume-viewer { border: 1.5px solid #e7e4dd; border-radius: 3px; overflow: hidden; background: #fff; }
  .r-resume-viewer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.65rem 1rem;
    background: #f3f4f6;
    border-bottom: 1px solid #e7e4dd;
  }
  .r-resume-viewer-label {
    font-size: 0.7rem; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #6b7280;
  }
  .r-resume-viewer-actions { display: flex; gap: 0.5rem; }
  .r-open-btn {
    font-size: 0.7rem; font-weight: 700;
    padding: 0.3rem 0.75rem; border-radius: 2px;
    color: #fff; text-decoration: none;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .r-open-btn:hover { opacity: 0.85; }
  .r-pdf-embed {
    width: 100%; height: 280px;
    border: none; display: block;
  }
  .r-pdf-fallback {
    height: 280px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.75rem; color: #9ca3af;
    background: #f9fafb;
  }
  .r-pdf-fallback-icon { font-size: 2.5rem; }
  .r-pdf-fallback-text { font-size: 0.8rem; font-weight: 500; text-align: center; }
  .r-pdf-fallback a {
    font-size: 0.8rem; font-weight: 700;
    padding: 0.4rem 1.1rem; border-radius: 2px;
    color: #fff; text-decoration: none;
    display: inline-block;
  }

  /* FOOTER */
  .r-footer { background: #111827; padding: 3rem 2rem; }
  .r-footer-inner { max-width: 1200px; margin: 0 auto; text-align: center; }
  .r-footer-brand { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.75rem; }
  .r-footer-logo { width: 32px; height: 32px; background: linear-gradient(135deg, #1a56db, #3b82f6); border-radius: 4px; display: flex; align-items: center; justify-content: center; }
  .r-footer-logo span { color: #fff; font-weight: 800; font-size: 0.9rem; font-family: 'Playfair Display', serif; }
  .r-footer-name { font-family: 'Playfair Display', serif; color: #f9fafb; font-size: 1.1rem; font-weight: 700; }
  .r-footer-tagline { color: #6b7280; font-size: 0.85rem; margin-bottom: 1.5rem; font-weight: 300; }
  .r-footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; }
  .r-footer-links span { color: #4b5563; font-size: 0.8rem; font-weight: 500; }
  .r-footer-copy {
    border-top: 1px solid #1f2937;
    padding-top: 1.25rem;
    color: #6b7280; font-size: 0.8rem;
  }
`

// ─── COMPONENT ──────────────────────────────────────────────────────────────

const Resume = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('building')
  const [openStep, setOpenStep] = useState(null)
  const [openMistake, setOpenMistake] = useState(null)

  return (
    <>
      <style>{styles}</style>
      <div className="resume-root">

        {/* ── NAVBAR ── */}
        <nav className="r-nav">
          <div className="r-nav-inner">
            <div className=" md:w-45 w-40 " onClick={() => navigate('/')}>
              <img src={logo} alt="logo"  />
            </div>
            <div className="r-nav-links" style={{ display: 'none' }}>
              {resumeSections.slice(0, 4).map(s => (
                <button key={s.id} onClick={() => setActiveTab(s.id)} className={activeTab === s.id ? 'active' : ''}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="r-hero">
          <div className="r-hero-inner">
            <div className="r-hero-badge">Complete Resume Guide · 2026</div>
            <h1>
              Build a Resume That<br />
              <span>Gets You Hired</span>
            </h1>
            <p className="r-hero-sub">
              Everything from structure to ATS optimization, top templates, common mistakes, and the best resume platforms — all in one definitive guide.
            </p>
            <div className="r-hero-stats">
              {[['7 sec', 'Recruiter scan time'], ['75%', 'ATS-rejected resumes'], ['3×', 'Tailored resume callbacks'], ['1 Page', 'Ideal (0–5 yrs exp)']].map(([v, l]) => (
                <div key={l} className="r-stat-box">
                  <div className="r-stat-val">{v}</div>
                  <div className="r-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <div className="r-hero-pills">
              {resumeSections.map(s => (
                <button key={s.id} className={`r-pill${activeTab === s.id ? ' active' : ''}`} onClick={() => setActiveTab(s.id)}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION TABS BAR ── */}
        <div className="r-tabs-bar">
          <div className="r-tabs-inner">
            {resumeSections.map(s => (
              <button key={s.id} className={`r-tab-btn${activeTab === s.id ? ' active' : ''}`} onClick={() => setActiveTab(s.id)}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="r-content">

          {/* ── BUILDING GUIDE ── */}
          {activeTab === 'building' && (
            <div>
              <div className="r-section-header">
                <h2>Resume Building Guide</h2>
                <p>Section-by-section breakdown of what to include, what to avoid, and expert writing tips.</p>
                <div className="r-divider" />
              </div>
              <div className="r-accordion">
                {buildingGuide.map((section, i) => {
                  const isOpen = openStep === i
                  return (
                    <div key={i} className={`r-acc-card${isOpen ? ' open' : ''}`}>
                      <button className="r-acc-btn" onClick={() => setOpenStep(isOpen ? null : i)}>
                        <div className="r-step-badge" style={{ backgroundColor: section.color }}>{section.icon}</div>
                        <div className="r-acc-meta">
                          <div className="r-acc-num">Step {section.step}</div>
                          <div className="r-acc-title">{section.title}</div>
                        </div>
                        <span className={`r-chevron${isOpen ? ' open' : ''}`}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="r-acc-body">
                          <div className="r-acc-panel must">
                            <div className="r-acc-panel-label">✅ Must Include</div>
                            <ul className="r-panel-list">
                              {section.must.map((m, j) => (
                                <li key={j}><span style={{ color: '#16a34a' }}>•</span>{m}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="r-acc-panel avoid">
                            <div className="r-acc-panel-label">🚫 Avoid These</div>
                            <ul className="r-panel-list">
                              {section.avoid.map((a, j) => (
                                <li key={j}><span style={{ color: '#dc2626' }}>•</span>{a}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="r-acc-panel tip">
                            <div className="r-acc-panel-label">💡 Expert Tip</div>
                            <p className="r-tip-text">"{section.tip}"</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="r-verbs-box">
                <h3>Power Action Verbs</h3>
                <p>Start every bullet point with one of these strong verbs for immediate impact.</p>
                <div className="r-verbs-grid">
                  {Object.entries(actionVerbs).map(([verb, color]) => (
                    <span key={verb} className="r-verb" style={{ backgroundColor: color }}>{verb}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PRO TIPS ── */}
          {activeTab === 'tips' && (
            <div>
              <div className="r-section-header">
                <h2>Pro Resume Tips</h2>
                <p>Insider knowledge that separates great resumes from average ones.</p>
                <div className="r-divider" />
              </div>
              <div className="r-tips-grid">
                {proTips.map((tip, i) => (
                  <div key={i} className="r-tip-card">
                    <div className="r-tip-icon-wrap" style={{ backgroundColor: `${tip.color}15` }}>{tip.icon}</div>
                    <span className="r-tip-tag" style={{ backgroundColor: tip.color }}>{tip.tag}</span>
                    <h4>{tip.title}</h4>
                    <p>{tip.desc}</p>
                  </div>
                ))}
              </div>
              <div className="r-formula-box">
                <h3>The Perfect Bullet Point Formula</h3>
                <div className="r-formula-row">
                  {[
                    { label: 'Action Verb', val: '"Built"', color: '#60a5fa' },
                    null,
                    { label: 'What You Did', val: '"a REST API"', color: '#34d399' },
                    null,
                    { label: 'Tech Used', val: '"using Node.js & Redis"', color: '#a78bfa' },
                    null,
                    { label: 'Result / Impact', val: '"reducing latency by 60%"', color: '#fbbf24' },
                  ].map((item, i) => (
                    item === null
                      ? <span key={i} className="r-formula-plus">+</span>
                      : (
                        <div key={i} className="r-formula-piece">
                          <div className="r-formula-piece-lbl">{item.label}</div>
                          <div className="r-formula-piece-val" style={{ color: item.color }}>{item.val}</div>
                        </div>
                      )
                  ))}
                </div>
                <div className="r-formula-result">
                  <div className="r-formula-result-lbl">✨ Result</div>
                  <div className="r-formula-result-text">"Built a REST API using Node.js & Redis, reducing API latency by 60% for 500K daily users."</div>
                </div>
              </div>
            </div>
          )}

          {/* ── MISTAKES ── */}
          {activeTab === 'mistakes' && (
            <div>
              <div className="r-section-header">
                <h2>Mistakes to Avoid</h2>
                <p>10 common errors that get resumes rejected — and how to fix each one.</p>
                <div className="r-divider" />
              </div>
              <div className="r-mistakes-grid">
                {mistakes.map((m, i) => {
                  const isOpen = openMistake === i
                  const borderColor = m.severity === 'Critical' ? '#ef4444' : m.severity === 'High' ? '#f97316' : '#eab308'
                  return (
                    <div key={i}
                      className={`r-mistake-card${isOpen ? ' open' : ''}`}
                      style={isOpen ? { borderColor } : {}}
                      onClick={() => setOpenMistake(isOpen ? null : i)}
                    >
                      <div className="r-mistake-inner">
                        <span className="r-mistake-icon">{m.icon}</span>
                        <div className="r-mistake-content">
                          <div className="r-mistake-header">
                            <div className="r-mistake-title">{m.title}</div>
                            <span className={`r-sev-badge ${m.sevColor}`}>{m.severity}</span>
                          </div>
                          <p className="r-mistake-desc">{m.desc}</p>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="r-mistake-fix">
                          <div className="r-fix-lbl">✅ How to Fix</div>
                          <p className="r-fix-text">{m.fix}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── ATS GUIDE ── */}
          {activeTab === 'ats' && (
            <div>
              <div className="r-section-header">
                <h2>ATS Optimization Guide</h2>
                <p>Beat the automated screening before a human ever sees your resume.</p>
                <div className="r-divider" />
              </div>
              <div className="r-ats-intro">
                <h3>What is ATS?</h3>
                <p>{atsGuide.what}</p>
                <div className="r-ats-stats">
                  {atsGuide.stats.map(s => (
                    <div key={s.label} className="r-stat-box">
                      <div className="r-stat-val">{s.value}</div>
                      <div className="r-stat-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="r-ats-do-dont">
                <div className="r-ats-panel do">
                  <h3>✅ ATS Do's</h3>
                  <ul className="r-ats-list">
                    {atsGuide.dos.map((d, i) => (
                      <li key={i}>
                        <span className="r-num-badge" style={{ backgroundColor: '#15803d' }}>{i + 1}</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="r-ats-panel dont">
                  <h3>🚫 ATS Don'ts</h3>
                  <ul className="r-ats-list">
                    {atsGuide.donts.map((d, i) => (
                      <li key={i}>
                        <span className="r-num-badge" style={{ backgroundColor: '#b91c1c' }}>✗</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div className="r-section-header" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.3rem' }}>Best ATS Checker Tools</h2>
                </div>
                <div className="r-ats-tools">
                  {atsGuide.tools.map(t => (
                    <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="r-tool-card">
                      <h4 style={{ color: t.color }}>{t.name}</h4>
                      <p>{t.desc}</p>
                      <span style={{ color: t.color }}>Visit {t.name} →</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TEMPLATES ── */}
          {activeTab === 'templates' && (
            <div>
              <div className="r-section-header">
                <h2>Best Resume Templates</h2>
                <p>From Overleaf LaTeX to online builders — the best templates for engineers and job seekers.</p>
                <div className="r-divider" />
              </div>
              <div className="r-templates-grid">
                {templates.map((t, i) => (
                  <div key={i} className="r-tmpl-card">
                    <div className="r-tmpl-accent" style={{ backgroundColor: t.color }} />
                    <div className="r-tmpl-body">
                      <div className="r-tmpl-header">
                        <div className="r-tmpl-id">
                          <div className="r-tmpl-icon" style={{ backgroundColor: `${t.color}15` }}>{t.icon}</div>
                          <div>
                            <div className="r-tmpl-name">{t.name}</div>
                            <div className="r-tmpl-src">Source: {t.source}</div>
                          </div>
                        </div>
                        <span className="r-tmpl-tag" style={{ backgroundColor: t.tagColor }}>{t.tag}</span>
                      </div>
                      <p className="r-tmpl-desc">{t.desc}</p>
                      <div className="r-features">
                        {t.features.map(f => (
                          <span key={f} className="r-feature" style={{ backgroundColor: `${t.color}12`, color: t.color }}>{f}</span>
                        ))}
                      </div>
                      <div className="r-for-who">
                        <div className="r-for-who-lbl">Best For</div>
                        <div className="r-for-who-val">{t.forWho}</div>
                      </div>
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="r-tmpl-btn" style={{ backgroundColor: t.color }}>
                        Use This Template →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PLATFORMS ── */}
          {activeTab === 'platforms' && (
            <div>
              <div className="r-section-header">
                <h2>Best Resume Platforms</h2>
                <p>Top 5 platforms to build a professional resume — compared and rated.</p>
                <div className="r-divider" />
              </div>
              <div className="r-platforms-grid">
                {platforms.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="r-plat-card">
                    <div className="r-plat-header">
                      <div className="r-plat-id">
                        <div className="r-plat-icon-wrap" style={{ backgroundColor: `${p.color}15` }}>{p.icon}</div>
                        <div>
                          <div className="r-plat-name">{p.name}</div>
                          <span className={`r-plat-free ${p.free ? 'free' : 'paid'}`}>{p.free ? '✓ Free Plan' : 'Paid'}</span>
                        </div>
                      </div>
                      <div className="r-rating" style={{ color: p.color }}>★ {p.rating}</div>
                    </div>
                    <p className="r-plat-desc">{p.desc}</p>
                    <div className="r-plat-tags">
                      {p.tags.map(tag => (
                        <span key={tag} className="r-plat-tag" style={{ backgroundColor: p.color }}>{tag}</span>
                      ))}
                    </div>
                    <div className="r-plat-cta" style={{ color: p.color }}>Build on {p.name} →</div>
                  </a>
                ))}
              </div>

              <div className="r-table-wrap">
                <div className="r-table-head"><h3>Platform Comparison</h3></div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="r-table">
                    <thead>
                      <tr>
                        {['Platform', 'Free Plan', 'AI Features', 'ATS Friendly', 'Rating', 'Best For'].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {platforms.map(p => (
                        <tr key={p.name}>
                          <td><strong>{p.icon} {p.name}</strong></td>
                          <td><span className={`r-sev-badge ${p.free ? 'sev-medium' : 'sev-critical'}`}>{p.free ? '✓ Yes' : '✗ No'}</span></td>
                          <td>{p.tags.some(t => t.includes('AI')) ? '✅ Yes' : '—'}</td>
                          <td style={{ color: '#15803d', fontWeight: 700 }}>✅ Yes</td>
                          <td><strong style={{ color: p.color }}>★ {p.rating}</strong></td>
                          <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{p.tags[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ════════════════════════════════════════════
            TEAM / CREATORS SECTION
        ════════════════════════════════════════════ */}
        <section className="r-team-section">
          <div className="r-team-inner">
            <div className="r-team-header">
              <h2>Meet the Creators</h2>
              <p>The team behind this guide — experienced developers dedicated to helping job seekers succeed.</p>
              <div className="r-team-divider" />
            </div>

            <div className="r-team-grid">
              {teamMembers.map((member, i) => (
                <div key={i} className="r-member-card">
                  {/* Left: Photo / Avatar + Name */}
                  <div className="r-member-left">
                    {/* <div className="r-avatar" style={{ backgroundColor: member.color }}>
                      {member.initials}
                    </div> */}
                   
                      <img 
                        src={member.photo}  // import photo at top of file
                        alt={member.name}
                        style={{ width: 250, height: 388, borderRadius: '', objectFit: 'cover', border: '3px solid #e7e4dd', marginBottom: '0.85rem' }}
                      />
                   
                    <div className="r-member-name">{member.name}</div>
                    <div className="r-member-role">{member.role}</div>
                  </div>

                  {/* Right: Bio + Resume PDF Viewer */}
                  <div className="r-member-right">
                    <p className="r-member-bio">{member.bio}</p>

                    <div className="r-resume-viewer">
                      <div className="r-resume-viewer-header">
                        <span className="r-resume-viewer-label">📄 Resume Preview</span>
                        <div className="r-resume-viewer-actions">
                          <a
                            href={member.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="r-open-btn"
                            style={{ backgroundColor: member.color }}
                          >
                            Open PDF
                          </a>
                          <a
                            href={member.resumeUrl}
                            download
                            className="r-open-btn"
                            style={{ backgroundColor: '#374151' }}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                      {/* PDF Embed — shows inline preview if PDF is accessible */}
                      <object
                        data={member.resumeUrl}
                        type="application/pdf"
                        className="r-pdf-embed"
                      >
                        {/* Fallback if browser can't embed PDF */}
                        <div className="r-pdf-fallback">
                          <span className="r-pdf-fallback-icon">📄</span>
                          <span className="r-pdf-fallback-text">PDF preview not available in this browser</span>
                          <a
                            href={member.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: member.color }}
                          >
                            View Resume →
                          </a>
                        </div>
                      </object>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="r-footer">
          <div className="r-footer-inner">
            <div className="r-footer-brand">
              <div className="r-footer-logo"><span>R</span></div>
              <span className="r-footer-name">ResumeCraft</span>
            </div>
            <p className="r-footer-tagline">Your complete guide to building a job-winning resume in 2026.</p>
            <div className="r-footer-links">
              {resumeSections.map(s => <span key={s.id}>{s.icon} {s.label}</span>)}
            </div>
            <div className="r-footer-copy">
              © 2026 aiplacprep@gmail.com · Built for students and professionals aiming for their dream job.
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

export default Resume