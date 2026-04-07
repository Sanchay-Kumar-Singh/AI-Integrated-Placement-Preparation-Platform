import React from 'react'
import banner from "../assets/bann2.png"
const Best = () => {
      const features = [
  {
    id: "01",
    emoji: "🎯",
    title: "All-in-One Placement Hub",
    description:
      "From Notes, Coding & Interview Questions to Aptitude Quizzes, Resume Templates, and Internships, everything you need is in one place!",
    color: "from-violet-500 to-purple-600",
    light: "bg-violet-50 border-violet-100",
    badge: "text-violet-600 bg-violet-100",
  },
  {
    id: "02",
    emoji: "📌",
    title: "Expert-Curated Roadmaps",
    description:
      "Tailored paths for 1st, 2nd, and 3rd-year students, covering Web Dev, App Dev, Blockchain, and more!",
    color: "from-blue-500 to-cyan-500",
    light: "bg-blue-50 border-blue-100",
    badge: "text-blue-600 bg-blue-100",
  },
  {
    id: "03",
    emoji: "🛠",
    title: "Top Free & Paid Resources",
    description:
      "Find the best YouTube channels, free courses, ATS resume checkers, and interview prep sites — all handpicked to save you time!",
    color: "from-emerald-500 to-teal-500",
    light: "bg-emerald-50 border-emerald-100",
    badge: "text-emerald-600 bg-emerald-100",
  },
  {
    id: "04",
    emoji: "💼",
    title: "Internship & Job Opportunities",
    description:
      "Discover a curated list of free & paid internships, ensuring you gain real-world experience before placements.",
    color: "from-orange-500 to-amber-500",
    light: "bg-orange-50 border-orange-100",
    badge: "text-orange-600 bg-orange-100",
  },
  {
    id: "05",
    emoji: "🧑‍💻",
    title: "Aptitude & Technical Mastery",
    description:
      "Practice with TCS Ninja & Digital PYQs, quizzes, and coding challenges to stay ahead of the competition.",
    color: "from-pink-500 to-rose-500",
    light: "bg-pink-50 border-pink-100",
    badge: "text-pink-600 bg-pink-100",
  },
  {
    id: "06",
    emoji: "🚀",
    title: "Crack Your Dream Job with Us!",
    description:
      "With structured learning, expert resources, and real-world practice, we help you ace placements with confidence!",
    color: "from-indigo-500 to-violet-600",
    light: "bg-indigo-50 border-indigo-100",
    badge: "text-indigo-600 bg-indigo-100",
  },
];
  return (
    <>
     <section className="bg-white py-24 px-6 sm:px-16 xl:px-28 -mt-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-xs  font-semibold tracking-widest uppercase text-blue-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 mb-5">
          Why Choose Us
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-5">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Land Your Dream Job
          </span>
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          We bring together all placement resources, roadmaps, and opportunities
          under one roof — so you can focus on what matters: getting placed.
        </p>
      </div>
 
      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`group relative rounded-2xl border p-8 ${feature.light} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden`}
          >
            {/* Background number watermark */}
            {/* <span className="absolute -bottom-4 -right-2 text-8xl font-black text-black/[0.04] select-none leading-none">
              {feature.id}
            </span> */}
 
            {/* Top row */}
            <div className="flex items-center justify-between mb-6">
              {/* Emoji icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-md`}
              >
                {feature.emoji}
              </div>
 
              {/* Number badge */}
              <span
                className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full ${feature.badge}`}
              >
                {feature.id}
              </span>
            </div>
 
            {/* Text */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
   
    </section>
       <img src={banner} alt="" className='md:w-320 w-66 mx-auto md:h-170 h-60 ml-13 md:ml-50 -mt-30' />
       <br />
    </>
  )
}

export default Best