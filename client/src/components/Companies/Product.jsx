import React, { useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
const companies = [
  {
    id: 1,
    name: 'Google',
    logo: '🔵',
    parent: 'Alphabet Inc.',
    tagline: 'Organize the world\'s information.',
    hq: 'Mountain View, CA, USA',
    founded: '1998',
    employees: '182,000+',
    revenue: '$307 Billion (2023)',
    color: '#4285F4',
    darkColor: '#1a56c4',
    badge: 'Dream Company',
    badgeColor: 'bg-blue-600',
    rating: 4.8,
    products: ['Google Search', 'Android', 'Chrome', 'YouTube', 'Google Cloud', 'Gmail', 'Google Maps', 'Pixel'],
    techStack: ['Python', 'Go', 'C++', 'Java', 'TensorFlow', 'Kubernetes'],
    avgSalary: '₹20 – ₹80 LPA (India) / $180K – $500K (USA)',
    interviewTip: 'Heavy DSA + System Design. Practice LeetCode Hard. Expect 5–6 rounds.',
    openRoles: ['SWE', 'ML Engineer', 'Product Manager', 'UX Designer', 'Data Scientist'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: '🪟',
    parent: 'Microsoft Corporation',
    tagline: 'Empower every person on the planet.',
    hq: 'Redmond, WA, USA',
    founded: '1975',
    employees: '221,000+',
    revenue: '$211 Billion (FY2024)',
    color: '#00A4EF',
    darkColor: '#006fa3',
    badge: 'Top Employer',
    badgeColor: 'bg-sky-600',
    rating: 4.7,
    products: ['Windows', 'Azure', 'Office 365', 'Xbox', 'LinkedIn', 'GitHub', 'Copilot', 'Teams'],
    techStack: ['C#', '.NET', 'TypeScript', 'Azure', 'Python', 'Rust'],
    avgSalary: '₹18 – ₹70 LPA (India) / $160K – $450K (USA)',
    interviewTip: 'Focus on Behavioral (STAR method) + DSA. Azure knowledge is a plus. 4–5 rounds.',
    openRoles: ['SWE', 'Cloud Architect', 'DevOps', 'Program Manager', 'Security Engineer'],
    difficulty: 'Hard',
    diffColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 3,
    name: 'Amazon',
    logo: '📦',
    parent: 'Amazon.com Inc.',
    tagline: 'Work hard. Have fun. Make history.',
    hq: 'Seattle, WA, USA',
    founded: '1994',
    employees: '1,500,000+',
    revenue: '$574 Billion (2023)',
    color: '#FF9900',
    darkColor: '#cc7a00',
    badge: 'Largest Employer',
    badgeColor: 'bg-amber-500',
    rating: 4.3,
    products: ['AWS', 'Amazon Prime', 'Alexa', 'Kindle', 'Ring', 'Twitch', 'Amazon Go', 'Zoox'],
    techStack: ['Java', 'Python', 'AWS', 'Scala', 'React', 'DynamoDB'],
    avgSalary: '₹15 – ₹65 LPA (India) / $150K – $400K (USA)',
    interviewTip: '14 Leadership Principles are CRITICAL. Every answer must tie back to them. DSA + LP = success.',
    openRoles: ['SDE I/II', 'Solutions Architect', 'Data Engineer', 'TPM', 'Product Manager'],
    difficulty: 'Hard',
    diffColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 4,
    name: 'Apple',
    logo: '🍎',
    parent: 'Apple Inc.',
    tagline: 'Think different.',
    hq: 'Cupertino, CA, USA',
    founded: '1976',
    employees: '164,000+',
    revenue: '$383 Billion (FY2023)',
    color: '#555555',
    darkColor: '#222222',
    badge: 'Most Valuable Brand',
    badgeColor: 'bg-gray-700',
    rating: 4.6,
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'iOS', 'macOS', 'Apple Silicon'],
    techStack: ['Swift', 'Objective-C', 'C++', 'Metal', 'Python', 'LLVM'],
    avgSalary: '₹22 – ₹90 LPA (India) / $200K – $600K (USA)',
    interviewTip: 'Highly selective. Strong on culture fit + deep technical expertise. Expect 6–8 rounds.',
    openRoles: ['iOS Engineer', 'Hardware Engineer', 'ML Researcher', 'UX Designer', 'Silicon Engineer'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
  },
  {
    id: 5,
    name: 'Meta',
    logo: '♾️',
    parent: 'Meta Platforms Inc.',
    tagline: 'Move fast and build things.',
    hq: 'Menlo Park, CA, USA',
    founded: '2004',
    employees: '67,000+',
    revenue: '$134 Billion (2023)',
    color: '#0866FF',
    darkColor: '#044cc4',
    badge: 'Social Media Giant',
    badgeColor: 'bg-blue-700',
    rating: 4.4,
    products: ['Facebook', 'Instagram', 'WhatsApp', 'Oculus VR', 'Threads', 'Llama AI', 'Messenger', 'Meta AI'],
    techStack: ['React', 'PHP/Hack', 'Python', 'PyTorch', 'C++', 'GraphQL'],
    avgSalary: '₹25 – ₹1 Cr+ LPA (India) / $200K – $700K (USA)',
    interviewTip: 'Strong DSA + Product Sense. System design for senior roles. "Move fast" culture fit matters.',
    openRoles: ['SWE', 'AI Researcher', 'AR/VR Engineer', 'Data Scientist', 'Growth PM'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
  },
  {
    id: 6,
    name: 'Flipkart',
    logo: '🛒',
    parent: 'Flipkart (Walmart subsidiary)',
    tagline: 'India ki apni dukaan.',
    hq: 'Bangalore, India',
    founded: '2007',
    employees: '50,000+',
    revenue: '₹57,000 Crore (FY2024)',
    color: '#F7941E',
    darkColor: '#c4720e',
    badge: 'India E-comm Leader',
    badgeColor: 'bg-orange-500',
    rating: 4.2,
    products: ['Flipkart App', 'Flipkart Wholesale', 'Myntra', 'PhonePe (ex)', 'Shopsy', 'Ekart Logistics', 'Flipkart Health+', 'SuperCoins'],
    techStack: ['Java', 'Scala', 'Kotlin', 'React', 'Kafka', 'Spark'],
    avgSalary: '₹12 – ₹55 LPA (India)',
    interviewTip: 'Strong DSA + Large-scale system design. India-first product thinking. 4–5 rounds.',
    openRoles: ['SDE I/II/III', 'Data Scientist', 'Product Manager', 'ML Engineer', 'Backend Engineer'],
    difficulty: 'Medium-Hard',
    diffColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 7,
    name: 'Adobe',
    logo: '🎨',
    parent: 'Adobe Inc.',
    tagline: 'Creativity for all.',
    hq: 'San Jose, CA, USA',
    founded: '1982',
    employees: '29,000+',
    revenue: '$19.4 Billion (FY2023)',
    color: '#FF0000',
    darkColor: '#cc0000',
    badge: 'Creative Tech Leader',
    badgeColor: 'bg-red-600',
    rating: 4.5,
    products: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Acrobat', 'Figma (acquired)', 'Adobe Firefly', 'Creative Cloud', 'Experience Cloud'],
    techStack: ['C++', 'JavaScript', 'Python', 'WebAssembly', 'Swift', 'React'],
    avgSalary: '₹15 – ₹60 LPA (India) / $150K – $420K (USA)',
    interviewTip: 'Strong in algorithms + UI/UX thinking. Adobe India (Noida) does heavy DSA + problem solving.',
    openRoles: ['SWE', 'UX Engineer', 'ML Engineer', 'Product Designer', 'Full Stack Developer'],
    difficulty: 'Hard',
    diffColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 8,
    name: 'Netflix',
    logo: '🎬',
    parent: 'Netflix Inc.',
    tagline: 'Entertainment like never before.',
    hq: 'Los Gatos, CA, USA',
    founded: '1997',
    employees: '13,000+',
    revenue: '$33.7 Billion (2023)',
    color: '#E50914',
    darkColor: '#b5070f',
    badge: 'Top Pay Master',
    badgeColor: 'bg-red-600',
    rating: 4.6,
    products: ['Netflix Streaming', 'Netflix Originals', 'Netflix Games', 'Fast.com', 'Netflix Kids', 'Downloads Feature'],
    techStack: ['Java', 'Python', 'Node.js', 'Cassandra', 'Kafka', 'Chaos Engineering'],
    avgSalary: '$250K – $900K (USA) / Very selective in India',
    interviewTip: 'Netflix pays top-of-market. Expect deep system design + culture fit ("Freedom & Responsibility").',
    openRoles: ['Senior SWE', 'ML Platform Engineer', 'Data Engineer', 'Product Manager', 'Reliability Engineer'],
    difficulty: 'Very Hard',
    diffColor: 'bg-red-100 text-red-700',
  },
]
 
const stats = [
  { label: 'Combined Market Cap', value: '$10T+', icon: '💎' },
  { label: 'Total Employees', value: '2.3M+', icon: '👥' },
  { label: 'Products Built', value: '100+', icon: '📦' },
  { label: 'Countries Operated', value: '190+', icon: '🌍' },
]
 
const tips = [
  { icon: '🧠', title: 'Master DSA First', desc: 'LeetCode 150–300 problems is the minimum for FAANG. Focus on Arrays, Trees, Graphs, and DP.' },
  { icon: '🏗️', title: 'Learn System Design', desc: 'Design scalable systems like URL shorteners, Twitter feeds. Essential for SDE2+ at product companies.' },
  { icon: '🗣️', title: 'Crack the Behavioral Round', desc: 'Prepare STAR format stories. Amazon\'s 14 Leadership Principles and Google\'s Googleyness matter a lot.' },
  { icon: '🎯', title: 'Build Real Projects', desc: 'Side projects using the company\'s tech stack (AWS, React, PyTorch) show genuine interest and skill.' },
]
 
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(s => (
      <span key={s} className={`text-sm ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
    <span className="text-slate-500 text-xs ml-1 font-bold">{rating}/5</span>
  </div>
)
 
const Product = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState({})
  const [hovered, setHovered] = useState(null)
  const [filter, setFilter] = useState('All')
 
  const getTab = (id) => activeTab[id] || 'about'
  const setTab = (id, tab) => setActiveTab(p => ({ ...p, [id]: tab }))
 
  const difficulties = ['All', 'Very Hard', 'Hard', 'Medium-Hard']
  const filtered = filter === 'All' ? companies : companies.filter(c => c.difficulty === filter)
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img onClick={()=>navigate("/")}
                src={logo}
                alt="logo"
                className="w-42 sm:w-45 cursor-pointer rounded-xl"
              />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-[20px] text-slate-800">
            <a href="#companies" className="hover:text-indigo-600 transition-colors">Companies</a>
            <a href="#compare" className="hover:text-indigo-600 transition-colors">Compare</a>
            <a href="#tips" className="hover:text-indigo-600 transition-colors">Interview Tips</a>
          </div>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <span className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Product-Based Companies
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Land a Job at the<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">World's Best Tech Giants</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Google, Microsoft, Amazon, Apple, Meta & more — explore products, salaries, tech stacks, and interview tips for top product-based companies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#companies" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg transition-all">Explore Companies</a>
            <a href="#tips" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all">Interview Tips</a>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {companies.map(c => (
              <div key={c.id} className="bg-white/8 border border-white/15 px-4 py-2 rounded-xl flex items-center gap-2">
                <span>{c.logo}</span>
                <span className="text-sm font-semibold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* STATS */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-indigo-700 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* COMPANY CARDS */}
      <section id="companies" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Top Product-Based Companies</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Deep profiles — products, tech stack, salaries, and how to get hired.</p>
        </div>
 
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {difficulties.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                filter === d ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}>
              {d}
            </button>
          ))}
        </div>
 
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filtered.map(company => (
            <div key={company.id}
              onMouseEnter={() => setHovered(company.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
                hovered === company.id ? 'shadow-2xl -translate-y-1 border-indigo-200' : 'shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4" style={{ borderTop: `5px solid ${company.color}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${company.color}18` }}>
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">{company.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{company.parent}</p>
                      <p className="text-xs italic text-slate-400 mt-0.5">"{company.tagline}"</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`${company.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{company.badge}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${company.diffColor}`}>{company.difficulty}</span>
                  </div>
                </div>
                <StarRating rating={company.rating} />
              </div>
 
              {/* Tabs */}
              <div className="px-6 flex gap-1 border-b border-slate-100">
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
              <div className="p-6 pt-5 flex-1">
 
                {getTab(company.id) === 'about' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Founded', value: company.founded },
                        { label: 'Headquarters', value: company.hq },
                        { label: 'Employees', value: company.employees },
                        { label: 'Revenue', value: company.revenue },
                      ].map(item => (
                        <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                          <p className="text-sm text-slate-800 font-bold leading-snug">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</p>
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
 
                {getTab(company.id) === 'products' && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Products & Platforms</p>
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
                )}
 
                {getTab(company.id) === 'careers' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-green-700 mb-1">💰 Average Salary</p>
                      <p className="text-sm font-bold text-slate-800">{company.avgSalary}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-700 mb-1">💡 Interview Tip</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{company.interviewTip}</p>
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
                    <a href={`https://www.${company.name.toLowerCase()}.com/careers`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: company.color }}>
                      View Jobs at {company.name} →
                    </a>
                  </div>
                )}
 
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* COMPARISON TABLE */}
      <section id="compare" className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Quick Comparison</h2>
            <p className="text-slate-500">All 8 companies at a glance.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  {['Company', 'Employees', 'Revenue', 'Avg Salary (India)', 'Difficulty', 'Rating'].map((h, i) => (
                    <th key={h} className={`text-left px-5 py-4 font-bold ${i === 0 ? 'rounded-tl-2xl' : ''} ${i === 5 ? 'rounded-tr-2xl' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((c, idx) => (
                  <tr key={c.id} className={`border-t border-slate-100 hover:bg-indigo-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">{c.logo} {c.name}</td>
                    <td className="px-5 py-4 text-slate-500">{c.employees}</td>
                    <td className="px-5 py-4 font-semibold text-green-700">{c.revenue.split(' ')[0]}</td>
                    <td className="px-5 py-4 font-bold" style={{ color: c.color }}>{c.avgSalary.split('/')[0].trim()}</td>
                    <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.diffColor}`}>{c.difficulty}</span></td>
                    <td className="px-5 py-4"><span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {c.rating}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
 
      {/* INTERVIEW TIPS */}
      <section id="tips" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">How to Get Into a Product Company</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">The playbook every aspiring product engineer needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tips.map(tip => (
            <div key={tip.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl mb-4">{tip.icon}</div>
              <h4 className="text-slate-800 font-bold text-lg mb-2">{tip.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl text-white px-8 py-14 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-4 relative z-10">Ready to Crack Your Dream Company?</h2>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8 relative z-10">Start with DSA, build projects, and apply consistently. Your FAANG offer is one prep cycle away.</p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {companies.map(c => (
              <a key={c.id} href={`https://www.${c.name.toLowerCase()}.com/careers`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/15 transition-all"
                style={{ backgroundColor: `${c.color}40` }}>
                {c.logo} {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-bold text-lg">ProductHunt</span>
          </div>
          <p className="text-sm mb-5">Your guide to the world's top product-based tech companies.</p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500 mb-5">
            {companies.map(c => <span key={c.id}>{c.logo} {c.name}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-5">
               © 2026 aiplacprep@gmail.com  Salary data is indicative based on public reports and community data.
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default Product