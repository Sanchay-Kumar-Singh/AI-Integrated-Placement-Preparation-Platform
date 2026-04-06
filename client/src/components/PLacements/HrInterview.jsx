import React, { useState } from 'react'
 import logo from '../../assets/image.png'
 import { useNavigate } from 'react-router-dom'
const tabs = [
  { id: 'guide', label: 'HR Guide', icon: '📋' },
  { id: 'questions', label: 'Top Questions', icon: '❓' },
  { id: 'dos', label: "Do's & Don'ts", icon: '✅' },
  { id: 'salary', label: 'Salary Negotiation', icon: '💰' },
  { id: 'tips', label: 'Final Tips', icon: '🎯' },
]
 
const hrStages = [
  { icon: '📞', title: 'Pre-Screen Call', color: '#3B82F6', desc: 'A 15–20 min recruiter call to verify basics — notice period, salary expectations, location preference, and interest in the role.' },
  { icon: '📝', title: 'Application Review', color: '#8B5CF6', desc: 'HR reviews your resume and cover letter. ATS filters first, then a human evaluates fit for the role and culture.' },
  { icon: '🤝', title: 'HR Round', color: '#10B981', desc: 'Formal 30–45 min conversation covering background, motivations, team fit, soft skills, and compensation expectations.' },
  { icon: '📋', title: 'Reference Check', color: '#F59E0B', desc: 'HR contacts your previous managers or colleagues to verify employment, performance, and character claims.' },
  { icon: '🏆', title: 'Offer & Negotiation', color: '#EF4444', desc: 'HR presents the offer. This is your window to negotiate salary, benefits, title, start date, and remote flexibility.' },
]
 
const topQuestions = [
  {
    q: 'Tell me about yourself.',
    category: 'Introduction',
    color: '#3B82F6',
    icon: '👤',
    answer: 'Use the Present–Past–Future formula. Start with your current role and key achievements, briefly mention your background and education, then explain what excites you about this opportunity.',
    example: '"I\'m currently a software engineer at XYZ, where I\'ve led backend development for a payments feature used by 200K users. Before that, I completed my B.Tech in CS from [College] with a focus on distributed systems. I\'m looking to join [Company] because of your scale and the technical challenges your infra team is solving."',
    avoid: 'Don\'t recite your entire resume. Keep it under 2 minutes. Don\'t start with "I was born in..."',
  },
  {
    q: 'Why do you want to leave your current job?',
    category: 'Motivation',
    color: '#8B5CF6',
    icon: '🚪',
    answer: 'Focus on what you\'re moving toward, not what you\'re running from. Mention growth, learning, challenge, or scale. Never badmouth your current employer.',
    example: '"I\'ve learned a lot in my current role and I\'m grateful for the experience. I\'m now looking for an opportunity where I can work at a larger scale, contribute to more impactful products, and grow into a technical leadership role — which aligns with what [Company] offers."',
    avoid: 'Never say "my manager is terrible," "the company has no growth," or "the pay is bad."',
  },
  {
    q: 'Why do you want to work here?',
    category: 'Motivation',
    color: '#10B981',
    icon: '🎯',
    answer: 'Show you\'ve done your research. Mention the company\'s product, culture, mission, or a specific team. Tie it back to your own career goals.',
    example: '"I\'ve been following [Company]\'s engineering blog and I\'m impressed by how your team solved [specific problem]. Your focus on developer culture and the scale of problems you tackle excites me. I also believe my experience in [skill] directly aligns with what your team needs."',
    avoid: 'Don\'t say generic things like "it\'s a great company" or "good pay and benefits."',
  },
  {
    q: 'What is your greatest strength?',
    category: 'Self-Assessment',
    color: '#F59E0B',
    icon: '💪',
    answer: 'Pick one genuine strength. Make it relevant to the role. Back it with a specific example. Don\'t just list adjectives.',
    example: '"My greatest strength is breaking down complex problems into manageable pieces. In my last project, I was given a vague requirement to \'improve search performance.\' I scoped it into 3 initiatives, built consensus with the team, and delivered a 55% improvement in query speed over 6 weeks."',
    avoid: 'Don\'t say "I\'m a perfectionist" or "I work too hard" — interviewers see through these instantly.',
  },
  {
    q: 'What is your greatest weakness?',
    category: 'Self-Assessment',
    color: '#EF4444',
    icon: '🔍',
    answer: 'Choose a real weakness that\'s not critical to the role. Show self-awareness and what you\'re actively doing to improve it.',
    example: '"I used to struggle with delegating tasks because I wanted to ensure quality. I\'ve since learned to trust my teammates by pairing on tasks first, setting clear expectations, and doing async check-ins. My last team actually told me I\'d improved a lot in this area."',
    avoid: 'Don\'t say "I have no weaknesses" or pick something that\'s actually a core job requirement.',
  },
  {
    q: 'Where do you see yourself in 5 years?',
    category: 'Career Goals',
    color: '#06B6D4',
    icon: '🔭',
    answer: 'Show ambition that aligns with the company\'s growth path. Be realistic but aspirational. Tie it to the role you\'re applying for.',
    example: '"In 5 years, I see myself growing into a senior or lead engineer role, mentoring junior developers, and driving architectural decisions. I want to become an expert in [domain]. I believe this company\'s scale and the team\'s caliber will help me get there faster than anywhere else."',
    avoid: 'Don\'t say "I want your job" or "I see myself starting my own company."',
  },
  {
    q: 'Tell me about a time you failed.',
    category: 'Behavioral',
    color: '#7C3AED',
    icon: '📉',
    answer: 'Choose a real failure. Be honest, take ownership, and focus heavily on what you learned and how you changed. Avoid blaming others.',
    example: '"In my second year, I committed to delivering a feature in 2 weeks that took 5 weeks. I underestimated complexity and didn\'t communicate blockers early enough. After that, I started breaking estimates into smaller tasks, flagging risks at day 3, and using time-boxing. I haven\'t missed a deadline since."',
    avoid: 'Don\'t pick a failure that\'s too serious (ethical issues, major production outage your fault) or too trivial.',
  },
  {
    q: 'How do you handle conflict with a coworker?',
    category: 'Behavioral',
    color: '#DC2626',
    icon: '⚔️',
    answer: 'Show maturity and professionalism. Describe a real situation using STAR. Emphasize communication, empathy, and resolution — not winning the argument.',
    example: '"A colleague and I disagreed on the tech approach for a feature — REST vs GraphQL. Instead of escalating, I suggested we document both approaches with pros/cons and present to the team. We went with a hybrid. The process built trust, and we collaborated smoothly after that."',
    avoid: 'Don\'t say you\'ve never had conflicts (unrealistic) or that you always defer to avoid confrontation.',
  },
]
 
const dosAndDonts = {
  dos: [
    { point: 'Research the company, product, and recent news thoroughly before the interview', icon: '🔍' },
    { point: 'Dress professionally — even for video calls, appearance signals seriousness', icon: '👔' },
    { point: 'Arrive (or log in) 5–10 minutes early to show punctuality', icon: '⏰' },
    { point: 'Prepare 3–5 thoughtful questions to ask the interviewer at the end', icon: '❓' },
    { point: 'Use the STAR method for all behavioral answers — Situation, Task, Action, Result', icon: '⭐' },
    { point: 'Maintain eye contact and positive body language throughout', icon: '👁️' },
    { point: 'Be honest — interviewers are trained to spot inconsistencies in answers', icon: '💯' },
    { point: 'Send a thank-you email within 24 hours after the interview', icon: '📧' },
    { point: 'Speak confidently about your salary expectations — research beforehand', icon: '💪' },
  ],
  donts: [
    { point: 'Never badmouth your previous employer, manager, or colleagues', icon: '🚫' },
    { point: 'Don\'t lie or exaggerate on your resume or in verbal answers', icon: '❌' },
    { point: 'Avoid checking your phone or looking distracted during the interview', icon: '📵' },
    { point: 'Don\'t give one-word or vague answers — always elaborate with examples', icon: '🤐' },
    { point: 'Never say "I don\'t have any questions" when asked at the end', icon: '⚠️' },
    { point: 'Don\'t reveal your full current salary without context — share expected range', icon: '💸' },
    { point: 'Avoid interrupting the interviewer mid-sentence — listen fully first', icon: '🛑' },
    { point: 'Don\'t be overly casual or use slang — maintain professional tone throughout', icon: '🎭' },
    { point: 'Never accept an offer on the spot — always take 24–48 hours to review', icon: '⏳' },
  ],
}
 
const salaryGuide = [
  {
    step: '01',
    title: 'Research Before You Talk',
    icon: '🔍',
    color: '#3B82F6',
    desc: 'Know your market value before any salary conversation. Use Levels.fyi, Glassdoor, LinkedIn Salary, and AmbitionBox for India-specific data.',
    tips: ['Check roles with same title + experience + city', 'Note the median, not just the max', 'Factor in total comp: base + bonus + equity + benefits'],
  },
  {
    step: '02',
    title: 'Anchor High, Not Low',
    icon: '⚓',
    color: '#8B5CF6',
    desc: 'Always give a range where your target is the bottom of the range. The first number anchors the entire negotiation.',
    tips: ['"Based on market data and my experience, I\'m targeting ₹18–22 LPA"', 'Never say "Whatever is standard" or "Any amount is fine"', 'Stating a range shows flexibility while protecting your floor'],
  },
  {
    step: '03',
    title: 'Counter-Offer Strategy',
    icon: '🎯',
    color: '#10B981',
    desc: 'If the first offer is below your target, don\'t panic. Express enthusiasm for the role first, then counter with data-backed reasoning.',
    tips: ['"I\'m really excited about this role. Based on my research and experience, I was expecting closer to ₹X. Is there flexibility?"', 'Counter only once unless they ask you to propose more', 'Negotiate total comp — consider ESOPs, joining bonus, extra PTO'],
  },
  {
    step: '04',
    title: 'Beyond Base Salary',
    icon: '💎',
    color: '#F59E0B',
    desc: 'Salary is just one part. Negotiate the full package — often easier to move on non-cash items than base.',
    tips: ['Joining/Signing Bonus (one-time, easy to give)', 'ESOPs / RSUs — big deal at growth startups', 'Work-from-home flexibility, extra leave, health cover'],
  },
]
 
const questionsToAsk = [
  { q: 'What does success look like in this role in the first 90 days?', why: 'Shows you\'re goal-oriented and want to contribute immediately.' },
  { q: 'What are the biggest challenges the team is currently facing?', why: 'Demonstrates strategic thinking and genuine interest in solving problems.' },
  { q: 'How does the team handle disagreements on technical direction?', why: 'Reveals culture, psychological safety, and how decisions are made.' },
  { q: 'What are the growth and learning opportunities here?', why: 'Shows ambition and long-term thinking — not just looking for a paycheck.' },
  { q: 'What do you personally enjoy most about working here?', why: 'Humanizes the conversation and gives you real unfiltered insight.' },
]
 
const bodyLanguageTips = [
  { icon: '👁️', title: 'Eye Contact', desc: 'Maintain natural eye contact — not a stare. For video: look at the camera, not the screen.' },
  { icon: '🪑', title: 'Posture', desc: 'Sit upright with shoulders back. Leaning slightly forward shows engagement and interest.' },
  { icon: '🤲', title: 'Hand Gestures', desc: 'Use open, measured hand gestures. Keep hands above the desk — visible and calm.' },
  { icon: '😊', title: 'Smile Naturally', desc: 'A genuine smile at the start and end builds rapport. Don\'t force it throughout.' },
  { icon: '🎙️', title: 'Voice & Pace', desc: 'Speak clearly, at moderate pace. Pause before answering — it signals thoughtfulness.' },
  { icon: '📱', title: 'No Distractions', desc: 'Phone on silent and face-down. Notify housemates. Use a clean, quiet background on video.' },
]
 
// ─── COMPONENT ───────────────────────────────────────────────────────────────
 
const HrInterview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guide')
  const [openQ, setOpenQ] = useState(null)
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
           <img onClick={() => navigate("/")}
                            src={logo}
                            alt="logo"
                            className="w-32 sm:w-45 cursor-pointer rounded-xl"
                        />
          </div>
          <div className="hidden md:flex gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold md:text-[15px] transition-all ${activeTab === t.id ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete HR Interview Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Ace Your <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">HR Interview</span><br />With Confidence
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Top HR questions with model answers, salary negotiation tactics, body language tips, do's & don'ts — everything to leave a lasting impression.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {[['8', 'Top HR Questions'], ['5', 'Interview Stages'], ['4', 'Salary Tips'], ['9+', 'Do\'s & Don\'ts']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-rose-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── STICKY TABS ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-6 py-16">
 
        {/* ══════════════ HR GUIDE ══════════════ */}
        {activeTab === 'guide' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📋 HR Interview Process</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Understand every stage of the HR process — from first call to final offer.</p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">
              {hrStages.map((stage, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="p-6" style={{ borderTop: `4px solid ${stage.color}` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${stage.color}18` }}>{stage.icon}</div>
                      <h3 className="font-extrabold text-slate-800 text-lg">{stage.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Body Language */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">🎭 Body Language & Presence</h3>
              <p className="text-slate-500 text-sm mb-7">55% of communication is non-verbal. Master these to make a strong first impression.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {bodyLanguageTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-1">{tip.title}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Questions to Ask */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-2">❓ Smart Questions to Ask the Interviewer</h3>
              <p className="text-slate-400 text-sm mb-7">"Do you have any questions?" — Always say YES. These questions show intelligence and genuine interest.</p>
              <div className="space-y-4">
                {questionsToAsk.map((item, i) => (
                  <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-5">
                    <p className="font-bold text-white mb-1">"{item.q}"</p>
                    <p className="text-slate-400 text-xs"><span className="text-rose-400 font-bold">Why it works: </span>{item.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ══════════════ TOP QUESTIONS ══════════════ */}
        {activeTab === 'questions' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">❓ Top HR Questions & Model Answers</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Click any question to see the best approach, a model answer, and what to avoid.</p>
            </div>
            <div className="space-y-4">
              {topQuestions.map((item, i) => {
                const isOpen = openQ === i
                return (
                  <div key={i}
                    className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: item.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenQ(isOpen ? null : i)}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: `${item.color}18` }}>{item.icon}</div>
                      <div className="flex-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white mr-2" style={{ backgroundColor: item.color }}>{item.category}</span>
                        <h3 className="font-extrabold text-slate-800 text-lg mt-1">{item.q}</h3>
                      </div>
                      <span className={`text-slate-400 text-lg flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="rounded-2xl p-5 border" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}30` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: item.color }}>💡 Approach</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.answer}</p>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-3">✅ Model Answer</p>
                          <p className="text-sm text-slate-300 leading-relaxed italic">{item.example}</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-red-600 uppercase tracking-wider mb-3">🚫 What to Avoid</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.avoid}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
 
        {/* ══════════════ DO's & DON'Ts ══════════════ */}
        {activeTab === 'dos' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">✅ Do's & Don'ts</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">The unwritten rules of HR interviews that separate great candidates from average ones.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-7">
                <h3 className="text-2xl font-extrabold text-green-700 mb-6">✅ Always DO These</h3>
                <div className="space-y-4">
                  {dosAndDonts.dos.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{item.point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-7">
                <h3 className="text-2xl font-extrabold text-red-700 mb-6">🚫 Never DO These</h3>
                <div className="space-y-4">
                  {dosAndDonts.donts.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-red-100 shadow-sm">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{item.point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
 
        {/* ══════════════ SALARY ══════════════ */}
        {activeTab === 'salary' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💰 Salary Negotiation Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Never leave money on the table. Here's how to negotiate your offer like a professional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
              {salaryGuide.map((step, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-7">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${step.color}18` }}>{step.icon}</div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider" style={{ color: step.color }}>STEP {step.step}</p>
                      <h3 className="text-xl font-extrabold text-slate-800">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{step.desc}</p>
                  <div className="space-y-2">
                    {step.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-slate-700 p-3 rounded-xl" style={{ backgroundColor: `${step.color}08` }}>
                        <span className="flex-shrink-0 font-bold" style={{ color: step.color }}>→</span>{tip}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
 
            {/* Salary Scripts */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🎙️ Salary Conversation Scripts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: 'When Asked Current Salary', color: '#3B82F6', script: '"I\'d prefer to share my expected salary rather than current. Based on market research and my experience, I\'m targeting ₹X–Y LPA. Does that align with your budget for this role?"' },
                  { title: 'When Offer Comes In Low', color: '#10B981', script: '"Thank you for the offer — I\'m genuinely excited about the role and the team. The offer is slightly below my expectation of ₹X. Is there flexibility on the base or could we look at a signing bonus?"' },
                  { title: 'When Asked to Decide Fast', color: '#F59E0B', script: '"I\'m very interested in the role. I want to give it the consideration it deserves — could I have 48 hours to review everything before confirming? I want to make sure I\'m fully committed."' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: s.color }}>{s.title}</p>
                    <p className="text-slate-300 text-sm italic leading-relaxed">"{s.script}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ══════════════ FINAL TIPS ══════════════ */}
        {activeTab === 'tips' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🎯 Final Preparation Tips</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Last-mile advice to make sure you walk in confident and walk out with an offer.</p>
            </div>
 
            {/* Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: '1 Week Before', icon: '📅', color: '#3B82F6', tasks: ['Research company, culture, recent news', 'Prepare 6–8 STAR stories covering different scenarios', 'Practice answering out loud — not just in your head', 'Prepare your salary range with market data', 'Iron your outfit / test your video setup'] },
                { title: 'Day Before', icon: '🌙', color: '#8B5CF6', tasks: ['Reread the job description and your resume', 'Sleep 7–8 hours — cognitive performance matters', 'Write down 5 questions to ask the interviewer', 'Pack everything / charge your devices', 'Confirm interview time, location, or video link'] },
                { title: 'Day of Interview', icon: '⭐', color: '#10B981', tasks: ['Eat a proper meal — don\'t interview hungry', 'Arrive / log in 10 min early', 'Take 3 slow deep breaths before the call', 'Have your resume, a notepad, and water ready', 'Smile — energy and enthusiasm are contagious'] },
              ].map((phase, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 p-6 shadow-sm" style={{ borderColor: phase.color }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{phase.icon}</span>
                    <h3 className="font-extrabold text-slate-800 text-lg">{phase.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: phase.color }}>□</span>{task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
 
            {/* STAR Quick Card */}
            <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-3xl p-8 text-white mb-10">
              <h3 className="text-2xl font-extrabold mb-6 text-center">⭐ Quick STAR Reference Card</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { letter: 'S', word: 'Situation', desc: 'Set the context — where, when, who was involved', color: '#3B82F6' },
                  { letter: 'T', word: 'Task', desc: 'Your specific responsibility in that situation', color: '#10B981' },
                  { letter: 'A', word: 'Action', desc: 'What YOU did specifically — use "I not we"', color: '#F59E0B' },
                  { letter: 'R', word: 'Result', desc: 'Measurable outcome — numbers, impact, learning', color: '#EF4444' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                    <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-2xl font-extrabold text-white mb-3" style={{ backgroundColor: s.color }}>{s.letter}</div>
                    <p className="font-extrabold text-white mb-2">{s.word}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Mindset */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-6 text-center">🧘 The Right Interview Mindset</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: '🤝', title: 'It\'s a Two-Way Street', desc: 'You\'re not just being evaluated — you\'re also evaluating the company. This shifts you from anxiety to curiosity.', color: '#3B82F6' },
                  { icon: '💬', title: 'Authenticity Wins', desc: 'HR interviewers talk to hundreds of candidates. Genuine, specific, personal answers stand out far more than polished but generic ones.', color: '#10B981' },
                  { icon: '📈', title: 'Every Interview is Practice', desc: 'Even if you don\'t get the offer, you\'ve improved. Debrief after each interview — what went well, what to improve.', color: '#F59E0B' },
                ].map((card, i) => (
                  <div key={i} className="rounded-2xl p-6 border" style={{ backgroundColor: `${card.color}08`, borderColor: `${card.color}30` }}>
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <h4 className="font-extrabold text-slate-800 mb-2">{card.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
 
      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">HR</span>
            </div>
            <span className="text-white font-bold text-lg">HRInterviewPrep</span>
          </div>
          <p className="text-sm mb-4">Your complete guide to acing every HR interview with confidence.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-4">
            {tabs.map(t => <span key={t.id}>{t.icon} {t.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
             © 2026 aiplacprep@gmail.com Built for job seekers who want to convert every interview into an offer.
          </p>
        </div>
      </footer>
    </div>
  )
}
 
export default HrInterview