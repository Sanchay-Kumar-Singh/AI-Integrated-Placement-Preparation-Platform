import React, { useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
const maangCompanies = [
  {
    id: 1,
    name: 'Meta',
    logo: '♾️',
    acronym: 'M',
    fullName: 'Meta Platforms Inc.',
    tagline: 'Move fast and build things.',
    hq: 'Menlo Park, CA, USA',
    founded: '2004',
    ceo: 'Mark Zuckerberg',
    employees: '67,000+',
    revenue: '$134.9 Billion (2023)',
    marketCap: '$1.4 Trillion',
    color: '#0866FF',
    darkColor: '#044cc4',
    badge: 'AI & Social Giant',
    badgeColor: 'bg-blue-600',
    rating: 4.5,
    description:
      'Meta owns the world\'s largest social media ecosystem — Facebook, Instagram, and WhatsApp. With aggressive bets on AI (Llama), AR/VR (Oculus), and the Metaverse, Meta is one of the most technically ambitious companies hiring today. Known for paying top-of-market and expecting world-class engineering.',
    products: ['Facebook', 'Instagram', 'WhatsApp', 'Oculus / Quest VR', 'Threads', 'Llama AI', 'Meta AI', 'Messenger'],
    techStack: ['React', 'PyTorch', 'Hack/PHP', 'Python', 'C++', 'GraphQL', 'Presto'],
    avgSalaryIndia: '₹30 – ₹1.2 Cr LPA',
    avgSalaryUSA: '$220K – $800K+',
    interviewRounds: 5,
    interviewFocus: 'DSA (LeetCode Hard) + System Design + Behavioral (Meta values)',
    openRoles: ['SWE', 'ML Engineer', 'AR/VR Engineer', 'Data Scientist', 'Product Manager'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
    offices: ['Menlo Park', 'New York', 'London', 'Dublin', 'Hyderabad (India)'],
    perks: ['Free meals', 'RSU grants', '$4K equipment budget', 'Fertility benefits', 'Remote flex'],
    highlights: ['Owns 3 of top 5 social apps globally', 'Llama open-source AI model', '3.2B daily active users across apps'],
    careerUrl: 'https://www.metacareers.com',
  },
  {
    id: 2,
    name: 'Apple',
    logo: '🍎',
    acronym: 'A',
    fullName: 'Apple Inc.',
    tagline: 'Think different.',
    hq: 'Cupertino, CA, USA',
    founded: '1976',
    ceo: 'Tim Cook',
    employees: '164,000+',
    revenue: '$383.3 Billion (FY2023)',
    marketCap: '$3.5 Trillion',
    color: '#1d1d1f',
    darkColor: '#000000',
    badge: 'World\'s Most Valuable',
    badgeColor: 'bg-gray-800',
    rating: 4.7,
    description:
      'Apple is the world\'s most valuable company by market cap, building the most iconic consumer hardware and software products in history. Jobs at Apple are extremely selective — you\'ll work on products used by 2 billion people. Apple values deep domain expertise, craftsmanship, and secrecy above all.',
    products: ['iPhone', 'MacBook / Mac', 'iPad', 'Apple Watch', 'AirPods', 'iOS / macOS', 'Apple Silicon (M-series)', 'Vision Pro'],
    techStack: ['Swift', 'Objective-C', 'C++', 'Metal (GPU)', 'LLVM', 'CoreML', 'Python'],
    avgSalaryIndia: '₹25 – ₹1 Cr LPA',
    avgSalaryUSA: '$210K – $650K+',
    interviewRounds: 6,
    interviewFocus: 'Deep technical expertise + Culture fit + Problem solving. Very role-specific.',
    openRoles: ['iOS Engineer', 'Silicon / VLSI Engineer', 'ML Researcher', 'Hardware Engineer', 'UX Designer'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
    offices: ['Cupertino', 'Austin', 'New York', 'London', 'Hyderabad (India)', 'Bangalore'],
    perks: ['Apple hardware discounts', 'RSUs', 'Health & wellness', 'On-site fitness', 'Education reimbursement'],
    highlights: ['$3.5T market cap — world #1', 'Vision Pro: spatial computing revolution', 'M-series chips outperform Intel by 3x'],
    careerUrl: 'https://www.apple.com/careers',
  },
  {
    id: 3,
    name: 'Amazon',
    logo: '📦',
    acronym: 'A',
    fullName: 'Amazon.com Inc.',
    tagline: 'Work hard. Have fun. Make history.',
    hq: 'Seattle, WA, USA',
    founded: '1994',
    ceo: 'Andy Jassy',
    employees: '1,500,000+',
    revenue: '$574.8 Billion (2023)',
    marketCap: '$2.1 Trillion',
    color: '#FF9900',
    darkColor: '#b36d00',
    badge: 'Largest by Employees',
    badgeColor: 'bg-amber-500',
    rating: 4.2,
    description:
      'Amazon dominates e-commerce, cloud computing (AWS), and logistics simultaneously. AWS alone powers 33% of the world\'s internet. Amazon\'s Leadership Principles are the backbone of its culture and interview process — they\'re non-negotiable. It\'s one of the largest tech employers in India with massive teams in Hyderabad and Bangalore.',
    products: ['AWS', 'Amazon Prime', 'Alexa', 'Kindle', 'Ring', 'Amazon Go', 'Twitch', 'Zoox (Self-driving)'],
    techStack: ['Java', 'Python', 'AWS Services', 'Scala', 'React', 'DynamoDB', 'Kafka'],
    avgSalaryIndia: '₹20 – ₹80 LPA',
    avgSalaryUSA: '$180K – $450K+',
    interviewRounds: 5,
    interviewFocus: '14 Leadership Principles + DSA (Medium-Hard) + System Design for SDE2+',
    openRoles: ['SDE I / II / III', 'Solutions Architect', 'Data Engineer', 'TPM', 'Product Manager'],
    difficulty: 'Hard',
    diffColor: 'bg-orange-100 text-orange-700',
    offices: ['Seattle', 'New York', 'London', 'Hyderabad (India)', 'Bangalore', 'Chennai'],
    perks: ['Signing bonus', 'RSU vesting', 'Relocation', 'Medical coverage', 'Parental leave'],
    highlights: ['AWS = 33% of global cloud market', '1.5M+ employees — world\'s 2nd largest employer', 'Amazon India offices: 70,000+ employees'],
    careerUrl: 'https://www.amazon.jobs',
  },
  {
    id: 4,
    name: 'Netflix',
    logo: '🎬',
    acronym: 'N',
    fullName: 'Netflix Inc.',
    tagline: 'See what\'s next.',
    hq: 'Los Gatos, CA, USA',
    founded: '1997',
    ceo: 'Greg Peters & Ted Sarandos',
    employees: '13,000+',
    revenue: '$33.7 Billion (2023)',
    marketCap: '$350 Billion',
    color: '#E50914',
    darkColor: '#9e060e',
    badge: 'Top Pay in Tech',
    badgeColor: 'bg-red-600',
    rating: 4.6,
    description:
      'Netflix is famous for two things: revolutionary streaming tech and the highest salaries in the industry. With only ~13,000 employees serving 260M+ subscribers globally, Netflix is ultra-lean and ultra-high-bar. Its "Freedom & Responsibility" culture means you get massive autonomy — and massive accountability.',
    products: ['Netflix Streaming', 'Netflix Originals', 'Netflix Games', 'Downloads Feature', 'Fast.com', 'Netflix Kids'],
    techStack: ['Java', 'Python', 'Node.js', 'React', 'Cassandra', 'Kafka', 'Chaos Engineering (Simian Army)'],
    avgSalaryIndia: 'Rare India presence',
    avgSalaryUSA: '$300K – $900K+ (incl. stock)',
    interviewRounds: 5,
    interviewFocus: 'System Design (very deep) + Culture fit ("Keeper Test") + Domain expertise',
    openRoles: ['Senior SWE', 'ML Platform Engineer', 'Data Engineer', 'Reliability Engineer', 'Product Manager'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
    offices: ['Los Gatos', 'Los Angeles', 'New York', 'Amsterdam', 'Singapore'],
    perks: ['Unlimited PTO', 'Top-of-market cash salary', 'No rigid hierarchy', 'Full healthcare', 'Work from anywhere'],
    highlights: ['Pays highest base salaries in all of tech', '260M+ paid subscribers in 190 countries', 'Originals: Stranger Things, Squid Game, Wednesday'],
    careerUrl: 'https://jobs.netflix.com',
  },
  {
    id: 5,
    name: 'Google',
    logo: '🔵',
    acronym: 'G',
    fullName: 'Google LLC (Alphabet Inc.)',
    tagline: 'Organize the world\'s information.',
    hq: 'Mountain View, CA, USA',
    founded: '1998',
    ceo: 'Sundar Pichai',
    employees: '182,000+',
    revenue: '$307.4 Billion (2023)',
    marketCap: '$2.3 Trillion',
    color: '#4285F4',
    darkColor: '#1a56c4',
    badge: 'Most Dream Employer',
    badgeColor: 'bg-blue-700',
    rating: 4.9,
    description:
      'Google is consistently ranked the #1 dream employer for engineers worldwide. Creator of Android, Chrome, YouTube, Google Cloud, and now Gemini AI — Google operates at a scale few companies can imagine. Googleplex perks, world-class research, and the "Googleyness" culture make it the ultimate tech destination.',
    products: ['Google Search', 'Android', 'YouTube', 'Google Cloud (GCP)', 'Chrome', 'Gmail', 'Google Maps', 'Gemini AI'],
    techStack: ['Python', 'Go', 'C++', 'Java', 'TensorFlow', 'JAX', 'Kubernetes', 'Spanner'],
    avgSalaryIndia: '₹25 – ₹1 Cr+ LPA',
    avgSalaryUSA: '$200K – $600K+',
    interviewRounds: 5,
    interviewFocus: 'Heavy DSA (LeetCode Hard) + System Design + Googleyness (behavioral)',
    openRoles: ['SWE', 'ML Engineer', 'Site Reliability Engineer', 'Product Manager', 'UX Researcher'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
    offices: ['Mountain View', 'New York', 'London', 'Hyderabad (India)', 'Bangalore', 'Mumbai'],
    perks: ['Free gourmet meals', '20% project time', 'On-site gym & pool', 'RSUs', 'Parental leave 18 weeks'],
    highlights: ['#1 dream employer for engineers globally', 'Gemini AI challenges OpenAI directly', 'YouTube: 2B+ monthly users'],
    careerUrl: 'https://careers.google.com',
  },
]
 
const stats = [
  { label: 'Combined Market Cap', value: '$9.7T+', icon: '💎' },
  { label: 'Total Employees', value: '1.9M+', icon: '👥' },
  { label: 'Combined Revenue', value: '$1.2T+', icon: '💰' },
  { label: 'Avg. USA Salary', value: '$500K+', icon: '🤑' },
]
 
const interviewRoadmap = [
  { step: '01', title: 'DSA Foundation', duration: '2–3 months', desc: 'Solve 200+ LeetCode problems. Focus: Arrays, Trees, Graphs, DP, Sliding Window.', icon: '🧠', color: 'bg-blue-600' },
  { step: '02', title: 'System Design', duration: '1–2 months', desc: 'Learn to design URL shortener, Twitter, Netflix. Study scalability, caching, load balancing.', icon: '🏗️', color: 'bg-violet-600' },
  { step: '03', title: 'Behavioral Prep', duration: '2–3 weeks', desc: 'Prepare 8–10 STAR stories. Know company values (Amazon LP, Meta values, Googleyness).', icon: '🗣️', color: 'bg-amber-500' },
  { step: '04', title: 'Mock Interviews', duration: '2–4 weeks', desc: 'Do 10+ mock interviews on Pramp, interviewing.io. Get comfortable under pressure.', icon: '🎯', color: 'bg-green-600' },
]
 
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(s => (
      <span key={s} className={`text-sm ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
    <span className="text-slate-400 text-xs ml-1 font-bold">{rating}/5</span>
  </div>
)
 
const FaangMaang = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState({})
  const [hovered, setHovered] = useState(null)
 
  const getTab = (id) => activeTab[id] || 'about'
  const setTab = (id, tab) => setActiveTab(p => ({ ...p, [id]: tab }))
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img  onClick={() => navigate("/")}
                src={logo}
                alt="logo"
                className="w-32 sm:w-45 cursor-pointer rounded-xl"
              />
          </div>
          <div className="hidden md:flex gap-8 text-sm md:text-[20px] font-medium text-slat-800">
            <a href="#companies" className="hover:text-blue-600 transition-colors">Companies</a>
            <a href="#roadmap" className="hover:text-blue-600 transition-colors">Interview Roadmap</a>
            <a href="#compare" className="hover:text-blue-600 transition-colors">Compare</a>
          </div>
       
        </div>
      </nav>
 
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          {/* MAANG acronym banner */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {maangCompanies.map(c => (
              <div key={c.id} className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold border border-white/20 backdrop-blur-sm"
                style={{ backgroundColor: `${c.color}30` }}>
                {c.logo}
              </div>
            ))}
          </div>
          <span className="inline-block bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            FAANG / MAANG Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            The Ultimate Guide to<br />
            <span className="bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 bg-clip-text text-transparent">MAANG Companies</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Meta · Apple · Amazon · Netflix · Google — the five elite tech companies every engineer dreams of joining. Products, salaries, culture, and your complete interview roadmap.
          </p>
          {/* MAANG spell-out */}
          <div className="inline-flex items-center gap-0 mb-10 text-3xl font-extrabold tracking-widest">
            {[
              { letter: 'M', name: 'Meta', color: '#0866FF' },
              { letter: 'A', name: 'Apple', color: '#888888' },
              { letter: 'A', name: 'Amazon', color: '#FF9900' },
              { letter: 'N', name: 'Netflix', color: '#E50914' },
              { letter: 'G', name: 'Google', color: '#4285F4' },
            ].map((item, i) => (
              <span key={i} className="relative group cursor-default px-2">
                <span style={{ color: item.color }}>{item.letter}</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-normal">
                  {item.name}
                </span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#companies" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg transition-all">
              Explore Companies
            </a>
            <a href="#roadmap" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all">
              Interview Roadmap
            </a>
          </div>
        </div>
      </section>
 
      {/* STATS */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* COMPANY CARDS */}
      <section id="companies" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">The MAANG Five — In Depth</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Everything you need to know about each company — products, pay, and how to get in.</p>
        </div>
 
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {maangCompanies.map(company => (
            <div key={company.id}
              onMouseEnter={() => setHovered(company.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
                hovered === company.id ? 'shadow-2xl -translate-y-1' : 'shadow-md'
              }`}
            >
              {/* Header */}
              <div className="p-7 pb-4" style={{ borderTop: `5px solid ${company.color}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${company.color}18` }}>
                      {company.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-2xl font-extrabold text-slate-900">{company.name}</h3>
                        <span className="text-2xl font-extrabold" style={{ color: company.color }}>({company.acronym})</span>
                      </div>
                      <p className="text-xs text-slate-400">{company.fullName}</p>
                      <p className="text-xs italic text-slate-400 mt-0.5">"{company.tagline}"</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`${company.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}>
                      {company.badge}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${company.diffColor}`}>
                      {company.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <StarRating rating={company.rating} />
                  <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                    💰 {company.marketCap}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
                    👥 {company.employees}
                  </span>
                </div>
              </div>
 
              {/* Tabs */}
              <div className="px-7 flex gap-1 border-b border-slate-100">
                {['about', 'products', 'careers'].map(tab => (
                  <button key={tab} onClick={() => setTab(company.id, tab)}
                    className={`px-4 py-2.5 text-xs font-bold capitalize rounded-t-lg transition-all ${
                      getTab(company.id) === tab ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    style={getTab(company.id) === tab ? { backgroundColor: company.color } : {}}>
                    {tab}
                  </button>
                ))}
              </div>
 
              {/* Tab Content */}
              <div className="p-7 pt-5 flex-1">
 
                {getTab(company.id) === 'about' && (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{company.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'CEO', value: company.ceo },
                        { label: 'Founded', value: company.founded },
                        { label: 'Headquarters', value: company.hq },
                        { label: 'Revenue', value: company.revenue },
                      ].map(item => (
                        <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                          <p className="text-sm text-slate-800 font-bold leading-snug">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Highlights</p>
                      <ul className="space-y-1.5">
                        {company.highlights.map(h => (
                          <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Global Offices</p>
                      <div className="flex flex-wrap gap-2">
                        {company.offices.map(o => (
                          <span key={o} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{o}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {getTab(company.id) === 'products' && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Products & Platforms</p>
                      <div className="grid grid-cols-2 gap-2">
                        {company.products.map(p => (
                          <div key={p} className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: `${company.color}12`, color: company.darkColor }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: company.color }} />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {company.techStack.map(t => (
                          <span key={t} className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                            style={{ borderColor: `${company.color}50`, color: company.darkColor, backgroundColor: `${company.color}10` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {getTab(company.id) === 'careers' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-green-700">💰 India Salary</span>
                        <span className="text-sm font-extrabold" style={{ color: company.color }}>{company.avgSalaryIndia}</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-blue-700">🇺🇸 USA Salary</span>
                        <span className="text-sm font-extrabold text-blue-800">{company.avgSalaryUSA}</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500">🔄 Interview Rounds</span>
                        <span className="text-sm font-bold text-slate-800">{company.interviewRounds} Rounds</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-700 mb-1">💡 Interview Focus</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.interviewFocus}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Top Perks</p>
                      <div className="flex flex-wrap gap-2">
                        {company.perks.map(p => (
                          <span key={p} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Open Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {company.openRoles.map(r => (
                          <span key={r} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                            style={{ backgroundColor: `${company.color}15`, color: company.darkColor }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a href={company.careerUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: company.color }}>
                      Apply at {company.name} →
                    </a>
                  </div>
                )}
 
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* INTERVIEW ROADMAP */}
      <section id="roadmap" className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">🗺️ MAANG Interview Roadmap</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">A step-by-step preparation plan to crack any MAANG company interview.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {interviewRoadmap.map(step => (
              <div key={step.step} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-9 h-9 rounded-xl ${step.color} text-white flex items-center justify-center font-extrabold text-sm`}>
                    {step.step}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h4 className="text-slate-800 font-extrabold text-lg mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 font-semibold mb-3">⏱ {step.duration}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* COMPARISON TABLE */}
      <section id="compare" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">MAANG Side-by-Side</h2>
          <p className="text-slate-500 text-lg">Quick comparison of all five companies.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                {['Company', 'Market Cap', 'Revenue', 'USA Salary', 'Rounds', 'Difficulty', 'Rating'].map((h, i) => (
                  <th key={h} className={`text-left px-5 py-4 font-bold ${i === 0 ? 'rounded-tl-2xl' : ''} ${i === 6 ? 'rounded-tr-2xl' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maangCompanies.map((c, idx) => (
                <tr key={c.id} className={`border-t border-slate-100 hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-800">{c.logo} {c.name}</div>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-700">{c.marketCap}</td>
                  <td className="px-5 py-4 font-semibold text-green-700">{c.revenue.split(' ')[0]}</td>
                  <td className="px-5 py-4 font-bold" style={{ color: c.color }}>{c.avgSalaryUSA}</td>
                  <td className="px-5 py-4 text-slate-600 font-medium">{c.interviewRounds}</td>
                  <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.diffColor}`}>{c.difficulty}</span></td>
                  <td className="px-5 py-4"><span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {c.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
 
      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white px-8 py-16 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-4 relative z-10">Your MAANG Journey Starts Today</h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10 relative z-10">
            One LeetCode problem a day, consistent system design practice, and strong behavioral stories — that's the formula.
          </p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {maangCompanies.map(c => (
              <a key={c.id} href={c.careerUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/15 transition-all"
                style={{ backgroundColor: `${c.color}35` }}>
                {c.logo} {c.name} Jobs
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-red-500 to-amber-400 flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">MG</span>
            </div>
            <span className="text-white font-bold text-lg">FAANGMAANG Guide</span>
          </div>
          <p className="text-sm mb-5">The definitive resource for cracking Meta, Apple, Amazon, Netflix & Google.</p>
          <div className="flex justify-center gap-6 text-sm text-slate-500 mb-5">
            {maangCompanies.map(c => <span key={c.id}>{c.logo} {c.name}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-5">
                © 2026 aiplacprep@gmail.com  Salary data based on public reports, Levels.fyi & community submissions.
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default FaangMaang