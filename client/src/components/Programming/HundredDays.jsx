import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/image.png'
const phases = [
  {
    phase: 1,
    title: 'Arrays & Strings',
    days: 'Day 1–20',
    color: '#3B82F6',
    icon: '📊',
    desc: 'Foundation of all DSA. Master array manipulation, string operations, and classic patterns like two pointers and sliding window.',
    problems: [
      { day: 1,  title: 'Two Sum',                          diff: 'Easy',   topic: 'Array / Hash Map',      url: 'https://leetcode.com/problems/two-sum/' },
      { day: 2,  title: 'Best Time to Buy and Sell Stock',  diff: 'Easy',   topic: 'Array / Greedy',        url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { day: 3,  title: 'Contains Duplicate',               diff: 'Easy',   topic: 'Array / Hash Set',      url: 'https://leetcode.com/problems/contains-duplicate/' },
      { day: 4,  title: 'Product of Array Except Self',     diff: 'Medium', topic: 'Array / Prefix Sum',    url: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { day: 5,  title: 'Maximum Subarray',                 diff: 'Medium', topic: 'Array / Kadane\'s',     url: 'https://leetcode.com/problems/maximum-subarray/' },
      { day: 6,  title: 'Maximum Product Subarray',         diff: 'Medium', topic: 'Array / DP',            url: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { day: 7,  title: 'Find Minimum in Rotated Array',    diff: 'Medium', topic: 'Binary Search',         url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
      { day: 8,  title: 'Search in Rotated Sorted Array',   diff: 'Medium', topic: 'Binary Search',         url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { day: 9,  title: '3Sum',                             diff: 'Medium', topic: 'Two Pointers',          url: 'https://leetcode.com/problems/3sum/' },
      { day: 10, title: 'Container With Most Water',        diff: 'Medium', topic: 'Two Pointers',          url: 'https://leetcode.com/problems/container-with-most-water/' },
      { day: 11, title: 'Valid Anagram',                    diff: 'Easy',   topic: 'String / Hash Map',     url: 'https://leetcode.com/problems/valid-anagram/' },
      { day: 12, title: 'Group Anagrams',                   diff: 'Medium', topic: 'String / Hash Map',     url: 'https://leetcode.com/problems/group-anagrams/' },
      { day: 13, title: 'Longest Substring Without Repeat', diff: 'Medium', topic: 'Sliding Window',        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { day: 14, title: 'Minimum Window Substring',         diff: 'Hard',   topic: 'Sliding Window',        url: 'https://leetcode.com/problems/minimum-window-substring/' },
      { day: 15, title: 'Valid Palindrome',                 diff: 'Easy',   topic: 'String / Two Pointers', url: 'https://leetcode.com/problems/valid-palindrome/' },
      { day: 16, title: 'Longest Palindromic Substring',    diff: 'Medium', topic: 'String / DP',           url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { day: 17, title: 'Palindromic Substrings',           diff: 'Medium', topic: 'String / DP',           url: 'https://leetcode.com/problems/palindromic-substrings/' },
      { day: 18, title: 'Encode and Decode Strings',        diff: 'Medium', topic: 'String Design',         url: 'https://leetcode.com/problems/encode-and-decode-strings/' },
      { day: 19, title: 'Trapping Rain Water',              diff: 'Hard',   topic: 'Array / Two Pointers',  url: 'https://leetcode.com/problems/trapping-rain-water/' },
      { day: 20, title: 'Merge Intervals',                  diff: 'Medium', topic: 'Array / Sorting',       url: 'https://leetcode.com/problems/merge-intervals/' },
    ],
  },
  {
    phase: 2,
    title: 'Linked Lists & Stacks',
    days: 'Day 21–40',
    color: '#8B5CF6',
    icon: '🔗',
    desc: 'Pointer-based structures. Master fast/slow pointer technique, reversal patterns, and stack-based problems.',
    problems: [
      { day: 21, title: 'Reverse Linked List',              diff: 'Easy',   topic: 'Linked List',           url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { day: 22, title: 'Merge Two Sorted Lists',           diff: 'Easy',   topic: 'Linked List',           url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { day: 23, title: 'Reorder List',                     diff: 'Medium', topic: 'Linked List',           url: 'https://leetcode.com/problems/reorder-list/' },
      { day: 24, title: 'Remove Nth Node From End',         diff: 'Medium', topic: 'Linked List / Two Ptr', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
      { day: 25, title: 'Copy List with Random Pointer',    diff: 'Medium', topic: 'Linked List / Hash',    url: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
      { day: 26, title: 'Add Two Numbers',                  diff: 'Medium', topic: 'Linked List / Math',    url: 'https://leetcode.com/problems/add-two-numbers/' },
      { day: 27, title: 'Linked List Cycle',                diff: 'Easy',   topic: 'Linked List / Floyd\'s',url: 'https://leetcode.com/problems/linked-list-cycle/' },
      { day: 28, title: 'Find the Duplicate Number',        diff: 'Medium', topic: 'Array / Floyd\'s',      url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      { day: 29, title: 'LRU Cache',                        diff: 'Medium', topic: 'Design / DLL + Hash',   url: 'https://leetcode.com/problems/lru-cache/' },
      { day: 30, title: 'Merge K Sorted Lists',             diff: 'Hard',   topic: 'Linked List / Heap',    url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { day: 31, title: 'Reverse Nodes in k-Group',         diff: 'Hard',   topic: 'Linked List',           url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
      { day: 32, title: 'Valid Parentheses',                diff: 'Easy',   topic: 'Stack',                 url: 'https://leetcode.com/problems/valid-parentheses/' },
      { day: 33, title: 'Min Stack',                        diff: 'Medium', topic: 'Stack / Design',        url: 'https://leetcode.com/problems/min-stack/' },
      { day: 34, title: 'Evaluate Reverse Polish Notation', diff: 'Medium', topic: 'Stack',                 url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
      { day: 35, title: 'Generate Parentheses',             diff: 'Medium', topic: 'Stack / Backtracking',  url: 'https://leetcode.com/problems/generate-parentheses/' },
      { day: 36, title: 'Daily Temperatures',               diff: 'Medium', topic: 'Monotonic Stack',       url: 'https://leetcode.com/problems/daily-temperatures/' },
      { day: 37, title: 'Car Fleet',                        diff: 'Medium', topic: 'Monotonic Stack',       url: 'https://leetcode.com/problems/car-fleet/' },
      { day: 38, title: 'Largest Rectangle in Histogram',   diff: 'Hard',   topic: 'Monotonic Stack',       url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
      { day: 39, title: 'Decode String',                    diff: 'Medium', topic: 'Stack / Recursion',     url: 'https://leetcode.com/problems/decode-string/' },
      { day: 40, title: 'Asteroid Collision',               diff: 'Medium', topic: 'Stack',                 url: 'https://leetcode.com/problems/asteroid-collision/' },
    ],
  },
  {
    phase: 3,
    title: 'Trees & Graphs',
    days: 'Day 41–75',
    color: '#10B981',
    icon: '🌳',
    desc: 'The most asked category in FAANG. BFS, DFS, BST operations, topological sort, and advanced graph algorithms.',
    problems: [
      { day: 41, title: 'Invert Binary Tree',               diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/invert-binary-tree/' },
      { day: 42, title: 'Maximum Depth of Binary Tree',     diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { day: 43, title: 'Diameter of Binary Tree',          diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { day: 44, title: 'Balanced Binary Tree',             diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/balanced-binary-tree/' },
      { day: 45, title: 'Same Tree',                        diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/same-tree/' },
      { day: 46, title: 'Subtree of Another Tree',          diff: 'Easy',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/subtree-of-another-tree/' },
      { day: 47, title: 'Lowest Common Ancestor BST',       diff: 'Medium', topic: 'Tree / BST',            url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
      { day: 48, title: 'Binary Tree Level Order Traversal',diff: 'Medium', topic: 'Tree / BFS',            url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { day: 49, title: 'Binary Tree Right Side View',      diff: 'Medium', topic: 'Tree / BFS',            url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
      { day: 50, title: 'Count Good Nodes in Binary Tree',  diff: 'Medium', topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
      { day: 51, title: 'Validate Binary Search Tree',      diff: 'Medium', topic: 'Tree / BST',            url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { day: 52, title: 'Kth Smallest in BST',              diff: 'Medium', topic: 'Tree / BST / InOrder',  url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
      { day: 53, title: 'Construct Tree from PreOrder+InOrder', diff: 'Medium', topic: 'Tree / Divide',    url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { day: 54, title: 'Binary Tree Max Path Sum',         diff: 'Hard',   topic: 'Tree / DFS',            url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
      { day: 55, title: 'Serialize and Deserialize BST',    diff: 'Hard',   topic: 'Tree / Design',         url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
      { day: 56, title: 'Number of Islands',                diff: 'Medium', topic: 'Graph / DFS',           url: 'https://leetcode.com/problems/number-of-islands/' },
      { day: 57, title: 'Clone Graph',                      diff: 'Medium', topic: 'Graph / BFS',           url: 'https://leetcode.com/problems/clone-graph/' },
      { day: 58, title: 'Max Area of Island',               diff: 'Medium', topic: 'Graph / DFS',           url: 'https://leetcode.com/problems/max-area-of-island/' },
      { day: 59, title: 'Pacific Atlantic Water Flow',       diff: 'Medium', topic: 'Graph / DFS',           url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { day: 60, title: 'Surrounded Regions',               diff: 'Medium', topic: 'Graph / DFS',           url: 'https://leetcode.com/problems/surrounded-regions/' },
      { day: 61, title: 'Rotting Oranges',                  diff: 'Medium', topic: 'Graph / BFS',           url: 'https://leetcode.com/problems/rotting-oranges/' },
      { day: 62, title: 'Walls and Gates',                  diff: 'Medium', topic: 'Graph / BFS',           url: 'https://leetcode.com/problems/walls-and-gates/' },
      { day: 63, title: 'Course Schedule',                  diff: 'Medium', topic: 'Graph / Topological',   url: 'https://leetcode.com/problems/course-schedule/' },
      { day: 64, title: 'Course Schedule II',               diff: 'Medium', topic: 'Graph / Topological',   url: 'https://leetcode.com/problems/course-schedule-ii/' },
      { day: 65, title: 'Graph Valid Tree',                  diff: 'Medium', topic: 'Graph / Union Find',    url: 'https://leetcode.com/problems/graph-valid-tree/' },
      { day: 66, title: 'Number of Connected Components',   diff: 'Medium', topic: 'Graph / Union Find',    url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
      { day: 67, title: 'Redundant Connection',             diff: 'Medium', topic: 'Graph / Union Find',    url: 'https://leetcode.com/problems/redundant-connection/' },
      { day: 68, title: 'Word Ladder',                      diff: 'Hard',   topic: 'Graph / BFS',           url: 'https://leetcode.com/problems/word-ladder/' },
      { day: 69, title: 'Alien Dictionary',                 diff: 'Hard',   topic: 'Graph / Topological',   url: 'https://leetcode.com/problems/alien-dictionary/' },
      { day: 70, title: 'Network Delay Time',               diff: 'Medium', topic: 'Graph / Dijkstra',      url: 'https://leetcode.com/problems/network-delay-time/' },
      { day: 71, title: 'Swim in Rising Water',             diff: 'Hard',   topic: 'Graph / Dijkstra',      url: 'https://leetcode.com/problems/swim-in-rising-water/' },
      { day: 72, title: 'Cheapest Flights Within K Stops',  diff: 'Medium', topic: 'Graph / Bellman-Ford',  url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
      { day: 73, title: 'Word Search',                      diff: 'Medium', topic: 'Graph / Backtracking',  url: 'https://leetcode.com/problems/word-search/' },
      { day: 74, title: 'Word Search II',                   diff: 'Hard',   topic: 'Graph / Trie',          url: 'https://leetcode.com/problems/word-search-ii/' },
      { day: 75, title: 'Reconstruct Itinerary',            diff: 'Hard',   topic: 'Graph / Euler Path',    url: 'https://leetcode.com/problems/reconstruct-itinerary/' },
    ],
  },
  {
    phase: 4,
    title: 'Dynamic Programming',
    days: 'Day 76–110',
    color: '#F59E0B',
    icon: '⚡',
    desc: 'The most challenging and rewarding category. Memoization, tabulation, 1D/2D DP, knapsack, and decision-making patterns.',
    problems: [
      { day: 76,  title: 'Climbing Stairs',                 diff: 'Easy',   topic: 'DP / Fibonacci',        url: 'https://leetcode.com/problems/climbing-stairs/' },
      { day: 77,  title: 'Min Cost Climbing Stairs',        diff: 'Easy',   topic: 'DP / 1D',               url: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
      { day: 78,  title: 'House Robber',                    diff: 'Medium', topic: 'DP / 1D',               url: 'https://leetcode.com/problems/house-robber/' },
      { day: 79,  title: 'House Robber II',                 diff: 'Medium', topic: 'DP / 1D Circular',      url: 'https://leetcode.com/problems/house-robber-ii/' },
      { day: 80,  title: 'Longest Palindromic Substring',   diff: 'Medium', topic: 'DP / 2D',               url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { day: 81,  title: 'Palindromic Substrings',          diff: 'Medium', topic: 'DP / 2D',               url: 'https://leetcode.com/problems/palindromic-substrings/' },
      { day: 82,  title: 'Decode Ways',                     diff: 'Medium', topic: 'DP / 1D',               url: 'https://leetcode.com/problems/decode-ways/' },
      { day: 83,  title: 'Coin Change',                     diff: 'Medium', topic: 'DP / Unbounded Knapsack',url: 'https://leetcode.com/problems/coin-change/' },
      { day: 84,  title: 'Maximum Product Subarray',        diff: 'Medium', topic: 'DP / Kadane Variant',   url: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { day: 85,  title: 'Word Break',                      diff: 'Medium', topic: 'DP / 1D',               url: 'https://leetcode.com/problems/word-break/' },
      { day: 86,  title: 'Combination Sum IV',              diff: 'Medium', topic: 'DP / Unbounded',        url: 'https://leetcode.com/problems/combination-sum-iv/' },
      { day: 87,  title: 'Unique Paths',                    diff: 'Medium', topic: 'DP / 2D Grid',          url: 'https://leetcode.com/problems/unique-paths/' },
      { day: 88,  title: 'Jump Game',                       diff: 'Medium', topic: 'DP / Greedy',           url: 'https://leetcode.com/problems/jump-game/' },
      { day: 89,  title: 'Jump Game II',                    diff: 'Medium', topic: 'DP / Greedy',           url: 'https://leetcode.com/problems/jump-game-ii/' },
      { day: 90,  title: 'Partition Equal Subset Sum',      diff: 'Medium', topic: 'DP / 0-1 Knapsack',     url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
      { day: 91,  title: 'Longest Increasing Subsequence',  diff: 'Medium', topic: 'DP / LIS',              url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { day: 92,  title: 'Longest Common Subsequence',      diff: 'Medium', topic: 'DP / LCS',              url: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { day: 93,  title: 'Best Time to Buy and Sell III',   diff: 'Hard',   topic: 'DP / State Machine',    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/' },
      { day: 94,  title: 'Edit Distance',                   diff: 'Hard',   topic: 'DP / 2D',               url: 'https://leetcode.com/problems/edit-distance/' },
      { day: 95,  title: 'Burst Balloons',                  diff: 'Hard',   topic: 'DP / Interval',         url: 'https://leetcode.com/problems/burst-balloons/' },
      { day: 96,  title: 'Regular Expression Matching',     diff: 'Hard',   topic: 'DP / 2D',               url: 'https://leetcode.com/problems/regular-expression-matching/' },
      { day: 97,  title: 'Wildcard Matching',               diff: 'Hard',   topic: 'DP / 2D',               url: 'https://leetcode.com/problems/wildcard-matching/' },
      { day: 98,  title: 'Interleaving String',             diff: 'Medium', topic: 'DP / 2D',               url: 'https://leetcode.com/problems/interleaving-string/' },
      { day: 99,  title: 'Distinct Subsequences',           diff: 'Hard',   topic: 'DP / 2D',               url: 'https://leetcode.com/problems/distinct-subsequences/' },
      { day: 100, title: 'Maximum Profit in Job Scheduling',diff: 'Hard',   topic: 'DP / Binary Search',    url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/' },
      { day: 101, title: 'Number of Dice Rolls With Target', diff: 'Medium', topic: 'DP / 2D',              url: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/' },
      { day: 102, title: 'Minimum Path Sum',                diff: 'Medium', topic: 'DP / 2D Grid',          url: 'https://leetcode.com/problems/minimum-path-sum/' },
      { day: 103, title: 'Triangle',                        diff: 'Medium', topic: 'DP / Triangle',         url: 'https://leetcode.com/problems/triangle/' },
      { day: 104, title: 'Maximal Square',                  diff: 'Medium', topic: 'DP / 2D',               url: 'https://leetcode.com/problems/maximal-square/' },
      { day: 105, title: 'Stock Buy Sell with Cooldown',    diff: 'Medium', topic: 'DP / State Machine',    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
      { day: 106, title: 'Coin Change II',                  diff: 'Medium', topic: 'DP / Unbounded',        url: 'https://leetcode.com/problems/coin-change-ii/' },
      { day: 107, title: 'Target Sum',                      diff: 'Medium', topic: 'DP / 0-1 Knapsack',     url: 'https://leetcode.com/problems/target-sum/' },
      { day: 108, title: 'Ones and Zeroes',                 diff: 'Medium', topic: 'DP / 2D Knapsack',      url: 'https://leetcode.com/problems/ones-and-zeroes/' },
      { day: 109, title: 'Strange Printer',                 diff: 'Hard',   topic: 'DP / Interval',         url: 'https://leetcode.com/problems/strange-printer/' },
      { day: 110, title: 'Minimum Window Subsequence',      diff: 'Hard',   topic: 'DP / Sliding Window',   url: 'https://leetcode.com/problems/minimum-window-subsequence/' },
    ],
  },
  {
    phase: 5,
    title: 'Heap, Backtracking & Advanced',
    days: 'Day 111–150',
    color: '#EF4444',
    icon: '🏆',
    desc: 'Final stretch. Heaps, tries, backtracking, bit manipulation, greedy, and math-based problems to complete your preparation.',
    problems: [
      { day: 111, title: 'Kth Largest Element in Array',    diff: 'Medium', topic: 'Heap / QuickSelect',    url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { day: 112, title: 'Last Stone Weight',               diff: 'Easy',   topic: 'Heap / Max Heap',       url: 'https://leetcode.com/problems/last-stone-weight/' },
      { day: 113, title: 'K Closest Points to Origin',      diff: 'Medium', topic: 'Heap / Min Heap',       url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
      { day: 114, title: 'Task Scheduler',                  diff: 'Medium', topic: 'Heap / Greedy',         url: 'https://leetcode.com/problems/task-scheduler/' },
      { day: 115, title: 'Design Twitter',                  diff: 'Medium', topic: 'Heap / Design',         url: 'https://leetcode.com/problems/design-twitter/' },
      { day: 116, title: 'Find Median from Data Stream',    diff: 'Hard',   topic: 'Heap / Two Heaps',      url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
      { day: 117, title: 'Top K Frequent Elements',         diff: 'Medium', topic: 'Heap / Bucket Sort',    url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { day: 118, title: 'Top K Frequent Words',            diff: 'Medium', topic: 'Heap / Hash Map',       url: 'https://leetcode.com/problems/top-k-frequent-words/' },
      { day: 119, title: 'Ugly Number II',                  diff: 'Medium', topic: 'Heap / DP',             url: 'https://leetcode.com/problems/ugly-number-ii/' },
      { day: 120, title: 'Implement Trie',                  diff: 'Medium', topic: 'Trie / Design',         url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { day: 121, title: 'Add and Search Word',             diff: 'Medium', topic: 'Trie / DFS',            url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { day: 122, title: 'Subsets',                         diff: 'Medium', topic: 'Backtracking',          url: 'https://leetcode.com/problems/subsets/' },
      { day: 123, title: 'Subsets II',                      diff: 'Medium', topic: 'Backtracking / Dedup',  url: 'https://leetcode.com/problems/subsets-ii/' },
      { day: 124, title: 'Combination Sum',                 diff: 'Medium', topic: 'Backtracking',          url: 'https://leetcode.com/problems/combination-sum/' },
      { day: 125, title: 'Combination Sum II',              diff: 'Medium', topic: 'Backtracking / Dedup',  url: 'https://leetcode.com/problems/combination-sum-ii/' },
      { day: 126, title: 'Permutations',                    diff: 'Medium', topic: 'Backtracking',          url: 'https://leetcode.com/problems/permutations/' },
      { day: 127, title: 'Permutations II',                 diff: 'Medium', topic: 'Backtracking / Dedup',  url: 'https://leetcode.com/problems/permutations-ii/' },
      { day: 128, title: 'N-Queens',                        diff: 'Hard',   topic: 'Backtracking',          url: 'https://leetcode.com/problems/n-queens/' },
      { day: 129, title: 'Sudoku Solver',                   diff: 'Hard',   topic: 'Backtracking',          url: 'https://leetcode.com/problems/sudoku-solver/' },
      { day: 130, title: 'Letter Combinations Phone Number',diff: 'Medium', topic: 'Backtracking',          url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
      { day: 131, title: 'Palindrome Partitioning',         diff: 'Medium', topic: 'Backtracking / DP',     url: 'https://leetcode.com/problems/palindrome-partitioning/' },
      { day: 132, title: 'Number of 1 Bits',                diff: 'Easy',   topic: 'Bit Manipulation',      url: 'https://leetcode.com/problems/number-of-1-bits/' },
      { day: 133, title: 'Counting Bits',                   diff: 'Easy',   topic: 'Bit Manipulation / DP', url: 'https://leetcode.com/problems/counting-bits/' },
      { day: 134, title: 'Reverse Bits',                    diff: 'Easy',   topic: 'Bit Manipulation',      url: 'https://leetcode.com/problems/reverse-bits/' },
      { day: 135, title: 'Missing Number',                  diff: 'Easy',   topic: 'Bit Manipulation / XOR',url: 'https://leetcode.com/problems/missing-number/' },
      { day: 136, title: 'Sum of Two Integers',             diff: 'Medium', topic: 'Bit Manipulation',      url: 'https://leetcode.com/problems/sum-of-two-integers/' },
      { day: 137, title: 'Reverse Integer',                 diff: 'Medium', topic: 'Math',                  url: 'https://leetcode.com/problems/reverse-integer/' },
      { day: 138, title: 'Pow(x, n)',                       diff: 'Medium', topic: 'Math / Fast Exponent',  url: 'https://leetcode.com/problems/powx-n/' },
      { day: 139, title: 'Multiply Strings',                diff: 'Medium', topic: 'Math / String',         url: 'https://leetcode.com/problems/multiply-strings/' },
      { day: 140, title: 'Spiral Matrix',                   diff: 'Medium', topic: 'Matrix / Simulation',   url: 'https://leetcode.com/problems/spiral-matrix/' },
      { day: 141, title: 'Rotate Image',                    diff: 'Medium', topic: 'Matrix / In-place',     url: 'https://leetcode.com/problems/rotate-image/' },
      { day: 142, title: 'Set Matrix Zeroes',               diff: 'Medium', topic: 'Matrix',                url: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { day: 143, title: 'Game of Life',                    diff: 'Medium', topic: 'Matrix / Simulation',   url: 'https://leetcode.com/problems/game-of-life/' },
      { day: 144, title: 'Meeting Rooms',                   diff: 'Easy',   topic: 'Greedy / Intervals',    url: 'https://leetcode.com/problems/meeting-rooms/' },
      { day: 145, title: 'Meeting Rooms II',                diff: 'Medium', topic: 'Greedy / Heap',         url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { day: 146, title: 'Non-overlapping Intervals',       diff: 'Medium', topic: 'Greedy / Intervals',    url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { day: 147, title: 'Insert Interval',                 diff: 'Medium', topic: 'Greedy / Intervals',    url: 'https://leetcode.com/problems/insert-interval/' },
      { day: 148, title: 'Median of Two Sorted Arrays',     diff: 'Hard',   topic: 'Binary Search',         url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
      { day: 149, title: 'Sliding Window Maximum',          diff: 'Hard',   topic: 'Deque / Monotonic',     url: 'https://leetcode.com/problems/sliding-window-maximum/' },
      { day: 150, title: 'Longest Consecutive Sequence',    diff: 'Medium', topic: 'Array / Hash Set',      url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    ],
  },
]

const diffStyle = (d) =>
  d === 'Easy'   ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
  d === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                   'bg-red-100 text-red-700 border border-red-200'

const HundredDays = () => {
  const navigate = useNavigate()
  const [openPhase, setOpenPhase] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [completed, setCompleted] = useState({})

  const totalDone = Object.values(completed).filter(Boolean).length

  const toggleDone = (day) => setCompleted(p => ({ ...p, [day]: !p[day] }))

  const allProblems = phases.flatMap(p => p.problems)
  const easy   = allProblems.filter(p => p.diff === 'Easy').length
  const medium = allProblems.filter(p => p.diff === 'Medium').length
  const hard   = allProblems.filter(p => p.diff === 'Hard').length

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)' }}>

      {/* NAVBAR */}
      <nav className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(15,15,26,0.85)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <img onClick={() => navigate("/")}
                          src={logo}
                          alt="logo"
                          className="w-32 sm:w-40 cursor-pointer rounded"
                        />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <div className="text-emerald-400 font-black text-lg">{easy}</div>
              <div className="text-slate-500 text-xs">Easy</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <div className="text-amber-400 font-black text-lg">{medium}</div>
              <div className="text-slate-500 text-xs">Medium</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <div className="text-red-400 font-black text-lg">{hard}</div>
              <div className="text-slate-500 text-xs">Hard</div>
            </div>
          </div>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f96616, #ef4114)' }}>
            🔗 LeetCode
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-bold px-5 py-2 rounded-full mb-7 uppercase tracking-widest">
            🚀 FAANG Interview Preparation
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 leading-none tracking-tight">
            <span className="text-white">150</span>
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Days</span>
          </h1>
          <p className="text-3xl font-black text-white mb-4">LeetCode Challenge</p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            150 hand-picked problems across 5 phases — Arrays, Linked Lists, Trees, DP, and Advanced topics. Click any problem to solve it on LeetCode.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto mb-10">
            {[
              { val: '150', label: 'Problems', color: '#f97316' },
              { val: easy,  label: 'Easy',     color: '#10b981' },
              { val: medium,label: 'Medium',   color: '#f59e0b' },
              { val: hard,  label: 'Hard',     color: '#ef4444' },
              { val: `${totalDone}`, label: 'Solved ✓', color: '#8b5cf6' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-white/10 px-4 py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
                <div className="text-slate-500 text-xs font-semibold">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-400">Your Progress</span>
              <span className="text-orange-400">{totalDone} / 150 solved</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-3 rounded-full transition-all duration-500"
                style={{ width: `${(totalDone / 150) * 100}%`, background: 'linear-gradient(90deg, #f97316, #ef4444)' }} />
            </div>
          </div>

          {/* Filter + Search */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {['All', 'Easy', 'Medium', 'Hard'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-sm font-bold border transition-all ${
                  filter === f
                    ? f === 'Easy' ? 'bg-emerald-500 border-emerald-500 text-white'
                    : f === 'Medium' ? 'bg-amber-500 border-amber-500 text-white'
                    : f === 'Hard' ? 'bg-red-500 border-red-500 text-white'
                    : 'text-white border-orange-500' + ' bg-orange-500'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                }`}
                style={filter === f && f === 'All' ? { background: 'linear-gradient(135deg,#f97316,#ef4444)', borderColor: 'transparent' } : {}}>
                {f}
              </button>
            ))}
          </div>
          <div className="max-w-sm mx-auto">
            <input
              type="text"
              placeholder="🔍  Search problems..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-orange-500/50"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            />
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        {/* If searching, show flat list */}
        {search.trim() !== '' ? (
          <div>
            <p className="text-slate-400 text-sm mb-5 font-medium">
              Search results for "<span className="text-white font-bold">{search}</span>"
            </p>
            <div className="space-y-2">
              {allProblems
                .filter(p =>
                  p.title.toLowerCase().includes(search.toLowerCase()) ||
                  p.topic.toLowerCase().includes(search.toLowerCase())
                )
                .filter(p => filter === 'All' || p.diff === filter)
                .map(p => (
                  <a key={p.day} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/10 hover:border-orange-500/40 transition-all group"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-xs font-black text-slate-500 w-10 flex-shrink-0">#{p.day}</span>
                    <span className="font-bold text-slate-300 group-hover:text-white flex-1 text-sm">{p.title}</span>
                    <span className="text-xs text-slate-500 hidden md:block">{p.topic}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${diffStyle(p.diff)}`}>{p.diff}</span>
                    <span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                  </a>
                ))}
            </div>
          </div>
        ) : (
          /* Phase accordions */
          <div className="space-y-5">
            {phases.map((phase, pi) => {
              const isOpen = openPhase === pi
              const filtered = phase.problems.filter(p => filter === 'All' || p.diff === filter)
              const phaseDone = phase.problems.filter(p => completed[p.day]).length

              return (
                <div key={pi} className="rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{ borderColor: isOpen ? phase.color + '60' : 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>

                  {/* Phase header */}
                  <button className="w-full flex items-center gap-5 p-6 text-left" onClick={() => setOpenPhase(isOpen ? null : pi)}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: `${phase.color}18`, border: `2px solid ${phase.color}40` }}>
                      {phase.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: phase.color }}>Phase {phase.phase}</span>
                        <span className="text-xs font-bold text-slate-500 border border-white/10 px-2.5 py-0.5 rounded-full">{phase.days}</span>
                      </div>
                      <h3 className="text-xl font-black text-white">{phase.title}</h3>
                      <p className="text-slate-500 text-xs mt-1 hidden md:block">{phase.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-black text-white">{phaseDone}/{phase.problems.length}</div>
                        <div className="text-xs text-slate-500">solved</div>
                        <div className="w-20 bg-white/10 rounded-full h-1.5 mt-1">
                          <div className="h-1.5 rounded-full transition-all" style={{ width: `${(phaseDone / phase.problems.length) * 100}%`, backgroundColor: phase.color }} />
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {['Easy','Medium','Hard'].map(d => (
                          <span key={d} className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffStyle(d)}`}>
                            {phase.problems.filter(p => p.diff === d).length}
                          </span>
                        ))}
                      </div>
                      <span className={`text-slate-400 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                  </button>

                  {/* Problem list */}
                  {isOpen && (
                    <div className="border-t border-white/5">
                      {/* Phase desc on mobile */}
                      <p className="text-slate-500 text-xs px-6 pt-4 pb-2 md:hidden">{phase.desc}</p>

                      <div className="divide-y divide-white/5">
                        {filtered.length === 0 && (
                          <p className="text-slate-500 text-sm px-6 py-6 text-center">No {filter} problems in this phase.</p>
                        )}
                        {filtered.map((prob, i) => (
                          <div key={prob.day} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 group hover:bg-white/3 transition-colors">
                            {/* Checkbox */}
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDone(prob.day); }}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${completed[prob.day] ? 'border-transparent' : 'border-white/20 hover:border-white/40'}`}
                              style={completed[prob.day] ? { backgroundColor: phase.color } : {}}>
                              {completed[prob.day] && <span className="text-white text-xs font-black">✓</span>}
                            </button>

                            {/* Day number */}
                            <span className="text-xs font-black w-8 flex-shrink-0"
                              style={{ color: `${phase.color}90` }}>
                              {prob.day}
                            </span>

                            {/* Problem link */}
                            <a href={prob.url} target="_blank" rel="noopener noreferrer"
                              className={`font-semibold text-sm flex-1 transition-colors hover:underline underline-offset-2 ${completed[prob.day] ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>
                              {prob.title}
                            </a>

                            {/* Topic tag */}
                            <span className="text-xs text-slate-600 hidden lg:block font-medium truncate max-w-[160px]">
                              {prob.topic}
                            </span>

                            {/* Difficulty */}
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${diffStyle(prob.diff)}`}>
                              {prob.diff}
                            </span>

                            {/* External link */}
                            <a href={prob.url} target="_blank" rel="noopener noreferrer"
                              className="text-slate-600 hover:text-orange-400 transition-colors flex-shrink-0 text-sm font-bold opacity-0 group-hover:opacity-100">
                              ↗
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg,#f97316,#ef4444)' }}>🔥</div>
            <span className="text-white font-black text-lg">150 Days LeetCode</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">150 curated problems across 5 phases. Click any problem to open it directly on LeetCode.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-600">
            {phases.map(p => <span key={p.phase} style={{ color: p.color }}>{p.icon} {p.title}</span>)}
          </div>
          <div className="mt-6 text-xs md:text-[15px] text-white border-t border-white/5 pt-4 ">
                   © 2026 aiplacprep@gmail.com 150 Days LeetCode Challenge — Built for FAANG & Top Tech Interview Preparation
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HundredDays