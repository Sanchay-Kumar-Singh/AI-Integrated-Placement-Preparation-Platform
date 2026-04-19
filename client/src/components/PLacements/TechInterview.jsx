import React, { useState } from 'react'
import logo from '../../assets/image.png';
import { useNavigate } from 'react-router-dom'
// ─── DATA ─────────────────────────────────────────────────────────────────

const navSections = [
  { id: 'overview', label: 'Overview', icon: '🗺️' },
  { id: 'dsa', label: 'DSA', icon: '🧠' },
  { id: 'system', label: 'System Design', icon: '🏗️' },
  { id: 'behavioral', label: 'Behavioral', icon: '🗣️' },
  { id: 'languages', label: 'Languages', icon: '💻' },
  { id: 'rounds', label: 'Round Guide', icon: '🔄' },
  { id: 'resources', label: 'Resources', icon: '📚' },
]

const overviewStages = [
  { step: '01', title: 'Resume Screening', icon: '📄', color: '#3B82F6', desc: 'ATS + recruiter filters your resume. Keywords from JD must match. Average 6–10 seconds per resume.', duration: 'Day 1–7', tips: ['Tailor resume per JD', 'ATS-friendly format', 'Quantify achievements'] },
  { step: '02', title: 'Online Assessment', icon: '💻', color: '#8B5CF6', desc: 'Coding test (HackerRank, Codility, etc.) with 2–3 algorithmic problems under timed conditions.', duration: '60–90 min', tips: ['Practice LeetCode daily', 'Read problems fully before coding', 'Test edge cases'] },
  { step: '03', title: 'Technical Phone Screen', icon: '📞', color: '#10B981', desc: 'Live coding on shared editor + conceptual CS questions. 1 interviewer, 45–60 minutes.', duration: '45–60 min', tips: ['Think out loud always', 'Clarify before coding', 'Ask about constraints'] },
  { step: '04', title: 'Technical Interviews (x2–4)', icon: '🧩', color: '#F59E0B', desc: 'DSA problems + System Design (for senior roles) + language-specific + code review discussions.', duration: '45 min each', tips: ['Start with brute force', 'Optimize step by step', 'Write clean readable code'] },
  { step: '05', title: 'Behavioral / HR Round', icon: '🤝', color: '#EF4444', desc: 'STAR-format stories testing leadership, conflict resolution, failure handling, and team fit.', duration: '30–45 min', tips: ['Prepare 8–10 STAR stories', 'Know company values', 'Be specific, not generic'] },
  { step: '06', title: 'Offer & Negotiation', icon: '🏆', color: '#06B6D4', desc: 'Compensation discussion, benefits, start date, RSUs, signing bonus — all negotiable.', duration: '1–5 days', tips: ['Never accept first offer', 'Research market rates on Levels.fyi', 'Get everything in writing'] },
]

const dsaTopics = [
  {
    category: 'Arrays & Strings',
    icon: '📊',
    color: '#3B82F6',
    importance: 'Very High',
    topics: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Kadane\'s Algorithm', 'Binary Search on Arrays', 'String Manipulation', 'Anagram Problems'],
    questions: [
      { q: 'Two Sum', diff: 'Easy', pattern: 'Hash Map' },
      { q: 'Longest Substring Without Repeat', diff: 'Medium', pattern: 'Sliding Window' },
      { q: 'Trapping Rain Water', diff: 'Hard', pattern: 'Two Pointers' },
      { q: 'Median of Two Sorted Arrays', diff: 'Hard', pattern: 'Binary Search' },
    ],
    tip: 'Master sliding window and two pointers — they appear in 40% of array problems.',
  },
  {
    category: 'Linked Lists',
    icon: '🔗',
    color: '#8B5CF6',
    importance: 'High',
    topics: ['Fast & Slow Pointers', 'Reversal', 'Merge Sorted Lists', 'Cycle Detection', 'Remove Nth Node', 'Deep Copy with Random Pointers'],
    questions: [
      { q: 'Reverse Linked List', diff: 'Easy', pattern: 'Iteration/Recursion' },
      { q: 'Linked List Cycle', diff: 'Easy', pattern: 'Floyd\'s Algorithm' },
      { q: 'Merge K Sorted Lists', diff: 'Hard', pattern: 'Min Heap' },
      { q: 'LRU Cache', diff: 'Medium', pattern: 'HashMap + DLL' },
    ],
    tip: 'Always draw the pointer operations. Never code linked list blindly.',
  },
  {
    category: 'Trees & Graphs',
    icon: '🌳',
    color: '#10B981',
    importance: 'Very High',
    topics: ['DFS / BFS', 'Binary Search Tree', 'Tree Traversals', 'Lowest Common Ancestor', 'Topological Sort', 'Dijkstra\'s Algorithm', 'Union Find'],
    questions: [
      { q: 'Binary Tree Level Order Traversal', diff: 'Medium', pattern: 'BFS' },
      { q: 'Number of Islands', diff: 'Medium', pattern: 'DFS/BFS' },
      { q: 'Course Schedule', diff: 'Medium', pattern: 'Topological Sort' },
      { q: 'Word Ladder', diff: 'Hard', pattern: 'BFS' },
    ],
    tip: 'Trees appear in ~30% of FAANG interviews. Know DFS/BFS cold.',
  },
  {
    category: 'Dynamic Programming',
    icon: '⚡',
    color: '#F59E0B',
    importance: 'Very High',
    topics: ['Memoization', 'Tabulation', 'Knapsack Variants', 'Longest Common Subsequence', 'Coin Change', 'Palindromes', 'Matrix DP', 'State Machine DP'],
    questions: [
      { q: 'Climbing Stairs', diff: 'Easy', pattern: 'Fibonacci DP' },
      { q: 'Coin Change', diff: 'Medium', pattern: 'Unbounded Knapsack' },
      { q: 'Longest Increasing Subsequence', diff: 'Medium', pattern: 'DP + Binary Search' },
      { q: 'Edit Distance', diff: 'Hard', pattern: '2D DP' },
    ],
    tip: 'Start with recursion → add memoization → convert to tabulation. Always define state clearly.',
  },
  {
    category: 'Stacks & Queues',
    icon: '📚',
    color: '#EF4444',
    importance: 'High',
    topics: ['Monotonic Stack', 'Next Greater Element', 'Valid Parentheses', 'Min Stack', 'Queue using Stacks', 'BFS with Queue', 'Sliding Window Maximum'],
    questions: [
      { q: 'Valid Parentheses', diff: 'Easy', pattern: 'Stack' },
      { q: 'Daily Temperatures', diff: 'Medium', pattern: 'Monotonic Stack' },
      { q: 'Largest Rectangle in Histogram', diff: 'Hard', pattern: 'Monotonic Stack' },
      { q: 'Sliding Window Maximum', diff: 'Hard', pattern: 'Deque' },
    ],
    tip: 'Monotonic stack is the hidden gem — once you see it, you\'ll spot it everywhere.',
  },
  {
    category: 'Sorting & Searching',
    icon: '🔍',
    color: '#06B6D4',
    importance: 'Medium',
    topics: ['Binary Search Variants', 'QuickSort / MergeSort', 'Heap Sort', 'Search in Rotated Array', 'Find Peak Element', 'Kth Largest Element'],
    questions: [
      { q: 'Binary Search', diff: 'Easy', pattern: 'Classic Binary Search' },
      { q: 'Search in Rotated Sorted Array', diff: 'Medium', pattern: 'Modified Binary Search' },
      { q: 'Find Median from Data Stream', diff: 'Hard', pattern: 'Two Heaps' },
      { q: 'Kth Largest Element', diff: 'Medium', pattern: 'Min Heap / QuickSelect' },
    ],
    tip: 'Binary search applies to more than just sorted arrays — any monotonic condition can be binary searched.',
  },
  {
    category: 'Heaps & Priority Queues',
    icon: '⛰️',
    color: '#7C3AED',
    importance: 'Medium',
    topics: ['Min/Max Heap', 'Top K Elements', 'K Closest Points', 'Merge K Lists', 'Task Scheduler', 'Two Heaps Pattern'],
    questions: [
      { q: 'Kth Largest in Array', diff: 'Easy', pattern: 'Min Heap' },
      { q: 'Top K Frequent Elements', diff: 'Medium', pattern: 'Max Heap / Bucket Sort' },
      { q: 'Find Median from Data Stream', diff: 'Hard', pattern: 'Two Heaps' },
      { q: 'Task Scheduler', diff: 'Medium', pattern: 'Greedy + Heap' },
    ],
    tip: 'When you see "K largest/smallest/frequent" → think Heap immediately.',
  },
  {
    category: 'Backtracking',
    icon: '🔄',
    color: '#DC2626',
    importance: 'Medium',
    topics: ['Permutations', 'Combinations', 'Subsets', 'N-Queens', 'Word Search', 'Sudoku Solver', 'Palindrome Partitioning'],
    questions: [
      { q: 'Subsets', diff: 'Medium', pattern: 'Backtracking' },
      { q: 'Permutations', diff: 'Medium', pattern: 'Backtracking' },
      { q: 'N-Queens', diff: 'Hard', pattern: 'Backtracking' },
      { q: 'Word Search II', diff: 'Hard', pattern: 'Backtracking + Trie' },
    ],
    tip: 'Template: choose → explore → unchoose. Always apply pruning to avoid TLE.',
  },
]

const systemDesignTopics = [
  {
    title: 'Core Concepts',
    icon: '⚙️',
    color: '#3B82F6',
    items: [
      { name: 'Scalability', desc: 'Horizontal vs Vertical scaling, Load balancing, Auto-scaling groups' },
      { name: 'CAP Theorem', desc: 'Consistency, Availability, Partition Tolerance — you can only guarantee 2 of 3' },
      { name: 'ACID vs BASE', desc: 'Database transaction properties for SQL vs NoSQL systems' },
      { name: 'Latency vs Throughput', desc: 'Time for one request vs requests handled per second — key tradeoff' },
      { name: 'Caching', desc: 'Redis, Memcached, CDN — what to cache, TTL, eviction policies (LRU, LFU)' },
    ],
  },
  {
    title: 'Database Design',
    icon: '🗄️',
    color: '#10B981',
    items: [
      { name: 'SQL vs NoSQL', desc: 'When to use relational (MySQL, PostgreSQL) vs non-relational (MongoDB, Cassandra)' },
      { name: 'Database Sharding', desc: 'Horizontal partitioning — distribute data across multiple DB servers' },
      { name: 'Replication', desc: 'Master-slave, multi-master — for high availability and read scaling' },
      { name: 'Indexing', desc: 'B-Tree, Hash indexes — trade write speed for faster reads' },
      { name: 'Database Schema', desc: 'ER diagrams, normalization (1NF/2NF/3NF), denormalization for performance' },
    ],
  },
  {
    title: 'System Components',
    icon: '🔧',
    color: '#F59E0B',
    items: [
      { name: 'Load Balancer', desc: 'Round robin, Least connections, IP hash — distributes traffic evenly' },
      { name: 'Message Queue', desc: 'Kafka, RabbitMQ, SQS — async communication, decoupling services' },
      { name: 'CDN', desc: 'Cloudflare, Akamai — serve static assets from edge servers near users' },
      { name: 'API Gateway', desc: 'Rate limiting, authentication, routing, request/response transformation' },
      { name: 'Microservices', desc: 'Service boundaries, inter-service communication (REST, gRPC), service discovery' },
    ],
  },
  {
    title: 'Classic System Designs',
    icon: '🏛️',
    color: '#8B5CF6',
    items: [
      { name: 'Design URL Shortener', desc: 'Hash function, DB schema, redirect logic, analytics, rate limiting' },
      { name: 'Design Twitter Feed', desc: 'Fan-out on write vs read, timeline generation, celebrity problem' },
      { name: 'Design Netflix', desc: 'Video chunking, CDN strategy, adaptive bitrate streaming, recommendations' },
      { name: 'Design WhatsApp', desc: 'WebSockets, message queue, delivery receipts, end-to-end encryption' },
      { name: 'Design Uber', desc: 'Location tracking, matching algorithm, surge pricing, trip management' },
    ],
  },
]

const sdFramework = [
  { step: 'S', title: 'Situation', desc: 'Set the context. Where were you, what was your role, what was the situation?', example: '"At my previous company, we had a critical production outage affecting 50,000 users..."', color: '#3B82F6' },
  { step: 'T', title: 'Task', desc: 'What was your specific responsibility or challenge in that situation?', example: '"As the on-call engineer, I was responsible for identifying the root cause within 30 minutes..."', color: '#10B981' },
  { step: 'A', title: 'Action', desc: 'What specific steps did YOU take? Use "I" not "we". Be detailed.', example: '"I immediately rolled back the deployment, then analyzed logs using Datadog to identify the failing service..."', color: '#F59E0B' },
  { step: 'R', title: 'Result', desc: 'What was the measurable outcome? Numbers, impact, what you learned.', example: '"We restored service in 18 minutes, preventing ~$40K revenue loss. I then wrote a post-mortem..."', color: '#8B5CF6' },
]

const behavioralQuestions = [
  { category: 'Leadership', icon: '👑', color: '#F59E0B', questions: ['Tell me about a time you led a team through a difficult project.', 'Describe a situation where you had to make a tough decision without enough information.', 'How have you motivated a demotivated team member?', 'Tell me about a time you influenced without authority.'] },
  { category: 'Conflict Resolution', icon: '🤝', color: '#EF4444', questions: ['Tell me about a time you disagreed with your manager.', 'How did you handle a conflict with a coworker?', 'Describe a time you had to give difficult feedback.', 'Tell me about a time you failed. What did you learn?'] },
  { category: 'Problem Solving', icon: '🧩', color: '#3B82F6', questions: ['Tell me about the most complex technical problem you solved.', 'Describe a time you had to learn something new quickly.', 'How do you handle ambiguous requirements?', 'Tell me about a time you improved a process significantly.'] },
  { category: 'Ownership & Impact', icon: '🚀', color: '#10B981', questions: ['Tell me about a project you\'re most proud of.', 'Describe a time you went above and beyond your job description.', 'How have you contributed to your team\'s culture?', 'Tell me about a time you delivered under pressure.'] },
]

const languages = [
  {
    name: 'Python',
    icon: '🐍',
    color: '#3B82F6',
    useCase: 'Data Science, Backend, Scripting, ML',
    interviewTip: 'Know list comprehensions, generators, decorators, and built-in libraries (collections, itertools).',
    concepts: ['List/Dict/Set comprehensions', 'Lambda, map, filter, reduce', 'Generators & Iterators', 'Context Managers (with)', 'Decorators', 'OOP: __init__, __str__, __repr__', 'GIL & Multithreading'],
    snippet: `# Two Sum - Python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`,
  },
  {
    name: 'Java',
    icon: '☕',
    color: '#EF4444',
    useCase: 'Enterprise, Android, Backend APIs',
    interviewTip: 'Understand Collections (HashMap, TreeMap, PriorityQueue), generics, and Java 8+ streams.',
    concepts: ['Collections Framework', 'Java 8 Streams & Lambda', 'Generics', 'Exception Handling', 'Multithreading & Concurrency', 'JVM, JDK, JRE distinction', 'Garbage Collection'],
    snippet: `// Two Sum - Java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement))
            return new int[]{map.get(complement), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
  },
  {
    name: 'JavaScript',
    icon: '🟨',
    color: '#F59E0B',
    useCase: 'Frontend, Full Stack, Node.js',
    interviewTip: 'Know closures, promises, async/await, event loop, and prototype chain deeply.',
    concepts: ['Closures & Scope', 'Promises & async/await', 'Event Loop & Call Stack', 'Prototype & this keyword', 'ES6+ features (spread, destructuring)', 'DOM Manipulation', 'Higher-order functions'],
    snippet: `// Two Sum - JavaScript
function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement))
            return [seen.get(complement), i];
        seen.set(nums[i], i);
    }
}`,
  },
  {
    name: 'C++',
    icon: '⚙️',
    color: '#8B5CF6',
    useCase: 'Competitive Programming, Systems, Game Dev',
    interviewTip: 'Know STL (vector, map, set, priority_queue), pointers, and memory management.',
    concepts: ['STL Containers & Algorithms', 'Pointers & References', 'Memory Management (new/delete)', 'Templates', 'Smart Pointers', 'OOP: Virtual functions, Inheritance', 'Move Semantics (C++11)'],
    snippet: `// Two Sum - C++
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
  },
]

const roundGuide = [
  {
    company: 'Google',
    logo: '🔵',
    color: '#4285F4',
    rounds: [
      { name: 'OA (Kickstart/Foobar)', type: 'Coding', duration: '90 min', focus: '3 Algorithmic problems, LeetCode Medium-Hard' },
      { name: 'Phone Screen', type: 'Technical', duration: '45 min', focus: 'DSA + CS fundamentals, 1 coding problem' },
      { name: 'Technical Round 1', type: 'Coding', duration: '45 min', focus: 'Data structures, algorithm design' },
      { name: 'Technical Round 2', type: 'Coding', duration: '45 min', focus: 'More DSA + clean code' },
      { name: 'System Design', type: 'Design', duration: '45 min', focus: 'Design scalable distributed system (SDE2+)' },
      { name: 'Googleyness & Leadership', type: 'Behavioral', duration: '45 min', focus: 'STAR format, culture fit, leadership principles' },
    ],
    tips: 'Google values clarity of thought. Always explain your reasoning aloud. They care about how you think, not just the answer.',
  },
  {
    company: 'Amazon',
    logo: '📦',
    color: '#FF9900',
    rounds: [
      { name: 'Online Assessment', type: 'Coding', duration: '90 min', focus: '2 coding + work simulation + LP survey' },
      { name: 'Phone Screen', type: 'Technical', duration: '60 min', focus: 'Coding + 2–3 LP (Leadership Principles) questions' },
      { name: 'Virtual Onsite 1', type: 'Coding', duration: '60 min', focus: 'Coding + LP questions (every round has LP!)' },
      { name: 'Virtual Onsite 2', type: 'Coding', duration: '60 min', focus: 'Coding + more LP' },
      { name: 'Bar Raiser Round', type: 'Mixed', duration: '60 min', focus: 'Tough LP + coding — evaluates cultural fit at high bar' },
    ],
    tips: 'Amazon\'s 14 Leadership Principles are non-negotiable. EVERY technical round includes LP questions. Prepare 2–3 stories per principle.',
  },
  {
    company: 'Meta',
    logo: '♾️',
    color: '#0866FF',
    rounds: [
      { name: 'Recruiter Screen', type: 'HR', duration: '30 min', focus: 'Background, motivation, basic technical check' },
      { name: 'Technical Phone Screen', type: 'Coding', duration: '60 min', focus: '1–2 coding problems on Coderpad' },
      { name: 'Onsite: Coding 1', type: 'Coding', duration: '45 min', focus: 'LeetCode Medium-Hard algorithms' },
      { name: 'Onsite: Coding 2', type: 'Coding', duration: '45 min', focus: 'More DSA — may include concurrency/design' },
      { name: 'System Design', type: 'Design', duration: '45 min', focus: 'Product-scale design (IC4+ roles)' },
      { name: 'Behavioral', type: 'Behavioral', duration: '45 min', focus: 'Meta values: Move Fast, Be Bold, Focus on Impact' },
    ],
    tips: 'Meta loves "Move Fast." Show you can ship. They prefer optimal solutions — don\'t stop at brute force.',
  },
  {
    company: 'Microsoft',
    logo: '🪟',
    color: '#00A4EF',
    rounds: [
      { name: 'Online Assessment', type: 'Coding', duration: '60–90 min', focus: '2 coding problems on HackerRank' },
      { name: 'Recruiter Call', type: 'HR', duration: '30 min', focus: 'Background, team matching, expectations' },
      { name: 'Technical Round 1', type: 'Coding', duration: '60 min', focus: 'DSA + technical discussion' },
      { name: 'Technical Round 2', type: 'Coding', duration: '60 min', focus: 'DSA + system thinking' },
      { name: 'Technical Round 3', type: 'Coding', duration: '60 min', focus: 'Design + leadership scenarios' },
      { name: 'As Appropriate (AA)', type: 'Mixed', duration: '60 min', focus: 'Senior person checks hiring bar — final decision' },
    ],
    tips: 'Microsoft cares a lot about problem-solving approach and collaboration. STAR behavioral answers using Microsoft\'s values: Growth Mindset.',
  },
]

const resources = [
  { category: 'DSA Practice', icon: '🔥', color: '#EF4444', items: [{ name: 'LeetCode', desc: 'The #1 platform. Focus on Top 150 and company-specific questions.', url: 'https://leetcode.com', tag: 'Essential' }, { name: 'NeetCode.io', desc: 'Free roadmap with video explanations for every LeetCode pattern.', url: 'https://neetcode.io', tag: 'Free' }, { name: 'AlgoExpert', desc: 'Curated 160 problems with video solutions — structured learning.', url: 'https://algoexpert.io', tag: 'Paid' }] },
  { category: 'System Design', icon: '🏗️', color: '#3B82F6', items: [{ name: 'System Design Primer', desc: 'Free GitHub repo — the most comprehensive system design guide.', url: 'https://github.com/donnemartin/system-design-primer', tag: 'Free' }, { name: 'Grokking System Design', desc: 'Structured course covering all classic system design problems.', url: 'https://www.designgurus.io', tag: 'Paid' }, { name: 'ByteByteGo', desc: 'Visual system design explanations by Alex Xu (Designing Data-Intensive Applications author).', url: 'https://bytebytego.com', tag: 'Newsletter' }] },
  { category: 'Behavioral', icon: '🗣️', color: '#10B981', items: [{ name: 'Pramp', desc: 'Free mock interviews with real peers — behavioral and technical.', url: 'https://pramp.com', tag: 'Free' }, { name: 'Amazon LP Guide', desc: 'Amazon\'s official 14 Leadership Principles — must-read for Amazon roles.', url: 'https://www.amazon.jobs/principles', tag: 'Free' }, { name: 'interviewing.io', desc: 'Anonymous mock interviews with FAANG engineers.', url: 'https://interviewing.io', tag: 'Paid' }] },
  { category: 'Company Research', icon: '🏢', color: '#8B5CF6', items: [{ name: 'Glassdoor', desc: 'Real interview experiences and questions from recent candidates.', url: 'https://glassdoor.com', tag: 'Free' }, { name: 'Levels.fyi', desc: 'Salary data, compensation breakdowns, and offer comparisons.', url: 'https://levels.fyi', tag: 'Free' }, { name: 'Blind', desc: 'Anonymous employee discussions — real talk about companies and interviews.', url: 'https://teamblind.com', tag: 'Free' }] },
  { category: 'Books', icon: '📖', color: '#F59E0B', items: [{ name: 'Cracking the Coding Interview', desc: 'Gayle McDowell\'s classic — 189 programming questions and solutions.', url: 'https://www.crackingthecodinginterview.com', tag: 'Book' }, { name: 'Designing Data-Intensive Applications', desc: 'Martin Kleppmann\'s bible for system design — must-read.', url: 'https://dataintensive.net', tag: 'Book' }, { name: 'Clean Code', desc: 'Robert Martin — write readable, maintainable code that impresses interviewers.', url: 'https://www.amazon.com/Clean-Code', tag: 'Book' }] },
]

const prepTimeline = [
  { week: 'Week 1–4', title: 'Foundation', color: '#3B82F6', tasks: ['Complete arrays, strings, linked lists on LeetCode', 'Learn Big-O notation deeply', 'Solve 3–5 Easy problems daily', 'Review basic data structures'] },
  { week: 'Week 5–8', title: 'Core DSA', color: '#10B981', tasks: ['Trees, graphs, BFS/DFS', 'Dynamic programming basics', 'Stacks, queues, heaps', 'Aim for 2–3 Medium problems/day'] },
  { week: 'Week 9–12', title: 'Advanced Topics', color: '#F59E0B', tasks: ['Backtracking, tries, advanced graphs', 'Attempt Hard problems', 'System design fundamentals (read Primer)', 'Start mock interviews on Pramp'] },
  { week: 'Week 13–16', title: 'Interview Ready', color: '#8B5CF6', tasks: ['Company-specific questions on LeetCode', 'Full system design mock interviews', 'Behavioral stories (10+ STAR stories)', 'Apply aggressively — get referrals'] },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────

const diffColor = (d) => d === 'Easy' ? 'bg-green-100 text-green-700' : d === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
const typeColor = (t) => t === 'Coding' ? 'bg-blue-100 text-blue-700' : t === 'Design' ? 'bg-purple-100 text-purple-700' : t === 'Behavioral' ? 'bg-green-100 text-green-700' : t === 'HR' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-700'

const TechInterview = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openDsa, setOpenDsa] = useState(null)
  const [openBehav, setOpenBehav] = useState(null)
  const [openRound, setOpenRound] = useState(null)
  const [activeLang, setActiveLang] = useState(0)

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
          <div className="hidden lg:flex gap-1  ">
            {navSections.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-3 py-2 rounded-lg text-xs md:text-[15px] font-bold transition-all ${activeTab === s.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete Interview Preparation Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Crack Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Interview</span><br />Like a Pro
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            DSA patterns, System Design, Behavioral stories, Language-specific tips, Company round guides — everything you need to land your dream offer.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[['8+', 'DSA Categories'], ['40+', 'System Design Concepts'], ['4', 'Company Round Guides'], ['16 Weeks', 'Prep Roadmap']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-blue-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {navSections.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === s.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {navSections.map(s => (
            <button key={s.id} onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === s.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ══════════════════════════════════
            OVERVIEW
        ══════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div>
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🗺️ The Complete Interview Journey</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">From resume submission to offer letter — every stage explained.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
              {overviewStages.map((stage, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="p-6" style={{ borderTop: `4px solid ${stage.color}` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${stage.color}18` }}>{stage.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-400">STAGE {stage.step}</p>
                        <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{stage.title}</h3>
                      </div>
                      <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: stage.color }}>{stage.duration}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{stage.desc}</p>
                    <div className="space-y-2">
                      {stage.tips.map((t, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: stage.color }}>→</span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 16-Week Prep Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">📅 16-Week Preparation Roadmap</h3>
              <p className="text-slate-500 text-sm mb-8">A structured plan to go from beginner to interview-ready.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {prepTimeline.map((phase, i) => (
                  <div key={i} className="rounded-2xl border-2 p-5" style={{ borderColor: phase.color, backgroundColor: `${phase.color}08` }}>
                    <p className="text-xs font-extrabold uppercase tracking-wider mb-1" style={{ color: phase.color }}>{phase.week}</p>
                    <h4 className="font-extrabold text-slate-800 text-lg mb-4">{phase.title}</h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((t, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="flex-shrink-0 mt-0.5" style={{ color: phase.color }}>✓</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            DSA
        ══════════════════════════════════ */}
        {activeTab === 'dsa' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🧠 Data Structures & Algorithms</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Complete DSA topic guide with patterns, must-solve problems, and insider tips.</p>
            </div>
            <div className="space-y-4">
              {dsaTopics.map((topic, i) => {
                const isOpen = openDsa === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenDsa(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{topic.category}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{topic.topics.slice(0, 3).join(' · ')}...</p>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="rounded-2xl p-5 border" style={{ backgroundColor: `${topic.color}08`, borderColor: `${topic.color}30` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: topic.color }}>Key Subtopics</p>
                          <ul className="space-y-2">
                            {topic.topics.map((t, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: topic.color }} />{t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Must-Solve Problems</p>
                          <div className="space-y-2">
                            {topic.questions.map((q, j) => (
                              <div key={j} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                <span className="text-sm text-slate-700 font-medium">{q.q}</span>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffColor(q.diff)}`}>{q.diff}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">💡 Expert Tip</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{topic.tip}</p>
                          <div className="mt-4">
                            <p className="text-xs font-bold text-slate-400 mb-2">Patterns in this category:</p>
                            <div className="flex flex-wrap gap-2">
                              {topic.questions.map((q, j) => (
                                <span key={j} className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ backgroundColor: `${topic.color}25`, color: topic.color }}>{q.pattern}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            SYSTEM DESIGN
        ══════════════════════════════════ */}
        {activeTab === 'system' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🏗️ System Design Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Everything from core concepts to classic design problems for senior and IC4+ roles.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 mb-14">
              {systemDesignTopics.map((section, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${section.color}18` }}>{section.icon}</div>
                    <h3 className="text-xl font-extrabold text-slate-800">{section.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: `${section.color}08` }}>
                        <div>
                          <p className="font-bold text-slate-800 text-sm mb-1" style={{ color: section.color }}>{item.name}</p>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SD Interview Framework */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-2 text-center">🎯 System Design Interview Framework</h3>
              <p className="text-slate-400 text-center text-sm mb-8">Follow this structure for every system design question to maximize your score.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                {[
                  { step: '1', title: 'Clarify Requirements', icon: '❓', desc: 'Ask about scale, users, read/write ratio, latency needs. Never assume.' },
                  { step: '2', title: 'Estimate Scale', icon: '📊', desc: 'QPS, storage, bandwidth. Back-of-envelope calculations show senior thinking.' },
                  { step: '3', title: 'High-Level Design', icon: '🗺️', desc: 'Draw the main components: client, load balancer, servers, DB, cache, CDN.' },
                  { step: '4', title: 'Deep Dive', icon: '🔬', desc: 'Go deeper on 1–2 components. Show your understanding of tradeoffs.' },
                  { step: '5', title: 'Identify Bottlenecks', icon: '⚡', desc: 'Single points of failure, scaling issues, consistency concerns — proactively discuss.' },
                ].map((f, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <p className="text-xs font-bold text-slate-400 mb-1">STEP {f.step}</p>
                    <h4 className="font-extrabold text-white mb-2 text-sm">{f.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            BEHAVIORAL
        ══════════════════════════════════ */}
        {activeTab === 'behavioral' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🗣️ Behavioral Interview Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Master the STAR framework and prepare for every type of behavioral question.</p>
            </div>

            {/* STAR Framework */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white mb-14">
              <h3 className="text-2xl font-extrabold mb-2 text-center">The STAR Framework</h3>
              <p className="text-slate-400 text-center text-sm mb-8">Use this structure for every behavioral answer — interviewers are trained to look for it.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {sdFramework.map((item, i) => (
                  <div key={i} className="rounded-2xl p-6 border" style={{ borderColor: `${item.color}50`, backgroundColor: `${item.color}15` }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4" style={{ backgroundColor: item.color }}>{item.step}</div>
                    <h4 className="font-extrabold text-white text-xl mb-2">{item.title}</h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">{item.desc}</p>
                    <div className="bg-white/10 rounded-xl p-3">
                      <p className="text-xs text-slate-400 italic leading-relaxed">{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Categories */}
            <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Common Behavioral Questions by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {behavioralQuestions.map((cat, i) => {
                const isOpen = openBehav === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: cat.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setOpenBehav(isOpen ? null : i)}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${cat.color}18` }}>{cat.icon}</div>
                      <h4 className="font-extrabold text-slate-800 text-lg flex-1">{cat.category}</h4>
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: cat.color }}>{cat.questions.length} Qs</span>
                      <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 space-y-3">
                        {cat.questions.map((q, j) => (
                          <div key={j} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: `${cat.color}08` }}>
                            <span className="font-extrabold text-sm flex-shrink-0" style={{ color: cat.color }}>Q{j + 1}</span>
                            <p className="text-slate-700 text-sm">{q}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-green-700 mb-5">✅ Behavioral DO's</h3>
                {['Use specific examples — never be vague', 'Keep answers to 2–3 minutes max', 'Show self-awareness and growth', 'Highlight YOUR individual contribution', 'End with a positive result or learning', 'Practice out loud, not just in your head', 'Research company values before interview'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                    <span className="text-green-500 flex-shrink-0 mt-0.5 font-bold">✓</span>{t}
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-red-700 mb-5">🚫 Behavioral DON'Ts</h3>
                {['Say "we did this" without explaining your role', 'Give theoretical answers instead of real examples', 'Badmouth former colleagues or managers', 'Go off-topic or ramble for 5+ minutes', 'Say "I can\'t think of an example right now"', 'Forget to mention the result/outcome', 'Skip preparing stories — improvisation shows'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                    <span className="text-red-500 flex-shrink-0 mt-0.5 font-bold">✗</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            LANGUAGES
        ══════════════════════════════════ */}
        {activeTab === 'languages' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💻 Language-Specific Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Key concepts, interview tips, and code snippets for Python, Java, JavaScript & C++.</p>
            </div>

            {/* Language selector tabs */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {languages.map((lang, i) => (
                <button key={i} onClick={() => setActiveLang(i)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${activeLang === i ? 'text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
                  style={activeLang === i ? { backgroundColor: lang.color } : {}}>
                  <span className="text-xl">{lang.icon}</span> {lang.name}
                </button>
              ))}
            </div>

            {languages[activeLang] && (() => {
              const lang = languages[activeLang]
              return (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-4xl">{lang.icon}</span>
                        <div>
                          <h3 className="text-2xl font-extrabold text-slate-800">{lang.name}</h3>
                          <p className="text-xs text-slate-500 font-medium">{lang.useCase}</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
                        <p className="text-xs font-extrabold text-amber-700 mb-1">💡 Interview Tip</p>
                        <p className="text-sm text-slate-700">{lang.interviewTip}</p>
                      </div>
                      <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Must-Know Concepts</p>
                      <div className="grid grid-cols-1 gap-2">
                        {lang.concepts.map((c, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-700"
                            style={{ backgroundColor: `${lang.color}10` }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />{c}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-3xl p-7">
                    <p className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: lang.color }}>
                      Code Snippet — Two Sum ({lang.name})
                    </p>
                    <pre className="text-sm text-slate-300 leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                      {lang.snippet}
                    </pre>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ══════════════════════════════════
            ROUND GUIDE
        ══════════════════════════════════ */}
        {activeTab === 'rounds' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🔄 Company Round-by-Round Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Exact interview rounds, duration, and focus areas for Google, Amazon, Meta & Microsoft.</p>
            </div>
            <div className="space-y-5">
              {roundGuide.map((company, i) => {
                const isOpen = openRound === i
                return (
                  <div key={i} className={`bg-white rounded-3xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-lg'}`}
                    style={isOpen ? { borderColor: company.color } : {}}>
                    <button className="w-full flex items-center gap-5 p-7 text-left" onClick={() => setOpenRound(isOpen ? null : i)}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${company.color}18` }}>{company.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-extrabold text-slate-900">{company.company}</h3>
                        <p className="text-sm text-slate-400">{company.rounds.length} interview rounds</p>
                      </div>
                      <div className="flex gap-2">
                        {company.rounds.slice(0, 4).map((r, j) => (
                          <span key={j} className={`hidden md:inline text-xs font-bold px-2.5 py-1 rounded-full ${typeColor(r.type)}`}>{r.type}</span>
                        ))}
                      </div>
                      <span className={`text-slate-400 text-lg transition-transform ml-2 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-7 pb-7">
                        <div className="space-y-3 mb-6">
                          {company.rounds.map((round, j) => (
                            <div key={j} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <span className="w-8 h-8 rounded-xl text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: company.color }}>{j + 1}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                  <h4 className="font-extrabold text-slate-800">{round.name}</h4>
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColor(round.type)}`}>{round.type}</span>
                                  <span className="text-xs text-slate-400 font-medium">⏱ {round.duration}</span>
                                </div>
                                <p className="text-sm text-slate-500">{round.focus}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">🎯 Key Strategy for {company.company}</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{company.tips}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            RESOURCES
        ══════════════════════════════════ */}
        {activeTab === 'resources' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📚 Best Interview Resources</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Curated tools, platforms, and books to ace your technical interviews.</p>
            </div>
            <div className="space-y-10">
              {resources.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${cat.color}18` }}>{cat.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">{cat.category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cat.items.map((item, j) => (
                      <a key={j} href={item.url} target="_blank" rel="noopener noreferrer"
                        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-extrabold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{item.name}</h4>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: cat.color }}>{item.tag}</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                        <p className="text-xs font-bold transition-colors" style={{ color: cat.color }}>Visit {item.name} →</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Final Checklist */}
            <div className="mt-14 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">✅ Pre-Interview Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: '48 Hours Before', color: '#3B82F6', checks: ['Review your target company\'s products & values', 'Re-read your own resume — know every line', 'Solve 2–3 LeetCode Mediums to warm up', 'Prepare 5–6 STAR stories', 'Set up quiet interview environment', 'Test your audio/video/internet connection'] },
                  { title: 'Day of Interview', color: '#10B981', checks: ['Sleep 7–8 hours — no late-night cramming', 'Eat a good meal before', 'Join 5 min early to test tech setup', 'Have pen & paper for diagrams', 'Keep water nearby', 'Breathe — you\'ve prepared, trust yourself'] },
                  { title: 'During Interview', color: '#F59E0B', checks: ['Clarify the problem before coding', 'Think out loud — always verbalize', 'Start with brute force, then optimize', 'Test with examples and edge cases', 'Ask clarifying questions freely', 'Show enthusiasm — energy matters'] },
                ].map((phase, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-6">
                    <h4 className="font-extrabold mb-4 text-lg" style={{ color: phase.color }}>{phase.title}</h4>
                    {phase.checks.map((c, j) => (
                      <div key={j} className="flex items-start gap-2 mb-2 text-sm text-slate-300">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: phase.color }}>□</span>{c}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">TI</span>
            </div>
            <span className="text-white font-bold text-lg">TechInterviewPrep</span>
          </div>
          <p className="text-sm mb-4">Your all-in-one guide to cracking tech interviews at top companies.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-4">
            {navSections.map(s => <span key={s.id}>{s.icon} {s.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
             © 2026 aiplacprep@gmail.com Built for engineers aiming at FAANG and top tech companies.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TechInterview
