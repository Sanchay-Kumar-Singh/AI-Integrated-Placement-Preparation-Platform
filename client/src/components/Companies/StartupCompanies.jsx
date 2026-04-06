import React, { useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
const startups = [
  {
    id: 1,
    name: 'OpenAI',
    logo: '🤖',
    sector: 'Artificial Intelligence',
    tagline: 'Ensuring AI benefits all of humanity.',
    founded: '2015',
    founders: 'Sam Altman, Elon Musk, Greg Brockman',
    headquarters: 'San Francisco, CA, USA',
    valuation: '$157 Billion',
    funding: '$11.3 Billion+',
    employees: '3,000+',
    stage: 'Late Stage',
    color: '#10a37f',
    darkColor: '#0a6b52',
    badge: 'Most Valuable AI',
    badgeColor: 'bg-emerald-600',
    rating: 4.8,
    description:
      'OpenAI is the world\'s most influential AI research laboratory and product company. Creator of ChatGPT, GPT-4, DALL·E, and Codex, OpenAI has fundamentally transformed how people interact with technology. With Microsoft as a key backer, OpenAI sits at the epicenter of the AI revolution.',
    products: ['ChatGPT', 'GPT-4o', 'DALL·E 3', 'Sora', 'Codex', 'Whisper'],
    technologies: ['Large Language Models', 'Reinforcement Learning', 'Computer Vision', 'Multimodal AI'],
    investors: ['Microsoft', 'Sequoia Capital', 'Andreessen Horowitz', 'Khosla Ventures'],
    revenue: '$3.4 Billion ARR (2024)',
    workCulture: 'Mission-driven, research-first culture with top-tier AI talent. High expectations, high impact.',
    avgSalary: '$150,000 – $600,000/yr (USA)',
    indianOffice: 'No India office currently',
    url: 'https://openai.com',
    highlights: ['Creator of ChatGPT with 200M+ weekly users', 'Partnership with Microsoft worth $13B', 'Pioneered AGI safety research'],
  },
  {
    id: 2,
    name: 'Stripe',
    logo: '💳',
    sector: 'FinTech / Payments',
    tagline: 'Increase the GDP of the internet.',
    founded: '2010',
    founders: 'Patrick Collison, John Collison',
    headquarters: 'San Francisco, CA, USA',
    valuation: '$65 Billion',
    funding: '$9.4 Billion',
    employees: '8,000+',
    stage: 'Pre-IPO',
    color: '#635BFF',
    darkColor: '#3d36b8',
    badge: 'Payments Leader',
    badgeColor: 'bg-violet-600',
    rating: 4.7,
    description:
      'Stripe is the global financial infrastructure platform powering the internet economy. Millions of businesses — from startups to Fortune 500 companies — use Stripe to accept payments, send payouts, and manage their finances online. Its developer-first philosophy made it the backbone of modern e-commerce.',
    products: ['Stripe Payments', 'Stripe Connect', 'Stripe Billing', 'Stripe Radar', 'Stripe Atlas', 'Stripe Treasury'],
    technologies: ['Payment APIs', 'Machine Learning Fraud Detection', 'Financial Infrastructure', 'Embedded Finance'],
    investors: ['Sequoia', 'Andreessen Horowitz', 'General Catalyst', 'Founders Fund', 'Tiger Global'],
    revenue: '$14 Billion (2023)',
    workCulture: 'Intellectually rigorous, writing-centric culture. Engineers own products end-to-end.',
    avgSalary: '$180,000 – $450,000/yr (USA)',
    indianOffice: 'Bangalore, India (Engineering & Support)',
    url: 'https://stripe.com',
    highlights: ['Processes $1 Trillion+ in payments annually', 'Powers Amazon, Google, Shopify & more', 'Valued at $65B after 2023 funding round'],
  },
  {
    id: 3,
    name: 'Zepto',
    logo: '⚡',
    sector: 'Quick Commerce',
    tagline: 'Groceries in 10 minutes.',
    founded: '2021',
    founders: 'Aadit Palicha, Kaivalya Vohra',
    headquarters: 'Mumbai, India',
    valuation: '$5 Billion',
    funding: '$1.8 Billion+',
    employees: '10,000+',
    stage: 'Growth Stage',
    color: '#FF6B00',
    darkColor: '#b34a00',
    badge: 'India Unicorn 🦄',
    badgeColor: 'bg-orange-500',
    rating: 4.3,
    description:
      'Zepto is India\'s fastest-growing quick commerce startup, delivering groceries and essentials in under 10 minutes via a network of "dark stores." Founded by two Stanford dropouts at age 19, Zepto became a unicorn in record time and is now one of India\'s most disruptive consumer tech companies.',
    products: ['Zepto App', 'Zepto Cafe', 'Dark Store Network', 'Zepto Pass', 'Instant Delivery Infrastructure'],
    technologies: ['Dark Store Ops', 'Hyperlocal Logistics', 'Demand Forecasting AI', 'Route Optimization'],
    investors: ['Y Combinator', 'Nexus Venture Partners', 'Glade Brook', 'StepStone Group', 'Motilal Oswal'],
    revenue: '₹4,454 Crore (FY2024)',
    workCulture: 'Fast-paced, execution-driven startup environment. Hustle culture with high ownership.',
    avgSalary: '₹8 – ₹40 LPA (India)',
    indianOffice: 'Mumbai, Bangalore, Delhi, Hyderabad, Chennai',
    url: 'https://www.zeptonow.com',
    highlights: ['Youngest founders to build a unicorn in India', '10-minute delivery across 10+ cities', 'Competing with Blinkit & Swiggy Instamart'],
  },
  {
    id: 4,
    name: 'Figma',
    logo: '🎨',
    sector: 'Design / SaaS',
    tagline: 'Nothing great is made alone.',
    founded: '2012',
    founders: 'Dylan Field, Evan Wallace',
    headquarters: 'San Francisco, CA, USA',
    valuation: '$20 Billion',
    funding: '$750 Million',
    employees: '3,200+',
    stage: 'Post-IPO (2024)',
    color: '#F24E1E',
    darkColor: '#a33512',
    badge: 'Design Standard',
    badgeColor: 'bg-red-500',
    rating: 4.9,
    description:
      'Figma revolutionized the design industry by bringing collaborative, browser-based design tools to the world. From wireframes to production-ready interfaces, Figma is the standard for product design teams globally. Adobe\'s attempted $20B acquisition was blocked by regulators, affirming Figma\'s independent dominance.',
    products: ['Figma Design', 'FigJam', 'Figma Slides', 'Figma AI', 'Dev Mode', 'Figma Community'],
    technologies: ['WebGL', 'Real-time Collaboration (CRDT)', 'Vector Graphics Engine', 'AI Design Tools'],
    investors: ['Index Ventures', 'Greylock Partners', 'Sequoia', 'KPCB', 'a16z'],
    revenue: '$700 Million ARR (2024)',
    workCulture: 'Design-obsessed, highly collaborative. Strong emphasis on craft, polish, and user empathy.',
    avgSalary: '$160,000 – $400,000/yr (USA)',
    indianOffice: 'No India office (Remote-friendly)',
    url: 'https://figma.com',
    highlights: ['4M+ monthly active users worldwide', 'Adobe\'s $20B acquisition blocked by EU', 'Used by 90% of Fortune 500 design teams'],
  },
  {
    id: 5,
    name: 'Razorpay',
    logo: '💰',
    sector: 'FinTech',
    tagline: 'Power your finance, move fast.',
    founded: '2014',
    founders: 'Harshil Mathur, Shashank Kumar',
    headquarters: 'Bangalore, India',
    valuation: '$7.5 Billion',
    funding: '$741 Million',
    employees: '3,500+',
    stage: 'Unicorn',
    color: '#2D9CDB',
    darkColor: '#1a6b9a',
    badge: 'India FinTech King',
    badgeColor: 'bg-blue-500',
    rating: 4.5,
    description:
      'Razorpay is India\'s leading full-stack financial solutions company, enabling businesses to accept, process, and disburse payments. From a simple payment gateway, Razorpay has evolved into a complete business banking suite, serving over 8 million businesses across India with neo-banking and payroll solutions.',
    products: ['Razorpay Payment Gateway', 'RazorpayX (Neo Banking)', 'Payroll', 'Capital', 'Route', 'Smart Collect'],
    technologies: ['Payment APIs', 'UPI Infrastructure', 'Lending Tech', 'Banking APIs', 'Fraud Detection ML'],
    investors: ['Tiger Global', 'Sequoia India', 'Matrix Partners', 'GIC', 'Lone Pine Capital'],
    revenue: '₹2,501 Crore (FY2023)',
    workCulture: 'Entrepreneurial, ownership-driven. Strong technical culture with flat hierarchy.',
    avgSalary: '₹8 – ₹45 LPA (India)',
    indianOffice: 'Bangalore HQ, Mumbai, Delhi, Chennai',
    url: 'https://razorpay.com',
    highlights: ['Serves 8M+ businesses in India', 'Processes ₹10 Lakh Crore+ annually', 'Launched RazorpayX Neo Banking for businesses'],
  },
  {
    id: 6,
    name: 'Canva',
    logo: '🖌️',
    sector: 'Design / SaaS',
    tagline: 'Design anything. Publish anywhere.',
    founded: '2013',
    founders: 'Melanie Perkins, Cliff Obrecht, Cameron Adams',
    headquarters: 'Sydney, Australia',
    valuation: '$26 Billion',
    funding: '$572 Million',
    employees: '4,000+',
    stage: 'Late Stage',
    color: '#7D2AE8',
    darkColor: '#5b1aaa',
    badge: 'Fastest Growing SaaS',
    badgeColor: 'bg-purple-600',
    rating: 4.7,
    description:
      'Canva democratized design for non-designers with its drag-and-drop interface. What started as a simple online design tool has grown into a $26 billion SaaS giant used by over 170 million people globally. With AI features, enterprise offerings, and education programs, Canva is redefining visual communication.',
    products: ['Canva Free', 'Canva Pro', 'Canva Teams', 'Canva Enterprise', 'Magic Studio (AI)', 'Canva for Education'],
    technologies: ['AI Image Generation', 'ML Background Removal', 'Real-time Collaboration', 'CDN-based Rendering'],
    investors: ['Blackbird Ventures', 'Sequoia Capital', 'Bond Capital', 'T. Rowe Price', 'Franklin Templeton'],
    revenue: '$2.3 Billion ARR (2024)',
    workCulture: 'Mission-driven, values-first culture. Strong focus on mental health, inclusion, and creativity.',
    avgSalary: '$130,000 – $350,000/yr (Australia/USA)',
    indianOffice: 'Bangalore, India (Engineering Hub)',
    url: 'https://canva.com',
    highlights: ['170M+ monthly active users in 190 countries', 'Acquired Affinity Suite for $380M', 'AI-powered Magic Studio suite launched 2023'],
  },
  {
    id: 7,
    name: 'CRED',
    logo: '🏅',
    sector: 'FinTech / Rewards',
    tagline: 'Good things for good people.',
    founded: '2018',
    founders: 'Kunal Shah',
    headquarters: 'Bangalore, India',
    valuation: '$6.4 Billion',
    funding: '$1 Billion+',
    employees: '2,000+',
    stage: 'Unicorn',
    color: '#1A1A2E',
    darkColor: '#0d0d1a',
    badge: 'Premium Fintech',
    badgeColor: 'bg-slate-700',
    rating: 4.4,
    description:
      'CRED is India\'s most premium fintech platform, rewarding creditworthy individuals for paying their credit card bills. Under founder Kunal Shah\'s vision, CRED has evolved from a bill payment app to a financial super-app offering P2P lending, CRED Cash, home rentals, and exclusive e-commerce experiences.',
    products: ['CRED Pay', 'CRED Cash', 'CRED Mint', 'CRED Store', 'CRED Travel', 'CRED Garage'],
    technologies: ['Credit Scoring Models', 'Behavioural Analytics', 'UPI Stack', 'BNPL Infrastructure'],
    investors: ['Tiger Global', 'Sequoia India', 'Ribbit Capital', 'DST Global', 'GIC'],
    revenue: '₹1,484 Crore (FY2023)',
    workCulture: 'Extremely design-conscious, elite hiring bar. Famous for its creative branding and IPL ads.',
    avgSalary: '₹15 – ₹60 LPA (India)',
    indianOffice: 'Bangalore HQ',
    url: 'https://cred.club',
    highlights: ['10M+ creditworthy users (700+ credit score)', 'Iconic IPL advertising campaigns', 'Processes ₹50,000 Crore+ in credit card bills'],
  },
  {
    id: 8,
    name: 'Notion',
    logo: '📓',
    sector: 'Productivity / SaaS',
    tagline: 'Write, plan, share. With AI.',
    founded: '2013',
    founders: 'Ivan Zhao, Simon Last',
    headquarters: 'San Francisco, CA, USA',
    valuation: '$10 Billion',
    funding: '$343 Million',
    employees: '800+',
    stage: 'Late Stage',
    color: '#000000',
    darkColor: '#333333',
    badge: 'Productivity Icon',
    badgeColor: 'bg-gray-800',
    rating: 4.8,
    description:
      'Notion is the all-in-one workspace that combines notes, docs, wikis, databases, and project management in a single flexible tool. Beloved by startups, enterprises, and individuals alike, Notion has become the gold standard for knowledge management. Its $10B valuation on $343M funding reflects extraordinary capital efficiency.',
    products: ['Notion Docs', 'Notion Databases', 'Notion AI', 'Notion Calendar', 'Notion Sites', 'Notion API'],
    technologies: ['Block-based Editor', 'Relational Databases', 'AI Writing Assistant', 'Real-time Sync'],
    investors: ['Sequoia Capital', 'Index Ventures', 'Coatue', 'IVP', 'a16z'],
    revenue: '$400 Million ARR (2024)',
    workCulture: 'Small, highly talented team. Engineers and designers have immense autonomy. Remote-first.',
    avgSalary: '$170,000 – $420,000/yr (USA)',
    indianOffice: 'No India office (Remote globally)',
    url: 'https://notion.so',
    highlights: ['100M+ users with just 800 employees', 'Most capital-efficient $10B company', 'Notion AI hit 4M users in 3 months'],
  },
  {
    id: 9,
    name: 'PhonePe',
    logo: '📱',
    sector: 'FinTech / UPI',
    tagline: 'Karo payments. Karo Investments. Karo Insurance.',
    founded: '2015',
    founders: 'Sameer Nigam, Rahul Chari, Burzin Engineer',
    headquarters: 'Bangalore, India',
    valuation: '$12 Billion',
    funding: '$1 Billion+',
    employees: '5,000+',
    stage: 'Pre-IPO',
    color: '#5F259F',
    darkColor: '#3d1866',
    badge: 'UPI #1 App',
    badgeColor: 'bg-purple-700',
    rating: 4.5,
    description:
      'PhonePe is India\'s leading digital payments platform with over 500 million registered users. Built on the UPI infrastructure, PhonePe processes over 40% of all UPI transactions in India. Beyond payments, PhonePe now offers mutual funds, insurance, stock trading, and merchant solutions, positioning itself as India\'s financial super-app.',
    products: ['PhonePe UPI', 'PhonePe Business', 'Share.Market (Stocks)', 'PhonePe Insurance', 'Pincode (Hyperlocal)', 'Indus Appstore'],
    technologies: ['UPI Infrastructure', 'Real-time Payments', 'Fraud Detection AI', 'WealthTech APIs'],
    investors: ['Walmart (Flipkart)', 'General Atlantic', 'Tiger Global', 'TVS Capital', 'Ribbit Capital'],
    revenue: '₹5,064 Crore (FY2024)',
    workCulture: 'High ownership culture, data-driven decision making, fast-moving product cycles.',
    avgSalary: '₹10 – ₹50 LPA (India)',
    indianOffice: 'Bangalore HQ, Mumbai, Delhi, Pune',
    url: 'https://www.phonepe.com',
    highlights: ['500M+ registered users', 'Processes 40%+ of all India UPI transactions', 'Demerged from Flipkart at $12B valuation'],
  },
]
 
const globalStats = [
  { label: 'Combined Valuation', value: '$370B+', icon: '💎' },
  { label: 'Total Funding Raised', value: '$28B+', icon: '💰' },
  { label: 'Jobs Created', value: '60,000+', icon: '👥' },
  { label: 'Unicorns Featured', value: '9', icon: '🦄' },
]
 
const sectors = ['All', 'Artificial Intelligence', 'FinTech / Payments', 'FinTech', 'Quick Commerce', 'Design / SaaS', 'FinTech / Rewards', 'Productivity / SaaS', 'FinTech / UPI']
 
const startupTips = [
  { icon: '🎯', title: 'Target the Right Role', desc: 'Startups value generalists who can wear multiple hats. Highlight versatility and ownership mindset in your applications.' },
  { icon: '🔨', title: 'Build a Portfolio', desc: 'Side projects, open-source contributions, and hackathons speak louder than degrees at most startups.' },
  { icon: '📊', title: 'Learn Their Product', desc: 'Use the product. Understand its pain points. Come with ideas. Nothing impresses startup founders more.' },
  { icon: '🚀', title: 'Embrace Equity', desc: 'ESOPs can be life-changing. Understand vesting schedules, dilution, and the company\'s path to exit or IPO.' },
]
 
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-sm ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
    <span className="text-slate-500 text-xs ml-1 font-bold">{rating}/5</span>
  </div>
)
 
const StageBadge = ({ stage }) => {
  const colors = {
    'Late Stage': 'bg-blue-100 text-blue-700',
    'Pre-IPO': 'bg-purple-100 text-purple-700',
    'Growth Stage': 'bg-orange-100 text-orange-700',
    'Unicorn': 'bg-pink-100 text-pink-700',
    'Post-IPO (2024)': 'bg-green-100 text-green-700',
  }
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors[stage] || 'bg-slate-100 text-slate-600'}`}>
      {stage}
    </span>
  )
}
 
const StartupCompanies = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState({})
  const [activeSector, setActiveSector] = useState('All')
  const [hovered, setHovered] = useState(null)
 
  const getTab = (id) => activeTab[id] || 'about'
  const setTab = (id, tab) => setActiveTab((p) => ({ ...p, [id]: tab }))
 
  const filtered = activeSector === 'All' ? startups : startups.filter((s) => s.sector === activeSector)
 
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium md:text-[20px] text-slate-800">
            <a href="#startups" className="hover:text-violet-600 transition-colors">Startups</a>
            <a href="#tips" className="hover:text-violet-600 transition-colors">Career Tips</a>
            <a href="#compare" className="hover:text-violet-600 transition-colors">Compare</a>
          </div>
       
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <span className="inline-block bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            The Startup Universe
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            World's Most <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Exciting</span><br />Startups of 2026
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From AI disruptors to fintech unicorns — explore the companies reshaping industries,
            creating careers, and building the future of technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a href="#startups" className="bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm">
              Explore Startups
            </a>
            <a href="#compare" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm">
              Compare All
            </a>
          </div>
          {/* Startup pill strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {startups.map((s) => (
              <div key={s.id} className="bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
                <span>{s.logo}</span>
                <span className="text-sm font-semibold text-white">{s.name}</span>
                <span className="text-xs text-slate-400">{s.valuation}</span>
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
              <div className="text-3xl font-extrabold text-violet-700 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── STARTUP CARDS ── */}
      <section id="startups" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Top Startups to Watch & Join</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Deep-dive profiles of the most innovative companies defining the next decade.</p>
        </div>
 
        {/* Sector Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Artificial Intelligence', 'FinTech / Payments', 'FinTech', 'Quick Commerce', 'Design / SaaS', 'Productivity / SaaS'].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSector(sec)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeSector === sec
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
 
        {/* Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {filtered.map((startup) => (
            <div
              key={startup.id}
              onMouseEnter={() => setHovered(startup.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
                hovered === startup.id ? 'shadow-2xl -translate-y-1 border-violet-200' : 'shadow-md'
              }`}
            >
              {/* Header */}
              <div className="p-7 pb-4" style={{ borderTop: `5px solid ${startup.color}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                      style={{ backgroundColor: `${startup.color}18` }}
                    >
                      {startup.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{startup.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{startup.sector}</p>
                      <div className="mt-1.5">
                        <StageBadge stage={startup.stage} />
                      </div>
                    </div>
                  </div>
                  <span className={`${startup.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}>
                    {startup.badge}
                  </span>
                </div>
                <p className="italic text-slate-500 text-sm mb-3">"{startup.tagline}"</p>
                <div className="flex items-center gap-4">
                  <StarRating rating={startup.rating} />
                  <span className="text-xs bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded-full border border-green-200">
                    💎 {startup.valuation}
                  </span>
                </div>
              </div>
 
              {/* Tabs */}
              <div className="px-7 flex gap-1 border-b border-slate-100">
                {['about', 'products', 'careers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTab(startup.id, tab)}
                    className={`px-4 py-2.5 text-xs font-bold capitalize rounded-t-lg transition-all ${
                      getTab(startup.id) === tab ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    style={getTab(startup.id) === tab ? { backgroundColor: startup.color } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>
 
              {/* Tab Content */}
              <div className="p-7 pt-5 flex-1">
 
                {/* ABOUT */}
                {getTab(startup.id) === 'about' && (
                  <div className="space-y-5">
                    <p className="text-slate-600 text-sm leading-relaxed">{startup.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Founded', value: startup.founded },
                        { label: 'Founders', value: startup.founders },
                        { label: 'Headquarters', value: startup.headquarters },
                        { label: 'Employees', value: startup.employees },
                        { label: 'Total Funding', value: startup.funding },
                        { label: 'Revenue', value: startup.revenue },
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
                        {startup.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Investors</p>
                      <div className="flex flex-wrap gap-2">
                        {startup.investors.map((inv) => (
                          <span key={inv} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">{inv}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* PRODUCTS */}
                {getTab(startup.id) === 'products' && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Products & Platforms</p>
                      <div className="grid grid-cols-2 gap-2">
                        {startup.products.map((p) => (
                          <div
                            key={p}
                            className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: `${startup.color}12`, color: startup.darkColor }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: startup.color }} />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {startup.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                            style={{ borderColor: `${startup.color}50`, color: startup.darkColor, backgroundColor: `${startup.color}10` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
 
                {/* CAREERS */}
                {getTab(startup.id) === 'careers' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Work Culture</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{startup.workCulture}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg. Salary</span>
                        <span className="text-sm font-extrabold" style={{ color: startup.color }}>{startup.avgSalary}</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">India Office</span>
                        <span className="text-sm font-semibold text-slate-700">{startup.indianOffice}</span>
                      </div>
                    </div>
                    <a
                      href={`${startup.url}/careers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: startup.color }}
                    >
                      View Openings at {startup.name} →
                    </a>
                  </div>
                )}
 
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── COMPARISON TABLE ── */}
      <section id="compare" className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Quick Comparison</h2>
            <p className="text-slate-500 text-lg">All 9 startups at a glance — valuations, funding & more.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold rounded-tl-2xl">Startup</th>
                  <th className="text-left px-5 py-4 font-bold">Sector</th>
                  <th className="text-left px-5 py-4 font-bold">Valuation</th>
                  <th className="text-left px-5 py-4 font-bold">Funding</th>
                  <th className="text-left px-5 py-4 font-bold">Stage</th>
                  <th className="text-left px-5 py-4 font-bold rounded-tr-2xl">Rating</th>
                </tr>
              </thead>
              <tbody>
                {startups.map((s, idx) => (
                  <tr key={s.id} className={`border-t border-slate-100 hover:bg-violet-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span>{s.logo}</span>{s.name}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{s.sector}</td>
                    <td className="px-5 py-4 font-bold text-violet-700">{s.valuation}</td>
                    <td className="px-5 py-4 font-semibold text-green-700">{s.funding}</td>
                    <td className="px-5 py-4"><StageBadge stage={s.stage} /></td>
                    <td className="px-5 py-4">
                      <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">★ {s.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
 
      {/* ── CAREER TIPS ── */}
      <section id="tips" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">How to Land a Startup Job</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Startups hire differently. Here's how to stand out.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {startupTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-2xl mb-4">{tip.icon}</div>
              <h4 className="text-slate-800 font-bold text-lg mb-2">{tip.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative bg-gradient-to-br from-violet-900 via-violet-800 to-pink-900 rounded-3xl text-white px-8 py-16 md:px-16 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-4 relative z-10">Ready to Join the Startup World?</h2>
          <p className="text-violet-200 text-lg max-w-xl mx-auto mb-10 relative z-10">
            Equity, impact, and career growth like nowhere else. Your next big opportunity is at a startup.
          </p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {startups.map((s) => (
              <a
                key={s.id}
                href={`${s.url}/careers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/15 transition-all"
                style={{ backgroundColor: `${s.color}40` }}
              >
                {s.logo} {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <span className="text-white font-bold text-lg">StartupRadar</span>
          </div>
          <p className="text-sm mb-6">Your guide to the world's most innovative startups and career opportunities.</p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500 mb-6">
            {startups.map((s) => (
              <span key={s.id}>{s.logo} {s.name}</span>
            ))}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-6">
                © 2026 aiplacprep@gmail.com  All rights reserved. Valuation figures are based on latest publicly available funding rounds.
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default StartupCompanies