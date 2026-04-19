import React, { use, useState } from 'react'
 import logo from '../../assets/image.png';
 import { useNavigate } from 'react-router-dom';
const jobWebsites = [
  {
    id: 1,
    name: 'LinkedIn',
    logo: '🔗',
    category: 'Professional Network',
    tagline: 'Connect. Apply. Grow.',
    description:
      'LinkedIn is the world\'s largest professional networking platform with over 900 million members. It combines job searching with professional networking, allowing users to showcase their experience, connect with industry peers, and apply to millions of jobs globally.',
    founded: '2003',
    headquarters: 'Sunnyvale, CA, USA',
    monthlyVisitors: '900M+',
    jobListings: '15M+',
    rating: 4.7,
    features: ['One-Click Apply', 'InMail Messaging', 'Skill Assessments', 'Salary Insights', 'Company Reviews', 'Learning Courses'],
    bestFor: 'Professionals, Executives, Networkers',
    url: 'https://www.linkedin.com',
    color: '#0A66C2',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-600',
  },
  {
    id: 2,
    name: 'Indeed',
    logo: '🔍',
    category: 'Job Aggregator',
    tagline: 'Find your next opportunity today.',
    description:
      'Indeed is one of the largest job search engines globally, aggregating listings from thousands of company websites, staffing firms, and job boards. It offers a simple, powerful interface for job seekers across all industries and experience levels.',
    founded: '2004',
    headquarters: 'Austin, TX, USA',
    monthlyVisitors: '350M+',
    jobListings: '245M+',
    rating: 4.5,
    features: ['Resume Upload', 'Job Alerts', 'Company Reviews', 'Salary Explorer', 'Skills Tests', 'Instant Apply'],
    bestFor: 'All Job Seekers, Entry Level to Senior',
    url: 'https://www.indeed.com',
    color: '#003A9B',
    badge: 'Most Listings',
    badgeColor: 'bg-indigo-600',
  },
  {
    id: 3,
    name: 'Glassdoor',
    logo: '🏢',
    category: 'Company Insights',
    tagline: 'Find a job. Know your worth.',
    description:
      'Glassdoor uniquely blends job searching with employer transparency. Employees anonymously share salary data, interview experiences, and workplace reviews, helping candidates make informed decisions about potential employers before they apply.',
    founded: '2007',
    headquarters: 'Mill Valley, CA, USA',
    monthlyVisitors: '70M+',
    jobListings: '10M+',
    rating: 4.6,
    features: ['Anonymous Reviews', 'Salary Reports', 'Interview Insights', 'CEO Ratings', 'Benefits Reviews', 'Work Culture Scores'],
    bestFor: 'Research-Driven Candidates, Culture Seekers',
    url: 'https://www.glassdoor.com',
    color: '#0CAA41',
    badge: 'Best Insights',
    badgeColor: 'bg-green-600',
  },
  {
    id: 4,
    name: 'Naukri.com',
    logo: '🇮🇳',
    category: 'India\'s #1 Job Portal',
    tagline: 'Job hai toh Naukri hai.',
    description:
      'Naukri.com is India\'s leading job portal with over 70 million registered users. It dominates the Indian job market offering extensive listings across IT, finance, healthcare, and more. Recruiters actively use Naukri to source top Indian talent.',
    founded: '1997',
    headquarters: 'Noida, India',
    monthlyVisitors: '110M+',
    jobListings: '70M+',
    rating: 4.4,
    features: ['Resume Display', 'Job Matching AI', 'Recruiter Connect', 'Skill Courses', 'Naukri FastForward', 'Salary Predictor'],
    bestFor: 'Indian Job Market, IT Professionals',
    url: 'https://www.naukri.com',
    color: '#FF7555',
    badge: 'India #1',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 5,
    name: 'Monster',
    logo: '👾',
    category: 'Global Job Board',
    tagline: 'Find better. Work better.',
    description:
      'Monster is a pioneer in online job searching, operating since 1999. It serves millions of job seekers across 40+ countries with powerful search tools, career advice, and resume-building features, making it one of the most trusted platforms worldwide.',
    founded: '1999',
    headquarters: 'Weston, MA, USA',
    monthlyVisitors: '50M+',
    jobListings: '1M+',
    rating: 4.2,
    features: ['Resume Builder', 'Career Advice', 'Job Alerts', 'Salary Calculator', 'Interview Prep', 'Diversity Jobs'],
    bestFor: 'Global Opportunities, Career Changers',
    url: 'https://www.monster.com',
    color: '#6A0DAD',
    badge: 'Pioneer',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 6,
    name: 'Internshala',
    logo: '🎓',
    category: 'Internships & Fresher Jobs',
    tagline: 'Learn. Intern. Earn.',
    description:
      'Internshala is India\'s most popular internship and fresher job platform. It connects students and recent graduates with companies offering internships, apprenticeships, and entry-level positions, helping young talent kick-start their professional careers.',
    founded: '2010',
    headquarters: 'Gurugram, India',
    monthlyVisitors: '30M+',
    jobListings: '500K+',
    rating: 4.6,
    features: ['Verified Internships', 'Online Courses', 'Training Programs', 'Work From Home Jobs', 'Stipend Filter', 'Resume Builder'],
    bestFor: 'Students, Freshers, Recent Graduates',
    url: 'https://internshala.com',
    color: '#00BFFF',
    badge: 'Best for Freshers',
    badgeColor: 'bg-cyan-500',
  },
]
 
const stats = [
  { label: 'Active Job Seekers', value: '2.5B+', icon: '👥' },
  { label: 'Jobs Posted Daily', value: '5M+', icon: '📋' },
  { label: 'Companies Hiring', value: '500K+', icon: '🏢' },
  { label: 'Countries Covered', value: '60+', icon: '🌍' },
]
 
const tips = [
  {
    icon: '📄',
    title: 'Optimize Your Resume',
    description: 'Tailor your resume for each application. Use keywords from the job description and quantify achievements with numbers.',
  },
  {
    icon: '🌐',
    title: 'Build Your Online Presence',
    description: 'Maintain an updated LinkedIn profile. Recruiters actively search for candidates online before reaching out.',
  },
  {
    icon: '🤝',
    title: 'Network Actively',
    description: 'Over 70% of jobs are filled through referrals. Connect with industry professionals and attend networking events.',
  },
  {
    icon: '🎯',
    title: 'Apply Strategically',
    description: 'Focus on quality over quantity. Apply to roles that genuinely match your skills and career goals.',
  },
]
 
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.floor(rating) ? 'text-amber-400' : star - 0.5 <= rating ? 'text-amber-300' : 'text-slate-300'}`}
        >
          ★
        </span>
      ))}
      <span className="text-slate-500 text-sm ml-1 font-medium">{rating}</span>
    </div>
  )
}
 
const JobPortal = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredCard, setHoveredCard] = useState(null)
 
  const categories = ['All', 'Professional Network', 'Job Aggregator', 'Company Insights', 'India\'s #1 Job Portal', 'Global Job Board', 'Internships & Fresher Jobs']
 
  const filtered =
    activeCategory === 'All'
      ? jobWebsites
      : jobWebsites.filter((j) => j.category === activeCategory)
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img  onClick={()=>navigate("/")}
      src={logo}
      alt="logo"
      className="w-42 sm:w-45 cursor-pointer rounded-xl"
    />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium md:text-[20px] text-slate-800">
            <a href="#platforms" className="hover:text-blue-600 transition-colors">Platforms</a>
            <a href="#tips" className="hover:text-blue-600 transition-colors">Career Tips</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">Stats</a>
          </div>
    
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-blue-500/30 border border-blue-400/40 text-blue-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Your Career Compass
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Discover the Best<br />
            <span className="text-amber-400">Job Platforms</span> of 2026
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive guide to the world's top job search websites — compare features,
            understand strengths, and find the platform that's right for your career journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#platforms" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm">
              Explore Platforms
            </a>
            <a href="#tips" className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm">
              Career Tips
            </a>
          </div>
        </div>
      </section>
 
      {/* ── STATS ── */}
      <section id="stats" className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-blue-700 mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── PLATFORMS ── */}
      <section id="platforms" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Top Job Platforms</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Explore leading job portals across the globe — each with unique strengths for different career needs.
          </p>
        </div>
 
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'India\'s #1 Job Portal', 'Internships & Fresher Jobs', 'Professional Network', 'Job Aggregator', 'Company Insights', 'Global Job Board'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
 
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((site) => (
            <div
              key={site.id}
              onMouseEnter={() => setHoveredCard(site.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col ${
                hoveredCard === site.id ? 'shadow-2xl -translate-y-1 border-blue-300' : 'shadow-md hover:shadow-lg'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4" style={{ borderTop: `4px solid ${site.color}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                      style={{ backgroundColor: `${site.color}18` }}
                    >
                      {site.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{site.name}</h3>
                      <span className="text-xs text-slate-500 font-medium">{site.category}</span>
                    </div>
                  </div>
                  <span className={`${site.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                    {site.badge}
                  </span>
                </div>
                <p className="text-slate-500 text-sm italic mb-3">"{site.tagline}"</p>
                <StarRating rating={site.rating} />
              </div>
 
              {/* Description */}
              <div className="px-6 pb-4">
                <p className="text-slate-600 text-sm leading-relaxed">{site.description}</p>
              </div>
 
              {/* Meta Info */}
              <div className="mx-6 mb-4 bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Founded</span>
                  <span className="text-slate-700 font-bold">{site.founded}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Headquarters</span>
                  <span className="text-slate-700 font-bold">{site.headquarters}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Monthly Visitors</span>
                  <span className="text-slate-700 font-bold">{site.monthlyVisitors}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Job Listings</span>
                  <span className="text-slate-700 font-bold">{site.jobListings}</span>
                </div>
              </div>
 
              {/* Features */}
              <div className="px-6 pb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {site.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${site.color}15`, color: site.color }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
 
              {/* Best For */}
              <div className="px-6 pb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Best For</p>
                <p className="text-sm text-slate-700 font-medium">{site.bestFor}</p>
              </div>
 
              {/* CTA */}
              <div className="px-6 pb-6 mt-auto">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: site.color }}
                >
                  Visit {site.name} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── COMPARISON TABLE ── */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Quick Comparison</h2>
            <p className="text-slate-500 text-lg">Side-by-side overview of all platforms at a glance.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-6 py-4 font-bold rounded-tl-2xl">Platform</th>
                  <th className="text-left px-6 py-4 font-bold">Category</th>
                  <th className="text-left px-6 py-4 font-bold">Monthly Visitors</th>
                  <th className="text-left px-6 py-4 font-bold">Job Listings</th>
                  <th className="text-left px-6 py-4 font-bold">Rating</th>
                  <th className="text-left px-6 py-4 font-bold rounded-tr-2xl">Best For</th>
                </tr>
              </thead>
              <tbody>
                {jobWebsites.map((site, idx) => (
                  <tr
                    key={site.id}
                    className={`border-t border-slate-100 transition-colors hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-800">
                        <span>{site.logo}</span>
                        {site.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{site.category}</td>
                    <td className="px-6 py-4 font-semibold text-blue-700">{site.monthlyVisitors}</td>
                    <td className="px-6 py-4 font-semibold text-indigo-700">{site.jobListings}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-xs">
                        ★ {site.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{site.bestFor}</td>
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
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Career Success Tips</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Maximize your chances with these proven job search strategies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {tip.icon}
              </div>
              <h4 className="text-slate-800 font-bold text-lg mb-2">{tip.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-800 mx-6 rounded-3xl mb-20 text-white overflow-hidden max-w-7xl xl:mx-auto">
        <div className="px-8 py-16 md:px-16 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
            Use the platforms above, follow the tips, and take the next step toward the career you deserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg"
            >
              Start on LinkedIn
            </a>
            <a
              href="https://www.naukri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all"
            >
              Browse on Naukri →
            </a>
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <span className="text-white font-bold text-lg">JobPortalHub</span>
          </div>
          <p className="text-sm mb-6">Your trusted guide to the world's leading job search platforms.</p>
          <div className="flex justify-center gap-8 text-sm text-slate-500 mb-6">
            <span>🔗 LinkedIn</span>
            <span>🔍 Indeed</span>
            <span>🏢 Glassdoor</span>
            <span>🇮🇳 Naukri</span>
            <span>👾 Monster</span>
            <span>🎓 Internshala</span>
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-6">
                © 2026 aiplacprep@gmail.com  All rights reserved. Information is for informational purposes only.
          </p>
        </div>
      </footer>
 
    </div>
  )
}
 
export default JobPortal;