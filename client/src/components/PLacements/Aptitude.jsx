import React, { useState } from 'react'
import logo from '../../assets/image.png';
import { useNavigate } from 'react-router-dom';
// ─── DATA ───────────────────────────────────────────────────────────────────

const sections = [
    {
        id: 'numerical',
        title: 'Numerical Ability',
        icon: '🔢',
        color: '#3B82F6',
        darkColor: '#1d4ed8',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        badge: 'bg-blue-600',
        topics: [
            {
                name: 'Number System',
                subtopics: ['Natural, Whole, Integer, Rational Numbers', 'LCM & HCF', 'Divisibility Rules', 'Prime & Composite Numbers', 'Remainders & Modular Arithmetic'],
                notes: `
• Types of Numbers:
Natural (1,2,3...), Whole (0,1,2...), Integers (-2,-1,0,1...), Rational (p/q), Irrational (√2, π), Real Numbers.

• Even/Odd:
Even divisible by 2, Odd not divisible by 2.

• Prime & Composite:
Prime → only 2 factors (2,3,5,7), Composite → more factors.

• LCM & HCF:
LCM = smallest multiple, HCF = greatest divisor.
For 2 numbers: LCM × HCF = Product.

• Divisibility Rules:
2 → even, 3 → sum divisible by 3, 5 → ends with 0/5, 9 → sum divisible by 9.

• Remainder:
Dividend = Divisor × Quotient + Remainder.

• Modular Arithmetic:
(a + b) mod n = [(a mod n)+(b mod n)] mod n.
`,
                sample: { q: 'Find the LCM of 12, 18, and 24.', a: '72', hint: 'Prime factorization method' },
            },

            {
                name: 'Percentages',
                subtopics: ['Percent Change', 'Percentage of a number', 'Successive % changes', 'Profit & Loss using %', 'Population problems'],
                notes: `
• Basic:
Percentage = (Value/Total) × 100

• Increase/Decrease:
New Value = Original × (1 ± %/100)

• Successive Change:
Net % = a + b + (ab/100)

• Profit/Loss:
Profit% = (Profit/CP)×100

• Population:
Use compound growth formula.
`,
                sample: { q: 'Price increased by 20% then decreased by 20%.', a: '-4%', hint: 'Multiply factors 1.2 × 0.8' },
            },

            {
                name: 'Ratio & Proportion',
                subtopics: ['Simple Ratios', 'Compound Ratios', 'Direct & Inverse Proportion', 'Partnership', 'Mixtures'],
                notes: `
• Ratio:
a:b = a/b

• Proportion:
a/b = c/d

• Direct Proportion:
More → More

• Inverse:
More → Less

• Mixture:
Use Alligation method.

• Partnership:
Profit ∝ Investment × Time
`,
                sample: { q: 'A:B=3:4, B:C=2:3 find A:C', a: '1:2', hint: 'Make B same' },
            },

            {
                name: 'Time, Speed & Distance',
                subtopics: ['Speed formula', 'Average Speed', 'Relative Speed', 'Trains & Boats'],
                notes: `
• Speed = Distance/Time

• Average Speed:
Total Distance / Total Time

• Relative Speed:
Opposite → add, Same → subtract

• Trains:
Time = Length / Speed

• Boats:
Downstream = u+v, Upstream = u−v
`,
                sample: { q: 'Train passes pole', a: '36 km/h', hint: 'Convert m/s to km/h' },
            },

            {
                name: 'Time & Work',
                subtopics: ['Work Rate', 'Combined Work', 'Pipes', 'Efficiency'],
                notes: `
• Work = Rate × Time

• If A takes x days → 1 day work = 1/x

• Combined Work:
Add efficiencies

• Pipes:
Inlet positive, Outlet negative
`,
                sample: { q: 'A=10 days, B=15 days', a: '6 days', hint: 'Add rates' },
            },

            {
                name: 'Profit & Loss',
                subtopics: ['CP, SP', 'Profit %', 'Discount', 'Marked Price'],
                notes: `
• Profit = SP - CP
• Loss = CP - SP

• Profit% = (Profit/CP)×100

• Discount:
Discount = MP - SP

• Successive Discount:
Multiply factors
`,
                sample: { q: 'CP=400 SP=500', a: '25%', hint: 'Profit formula' },
            },

            {
                name: 'Simple & Compound Interest',
                subtopics: ['SI', 'CI', 'Half-yearly', 'Difference'],
                notes: `
• SI = (P×R×T)/100

• CI = P(1 + R/100)^T

• Half yearly:
R/2, T×2

• Difference:
CI > SI always
`,
                sample: { q: 'CI on 1000 at 10% for 2 yrs', a: '210', hint: 'Use formula' },
            },

            {
                name: 'Averages',
                subtopics: ['Mean', 'Weighted', 'Age Problems'],
                notes: `
• Average = Sum / Count

• New avg:
Update total sum

• Weighted Avg:
Use weights
`,
                sample: { q: 'Avg=20 of 5 nums, new avg=22', a: '32', hint: 'Find total difference' },
            },

            {
                name: 'Algebra & Equations',
                subtopics: ['Linear', 'Quadratic', 'Indices', 'Logs'],
                notes: `
• Linear:
ax+b=0

• Quadratic:
ax²+bx+c=0

• Indices:
a^m × a^n = a^(m+n)

• Logs:
log(ab)=log a + log b
`,
                sample: { q: '2x+3=11', a: '4', hint: 'Solve equation' },
            },

            {
                name: 'Geometry & Mensuration',
                subtopics: ['Area', 'Volume', 'Circles', 'Triangles'],
                notes: `
• Area:
Circle = πr²
Rectangle = l×b

• Volume:
Cube = a³

• Pythagoras:
a² + b² = c²
`,
                sample: { q: 'Area of circle r=7', a: '154', hint: 'πr²' },
            },

            {
                name: 'Permutation & Combination',
                subtopics: ['Factorial', 'nPr', 'nCr'],
                notes: `
• n! = n×(n−1)!

• nPr = n!/(n-r)!

• nCr = n!/[r!(n-r)!]

• Circular:
(n−1)!
`,
                sample: { q: '4 people sit', a: '24', hint: '4!' },
            },

            {
                name: 'Probability',
                subtopics: ['Basic', 'Addition rule', 'Conditional'],
                notes: `
• P(E) = Favourable / Total

• Addition:
P(A∪B)=P(A)+P(B)-P(A∩B)

• Independent:
P(A∩B)=P(A)×P(B)
`,
                sample: { q: 'Coin toss', a: '1/2', hint: '2 outcomes' },
            },
        ],
    },
    {
        id: 'reasoning',
        title: 'Reasoning Ability',
        icon: '🧩',
        color: '#8B5CF6',
        darkColor: '#6d28d9',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        badge: 'bg-purple-600',
        topics: [
            {
                name: 'Series Completion',
                subtopics: ['Number Series', 'Letter Series', 'Alpha-Numeric Series', 'Mixed Series', 'Find the Missing Term'],
                notes: `
• Types:
Number series, Alphabet series, Mixed series.

• Pattern Types:
- Arithmetic (+, -)
- Geometric (×, ÷)
- Squares/Cubes
- Alternating patterns

• Trick:
Find difference between terms.

• Example:
2,6,12,20 → +4,+6,+8,+10
`,
                sample: { q: '2, 6, 12, 20, 30, ?', a: '42', hint: 'Increasing difference pattern' },
            },

            {
                name: 'Analogies',
                subtopics: ['Word Analogies', 'Number Analogies', 'Letter Analogies', 'Semantic Analogies', 'Part-Whole Analogies'],
                notes: `
• Analogy means relation between two pairs.

• Types:
- Synonym/Antonym
- Part-Whole
- Cause-Effect

• Trick:
Find relationship in first pair, apply to second.

Example:
Doctor : Hospital → Teacher : School
`,
                sample: { q: 'Doctor : Hospital :: Teacher : ?', a: 'School', hint: 'Workplace relation' },
            },

            {
                name: 'Coding & Decoding',
                subtopics: ['Letter Shifting', 'Number Coding', 'Symbol Coding', 'Reverse Coding', 'Mixed Coding'],
                notes: `
• Types:
- Letter shifting (A=1, B=2)
- Reverse coding
- Symbol substitution

• Trick:
Check position of letters.

Example:
CAT = 3-1-20
`,
                sample: { q: 'CAT = 3120, DOG = ?', a: '4157', hint: 'Alphabet positions' },
            },

            {
                name: 'Blood Relations',
                subtopics: ['Family Tree', 'Gender-based Relations', 'Coded Relations', 'Generation Relations', 'Mixed Puzzles'],
                notes: `
• Key relations:
Father, Mother, Brother, Sister

• Trick:
- Draw family tree
- Identify generations

• Common:
Grandfather = father’s father
`,
                sample: { q: 'A is B’s sister...', a: 'Granddaughter', hint: 'Use family tree' },
            },

            {
                name: 'Direction Sense',
                subtopics: ['Cardinal Directions', 'Turns & Movement', 'Shadow Problems', 'Distance Calculation', 'Final Direction'],
                notes: `
• Directions:
North, South, East, West

• Turns:
Right → clockwise
Left → anti-clockwise

• Trick:
Draw diagram step-by-step
`,
                sample: { q: 'Walk north then right?', a: 'East', hint: 'Right turn from north = east' },
            },

            {
                name: 'Logical Puzzles',
                subtopics: ['Seating Arrangement', 'Floor-based Puzzles', 'Box/Stack Puzzles', 'Comparison Puzzles', 'Grid Puzzles'],
                notes: `
• Types:
- Linear seating
- Circular seating
- Floor puzzles

• Trick:
Use table/grid

• Important:
Read all conditions carefully
`,
                sample: { q: 'All cats are dogs...', a: 'Yes', hint: 'Syllogism logic' },
            },

            {
                name: 'Syllogisms',
                subtopics: ['All-Some-No statements', 'Venn Diagram Method', 'Conclusions validity', 'Negative Statements', 'Possibility Cases'],
                notes: `
• Statements:
All A are B
Some A are B
No A is B

• Method:
Use Venn diagram

• Rule:
Conclusion must follow logically
`,
                sample: { q: 'All A are B...', a: 'Yes', hint: 'Use Venn diagram' },
            },

            {
                name: 'Data Interpretation',
                subtopics: ['Bar Graphs', 'Pie Charts', 'Line Graphs', 'Tables', 'Mixed Charts'],
                notes: `
• Types:
Bar, Pie, Line graph

• Trick:
- Read data carefully
- Convert % to values

• Formula:
Percentage = (value/total)×100
`,
                sample: { q: 'Profit % in pie chart?', a: '₹20,000', hint: '25% of total' },
            },

            {
                name: 'Clocks & Calendars',
                subtopics: ['Angle between hands', 'Minute & Hour overlap', 'Day calculation', 'Odd days', 'Leap Year'],
                notes: `
• Clock:
Angle = |30H - 5.5M|

• Calendar:
Leap year = divisible by 4

• Odd Days:
Used to find day of week
`,
                sample: { q: 'Angle at 3:00?', a: '90°', hint: 'Basic position' },
            },

            {
                name: 'Visual / Non-Verbal Reasoning',
                subtopics: ['Pattern Completion', 'Mirror Images', 'Water Images', 'Paper Folding', 'Figure Classification'],
                notes: `
• Types:
Mirror image, Paper folding, Pattern

• Trick:
Visualize transformation

• Practice required for speed
`,
                sample: { q: 'Square folded diagonally?', a: '2', hint: 'Forms triangles' },
            },
        ],
    },
    {
        id: 'verbal',
        title: 'Verbal Ability',
        icon: '📝',
        color: '#10B981',
        darkColor: '#047857',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-600',

        topics: [
            {
                name: 'Vocabulary',
                subtopics: ['Synonyms', 'Antonyms', 'One-Word Substitution', 'Idioms & Phrases', 'Foreign Words in English'],
                notes: `
• Vocabulary includes meanings of words.

• Synonyms:
Words with similar meanings (Happy = Joyful)

• Antonyms:
Opposite words (Hot = Cold)

• One-word substitution:
Phrase → single word (One who teaches = Teacher)

• Idioms:
Phrases with hidden meanings (Break the ice = start conversation)

• Tip:
Read daily + revise word lists
`,
                sample: { q: 'Synonym of "Benevolent"?', a: 'Kind / Generous', hint: 'Benevolent = kind nature' },
            },

            {
                name: 'Reading Comprehension',
                subtopics: ['Main Idea', 'Inference Questions', 'Tone & Attitude', 'Vocabulary in context', 'Author\'s Purpose'],
                notes: `
• RC tests understanding of passages.

• Main Idea:
Central theme of passage

• Inference:
Read between the lines

• Tone:
Author’s attitude (positive, negative, neutral)

• Tip:
- Read questions first
- Skim passage
`,
                sample: { q: 'CEO vision pragmatic tone?', a: 'Practical', hint: 'Pragmatic = practical' },
            },

            {
                name: 'Grammar',
                subtopics: ['Tenses', 'Subject-Verb Agreement', 'Articles', 'Prepositions', 'Voice'],
                notes: `
• Tenses:
Past, Present, Future

• Subject-Verb Agreement:
He/She → singular verb

• Articles:
a, an, the

• Prepositions:
in, on, at

• Voice:
Active → Passive

Example:
She eats → Food is eaten by her
`,
                sample: { q: 'She ___ to school', a: 'goes', hint: '3rd person singular' },
            },

            {
                name: 'Sentence Correction',
                subtopics: ['Errors', 'Redundancy', 'Parallelism', 'Modifiers', 'Word Usage'],
                notes: `
• Find grammatical mistakes

• Check:
- Subject-verb agreement
- Tense
- Word usage

• Avoid redundancy:
Repeat words unnecessarily

• Tip:
Read sentence carefully
`,
                sample: { q: 'Each of boys have...', a: 'has', hint: 'Each = singular' },
            },

            {
                name: 'Sentence Completion',
                subtopics: ['Context', 'Conjunctions', 'Double blanks', 'Tone', 'Cause-effect'],
                notes: `
• Fill correct word in blank

• Based on:
- Meaning
- Tone
- Grammar

• Double blanks:
Eliminate wrong options

• Tip:
Read full sentence carefully
`,
                sample: { q: 'Despite tired...', a: 'still', hint: 'Shows contrast' },
            },

            {
                name: 'Para Jumbles',
                subtopics: ['Opening sentence', 'Pairs', 'Pronoun link', 'Sequence', 'Conclusion'],
                notes: `
• Arrange sentences logically

• Steps:
- Find opening sentence
- Identify links
- Use pronouns

• Tip:
Look for logical flow (cause → effect)
`,
                sample: { q: 'Arrange sentences', a: 'Q → P → R', hint: 'Logical order' },
            },

            {
                name: 'Error Spotting',
                subtopics: ['Articles', 'Tense', 'Pronoun', 'Preposition', 'Agreement'],
                notes: `
• Find incorrect part

• Common errors:
- Singular/plural
- Tense mismatch
- Article misuse

• Tip:
Check each part carefully
`,
                sample: { q: 'best student error?', a: 'students', hint: 'Plural required' },
            },

            {
                name: 'Critical Reasoning',
                subtopics: ['Strengthen/Weaken', 'Assumptions', 'Paradox', 'Conclusion', 'Inference'],
                notes: `
• Logical thinking questions

• Types:
- Assumption
- Inference
- Strengthen/Weaken

• Trick:
Focus on argument logic

• Important:
Do not assume extra info
`,
                sample: { q: 'John passed exam', a: 'Not certain he studied', hint: 'Avoid assumption' },
            },
        ],
    },
]

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

const quizQuestions = [
    { id: 1, section: '🔢 Numerical', q: 'A train travels 360 km in 4 hours. Speed in m/s?', options: ['25 m/s', '30 m/s', '22.5 m/s', '20 m/s'], answer: 0, explanation: '360 km/4 h = 90 km/h = 90 × 1000/3600 = 25 m/s' },
    { id: 2, section: '🔢 Numerical', q: 'What is 15% of 240?', options: ['32', '36', '40', '38'], answer: 1, explanation: '15/100 × 240 = 36' },
    { id: 3, section: '🔢 Numerical', q: 'Simple interest on ₹2000 at 5% p.a. for 3 years?', options: ['₹250', '₹300', '₹350', '₹200'], answer: 1, explanation: 'SI = PRT/100 = 2000×5×3/100 = ₹300' },
    { id: 4, section: '🔢 Numerical', q: 'If 8 workers complete a job in 12 days, how many days for 6 workers?', options: ['14', '16', '18', '20'], answer: 1, explanation: 'Work = 8×12=96 days. 6 workers: 96/6 = 16 days' },
    { id: 5, section: '🔢 Numerical', q: 'A shopkeeper buys for ₹120, sells for ₹150. Profit %?', options: ['20%', '25%', '30%', '15%'], answer: 1, explanation: 'Profit = 30, Profit% = (30/120)×100 = 25%' },
    { id: 6, section: '🧩 Reasoning', q: 'Find next: 3, 9, 27, 81, ?', options: ['162', '243', '324', '270'], answer: 1, explanation: 'Each term ×3: 81×3 = 243' },
    { id: 7, section: '🧩 Reasoning', q: 'Book : Library :: Painting : ?', options: ['Artist', 'Canvas', 'Museum', 'Brush'], answer: 2, explanation: 'Books are kept in a Library; Paintings are kept in a Museum.' },
    { id: 8, section: '🧩 Reasoning', q: 'If MANGO is coded as NBOHI, APPLE is coded as?', options: ['BQQMF', 'BPQNF', 'BQQNF', 'CQQMF'], answer: 0, explanation: 'Each letter shifts +1: A→B, P→Q, P→Q, L→M, E→F = BQQMF' },
    { id: 9, section: '🧩 Reasoning', q: 'A man walks 5 km South, turns East, walks 3 km. How far from start?', options: ['8 km', '√34 km', '4 km', '6 km'], answer: 1, explanation: 'Pythagoras: √(5²+3²) = √34 km' },
    { id: 10, section: '🧩 Reasoning', q: 'Some cats are dogs. All dogs are animals. Which is valid?', options: ['All cats are animals', 'Some cats are animals', 'No cats are animals', 'All animals are cats'], answer: 1, explanation: 'Only "Some cats are animals" is definitely valid from the premises.' },
    { id: 11, section: '📝 Verbal', q: 'Antonym of "Verbose"?', options: ['Talkative', 'Concise', 'Fluent', 'Elaborate'], answer: 1, explanation: 'Verbose = using too many words. Antonym = Concise (brief and clear).' },
    { id: 12, section: '📝 Verbal', q: 'Choose correct: "Neither the boys nor the girl ___ present."', options: ['are', 'were', 'was', 'have been'], answer: 2, explanation: 'Neither...nor → verb agrees with the noun closest to it: "girl" is singular → "was"' },
    { id: 13, section: '📝 Verbal', q: 'Synonym of "Ephemeral"?', options: ['Permanent', 'Eternal', 'Transient', 'Durable'], answer: 2, explanation: 'Ephemeral = lasting for a very short time → Transient' },
    { id: 14, section: '📝 Verbal', q: '"She is good ___ English." Which preposition?', options: ['in', 'at', 'on', 'with'], answer: 1, explanation: '"Good at" is the correct prepositional phrase for skills.' },
    { id: 15, section: '🔢 Numerical', q: 'Average of first 10 natural numbers?', options: ['5', '5.5', '6', '4.5'], answer: 1, explanation: 'Sum = 55, Count = 10, Average = 55/10 = 5.5' },
    { id: 16, section: '🔢 Numerical', q: 'How many ways can letters of "CAT" be arranged?', options: ['3', '6', '9', '12'], answer: 1, explanation: '3! = 3×2×1 = 6 arrangements' },
    { id: 17, section: '🧩 Reasoning', q: 'Clock shows 6:00. Angle between hands?', options: ['90°', '120°', '180°', '270°'], answer: 2, explanation: 'At 6:00, hour hand at 180°, minute at 0° → angle = 180°' },
    { id: 18, section: '📝 Verbal', q: 'Spot the error: "The news are very shocking."', options: ['The', 'news', 'are', 'shocking'], answer: 2, explanation: '"News" is uncountable/singular → should be "is" not "are".' },
    { id: 19, section: '🔢 Numerical', q: 'Compound Interest on ₹5000 at 10% for 2 years?', options: ['₹1000', '₹1050', '₹1100', '₹950'], answer: 1, explanation: 'CI = 5000[(1.1²)−1] = 5000×0.21 = ₹1050' },
    { id: 20, section: '🧩 Reasoning', q: 'P is taller than Q. R is shorter than P. Q is taller than R. Who is shortest?', options: ['P', 'Q', 'R', 'Cannot determine'], answer: 2, explanation: 'P > Q > R → R is the shortest.' },
]

// ─── PLATFORMS ────────────────────────────────────────────────────────────────

const platforms = [
    { name: 'IndiaBix', icon: '🇮🇳', desc: 'Best for aptitude practice with category-wise questions. Covers all major exam patterns.', tags: ['Free', 'All Topics', 'Mock Tests'], color: '#f97316', url: 'https://www.indiabix.com' },
    { name: 'Testbook', icon: '📘', desc: 'Premium platform with live classes, mock tests, and AI-based analysis for govt exams.', tags: ['Mock Tests', 'Live Classes', 'Analytics'], color: '#3b82f6', url: 'https://testbook.com' },
    { name: 'Cracku', icon: '⚡', desc: 'Specialized for CAT, XAT, MBA entrance — detailed solutions and daily practice.', tags: ['CAT/MBA', 'Video Solutions', 'Daily Quiz'], color: '#8b5cf6', url: 'https://cracku.in' },
    { name: 'PrepInsta', icon: '🎯', desc: 'Tailored for placement preparation — TCS, Infosys, Wipro, Accenture specific tests.', tags: ['Placement', 'Company-wise', 'Free'], color: '#10b981', url: 'https://prepinsta.com' },
    { name: 'Brilliant.org', icon: '💡', desc: 'Interactive problem-solving platform for math and logical reasoning with visual explanations.', tags: ['Interactive', 'Math', 'Reasoning'], color: '#f59e0b', url: 'https://brilliant.org' },
    { name: 'Gradeup / BYJU\'s Exam Prep', icon: '🏆', desc: 'Comprehensive platform for SSC, Banking, Railways with full-length mock tests.', tags: ['SSC/Banking', 'Mock Tests', 'Current Affairs'], color: '#ef4444', url: 'https://byjusexamprep.com' },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Aptitude = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('numerical')
    const [openTopic, setOpenTopic] = useState(null)
    const [quizAnswers, setQuizAnswers] = useState({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const [activeQuizSection, setActiveQuizSection] = useState('All')

    const currentSection = sections.find(s => s.id === activeSection)

    const handleAnswer = (qId, optIdx) => {
        if (quizSubmitted) return
        setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }))
    }

    const handleSubmit = () => {
        if (Object.keys(quizAnswers).length === 0) return
        setQuizSubmitted(true)
    }

    const handleReset = () => {
        setQuizAnswers({})
        setQuizSubmitted(false)
    }

// ✅ FIRST define filteredQuiz
const filteredQuiz = activeQuizSection === 'All'
    ? quizQuestions
    : quizQuestions.filter(q => q.section.includes(activeQuizSection))

// ✅ THEN calculate score
const score = quizSubmitted
    ? filteredQuiz.filter(q => quizAnswers[q.id] === q.answer).length
    : 0

    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* ── NAVBAR ── */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img onClick={() => navigate("/")}
                            src={logo}
                            alt="logo"
                            className="w-42 sm:w-45 cursor-pointer rounded-xl"
                        />
                    </div>
                    <div className="hidden md:flex gap-6 text-sm font-medium md:text-[20px] text-slate-800">
                        <a href="#topics" className="hover:text-blue-600 transition-colors">Topics</a>
                        <a href="#quiz" className="hover:text-blue-600 transition-colors">Practice Quiz</a>
                        <a href="#platforms" className="hover:text-blue-600 transition-colors">Platforms</a>
                    </div>

                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                        Complete Aptitude Guide
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
                        Master <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Aptitude</span><br />From Zero to Hero
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                        Complete coverage of Numerical Ability, Reasoning, and Verbal Ability — with topics, subtopics, sample problems, interactive quiz, and top practice platforms.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {sections.map(s => (
                            <div key={s.id} className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2">
                                <span className="text-xl">{s.icon}</span>
                                <span className="font-semibold text-sm">{s.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                        {[['30+', 'Topics'], ['100+', 'Subtopics'], ['20', 'Quiz Questions']].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-3xl font-extrabold text-blue-400">{val}</div>
                                <div className="text-slate-400 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION TABS ── */}
            <div className="bg-white border-b border-slate-200 sticky top-[65px] z-40">
                <div className="max-w-7xl mx-auto px-6 flex gap-2 py-3">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => { setActiveSection(s.id); setOpenTopic(null) }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeSection === s.id ? 'text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            style={activeSection === s.id ? { backgroundColor: s.color } : {}}
                        >
                            <span>{s.icon}</span> {s.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── TOPICS ── */}
            <section id="topics" className="max-w-7xl mx-auto px-6 py-16">
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
                        {currentSection.icon} {currentSection.title}
                    </h2>
                    <p className="text-slate-500">
                        Click any topic to expand subtopics and see a sample question.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {currentSection.topics.map((topic, i) => {
                        const isOpen = openTopic === `${activeSection}-${i}`;

                        return (
                            <div
                                key={i}
                                className={`
            bg-white rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden
            ${isOpen
                                        ? "col-span-1 md:col-span-2 xl:col-span-3 border-2 shadow-lg scale-[1.02]"
                                        : "border-slate-200 hover:shadow-md"
                                    }
          `}
                                style={isOpen ? { borderColor: currentSection.color } : {}}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-5 text-left"
                                    onClick={() =>
                                        setOpenTopic(isOpen ? null : `${activeSection}-${i}`)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-extrabold"
                                            style={{ backgroundColor: currentSection.color }}
                                        >
                                            {i + 1}
                                        </div>
                                        <span className="font-bold text-slate-800">
                                            {topic.name}
                                        </span>
                                    </div>
                                    <span
                                        className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 space-y-4">

                                        {/* ✅ NOTES SECTION ADDED */}
                                        <div className="bg-white border rounded-xl p-4">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                                📘 Notes
                                            </p>
                                            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-64 overflow-y-auto">
                                                {topic.notes}
                                            </p>
                                        </div>

                                        {/* Subtopics */}
                                        <div
                                            className={`${currentSection.bg} ${currentSection.border} border rounded-xl p-4`}
                                        >
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                                Subtopics
                                            </p>
                                            <ul className="space-y-1">
                                                {topic.subtopics.map((sub, j) => (
                                                    <li
                                                        key={j}
                                                        className="flex items-center gap-2 text-sm text-slate-700"
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: currentSection.color }}
                                                        />
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Sample Question */}
                                        <div className="bg-slate-900 rounded-xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                📌 Sample Question
                                            </p>
                                            <p className="text-white text-sm font-medium mb-3">
                                                {topic.sample.q}
                                            </p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span
                                                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                                                    style={{ backgroundColor: currentSection.color }}
                                                >
                                                    Answer: {topic.sample.a}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-xs mt-2">
                                                💡 {topic.sample.hint}
                                            </p>
                                        </div>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── QUIZ ── */}
            <section id="quiz" className="bg-white border-y border-slate-200 py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🎯 Practice Quiz</h2>
                        <p className="text-slate-500 text-lg">20 questions across all three sections. Select an answer and submit!</p>
                    </div>

                    {/* Quiz filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['All', 'Numerical', 'Reasoning', 'Verbal'].map(f => (
                            <button key={f} onClick={() => setActiveQuizSection(f)}
                                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${activeQuizSection === f
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                                    }`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Score banner */}
                    {quizSubmitted && (
                        <div className={`rounded-2xl p-5 mb-8 text-center border-2 ${score >= 15 ? 'bg-green-50 border-green-400' : score >= 10 ? 'bg-amber-50 border-amber-400' : 'bg-red-50 border-red-400'
                            }`}>
                            <p className="text-3xl font-extrabold mb-1">
                                {score >= 15 ? '🎉' : score >= 10 ? '👍' : '😅'} Score: {score} / {filteredQuiz.length}
                            </p>
                            <p className={`font-semibold ${score >= 15 ? 'text-green-700' : score >= 10 ? 'text-amber-700' : 'text-red-700'}`}>
                                {score >= 15 ? 'Excellent! You\'re quiz-ready!' : score >= 10 ? 'Good effort! Review the wrong ones.' : 'Keep practicing — you\'ll get there!'}
                            </p>
                        </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-6">
                        {filteredQuiz.map((q, qi) => {
                            const selected = quizAnswers[q.id]
                            const isAnswered = selected !== undefined
                            const isCorrect = selected === q.answer

                            return (
                                <div key={q.id} className={`rounded-2xl border-2 p-6 transition-all ${!quizSubmitted ? 'border-slate-200 bg-white' :
                                        isAnswered && isCorrect ? 'border-green-400 bg-green-50' :
                                            isAnswered && !isCorrect ? 'border-red-400 bg-red-50' :
                                                'border-slate-200 bg-white'
                                    }`}>
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                                            {qi + 1}
                                        </span>
                                        <div>
                                            <span className="text-xs font-bold text-slate-400 block mb-1">{q.section}</span>
                                            <p className="text-slate-800 font-semibold">{q.q}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {q.options.map((opt, oi) => {
                                            let btnClass = 'border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50'

                                            if (quizSubmitted) {
                                                if (oi === q.answer) {
                                                    btnClass = 'border-2 border-green-500 bg-green-500 text-white'
                                                } else if (oi === selected && selected !== q.answer) {
                                                    btnClass = 'border-2 border-red-500 bg-red-500 text-white'
                                                } else {
                                                    btnClass = 'border-2 border-slate-200 bg-slate-100 text-slate-400'
                                                }
                                            } else if (selected === oi) {
                                                btnClass = 'border-2 border-blue-500 bg-blue-500 text-white'
                                            }

                                            return (
                                                <button key={oi} onClick={() => handleAnswer(q.id, oi)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${btnClass} ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'}`}>
                                                    <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                                                    {quizSubmitted && oi === q.answer && <span className="ml-2">✓</span>}
                                                    {quizSubmitted && oi === selected && selected !== q.answer && <span className="ml-2">✗</span>}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {quizSubmitted && (
                                        <div className="mt-4 bg-white/80 rounded-xl px-4 py-3 border border-slate-200">
                                            <p className="text-xs font-bold text-blue-700 mb-1">💡 Explanation</p>
                                            <p className="text-sm text-slate-600">{q.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Submit / Reset */}
                    <div className="flex justify-center gap-4 mt-10">
                        {!quizSubmitted ? (
                            <button onClick={handleSubmit}
                                disabled={Object.keys(quizAnswers).length === 0}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
                                Submit Quiz →
                            </button>
                        ) : (
                            <button onClick={handleReset}
                                className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
                                🔄 Try Again
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ── PLATFORMS ── */}
            <section id="platforms" className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🌐 Best Aptitude Practice Platforms</h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">Top websites to sharpen your aptitude for placements, competitive exams & more.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {platforms.map(p => (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: `${p.color}18` }}>
                                    {p.icon}
                                </div>
                                <h4 className="text-lg font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {p.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 rounded-full font-semibold text-white"
                                        style={{ backgroundColor: p.color }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs font-bold mt-4 transition-colors" style={{ color: p.color }}>
                                Visit {p.name} →
                            </p>
                        </a>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-slate-900 text-slate-400 py-10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="text-white font-bold text-lg">AptitudeHub</span>
                    </div>
                    <p className="text-sm mb-4">Your complete guide to Numerical, Reasoning & Verbal Aptitude.</p>
                    <div className="flex justify-center gap-6 text-sm text-slate-500 mb-4">
                        {sections.map(s => <span key={s.id}>{s.icon} {s.title}</span>)}
                    </div>
                    <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
                        © 2026 aiplacprep@gmail.com   Built for students preparing for placements & competitive exams.
                    </p>
                </div>
            </footer>

        </div>
    )
}

export default Aptitude