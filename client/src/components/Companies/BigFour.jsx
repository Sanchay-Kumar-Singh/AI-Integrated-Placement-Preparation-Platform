import React, { useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
const bigFourFirms = [
  {
    id: 1,
    name: 'Deloitte',
    logo: '🟢',
    fullName: 'Deloitte Touche Tohmatsu Limited',
    tagline: 'Make an impact that matters.',
    founded: '1845',
    founder: 'William Welch Deloitte',
    headquarters: 'London, UK (Global) / New York, USA',
    employees: '457,000+',
    revenue: '$64.9 Billion (FY2023)',
    countries: '150+',
    color: '#86BC25',
    darkColor: '#4a6a0a',
    badge: 'Largest by Revenue',
    badgeColor: 'bg-green-600',
    rating: 4.2,
    description:
      'Deloitte is the world\'s largest professional services network by revenue and number of employees. It provides audit, consulting, financial advisory, risk advisory, tax, and related services to select clients. Deloitte\'s global presence spans more than 150 countries, making it the most geographically diverse of the Big Four.',
    services: [
      'Audit & Assurance',
      'Consulting',
      'Financial Advisory',
      'Risk Advisory',
      'Tax & Legal',
      'Mergers & Acquisitions',
    ],
    industries: ['Technology', 'Financial Services', 'Government', 'Healthcare', 'Energy', 'Consumer'],
    notableClients: ['Apple', 'Google', 'Toyota', 'Walmart', 'JPMorgan'],
    strengths: 'Unmatched scale, global consulting arm (Deloitte Consulting), and strong technology advisory practice.',
    careerHighlight: 'Known for excellent training programs, Deloitte University, and strong alumni network.',
    url: 'https://www.deloitte.com',
    internshipStipend: '₹60,000 – ₹1,20,000/month',
    avgSalary: '₹7 – ₹18 LPA (India)',
  },
  {
    id: 2,
    name: 'PwC',
    logo: '🔴',
    fullName: 'PricewaterhouseCoopers International Limited',
    tagline: 'Building trust in society and solving important problems.',
    founded: '1998 (merger) / 1849 (origins)',
    founder: 'Samuel Lowell Price & William Cooper',
    headquarters: 'London, UK',
    employees: '364,000+',
    revenue: '$53.1 Billion (FY2023)',
    countries: '157',
    color: '#E0301E',
    darkColor: '#8b1a10',
    badge: 'Most Trusted Brand',
    badgeColor: 'bg-red-600',
    rating: 4.3,
    description:
      'PricewaterhouseCoopers (PwC) is one of the most respected professional services firms globally, formed by the 1998 merger of Price Waterhouse and Coopers & Lybrand. PwC is renowned for its audit quality, trusted advisory services, and a culture rooted in integrity and purpose-driven work.',
    services: [
      'Assurance & Audit',
      'Tax Services',
      'Advisory',
      'Deals & Transactions',
      'ESG & Sustainability',
      'Digital Transformation',
    ],
    industries: ['Banking & Capital Markets', 'Insurance', 'Asset Management', 'Retail', 'Pharma', 'Public Sector'],
    notableClients: ['Goldman Sachs', 'Facebook (Meta)', 'ExxonMobil', 'Disney', 'General Electric'],
    strengths: 'World-class audit reputation, strong ESG advisory, and deep financial services expertise.',
    careerHighlight: 'Offers PwC Academy for continuous learning and a highly structured career ladder up to Partner.',
    url: 'https://www.pwc.com',
    internshipStipend: '₹55,000 – ₹1,10,000/month',
    avgSalary: '₹6.5 – ₹17 LPA (India)',
  },
  {
    id: 3,
    name: 'EY',
    logo: '🟡',
    fullName: 'Ernst & Young Global Limited',
    tagline: 'Building a better working world.',
    founded: '1989 (merger) / 1849 (origins)',
    founder: 'Arthur Young & Alwin Ernst',
    headquarters: 'London, UK',
    employees: '395,000+',
    revenue: '$49.4 Billion (FY2023)',
    countries: '150+',
    color: '#FFE600',
    darkColor: '#b8a500',
    badge: 'Best for Advisory',
    badgeColor: 'bg-yellow-500',
    rating: 4.1,
    description:
      'Ernst & Young (EY) is a global leader in assurance, consulting, strategy, tax, and transactions services. EY\'s unique "Building a better working world" purpose drives its culture of inclusivity and long-term thinking. EY is particularly recognized for its strong advisory and transactions practice.',
    services: [
      'Assurance',
      'Consulting',
      'Strategy & Transactions',
      'Tax',
      'Technology Risk',
      'People Advisory Services',
    ],
    industries: ['Private Equity', 'Real Estate', 'Life Sciences', 'Media & Entertainment', 'Mining', 'Telecommunications'],
    notableClients: ['Amazon', 'Coca-Cola', 'Amazon', 'Shell', 'Nestlé', 'BP'],
    strengths: 'Industry-leading transactions advisory, strong IPO support, and inclusive workplace culture.',
    careerHighlight: 'EY Badges and EY Badges program provide verified digital credentials for skills development.',
    url: 'https://www.ey.com',
    internshipStipend: '₹50,000 – ₹1,00,000/month',
    avgSalary: '₹6 – ₹16 LPA (India)',
  },
  {
    id: 4,
    name: 'KPMG',
    logo: '🔵',
    fullName: 'Klynveld Peat Marwick Goerdeler',
    tagline: 'Inspiring confidence. Empowering change.',
    founded: '1987 (merger) / 1818 (origins)',
    founder: 'Piet Klynveld, William Peat & James Marwick',
    headquarters: 'Amstelveen, Netherlands',
    employees: '273,000+',
    revenue: '$36.4 Billion (FY2023)',
    countries: '143',
    color: '#00338D',
    darkColor: '#00205a',
    badge: 'Top in Audit Quality',
    badgeColor: 'bg-blue-700',
    rating: 4.0,
    description:
      'KPMG International is a multinational professional services network known for its rigorous audit quality and risk management expertise. As the smallest of the Big Four by revenue, KPMG differentiates itself through deep sector specialization, strong government ties, and a reputation for independence and objectivity.',
    services: [
      'Audit',
      'Tax',
      'Advisory',
      'Risk Consulting',
      'Deal Advisory',
      'Management Consulting',
    ],
    industries: ['Infrastructure', 'Government & Public Sector', 'Automotive', 'Construction', 'Education', 'Sports'],
    notableClients: ['HSBC', 'General Motors', 'Volvo', 'Airbus', 'AstraZeneca'],
    strengths: 'Exceptional audit independence, strong risk consulting, and deep public sector relationships.',
    careerHighlight: 'KPMG Clara (smart audit platform) and focus on data & analytics set it apart technologically.',
    url: 'https://www.kpmg.com',
    internshipStipend: '₹45,000 – ₹90,000/month',
    avgSalary: '₹5.5 – ₹15 LPA (India)',
  },
]
 
const globalStats = [
  { label: 'Combined Revenue', value: '$203B+', icon: '💰' },
  { label: 'Total Employees', value: '1.5M+', icon: '👥' },
  { label: 'Countries Served', value: '157+', icon: '🌍' },
  { label: 'Years of Legacy', value: '175+', icon: '🏛️' },
]
 
const careerPaths = [
  { level: 'Intern / Trainee', years: '0 – 1 yr', salary: '₹3–5 LPA', icon: '🎓' },
  { level: 'Analyst / Associate', years: '1 – 3 yrs', salary: '₹5–10 LPA', icon: '📊' },
  { level: 'Senior Associate', years: '3 – 5 yrs', salary: '₹10–18 LPA', icon: '📈' },
  { level: 'Manager', years: '5 – 8 yrs', salary: '₹18–35 LPA', icon: '💼' },
  { level: 'Senior Manager', years: '8 – 12 yrs', salary: '₹35–60 LPA', icon: '🏆' },
  { level: 'Director / Partner', years: '12+ yrs', salary: '₹60 LPA – ₹2 Cr+', icon: '👑' },
]
 
const whyBigFour = [
  {
    icon: '🌐',
    title: 'Global Exposure',
    description: 'Work on international engagements, cross-border projects, and global client portfolios across 150+ countries.',
  },
  {
    icon: '📚',
    title: 'World-Class Training',
    description: 'Access structured learning paths, certifications, mentorship programs, and global learning academies.',
  },
  {
    icon: '🤝',
    title: 'Powerful Network',
    description: 'Build lifelong professional relationships with some of the most influential business leaders worldwide.',
  },
  {
    icon: '🚀',
    title: 'Career Launchpad',
    description: 'Big Four experience on your resume opens doors at Fortune 500 companies, startups, and investment banks.',
  },
]
 
const StarRating = ({ rating, color }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`text-base ${star <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}>
        ★
      </span>
    ))}
    <span className="text-slate-500 text-sm ml-1 font-semibold">{rating}/5</span>
  </div>
)
 
const BigFour = () => {
   const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState({})
  const [hovered, setHovered] = useState(null)
 
  const getTab = (id) => activeTab[id] || 'overview'
  const setTab = (id, tab) => setActiveTab((prev) => ({ ...prev, [id]: tab }))
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
        <img onClick={()=>navigate("/")}
             src={logo}
             alt="logo"
             className="w-32 sm:w-45 cursor-pointer rounded-xl"
           />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm md:text-[20px] font-medium text-slate-800">
            <a href="#firms" className="hover:text-slate-900 transition-colors">The Firms</a>
            <a href="#career" className="hover:text-slate-900 transition-colors">Career Path</a>
            <a href="#why" className="hover:text-slate-900 transition-colors">Why Join</a>
          </div>
   
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Professional Services Giants
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            The World's <span className="text-amber-400">Big Four</span><br />Accounting Firms
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Deloitte, PwC, EY, and KPMG — the four titans of professional services that audit,
            advise, and shape the global economy. Explore their history, services, and career opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#firms" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm">
              Explore the Firms
            </a>
            <a href="#career" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm">
              View Career Path
            </a>
          </div>
          {/* Firm Logos Strip */}
          <div className="flex flex-wrap justify-center gap-6">
            {bigFourFirms.map((firm) => (
              <div
                key={firm.id}
                className="bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <span className="text-xl">{firm.logo}</span>
                <span className="font-bold text-white text-sm">{firm.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── GLOBAL STATS ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {globalStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── FIRM CARDS ── */}
      <section id="firms" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">The Four Firms, In Depth</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Each firm has a unique identity, culture, and areas of specialization. Here's everything you need to know.
          </p>
        </div>
 
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {bigFourFirms.map((firm) => (
            <div
              key={firm.id}
              onMouseEnter={() => setHovered(firm.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col ${
                hovered === firm.id ? 'shadow-2xl -translate-y-1' : 'shadow-md'
              }`}
            >
              {/* Top color bar + header */}
              <div className="p-7 pb-5" style={{ borderTop: `5px solid ${firm.color}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                      style={{ backgroundColor: `${firm.color}20` }}
                    >
                      {firm.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{firm.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{firm.fullName}</p>
                    </div>
                  </div>
                  <span className={`${firm.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}>
                    {firm.badge}
                  </span>
                </div>
                <p className="text-slate-500 italic text-sm mb-3">"{firm.tagline}"</p>
                <StarRating rating={firm.rating} color={firm.color} />
              </div>
 
              {/* Tab Navigation */}
              <div className="px-7 flex gap-1 border-b border-slate-100 mb-0">
                {['overview', 'services', 'careers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTab(firm.id, tab)}
                    className={`px-4 py-2.5 text-xs font-bold capitalize rounded-t-lg transition-all ${
                      getTab(firm.id) === tab
                        ? 'text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    style={
                      getTab(firm.id) === tab
                        ? { backgroundColor: firm.color }
                        : {}
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
 
              {/* Tab Content */}
              <div className="p-7 pt-5 flex-1">
 
                {/* OVERVIEW TAB */}
                {getTab(firm.id) === 'overview' && (
                  <div className="space-y-5">
                    <p className="text-slate-600 text-sm leading-relaxed">{firm.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Founded', value: firm.founded },
                        { label: 'Headquarters', value: firm.headquarters },
                        { label: 'Employees', value: firm.employees },
                        { label: 'Revenue (FY2023)', value: firm.revenue },
                        { label: 'Countries', value: firm.countries },
                        { label: 'Founder(s)', value: firm.founder },
                      ].map((item) => (
                        <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                          <p className="text-sm text-slate-800 font-bold leading-snug">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Strength</p>
                      <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 leading-relaxed">{firm.strengths}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notable Clients</p>
                      <div className="flex flex-wrap gap-2">
                        {firm.notableClients.map((c) => (
                          <span key={c} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* SERVICES TAB */}
                {getTab(firm.id) === 'services' && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Service Lines</p>
                      <div className="grid grid-cols-2 gap-2">
                        {firm.services.map((s) => (
                          <div
                            key={s}
                            className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: `${firm.color}15`, color: firm.darkColor }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: firm.color }} />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Industries Served</p>
                      <div className="flex flex-wrap gap-2">
                        {firm.industries.map((ind) => (
                          <span
                            key={ind}
                            className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                            style={{ borderColor: `${firm.color}60`, color: firm.darkColor, backgroundColor: `${firm.color}10` }}
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* CAREERS TAB */}
                {getTab(firm.id) === 'careers' && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4">{firm.careerHighlight}</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Internship Stipend</span>
                        <span className="text-sm font-extrabold" style={{ color: firm.color }}>{firm.internshipStipend}</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg. Fresher Salary</span>
                        <span className="text-sm font-extrabold" style={{ color: firm.color }}>{firm.avgSalary}</span>
                      </div>
                    </div>
                    <a
                      href={`${firm.url}/careers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: firm.color }}
                    >
                      Apply at {firm.name} →
                    </a>
                  </div>
                )}
 
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── REVENUE COMPARISON ── */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Revenue & Scale Comparison</h2>
            <p className="text-slate-500 text-lg">FY2023 figures — visualizing the scale of each firm.</p>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {bigFourFirms.map((firm) => {
              const maxRevenue = 64.9
              const revenue = parseFloat(firm.revenue.replace(/[^0-9.]/g, ''))
              const pct = Math.round((revenue / maxRevenue) * 100)
              return (
                <div key={firm.id} className="flex items-center gap-4">
                  <div className="w-24 text-right font-bold text-slate-800 text-sm">{firm.name}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center px-4 text-white text-xs font-bold transition-all duration-1000"
                      style={{ width: `${pct}%`, backgroundColor: firm.color }}
                    >
                      {firm.revenue.split(' ')[0]}
                    </div>
                  </div>
                  <div className="w-16 text-xs text-slate-400 font-medium">{pct}%</div>
                </div>
              )
            })}
          </div>
 
          {/* Comparison Table */}
          <div className="mt-16 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-6 py-4 font-bold rounded-tl-2xl">Firm</th>
                  <th className="text-left px-6 py-4 font-bold">Founded</th>
                  <th className="text-left px-6 py-4 font-bold">Employees</th>
                  <th className="text-left px-6 py-4 font-bold">Revenue</th>
                  <th className="text-left px-6 py-4 font-bold">Countries</th>
                  <th className="text-left px-6 py-4 font-bold rounded-tr-2xl">Rating</th>
                </tr>
              </thead>
              <tbody>
                {bigFourFirms.map((firm, idx) => (
                  <tr key={firm.id} className={`border-t border-slate-100 hover:bg-amber-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span>{firm.logo}</span>{firm.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{firm.founded}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{firm.employees}</td>
                    <td className="px-6 py-4 font-bold text-green-700">{firm.revenue.split(' ')[0]}</td>
                    <td className="px-6 py-4 text-slate-600">{firm.countries}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {firm.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
 
      {/* ── CAREER PATH ── */}
      <section id="career" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Career Progression at Big Four</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            A typical career trajectory from intern to partner — with salary benchmarks for India.
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((level, idx) => (
              <div key={level.level} className={`flex ${idx % 2 === 0 ? 'md:justify-end md:pr-10' : 'md:justify-start md:pl-10'}`}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all w-full md:max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">{level.icon}</div>
                    <div>
                      <p className="font-extrabold text-slate-800">{level.level}</p>
                      <p className="text-xs text-slate-400 font-medium">{level.years}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                    <span className="text-xs text-slate-500 font-medium">Avg. Salary</span>
                    <span className="text-sm font-extrabold text-green-700">{level.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── WHY JOIN ── */}
      <section id="why" className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Why Join the Big Four?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Beyond the brand name — here's what working at a Big Four firm truly offers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {whyBigFour.map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                <h4 className="text-slate-800 font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 my-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl text-white px-8 py-16 md:px-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-4 relative z-10">Start Your Big Four Journey Today</h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 relative z-10">
            Whether you're a CA finalist, MBA graduate, or an experienced professional — the Big Four are always hiring top talent.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {bigFourFirms.map((firm) => (
              <a
                key={firm.id}
                href={`${firm.url}/careers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
                style={{ backgroundColor: `${firm.color}30` }}
              >
                {firm.logo} {firm.name} Careers
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">B4</span>
            </div>
            <span className="text-white font-bold text-lg">BigFourGuide</span>
          </div>
          <p className="text-sm mb-6">Your comprehensive reference for Deloitte, PwC, EY & KPMG.</p>
          <div className="flex justify-center gap-8 text-sm text-slate-500 mb-6">
            {bigFourFirms.map((f) => (
              <span key={f.id}>{f.logo} {f.name}</span>
            ))}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-6">
                © 2026 aiplacprep@gmail.com  All rights reserved. Revenue figures sourced from official firm publications (FY2023).
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default BigFour