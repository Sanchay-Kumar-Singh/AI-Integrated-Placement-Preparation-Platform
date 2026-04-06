import React, { useState } from 'react'
import logo from '../../assets/image.png'
import { useNavigate } from 'react-router-dom'
// ─── DATA ─────────────────────────────────────────────────────────────────

const platforms = [
  { name: 'LeetCode', url: 'https://leetcode.com', icon: '🟠', color: '#FFA116', desc: 'The gold standard. 3000+ problems with company tags, contest, and premium company-specific questions.', tag: 'Essential', features: ['Company-tagged problems', 'Weekly contests', 'Discussion forum', 'Premium mock interviews'] },
  { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', icon: '🟢', color: '#2F8D46', desc: 'Vast theory + problem bank. Best for understanding concepts deeply with explanations.', tag: 'Free', features: ['Detailed explanations', 'Topic-wise problems', 'Company interview experiences', 'Free courses'] },
  { name: 'Codeforces', url: 'https://codeforces.com', icon: '🔵', color: '#1E90FF', desc: 'World-class competitive programming. Rated contests improve problem-solving speed dramatically.', tag: 'Competitive', features: ['Rated contests', 'Problem archive', 'Global leaderboard', 'Editorial solutions'] },
  { name: 'HackerRank', url: 'https://www.hackerrank.com', icon: '🟩', color: '#00EA64', desc: 'Used by companies for OA rounds. Practice on the exact same interface you will face in assessments.', tag: 'OA Prep', features: ['Company OA simulation', 'Skill certifications', 'Interview kits', 'Domain tracks'] },
  { name: 'CodeChef', url: 'https://www.codechef.com', icon: '🟤', color: '#5B4638', desc: 'Great for long contests and ICPC preparation. Monthly starters for all levels.', tag: 'Contests', features: ['Monthly long contests', 'ICPC prep', 'Practice problems', 'Beginner-friendly'] },
  { name: 'AtCoder', url: 'https://atcoder.jp', icon: '⬛', color: '#555555', desc: 'Japanese platform with incredibly clean, well-crafted problems. Highly recommended for advanced preparation.', tag: 'Advanced', features: ['High-quality problems', 'ABC for beginners', 'ARC/AGC for experts', 'Unambiguous problem statements'] },
  { name: 'InterviewBit', url: 'https://www.interviewbit.com', icon: '🟣', color: '#6200EE', desc: 'Structured interview prep with guided tracks. Great for time-bound preparation.', tag: 'Structured', features: ['Guided tracks', 'Mock interviews', 'Company-specific prep', 'Video solutions'] },
  { name: 'CSES Problem Set', url: 'https://cses.fi/problemset', icon: '🔴', color: '#E53E3E', desc: 'The best curated problem set for competitive programming fundamentals. 300 classic problems.', tag: 'Curated', features: ['300 classic problems', 'Sorted by topic', 'No account needed', 'CP fundamentals'] },
]

const dsaTopics = [
  {
    category: 'Arrays & Strings',
    icon: '📊',
    color: '#3B82F6',
    importance: 'Very High',
    frequency: '35%',
    subtopics: ['Two Pointers', 'Sliding Window', 'Prefix Sum', "Kadane's Algorithm", 'Binary Search', 'String Hashing', 'Anagram / Character Count', 'Matrix Traversal', 'Spiral Order', 'Rotate Matrix'],
    questions: [
      { q: 'Two Sum', diff: 'Easy', pattern: 'Hash Map', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/two-sum-problem/' },
      { q: 'Best Time to Buy and Sell Stock', diff: 'Easy', pattern: 'Sliding Window', lc: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/stock-buy-sell/' },
      { q: 'Contains Duplicate', diff: 'Easy', pattern: 'Hash Set', lc: 'https://leetcode.com/problems/contains-duplicate/', gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/' },
      { q: 'Product of Array Except Self', diff: 'Medium', pattern: 'Prefix/Suffix', lc: 'https://leetcode.com/problems/product-of-array-except-self/', gfg: 'https://www.geeksforgeeks.org/a-product-array-puzzle/' },
      { q: 'Maximum Subarray (Kadane)', diff: 'Medium', pattern: "Kadane's", lc: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' },
      { q: 'Longest Substring Without Repeating Characters', diff: 'Medium', pattern: 'Sliding Window', lc: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', gfg: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/' },
      { q: '3Sum', diff: 'Medium', pattern: 'Two Pointers', lc: 'https://leetcode.com/problems/3sum/', gfg: 'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/' },
      { q: 'Trapping Rain Water', diff: 'Hard', pattern: 'Two Pointers', lc: 'https://leetcode.com/problems/trapping-rain-water/', gfg: 'https://www.geeksforgeeks.org/trapping-rain-water/' },
      { q: 'Median of Two Sorted Arrays', diff: 'Hard', pattern: 'Binary Search', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', gfg: 'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/' },
    ],
    tip: 'Master sliding window and two pointers — they appear in 40% of array problems. Always consider time/space tradeoffs using HashMaps.',
  },
  {
    category: 'Linked Lists',
    icon: '🔗',
    color: '#8B5CF6',
    importance: 'High',
    frequency: '15%',
    subtopics: ['Fast & Slow Pointers', 'Reversal', 'Merge Sorted Lists', "Cycle Detection (Floyd's)", 'Remove Nth Node', 'Deep Copy with Random Pointers', 'Palindrome Check', 'Intersection of Two Lists'],
    questions: [
      { q: 'Reverse Linked List', diff: 'Easy', pattern: 'Iteration/Recursion', lc: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
      { q: 'Merge Two Sorted Lists', diff: 'Easy', pattern: 'Two Pointers', lc: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' },
      { q: 'Linked List Cycle', diff: 'Easy', pattern: "Floyd's Algorithm", lc: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
      { q: 'Remove Nth Node From End', diff: 'Medium', pattern: 'Two Pointers', lc: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/remove-nth-node-from-end-of-linked-list/' },
      { q: 'Reorder List', diff: 'Medium', pattern: 'Fast & Slow + Reverse', lc: 'https://leetcode.com/problems/reorder-list/', gfg: 'https://www.geeksforgeeks.org/rearrange-a-given-linked-list-in-place/' },
      { q: 'LRU Cache', diff: 'Medium', pattern: 'HashMap + DLL', lc: 'https://leetcode.com/problems/lru-cache/', gfg: 'https://www.geeksforgeeks.org/lru-cache-implementation/' },
      { q: 'Merge K Sorted Lists', diff: 'Hard', pattern: 'Min Heap', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
      { q: 'Reverse Nodes in K-Group', diff: 'Hard', pattern: 'Reversal', lc: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', gfg: 'https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/' },
    ],
    tip: 'Always draw the pointer operations on paper first. Never code linked list blindly. Dummy node trick saves a lot of edge case handling.',
  },
  {
    category: 'Trees & Binary Search Trees',
    icon: '🌳',
    color: '#10B981',
    importance: 'Very High',
    frequency: '25%',
    subtopics: ['Inorder/Preorder/Postorder', 'Level Order BFS', 'Binary Search Tree', 'Lowest Common Ancestor', 'Serialize/Deserialize', 'Path Sum', 'Diameter of Tree', 'Balanced Tree Check'],
    questions: [
      { q: 'Invert Binary Tree', diff: 'Easy', pattern: 'DFS Recursion', lc: 'https://leetcode.com/problems/invert-binary-tree/', gfg: 'https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/' },
      { q: 'Maximum Depth of Binary Tree', diff: 'Easy', pattern: 'DFS', lc: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/' },
      { q: 'Balanced Binary Tree', diff: 'Easy', pattern: 'DFS Height', lc: 'https://leetcode.com/problems/balanced-binary-tree/', gfg: 'https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/' },
      { q: 'Binary Tree Level Order Traversal', diff: 'Medium', pattern: 'BFS Queue', lc: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfg: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
      { q: 'Validate Binary Search Tree', diff: 'Medium', pattern: 'DFS with bounds', lc: 'https://leetcode.com/problems/validate-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/' },
      { q: 'Kth Smallest Element in BST', diff: 'Medium', pattern: 'Inorder Traversal', lc: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst/' },
      { q: 'Lowest Common Ancestor of BST', diff: 'Medium', pattern: 'BST Property', lc: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/' },
      { q: 'Binary Tree Maximum Path Sum', diff: 'Hard', pattern: 'DFS Global Max', lc: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', gfg: 'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/' },
      { q: 'Serialize and Deserialize Binary Tree', diff: 'Hard', pattern: 'BFS/DFS + String', lc: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', gfg: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/' },
    ],
    tip: 'Trees appear in ~25% of FAANG interviews. Know DFS/BFS cold. For BST problems, leverage the sorted property — inorder gives sorted order.',
  },
  {
    category: 'Graphs',
    icon: '🕸️',
    color: '#F59E0B',
    importance: 'Very High',
    frequency: '20%',
    subtopics: ['BFS / DFS', 'Topological Sort', 'Union Find (DSU)', "Dijkstra's Algorithm", 'Bellman-Ford', 'Floyd-Warshall', 'Cycle Detection', 'Bipartite Check', 'Minimum Spanning Tree'],
    questions: [
      { q: 'Number of Islands', diff: 'Medium', pattern: 'DFS/BFS Grid', lc: 'https://leetcode.com/problems/number-of-islands/', gfg: 'https://www.geeksforgeeks.org/find-number-of-islands/' },
      { q: 'Clone Graph', diff: 'Medium', pattern: 'BFS + HashMap', lc: 'https://leetcode.com/problems/clone-graph/', gfg: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/' },
      { q: 'Course Schedule', diff: 'Medium', pattern: 'Topological Sort', lc: 'https://leetcode.com/problems/course-schedule/', gfg: 'https://www.geeksforgeeks.org/topological-sorting/' },
      { q: 'Pacific Atlantic Water Flow', diff: 'Medium', pattern: 'Multi-source BFS', lc: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', gfg: 'https://www.geeksforgeeks.org/water-flow-problem/' },
      { q: 'Rotting Oranges', diff: 'Medium', pattern: 'Multi-source BFS', lc: 'https://leetcode.com/problems/rotting-oranges/', gfg: 'https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/' },
      { q: 'Number of Connected Components', diff: 'Medium', pattern: 'Union Find / DFS', lc: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', gfg: 'https://www.geeksforgeeks.org/connected-components-in-an-undirected-graph/' },
      { q: 'Word Ladder', diff: 'Hard', pattern: 'BFS Shortest Path', lc: 'https://leetcode.com/problems/word-ladder/', gfg: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/' },
      { q: 'Alien Dictionary', diff: 'Hard', pattern: 'Topological Sort', lc: 'https://leetcode.com/problems/alien-dictionary/', gfg: 'https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/' },
    ],
    tip: 'For grid problems, think BFS/DFS. For ordering problems, think Topological Sort. For connectivity, think Union-Find. Build your graph representation first.',
  },
  {
    category: 'Dynamic Programming',
    icon: '⚡',
    color: '#EF4444',
    importance: 'Very High',
    frequency: '30%',
    subtopics: ['1D DP (Fibonacci type)', '2D DP (Grid/LCS)', 'Knapsack 0/1', 'Unbounded Knapsack', 'Longest Common Subsequence', 'Longest Increasing Subsequence', 'Matrix Chain Multiplication', 'Interval DP', 'State Machine DP', 'Bitmask DP'],
    questions: [
      { q: 'Climbing Stairs', diff: 'Easy', pattern: 'Fibonacci DP', lc: 'https://leetcode.com/problems/climbing-stairs/', gfg: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/' },
      { q: 'House Robber', diff: 'Medium', pattern: '1D DP', lc: 'https://leetcode.com/problems/house-robber/', gfg: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/' },
      { q: 'Coin Change', diff: 'Medium', pattern: 'Unbounded Knapsack', lc: 'https://leetcode.com/problems/coin-change/', gfg: 'https://www.geeksforgeeks.org/coin-change-dp-7/' },
      { q: 'Longest Common Subsequence', diff: 'Medium', pattern: '2D DP', lc: 'https://leetcode.com/problems/longest-common-subsequence/', gfg: 'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/' },
      { q: 'Longest Increasing Subsequence', diff: 'Medium', pattern: 'DP + Binary Search', lc: 'https://leetcode.com/problems/longest-increasing-subsequence/', gfg: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/' },
      { q: 'Word Break', diff: 'Medium', pattern: 'DP + Trie', lc: 'https://leetcode.com/problems/word-break/', gfg: 'https://www.geeksforgeeks.org/word-break-problem-dp-32/' },
      { q: 'Unique Paths', diff: 'Medium', pattern: '2D Grid DP', lc: 'https://leetcode.com/problems/unique-paths/', gfg: 'https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/' },
      { q: 'Edit Distance', diff: 'Hard', pattern: '2D DP', lc: 'https://leetcode.com/problems/edit-distance/', gfg: 'https://www.geeksforgeeks.org/edit-distance-dp-5/' },
      { q: 'Burst Balloons', diff: 'Hard', pattern: 'Interval DP', lc: 'https://leetcode.com/problems/burst-balloons/', gfg: 'https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/' },
    ],
    tip: 'DP mantra: Define state → Write recurrence → Identify base cases → Code top-down → Optimize to bottom-up. Never jump to code before defining state.',
  },
  {
    category: 'Stacks & Queues',
    icon: '📚',
    color: '#06B6D4',
    importance: 'High',
    frequency: '12%',
    subtopics: ['Monotonic Stack', 'Next Greater Element', 'Valid Parentheses', 'Min Stack', 'Queue using Stacks', 'BFS with Queue', 'Sliding Window Maximum', 'Calculator Problems'],
    questions: [
      { q: 'Valid Parentheses', diff: 'Easy', pattern: 'Stack Matching', lc: 'https://leetcode.com/problems/valid-parentheses/', gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
      { q: 'Min Stack', diff: 'Medium', pattern: 'Stack + Aux Stack', lc: 'https://leetcode.com/problems/min-stack/', gfg: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/' },
      { q: 'Daily Temperatures', diff: 'Medium', pattern: 'Monotonic Stack', lc: 'https://leetcode.com/problems/daily-temperatures/', gfg: 'https://www.geeksforgeeks.org/next-greater-element/' },
      { q: 'Car Fleet', diff: 'Medium', pattern: 'Monotonic Stack', lc: 'https://leetcode.com/problems/car-fleet/', gfg: 'https://www.geeksforgeeks.org/count-the-number-of-car-fleets/' },
      { q: 'Evaluate Reverse Polish Notation', diff: 'Medium', pattern: 'Stack Calculator', lc: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', gfg: 'https://www.geeksforgeeks.org/evaluation-of-postfix-expression/' },
      { q: 'Sliding Window Maximum', diff: 'Hard', pattern: 'Monotonic Deque', lc: 'https://leetcode.com/problems/sliding-window-maximum/', gfg: 'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/' },
      { q: 'Largest Rectangle in Histogram', diff: 'Hard', pattern: 'Monotonic Stack', lc: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', gfg: 'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/' },
    ],
    tip: "Monotonic stack is the hidden gem — once you see it, you'll spot it in 80% of next greater/smaller problems immediately.",
  },
  {
    category: 'Heaps & Priority Queues',
    icon: '⛰️',
    color: '#7C3AED',
    importance: 'High',
    frequency: '10%',
    subtopics: ['Min Heap', 'Max Heap', 'Top K Elements', 'K Closest Points', 'Kth Largest', 'Merge K Sorted', 'Two Heaps Pattern', 'Task Scheduler', 'Lazy Deletion'],
    questions: [
      { q: 'Kth Largest Element in Array', diff: 'Medium', pattern: 'Min Heap', lc: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/kth-largest-element-in-an-array/' },
      { q: 'Top K Frequent Elements', diff: 'Medium', pattern: 'Max Heap / Bucket Sort', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' },
      { q: 'K Closest Points to Origin', diff: 'Medium', pattern: 'Max Heap', lc: 'https://leetcode.com/problems/k-closest-points-to-origin/', gfg: 'https://www.geeksforgeeks.org/find-k-closest-points-to-the-origin/' },
      { q: 'Task Scheduler', diff: 'Medium', pattern: 'Greedy + Max Heap', lc: 'https://leetcode.com/problems/task-scheduler/', gfg: 'https://www.geeksforgeeks.org/task-scheduler/' },
      { q: 'Find Median from Data Stream', diff: 'Hard', pattern: 'Two Heaps', lc: 'https://leetcode.com/problems/find-median-from-data-stream/', gfg: 'https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/' },
      { q: 'Merge K Sorted Lists', diff: 'Hard', pattern: 'Min Heap', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
    ],
    tip: 'Rule of thumb: K largest/smallest/frequent → Heap immediately. Two heaps pattern (max + min heap) is the go-to for median problems.',
  },
  {
    category: 'Binary Search',
    icon: '🔍',
    color: '#F97316',
    importance: 'High',
    frequency: '15%',
    subtopics: ['Classic Binary Search', 'Search in Rotated Array', 'Find First/Last Position', 'Search in 2D Matrix', 'Binary Search on Answer', 'Sqrt(x)', 'Peak Element', 'Minimize Max / Maximize Min'],
    questions: [
      { q: 'Binary Search', diff: 'Easy', pattern: 'Classic', lc: 'https://leetcode.com/problems/binary-search/', gfg: 'https://www.geeksforgeeks.org/binary-search/' },
      { q: 'Search in Rotated Sorted Array', diff: 'Medium', pattern: 'Modified Binary Search', lc: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/' },
      { q: 'Find Minimum in Rotated Sorted Array', diff: 'Medium', pattern: 'Binary Search', lc: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/' },
      { q: 'Search a 2D Matrix', diff: 'Medium', pattern: 'Treat as 1D Array', lc: 'https://leetcode.com/problems/search-a-2d-matrix/', gfg: 'https://www.geeksforgeeks.org/search-in-row-wise-and-column-wise-sorted-matrix/' },
      { q: 'Koko Eating Bananas', diff: 'Medium', pattern: 'Binary Search on Answer', lc: 'https://leetcode.com/problems/koko-eating-bananas/', gfg: 'https://www.geeksforgeeks.org/koko-eating-bananas/' },
      { q: 'Median of Two Sorted Arrays', diff: 'Hard', pattern: 'Binary Search on Partition', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', gfg: 'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/' },
      { q: 'Split Array Largest Sum', diff: 'Hard', pattern: 'Binary Search on Answer', lc: 'https://leetcode.com/problems/split-array-largest-sum/', gfg: 'https://www.geeksforgeeks.org/minimize-the-maximum-difference-between-the-heights/' },
    ],
    tip: 'Binary search applies beyond sorted arrays — any monotonic function can be binary searched. Minimize the maximum / Maximize the minimum → always binary search on answer.',
  },
  {
    category: 'Backtracking',
    icon: '🔄',
    color: '#DC2626',
    importance: 'Medium',
    frequency: '10%',
    subtopics: ['Permutations', 'Combinations', 'Subsets / Power Set', 'N-Queens', 'Word Search', 'Sudoku Solver', 'Palindrome Partitioning', 'Letter Combinations', 'Restore IP Addresses'],
    questions: [
      { q: 'Subsets', diff: 'Medium', pattern: 'Backtracking / Bit Mask', lc: 'https://leetcode.com/problems/subsets/', gfg: 'https://www.geeksforgeeks.org/power-set/' },
      { q: 'Combination Sum', diff: 'Medium', pattern: 'Backtracking + Pruning', lc: 'https://leetcode.com/problems/combination-sum/', gfg: 'https://www.geeksforgeeks.org/combinational-sum/' },
      { q: 'Permutations', diff: 'Medium', pattern: 'Backtracking', lc: 'https://leetcode.com/problems/permutations/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/' },
      { q: 'Letter Combinations of Phone Number', diff: 'Medium', pattern: 'Backtracking', lc: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', gfg: 'https://www.geeksforgeeks.org/find-possible-words-phone-digits/' },
      { q: 'Word Search', diff: 'Medium', pattern: 'DFS + Backtracking', lc: 'https://leetcode.com/problems/word-search/', gfg: 'https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/' },
      { q: 'Palindrome Partitioning', diff: 'Medium', pattern: 'Backtracking + DP', lc: 'https://leetcode.com/problems/palindrome-partitioning/', gfg: 'https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/' },
      { q: 'N-Queens', diff: 'Hard', pattern: 'Backtracking', lc: 'https://leetcode.com/problems/n-queens/', gfg: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/' },
      { q: 'Sudoku Solver', diff: 'Hard', pattern: 'Backtracking + Constraint', lc: 'https://leetcode.com/problems/sudoku-solver/', gfg: 'https://www.geeksforgeeks.org/sudoku-backtracking-7/' },
    ],
    tip: 'Template: choose → explore → unchoose. Always prune early. Sort input first for better pruning. Skip duplicates with i > start && nums[i] === nums[i-1].',
  },
  {
    category: 'Tries & Advanced Strings',
    icon: '🌲',
    color: '#059669',
    importance: 'Medium',
    frequency: '8%',
    subtopics: ['Trie Insert/Search/StartsWith', 'Word Dictionary', 'Autocomplete', 'IP Routing', 'Longest Word in Dictionary', 'Replace Words', 'KMP Algorithm', 'Rabin-Karp', 'Z-Algorithm'],
    questions: [
      { q: 'Implement Trie (Prefix Tree)', diff: 'Medium', pattern: 'Trie', lc: 'https://leetcode.com/problems/implement-trie-prefix-tree/', gfg: 'https://www.geeksforgeeks.org/trie-insert-and-search/' },
      { q: 'Design Add and Search Words', diff: 'Medium', pattern: 'Trie + DFS', lc: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', gfg: 'https://www.geeksforgeeks.org/design-a-character-level-trie/' },
      { q: 'Word Search II', diff: 'Hard', pattern: 'Backtracking + Trie', lc: 'https://leetcode.com/problems/word-search-ii/', gfg: 'https://www.geeksforgeeks.org/find-all-words-from-a-given-dictionary-present-in-a-matrix/' },
      { q: 'Replace Words', diff: 'Medium', pattern: 'Trie', lc: 'https://leetcode.com/problems/replace-words/', gfg: 'https://www.geeksforgeeks.org/replace-all-words-in-a-sentence-with-shortest-prefix-from-dictionary/' },
      { q: 'Longest Word in Dictionary', diff: 'Medium', pattern: 'Trie + BFS', lc: 'https://leetcode.com/problems/longest-word-in-dictionary/', gfg: 'https://www.geeksforgeeks.org/longest-word-in-dictionary-through-deleting/' },
    ],
    tip: 'Trie shines for prefix matching problems. If you see autocomplete, prefix, or words from dictionary — Trie is almost always optimal.',
  },
]

const companyQuestions = [
  {
    company: 'Google',
    logo: '🔵',
    color: '#4285F4',
    focus: 'Graph algorithms, System design thinking in code, Clean optimal solutions',
    topTopics: ['Arrays', 'Graphs', 'DP', 'Trees', 'Binary Search'],
    questions: [
      { q: 'Trapping Rain Water', diff: 'Hard', lc: 'https://leetcode.com/problems/trapping-rain-water/', note: 'Asked in 60%+ Google interviews' },
      { q: 'Word Ladder', diff: 'Hard', lc: 'https://leetcode.com/problems/word-ladder/', note: 'BFS shortest path — classic Google' },
      { q: 'Minimum Window Substring', diff: 'Hard', lc: 'https://leetcode.com/problems/minimum-window-substring/', note: 'Sliding window mastery test' },
      { q: 'Decode Ways', diff: 'Medium', lc: 'https://leetcode.com/problems/decode-ways/', note: 'DP — very frequent at Google' },
      { q: 'Next Permutation', diff: 'Medium', lc: 'https://leetcode.com/problems/next-permutation/', note: 'Array manipulation trick' },
      { q: 'Median of Two Sorted Arrays', diff: 'Hard', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', note: 'Binary search mastery' },
      { q: 'Longest Increasing Path in Matrix', diff: 'Hard', lc: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', note: 'DFS + Memoization on grid' },
      { q: 'Skyline Problem', diff: 'Hard', lc: 'https://leetcode.com/problems/the-skyline-problem/', note: 'Heap + coordinate compression' },
    ],
  },
  {
    company: 'Amazon',
    logo: '📦',
    color: '#FF9900',
    focus: 'Scalable thinking, LP in every round, Optimization problems, OOD',
    topTopics: ['Arrays', 'Trees', 'Graphs', 'DP', 'Greedy'],
    questions: [
      { q: 'Number of Islands', diff: 'Medium', lc: 'https://leetcode.com/problems/number-of-islands/', note: 'Most common Amazon graph question' },
      { q: 'LRU Cache', diff: 'Medium', lc: 'https://leetcode.com/problems/lru-cache/', note: 'OOD + DS — very Amazon' },
      { q: 'Reorder Data in Log Files', diff: 'Medium', lc: 'https://leetcode.com/problems/reorder-data-in-log-files/', note: 'Custom sorting — appears in OA' },
      { q: 'Partition Labels', diff: 'Medium', lc: 'https://leetcode.com/problems/partition-labels/', note: 'Greedy — Amazon loves this' },
      { q: 'Asteroid Collision', diff: 'Medium', lc: 'https://leetcode.com/problems/asteroid-collision/', note: 'Stack simulation — OA classic' },
      { q: 'Merge Intervals', diff: 'Medium', lc: 'https://leetcode.com/problems/merge-intervals/', note: 'Interval problems are Amazon staples' },
      { q: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', note: 'Warm-up — appears in phone screens' },
      { q: 'Word Ladder', diff: 'Hard', lc: 'https://leetcode.com/problems/word-ladder/', note: 'BFS graph traversal' },
    ],
  },
  {
    company: 'Meta',
    logo: '♾️',
    color: '#0866FF',
    focus: 'Speed + optimal solutions, Product intuition in code, Move fast',
    topTopics: ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP'],
    questions: [
      { q: 'Valid Palindrome', diff: 'Easy', lc: 'https://leetcode.com/problems/valid-palindrome/', note: 'Common warm-up at Meta' },
      { q: 'Merge Intervals', diff: 'Medium', lc: 'https://leetcode.com/problems/merge-intervals/', note: 'Very frequent Meta question' },
      { q: 'Binary Tree Right Side View', diff: 'Medium', lc: 'https://leetcode.com/problems/binary-tree-right-side-view/', note: 'BFS tree traversal' },
      { q: 'Subarray Sum Equals K', diff: 'Medium', lc: 'https://leetcode.com/problems/subarray-sum-equals-k/', note: 'Prefix sum + HashMap' },
      { q: 'Expression Add Operators', diff: 'Hard', lc: 'https://leetcode.com/problems/expression-add-operators/', note: 'Backtracking — Meta hard' },
      { q: 'Remove Invalid Parentheses', diff: 'Hard', lc: 'https://leetcode.com/problems/remove-invalid-parentheses/', note: 'BFS + backtracking' },
      { q: 'Accounts Merge', diff: 'Medium', lc: 'https://leetcode.com/problems/accounts-merge/', note: 'Union Find — Meta social graph' },
      { q: 'Longest Substring Without Repeating', diff: 'Medium', lc: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', note: 'Sliding window — very frequent' },
    ],
  },
  {
    company: 'Microsoft',
    logo: '🪟',
    color: '#00A4EF',
    focus: 'Clean code, Collaboration, Thoughtful problem breakdown, OOP',
    topTopics: ['Trees', 'Arrays', 'Linked Lists', 'Strings', 'DP'],
    questions: [
      { q: 'Reverse Linked List', diff: 'Easy', lc: 'https://leetcode.com/problems/reverse-linked-list/', note: 'Appears in almost every Microsoft screen' },
      { q: 'Validate BST', diff: 'Medium', lc: 'https://leetcode.com/problems/validate-binary-search-tree/', note: 'Tree + BST property check' },
      { q: 'Clone Graph', diff: 'Medium', lc: 'https://leetcode.com/problems/clone-graph/', note: 'Deep copy — OOP thinking' },
      { q: 'Design Twitter', diff: 'Medium', lc: 'https://leetcode.com/problems/design-twitter/', note: 'OOD + Heap — classic Microsoft' },
      { q: 'Find All Anagrams in String', diff: 'Medium', lc: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', note: 'Sliding window — Microsoft OA' },
      { q: 'Serialize and Deserialize Binary Tree', diff: 'Hard', lc: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', note: 'Tree + string processing' },
      { q: 'Jump Game II', diff: 'Medium', lc: 'https://leetcode.com/problems/jump-game-ii/', note: 'Greedy + DP thinking' },
      { q: 'Max Points on a Line', diff: 'Hard', lc: 'https://leetcode.com/problems/max-points-on-a-line/', note: 'Math + HashMap' },
    ],
  },
  {
    company: 'Apple',
    logo: '🍎',
    color: '#555555',
    focus: 'Code quality, Edge cases, OOP, Algorithms with real-world context',
    topTopics: ['Arrays', 'OOP Design', 'Trees', 'Strings', 'Concurrency'],
    questions: [
      { q: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', note: 'Classic warm-up, focus on clean code' },
      { q: 'Design File System', diff: 'Medium', lc: 'https://leetcode.com/problems/design-file-system/', note: 'OOD — very Apple' },
      { q: 'Meeting Rooms II', diff: 'Medium', lc: 'https://leetcode.com/problems/meeting-rooms-ii/', note: 'Interval scheduling — Apple frequent' },
      { q: 'Find the Duplicate Number', diff: 'Medium', lc: 'https://leetcode.com/problems/find-the-duplicate-number/', note: "Floyd's cycle — elegant solution" },
      { q: 'First Missing Positive', diff: 'Hard', lc: 'https://leetcode.com/problems/first-missing-positive/', note: 'Array in-place manipulation' },
      { q: 'Design In-Memory File System', diff: 'Hard', lc: 'https://leetcode.com/problems/design-in-memory-file-system/', note: 'Complex OOD — Apple specialty' },
    ],
  },
  {
    company: 'Netflix / Uber / Airbnb',
    logo: '🎯',
    color: '#E50914',
    focus: 'System-aware coding, Scale thinking, Product-centric problems',
    topTopics: ['Graphs', 'DP', 'Greedy', 'Design', 'Streams'],
    questions: [
      { q: 'Task Scheduler', diff: 'Medium', lc: 'https://leetcode.com/problems/task-scheduler/', note: 'Greedy + Heap — Uber scheduling' },
      { q: 'Shortest Path in Binary Matrix', diff: 'Medium', lc: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', note: 'BFS shortest path' },
      { q: 'Sliding Window Median', diff: 'Hard', lc: 'https://leetcode.com/problems/sliding-window-median/', note: 'Two heaps — streaming data' },
      { q: 'Design Search Autocomplete System', diff: 'Hard', lc: 'https://leetcode.com/problems/design-search-autocomplete-system/', note: 'Trie + priority — Netflix search' },
      { q: 'Jump Game', diff: 'Medium', lc: 'https://leetcode.com/problems/jump-game/', note: 'Greedy — simple but elegant' },
      { q: 'Course Schedule II', diff: 'Medium', lc: 'https://leetcode.com/problems/course-schedule-ii/', note: 'Topological sort — dependency resolution' },
    ],
  },
]

const patterns = [
  { name: 'Sliding Window', icon: '🪟', color: '#3B82F6', when: 'Contiguous subarray/substring problems with a size constraint or optimization', example: 'Longest substring without repeating characters, Max sum subarray of size K' },
  { name: 'Two Pointers', icon: '👉', color: '#10B981', when: 'Sorted array problems, searching pairs, palindrome checks', example: 'Two sum (sorted), Container with most water, Trapping rain water' },
  { name: 'Fast & Slow Pointers', icon: '⚡', color: '#F59E0B', when: 'Linked list cycle detection, finding middle, palindrome linked list', example: 'Linked list cycle, Find middle of linked list, Happy number' },
  { name: 'Merge Intervals', icon: '🔗', color: '#8B5CF6', when: 'Overlapping intervals, scheduling problems, range merging', example: 'Merge intervals, Insert interval, Meeting rooms' },
  { name: 'Cyclic Sort', icon: '🔄', color: '#EF4444', when: 'Array with numbers in range [1,N], finding missing/duplicate', example: 'Find missing number, Find all duplicates, First missing positive' },
  { name: 'In-place Reversal', icon: '↩️', color: '#06B6D4', when: 'Linked list reversal, rotate array/list, reverse groups', example: 'Reverse linked list, Reverse nodes in k-group, Rotate array' },
  { name: 'BFS (Tree/Graph)', icon: '🌊', color: '#7C3AED', when: 'Level-order traversal, shortest path in unweighted graph, connected components', example: 'Level order traversal, Shortest path, Rotten oranges' },
  { name: 'DFS (Tree/Graph)', icon: '🏊', color: '#DC2626', when: 'Path finding, permutations, combinations, tree properties', example: 'Path sum, Island counting, Cycle detection in graph' },
  { name: 'Two Heaps', icon: '⛰️', color: '#059669', when: 'Median finding, scheduling with two groups, maximizing minimum or minimizing maximum', example: 'Find median from data stream, Sliding window median' },
  { name: 'Subsets / Backtracking', icon: '🎯', color: '#B45309', when: 'All permutations/combinations, power set, generating all configurations', example: 'Subsets, Permutations, String permutations' },
  { name: 'Modified Binary Search', icon: '🔍', color: '#0F766E', when: 'Sorted array variants, rotated arrays, unknown size, infinite array', example: 'Search in rotated array, Find first/last position, Sqrt(x)' },
  { name: 'Top K Elements', icon: '🏆', color: '#7C2D12', when: 'K largest/smallest/frequent, K closest, sorting in O(n log k)', example: 'Kth largest element, Top K frequent, K closest points' },
  { name: 'K-way Merge', icon: '🌀', color: '#1D4ED8', when: 'Merging K sorted arrays/lists, finding smallest range', example: 'Merge K sorted lists, Kth smallest in sorted matrix' },
  { name: 'Topological Sort', icon: '📋', color: '#6D28D9', when: 'Tasks with dependencies, build order, detecting cycles in directed graph', example: 'Course schedule, Alien dictionary, Task order' },
]

const diffColor = (d) =>
  d === 'Easy' ? 'bg-green-100 text-green-700 border border-green-200' :
  d === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
  'bg-red-100 text-red-700 border border-red-200'

// ─── COMPONENT ────────────────────────────────────────────────────────────

const Coding = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('topics')
  const [openTopic, setOpenTopic] = useState(null)
  const [openCompany, setOpenCompany] = useState(null)

  const tabs = [
    { id: 'topics', label: 'DSA Topics', icon: '🧠' },
    { id: 'patterns', label: 'Patterns', icon: '🎯' },
    { id: 'companies', label: 'Company Questions', icon: '🏢' },
    { id: 'platforms', label: 'Platforms', icon: '💻' },
  ]

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
                          <div className="hidden md:flex gap-6 text-sm font-medium md:text-[20px] text-slate-800">
                              <a href="#dsa" className="hover:text-blue-600 transition-colors">DSA Topics</a>
                              <a href="#patt" className="hover:text-blue-600 transition-colors">Patterns</a>
                              <a href="#comp" className="hover:text-blue-600 transition-colors">Company Questions</a>
                              <a href="#plat " className='hover:text-blue-600 transition-colors'>Platforms</a>
                          </div>
      
                      </div>
                  </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete Coding Round Preparation
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Master <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">DSA & Coding</span><br />Interviews
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Topic-wise DSA with LeetCode + GFG links, company-specific questions, algorithm patterns, and the best coding platforms — all in one place.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[['10+', 'DSA Topics'], ['80+', 'Curated Problems'], ['6', 'Company Guides'], ['14', 'Key Patterns']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-green-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === s.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {tabs.map(s => (
            <button key={s.id} onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === s.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ══════════════════════════════════
            DSA TOPICS
        ══════════════════════════════════ */}
        {activeTab === 'topics' && (
          <div id='dsa'>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🧠 Topic-Wise DSA Guide</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Every major DSA topic with subtopics, must-solve problems, and direct links to LeetCode & GFG.</p>
            </div>

            <div className="space-y-4">
              {dsaTopics.map((topic, i) => {
                const isOpen = openTopic === i
                return (
                  <div key={i}
                    className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>

                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenTopic(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{topic.category}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{topic.subtopics.slice(0, 4).join(' · ')}...</p>
                      </div>
                      <div className="hidden md:flex items-center gap-3">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">~{topic.frequency} of interviews</span>
                      </div>
                      <span className={`text-slate-400 text-lg ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6">
                        {/* Subtopics */}
                        <div className="mb-5 rounded-2xl p-5 border" style={{ backgroundColor: `${topic.color}06`, borderColor: `${topic.color}25` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: topic.color }}>📌 Key Subtopics to Master</p>
                          <div className="flex flex-wrap gap-2">
                            {topic.subtopics.map((t, j) => (
                              <span key={j} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${topic.color}18`, color: topic.color }}>{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Problems Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-5">
                          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">🎯 Must-Solve Problems (with links)</p>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {topic.questions.map((q, j) => (
                              <div key={j} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                                <span className="text-xs font-bold text-slate-400 w-6 flex-shrink-0">{j + 1}.</span>
                                <span className="text-sm font-semibold text-slate-800 flex-1">{q.q}</span>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${diffColor(q.diff)}`}>{q.diff}</span>
                                <span className="hidden md:block text-xs text-slate-400 flex-shrink-0 w-40 truncate">{q.pattern}</span>
                                <div className="flex gap-2 flex-shrink-0">
                                  <a href={q.lc} target="_blank" rel="noopener noreferrer"
                                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors whitespace-nowrap">
                                    🟠 LC
                                  </a>
                                  <a href={q.gfg} target="_blank" rel="noopener noreferrer"
                                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors whitespace-nowrap">
                                    🟢 GFG
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tip */}
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">💡 Expert Insight</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{topic.tip}</p>
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
            PATTERNS
        ══════════════════════════════════ */}
        {activeTab === 'patterns' && (
          <div id='patt'>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🎯 Algorithm Patterns Cheat Sheet</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Recognizing patterns is 80% of solving interview problems. Learn when to apply each one.</p>
            </div>

            {/* Pattern Decision Guide */}
            <div className="bg-slate-900 rounded-3xl p-7 mb-12 text-white">
              <h3 className="text-xl font-extrabold mb-2 text-center">⚡ Quick Pattern Recognition Guide</h3>
              <p className="text-slate-400 text-sm text-center mb-6">Ask yourself these questions when you see a new problem</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  { q: 'Input is a sorted array?', a: 'Binary Search or Two Pointers', icon: '🔍' },
                  { q: '"Top K" or "K closest"?', a: 'Heap (Priority Queue)', icon: '⛰️' },
                  { q: 'Contiguous subarray/substring?', a: 'Sliding Window', icon: '🪟' },
                  { q: 'Permutations or combinations?', a: 'Backtracking', icon: '🔄' },
                  { q: 'Shortest path in graph?', a: 'BFS (unweighted) / Dijkstra (weighted)', icon: '🌊' },
                  { q: 'Task dependencies / ordering?', a: 'Topological Sort', icon: '📋' },
                  { q: 'Overlapping subproblems?', a: 'Dynamic Programming', icon: '⚡' },
                  { q: 'Connectivity in graph?', a: 'Union-Find or DFS/BFS', icon: '🕸️' },
                  { q: 'Prefix sum / Range query?', a: 'Prefix Sum Array', icon: '📊' },
                  { q: '"Next greater/smaller element"?', a: 'Monotonic Stack', icon: '📚' },
                  { q: 'Tree traversal with levels?', a: 'BFS / Level Order', icon: '🌳' },
                  { q: 'Missing/duplicate in [1..N]?', a: 'Cyclic Sort or XOR', icon: '🔢' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">If: <span className="text-slate-200 font-semibold">{item.q}</span></p>
                    <p className="text-sm font-bold text-green-400">{item.icon} → {item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {patterns.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ borderLeftColor: p.color, borderLeftWidth: '4px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <h3 className="font-extrabold text-slate-800 text-lg">{p.name}</h3>
                    <span className="ml-auto w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">When to use</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.when}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: `${p.color}10` }}>
                    <p className="text-xs font-bold mb-1" style={{ color: p.color }}>Examples</p>
                    <p className="text-xs text-slate-500">{p.example}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Complexity Cheat Sheet */}
            <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-6">⏱️ Time & Space Complexity Cheat Sheet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {[
                  { ds: 'Array Access', tc: 'O(1)', sc: 'O(1)' },
                  { ds: 'Array Search', tc: 'O(n)', sc: 'O(1)' },
                  { ds: 'Binary Search', tc: 'O(log n)', sc: 'O(1)' },
                  { ds: 'Hash Map Get/Put', tc: 'O(1) avg', sc: 'O(n)' },
                  { ds: 'Heap Push/Pop', tc: 'O(log n)', sc: 'O(n)' },
                  { ds: 'Heap Build', tc: 'O(n)', sc: 'O(n)' },
                  { ds: 'BFS / DFS', tc: 'O(V + E)', sc: 'O(V)' },
                  { ds: 'QuickSort', tc: 'O(n log n) avg', sc: 'O(log n)' },
                  { ds: 'MergeSort', tc: 'O(n log n)', sc: 'O(n)' },
                  { ds: 'Tree Traversal', tc: 'O(n)', sc: 'O(h)' },
                  { ds: 'Trie Insert/Search', tc: 'O(m) — m=word len', sc: 'O(ALPHABET×m×n)' },
                  { ds: 'DP (typical 2D)', tc: 'O(n²)', sc: 'O(n²)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-sm font-semibold text-slate-700">{item.ds}</span>
                    <div className="flex gap-2">
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-100 text-blue-700">{item.tc}</span>
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-purple-100 text-purple-700">{item.sc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-100 inline-block" /> Time Complexity</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-100 inline-block" /> Space Complexity</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            COMPANY QUESTIONS
        ══════════════════════════════════ */}
        {activeTab === 'companies' && (
          <div id="comp">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🏢 Company-Specific Coding Questions</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Most frequently asked coding problems at top tech companies, sourced from real interview experiences.</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {[['Easy', 'bg-green-100 text-green-700 border-green-200'], ['Medium', 'bg-yellow-100 text-yellow-700 border-yellow-200'], ['Hard', 'bg-red-100 text-red-700 border-red-200']].map(([diff, cls]) => (
                <span key={diff} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${cls}`}>{diff}</span>
              ))}
              <span className="text-xs text-slate-500 self-center ml-2">Click a company to see questions with direct LeetCode links</span>
            </div>

            <div className="space-y-5">
              {companyQuestions.map((company, i) => {
                const isOpen = openCompany === i
                return (
                  <div key={i} className={`bg-white rounded-3xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-lg'}`}
                    style={isOpen ? { borderColor: company.color } : {}}>
                    <button className="w-full flex items-center gap-5 p-6 text-left" onClick={() => setOpenCompany(isOpen ? null : i)}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: `${company.color}18` }}>{company.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-extrabold text-slate-900">{company.company}</h3>
                        <p className="text-sm text-slate-400 mt-1">{company.focus}</p>
                      </div>
                      <div className="hidden md:flex flex-wrap gap-1 max-w-xs justify-end">
                        {company.topTopics.map((t, j) => (
                          <span key={j} className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: `${company.color}15`, color: company.color }}>{t}</span>
                        ))}
                      </div>
                      <span className={`text-slate-400 text-lg ml-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Most Asked Questions</p>
                            <span className="text-xs text-slate-400">{company.questions.length} problems</span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {company.questions.map((q, j) => (
                              <div key={j} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
                                <span className="text-xs font-bold text-slate-400 w-6 flex-shrink-0">{j + 1}.</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-slate-800">{q.q}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{q.note}</p>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${diffColor(q.diff)}`}>{q.diff}</span>
                                <a href={q.lc} target="_blank" rel="noopener noreferrer"
                                  className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
                                  🟠 LeetCode
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">🎯 {company.company} Coding Focus</p>
                          <p className="text-slate-300 text-sm">{company.focus}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {company.topTopics.map((t, j) => (
                              <span key={j} className="text-xs px-2.5 py-1 rounded-lg font-bold" style={{ backgroundColor: `${company.color}25`, color: company.color }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Study tip */}
            <div className="mt-10 bg-gradient-to-br from-blue-950 to-slate-900 rounded-3xl p-7 text-white">
              <h3 className="text-xl font-extrabold mb-4 text-center">📊 How to Use Company Questions Effectively</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { step: '01', title: '4–6 Weeks Before', desc: 'Do the Must-Solve problems for ALL companies. These appear everywhere and build core DSA muscles.', color: '#3B82F6' },
                  { step: '02', title: '2–3 Weeks Before', desc: 'Focus on your target company\'s questions. Sort by frequency using LeetCode Premium or Glassdoor reports.', color: '#10B981' },
                  { step: '03', title: 'Final Week', desc: 'Re-solve your weakest problems from memory. Time yourself. Aim for under 20 min on Medium, under 35 min on Hard.', color: '#F59E0B' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-5">
                    <p className="text-xs font-extrabold mb-1" style={{ color: s.color }}>STEP {s.step}</p>
                    <h4 className="font-extrabold text-white mb-2">{s.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            PLATFORMS
        ══════════════════════════════════ */}
        {activeTab === 'platforms' && (
          <div id='plat'>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💻 Best Coding Platforms</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">The definitive list of platforms — what each is best for, and how to use them in your prep.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {platforms.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block"
                  style={{ borderTopColor: p.color, borderTopWidth: '4px' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-xl group-hover:text-blue-600 transition-colors">{p.name}</h3>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: p.color }}>{p.tag}</span>
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-lg">→</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />{f}
                      </div>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Recommended Schedule */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">📅 Recommended Practice Schedule</h3>
              <p className="text-slate-500 text-sm mb-7">How to use multiple platforms strategically during your prep</p>
              <div className="space-y-4">
                {[
                  { phase: 'Daily (Every day)', platform: 'LeetCode', color: '#FFA116', icon: '🟠', task: "Solve 2–3 problems. Use Topic filter to focus on weak areas. Participate in weekly contests on weekends." },
                  { phase: 'Concept Learning', platform: 'GeeksforGeeks', color: '#2F8D46', icon: '🟢', task: "When you don't understand a concept (e.g., How does Trie work?), read GFG article before attempting LeetCode problems." },
                  { phase: '2–3× per week', platform: 'Codeforces / AtCoder', color: '#1E90FF', icon: '🔵', task: 'Participate in contests to improve speed and pressure handling. Aim for Div. 2 A, B, C problems on Codeforces.' },
                  { phase: 'OA Simulation', platform: 'HackerRank', color: '#00EA64', icon: '🟩', task: '2 weeks before target company OA, do HackerRank company kits to get used to the exact interface and problem style.' },
                  { phase: 'Structured Learning', platform: 'InterviewBit', color: '#6200EE', icon: '🟣', task: 'Follow their guided tracks if you want a structured day-by-day plan. Great for beginners who want a roadmap.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="font-extrabold text-slate-800">{item.platform}</h4>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.phase}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-2 text-center">🔗 Quick Links — Most Important Resources</h3>
              <p className="text-slate-400 text-sm text-center mb-7">Bookmark these — you will use them every single day</p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {[
                  { name: 'LeetCode Top 150', url: 'https://leetcode.com/studyplan/top-interview-150/', color: '#FFA116' },
                  { name: 'NeetCode 150', url: 'https://neetcode.io/practice', color: '#3B82F6' },
                  { name: 'GFG DSA Sheet', url: 'https://www.geeksforgeeks.org/sde-sheet-a-complete-guide-for-sde-preparation/', color: '#2F8D46' },
                  { name: "Striver's A2Z Sheet", url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', color: '#EF4444' },
                  { name: 'CSES Problem Set', url: 'https://cses.fi/problemset/', color: '#E53E3E' },
                  { name: 'LeetCode Patterns', url: 'https://seanprashad.com/leetcode-patterns/', color: '#8B5CF6' },
                  { name: 'Codeforces Problemset', url: 'https://codeforces.com/problemset', color: '#1E90FF' },
                  { name: 'Blind 75 / Grind 75', url: 'https://www.techinterviewhandbook.org/grind75', color: '#F59E0B' },
                  { name: 'AtCoder Beginner', url: 'https://atcoder.jp/contests/abc', color: '#888888' },
                  { name: 'HackerRank Interview Kit', url: 'https://www.hackerrank.com/interview/interview-preparation-kit', color: '#00EA64' },
                  { name: 'InterviewBit DSA', url: 'https://www.interviewbit.com/courses/programming/', color: '#6200EE' },
                  { name: 'AlgoExpert 160', url: 'https://www.algoexpert.io', color: '#06B6D4' },
                ].map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="bg-white/10 border border-white/15 rounded-xl p-3 text-center hover:bg-white/20 transition-colors group block">
                    <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">{link.name}</p>
                    <div className="w-12 h-0.5 mx-auto mt-2 rounded-full" style={{ backgroundColor: link.color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm mb-3">🧠 Master DSA · 🎯 Learn Patterns · 🏢 Crack Company Rounds · 💻 Use the Best Platforms</p>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
              © 2026 aiplacprep@gmail.com  Built for engineers aiming at FAANG and top tech companies.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Coding
