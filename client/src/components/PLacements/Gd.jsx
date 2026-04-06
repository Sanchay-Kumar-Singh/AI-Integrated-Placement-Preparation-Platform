import React, { useState } from 'react'
 import logo from '../../assets/image.png'
 import { useNavigate } from 'react-router-dom'
const tabs = [
  { id: 'guide', label: 'GD Guide', icon: '📋' },
  { id: 'types', label: 'GD Types', icon: '🗂️' },
  { id: 'topics', label: 'Hot Topics', icon: '🔥' },
  { id: 'tips', label: 'Tips & Mistakes', icon: '💡' },
]
 
const gdStages = [
  { icon: '📢', title: 'Introduction Round', color: '#3B82F6', desc: 'Moderator introduces the topic. You get 1–2 minutes to think and jot down key points before discussion begins.' },
  { icon: '💬', title: 'Discussion Phase', color: '#10B981', desc: '15–20 minutes of open discussion. Candidates share views, counter-argue, and build on each other\'s points.' },
  { icon: '📝', title: 'Summarization', color: '#F59E0B', desc: 'One or more participants are asked to summarize. This is a high-visibility opportunity — be concise and balanced.' },
  { icon: '🏆', title: 'Evaluation', color: '#8B5CF6', desc: 'Evaluators score you on content, communication, leadership, listening, and how you handle disagreement.' },
]
 
const gdTypes = [
  {
    type: 'Topic-Based GD',
    icon: '📌',
    color: '#3B82F6',
    desc: 'Most common type. A statement or topic is given — usually a current affairs issue, social problem, or abstract idea.',
    examples: ['Social Media: Boon or Bane?', 'Work From Home is the Future', 'India\'s Growth Story'],
    tip: 'Structure your points — state position clearly in first 30 seconds. Use data when possible.',
  },
  {
    type: 'Case-Based GD',
    icon: '🗂️',
    color: '#8B5CF6',
    desc: 'A business or real-world scenario is given. Group must analyze the problem and propose solutions together.',
    examples: ['A startup is losing customers — what should they do?', 'Company faces ethical vs profitable dilemma'],
    tip: 'Use frameworks like SWOT or Problem → Root Cause → Solution. Show structured thinking.',
  },
  {
    type: 'Abstract GD',
    icon: '🌀',
    color: '#10B981',
    desc: 'A random word, shape, or image is given. Tests creativity, lateral thinking, and ability to connect ideas.',
    examples: ['A blank white page', 'The colour blue', 'A broken clock'],
    tip: 'Don\'t overthink. Draw metaphors to real-world concepts. Multiple angles impress evaluators.',
  },
  {
    type: 'Controversial GD',
    icon: '⚔️',
    color: '#EF4444',
    desc: 'A polarizing statement is given to see how candidates handle disagreement, emotion, and pressure.',
    examples: ['Reservations should be abolished', 'Capital punishment is justified', 'AI will destroy more jobs than it creates'],
    tip: 'Stay calm and factual. Acknowledge opposing views. Never get emotional or personal.',
  },
]
 
const hotTopics = [
  { topic: 'AI replacing human jobs', category: 'Technology', color: '#3B82F6', points: ['Automation displaces repetitive roles', 'Creates new tech-driven opportunities', 'Reskilling and upskilling are critical', 'Net job creation vs destruction debate'] },
  { topic: 'Climate Change & Corporate Responsibility', category: 'Environment', color: '#10B981', points: ['Companies contribute 71% of global emissions', 'ESG frameworks becoming mandatory', 'Greenwashing is a real problem', 'Carbon credits and net-zero targets'] },
  { topic: 'Social Media: Freedom vs Regulation', category: 'Society', color: '#8B5CF6', points: ['Misinformation spreads faster than truth', 'Section 230 and platform liability', 'Mental health impact on youth', 'Right to free speech vs community safety'] },
  { topic: 'Remote Work vs Office Culture', category: 'Workplace', color: '#F59E0B', points: ['Productivity studies show mixed results', 'Collaboration suffers in hybrid models', 'Real estate and commute cost savings', 'Work-life balance improvement'] },
  { topic: 'India as a Global Manufacturing Hub', category: 'Economy', color: '#EF4444', points: ['China+1 strategy benefits India', 'PLI schemes attracting investment', 'Infrastructure and logistics gaps remain', 'Skilled workforce development needed'] },
  { topic: 'UPI & Digital Payments Revolution', category: 'Fintech', color: '#06B6D4', points: ['$2.2 Trillion processed via UPI in 2023', 'Financial inclusion in rural India', 'Cybersecurity and fraud risks', 'Global expansion of UPI infrastructure'] },
]
 
const dosList = [
  { icon: '🚀', point: 'Initiate the discussion if you\'re confident — initiators get extra visibility from evaluators.' },
  { icon: '👂', point: 'Listen actively — nod, make eye contact with speakers, and build on their points intelligently.' },
  { icon: '📊', point: 'Use data, facts, and real-world examples to back your arguments — it adds credibility instantly.' },
  { icon: '🎯', point: 'Stay relevant to the topic — every point must connect directly back to the subject.' },
  { icon: '🤝', point: 'Acknowledge good points from others: "That\'s a valid point. I\'d like to add that..."' },
  { icon: '⏱️', point: 'Keep individual contributions to 30–60 seconds — quality over quantity always wins.' },
  { icon: '📝', point: 'Volunteer to summarize if given the chance — it shows leadership and listening ability.' },
]
 
const dontsList = [
  { icon: '🚫', point: 'Never shout over others or interrupt mid-sentence — it signals poor emotional control.' },
  { icon: '❌', point: 'Don\'t stay silent for the entire discussion — even one quality entry is better than none.' },
  { icon: '😤', point: 'Avoid getting personal or emotional when someone disagrees with your point.' },
  { icon: '🐑', point: 'Don\'t just agree with everything — evaluators want independent thinking and conviction.' },
  { icon: '📖', point: 'Avoid memorized or rehearsed speeches — it sounds robotic and kills group energy.' },
  { icon: '👎', point: 'Never dismiss another\'s view rudely — say "I see it differently because..." instead.' },
  { icon: '🌀', point: 'Don\'t go off-topic with irrelevant examples or personal stories unrelated to the subject.' },
]
 
const evaluationCriteria = [
  { criteria: 'Content & Knowledge', weight: '25%', icon: '🧠', color: '#3B82F6', desc: 'Depth of understanding, use of facts, examples, and original insights on the topic.' },
  { criteria: 'Communication Skills', weight: '25%', icon: '🗣️', color: '#10B981', desc: 'Clarity, vocabulary, tone, pace, and the ability to express ideas in a structured manner.' },
  { criteria: 'Leadership & Initiative', weight: '20%', icon: '👑', color: '#F59E0B', desc: 'Taking initiative, guiding the group, managing time, and keeping discussion on track.' },
  { criteria: 'Listening & Adaptability', weight: '15%', icon: '👂', color: '#8B5CF6', desc: 'Actively listening and building meaningfully on others\' contributions.' },
  { criteria: 'Group Dynamics', weight: '15%', icon: '🤝', color: '#EF4444', desc: 'How well you work with the group — collaborative, not dominating or too passive.' },
]
 
const GD = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('guide')
  const [openTopic, setOpenTopic] = useState(null)
  const [openType, setOpenType] = useState(null)
 
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
 
      {/* NAVBAR */}
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
                className={`px-3 py-2 rounded-lg text-xs font-bold md:text-[15px] transition-all ${activeTab === t.id ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete GD Preparation Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Master <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Group Discussions</span><br />& Stand Out
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            GD types, hot topics with ready points, do's & don'ts, evaluation criteria, and proven strategies to make a strong impression.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {[['4', 'GD Types'], ['6', 'Hot Topics'], ['5', 'Eval Criteria'], ['4', 'Stages']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-amber-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>
 
      {/* STICKY TABS */}
      <div className="bg-white border-b border-slate-200 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-6 py-16">
 
        {/* ══════ GD GUIDE ══════ */}
        {activeTab === 'guide' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📋 How a GD Works</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Understand every phase so you can plan your strategy before the discussion begins.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
              {gdStages.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6" style={{ borderTop: `4px solid ${s.color}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${s.color}18` }}>{s.icon}</div>
                  <h3 className="font-extrabold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
 
            {/* Evaluation Criteria */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">📊 How You Are Evaluated</h3>
              <p className="text-slate-500 text-sm mb-7">Evaluators score you across 5 key dimensions. Know these — then optimize for all of them.</p>
              <div className="space-y-4">
                {evaluationCriteria.map((e, i) => (
                  <div key={i} className="flex items-center gap-5 p-4 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${e.color}18` }}>{e.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-extrabold text-slate-800">{e.criteria}</h4>
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: e.color }}>{e.weight}</span>
                      </div>
                      <p className="text-slate-500 text-sm">{e.desc}</p>
                    </div>
                    <div className="w-32 hidden md:block">
                      <div className="bg-slate-100 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: e.weight, backgroundColor: e.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Opening Lines */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🎙️ Powerful Opening Lines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '"I\'d like to kick off the discussion. The topic raises a fundamental question about..."',
                  '"Before we dive in, let me frame what I think are the 3 key dimensions here..."',
                  '"Building on what [Name] just said, I think the crux of the issue is..."',
                  '"There are two sides to this. Let me start by acknowledging the strongest argument for..."',
                ].map((line, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4">
                    <p className="text-slate-300 text-sm italic">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ══════ GD TYPES ══════ */}
        {activeTab === 'types' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🗂️ Types of Group Discussions</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Each GD type requires a different strategy. Know what you're walking into.</p>
            </div>
            <div className="space-y-4">
              {gdTypes.map((type, i) => {
                const isOpen = openType === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: type.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenType(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${type.color}18` }}>{type.icon}</div>
                      <h3 className="font-extrabold text-slate-800 text-xl flex-1">{type.type}</h3>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="rounded-2xl p-5 border" style={{ backgroundColor: `${type.color}08`, borderColor: `${type.color}30` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: type.color }}>What It Is</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{type.desc}</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Sample Topics</p>
                          {type.examples.map((ex, j) => (
                            <div key={j} className="flex items-start gap-2 mb-2 text-sm text-slate-600">
                              <span style={{ color: type.color }} className="font-bold flex-shrink-0">→</span>{ex}
                            </div>
                          ))}
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">💡 Strategy</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{type.tip}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
 
        {/* ══════ HOT TOPICS ══════ */}
        {activeTab === 'topics' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🔥 Hot GD Topics 2024</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Most likely topics with ready-to-use key points for each side of the debate.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotTopics.map((t, i) => {
                const isOpen = openTopic === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: t.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setOpenTopic(isOpen ? null : i)}>
                      <div className="flex-1">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-2 inline-block" style={{ backgroundColor: t.color }}>{t.category}</span>
                        <h3 className="font-extrabold text-slate-800 text-lg mt-1">{t.topic}</h3>
                      </div>
                      <span className={`text-slate-400 text-lg transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: t.color }}>Key Points to Use</p>
                        <div className="space-y-2">
                          {t.points.map((p, j) => (
                            <div key={j} className="flex items-start gap-3 p-3 rounded-xl text-sm text-slate-700"
                              style={{ backgroundColor: `${t.color}08` }}>
                              <span className="font-extrabold flex-shrink-0" style={{ color: t.color }}>{j + 1}.</span>{p}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
 
        {/* ══════ TIPS & MISTAKES ══════ */}
        {activeTab === 'tips' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💡 Do's, Don'ts & Pro Strategies</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">The difference between a selected and rejected candidate often comes down to these.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-7">
                <h3 className="text-2xl font-extrabold text-green-700 mb-6">✅ Always DO These</h3>
                <div className="space-y-3">
                  {dosList.map((d, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                      <span className="text-xl flex-shrink-0">{d.icon}</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{d.point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-7">
                <h3 className="text-2xl font-extrabold text-red-700 mb-6">🚫 Never DO These</h3>
                <div className="space-y-3">
                  {dontsList.map((d, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-red-100 shadow-sm">
                      <span className="text-xl flex-shrink-0">{d.icon}</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{d.point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Pro Strategies */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🎯 Pro Strategies That Win GDs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: '⚡', title: 'The Bridge Technique', color: '#3B82F6', desc: 'When the discussion drifts off-topic, say: "That\'s a great point — bringing it back to the core question, I think..." This shows leadership without confrontation.' },
                  { icon: '🔄', title: 'Summarize Mid-GD', color: '#10B981', desc: 'Halfway through, briefly recap: "So far we\'ve discussed X and Y — let\'s also consider Z." This shows listening skills and earns you extra visibility.' },
                  { icon: '🎭', title: 'Devil\'s Advocate', color: '#F59E0B', desc: 'If everyone agrees, play devil\'s advocate: "I see the consensus, but let me raise a counterpoint we shouldn\'t ignore..." Evaluators love critical thinkers.' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <h4 className="font-extrabold text-white">{s.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
 
      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">GD</span>
            </div>
            <span className="text-white font-bold text-lg">GroupDiscussionPrep</span>
          </div>
          <p className="text-sm mb-4">Master every GD type and walk in with confidence and strong talking points.</p>
          <div className="flex justify-center gap-5 text-sm text-slate-500 mb-4">
            {tabs.map(t => <span key={t.id}>{t.icon} {t.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
          © 2026 aiplacprep@gmail.com   Built for students and professionals preparing for campus and corporate GDs.
          </p>
        </div>
      </footer>
    </div>
  )
}
 
export default GD