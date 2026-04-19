import React, { useState } from 'react'
import logo from '../../assets/image.png';
import { useNavigate } from 'react-router-dom'; 
const itCompanies = [
  {
    id: 1,
    name: 'TCS',
    logo: '🔷',
    fullName: 'Tata Consultancy Services',
    tagline: 'Building on belief.',
    founded: '1968',
    founders: 'F. C. Kohli, J. R. D. Tata',
    headquarters: 'Mumbai, India',
    employees: '614,000+',
    revenue: '$29.1 Billion (FY2024)',
    marketCap: '$170 Billion+',
    countries: '55+',
    color: '#1B4F9B',
    darkColor: '#0e3063',
    badge: 'India\'s Largest IT',
    badgeColor: 'bg-blue-700',
    rating: 4.1,
    description:
      'Tata Consultancy Services (TCS) is India\'s largest IT services company and a global leader in IT services, consulting, and business solutions. A part of the Tata Group, TCS serves clients across industries in over 55 countries. Known for its massive fresher hiring drives and structured learning ecosystem, TCS is the first employer for hundreds of thousands of Indian engineers every year.',
    services: ['IT Consulting', 'Cloud Services', 'AI & Automation', 'Cybersecurity', 'Data & Analytics', 'ERP Implementation', 'Digital Transformation', 'BPO Services'],
    technologies: ['Java', 'Python', 'SAP', 'Salesforce', 'AWS', 'Azure', 'Machine Learning', 'Blockchain'],
    industries: ['Banking & Finance', 'Retail', 'Manufacturing', 'Healthcare', 'Telecom', 'Government'],
    notableClients: ['ABN AMRO', 'Marks & Spencer', 'Nielsen', 'AXA', 'Rolls-Royce'],
    fresherProgram: 'TCS NQT (National Qualifier Test) — Campus hiring via NQT + TCS iON',
    trainingProgram: 'ILP (Initial Learning Program) — 3 to 6 months of structured technical & soft skills training',
    avgSalary: '₹3.5 – ₹7 LPA (Fresher)',
    seniorSalary: '₹10 – ₹35 LPA (Experienced)',
    internshipStipend: '₹10,000 – ₹15,000/month',
    roles: ['Software Engineer', 'Systems Engineer', 'Business Analyst', 'Data Engineer', 'Cloud Consultant'],
    workCulture: 'Structured, process-oriented work culture. Excellent for learning fundamentals. Large peer network. Good work-life balance at entry level.',
    perks: ['TCS BaNCS Learning', 'Frisco Framework', 'Global Mobility', 'Health Insurance', 'TCS Cares'],
    examTip: 'Clear TCS NQT with strong Aptitude + Coding (C, Java, Python). Verbal ability matters too.',
    url: 'https://www.tcs.com',
    iitians: false,
    topRecruiter: true,
    highlights: ['Largest private employer in India', 'Listed on BSE & NSE (NIFTY 50)', '3rd most valued IT brand globally'],
  },
  {
    id: 2,
    name: 'Infosys',
    logo: '🟣',
    fullName: 'Infosys Limited',
    tagline: 'Navigate your next.',
    founded: '1981',
    founders: 'Narayana Murthy & 6 co-founders',
    headquarters: 'Bangalore, India',
    employees: '343,000+',
    revenue: '$18.6 Billion (FY2024)',
    marketCap: '$75 Billion+',
    countries: '50+',
    color: '#007CC3',
    darkColor: '#005a8e',
    badge: 'Top Campus Recruiter',
    badgeColor: 'bg-sky-600',
    rating: 4.2,
    description:
      'Infosys is India\'s second-largest IT company and a pioneer of the Global Delivery Model. Known for its legendary training center in Mysore — the world\'s largest corporate university — Infosys is a dream employer for engineering graduates. With Infosys Springboard and InfyTQ, it actively invests in student and fresher upskilling even before hiring.',
    services: ['Digital Services', 'Cloud & Infrastructure', 'Data Analytics', 'Consulting', 'BPM', 'Engineering Services', 'AI & ML Solutions', 'Cyber Defense'],
    technologies: ['Java', 'Python', '.NET', 'Angular', 'Kubernetes', 'AWS', 'Databricks', 'Generative AI'],
    industries: ['Financial Services', 'Insurance', 'Life Sciences', 'Energy', 'Hi-Tech', 'Manufacturing'],
    notableClients: ['Goldman Sachs', 'Vanguard', 'BP', 'Harley Davidson', 'Daimler'],
    fresherProgram: 'InfyTQ platform + Infosys Instep (Internship) + Off-campus InfyTQ certification hiring',
    trainingProgram: 'Generic Training Program (GTP) — Mysore Global Education Center (world\'s largest corporate training campus)',
    avgSalary: '₹3.6 – ₹8 LPA (Fresher)',
    seniorSalary: '₹12 – ₹40 LPA (Experienced)',
    internshipStipend: '₹15,000 – ₹25,000/month',
    roles: ['Systems Engineer', 'Technology Analyst', 'Associate Consultant', 'Data Scientist', 'DevOps Engineer'],
    workCulture: 'Values-driven, ethical work environment. Strong emphasis on learning and continuous improvement. Diverse global exposure.',
    perks: ['Infosys Springboard', 'InfyMe App', 'Global Assignments', 'Medical Insurance', 'Sodexo Meal Cards'],
    examTip: 'InfyTQ certification (score 65%+) is key. Focus on Problem Solving, Pseudocode, and Core CS concepts.',
    url: 'https://www.infosys.com',
    iitians: false,
    topRecruiter: true,
    highlights: ['World\'s largest corporate university in Mysore', 'Infosys Prize for outstanding researchers', 'Pioneer of Global Delivery Model'],
  },
  {
    id: 3,
    name: 'Wipro',
    logo: '🌸',
    fullName: 'Wipro Limited',
    tagline: 'Innovating together.',
    founded: '1945',
    founders: 'Mohamed Premji (IT: Azim Premji)',
    headquarters: 'Bangalore, India',
    employees: '234,000+',
    revenue: '$11.3 Billion (FY2024)',
    marketCap: '$26 Billion+',
    countries: '65+',
    color: '#9B1D8A',
    darkColor: '#6b1460',
    badge: 'Sustainability Leader',
    badgeColor: 'bg-purple-600',
    rating: 4.0,
    description:
      'Wipro is one of India\'s most respected IT companies, known for its strong ethical culture rooted in founder Azim Premji\'s philanthropic philosophy. Wipro serves 200+ Fortune 500 clients and has a strong presence in Europe and North America. Its WILP (Work Integrated Learning Program) with BITS Pilani is a unique offering for freshers wanting a PG degree while working.',
    services: ['Cloud & Infrastructure', 'Digital Operations', 'Data & AI', 'Engineering R&D', 'Consulting', 'SAP Services', 'Cybersecurity', 'Product Engineering'],
    technologies: ['Python', 'Java', 'SAP', 'Salesforce', 'Azure', 'GCP', 'OpenAI APIs', 'IoT'],
    industries: ['Consumer', 'Energy & Utilities', 'Healthcare', 'Media', 'Aerospace', 'Communications'],
    notableClients: ['Shell', 'Aon', 'Metro AG', 'Bausch Health', 'State Street'],
    fresherProgram: 'Wipro Elite NTH (National Talent Hunt) + WILP (Work Integrated Learning Program with BITS Pilani)',
    trainingProgram: 'Wipro SEED (foundation training) — 3 months technical + behavioral. WILP for MTech while working.',
    avgSalary: '₹3.5 – ₹6.5 LPA (Fresher)',
    seniorSalary: '₹10 – ₹32 LPA (Experienced)',
    internshipStipend: '₹10,000 – ₹20,000/month',
    roles: ['Project Engineer', 'Software Engineer', 'Test Engineer', 'Cloud Engineer', 'SAP Consultant'],
    workCulture: 'Ethics-first, inclusive culture. Good work-life balance. Strong CSR values. Global exposure for high performers.',
    perks: ['WILP (MTech while working)', 'Wipro Cares (CSR)', 'Health Coverage', 'Wipro Learning Platform', 'ESOPs'],
    examTip: 'Wipro NTH has 3 rounds — Aptitude, Written Communication, and Online Technical Interview. Focus on OOPS & DSA.',
    url: 'https://www.wipro.com',
    iitians: false,
    topRecruiter: true,
    highlights: ['WILP program offers M.Tech from BITS Pilani while working', 'Azim Premji donated $21B to education', '1st Indian IT firm to achieve carbon neutrality'],
  },
  {
    id: 4,
    name: 'HCL Tech',
    logo: '🟠',
    fullName: 'HCL Technologies Limited',
    tagline: 'Supercharging progress.',
    founded: '1976',
    founders: 'Shiv Nadar',
    headquarters: 'Noida, India',
    employees: '227,000+',
    revenue: '$13.3 Billion (FY2024)',
    marketCap: '$48 Billion+',
    countries: '60+',
    color: '#E86B1F',
    darkColor: '#b84e12',
    badge: 'Engineering Excellence',
    badgeColor: 'bg-orange-500',
    rating: 4.1,
    description:
      'HCL Technologies is India\'s third-largest IT services company and a global leader in engineering and R&D services. Founded by Shiv Nadar, HCL is particularly strong in product engineering, semiconductor design, and embedded systems — areas that differentiate it from pure-play IT services peers. HCL\'s Freshers program offers one of the highest CTC packages among mass recruiters.',
    services: ['Engineering & R&D', 'Cloud-Native Services', 'Digital Process Operations', 'IoT & Embedded', 'Cybersecurity', 'AI & Analytics', 'SAP & ERP', 'Product Engineering'],
    technologies: ['Embedded C', 'VLSI', 'Java', 'Python', 'Kubernetes', 'Azure', 'Splunk', 'Terraform'],
    industries: ['Aerospace & Defense', 'Semiconductors', 'Automotive', 'Telecom', 'Life Sciences', 'Financial Services'],
    notableClients: ['Boeing', 'Airbus', 'Volvo', 'Nokia', 'Xerox', 'LG Electronics'],
    fresherProgram: 'HCL TechBee (after Class 12!) + Campus hiring via HCL HireVue + HLFT (HCL Lateral Fast Track)',
    trainingProgram: 'LEAP (Learning & Empowerment for Aspiring Professionals) — 3-month onboarding + domain training',
    avgSalary: '₹4.5 – ₹9 LPA (Fresher)',
    seniorSalary: '₹12 – ₹38 LPA (Experienced)',
    internshipStipend: '₹15,000 – ₹25,000/month',
    roles: ['Graduate Engineer Trainee', 'Software Engineer', 'R&D Engineer', 'Embedded Systems Engineer', 'Cloud Architect'],
    workCulture: 'Entrepreneurial, employee-first culture. "Employees First, Customers Second" philosophy. High ownership for juniors.',
    perks: ['Ideapreneurship Program', 'HCL Foundation CSR', 'TechBee (post-12th hiring)', 'HCL Sampark', 'Global Mobility'],
    examTip: 'HCL HireVue — Video interview + Coding + Aptitude. Strong in DSA & System Design for higher packages.',
    url: 'https://www.hcltech.com',
    iitians: false,
    topRecruiter: true,
    highlights: ['HCL TechBee hires after Class 12 with B.Tech sponsorship', '"Employees First, Customers Second" — pioneering HR philosophy', 'Leads in Aerospace & Semiconductor engineering globally'],
  },
  {
    id: 5,
    name: 'Tech Mahindra',
    logo: '🔺',
    fullName: 'Tech Mahindra Limited',
    tagline: 'Connected world. Connected experience.',
    founded: '1986',
    founders: 'Anand Mahindra, British Telecom',
    headquarters: 'Pune, India',
    employees: '152,000+',
    revenue: '$6.5 Billion (FY2024)',
    marketCap: '$13 Billion+',
    countries: '90+',
    color: '#D7282F',
    darkColor: '#941c22',
    badge: 'Telecom Specialist',
    badgeColor: 'bg-red-600',
    rating: 3.9,
    description:
      'Tech Mahindra is the IT arm of the Mahindra Group and a global leader in telecom technology services. With a strong footprint in 5G, network engineering, and digital transformation for telecom giants, Tech Mahindra offers unique opportunities in a space most IT companies don\'t specialize in. It is also expanding aggressively in AI, cybersecurity, and metaverse technologies.',
    services: ['5G & Network Services', 'Cloud Transformation', 'AI & Cognitive Solutions', 'Cybersecurity', 'BPO/BPM', 'SAP', 'IoT Solutions', 'Metaverse Services'],
    technologies: ['5G/LTE', 'Python', 'Java', 'Network Automation', 'AWS', 'Azure', 'Blockchain', 'AR/VR'],
    industries: ['Telecom', 'Media & Entertainment', 'Retail', 'Manufacturing', 'BFSI', 'Healthcare'],
    notableClients: ['AT&T', 'BT Group', 'T-Mobile', 'Comcast', 'Vodafone'],
    fresherProgram: 'Tech Mahindra Smart Hire + TechM RISE program for freshers',
    trainingProgram: 'iConnect — structured 8-week onboarding with technical, soft skills & domain training',
    avgSalary: '₹3.3 – ₹6 LPA (Fresher)',
    seniorSalary: '₹9 – ₹30 LPA (Experienced)',
    internshipStipend: '₹10,000 – ₹18,000/month',
    roles: ['Software Engineer', 'Network Engineer', '5G Solutions Engineer', 'UI/UX Developer', 'Business Analyst'],
    workCulture: 'Dynamic, innovation-driven culture. Strong telecom domain learning. Good for networking & communication roles.',
    perks: ['TechM RISE Learning', 'Mahindra Finance Benefits', 'Global Travel Opportunities', 'Employee Wellness App', 'ESOPs'],
    examTip: 'Tech Mahindra Smart Hire — 4 sections: Aptitude, Verbal, Coding, Technical. Focus on Networking basics if targeting telecom roles.',
    url: 'https://www.techmahindra.com',
    iitians: false,
    topRecruiter: true,
    highlights: ['World\'s leading 5G technology services provider', 'Operating in 90+ countries — widest global spread', 'Invested $150M in AI & Metaverse division'],
  },
  {
    id: 6,
    name: 'Accenture',
    logo: '⟩',
    fullName: 'Accenture PLC',
    tagline: 'Let there be change.',
    founded: '1989',
    founders: 'Arthur Andersen spin-off',
    headquarters: 'Dublin, Ireland',
    employees: '733,000+',
    revenue: '$64.9 Billion (FY2024)',
    marketCap: '$200 Billion+',
    countries: '120+',
    color: '#A100FF',
    darkColor: '#6e00b0',
    badge: 'Global IT Giant',
    badgeColor: 'bg-violet-700',
    rating: 4.3,
    description:
      'Accenture is the world\'s largest IT services and consulting company by revenue and headcount. With a presence in 120+ countries and clients across virtually every industry, Accenture bridges consulting and technology uniquely. For freshers, Accenture India is one of the top mass recruiters offering strong salaries, global exposure, and rapid career growth through its ASE (Associate Software Engineer) program.',
    services: ['Strategy & Consulting', 'Technology', 'Interactive (Design)', 'Operations', 'Security', 'Cloud First', 'Industry X', 'Song (Marketing)'],
    technologies: ['Java', 'Python', 'React', 'Salesforce', 'SAP', 'AWS', 'GCP', 'Generative AI'],
    industries: ['Banking', 'Insurance', 'Retail', 'Government', 'Life Sciences', 'Utilities', 'Communications'],
    notableClients: ['Microsoft', 'Apple', 'Pfizer', 'P&G', 'Unilever', 'US Department of Defense'],
    fresherProgram: 'ASE (Associate Software Engineer) — campus hiring via AMCAT + Accenture Off-Campus drives',
    trainingProgram: 'ASE Training Program — 8 weeks technical foundation + domain-specific modules at Accenture Delivery Centers',
    avgSalary: '₹4.5 – ₹8.5 LPA (Fresher ASE)',
    seniorSalary: '₹14 – ₹50 LPA (Experienced)',
    internshipStipend: '₹20,000 – ₹40,000/month',
    roles: ['Associate Software Engineer', 'Technology Analyst', 'Consulting Analyst', 'Cloud Engineer', 'Data Analyst'],
    workCulture: 'Fast-paced, global, inclusive. Strong DE&I culture. Many opportunities to rotate across domains and geographies.',
    perks: ['Accenture Learning Board', 'Global Rotation Program', 'Flex Work Policy', 'Mental Health Support', 'ESOPs'],
    examTip: 'Accenture AMCAT — Cognitive + Technical + Communication modules. Coding in Java/Python. No negative marking.',
    url: 'https://www.accenture.com',
    iitians: true,
    topRecruiter: true,
    highlights: ['World\'s #1 IT company by revenue & employees', 'Hired 200,000+ freshers in India (2022–24)', 'Fortune Global 500 — Rank #64'],
  },
]
 
const globalStats = [
  { label: 'Combined Revenue', value: '$143B+', icon: '💰' },
  { label: 'Total IT Professionals', value: '2.3M+', icon: '👨‍💻' },
  { label: 'Fresher Hires/Year', value: '300,000+', icon: '🎓' },
  { label: 'Countries Served', value: '120+', icon: '🌍' },
]
 
const careerPath = [
  { level: 'Intern / Trainee', exp: '0 yr', ctc: '₹2–5 LPA', icon: '🎓', tip: 'Build DSA + 1 project' },
  { level: 'Junior Engineer (L1)', exp: '0–2 yrs', ctc: '₹4–9 LPA', icon: '💻', tip: 'Learn cloud basics + communication' },
  { level: 'Software Engineer (L2)', exp: '2–4 yrs', ctc: '₹8–18 LPA', icon: '⚙️', tip: 'Own modules, mentor juniors' },
  { level: 'Senior Engineer (L3)', exp: '4–7 yrs', ctc: '₹16–30 LPA', icon: '🔧', tip: 'Lead small teams, architecture decisions' },
  { level: 'Tech Lead / Manager', exp: '7–10 yrs', ctc: '₹28–55 LPA', icon: '📋', tip: 'Client-facing, people management' },
  { level: 'Principal / Director', exp: '10+ yrs', ctc: '₹50 LPA – ₹1.5 Cr', icon: '👑', tip: 'Business strategy + P&L ownership' },
]
 
const examGuide = [
  {
    company: 'TCS',
    exam: 'TCS NQT (National Qualifier Test)',
    sections: 'Cognitive Ability (Quant + Reasoning + Verbal)  Advanced Coding (2 questions) · Programming Logic',
    rounds: 'NQT Exam → Technical Interview → HR Interview',
    tip: 'Strong focus on aptitude + coding (DSA basics + patterns)',
    color: '#1B4F9B'
  },
  {
    company: 'Infosys',
    exam: 'Infosys Hiring Test / InfyTQ',
    sections: 'Aptitude · Reasoning · Verbal · Pseudocode · Debugging · Basic Coding',
    rounds: 'Online Test → Technical Interview → HR Interview',
    tip: 'Pseudocode + DBMS + OOPs very important',
    color: '#007CC3'
  },
  {
    company: 'Wipro',
    exam: 'Wipro NTH (National Talent Hunt)',
    sections: 'Aptitude · Verbal · Essay Writing · Coding (for higher roles)',
    rounds: 'Online Assessment → Voice Assessment → Technical Interview → HR Interview',
    tip: 'Communication round is elimination-heavy',
    color: '#9B1D8A'
  },
  {
    company: 'HCL',
    exam: 'HCLTech Assessment / HireVue',
    sections: 'Aptitude · Coding · Technical MCQs · Video Interview',
    rounds: 'Online Test → Technical Interview → HR Interview',
    tip: 'Focus on core subjects + coding basics',
    color: '#E86B1F'
  },
  {
    company: 'Tech Mahindra',
    exam: 'Smart Hire / Superset Test',
    sections: 'Aptitude · Verbal · Logical · Coding · Technical MCQs',
    rounds: 'Online Test → Technical Interview → HR Interview',
    tip: 'Networking + OS basics important',
    color: '#D7282F'
  },
  {
    company: 'Accenture',
    exam: 'Accenture Cogn + Technical Assess',
    sections: 'Cognitive (Aptitude) · Technical MCQs · Coding (2 questions) · Communication Test',
    rounds: 'Assessment → Technical Interview → HR Interview',
    tip: 'No negative marking, attempt all + focus on communication test',
    color: '#A100FF'
  }
]
 
const studentTips = [
  { icon: '📘', title: 'Master the Basics', desc: 'Data Structures, Algorithms, DBMS, OS, and Computer Networks are asked across all IT company interviews. These are non-negotiable.' },
  { icon: '💡', title: 'Choose Your Track Early', desc: 'Decide between Service (TCS/Wipro) vs Product (startups) early. Service companies value aptitude; product companies value DSA & system design.' },
  { icon: '🏆', title: 'Get Certified', desc: 'AWS Cloud Practitioner, Google IT Support, or InfyTQ certifications add real value to your resume and can fast-track hiring.' },
  { icon: '🌐', title: 'Build a GitHub Profile', desc: 'Recruiters at IT firms increasingly check GitHub. 3–4 well-documented projects beat a dozen half-built ones every time.' },
]
 
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-sm ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
    <span className="text-slate-500 text-xs ml-1 font-bold">{rating}/5</span>
  </div>
)
 
const Service = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState({})
  const [hovered, setHovered] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
 
  const getTab = (id) => activeTab[id] || 'overview'
  const setTab = (id, tab) => setActiveTab((p) => ({ ...p, [id]: tab }))
 
  const filters = ['All', 'Top Recruiter', 'Telecom Specialist', 'Global IT Giant', 'Engineering Excellence']
  const filtered = activeFilter === 'All' ? itCompanies : itCompanies.filter(c =>
    activeFilter === 'Top Recruiter' ? c.topRecruiter :
    activeFilter === 'Global IT Giant' ? c.iitians :
    c.badge.includes(activeFilter)
  )
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
           <img onClick={()=>navigate("/")}
      src={logo}
      alt="logo"
      className="w-42 sm:w-45 cursor-pointer rounded-xl"
    />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[20px]  text-slate-800">
            <a href="#companies" className="hover:text-blue-600 transition-colors">Companies</a>
            <a href="#exams" className="hover:text-blue-600 transition-colors">Exam Guide</a>
            <a href="#career" className="hover:text-blue-600 transition-colors">Career Path</a>
            <a href="#tips" className="hover:text-blue-600 transition-colors">Student Tips</a>
          </div>
     
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            For Students & Job Seekers
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            India's Top <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">IT Service</span><br />Companies to Join
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            TCS, Infosys, Wipro, HCL, Tech Mahindra & Accenture — complete insider guide to
            services, salaries, hiring exams, and career paths for freshers and students.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a href="#companies" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm">
              Explore Companies
            </a>
            <a href="#exams" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm">
              View Exam Guide
            </a>
          </div>
          {/* Company pill strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {itCompanies.map((c) => (
              <div key={c.id} className="bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
                <span>{c.logo}</span>
                <span className="text-sm font-semibold text-white">{c.name}</span>
                <span className="text-xs text-slate-400">{c.employees} emp.</span>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── STATS ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {globalStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-blue-700 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── COMPANY CARDS ── */}
      <section id="companies" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">In-Depth Company Profiles</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Everything a student needs — services, salaries, training programs, and hiring tips.</p>
        </div>
 
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === f
                  ? 'bg-blue-700 text-white border-blue-700 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
 
        {/* Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {itCompanies.map((company) => (
            <div
              key={company.id}
              onMouseEnter={() => setHovered(company.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
                hovered === company.id ? 'shadow-2xl -translate-y-1 border-blue-200' : 'shadow-md'
              }`}
            >
              {/* Header */}
              <div className="p-7 pb-4" style={{ borderTop: `5px solid ${company.color}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm font-bold"
                      style={{ backgroundColor: `${company.color}18`, color: company.color }}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{company.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{company.fullName}</p>
                      <p className="text-xs italic text-slate-400 mt-1">"{company.tagline}"</p>
                    </div>
                  </div>
                  <span className={`${company.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}>
                    {company.badge}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <StarRating rating={company.rating} />
                  <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                    👥 {company.employees}
                  </span>
                  <span className="text-xs bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded-full border border-green-100">
                    💰 {company.revenue.split(' ')[0]}
                  </span>
                </div>
              </div>
 
              {/* Tabs */}
              <div className="px-7 flex gap-1 border-b border-slate-100">
                {['overview', 'services', 'careers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTab(company.id, tab)}
                    className={`px-4 py-2.5 text-xs font-bold capitalize rounded-t-lg transition-all ${
                      getTab(company.id) === tab ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    style={getTab(company.id) === tab ? { backgroundColor: company.color } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>
 
              {/* Tab Content */}
              <div className="p-7 pt-5 flex-1">
 
                {/* OVERVIEW */}
                {getTab(company.id) === 'overview' && (
                  <div className="space-y-5">
                    <p className="text-slate-600 text-sm leading-relaxed">{company.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Founded', value: company.founded },
                        { label: 'Founders', value: company.founders },
                        { label: 'Headquarters', value: company.headquarters },
                        { label: 'Countries', value: company.countries },
                        { label: 'Market Cap', value: company.marketCap },
                        { label: 'Employees', value: company.employees },
                      ].map((item) => (
                        <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                          <p className="text-sm text-slate-800 font-bold leading-snug">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Highlights</p>
                      <ul className="space-y-2">
                        {company.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notable Clients</p>
                      <div className="flex flex-wrap gap-2">
                        {company.notableClients.map((cl) => (
                          <span key={cl} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">{cl}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* SERVICES */}
                {getTab(company.id) === 'services' && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Service Lines</p>
                      <div className="grid grid-cols-2 gap-2">
                        {company.services.map((s) => (
                          <div
                            key={s}
                            className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: `${company.color}12`, color: company.darkColor }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: company.color }} />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Technologies Used</p>
                      <div className="flex flex-wrap gap-2">
                        {company.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                            style={{ borderColor: `${company.color}50`, color: company.darkColor, backgroundColor: `${company.color}10` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Industries Served</p>
                      <div className="flex flex-wrap gap-2">
                        {company.industries.map((ind) => (
                          <span key={ind} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{ind}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* CAREERS */}
                {getTab(company.id) === 'careers' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">🎓 Fresher Hiring Program</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.fresherProgram}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">🏫 Training Program</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.trainingProgram}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fresher CTC</span>
                        <span className="text-sm font-extrabold" style={{ color: company.color }}>{company.avgSalary}</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Experienced CTC</span>
                        <span className="text-sm font-extrabold text-green-700">{company.seniorSalary}</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Internship Stipend</span>
                        <span className="text-sm font-bold text-slate-700">{company.internshipStipend}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Open Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {company.roles.map((r) => (
                          <span key={r} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                            style={{ backgroundColor: `${company.color}15`, color: company.darkColor }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                      <p className="text-xs font-bold text-green-700 mb-1">💡 Exam Tip</p>
                      <p className="text-sm text-slate-600">{company.examTip}</p>
                    </div>
                    <a
                      href={`${company.url}/careers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: company.color }}
                    >
                      Apply at {company.name} →
                    </a>
                  </div>
                )}
 
              </div>
            </div>
          ))}
        </div>
      </section>
 
     <section className="bg-white border-y border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
            📝 Hiring Exam Quick Guide
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Know exactly what to prepare for each company's recruitment test.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {examGuide.map((e) => (
            <div
              key={e.company}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-extrabold text-slate-800">
                  {e.company}
                </h4>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: e.color }}
                >
                  {e.exam}
                </span>
              </div>

              {/* SECTIONS (NUMBERED) */}
              <div className="mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Exam Sections
                </p>

                <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                  {(Array.isArray(e.sections)
                    ? e.sections
                    : e.sections.split("·")
                  ).map((sec, index) => (
                    <li key={index}>{sec.trim()}</li>
                  ))}
                </ol>
              </div>

              {/* ROUNDS (NUMBERED) */}
              <div className="mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Hiring Rounds
                </p>

                <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                  {(Array.isArray(e.rounds)
                    ? e.rounds
                    : e.rounds.split("→")
                  ).map((round, index) => (
                    <li key={index}>{round.trim()}</li>
                  ))}
                </ol>
              </div>

              {/* TIP */}
              <div className="bg-white rounded-xl p-3 border border-slate-200">
                <p className="text-xs font-bold text-green-600 mb-1">
                  ✅ Pro Tip
                </p>
                <p className="text-sm text-slate-600">
                  {e.tip}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
 
      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Side-by-Side Comparison</h2>
          <p className="text-slate-500 text-lg">All 6 companies at a glance — choose what fits your goals.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-5 py-4 font-bold rounded-tl-2xl">Company</th>
                <th className="text-left px-5 py-4 font-bold">Employees</th>
                <th className="text-left px-5 py-4 font-bold">Revenue</th>
                <th className="text-left px-5 py-4 font-bold">Fresher CTC</th>
                <th className="text-left px-5 py-4 font-bold">Hiring Exam</th>
                <th className="text-left px-5 py-4 font-bold rounded-tr-2xl">Rating</th>
              </tr>
            </thead>
            <tbody>
              {itCompanies.map((c, idx) => (
                <tr key={c.id} className={`border-t border-slate-100 hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span>{c.logo}</span>{c.name}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600 font-medium">{c.employees}</td>
                  <td className="px-5 py-4 font-bold text-green-700">{c.revenue.split(' ')[0]}</td>
                  <td className="px-5 py-4 font-bold" style={{ color: c.color }}>{c.avgSalary}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{examGuide.find(e => e.company === c.name)?.exam}</td>
                  <td className="px-5 py-4">
                    <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {c.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ── CAREER PATH ── */}
 
      {/* ── STUDENT TIPS ── */}
      <section id="tips" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Tips for Students & Job Seekers</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Practical advice to maximize your chances of landing your first IT job.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {studentTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">{tip.icon}</div>
              <h4 className="text-slate-800 font-bold text-lg mb-2">{tip.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 rounded-3xl text-white px-8 py-16 md:px-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-4 relative z-10">Begin Your IT Career Today</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10 relative z-10">
            Prepare smart, apply early, and pick the company that aligns with your goals. Your IT journey starts now.
          </p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {itCompanies.map((c) => (
              <a
                key={c.id}
                href={`${c.url}/careers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/15 transition-all"
                style={{ backgroundColor: `${c.color}40` }}
              >
                {c.logo} {c.name} Jobs
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">IT</span>
            </div>
            <span className="text-white font-bold text-lg">ITCareerGuide</span>
          </div>
          <p className="text-sm mb-6">Your complete guide to India's top IT service companies for students and freshers.</p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500 mb-6">
            {itCompanies.map((c) => (
              <span key={c.id}>{c.logo} {c.name}</span>
            ))}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-6">
               © 2026 aiplacprep@gmail.com  All rights reserved. Salary figures are indicative and may vary by location, role, and performance.
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default Service