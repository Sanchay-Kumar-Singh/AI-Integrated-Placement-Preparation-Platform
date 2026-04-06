// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import logo from '../../assets/image.png'

// // ─── NAV ──────────────────────────────────────────────────────────────────
// const NAV = [
//   { id: 'overview',  label: 'Overview',    icon: '🗺️' },
//   { id: 'dsa',       label: 'DSA Guide',   icon: '🧠' },
//   { id: 'languages', label: 'By Language', icon: '💻' },
//   { id: 'quiz',      label: 'Quiz',        icon: '🎯' },
//   { id: 'platforms', label: 'Platforms',   icon: '🚀' },
// ]

// // ─── DSA TOPICS ───────────────────────────────────────────────────────────
// const DSA_TOPICS = [
//   {
//     title: 'Arrays',
//     icon: '📊',
//     accent: '#6366F1',
//     complexity: 'Access O(1) · Insert O(n) · Delete O(n)',
//     desc: 'Contiguous memory block. Foundation of all data structures. Most interview questions involve arrays.',
//     keyOps: ['Traversal', 'Insertion', 'Deletion', 'Searching', 'Sorting', 'Prefix Sum', 'Sliding Window', 'Two Pointers'],
//     patterns: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Kadane\'s Algo', 'Dutch National Flag'],
//     problems: [
//       { name: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
//       { name: 'Best Time to Buy & Sell Stock', diff: 'Easy', lc: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/stock-buy-sell/' },
//       { name: 'Container With Most Water', diff: 'Medium', lc: 'https://leetcode.com/problems/container-with-most-water/', gfg: 'https://www.geeksforgeeks.org/container-with-most-water/' },
//       { name: 'Product of Array Except Self', diff: 'Medium', lc: 'https://leetcode.com/problems/product-of-array-except-self/', gfg: 'https://www.geeksforgeeks.org/product-array-puzzle/' },
//       { name: 'Maximum Subarray (Kadane)', diff: 'Medium', lc: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' },
//       { name: 'Trapping Rain Water', diff: 'Hard', lc: 'https://leetcode.com/problems/trapping-rain-water/', gfg: 'https://www.geeksforgeeks.org/trapping-rain-water/' },
//       { name: 'Median of Two Sorted Arrays', diff: 'Hard', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', gfg: 'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/' },
//     ],
//     tip: 'Arrays are in 35% of all coding interviews. Master Two Pointers and Sliding Window — they solve ~20 Top 100 problems.',
//     learnUrl: 'https://www.geeksforgeeks.org/array-data-structure/',
//   },
//   {
//     title: 'Linked Lists',
//     icon: '🔗',
//     accent: '#8B5CF6',
//     complexity: 'Access O(n) · Insert O(1) · Delete O(1)',
//     desc: 'Nodes connected via pointers. Dynamic size, no random access. Classic pointer manipulation problems.',
//     keyOps: ['Traversal', 'Insert at Head/Tail', 'Delete Node', 'Reverse', 'Cycle Detection', 'Find Middle'],
//     patterns: ['Fast & Slow Pointers', 'In-place Reversal', 'Merge', 'Floyd\'s Cycle Detection'],
//     problems: [
//       { name: 'Reverse Linked List', diff: 'Easy', lc: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
//       { name: 'Linked List Cycle', diff: 'Easy', lc: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
//       { name: 'Merge Two Sorted Lists', diff: 'Easy', lc: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' },
//       { name: 'Remove Nth Node From End', diff: 'Medium', lc: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/' },
//       { name: 'LRU Cache', diff: 'Medium', lc: 'https://leetcode.com/problems/lru-cache/', gfg: 'https://www.geeksforgeeks.org/lru-cache-implementation/' },
//       { name: 'Merge K Sorted Lists', diff: 'Hard', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
//     ],
//     tip: 'Always draw pointer operations before coding. Fast & Slow pointer solves cycle detection, middle node, palindrome checks.',
//     learnUrl: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
//   },
//   {
//     title: 'Stacks & Queues',
//     icon: '📚',
//     accent: '#06B6D4',
//     complexity: 'Push/Pop/Enqueue/Dequeue all O(1)',
//     desc: 'Stack = LIFO. Queue = FIFO. Underpin DFS, BFS, expression evaluation, and monotonic patterns.',
//     keyOps: ['Push', 'Pop', 'Peek', 'Enqueue', 'Dequeue', 'isEmpty'],
//     patterns: ['Monotonic Stack', 'Next Greater Element', 'Valid Parentheses', 'Sliding Window Max'],
//     problems: [
//       { name: 'Valid Parentheses', diff: 'Easy', lc: 'https://leetcode.com/problems/valid-parentheses/', gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
//       { name: 'Min Stack', diff: 'Medium', lc: 'https://leetcode.com/problems/min-stack/', gfg: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/' },
//       { name: 'Daily Temperatures', diff: 'Medium', lc: 'https://leetcode.com/problems/daily-temperatures/', gfg: 'https://www.geeksforgeeks.org/next-greater-element/' },
//       { name: 'Decode String', diff: 'Medium', lc: 'https://leetcode.com/problems/decode-string/', gfg: 'https://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/' },
//       { name: 'Largest Rectangle in Histogram', diff: 'Hard', lc: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', gfg: 'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/' },
//       { name: 'Sliding Window Maximum', diff: 'Hard', lc: 'https://leetcode.com/problems/sliding-window-maximum/', gfg: 'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/' },
//     ],
//     tip: 'Monotonic stack is the most underrated pattern. Master it for histogram, temperature, and NGE problems.',
//     learnUrl: 'https://www.geeksforgeeks.org/stack-data-structure/',
//   },
//   {
//     title: 'Trees & BST',
//     icon: '🌳',
//     accent: '#10B981',
//     complexity: 'Access O(h) · Insert O(h) · Delete O(h) — h = height',
//     desc: 'Hierarchical data. Binary trees, BSTs, tries, heaps. Appear in ~25% of all FAANG interviews.',
//     keyOps: ['Inorder/Preorder/Postorder DFS', 'BFS Level Order', 'Insert/Delete', 'Height/Depth', 'LCA'],
//     patterns: ['DFS (recursive/iterative)', 'BFS with Queue', 'Path Sum', 'LCA', 'Serialize/Deserialize'],
//     problems: [
//       { name: 'Maximum Depth of Binary Tree', diff: 'Easy', lc: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/' },
//       { name: 'Invert Binary Tree', diff: 'Easy', lc: 'https://leetcode.com/problems/invert-binary-tree/', gfg: 'https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/' },
//       { name: 'Binary Tree Level Order Traversal', diff: 'Medium', lc: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfg: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
//       { name: 'Validate Binary Search Tree', diff: 'Medium', lc: 'https://leetcode.com/problems/validate-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/' },
//       { name: 'Kth Smallest in BST', diff: 'Medium', lc: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/' },
//       { name: 'Binary Tree Maximum Path Sum', diff: 'Hard', lc: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', gfg: 'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/' },
//       { name: 'Serialize and Deserialize Binary Tree', diff: 'Hard', lc: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', gfg: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/' },
//     ],
//     tip: 'For any tree problem: identify DFS vs BFS, then write the base case (null node returns what?). 90% of tree problems follow this.',
//     learnUrl: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
//   },
//   {
//     title: 'Graphs',
//     icon: '🕸️',
//     accent: '#F59E0B',
//     complexity: 'Space O(V+E) · BFS/DFS O(V+E) · Dijkstra O((V+E)logV)',
//     desc: 'Most powerful and complex DS. Models real-world networks, paths, and dependencies.',
//     keyOps: ['Add Edge', 'BFS', 'DFS', 'Shortest Path', 'Cycle Detection', 'Topological Sort', 'MST'],
//     patterns: ['BFS Shortest Path', 'DFS Cycle Detection', 'Topological Sort', 'Union Find', 'Dijkstra'],
//     problems: [
//       { name: 'Number of Islands', diff: 'Medium', lc: 'https://leetcode.com/problems/number-of-islands/', gfg: 'https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/' },
//       { name: 'Course Schedule', diff: 'Medium', lc: 'https://leetcode.com/problems/course-schedule/', gfg: 'https://www.geeksforgeeks.org/topological-sorting/' },
//       { name: 'Clone Graph', diff: 'Medium', lc: 'https://leetcode.com/problems/clone-graph/', gfg: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/' },
//       { name: 'Network Delay Time', diff: 'Medium', lc: 'https://leetcode.com/problems/network-delay-time/', gfg: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' },
//       { name: 'Word Ladder', diff: 'Hard', lc: 'https://leetcode.com/problems/word-ladder/', gfg: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/' },
//       { name: 'Alien Dictionary', diff: 'Hard', lc: 'https://leetcode.com/problems/alien-dictionary/', gfg: 'https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/' },
//     ],
//     tip: 'Grid problems = Graph problems! Model each cell as a node. When stuck: draw the graph, choose BFS for shortest path, DFS for connectivity.',
//     learnUrl: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
//   },
//   {
//     title: 'Dynamic Programming',
//     icon: '⚡',
//     accent: '#EF4444',
//     complexity: 'O(n²) to O(n·m) typical · Space O(n) optimized',
//     desc: 'Overlapping subproblems + optimal substructure. The most asked and most feared category at FAANG.',
//     keyOps: ['Memoization (Top-Down)', 'Tabulation (Bottom-Up)', 'State Definition', 'Recurrence Relation'],
//     patterns: ['0/1 Knapsack', 'LCS/LIS', 'Coin Change', 'Matrix DP', 'Interval DP', 'State Machine'],
//     problems: [
//       { name: 'Climbing Stairs', diff: 'Easy', lc: 'https://leetcode.com/problems/climbing-stairs/', gfg: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/' },
//       { name: 'House Robber', diff: 'Medium', lc: 'https://leetcode.com/problems/house-robber/', gfg: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/' },
//       { name: 'Coin Change', diff: 'Medium', lc: 'https://leetcode.com/problems/coin-change/', gfg: 'https://www.geeksforgeeks.org/coin-change-dp-7/' },
//       { name: 'Longest Increasing Subsequence', diff: 'Medium', lc: 'https://leetcode.com/problems/longest-increasing-subsequence/', gfg: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/' },
//       { name: 'Word Break', diff: 'Medium', lc: 'https://leetcode.com/problems/word-break/', gfg: 'https://www.geeksforgeeks.org/word-break-problem-dp-32/' },
//       { name: 'Edit Distance', diff: 'Hard', lc: 'https://leetcode.com/problems/edit-distance/', gfg: 'https://www.geeksforgeeks.org/edit-distance-dp-5/' },
//       { name: 'Burst Balloons', diff: 'Hard', lc: 'https://leetcode.com/problems/burst-balloons/', gfg: 'https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/' },
//     ],
//     tip: 'DP recipe: (1) Define state. (2) Write recurrence. (3) Base case. (4) Top-down first → then optimize to bottom-up. Ask: "What choices exist at each step?"',
//     learnUrl: 'https://www.geeksforgeeks.org/dynamic-programming/',
//   },
//   {
//     title: 'Heaps & Priority Queues',
//     icon: '⛰️',
//     accent: '#EC4899',
//     complexity: 'Insert O(log n) · ExtractMin O(log n) · Peek O(1)',
//     desc: 'Complete binary tree with heap property. Essential for Top-K problems, scheduling, and Dijkstra.',
//     keyOps: ['Insert (Heapify Up)', 'Extract Min/Max', 'Peek', 'Heapify', 'Build Heap'],
//     patterns: ['Top K Elements', 'K Closest Points', 'Two Heaps (Median)', 'Merge K Sorted'],
//     problems: [
//       { name: 'Kth Largest Element', diff: 'Medium', lc: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/' },
//       { name: 'Top K Frequent Elements', diff: 'Medium', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' },
//       { name: 'K Closest Points to Origin', diff: 'Medium', lc: 'https://leetcode.com/problems/k-closest-points-to-origin/', gfg: 'https://www.geeksforgeeks.org/find-k-closest-points-to-the-origin/' },
//       { name: 'Task Scheduler', diff: 'Medium', lc: 'https://leetcode.com/problems/task-scheduler/', gfg: 'https://www.geeksforgeeks.org/task-scheduler/' },
//       { name: 'Find Median from Data Stream', diff: 'Hard', lc: 'https://leetcode.com/problems/find-median-from-data-stream/', gfg: 'https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/' },
//       { name: 'Merge K Sorted Lists', diff: 'Hard', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
//     ],
//     tip: '"K largest / smallest / most frequent" → Heap immediately. Two heaps for running median. Min-heap for K largest, max-heap for K smallest.',
//     learnUrl: 'https://www.geeksforgeeks.org/binary-heap/',
//   },
//   {
//     title: 'Hashing',
//     icon: '🗝️',
//     accent: '#14B8A6',
//     complexity: 'Insert O(1) avg · Lookup O(1) avg · Delete O(1) avg',
//     desc: 'Maps keys to values via hash function. Most powerful DS for reducing O(n²) to O(n) in interviews.',
//     keyOps: ['Insert', 'Delete', 'Lookup', 'Collision Handling', 'Load Factor', 'Rehashing'],
//     patterns: ['Frequency Count', 'Two Sum Pattern', 'Group Anagrams', 'Memoization Cache'],
//     problems: [
//       { name: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
//       { name: 'Group Anagrams', diff: 'Medium', lc: 'https://leetcode.com/problems/group-anagrams/', gfg: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/' },
//       { name: 'Longest Consecutive Sequence', diff: 'Medium', lc: 'https://leetcode.com/problems/longest-consecutive-sequence/', gfg: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/' },
//       { name: 'Subarray Sum Equals K', diff: 'Medium', lc: 'https://leetcode.com/problems/subarray-sum-equals-k/', gfg: 'https://www.geeksforgeeks.org/find-subarray-with-given-sum/' },
//       { name: 'Top K Frequent Elements', diff: 'Medium', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' },
//     ],
//     tip: 'When you see "find pair/triplet with sum X" or "count frequencies", HashMap is almost always the key to reducing time complexity.',
//     learnUrl: 'https://www.geeksforgeeks.org/hashing-data-structure/',
//   },
//   {
//     title: 'Tries',
//     icon: '🌿',
//     accent: '#84CC16',
//     complexity: 'Insert O(m) · Search O(m) · Space O(m·n) — m=word length',
//     desc: 'Prefix tree for efficient string operations. Perfect for autocomplete, spell check, and word search.',
//     keyOps: ['Insert Word', 'Search Word', 'StartsWith', 'Delete Word', 'Count Prefixes'],
//     patterns: ['Autocomplete', 'Word Search', 'Prefix Matching', 'XOR Maximization'],
//     problems: [
//       { name: 'Implement Trie', diff: 'Medium', lc: 'https://leetcode.com/problems/implement-trie-prefix-tree/', gfg: 'https://www.geeksforgeeks.org/trie-insert-and-search/' },
//       { name: 'Design Add and Search Words', diff: 'Medium', lc: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', gfg: 'https://www.geeksforgeeks.org/implement-a-dictionary-using-trie/' },
//       { name: 'Word Search II', diff: 'Hard', lc: 'https://leetcode.com/problems/word-search-ii/', gfg: 'https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/' },
//       { name: 'Maximum XOR of Two Numbers', diff: 'Medium', lc: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', gfg: 'https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/' },
//     ],
//     tip: 'Tries shine when multiple strings share prefixes. Always ask: "Do I need prefix matching?" — if yes, Trie beats HashMap.',
//     learnUrl: 'https://www.geeksforgeeks.org/trie-insert-and-search/',
//   },
// ]

// // ─── LANGUAGE DSA ─────────────────────────────────────────────────────────
// const LANG_DSA = [
//   {
//     name: 'Python',
//     icon: '🐍',
//     accent: '#3B82F6',
//     tagline: 'Clean syntax, built-in DS, most popular for interviews',
//     dsaTools: [
//       { ds: 'Array / List', builtin: 'list', ops: 'append O(1), pop O(1), insert O(n)', snippet: `# Array operations\narr = [3, 1, 4, 1, 5]\narr.append(9)        # O(1)\narr.insert(2, 7)     # O(n)\narr.sort()           # O(n log n)\nprint(arr[::-1])     # reverse O(n)` },
//       { ds: 'Hash Map', builtin: 'dict / Counter', ops: 'get/set O(1), del O(1)', snippet: `from collections import Counter, defaultdict\n\n# Frequency count (interview go-to)\nfreq = Counter("mississippi")\nprint(freq.most_common(2))\n\n# Default dict for graph\ngraph = defaultdict(list)\ngraph['A'].append('B')` },
//       { ds: 'Stack', builtin: 'list (as stack)', ops: 'append/pop O(1)', snippet: `# Stack using list\nstack = []\nstack.append(1)   # push\nstack.append(2)\ntop = stack[-1]   # peek O(1)\nstack.pop()       # pop O(1)` },
//       { ds: 'Queue / Deque', builtin: 'collections.deque', ops: 'appendleft/popleft O(1)', snippet: `from collections import deque\n\nqueue = deque()\nqueue.append(1)       # enqueue O(1)\nqueue.append(2)\nqueue.popleft()       # dequeue O(1)\n\n# BFS template\nqueue = deque([start])\nvisited = set([start])` },
//       { ds: 'Heap / Priority Queue', builtin: 'heapq (min-heap)', ops: 'push O(log n), pop O(log n)', snippet: `import heapq\n\nheap = []\nheapq.heappush(heap, 3)\nheapq.heappush(heap, 1)\nheapq.heappush(heap, 4)\nprint(heapq.heappop(heap))  # 1\n\n# Max heap trick: negate values\nheapq.heappush(heap, -val)` },
//       { ds: 'Binary Search', builtin: 'bisect module', ops: 'O(log n)', snippet: `import bisect\n\narr = [1, 3, 4, 7, 9]\n# Find insertion point\npos = bisect.bisect_left(arr, 5)  # 3\nbisect.insort(arr, 5)              # insert in sorted pos\n\n# Manual binary search\ndef bs(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo + hi) >> 1\n        if arr[mid] == target: return mid\n        if arr[mid] < target: lo = mid+1\n        else: hi = mid-1\n    return -1` },
//     ],
//     tips: ['Use list comprehensions for O(n) one-liners', 'Counter from collections beats manual freq maps', 'heapq is min-heap — negate for max-heap', 'deque for O(1) queue operations (list.pop(0) is O(n)!)', 'sorted() with key= lambda for custom sorting'],
//   },
//   {
//     name: 'Java',
//     icon: '☕',
//     accent: '#EF4444',
//     tagline: 'Rich Collections framework, strong typing, enterprise standard',
//     dsaTools: [
//       { ds: 'Array / ArrayList', builtin: 'int[] / ArrayList<T>', ops: 'get O(1), add O(1) amortized', snippet: `// Primitive array\nint[] arr = new int[]{3, 1, 4, 1, 5};\nArrays.sort(arr); // O(n log n)\n\n// Dynamic array\nArrayList<Integer> list = new ArrayList<>();\nlist.add(1);      // O(1)\nlist.get(0);      // O(1)\nlist.remove(0);   // O(n)\nCollections.reverse(list);` },
//       { ds: 'HashMap / HashSet', builtin: 'HashMap<K,V>', ops: 'put/get/remove O(1) avg', snippet: `HashMap<Integer, Integer> map = new HashMap<>();\nmap.put(1, 100);\nmap.getOrDefault(2, 0);   // interview pattern\n\n// Frequency counter\nfor (int n : nums)\n    map.put(n, map.getOrDefault(n, 0) + 1);\n\nHashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,3));` },
//       { ds: 'Stack / Deque', builtin: 'Deque<T> (ArrayDeque)', ops: 'push/pop O(1)', snippet: `// Use Deque (not Stack class - it's legacy)\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1);    // addFirst O(1)\nstack.peek();     // peekFirst O(1)\nstack.pop();      // removeFirst O(1)\n\n// Queue using Deque\nDeque<Integer> queue = new ArrayDeque<>();\nqueue.offer(1);   // addLast O(1)\nqueue.poll();     // removeFirst O(1)` },
//       { ds: 'Priority Queue (Heap)', builtin: 'PriorityQueue<T>', ops: 'offer O(log n), poll O(log n)', snippet: `// Min-heap (default)\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.offer(3); minHeap.offer(1);\nminHeap.poll(); // 1\n\n// Max-heap\nPriorityQueue<Integer> maxHeap =\n    new PriorityQueue<>(Collections.reverseOrder());\n\n// Custom comparator\nPriorityQueue<int[]> pq =\n    new PriorityQueue<>((a,b) -> a[0]-b[0]);` },
//       { ds: 'TreeMap / TreeSet', builtin: 'TreeMap<K,V>', ops: 'put/get O(log n), ceiling/floor O(log n)', snippet: `// Sorted map - great for range queries\nTreeMap<Integer, Integer> tmap = new TreeMap<>();\ntmap.put(5, "five");\ntmap.put(3, "three");\ntmap.floorKey(4);   // 3 — greatest key ≤ 4\ntmap.ceilingKey(4); // 5 — smallest key ≥ 4\ntmap.firstKey();    // 3\ntmap.lastKey();     // 5` },
//     ],
//     tips: ['Never use Stack class — use ArrayDeque as Deque', 'getOrDefault() for frequency counting pattern', 'PriorityQueue with lambda for custom ordering', 'TreeMap for sorted order + floor/ceiling queries', 'Arrays.sort() for primitives, Collections.sort() for objects'],
//   },
//   {
//     name: 'C++',
//     icon: '⚙️',
//     accent: '#8B5CF6',
//     tagline: 'STL powerhouse, fastest runtime, competitive programming standard',
//     dsaTools: [
//       { ds: 'Vector (Dynamic Array)', builtin: 'vector<T>', ops: 'push_back O(1), access O(1)', snippet: `#include <vector>\n#include <algorithm>\n\nvector<int> v = {3, 1, 4, 1, 5};\nv.push_back(9);        // O(1) amortized\nv.pop_back();          // O(1)\nsort(v.begin(), v.end()); // O(n log n)\nreverse(v.begin(), v.end());\nint sz = v.size();` },
//       { ds: 'Unordered Map / Set', builtin: 'unordered_map<K,V>', ops: 'insert/find O(1) avg', snippet: `#include <unordered_map>\n#include <unordered_set>\n\nunordered_map<int,int> freq;\nfor (int n : nums) freq[n]++;\n\n// Ordered map (BST-based)\nmap<int,int> ordered; // O(log n) ops\nordered[5] = 10;\nauto it = ordered.lower_bound(4); // ≥ 4` },
//       { ds: 'Stack / Queue', builtin: 'stack<T> / queue<T>', ops: 'push/pop O(1)', snippet: `#include <stack>\n#include <queue>\n#include <deque>\n\nstack<int> st;\nst.push(1); st.top(); st.pop();\n\nqueue<int> q;\nq.push(1); q.front(); q.pop();\n\n// Deque (double-ended)\ndeque<int> dq;\ndq.push_front(1);\ndq.push_back(2);\ndq.pop_front();` },
//       { ds: 'Priority Queue (Heap)', builtin: 'priority_queue<T>', ops: 'push O(log n), top/pop O(log n)', snippet: `#include <queue>\n\n// Max-heap (default)\npriority_queue<int> maxH;\nmaxH.push(3); maxH.push(1);\ncout << maxH.top(); // 3\n\n// Min-heap\npriority_queue<int, vector<int>, greater<int>> minH;\n\n// Custom: {dist, node}\npriority_queue<pair<int,int>, vector<pair<int,int>>,\n               greater<>> pq;` },
//       { ds: 'Set / Multiset', builtin: 'set<T> / multiset<T>', ops: 'insert/find/erase O(log n)', snippet: `#include <set>\n\nset<int> s = {1, 3, 5, 7};\ns.insert(4);\ns.erase(3);\n\n// lower_bound: first element ≥ val\nauto it = s.lower_bound(4); // points to 4\n\n// upper_bound: first element > val\nauto it2 = s.upper_bound(4); // points to 5\n\n// multiset allows duplicates\nmultiset<int> ms;` },
//     ],
//     tips: ['unordered_map is O(1) avg but map (O(log n)) is safer for interviews', 'priority_queue is max-heap by default', 'Use auto for iterator types to save typing', 'lower_bound / upper_bound on sorted containers', 'INT_MAX / INT_MIN for initial values in min/max problems'],
//   },
//   {
//     name: 'JavaScript',
//     icon: '🟨',
//     accent: '#F59E0B',
//     tagline: 'Flexible, object-based DS, best for frontend/full-stack roles',
//     dsaTools: [
//       { ds: 'Array', builtin: 'Array / TypedArray', ops: 'push/pop O(1), shift/unshift O(n)', snippet: `const arr = [3, 1, 4, 1, 5];\narr.push(9);         // O(1)\narr.pop();           // O(1)\narr.unshift(0);      // O(n) — avoid in hot loops!\narr.sort((a, b) => a - b); // O(n log n)\n\n// Spread for copy (avoid reference issues)\nconst copy = [...arr];\nconst reversed = [...arr].reverse();` },
//       { ds: 'Hash Map / Set', builtin: 'Map / Set', ops: 'set/get/has O(1)', snippet: `// Always use Map over object for DS problems\nconst map = new Map();\nmap.set('key', 42);\nmap.get('key');       // 42\nmap.has('key');       // true\nmap.size;             // 1\n\n// Frequency count\nnums.forEach(n => map.set(n, (map.get(n) || 0) + 1));\n\n// Set for O(1) lookup\nconst set = new Set([1, 2, 3]);\nset.has(2);           // true` },
//       { ds: 'Stack', builtin: 'Array (push/pop)', ops: 'push/pop O(1)', snippet: `// Stack using array\nconst stack = [];\nstack.push(1);         // O(1)\nstack.push(2);\nconst top = stack[stack.length - 1]; // peek\nstack.pop();           // O(1)\n\n// Monotonic stack template\nconst mono = [];\nfor (const n of nums) {\n  while (mono.length && mono[mono.length-1] >= n)\n    mono.pop();\n  mono.push(n);\n}` },
//       { ds: 'Queue / Deque', builtin: 'Array / custom class', ops: 'push O(1), shift O(n)!', snippet: `// WARNING: Array.shift() is O(n)!\n// For BFS use an index pointer instead:\nconst queue = [start];\nlet head = 0;\nwhile (head < queue.length) {\n  const node = queue[head++]; // O(1)!\n  for (const nb of graph[node] || [])\n    if (!visited.has(nb)) {\n      visited.add(nb);\n      queue.push(nb);\n    }\n}` },
//       { ds: 'Heap / Priority Queue', builtin: 'No built-in (implement or use library)', ops: 'O(log n) custom', snippet: `// Min-heap class for interviews\nclass MinHeap {\n  constructor() { this.h = [] }\n  push(val) {\n    this.h.push(val);\n    this._bubbleUp(this.h.length - 1);\n  }\n  pop() {\n    const top = this.h[0];\n    const last = this.h.pop();\n    if (this.h.length) { this.h[0] = last; this._sinkDown(0); }\n    return top;\n  }\n  peek() { return this.h[0] }\n}` },
//     ],
//     tips: ['Use Map not {} for hash maps — correct key types', 'Array.shift() is O(n) — use index pointer for BFS queue', 'JS has no built-in heap — implement or mention it', 'Array.sort() without comparator sorts lexicographically!', 'Spread operator [...arr] for shallow copy of arrays'],
//   },
// ]

// // ─── QUIZ ─────────────────────────────────────────────────────────────────
// const QUIZ = [
//   { q: 'What is the time complexity of accessing an element in an array by index?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], ans: 2, exp: 'Arrays store elements in contiguous memory. Index-based access is a direct memory address calculation — always O(1).' },
//   { q: 'Which data structure uses LIFO (Last In, First Out) order?', opts: ['Queue', 'Stack', 'Heap', 'Linked List'], ans: 1, exp: 'Stack follows Last In First Out. The last element pushed is the first to be popped. Used in DFS, undo operations, and parentheses validation.' },
//   { q: 'What is the worst-case time complexity of QuickSort?', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 2, exp: 'When the pivot always picks the smallest or largest element (already sorted array), QuickSort degrades to O(n²). Average case is O(n log n).' },
//   { q: 'Which algorithm is used to detect a cycle in a linked list?', opts: ['BFS', 'Binary Search', "Floyd's Cycle Detection", 'Merge Sort'], ans: 2, exp: "Floyd's Cycle Detection (Fast & Slow pointers) uses two pointers moving at different speeds. If they meet, a cycle exists. Time O(n), Space O(1)." },
//   { q: 'What is the time complexity of inserting into a Binary Search Tree (balanced)?', opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], ans: 2, exp: 'In a balanced BST (like AVL or Red-Black Tree), each insertion traverses the height h = O(log n). An unbalanced BST degrades to O(n).' },
//   { q: 'Which sorting algorithm has the best worst-case time complexity?', opts: ['QuickSort', 'Bubble Sort', 'Merge Sort', 'Selection Sort'], ans: 2, exp: 'Merge Sort guarantees O(n log n) in ALL cases (best, average, worst). QuickSort is O(n²) worst case. This makes Merge Sort preferable for guaranteed performance.' },
//   { q: 'What does BFS use to traverse a graph?', opts: ['Stack', 'Queue', 'Heap', 'Recursion'], ans: 1, exp: 'BFS (Breadth-First Search) uses a Queue (FIFO). It processes all nodes at the current level before moving to the next, finding shortest paths in unweighted graphs.' },
//   { q: 'What is the space complexity of a recursive DFS on a tree with n nodes?', opts: ['O(1)', 'O(n)', 'O(h) where h = height', 'O(n²)'], ans: 2, exp: 'DFS uses the call stack. The maximum depth of recursion equals the height h of the tree. For balanced trees h = O(log n); for skewed trees h = O(n).' },
//   { q: 'Which data structure is most efficient for implementing a priority queue?', opts: ['Array', 'Linked List', 'Binary Heap', 'Hash Map'], ans: 2, exp: 'Binary Heap gives O(log n) insert and O(log n) extract-min/max, and O(1) peek. Array/LL would be O(n) for either insert or extract.' },
//   { q: 'What is the key advantage of Dynamic Programming over plain recursion?', opts: ['Uses less memory', 'Avoids recomputing overlapping subproblems', 'Always faster than greedy', 'Works only on arrays'], ans: 1, exp: 'DP stores results of subproblems (memoization or tabulation), avoiding redundant computation. This reduces exponential time to polynomial — e.g., Fibonacci from O(2ⁿ) to O(n).' },
//   { q: 'What is the time complexity of searching in a Hash Map (average case)?', opts: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], ans: 2, exp: 'Hash maps use a hash function to directly compute the bucket index. Average case is O(1). Worst case is O(n) when all keys hash to the same bucket (collision).' },
//   { q: 'In a Binary Search Tree, which traversal gives nodes in sorted order?', opts: ['Preorder', 'Postorder', 'Level Order', 'Inorder'], ans: 3, exp: 'Inorder traversal (Left → Root → Right) of a BST always produces nodes in ascending sorted order. This property is fundamental to BST-based algorithms.' },
//   { q: 'What is the time complexity of Merge Sort on an array of n elements?', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 1, exp: 'Merge Sort divides the array log n times and merges in O(n) each level. Total: O(n log n) for all cases. Space complexity is O(n) for the temporary arrays.' },
//   { q: 'Which pattern is used to solve "find all subarrays with sum equal to K"?', opts: ['Two Pointers', 'Prefix Sum + Hash Map', 'Sliding Window', 'Binary Search'], ans: 1, exp: 'Use prefix sum: presum[i] - presum[j] = K. Store prefix sums in a hash map. For each element, check if (currentSum - K) exists in the map. O(n) time.' },
//   { q: 'What is the space complexity of an iterative BFS on a graph with V vertices?', opts: ['O(1)', 'O(V)', 'O(E)', 'O(V²)'], ans: 1, exp: 'BFS stores at most all vertices in the queue simultaneously (in a complete graph, the last level has ~V/2 nodes). Space = O(V) for queue + visited set.' },
//   { q: 'Which algorithm finds the shortest path in a weighted graph with non-negative edges?', opts: ['BFS', 'DFS', "Dijkstra's Algorithm", 'Bellman-Ford'], ans: 2, exp: "Dijkstra's algorithm uses a min-heap to greedily process the nearest unvisited vertex. Time O((V+E)log V). Note: requires non-negative edge weights." },
//   { q: 'What is the time complexity of building a heap from n elements?', opts: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], ans: 1, exp: 'Building a heap (heapify from bottom up) is O(n), not O(n log n)! The mathematical proof uses the fact that most elements are near the leaves and need less work.' },
//   { q: 'In the Two Pointers technique on a sorted array, what is the typical time complexity?', opts: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], ans: 2, exp: 'Two pointers move from both ends toward the center, each pointer traverses the array at most once. Total moves = n, giving O(n) time with O(1) extra space.' },
//   { q: 'What does a Trie (Prefix Tree) optimize compared to a Hash Map for string search?', opts: ['Uses less memory', 'Faster lookup O(1)', 'Supports prefix matching efficiently', 'Handles collision better'], ans: 2, exp: "Tries support prefix queries in O(m) where m = prefix length. Hash maps can't do prefix matching efficiently. Tries also share common prefixes, saving memory for similar strings." },
//   { q: 'What is the recurrence relation for the time complexity of Merge Sort?', opts: ['T(n) = T(n/2) + O(n)', 'T(n) = 2T(n/2) + O(n)', 'T(n) = T(n-1) + O(1)', 'T(n) = 2T(n/2) + O(1)'], ans: 1, exp: 'Merge Sort splits into 2 halves: 2T(n/2), then merges in O(n). By Master Theorem: T(n) = 2T(n/2) + O(n) → O(n log n). This is the standard divide-and-conquer recurrence.' },
// ]

// // ─── PLATFORMS ────────────────────────────────────────────────────────────
// const PLATFORMS = [
//   { name: 'LeetCode', url: 'https://leetcode.com', icon: '🟠', accent: '#F97316', tag: 'Industry Standard', rating: 5, type: 'DSA Practice', pros: ['3000+ problems with company tags', 'Premium has interview question frequency', 'Weekly contests for rating', 'Discuss section with solutions'], best: 'FAANG prep, daily practice', free: true },
//   { name: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org', icon: '🟢', accent: '#10B981', tag: 'Best for Theory', rating: 5, type: 'Learn + Practice', pros: ['Best conceptual explanations', 'Hindi + English videos', 'Company-specific question banks', 'Complete DSA course (free)'], best: 'Learning concepts deeply, Indian companies', free: true },
//   { name: 'NeetCode', url: 'https://neetcode.io', icon: '🔴', accent: '#EF4444', tag: 'Best Free Resource', rating: 5, type: 'Structured Learning', pros: ['Free video solutions for every LC problem', 'Pattern-focused roadmap', 'NeetCode 150 curated list', 'Spaced repetition system'], best: 'Learning patterns with explanations', free: true },
//   { name: 'Codeforces', url: 'https://codeforces.com', icon: '🔵', accent: '#3B82F6', tag: 'Best for CP', rating: 5, type: 'Competitive Programming', pros: ['3-4 rated contests per week', 'Pupil → Grandmaster rating system', 'Huge problem archive', 'Editorials for every contest'], best: 'Improving speed and problem-solving rating', free: true },
//   { name: 'Striver (TakeUForward)', url: 'https://takeuforward.org', icon: '⭐', accent: '#F59E0B', tag: 'A2Z DSA Sheet', rating: 5, type: 'Structured Course', pros: ['A2Z 450+ problem sheet', 'YouTube explanations (Hindi/English)', 'SDE Sheet for placements', 'Free and structured roadmap'], best: 'Complete beginner-to-advanced roadmap', free: true },
//   { name: 'InterviewBit', url: 'https://www.interviewbit.com', icon: '🟣', accent: '#8B5CF6', tag: 'Mock Interviews', rating: 4, type: 'Interview Simulation', pros: ['Structured learning path', 'Peer mock interview system', 'Company simulations', 'Leaderboard and streak tracking'], best: 'Structured prep + peer practice', free: true },
//   { name: 'HackerRank', url: 'https://hackerrank.com', icon: '🔵', accent: '#06B6D4', tag: 'OA Simulation', rating: 4, type: 'Skill Certification', pros: ['Used in real company OAs', 'SQL, Python, Java skill tests', 'Certificate programs', 'Beginner-friendly'], best: 'Online Assessment preparation', free: true },
//   { name: 'AtCoder', url: 'https://atcoder.jp', icon: '⚫', accent: '#6B7280', tag: 'Quality CP', rating: 5, type: 'Competitive Programming', pros: ['Highest quality problems', 'Clean rating system', 'Great for advanced algorithms', 'Strong editorial culture'], best: 'Advanced algorithm mastery', free: true },
//   { name: 'CodeChef', url: 'https://codechef.com', icon: '🟤', accent: '#92400E', tag: 'Indian CP', rating: 4, type: 'Competitive Programming', pros: ['Cook-Off & Lunchtime contests', '10-day Long Challenge format', 'Active Indian community', 'Beginner-friendly long contest'], best: 'Long-format contest practice, Indian placements', free: true },
//   { name: 'CSES Problem Set', url: 'https://cses.fi/problemset', icon: '🇫🇮', accent: '#EF4444', tag: 'Algorithm Bible', rating: 5, type: 'Algorithm Problems', pros: ['300 handpicked classic problems', 'Covers all fundamental algorithms', 'No clutter, pure problems', 'Trusted by competitive programmers globally'], best: 'Building algorithm fundamentals from scratch', free: true },
// ]

// // ─── HELPERS ──────────────────────────────────────────────────────────────
// const dc = d =>
//   d === 'Easy'   ? { bg: '#052E16', color: '#4ADE80', border: '#16532520' } :
//   d === 'Medium' ? { bg: '#1C1A07', color: '#FCD34D', border: '#78350F30' } :
//                    { bg: '#1C0A0A', color: '#F87171', border: '#991B1B30' }

// // ─── COMPONENT ────────────────────────────────────────────────────────────
// const DSA = () => {
//   const navigate = useNavigate()
//   const [tab, setTab]           = useState('overview')
//   const [openTopic, setOpenTopic] = useState(null)
//   const [activeLang, setActiveLang] = useState(0)
//   const [openSnippet, setOpenSnippet] = useState(null)

//   // Quiz state
//   const [qIdx, setQIdx]         = useState(0)
//   const [selected, setSelected] = useState(null)
//   const [answered, setAnswered] = useState(false)
//   const [score, setScore]       = useState(0)
//   const [done, setDone]         = useState(false)
//   const [history, setHistory]   = useState([])

//   const handleAnswer = (idx) => {
//     if (answered) return
//     setSelected(idx)
//     setAnswered(true)
//     const correct = idx === QUIZ[qIdx].ans
//     if (correct) setScore(s => s + 1)
//     setHistory(h => [...h, { q: QUIZ[qIdx].q, selected: idx, correct, correctIdx: QUIZ[qIdx].ans }])
//   }

//   const nextQ = () => {
//     if (qIdx + 1 >= QUIZ.length) { setDone(true); return }
//     setQIdx(q => q + 1)
//     setSelected(null)
//     setAnswered(false)
//   }

//   const resetQuiz = () => {
//     setQIdx(0); setSelected(null); setAnswered(false)
//     setScore(0); setDone(false); setHistory([])
//   }

//   const progress = Math.round(((qIdx + (answered ? 1 : 0)) / QUIZ.length) * 100)

//   return (
//     <div style={{ minHeight: '100vh', background: '#060610', fontFamily: "'Outfit', system-ui, sans-serif", color: '#E2E8F0' }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 5px; height: 5px; }
//         ::-webkit-scrollbar-track { background: #0A0A18; }
//         ::-webkit-scrollbar-thumb { background: #1E1E3A; border-radius: 4px; }
//         .btn { border: none; cursor: pointer; font-family: inherit; transition: all 0.15s; }
//         .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
//         .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(99,102,241,0.15); }
//         .code { font-family: 'Fira Code', monospace; font-size: 12px; line-height: 1.8; color: #93C5FD; background: #050510; border-radius: 10px; padding: 16px; overflow-x: auto; white-space: pre; border: 1px solid #1E1E3A; }
//         a { text-decoration: none; color: inherit; }
//         input { font-family: inherit; }
//         table { border-collapse: collapse; }
//         .opt-btn { width:100%; background: #0A0A1A; border: 1px solid #1A1A30; border-radius: 12px; padding: 14px 18px; text-align: left; cursor: pointer; font-family: inherit; font-size: 14px; color: #94A3B8; transition: all 0.15s; margin-bottom: 10px; display: flex; align-items: center; gap: 12px; }
//         .opt-btn:hover:not(:disabled) { border-color: #6366F180; color: #E2E8F0; background: #0F0F22; }
//         .progress-bar { height: 4px; background: #1A1A30; border-radius: 999px; overflow: hidden; }
//         .progress-fill { height: 100%; background: linear-gradient(90deg, #6366F1, #06B6D4); border-radius: 999px; transition: width 0.4s ease; }
//       `}</style>

//       {/* NAVBAR */}
//       <nav style={{ background: '#08081A', borderBottom: '1px solid #12122A', position: 'sticky', top: 0, zIndex: 50 }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <img onClick={() => navigate('/')} src={logo} alt="logo" style={{ height: 34, cursor: 'pointer', borderRadius: 8 }} />
//           <div style={{ display: 'flex', gap: 4 }}>
//             {NAV.map(n => (
//               <button key={n.id} onClick={() => setTab(n.id)} className="btn"
//                 style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: tab === n.id ? '#fff' : '#475569', background: tab === n.id ? '#6366F1' : 'transparent' }}>
//                 {n.icon} {n.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <header style={{ background: '#08081A', padding: '72px 24px 56px', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 25% 50%, #6366F118 0%, transparent 60%), radial-gradient(ellipse at 75% 30%, #06B6D410 0%, transparent 60%)' }} />
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
//         <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#6366F112', border: '1px solid #6366F128', borderRadius: 999, padding: '5px 14px', marginBottom: 22 }}>
//             <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6EE7B7', display: 'inline-block', boxShadow: '0 0 8px #6EE7B7' }} />
//             <span style={{ fontSize: 11, fontWeight: 700, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Complete DSA Mastery Guide</span>
//           </div>
//           <h1 style={{ fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 18, background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 40%, #6366F1 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//             Data Structures &<br />Algorithms
//           </h1>
//           <p style={{ fontSize: 17, color: '#475569', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
//             Every DS explained. Language-specific implementations. 20-question quiz to test yourself. Best platforms to learn and practice.
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
//             {[['9', 'Data Structures'], ['50+', 'Practice Problems'], ['4', 'Languages'], ['20', 'Quiz Questions'], ['10', 'Learn Platforms']].map(([v, l]) => (
//               <div key={l} style={{ background: '#0D0D20', border: '1px solid #1A1A30', borderRadius: 12, padding: '14px 20px', textAlign: 'center', minWidth: 110 }}>
//                 <div style={{ fontSize: 26, fontWeight: 800, color: '#818CF8' }}>{v}</div>
//                 <div style={{ fontSize: 11, color: '#334155', marginTop: 3 }}>{l}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
//             {NAV.map(n => (
//               <button key={n.id} onClick={() => setTab(n.id)} className="btn"
//                 style={{ padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: tab === n.id ? '#fff' : '#475569', background: tab === n.id ? '#6366F1' : '#0D0D20', border: `1px solid ${tab === n.id ? '#6366F1' : '#1A1A30'}` }}>
//                 {n.icon} {n.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* STICKY TABS */}
//       <div style={{ background: '#08081A', borderBottom: '1px solid #12122A', position: 'sticky', top: 58, zIndex: 40 }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '8px 24px', display: 'flex', gap: 6, overflowX: 'auto' }}>
//           {NAV.map(n => (
//             <button key={n.id} onClick={() => setTab(n.id)} className="btn"
//               style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', color: tab === n.id ? '#fff' : '#475569', background: tab === n.id ? '#6366F1' : '#0D0D20', border: `1px solid ${tab === n.id ? '#6366F1' : '#1A1A30'}` }}>
//               {n.icon} {n.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div style={{ maxWidth: 1400, margin: '0 auto', padding: '52px 24px' }}>

//         {/* ══ OVERVIEW ══ */}
//         {tab === 'overview' && (
//           <div>
//             <div style={{ textAlign: 'center', marginBottom: 52 }}>
//               <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F1F5F9', marginBottom: 10 }}>🗺️ What is DSA & Why It Matters</h2>
//               <p style={{ color: '#475569', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Data Structures + Algorithms = the language of technical interviews. Here's your complete map.</p>
//             </div>

//             {/* Why DSA */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
//               {[
//                 { icon: '🏆', title: 'FAANG Interviews', body: 'Google, Amazon, Meta, Microsoft — all use DSA coding rounds as the primary filter. Nail DSA = unlock top offers.', color: '#6366F1' },
//                 { icon: '🧠', title: 'Problem Solving', body: 'DSA trains you to break complex problems into smaller pieces and find the most efficient solution systematically.', color: '#10B981' },
//                 { icon: '⚡', title: 'Performance', body: 'Knowing the right data structure makes the difference between code that runs in 1ms vs 10 seconds on large inputs.', color: '#F59E0B' },
//                 { icon: '💰', title: 'Salary Impact', body: 'Engineers who ace DSA interviews earn 2-5x more. Top offers at FAANG start from $150K+ base for new grads.', color: '#EC4899' },
//               ].map((c, i) => (
//                 <div key={i} className="hover-lift" style={{ background: '#0A0A18', border: `1px solid ${c.color}25`, borderRadius: 16, padding: 24 }}>
//                   <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
//                   <h3 style={{ fontSize: 16, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>{c.title}</h3>
//                   <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{c.body}</p>
//                 </div>
//               ))}
//             </div>

//             {/* DS Quick Reference */}
//             <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 20, padding: 28, marginBottom: 32 }}>
//               <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 6 }}>📊 Data Structures Quick Reference</h3>
//               <p style={{ color: '#334155', fontSize: 13, marginBottom: 20 }}>Complexity cheat-sheet for every major data structure.</p>
//               <div style={{ overflowX: 'auto' }}>
//                 <table style={{ width: '100%', fontSize: 13 }}>
//                   <thead>
//                     <tr style={{ borderBottom: '1px solid #1A1A30' }}>
//                       {['Data Structure', 'Access', 'Search', 'Insert', 'Delete', 'Space', 'Use Case'].map(h => (
//                         <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       ['Array', 'O(1)', 'O(n)', 'O(n)', 'O(n)', 'O(n)', 'Random access, sorting'],
//                       ['Linked List', 'O(n)', 'O(n)', 'O(1)', 'O(1)', 'O(n)', 'Frequent insert/delete'],
//                       ['Stack', 'O(n)', 'O(n)', 'O(1)', 'O(1)', 'O(n)', 'DFS, undo, brackets'],
//                       ['Queue', 'O(n)', 'O(n)', 'O(1)', 'O(1)', 'O(n)', 'BFS, scheduling'],
//                       ['Hash Map', 'O(1)', 'O(1)', 'O(1)', 'O(1)', 'O(n)', 'Freq count, lookup'],
//                       ['Binary Heap', 'O(1)*', 'O(n)', 'O(log n)', 'O(log n)', 'O(n)', 'Priority, Top-K'],
//                       ['BST (balanced)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n)', 'Sorted data, range query'],
//                       ['Trie', 'O(m)', 'O(m)', 'O(m)', 'O(m)', 'O(m·n)', 'String prefix matching'],
//                       ['Graph (Adj List)', 'O(V+E)', 'O(V+E)', 'O(1)', 'O(E)', 'O(V+E)', 'Networks, paths'],
//                     ].map((row, i) => (
//                       <tr key={i} style={{ borderBottom: '1px solid #0F0F1E' }}
//                         onMouseEnter={e => e.currentTarget.style.background = '#0D0D1E'}
//                         onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                         <td style={{ padding: '12px 14px', fontWeight: 600, color: '#C7D2FE' }}>{row[0]}</td>
//                         {row.slice(1, 6).map((v, j) => (
//                           <td key={j} style={{ padding: '12px 14px', fontFamily: 'Fira Code', fontSize: 12, color: v === 'O(1)' ? '#4ADE80' : v.includes('log') ? '#60A5FA' : v.includes('n²') ? '#F87171' : '#94A3B8' }}>{v}</td>
//                         ))}
//                         <td style={{ padding: '12px 14px', fontSize: 12, color: '#475569', fontStyle: 'italic' }}>{row[6]}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Learning Roadmap */}
//             <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 20, padding: 28 }}>
//               <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 20 }}>🗺️ DSA Learning Roadmap</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
//                 {[
//                   { phase: 'Phase 1', title: 'Foundations', weeks: 'Week 1–3', color: '#6366F1', items: ['Arrays & Strings', 'Time/Space Complexity', 'Basic Sorting', 'Recursion Basics'] },
//                   { phase: 'Phase 2', title: 'Core DS', weeks: 'Week 4–7', color: '#10B981', items: ['Linked Lists', 'Stacks & Queues', 'Hash Maps & Sets', 'Binary Search'] },
//                   { phase: 'Phase 3', title: 'Trees & Graphs', weeks: 'Week 8–11', color: '#F59E0B', items: ['Binary Trees & BST', 'Heaps', 'Graph BFS/DFS', 'Topological Sort'] },
//                   { phase: 'Phase 4', title: 'Advanced', weeks: 'Week 12–16', color: '#EF4444', items: ['Dynamic Programming', 'Backtracking', 'Tries', 'Advanced Graphs'] },
//                   { phase: 'Phase 5', title: 'Interview Ready', weeks: 'Week 17–20', color: '#EC4899', items: ['Company-wise questions', 'Mock interviews', 'System Design basics', 'Behavioral prep'] },
//                 ].map((p, i) => (
//                   <div key={i} style={{ background: '#0D0D20', border: `1px solid ${p.color}30`, borderRadius: 14, padding: 18 }}>
//                     <div style={{ fontSize: 10, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{p.phase} · {p.weeks}</div>
//                     <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0', marginBottom: 12 }}>{p.title}</div>
//                     {p.items.map((it, j) => (
//                       <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 7, fontSize: 12, color: '#475569' }}>
//                         <span style={{ color: p.color, flexShrink: 0 }}>▸</span>{it}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══ DSA GUIDE ══ */}
//         {tab === 'dsa' && (
//           <div>
//             <div style={{ textAlign: 'center', marginBottom: 44 }}>
//               <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F1F5F9', marginBottom: 10 }}>🧠 Complete DSA Guide</h2>
//               <p style={{ color: '#475569', fontSize: 16 }}>Every major data structure with operations, patterns, and linked problems.</p>
//             </div>

//             {/* Category pills */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
//               {DSA_TOPICS.map((t, i) => (
//                 <button key={i} onClick={() => setOpenTopic(openTopic === i ? null : i)} className="btn"
//                   style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, background: openTopic === i ? `${t.accent}22` : '#0D0D20', color: openTopic === i ? t.accent : '#475569', border: `1px solid ${openTopic === i ? t.accent + '50' : '#1A1A30'}` }}>
//                   {t.icon} {t.title}
//                 </button>
//               ))}
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {DSA_TOPICS.map((topic, i) => {
//                 const isOpen = openTopic === i
//                 return (
//                   <div key={i} style={{ background: '#0A0A18', border: `1px solid ${isOpen ? topic.accent + '50' : '#1A1A30'}`, borderRadius: 18, overflow: 'hidden', transition: 'border-color 0.2s' }}>
//                     {/* Header */}
//                     <button className="btn" onClick={() => setOpenTopic(isOpen ? null : i)}
//                       style={{ width: '100%', background: isOpen ? `linear-gradient(135deg, ${topic.accent}10, transparent)` : 'transparent', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
//                       <div style={{ width: 48, height: 48, borderRadius: 13, background: `${topic.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{topic.icon}</div>
//                       <div style={{ flex: 1, textAlign: 'left' }}>
//                         <div style={{ fontSize: 18, fontWeight: 700, color: '#E2E8F0' }}>{topic.title}</div>
//                         <div style={{ fontFamily: 'Fira Code', fontSize: 11, color: topic.accent, marginTop: 3 }}>{topic.complexity}</div>
//                       </div>
//                       <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
//                         {topic.patterns.slice(0, 2).map((p, j) => (
//                           <span key={j} style={{ display: 'none', background: `${topic.accent}15`, color: topic.accent, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}
//                             className="hidden-sm">{p}</span>
//                         ))}
//                         <span style={{ fontSize: 12, color: '#334155', background: '#0D0D1A', border: '1px solid #1A1A30', borderRadius: 6, padding: '3px 8px', fontWeight: 600 }}>{topic.problems.length} problems</span>
//                       </div>
//                       <span style={{ color: '#334155', fontSize: 18, marginLeft: 8, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
//                     </button>

//                     {isOpen && (
//                       <div style={{ borderTop: `1px solid ${topic.accent}20` }}>
//                         {/* Info row */}
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, padding: '20px 24px 0' }}>
//                           <div style={{ background: `${topic.accent}08`, border: `1px solid ${topic.accent}20`, borderRadius: 12, padding: 16 }}>
//                             <p style={{ fontSize: 10, fontWeight: 700, color: topic.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>About</p>
//                             <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{topic.desc}</p>
//                           </div>
//                           <div style={{ background: '#0D0D1A', border: '1px solid #1A1A2A', borderRadius: 12, padding: 16 }}>
//                             <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Key Operations</p>
//                             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                               {topic.keyOps.map((op, j) => (
//                                 <span key={j} style={{ background: '#111122', border: '1px solid #1E1E35', borderRadius: 6, padding: '4px 8px', fontSize: 11, color: '#64748B' }}>{op}</span>
//                               ))}
//                             </div>
//                           </div>
//                           <div style={{ background: '#0A1A10', border: '1px solid #16532520', borderRadius: 12, padding: 16 }}>
//                             <p style={{ fontSize: 10, fontWeight: 700, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Interview Patterns</p>
//                             {topic.patterns.map((p, j) => (
//                               <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6, fontSize: 12, color: '#4ADE80' }}>
//                                 <span style={{ flexShrink: 0 }}>→</span>{p}
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Tip */}
//                         <div style={{ margin: '16px 24px', background: '#1A1500', border: '1px solid #78350F30', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
//                           <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
//                           <p style={{ fontSize: 13, color: '#FCD34D', lineHeight: 1.6 }}>{topic.tip}</p>
//                         </div>

//                         {/* Problems table */}
//                         <div style={{ padding: '0 24px 24px' }}>
//                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
//                             <p style={{ fontSize: 11, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Must-Solve Problems</p>
//                             <a href={topic.learnUrl} target="_blank" rel="noopener noreferrer"
//                               style={{ fontSize: 11, fontWeight: 700, color: topic.accent, background: `${topic.accent}10`, border: `1px solid ${topic.accent}30`, borderRadius: 6, padding: '4px 10px' }}>
//                               Deep Dive on GFG ↗
//                             </a>
//                           </div>
//                           <div style={{ overflowX: 'auto' }}>
//                             <table style={{ width: '100%' }}>
//                               <thead>
//                                 <tr style={{ borderBottom: '1px solid #12122A' }}>
//                                   {['Problem', 'Difficulty', 'Solve on'].map(h => (
//                                     <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {topic.problems.map((p, j) => {
//                                   const ds = dc(p.diff)
//                                   return (
//                                     <tr key={j} style={{ borderBottom: '1px solid #0A0A16' }}
//                                       onMouseEnter={e => e.currentTarget.style.background = '#0D0D1E'}
//                                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                                       <td style={{ padding: '11px 12px', fontSize: 14, fontWeight: 500, color: '#CBD5E1' }}>{p.name}</td>
//                                       <td style={{ padding: '11px 12px' }}>
//                                         <span style={{ display: 'inline-block', background: ds.bg, color: ds.color, border: `1px solid ${ds.border}`, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700 }}>{p.diff}</span>
//                                       </td>
//                                       <td style={{ padding: '11px 12px' }}>
//                                         <div style={{ display: 'flex', gap: 6 }}>
//                                           <a href={p.lc} target="_blank" rel="noopener noreferrer"
//                                             style={{ background: '#1C0F00', border: '1px solid #92400E30', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: '#FB923C' }}>LC ↗</a>
//                                           <a href={p.gfg} target="_blank" rel="noopener noreferrer"
//                                             style={{ background: '#021A0E', border: '1px solid #16653020', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: '#4ADE80' }}>GFG ↗</a>
//                                         </div>
//                                       </td>
//                                     </tr>
//                                   )
//                                 })}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )}

//         {/* ══ LANGUAGES ══ */}
//         {tab === 'languages' && (
//           <div>
//             <div style={{ textAlign: 'center', marginBottom: 44 }}>
//               <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F1F5F9', marginBottom: 10 }}>💻 DSA by Language</h2>
//               <p style={{ color: '#475569', fontSize: 16 }}>Built-in data structures, syntax, and interview snippets for each language.</p>
//             </div>

//             {/* Language selector */}
//             <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, justifyContent: 'center' }}>
//               {LANG_DSA.map((l, i) => (
//                 <button key={i} onClick={() => { setActiveLang(i); setOpenSnippet(null) }} className="btn hover-lift"
//                   style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 14, fontSize: 15, fontWeight: 700, background: activeLang === i ? `${l.accent}20` : '#0D0D20', color: activeLang === i ? l.accent : '#475569', border: `1px solid ${activeLang === i ? l.accent + '60' : '#1A1A30'}` }}>
//                   <span style={{ fontSize: 22 }}>{l.icon}</span> {l.name}
//                 </button>
//               ))}
//             </div>

//             {(() => {
//               const lang = LANG_DSA[activeLang]
//               return (
//                 <div>
//                   {/* Lang header */}
//                   <div style={{ background: `linear-gradient(135deg, ${lang.accent}12, transparent)`, border: `1px solid ${lang.accent}30`, borderRadius: 18, padding: '24px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
//                     <span style={{ fontSize: 48 }}>{lang.icon}</span>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontSize: 26, fontWeight: 800, color: '#F1F5F9' }}>{lang.name}</div>
//                       <div style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>{lang.tagline}</div>
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                       {lang.tips.map((t, i) => (
//                         <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#475569' }}>
//                           <span style={{ color: lang.accent, flexShrink: 0, fontWeight: 700 }}>✓</span>{t}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* DS cards */}
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                     {lang.dsaTools.map((ds, i) => {
//                       const key = `${activeLang}-${i}`
//                       const isOpen = openSnippet === key
//                       return (
//                         <div key={i} style={{ background: '#0A0A18', border: `1px solid ${isOpen ? lang.accent + '45' : '#1A1A30'}`, borderRadius: 14, overflow: 'hidden' }}>
//                           <button className="btn" onClick={() => setOpenSnippet(isOpen ? null : key)}
//                             style={{ width: '100%', background: 'transparent', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
//                             <div style={{ flex: 1, textAlign: 'left' }}>
//                               <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0' }}>{ds.ds}</div>
//                               <div style={{ fontFamily: 'Fira Code', fontSize: 11, color: '#475569', marginTop: 3 }}>{ds.builtin}</div>
//                             </div>
//                             <span style={{ fontFamily: 'Fira Code', fontSize: 11, color: lang.accent, background: `${lang.accent}12`, borderRadius: 6, padding: '3px 8px' }}>{ds.ops}</span>
//                             <span style={{ color: '#334155', fontSize: 16, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: 8 }}>▼</span>
//                           </button>
//                           {isOpen && (
//                             <div style={{ padding: '0 20px 20px' }}>
//                               <pre className="code">{ds.snippet}</pre>
//                             </div>
//                           )}
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </div>
//               )
//             })()}
//           </div>
//         )}

//         {/* ══ QUIZ ══ */}
//         {tab === 'quiz' && (
//           <div style={{ maxWidth: 720, margin: '0 auto' }}>
//             <div style={{ textAlign: 'center', marginBottom: 44 }}>
//               <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F1F5F9', marginBottom: 10 }}>🎯 DSA Knowledge Quiz</h2>
//               <p style={{ color: '#475569', fontSize: 16 }}>20 questions covering all major DSA topics. Test your understanding.</p>
//             </div>

//             {!done ? (
//               <div>
//                 {/* Progress */}
//                 <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 16, padding: 20, marginBottom: 20 }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//                     <span style={{ fontSize: 13, fontWeight: 700, color: '#6366F1' }}>Question {qIdx + 1} of {QUIZ.length}</span>
//                     <span style={{ fontFamily: 'Fira Code', fontSize: 13, color: '#4ADE80' }}>Score: {score}/{qIdx + (answered ? 1 : 0)}</span>
//                   </div>
//                   <div className="progress-bar">
//                     <div className="progress-fill" style={{ width: `${progress}%` }} />
//                   </div>
//                 </div>

//                 {/* Question card */}
//                 <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 20, padding: 28, marginBottom: 16 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
//                     <span style={{ width: 32, height: 32, borderRadius: 8, background: '#6366F120', border: '1px solid #6366F130', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#818CF8' }}>Q{qIdx + 1}</span>
//                     <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9', lineHeight: 1.5 }}>{QUIZ[qIdx].q}</h3>
//                   </div>

//                   <div>
//                     {QUIZ[qIdx].opts.map((opt, idx) => {
//                       let bg = '#0A0A1A', border = '#1A1A30', color = '#94A3B8', icon = ''
//                       if (answered) {
//                         if (idx === QUIZ[qIdx].ans) { bg = '#052E16'; border = '#4ADE8040'; color = '#4ADE80'; icon = '✓ ' }
//                         else if (idx === selected && idx !== QUIZ[qIdx].ans) { bg = '#1C0A0A'; border = '#F87171 40'; color = '#F87171'; icon = '✗ ' }
//                       }
//                       return (
//                         <button key={idx} className="opt-btn" disabled={answered} onClick={() => handleAnswer(idx)}
//                           style={{ background: bg, borderColor: border, color, fontWeight: answered && idx === QUIZ[qIdx].ans ? 700 : 400 }}>
//                           <span style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, color }}>
//                             {answered && idx === QUIZ[qIdx].ans ? '✓' : answered && idx === selected ? '✗' : String.fromCharCode(65 + idx)}
//                           </span>
//                           {opt}
//                         </button>
//                       )
//                     })}
//                   </div>

//                   {/* Explanation */}
//                   {answered && (
//                     <div style={{ background: selected === QUIZ[qIdx].ans ? '#052E16' : '#1C0A0A', border: `1px solid ${selected === QUIZ[qIdx].ans ? '#4ADE8030' : '#F8717130'}`, borderRadius: 10, padding: '14px 16px', marginTop: 8 }}>
//                       <p style={{ fontSize: 12, fontWeight: 700, color: selected === QUIZ[qIdx].ans ? '#4ADE80' : '#F87171', marginBottom: 6 }}>
//                         {selected === QUIZ[qIdx].ans ? '🎉 Correct!' : '❌ Incorrect'}
//                       </p>
//                       <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{QUIZ[qIdx].exp}</p>
//                     </div>
//                   )}
//                 </div>

//                 {answered && (
//                   <button onClick={nextQ} className="btn"
//                     style={{ width: '100%', background: '#6366F1', color: '#fff', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
//                     {qIdx + 1 >= QUIZ.length ? 'See Results 🎊' : 'Next Question →'}
//                   </button>
//                 )}
//               </div>
//             ) : (
//               /* Results */
//               <div>
//                 <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 24, padding: 36, textAlign: 'center', marginBottom: 24 }}>
//                   <div style={{ fontSize: 56, marginBottom: 16 }}>
//                     {score >= 17 ? '🏆' : score >= 13 ? '🎯' : score >= 9 ? '📚' : '💪'}
//                   </div>
//                   <div style={{ fontFamily: 'Fira Code', fontSize: 48, fontWeight: 700, color: score >= 17 ? '#4ADE80' : score >= 13 ? '#FCD34D' : '#F87171', marginBottom: 8 }}>
//                     {score} / {QUIZ.length}
//                   </div>
//                   <div style={{ fontSize: 20, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>
//                     {score >= 17 ? 'DSA Expert! 🔥' : score >= 13 ? 'Solid Foundation 👍' : score >= 9 ? 'Keep Practicing 📖' : 'Time to Study 🚀'}
//                   </div>
//                   <div style={{ fontSize: 14, color: '#475569', marginBottom: 28 }}>
//                     {Math.round((score / QUIZ.length) * 100)}% accuracy · {QUIZ.length} questions answered
//                   </div>
//                   <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
//                     <div style={{ background: '#052E16', border: '1px solid #4ADE8030', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
//                       <div style={{ fontSize: 22, fontWeight: 800, color: '#4ADE80' }}>{score}</div>
//                       <div style={{ fontSize: 11, color: '#334155' }}>Correct</div>
//                     </div>
//                     <div style={{ background: '#1C0A0A', border: '1px solid #F8717130', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
//                       <div style={{ fontSize: 22, fontWeight: 800, color: '#F87171' }}>{QUIZ.length - score}</div>
//                       <div style={{ fontSize: 11, color: '#334155' }}>Incorrect</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review */}
//                 <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 16, padding: 20, marginBottom: 16 }}>
//                   <p style={{ fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Review Answers</p>
//                   {history.map((h, i) => (
//                     <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #0F0F18' }}>
//                       <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{h.correct ? '✅' : '❌'}</span>
//                       <div>
//                         <p style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 3 }}>{h.q}</p>
//                         {!h.correct && <p style={{ fontSize: 12, color: '#4ADE80' }}>Correct: {QUIZ[i].opts[h.correctIdx]}</p>}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <button onClick={resetQuiz} className="btn"
//                   style={{ width: '100%', background: '#6366F1', color: '#fff', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
//                   🔁 Retake Quiz
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ══ PLATFORMS ══ */}
//         {tab === 'platforms' && (
//           <div>
//             <div style={{ textAlign: 'center', marginBottom: 44 }}>
//               <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F1F5F9', marginBottom: 10 }}>🚀 Best Platforms to Learn DSA</h2>
//               <p style={{ color: '#475569', fontSize: 16 }}>Curated, reviewed, and ranked — every platform you need to master DSA.</p>
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, marginBottom: 36 }}>
//               {PLATFORMS.map((p, i) => (
//                 <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="hover-lift"
//                   style={{ background: '#0A0A18', border: `1px solid ${p.accent}20`, borderRadius: 18, padding: 22, display: 'block', borderLeft: `4px solid ${p.accent}` }}>
//                   <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       <span style={{ fontSize: 28 }}>{p.icon}</span>
//                       <div>
//                         <div style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9' }}>{p.name}</div>
//                         <div style={{ fontSize: 11, color: '#334155' }}>{p.type}</div>
//                       </div>
//                     </div>
//                     <div style={{ textAlign: 'right' }}>
//                       <span style={{ display: 'inline-block', background: `${p.accent}18`, color: p.accent, borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, border: `1px solid ${p.accent}30` }}>{p.tag}</span>
//                       <div style={{ marginTop: 4 }}>
//                         {'★'.repeat(p.rating).split('').map((s, j) => (
//                           <span key={j} style={{ color: '#FCD34D', fontSize: 12 }}>★</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ marginBottom: 14 }}>
//                     {p.pros.map((pro, j) => (
//                       <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6, fontSize: 13, color: '#475569' }}>
//                         <span style={{ color: p.accent, flexShrink: 0, fontWeight: 700 }}>✓</span>{pro}
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${p.accent}15` }}>
//                     <span style={{ fontSize: 12, color: '#334155' }}>Best for: <span style={{ color: '#94A3B8' }}>{p.best}</span></span>
//                     <span style={{ fontSize: 12, fontWeight: 700, color: p.accent }}>Visit ↗</span>
//                   </div>
//                 </a>
//               ))}
//             </div>

//             {/* Strategy guide */}
//             <div style={{ background: '#0A0A18', border: '1px solid #1A1A30', borderRadius: 20, padding: 28 }}>
//               <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 20 }}>🗺️ Platform Strategy by Goal</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
//                 {[
//                   { goal: 'Complete Beginner', color: '#6366F1', icon: '🌱', plan: ['GFG — Learn concepts with theory', 'NeetCode — Watch pattern videos', 'LeetCode Easy — First 30 problems', 'HackerRank — Warm-up challenges'] },
//                   { goal: 'FAANG Prep', color: '#10B981', icon: '🏆', plan: ['NeetCode 150 — All problems with videos', 'LeetCode — Company-tagged questions', 'Striver SDE Sheet — Comprehensive list', 'Mock interviews on InterviewBit'] },
//                   { goal: 'Competitive Programming', color: '#F59E0B', icon: '⚡', plan: ['CSES Problem Set — Algorithm fundamentals', 'Codeforces — Weekly rated contests', 'AtCoder — High quality problems', 'CodeChef — Long format contests'] },
//                   { goal: '30-Day Sprint', color: '#EF4444', icon: '🚀', plan: ['Week 1: Arrays + Strings (LeetCode Easy)', 'Week 2: Trees + Graphs (NeetCode)', 'Week 3: DP + Backtracking (GFG)', 'Week 4: Company mocks + review'] },
//                 ].map((item, i) => (
//                   <div key={i} style={{ background: '#0D0D20', border: `1px solid ${item.color}25`, borderRadius: 14, padding: 18 }}>
//                     <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
//                       <span style={{ fontSize: 20 }}>{item.icon}</span>
//                       <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.goal}</div>
//                     </div>
//                     {item.plan.map((step, j) => (
//                       <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, fontSize: 12, color: '#475569' }}>
//                         <span style={{ width: 18, height: 18, borderRadius: 4, background: `${item.color}20`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{j + 1}</span>{step}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//       </div>

//       {/* FOOTER */}
//       <footer style={{ background: '#05050F', borderTop: '1px solid #12122A', padding: '36px 24px', marginTop: 32 }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
//           <div style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(90deg, #818CF8, #67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>DSA Mastery</div>
//           <p style={{ fontSize: 13, color: '#1E293B', marginBottom: 16 }}>Every data structure. Every algorithm. Every question — linked and ready to solve.</p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
//             {NAV.map(n => <span key={n.id} style={{ fontSize: 12, color: '#1E293B' }}>{n.icon} {n.label}</span>)}
//           </div>
//           <p style={{ fontSize: 11, color: '#0F172A', borderTop: '1px solid #0F0F1E', paddingTop: 14 }}>
//             © 2026 aiplacprep@gmail.com — Built for engineers aiming at FAANG and top tech companies.
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default DSA
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/image.png'

const NAV = [
  { id: 'overview',  label: 'Overview',    icon: '🗺️' },
  { id: 'dsa',       label: 'DSA Guide',   icon: '🧠' },
  { id: 'languages', label: 'By Language', icon: '💻' },
  { id: 'quiz',      label: 'Quiz',        icon: '🎯' },
  { id: 'platforms', label: 'Platforms',   icon: '🚀' },
]

const DSA_TOPICS = [
  {
    title: 'Arrays',
    icon: '📊',
    accent: '#6366F1',
    complexity: 'Access O(1) · Insert O(n) · Delete O(n)',
    desc: 'Contiguous memory block. Foundation of all data structures. Most interview questions involve arrays.',
    keyOps: ['Traversal', 'Insertion', 'Deletion', 'Searching', 'Sorting', 'Prefix Sum', 'Sliding Window', 'Two Pointers'],
    patterns: ['Two Pointers', 'Sliding Window', 'Prefix Sum', "Kadane's Algo", 'Dutch National Flag'],
    problems: [
      { name: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
      { name: 'Best Time to Buy & Sell Stock', diff: 'Easy', lc: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/stock-buy-sell/' },
      { name: 'Container With Most Water', diff: 'Medium', lc: 'https://leetcode.com/problems/container-with-most-water/', gfg: 'https://www.geeksforgeeks.org/container-with-most-water/' },
      { name: 'Product of Array Except Self', diff: 'Medium', lc: 'https://leetcode.com/problems/product-of-array-except-self/', gfg: 'https://www.geeksforgeeks.org/product-array-puzzle/' },
      { name: 'Maximum Subarray (Kadane)', diff: 'Medium', lc: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' },
      { name: 'Trapping Rain Water', diff: 'Hard', lc: 'https://leetcode.com/problems/trapping-rain-water/', gfg: 'https://www.geeksforgeeks.org/trapping-rain-water/' },
      { name: 'Median of Two Sorted Arrays', diff: 'Hard', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', gfg: 'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/' },
    ],
    tip: 'Arrays are in 35% of all coding interviews. Master Two Pointers and Sliding Window — they solve ~20 Top 100 problems.',
    learnUrl: 'https://www.geeksforgeeks.org/array-data-structure/',
  },
  {
    title: 'Linked Lists',
    icon: '🔗',
    accent: '#8B5CF6',
    complexity: 'Access O(n) · Insert O(1) · Delete O(1)',
    desc: 'Nodes connected via pointers. Dynamic size, no random access. Classic pointer manipulation problems.',
    keyOps: ['Traversal', 'Insert at Head/Tail', 'Delete Node', 'Reverse', 'Cycle Detection', 'Find Middle'],
    patterns: ['Fast & Slow Pointers', 'In-place Reversal', 'Merge', "Floyd's Cycle Detection"],
    problems: [
      { name: 'Reverse Linked List', diff: 'Easy', lc: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
      { name: 'Linked List Cycle', diff: 'Easy', lc: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
      { name: 'Merge Two Sorted Lists', diff: 'Easy', lc: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' },
      { name: 'Remove Nth Node From End', diff: 'Medium', lc: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/' },
      { name: 'LRU Cache', diff: 'Medium', lc: 'https://leetcode.com/problems/lru-cache/', gfg: 'https://www.geeksforgeeks.org/lru-cache-implementation/' },
      { name: 'Merge K Sorted Lists', diff: 'Hard', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
    ],
    tip: 'Always draw pointer operations before coding. Fast & Slow pointer solves cycle detection, middle node, palindrome checks.',
    learnUrl: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
  },
  {
    title: 'Stacks & Queues',
    icon: '📚',
    accent: '#0EA5E9',
    complexity: 'Push/Pop/Enqueue/Dequeue all O(1)',
    desc: 'Stack = LIFO. Queue = FIFO. Underpin DFS, BFS, expression evaluation, and monotonic patterns.',
    keyOps: ['Push', 'Pop', 'Peek', 'Enqueue', 'Dequeue', 'isEmpty'],
    patterns: ['Monotonic Stack', 'Next Greater Element', 'Valid Parentheses', 'Sliding Window Max'],
    problems: [
      { name: 'Valid Parentheses', diff: 'Easy', lc: 'https://leetcode.com/problems/valid-parentheses/', gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
      { name: 'Min Stack', diff: 'Medium', lc: 'https://leetcode.com/problems/min-stack/', gfg: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/' },
      { name: 'Daily Temperatures', diff: 'Medium', lc: 'https://leetcode.com/problems/daily-temperatures/', gfg: 'https://www.geeksforgeeks.org/next-greater-element/' },
      { name: 'Decode String', diff: 'Medium', lc: 'https://leetcode.com/problems/decode-string/', gfg: 'https://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/' },
      { name: 'Largest Rectangle in Histogram', diff: 'Hard', lc: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', gfg: 'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/' },
      { name: 'Sliding Window Maximum', diff: 'Hard', lc: 'https://leetcode.com/problems/sliding-window-maximum/', gfg: 'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/' },
    ],
    tip: 'Monotonic stack is the most underrated pattern. Master it for histogram, temperature, and NGE problems.',
    learnUrl: 'https://www.geeksforgeeks.org/stack-data-structure/',
  },
  {
    title: 'Trees & BST',
    icon: '🌳',
    accent: '#10B981',
    complexity: 'Access O(h) · Insert O(h) · Delete O(h) — h = height',
    desc: 'Hierarchical data. Binary trees, BSTs, tries, heaps. Appear in ~25% of all FAANG interviews.',
    keyOps: ['Inorder/Preorder/Postorder DFS', 'BFS Level Order', 'Insert/Delete', 'Height/Depth', 'LCA'],
    patterns: ['DFS (recursive/iterative)', 'BFS with Queue', 'Path Sum', 'LCA', 'Serialize/Deserialize'],
    problems: [
      { name: 'Maximum Depth of Binary Tree', diff: 'Easy', lc: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/' },
      { name: 'Invert Binary Tree', diff: 'Easy', lc: 'https://leetcode.com/problems/invert-binary-tree/', gfg: 'https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/' },
      { name: 'Binary Tree Level Order Traversal', diff: 'Medium', lc: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfg: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
      { name: 'Validate Binary Search Tree', diff: 'Medium', lc: 'https://leetcode.com/problems/validate-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/' },
      { name: 'Kth Smallest in BST', diff: 'Medium', lc: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/' },
      { name: 'Binary Tree Maximum Path Sum', diff: 'Hard', lc: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', gfg: 'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/' },
      { name: 'Serialize and Deserialize Binary Tree', diff: 'Hard', lc: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', gfg: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/' },
    ],
    tip: 'For any tree problem: identify DFS vs BFS, then write the base case (null node). 90% of tree problems follow this pattern.',
    learnUrl: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
  },
  {
    title: 'Graphs',
    icon: '🕸️',
    accent: '#F59E0B',
    complexity: 'Space O(V+E) · BFS/DFS O(V+E) · Dijkstra O((V+E)logV)',
    desc: 'Most powerful and complex DS. Models real-world networks, paths, and dependencies.',
    keyOps: ['Add Edge', 'BFS', 'DFS', 'Shortest Path', 'Cycle Detection', 'Topological Sort', 'MST'],
    patterns: ['BFS Shortest Path', 'DFS Cycle Detection', 'Topological Sort', 'Union Find', 'Dijkstra'],
    problems: [
      { name: 'Number of Islands', diff: 'Medium', lc: 'https://leetcode.com/problems/number-of-islands/', gfg: 'https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/' },
      { name: 'Course Schedule', diff: 'Medium', lc: 'https://leetcode.com/problems/course-schedule/', gfg: 'https://www.geeksforgeeks.org/topological-sorting/' },
      { name: 'Clone Graph', diff: 'Medium', lc: 'https://leetcode.com/problems/clone-graph/', gfg: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/' },
      { name: 'Network Delay Time', diff: 'Medium', lc: 'https://leetcode.com/problems/network-delay-time/', gfg: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' },
      { name: 'Word Ladder', diff: 'Hard', lc: 'https://leetcode.com/problems/word-ladder/', gfg: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/' },
      { name: 'Alien Dictionary', diff: 'Hard', lc: 'https://leetcode.com/problems/alien-dictionary/', gfg: 'https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/' },
    ],
    tip: 'Grid problems = Graph problems! Model each cell as a node. BFS for shortest path, DFS for connectivity.',
    learnUrl: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
  },
  {
    title: 'Dynamic Programming',
    icon: '⚡',
    accent: '#EF4444',
    complexity: 'O(n²) to O(n·m) typical · Space O(n) optimized',
    desc: 'Overlapping subproblems + optimal substructure. The most asked and most feared category at FAANG.',
    keyOps: ['Memoization (Top-Down)', 'Tabulation (Bottom-Up)', 'State Definition', 'Recurrence Relation'],
    patterns: ['0/1 Knapsack', 'LCS/LIS', 'Coin Change', 'Matrix DP', 'Interval DP', 'State Machine'],
    problems: [
      { name: 'Climbing Stairs', diff: 'Easy', lc: 'https://leetcode.com/problems/climbing-stairs/', gfg: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/' },
      { name: 'House Robber', diff: 'Medium', lc: 'https://leetcode.com/problems/house-robber/', gfg: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/' },
      { name: 'Coin Change', diff: 'Medium', lc: 'https://leetcode.com/problems/coin-change/', gfg: 'https://www.geeksforgeeks.org/coin-change-dp-7/' },
      { name: 'Longest Increasing Subsequence', diff: 'Medium', lc: 'https://leetcode.com/problems/longest-increasing-subsequence/', gfg: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/' },
      { name: 'Word Break', diff: 'Medium', lc: 'https://leetcode.com/problems/word-break/', gfg: 'https://www.geeksforgeeks.org/word-break-problem-dp-32/' },
      { name: 'Edit Distance', diff: 'Hard', lc: 'https://leetcode.com/problems/edit-distance/', gfg: 'https://www.geeksforgeeks.org/edit-distance-dp-5/' },
      { name: 'Burst Balloons', diff: 'Hard', lc: 'https://leetcode.com/problems/burst-balloons/', gfg: 'https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/' },
    ],
    tip: 'DP recipe: Define state → write recurrence → base case → top-down first → optimize to bottom-up.',
    learnUrl: 'https://www.geeksforgeeks.org/dynamic-programming/',
  },
  {
    title: 'Heaps & Priority Queues',
    icon: '⛰️',
    accent: '#EC4899',
    complexity: 'Insert O(log n) · ExtractMin O(log n) · Peek O(1)',
    desc: 'Complete binary tree with heap property. Essential for Top-K problems, scheduling, and Dijkstra.',
    keyOps: ['Insert (Heapify Up)', 'Extract Min/Max', 'Peek', 'Heapify', 'Build Heap'],
    patterns: ['Top K Elements', 'K Closest Points', 'Two Heaps (Median)', 'Merge K Sorted'],
    problems: [
      { name: 'Kth Largest Element', diff: 'Medium', lc: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/' },
      { name: 'Top K Frequent Elements', diff: 'Medium', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' },
      { name: 'K Closest Points to Origin', diff: 'Medium', lc: 'https://leetcode.com/problems/k-closest-points-to-origin/', gfg: 'https://www.geeksforgeeks.org/find-k-closest-points-to-the-origin/' },
      { name: 'Task Scheduler', diff: 'Medium', lc: 'https://leetcode.com/problems/task-scheduler/', gfg: 'https://www.geeksforgeeks.org/task-scheduler/' },
      { name: 'Find Median from Data Stream', diff: 'Hard', lc: 'https://leetcode.com/problems/find-median-from-data-stream/', gfg: 'https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/' },
      { name: 'Merge K Sorted Lists', diff: 'Hard', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
    ],
    tip: '"K largest / smallest / most frequent" → Heap immediately. Two heaps for running median.',
    learnUrl: 'https://www.geeksforgeeks.org/binary-heap/',
  },
  {
    title: 'Hashing',
    icon: '🗝️',
    accent: '#14B8A6',
    complexity: 'Insert O(1) avg · Lookup O(1) avg · Delete O(1) avg',
    desc: 'Maps keys to values via hash function. Most powerful DS for reducing O(n²) to O(n) in interviews.',
    keyOps: ['Insert', 'Delete', 'Lookup', 'Collision Handling', 'Load Factor', 'Rehashing'],
    patterns: ['Frequency Count', 'Two Sum Pattern', 'Group Anagrams', 'Memoization Cache'],
    problems: [
      { name: 'Two Sum', diff: 'Easy', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
      { name: 'Group Anagrams', diff: 'Medium', lc: 'https://leetcode.com/problems/group-anagrams/', gfg: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/' },
      { name: 'Longest Consecutive Sequence', diff: 'Medium', lc: 'https://leetcode.com/problems/longest-consecutive-sequence/', gfg: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/' },
      { name: 'Subarray Sum Equals K', diff: 'Medium', lc: 'https://leetcode.com/problems/subarray-sum-equals-k/', gfg: 'https://www.geeksforgeeks.org/find-subarray-with-given-sum/' },
      { name: 'Top K Frequent Elements', diff: 'Medium', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' },
    ],
    tip: 'HashMap is the single most powerful tool in interview problem-solving. When you see O(n²), ask: "Can a HashMap make this O(n)?"',
    learnUrl: 'https://www.geeksforgeeks.org/hashing-data-structure/',
  },
  {
    title: 'Tries',
    icon: '🌿',
    accent: '#84CC16',
    complexity: 'Insert O(m) · Search O(m) · Space O(m·n)',
    desc: 'Prefix tree for efficient string operations. Perfect for autocomplete, spell check, and word search.',
    keyOps: ['Insert Word', 'Search Word', 'StartsWith', 'Delete Word', 'Count Prefixes'],
    patterns: ['Autocomplete', 'Word Search', 'Prefix Matching', 'XOR Maximization'],
    problems: [
      { name: 'Implement Trie', diff: 'Medium', lc: 'https://leetcode.com/problems/implement-trie-prefix-tree/', gfg: 'https://www.geeksforgeeks.org/trie-insert-and-search/' },
      { name: 'Design Add and Search Words', diff: 'Medium', lc: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', gfg: 'https://www.geeksforgeeks.org/implement-a-dictionary-using-trie/' },
      { name: 'Word Search II', diff: 'Hard', lc: 'https://leetcode.com/problems/word-search-ii/', gfg: 'https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/' },
      { name: 'Maximum XOR of Two Numbers', diff: 'Medium', lc: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', gfg: 'https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/' },
    ],
    tip: 'Tries shine when multiple strings share prefixes. Ask: "Do I need prefix matching?" — if yes, Trie beats HashMap.',
    learnUrl: 'https://www.geeksforgeeks.org/trie-insert-and-search/',
  },
]

const LANG_DSA = [
  {
    name: 'Python', icon: '🐍', accent: '#3B82F6',
    tagline: 'Clean syntax, built-in DS, most popular for interviews',
    dsaTools: [
      { ds: 'Array / List', builtin: 'list', ops: 'append O(1) · pop O(1) · insert O(n)', snippet: `# Array operations\narr = [3, 1, 4, 1, 5]\narr.append(9)        # O(1)\narr.insert(2, 7)     # O(n)\narr.sort()           # O(n log n)\nprint(arr[::-1])     # reverse O(n)` },
      { ds: 'Hash Map', builtin: 'dict / Counter', ops: 'get/set O(1) · del O(1)', snippet: `from collections import Counter, defaultdict\n\n# Frequency count\nfreq = Counter("mississippi")\nprint(freq.most_common(2))\n\n# Default dict for graph\ngraph = defaultdict(list)\ngraph['A'].append('B')` },
      { ds: 'Stack', builtin: 'list (as stack)', ops: 'append/pop O(1)', snippet: `stack = []\nstack.append(1)   # push O(1)\nstack.append(2)\ntop = stack[-1]   # peek O(1)\nstack.pop()       # pop O(1)` },
      { ds: 'Queue / Deque', builtin: 'collections.deque', ops: 'appendleft/popleft O(1)', snippet: `from collections import deque\n\nqueue = deque()\nqueue.append(1)       # enqueue O(1)\nqueue.popleft()       # dequeue O(1)\n\n# BFS template\nqueue = deque([start])\nvisited = set([start])` },
      { ds: 'Heap', builtin: 'heapq (min-heap)', ops: 'push O(log n) · pop O(log n)', snippet: `import heapq\n\nheap = []\nheapq.heappush(heap, 3)\nheapq.heappush(heap, 1)\nprint(heapq.heappop(heap))  # 1\n\n# Max heap: negate values\nheapq.heappush(heap, -val)` },
      { ds: 'Binary Search', builtin: 'bisect module', ops: 'O(log n)', snippet: `import bisect\n\narr = [1, 3, 4, 7, 9]\npos = bisect.bisect_left(arr, 5)  # 3\n\ndef bs(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo + hi) >> 1\n        if arr[mid] == target: return mid\n        if arr[mid] < target: lo = mid+1\n        else: hi = mid-1\n    return -1` },
    ],
    tips: ['Use list comprehensions for O(n) one-liners', 'Counter beats manual freq maps', 'heapq is min-heap — negate for max-heap', 'deque for O(1) queue (list.pop(0) is O(n)!)', 'sorted() with key=lambda for custom sort'],
  },
  {
    name: 'Java', icon: '☕', accent: '#EF4444',
    tagline: 'Rich Collections framework, strong typing, enterprise standard',
    dsaTools: [
      { ds: 'Array / ArrayList', builtin: 'int[] / ArrayList<T>', ops: 'get O(1) · add O(1) amortized', snippet: `int[] arr = new int[]{3, 1, 4, 1, 5};\nArrays.sort(arr);\n\nArrayList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.get(0);\nlist.remove(0);\nCollections.reverse(list);` },
      { ds: 'HashMap / HashSet', builtin: 'HashMap<K,V>', ops: 'put/get/remove O(1) avg', snippet: `HashMap<Integer, Integer> map = new HashMap<>();\nmap.put(1, 100);\nmap.getOrDefault(2, 0); // interview pattern\n\n// Frequency counter\nfor (int n : nums)\n    map.put(n, map.getOrDefault(n, 0) + 1);` },
      { ds: 'Stack / Deque', builtin: 'Deque<T> (ArrayDeque)', ops: 'push/pop O(1)', snippet: `// Use Deque (not legacy Stack class)\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.peek(); stack.pop();\n\n// Queue using Deque\nDeque<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.poll();` },
      { ds: 'Priority Queue', builtin: 'PriorityQueue<T>', ops: 'offer O(log n) · poll O(log n)', snippet: `// Min-heap (default)\nPriorityQueue<Integer> minH = new PriorityQueue<>();\nminH.offer(3); minH.offer(1);\nminH.poll(); // 1\n\n// Max-heap\nPriorityQueue<Integer> maxH =\n    new PriorityQueue<>(Collections.reverseOrder());` },
      { ds: 'TreeMap / TreeSet', builtin: 'TreeMap<K,V>', ops: 'put/get O(log n)', snippet: `TreeMap<Integer, Integer> tmap = new TreeMap<>();\ntmap.put(5, 50); tmap.put(3, 30);\ntmap.floorKey(4);    // 3\ntmap.ceilingKey(4);  // 5\ntmap.firstKey();     // 3` },
    ],
    tips: ['Never use Stack class — use ArrayDeque', 'getOrDefault() for frequency counting', 'PriorityQueue with lambda for custom order', 'TreeMap for sorted order + range queries', 'Arrays.sort() for primitives'],
  },
  {
    name: 'C++', icon: '⚙️', accent: '#8B5CF6',
    tagline: 'STL powerhouse, fastest runtime, competitive programming standard',
    dsaTools: [
      { ds: 'Vector', builtin: 'vector<T>', ops: 'push_back O(1) · access O(1)', snippet: `vector<int> v = {3, 1, 4, 1, 5};\nv.push_back(9);\nv.pop_back();\nsort(v.begin(), v.end());\nreverse(v.begin(), v.end());` },
      { ds: 'Unordered Map / Set', builtin: 'unordered_map<K,V>', ops: 'insert/find O(1) avg', snippet: `unordered_map<int,int> freq;\nfor (int n : nums) freq[n]++;\n\n// Ordered map (BST)\nmap<int,int> ordered;\nauto it = ordered.lower_bound(4);` },
      { ds: 'Stack / Queue / Deque', builtin: 'stack / queue / deque', ops: 'push/pop O(1)', snippet: `stack<int> st;\nst.push(1); st.top(); st.pop();\n\nqueue<int> q;\nq.push(1); q.front(); q.pop();\n\ndeque<int> dq;\ndq.push_front(1); dq.push_back(2);` },
      { ds: 'Priority Queue', builtin: 'priority_queue<T>', ops: 'push O(log n) · top O(1)', snippet: `// Max-heap (default)\npriority_queue<int> maxH;\nmaxH.push(3); maxH.top();\n\n// Min-heap\npriority_queue<int, vector<int>,\n  greater<int>> minH;` },
      { ds: 'Set / Multiset', builtin: 'set<T>', ops: 'insert/find/erase O(log n)', snippet: `set<int> s = {1, 3, 5, 7};\ns.insert(4); s.erase(3);\n\nauto it = s.lower_bound(4); // >= 4\nauto it2 = s.upper_bound(4); // > 4\n\nmultiset<int> ms; // allows duplicates` },
    ],
    tips: ['unordered_map O(1) avg but map safer', 'priority_queue is max-heap by default', 'Use auto for iterator types', 'lower_bound / upper_bound on sets', 'INT_MAX / INT_MIN for initial values'],
  },
  {
    name: 'JavaScript', icon: '🟨', accent: '#F59E0B',
    tagline: 'Flexible, object-based DS, best for frontend/full-stack roles',
    dsaTools: [
      { ds: 'Array', builtin: 'Array', ops: 'push/pop O(1) · shift O(n)', snippet: `const arr = [3, 1, 4, 1, 5];\narr.push(9);         // O(1)\narr.pop();           // O(1)\narr.sort((a, b) => a - b); // O(n log n)\nconst copy = [...arr]; // spread copy` },
      { ds: 'Hash Map / Set', builtin: 'Map / Set', ops: 'set/get/has O(1)', snippet: `const map = new Map();\nmap.set('key', 42);\nmap.get('key');   // 42\nmap.has('key');   // true\n\n// Frequency count\nnums.forEach(n =>\n  map.set(n, (map.get(n) || 0) + 1));` },
      { ds: 'Stack', builtin: 'Array (push/pop)', ops: 'push/pop O(1)', snippet: `const stack = [];\nstack.push(1);\nconst top = stack.at(-1); // peek\nstack.pop();\n\n// Monotonic stack\nconst mono = [];\nfor (const n of nums) {\n  while (mono.length && mono.at(-1) >= n)\n    mono.pop();\n  mono.push(n);\n}` },
      { ds: 'Queue (O(1) trick)', builtin: 'Array + head index', ops: 'O(1) dequeue', snippet: `// Array.shift() is O(n)! Use pointer:\nconst queue = [start];\nlet head = 0;\nwhile (head < queue.length) {\n  const node = queue[head++]; // O(1)!\n  for (const nb of graph[node] || [])\n    if (!visited.has(nb)) {\n      visited.add(nb); queue.push(nb);\n    }\n}` },
      { ds: 'Binary Search', builtin: 'Manual', ops: 'O(log n)', snippet: `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >>> 1;\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? lo=mid+1 : hi=mid-1;\n  }\n  return -1;\n}` },
    ],
    tips: ['Use Map not {} — correct key types', 'Array.shift() is O(n) — use index pointer', 'No built-in heap — implement or mention', 'sort() without comparator is lexicographic!', 'Spread [...arr] for shallow copy'],
  },
]

const QUIZ = [
  { q: 'What is the time complexity of accessing an element in an array by index?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], ans: 2, exp: 'Arrays store elements in contiguous memory. Index access is a direct memory address calculation — always O(1).' },
  { q: 'Which data structure uses LIFO (Last In, First Out) order?', opts: ['Queue', 'Stack', 'Heap', 'Linked List'], ans: 1, exp: 'Stack follows Last In First Out. The last element pushed is the first popped. Used in DFS, undo, and parentheses validation.' },
  { q: 'What is the worst-case time complexity of QuickSort?', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 2, exp: 'When pivot always picks smallest/largest element (sorted array), QuickSort degrades to O(n²). Average is O(n log n).' },
  { q: 'Which algorithm detects a cycle in a linked list?', opts: ['BFS', 'Binary Search', "Floyd's Cycle Detection", 'Merge Sort'], ans: 2, exp: "Floyd's uses two pointers at different speeds. If they meet, a cycle exists. Time O(n), Space O(1)." },
  { q: 'Time complexity of inserting into a balanced BST?', opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], ans: 2, exp: 'Balanced BST height = O(log n). Each insert traverses from root to leaf. Unbalanced BST degrades to O(n).' },
  { q: 'Which sorting algorithm guarantees O(n log n) in all cases?', opts: ['QuickSort', 'Bubble Sort', 'Merge Sort', 'Selection Sort'], ans: 2, exp: 'Merge Sort is O(n log n) for best, average, and worst cases. QuickSort is O(n²) worst case.' },
  { q: 'What does BFS use internally to traverse a graph?', opts: ['Stack', 'Queue', 'Heap', 'Recursion'], ans: 1, exp: 'BFS uses a Queue (FIFO). It processes all nodes at current level before going deeper — finds shortest paths in unweighted graphs.' },
  { q: 'Space complexity of recursive DFS on a tree?', opts: ['O(1)', 'O(n)', 'O(h) where h = height', 'O(n²)'], ans: 2, exp: 'DFS uses the call stack. Max depth = tree height h. Balanced: O(log n). Skewed: O(n).' },
  { q: 'Most efficient DS for implementing a priority queue?', opts: ['Array', 'Linked List', 'Binary Heap', 'Hash Map'], ans: 2, exp: 'Binary Heap: O(log n) insert/extract, O(1) peek. Array or LL would be O(n) for one of the operations.' },
  { q: 'Key advantage of Dynamic Programming over plain recursion?', opts: ['Uses less memory', 'Avoids recomputing overlapping subproblems', 'Always faster than greedy', 'Works only on arrays'], ans: 1, exp: 'DP caches subproblem results. Fibonacci drops from O(2ⁿ) to O(n). This is memoization / tabulation.' },
  { q: 'Average time complexity of Hash Map search?', opts: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], ans: 2, exp: 'Hash maps compute bucket index directly. Average O(1). Worst O(n) with all collisions.' },
  { q: 'Which BST traversal gives nodes in sorted order?', opts: ['Preorder', 'Postorder', 'Level Order', 'Inorder'], ans: 3, exp: 'Inorder (Left → Root → Right) on BST always produces ascending sorted order.' },
  { q: 'Time complexity of Merge Sort?', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 1, exp: 'Merge Sort divides log n times, merges in O(n) each level. Total O(n log n) for all cases. Space O(n).' },
  { q: 'Best pattern for "find all subarrays with sum = K"?', opts: ['Two Pointers', 'Prefix Sum + Hash Map', 'Sliding Window', 'Binary Search'], ans: 1, exp: 'prefix[i] - prefix[j] = K. Store prefix sums in a map. For each element check if (currentSum - K) exists. O(n).' },
  { q: 'Space complexity of BFS on a graph with V vertices?', opts: ['O(1)', 'O(V)', 'O(E)', 'O(V²)'], ans: 1, exp: 'BFS queue + visited set hold at most O(V) vertices simultaneously.' },
  { q: 'Shortest path algorithm for weighted graphs with non-negative edges?', opts: ['BFS', 'DFS', "Dijkstra's", 'Bellman-Ford'], ans: 2, exp: "Dijkstra's uses a min-heap to greedily process nearest unvisited vertex. O((V+E)log V). Non-negative weights required." },
  { q: 'Time complexity of building a heap from n elements?', opts: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], ans: 1, exp: 'Bottom-up heapify is O(n) — not O(n log n)! Most nodes near leaves need minimal work.' },
  { q: 'Time complexity of Two Pointers on a sorted array?', opts: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], ans: 2, exp: 'Pointers traverse array at most once from both ends. Total moves = n → O(n) with O(1) space.' },
  { q: 'What does a Trie optimize vs HashMap for strings?', opts: ['Uses less memory', 'Faster lookup O(1)', 'Supports prefix matching efficiently', 'Better collision handling'], ans: 2, exp: 'Tries support prefix queries in O(m). HashMaps cannot do prefix matching. Tries share common prefixes, saving space.' },
  { q: 'Recurrence relation for Merge Sort complexity?', opts: ['T(n) = T(n/2) + O(n)', 'T(n) = 2T(n/2) + O(n)', 'T(n) = T(n-1) + O(1)', 'T(n) = 2T(n/2) + O(1)'], ans: 1, exp: 'Merge Sort splits into 2 halves: 2T(n/2), merges in O(n). By Master Theorem → O(n log n).' },
]

const PLATFORMS = [
  { name: 'LeetCode', url: 'https://leetcode.com', icon: '🟠', accent: '#F97316', tag: 'Industry Standard', rating: 5, type: 'DSA Practice', pros: ['3000+ problems with company tags', 'Premium has interview question frequency', 'Weekly contests for rating', 'Discuss section with editorial solutions'], best: 'FAANG prep, daily practice' },
  { name: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org', icon: '🟢', accent: '#10B981', tag: 'Best for Theory', rating: 5, type: 'Learn + Practice', pros: ['Best conceptual explanations online', 'Hindi + English video content', 'Company-specific question banks', 'Free complete DSA course'], best: 'Learning concepts, Indian company prep' },
  { name: 'NeetCode', url: 'https://neetcode.io', icon: '🔴', accent: '#EF4444', tag: 'Best Free Resource', rating: 5, type: 'Structured Learning', pros: ['Free video for every LC problem', 'Pattern-focused roadmap', 'NeetCode 150 curated list', 'Built-in spaced repetition'], best: 'Pattern learning with explanations' },
  { name: 'Codeforces', url: 'https://codeforces.com', icon: '🔵', accent: '#3B82F6', tag: 'Best for CP', rating: 5, type: 'Competitive Programming', pros: ['3–4 rated contests per week', 'Pupil → Grandmaster rating system', 'Huge problem archive', 'Editorials for every contest'], best: 'Improving speed and CP rating' },
  { name: 'Striver (TakeUForward)', url: 'https://takeuforward.org', icon: '⭐', accent: '#F59E0B', tag: 'A2Z Sheet', rating: 5, type: 'Structured Course', pros: ['450+ problem A2Z sheet', 'YouTube explanations (Hindi/English)', 'SDE Sheet for placements', 'Free and fully structured'], best: 'Complete beginner-to-advanced roadmap' },
  { name: 'InterviewBit', url: 'https://www.interviewbit.com', icon: '🟣', accent: '#8B5CF6', tag: 'Mock Interviews', rating: 4, type: 'Interview Simulation', pros: ['Structured learning path', 'Peer mock interview system', 'Company simulations', 'Streak and leaderboard tracking'], best: 'Structured prep + peer practice' },
  { name: 'HackerRank', url: 'https://hackerrank.com', icon: '🟦', accent: '#0EA5E9', tag: 'OA Simulation', rating: 4, type: 'Skill Certification', pros: ['Used in actual company OAs', 'SQL, Python, Java skill tests', 'Certificate programs', 'Beginner-friendly challenges'], best: 'Online Assessment preparation' },
  { name: 'AtCoder', url: 'https://atcoder.jp', icon: '⚫', accent: '#6B7280', tag: 'Quality CP', rating: 5, type: 'Competitive Programming', pros: ['Highest quality problems', 'Clean rating system', 'Great for advanced algorithms', 'Strong editorial culture'], best: 'Advanced algorithm mastery' },
  { name: 'CodeChef', url: 'https://codechef.com', icon: '🟤', accent: '#92400E', tag: 'Indian CP', rating: 4, type: 'Competitive Programming', pros: ['Cook-Off & Lunchtime contests', '10-day Long Challenge format', 'Active Indian CP community', 'Beginner-friendly long contests'], best: 'Long-format contests, Indian placements' },
  { name: 'CSES Problem Set', url: 'https://cses.fi/problemset', icon: '🔷', accent: '#EF4444', tag: 'Algorithm Bible', rating: 5, type: 'Algorithm Problems', pros: ['300 handpicked classic problems', 'All fundamental algorithms covered', 'Zero clutter — pure problems', 'Globally trusted by CP community'], best: 'Building algorithm fundamentals' },
]

const dc = d =>
  d === 'Easy'   ? { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' } :
  d === 'Medium' ? { bg: '#FEFCE8', color: '#A16207', border: '#FEF08A' } :
                   { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' }

export default function DSA() {
  const navigate = useNavigate()
  const [tab, setTab]               = useState('overview')
  const [openTopic, setOpenTopic]   = useState(null)
  const [activeLang, setActiveLang] = useState(0)
  const [openSnip, setOpenSnip]     = useState(null)
  const [qIdx, setQIdx]             = useState(0)
  const [selected, setSelected]     = useState(null)
  const [answered, setAnswered]     = useState(false)
  const [score, setScore]           = useState(0)
  const [done, setDone]             = useState(false)
  const [history, setHistory]       = useState([])

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx); setAnswered(true)
    if (idx === QUIZ[qIdx].ans) setScore(s => s + 1)
    setHistory(h => [...h, { q: QUIZ[qIdx].q, selected: idx, correct: idx === QUIZ[qIdx].ans, correctIdx: QUIZ[qIdx].ans }])
  }
  const nextQ = () => {
    if (qIdx + 1 >= QUIZ.length) { setDone(true); return }
    setQIdx(q => q + 1); setSelected(null); setAnswered(false)
  }
  const resetQuiz = () => { setQIdx(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); setHistory([]) }
  const progress = Math.round(((qIdx + (answered ? 1 : 0)) / QUIZ.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        .btn { border: none; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .wcard { background: #fff; border-radius: 16px; border: 1.5px solid #E2E8F0; }
        .dcard { background: #0F172A; border-radius: 16px; }
        .lift { transition: transform 0.2s, box-shadow 0.2s; }
        .lift:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.10); }
        .code { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.85; color: #7DD3FC; background: #0F172A; border-radius: 10px; padding: 18px; overflow-x: auto; white-space: pre; border: 1px solid #1E293B; }
        a { text-decoration: none; color: inherit; }
        table { border-collapse: collapse; }
        .opt { width:100%; background:#fff; border:1.5px solid #E2E8F0; border-radius:12px; padding:14px 18px; text-align:left; cursor:pointer; font-family:inherit; font-size:14px; color:#475569; transition:all 0.15s; margin-bottom:10px; display:flex; align-items:center; gap:12px; }
        .opt:hover:not(:disabled) { border-color:#6366F1; background:#F5F3FF; color:#4338CA; }
        .pbar { height:6px; background:#E2E8F0; border-radius:999px; overflow:hidden; }
        .pfill { height:100%; background:linear-gradient(90deg,#6366F1,#0EA5E9); border-radius:999px; transition:width 0.4s; }
      `}</style>

      {/* ── NAVBAR (dark) ── */}
      <nav style={{ background: '#0F172A', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #1E293B' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img onClick={() => navigate('/')} src={logo} alt="logo" style={{ height: 46, cursor: 'pointer', borderRadius: 2 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} className="btn"
                style={{ padding: '7px 14px', borderRadius: 8, fontSize: 16, fontWeight: 600, color: tab === n.id ? '#fff' : '#94A3B8', background: tab === n.id ? '#6366F1' : 'transparent' }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO (dark) ── */}
      <header style={{ background: '#0F172A', padding: '72px 24px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 60%, rgba(99,102,241,0.13) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(14,165,233,0.1) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 999, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A5B4FC', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Complete DSA Mastery Guide</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 68px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 18, color: '#fff' }}>
            Data Structures &{' '}
            <span style={{ background: 'linear-gradient(90deg,#818CF8,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Algorithms</span>
          </h1>
          <p style={{ fontSize: 17, color: '#94A3B8', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
            Every DS explained. Language-specific implementations. 20-question quiz. Best platforms to learn and practice.
          </p>
          {/* ── White stat cards on dark hero ── */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
            {[['9', 'Data Structures'], ['50+', 'Practice Problems'], ['4', 'Languages'], ['20', 'Quiz Questions'], ['10', 'Platforms']].map(([v, l]) => (
              <div key={l} style={{ background: '#fff', borderRadius: 14, padding: '14px 22px', textAlign: 'center', minWidth: 110, boxShadow: '0 4px 24px rgba(0,0,0,0.22)' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#6366F1' }}>{v}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} className="btn"
                style={{ padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: tab === n.id ? '#fff' : '#94A3B8', background: tab === n.id ? '#6366F1' : 'rgba(255,255,255,0.07)', border: `1px solid ${tab === n.id ? '#6366F1' : 'rgba(255,255,255,0.12)'}` }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── STICKY TABS (white bar) ── */}
      <div style={{ background: '#fff', borderBottom: '1.5px solid #E2E8F0', position: 'sticky', top: 60, zIndex: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '10px 24px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className="btn"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', color: tab === n.id ? '#fff' : '#64748B', background: tab === n.id ? '#6366F1' : '#F8FAFC', border: `1.5px solid ${tab === n.id ? '#6366F1' : '#E2E8F0'}` }}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── PAGE BODY (light grey bg) ── */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '52px 24px' }}>

        {/* ══ OVERVIEW ══ */}
        {tab === 'overview' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>🗺️ What is DSA & Why It Matters</h2>
              <p style={{ color: '#64748B', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>Data Structures + Algorithms = the language of technical interviews.</p>
            </div>

            {/* Why cards (white) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 44 }}>
              {[
                { icon: '🏆', title: 'FAANG Interviews', body: 'Google, Amazon, Meta, Microsoft all use DSA coding rounds as the primary filter.', color: '#6366F1' },
                { icon: '🧠', title: 'Problem Solving', body: 'DSA trains you to break complex problems into smaller pieces and find the most efficient solution.', color: '#10B981' },
                { icon: '⚡', title: 'Performance', body: 'The right DS makes the difference between code that runs in 1ms vs 10 seconds on large inputs.', color: '#F59E0B' },
                { icon: '💰', title: 'Salary Impact', body: 'FAANG engineers who ace DSA earn 2–5x more. New grad offers start $150K+ base.', color: '#EC4899' },
              ].map((c, i) => (
                <div key={i} className="wcard lift" style={{ borderTop: `4px solid ${c.color}`, padding: 24 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{c.body}</p>
                </div>
              ))}
            </div>

            {/* Complexity table (dark card) */}
            <div className="dcard" style={{ padding: 28, marginBottom: 28 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 6 }}>📊 Data Structures Quick Reference</h3>
              <p style={{ color: '#475569', fontSize: 13, marginBottom: 20 }}>Complexity cheat-sheet for every major data structure.</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1E293B' }}>
                      {['Data Structure','Access','Search','Insert','Delete','Space','Use Case'].map(h=>(
                        <th key={h} style={{ padding:'10px 14px',textAlign:'left',fontSize:11,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.06em',whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Array','O(1)','O(n)','O(n)','O(n)','O(n)','Random access, sorting'],
                      ['Linked List','O(n)','O(n)','O(1)','O(1)','O(n)','Frequent insert/delete'],
                      ['Stack','O(n)','O(n)','O(1)','O(1)','O(n)','DFS, undo, brackets'],
                      ['Queue','O(n)','O(n)','O(1)','O(1)','O(n)','BFS, scheduling'],
                      ['Hash Map','O(1)','O(1)','O(1)','O(1)','O(n)','Freq count, lookup'],
                      ['Binary Heap','O(1)*','O(n)','O(log n)','O(log n)','O(n)','Priority, Top-K'],
                      ['BST (balanced)','O(log n)','O(log n)','O(log n)','O(log n)','O(n)','Sorted data, range query'],
                      ['Trie','O(m)','O(m)','O(m)','O(m)','O(m·n)','String prefix matching'],
                      ['Graph (Adj List)','O(V+E)','O(V+E)','O(1)','O(E)','O(V+E)','Networks, paths'],
                    ].map((row,i)=>(
                      <tr key={i} style={{ borderBottom:'1px solid #1E293B' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#1E293B'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{ padding:'12px 14px',fontWeight:600,color:'#C7D2FE' }}>{row[0]}</td>
                        {row.slice(1,6).map((v,j)=>(
                          <td key={j} style={{ padding:'12px 14px',fontFamily:'JetBrains Mono',fontSize:12,color:v==='O(1)'?'#4ADE80':v.includes('log')?'#60A5FA':'#94A3B8' }}>{v}</td>
                        ))}
                        <td style={{ padding:'12px 14px',fontSize:12,color:'#64748B',fontStyle:'italic' }}>{row[6]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Roadmap (white card) */}
            <div className="wcard" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>🗺️ DSA Learning Roadmap</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(185px,1fr))', gap: 12 }}>
                {[
                  { phase:'Phase 1', title:'Foundations', weeks:'Week 1–3', color:'#6366F1', items:['Arrays & Strings','Big-O Complexity','Basic Sorting','Recursion Basics'] },
                  { phase:'Phase 2', title:'Core DS', weeks:'Week 4–7', color:'#10B981', items:['Linked Lists','Stacks & Queues','Hash Maps & Sets','Binary Search'] },
                  { phase:'Phase 3', title:'Trees & Graphs', weeks:'Week 8–11', color:'#F59E0B', items:['Binary Trees & BST','Heaps','Graph BFS/DFS','Topological Sort'] },
                  { phase:'Phase 4', title:'Advanced', weeks:'Week 12–16', color:'#EF4444', items:['Dynamic Programming','Backtracking','Tries','Advanced Graphs'] },
                  { phase:'Phase 5', title:'Interview Ready', weeks:'Week 17–20', color:'#EC4899', items:['Company-wise Qs','Mock interviews','System Design','Behavioral prep'] },
                ].map((p,i)=>(
                  <div key={i} style={{ background:'#F8FAFC',border:`1.5px solid ${p.color}25`,borderRadius:14,padding:18,borderTop:`4px solid ${p.color}` }}>
                    <div style={{ fontSize:10,fontWeight:700,color:p.color,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4 }}>{p.phase} · {p.weeks}</div>
                    <div style={{ fontSize:15,fontWeight:700,color:'#0F172A',marginBottom:12 }}>{p.title}</div>
                    {p.items.map((it,j)=>(
                      <div key={j} style={{ display:'flex',gap:8,marginBottom:7,fontSize:12,color:'#64748B' }}>
                        <span style={{ color:p.color,fontWeight:700,flexShrink:0 }}>▸</span>{it}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ DSA GUIDE ══ */}
        {tab === 'dsa' && (
          <div>
            <div style={{ textAlign:'center',marginBottom:44 }}>
              <h2 style={{ fontSize:36,fontWeight:800,color:'#0F172A',marginBottom:10 }}>🧠 Complete DSA Guide</h2>
              <p style={{ color:'#64748B',fontSize:16 }}>Every major data structure with operations, patterns, and linked problems.</p>
            </div>

            <div style={{ display:'flex',flexWrap:'wrap',gap:8,marginBottom:24 }}>
              {DSA_TOPICS.map((t,i)=>(
                <button key={i} onClick={()=>setOpenTopic(openTopic===i?null:i)} className="btn"
                  style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:999,fontSize:13,fontWeight:600,background:openTopic===i?t.accent:'#fff',color:openTopic===i?'#fff':'#64748B',border:`1.5px solid ${openTopic===i?t.accent:'#E2E8F0'}`,boxShadow:openTopic===i?`0 4px 14px ${t.accent}40`:'none' }}>
                  {t.icon} {t.title}
                </button>
              ))}
            </div>

            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {DSA_TOPICS.map((topic,i)=>{
                const isOpen = openTopic===i
                return (
                  <div key={i} style={{ background:'#fff',border:`1.5px solid ${isOpen?topic.accent:'#E2E8F0'}`,borderRadius:18,overflow:'hidden',boxShadow:isOpen?`0 4px 24px ${topic.accent}18`:'0 1px 4px rgba(0,0,0,0.04)' }}>
                    <button className="btn" onClick={()=>setOpenTopic(isOpen?null:i)}
                      style={{ width:'100%',background:isOpen?`${topic.accent}07`:'transparent',padding:'20px 24px',display:'flex',alignItems:'center',gap:14 }}>
                      <div style={{ width:48,height:48,borderRadius:13,background:`${topic.accent}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0 }}>{topic.icon}</div>
                      <div style={{ flex:1,textAlign:'left' }}>
                        <div style={{ fontSize:17,fontWeight:700,color:'#0F172A' }}>{topic.title}</div>
                        <div style={{ fontFamily:'JetBrains Mono',fontSize:11,color:topic.accent,marginTop:3 }}>{topic.complexity}</div>
                      </div>
                      <span style={{ background:'#F1F5F9',color:'#64748B',borderRadius:6,padding:'3px 10px',fontSize:12,fontWeight:600 }}>{topic.problems.length} problems</span>
                      <span style={{ color:'#CBD5E1',fontSize:18,marginLeft:4,transform:isOpen?'rotate(180deg)':'none',transition:'transform 0.2s' }}>▼</span>
                    </button>

                    {isOpen && (
                      <div style={{ borderTop:`1px solid ${topic.accent}18` }}>
                        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,padding:'20px 24px 0' }}>
                          {/* About — dark */}
                          <div style={{ background:'#0F172A',border:'1px solid #1E293B',borderRadius:12,padding:16 }}>
                            <p style={{ fontSize:10,fontWeight:700,color:topic.accent,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8 }}>About</p>
                            <p style={{ fontSize:13,color:'#94A3B8',lineHeight:1.7 }}>{topic.desc}</p>
                          </div>
                          {/* Key Ops — white */}
                          <div style={{ background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:12,padding:16 }}>
                            <p style={{ fontSize:10,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10 }}>Key Operations</p>
                            <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
                              {topic.keyOps.map((op,j)=>(
                                <span key={j} style={{ background:'#fff',border:'1px solid #E2E8F0',borderRadius:6,padding:'4px 8px',fontSize:11,color:'#475569' }}>{op}</span>
                              ))}
                            </div>
                          </div>
                          {/* Patterns — colored tint */}
                          <div style={{ background:`${topic.accent}08`,border:`1px solid ${topic.accent}22`,borderRadius:12,padding:16 }}>
                            <p style={{ fontSize:10,fontWeight:700,color:topic.accent,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10 }}>Interview Patterns</p>
                            {topic.patterns.map((p,j)=>(
                              <div key={j} style={{ display:'flex',gap:6,marginBottom:7,fontSize:12,color:'#374151',fontWeight:500 }}>
                                <span style={{ color:topic.accent,fontWeight:700 }}>→</span>{p}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tip banner */}
                        <div style={{ margin:'14px 24px',background:'#FFFBEB',border:'1px solid #FDE68A',borderRadius:10,padding:'12px 16px',display:'flex',gap:10 }}>
                          <span style={{ fontSize:16,flexShrink:0 }}>💡</span>
                          <p style={{ fontSize:13,color:'#92400E',lineHeight:1.6,fontWeight:500 }}>{topic.tip}</p>
                        </div>

                        {/* Problems table */}
                        <div style={{ padding:'0 24px 24px' }}>
                          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
                            <p style={{ fontSize:11,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em' }}>Must-Solve Problems</p>
                            <a href={topic.learnUrl} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize:11,fontWeight:700,color:topic.accent,background:`${topic.accent}10`,border:`1px solid ${topic.accent}30`,borderRadius:6,padding:'4px 10px' }}>
                              Deep Dive on GFG ↗
                            </a>
                          </div>
                          <div style={{ background:'#F8FAFC',borderRadius:12,overflow:'hidden',border:'1px solid #E2E8F0' }}>
                            <table style={{ width:'100%' }}>
                              <thead>
                                <tr style={{ background:'#F1F5F9',borderBottom:'1px solid #E2E8F0' }}>
                                  {['Problem','Difficulty','Solve on'].map(h=>(
                                    <th key={h} style={{ padding:'9px 14px',textAlign:'left',fontSize:10,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.06em' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {topic.problems.map((p,j)=>{
                                  const ds=dc(p.diff)
                                  return (
                                    <tr key={j} style={{ borderBottom:'1px solid #F1F5F9',background:'#fff' }}
                                      onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'}
                                      onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                                      <td style={{ padding:'12px 14px',fontSize:14,fontWeight:500,color:'#1E293B' }}>{p.name}</td>
                                      <td style={{ padding:'12px 14px' }}>
                                        <span style={{ display:'inline-block',background:ds.bg,color:ds.color,border:`1px solid ${ds.border}`,borderRadius:6,padding:'3px 8px',fontSize:11,fontWeight:700 }}>{p.diff}</span>
                                      </td>
                                      <td style={{ padding:'12px 14px' }}>
                                        <div style={{ display:'flex',gap:6 }}>
                                          <a href={p.lc} target="_blank" rel="noopener noreferrer"
                                            style={{ background:'#FFF7ED',border:'1px solid #FED7AA',borderRadius:6,padding:'5px 10px',fontSize:11,fontWeight:700,color:'#C2410C' }}>LC ↗</a>
                                          <a href={p.gfg} target="_blank" rel="noopener noreferrer"
                                            style={{ background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:6,padding:'5px 10px',fontSize:11,fontWeight:700,color:'#15803D' }}>GFG ↗</a>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
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

        {/* ══ LANGUAGES ══ */}
        {tab === 'languages' && (
          <div>
            <div style={{ textAlign:'center',marginBottom:44 }}>
              <h2 style={{ fontSize:36,fontWeight:800,color:'#0F172A',marginBottom:10 }}>💻 DSA by Language</h2>
              <p style={{ color:'#64748B',fontSize:16 }}>Built-in data structures, syntax, and interview snippets for each language.</p>
            </div>

            <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginBottom:28,justifyContent:'center' }}>
              {LANG_DSA.map((l,i)=>(
                <button key={i} onClick={()=>{setActiveLang(i);setOpenSnip(null)}} className="btn lift"
                  style={{ display:'flex',alignItems:'center',gap:8,padding:'12px 24px',borderRadius:14,fontSize:15,fontWeight:700,background:activeLang===i?l.accent:'#fff',color:activeLang===i?'#fff':'#374151',border:`2px solid ${activeLang===i?l.accent:'#E2E8F0'}`,boxShadow:activeLang===i?`0 6px 20px ${l.accent}40`:'0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize:22 }}>{l.icon}</span>{l.name}
                </button>
              ))}
            </div>

            {(()=>{
              const lang = LANG_DSA[activeLang]
              return (
                <div>
                  {/* Dark banner header */}
                  <div style={{ background:'#0F172A',borderRadius:18,padding:'24px 28px',marginBottom:20,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap' }}>
                    <span style={{ fontSize:48 }}>{lang.icon}</span>
                    <div style={{ flex:1,minWidth:200 }}>
                      <div style={{ fontSize:26,fontWeight:800,color:'#F1F5F9' }}>{lang.name}</div>
                      <div style={{ fontSize:14,color:'#64748B',marginTop:4 }}>{lang.tagline}</div>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                      {lang.tips.map((t,i)=>(
                        <div key={i} style={{ display:'flex',gap:8,fontSize:12,color:'#94A3B8' }}>
                          <span style={{ color:lang.accent,fontWeight:700,flexShrink:0 }}>✓</span>{t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* White DS cards with dark code panel */}
                  <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                    {lang.dsaTools.map((ds,i)=>{
                      const key = `${activeLang}-${i}`
                      const isOpen = openSnip===key
                      return (
                        <div key={i} style={{ background:'#fff',border:`1.5px solid ${isOpen?lang.accent:'#E2E8F0'}`,borderRadius:14,overflow:'hidden',boxShadow:isOpen?`0 4px 16px ${lang.accent}18`:'0 1px 4px rgba(0,0,0,0.04)' }}>
                          <button className="btn" onClick={()=>setOpenSnip(isOpen?null:key)}
                            style={{ width:'100%',background:isOpen?`${lang.accent}06`:'transparent',padding:'16px 20px',display:'flex',alignItems:'center',gap:14 }}>
                            <div style={{ flex:1,textAlign:'left' }}>
                              <div style={{ fontSize:15,fontWeight:700,color:'#0F172A' }}>{ds.ds}</div>
                              <div style={{ fontFamily:'JetBrains Mono',fontSize:11,color:'#94A3B8',marginTop:3 }}>{ds.builtin}</div>
                            </div>
                            <span style={{ fontFamily:'JetBrains Mono',fontSize:11,color:lang.accent,background:`${lang.accent}10`,border:`1px solid ${lang.accent}25`,borderRadius:6,padding:'3px 10px',whiteSpace:'nowrap' }}>{ds.ops}</span>
                            <span style={{ color:'#CBD5E1',fontSize:16,transform:isOpen?'rotate(180deg)':'none',transition:'transform 0.2s',marginLeft:8,flexShrink:0 }}>▼</span>
                          </button>
                          {isOpen && (
                            <div style={{ padding:'0 20px 20px' }}>
                              <pre className="code">{ds.snippet}</pre>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ══ QUIZ ══ */}
        {tab === 'quiz' && (
          <div style={{ maxWidth:720,margin:'0 auto' }}>
            <div style={{ textAlign:'center',marginBottom:44 }}>
              <h2 style={{ fontSize:36,fontWeight:800,color:'#0F172A',marginBottom:10 }}>🎯 DSA Knowledge Quiz</h2>
              <p style={{ color:'#64748B',fontSize:16 }}>20 questions covering all major DSA topics.</p>
            </div>

            {!done ? (
              <div>
                {/* Progress — white card */}
                <div className="wcard" style={{ padding:20,marginBottom:20 }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:'#6366F1' }}>Question {qIdx+1} of {QUIZ.length}</span>
                    <span style={{ fontFamily:'JetBrains Mono',fontSize:13,color:'#10B981',fontWeight:700 }}>Score: {score}/{qIdx+(answered?1:0)}</span>
                  </div>
                  <div className="pbar"><div className="pfill" style={{ width:`${progress}%` }} /></div>
                </div>

                {/* Question — white card */}
                <div className="wcard" style={{ padding:28,marginBottom:16 }}>
                  <div style={{ display:'flex',alignItems:'flex-start',gap:12,marginBottom:24 }}>
                    <span style={{ width:34,height:34,borderRadius:10,background:'#EEF2FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#6366F1',flexShrink:0 }}>Q{qIdx+1}</span>
                    <h3 style={{ fontSize:17,fontWeight:700,color:'#0F172A',lineHeight:1.5 }}>{QUIZ[qIdx].q}</h3>
                  </div>

                  {QUIZ[qIdx].opts.map((opt,idx)=>{
                    let bg='#fff', border='#E2E8F0', color='#475569', icon=String.fromCharCode(65+idx)
                    if(answered){
                      if(idx===QUIZ[qIdx].ans){bg='#F0FDF4';border='#4ADE8060';color='#15803D';icon='✓'}
                      else if(idx===selected){bg='#FFF1F2';border='#F8717160';color='#BE123C';icon='✗'}
                    }
                    return(
                      <button key={idx} className="opt" disabled={answered} onClick={()=>handleAnswer(idx)}
                        style={{ background:bg,borderColor:border,color,fontWeight:answered&&idx===QUIZ[qIdx].ans?700:400 }}>
                        <span style={{ width:28,height:28,borderRadius:7,border:`1.5px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,flexShrink:0,color,background:answered&&idx===QUIZ[qIdx].ans?'#DCFCE7':answered&&idx===selected?'#FEE2E2':'#F8FAFC' }}>{icon}</span>
                        {opt}
                      </button>
                    )
                  })}

                  {answered && (
                    <div style={{ background:selected===QUIZ[qIdx].ans?'#F0FDF4':'#FFF1F2',border:`1px solid ${selected===QUIZ[qIdx].ans?'#BBF7D0':'#FECDD3'}`,borderRadius:10,padding:'14px 16px',marginTop:8 }}>
                      <p style={{ fontSize:12,fontWeight:700,color:selected===QUIZ[qIdx].ans?'#15803D':'#BE123C',marginBottom:6 }}>
                        {selected===QUIZ[qIdx].ans?'🎉 Correct!':'❌ Incorrect'}
                      </p>
                      <p style={{ fontSize:13,color:'#374151',lineHeight:1.7 }}>{QUIZ[qIdx].exp}</p>
                    </div>
                  )}
                </div>

                {answered && (
                  <button onClick={nextQ} className="btn"
                    style={{ width:'100%',background:'#6366F1',color:'#fff',padding:14,borderRadius:12,fontSize:15,fontWeight:700,boxShadow:'0 4px 14px rgba(99,102,241,0.35)' }}>
                    {qIdx+1>=QUIZ.length?'See Results 🎊':'Next Question →'}
                  </button>
                )}
              </div>
            ) : (
              <div>
                {/* Score — dark card */}
                <div style={{ background:'#0F172A',borderRadius:24,padding:36,textAlign:'center',marginBottom:20 }}>
                  <div style={{ fontSize:56,marginBottom:16 }}>{score>=17?'🏆':score>=13?'🎯':score>=9?'📚':'💪'}</div>
                  <div style={{ fontFamily:'JetBrains Mono',fontSize:52,fontWeight:700,color:score>=17?'#4ADE80':score>=13?'#FCD34D':'#F87171',marginBottom:8 }}>{score}/{QUIZ.length}</div>
                  <div style={{ fontSize:20,fontWeight:700,color:'#F1F5F9',marginBottom:6 }}>
                    {score>=17?'DSA Expert! 🔥':score>=13?'Solid Foundation 👍':score>=9?'Keep Practicing 📖':'Time to Study 🚀'}
                  </div>
                  <div style={{ fontSize:14,color:'#64748B',marginBottom:24 }}>{Math.round((score/QUIZ.length)*100)}% accuracy</div>
                  {/* White stat chips inside dark card */}
                  <div style={{ display:'flex',gap:12,justifyContent:'center' }}>
                    <div style={{ background:'#fff',borderRadius:12,padding:'14px 24px',textAlign:'center' }}>
                      <div style={{ fontSize:24,fontWeight:800,color:'#15803D' }}>{score}</div>
                      <div style={{ fontSize:11,color:'#94A3B8' }}>Correct</div>
                    </div>
                    <div style={{ background:'#fff',borderRadius:12,padding:'14px 24px',textAlign:'center' }}>
                      <div style={{ fontSize:24,fontWeight:800,color:'#BE123C' }}>{QUIZ.length-score}</div>
                      <div style={{ fontSize:11,color:'#94A3B8' }}>Incorrect</div>
                    </div>
                  </div>
                </div>

                {/* Review — white */}
                <div className="wcard" style={{ padding:20,marginBottom:14 }}>
                  <p style={{ fontSize:11,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14 }}>Review Answers</p>
                  {history.map((h,i)=>(
                    <div key={i} style={{ display:'flex',gap:10,alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid #F1F5F9' }}>
                      <span style={{ fontSize:16,flexShrink:0,marginTop:1 }}>{h.correct?'✅':'❌'}</span>
                      <div>
                        <p style={{ fontSize:13,color:'#1E293B',marginBottom:h.correct?0:4 }}>{h.q}</p>
                        {!h.correct && <p style={{ fontSize:12,color:'#15803D',fontWeight:600 }}>Correct: {QUIZ[i].opts[h.correctIdx]}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={resetQuiz} className="btn"
                  style={{ width:'100%',background:'#6366F1',color:'#fff',padding:14,borderRadius:12,fontSize:15,fontWeight:700,boxShadow:'0 4px 14px rgba(99,102,241,0.35)' }}>
                  🔁 Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══ PLATFORMS ══ */}
        {tab === 'platforms' && (
          <div>
            <div style={{ textAlign:'center',marginBottom:44 }}>
              <h2 style={{ fontSize:36,fontWeight:800,color:'#0F172A',marginBottom:10 }}>🚀 Best Platforms to Learn DSA</h2>
              <p style={{ color:'#64748B',fontSize:16 }}>Every platform ranked, reviewed, and ready to visit.</p>
            </div>

            {/* White platform cards */}
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:16,marginBottom:36 }}>
              {PLATFORMS.map((p,i)=>(
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="wcard lift"
                  style={{ display:'block',borderLeft:`4px solid ${p.accent}`,padding:22 }}>
                  <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:14 }}>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <span style={{ fontSize:28 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize:17,fontWeight:700,color:'#0F172A' }}>{p.name}</div>
                        <div style={{ fontSize:11,color:'#94A3B8' }}>{p.type}</div>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <span style={{ display:'inline-block',background:`${p.accent}12`,color:p.accent,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:700,border:`1px solid ${p.accent}25` }}>{p.tag}</span>
                      <div style={{ marginTop:4 }}>{'★'.repeat(p.rating).split('').map((_,j)=><span key={j} style={{ color:'#FCD34D',fontSize:12 }}>★</span>)}</div>
                    </div>
                  </div>
                  {p.pros.map((pro,j)=>(
                    <div key={j} style={{ display:'flex',gap:8,marginBottom:6,fontSize:13,color:'#475569' }}>
                      <span style={{ color:p.accent,fontWeight:700,flexShrink:0 }}>✓</span>{pro}
                    </div>
                  ))}
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:12,borderTop:'1px solid #F1F5F9',marginTop:10 }}>
                    <span style={{ fontSize:12,color:'#94A3B8' }}>Best for: <span style={{ color:'#374151',fontWeight:600 }}>{p.best}</span></span>
                    <span style={{ fontSize:12,fontWeight:700,color:p.accent }}>Visit ↗</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Strategy — dark card with white inner cards */}
            <div style={{ background:'#0F172A',borderRadius:20,padding:28 }}>
              <h3 style={{ fontSize:22,fontWeight:800,color:'#F1F5F9',marginBottom:20 }}>🗺️ Platform Strategy by Goal</h3>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:14 }}>
                {[
                  { goal:'Complete Beginner', color:'#6366F1', icon:'🌱', plan:['GFG — Learn concepts with theory','NeetCode — Watch pattern videos','LeetCode Easy — First 30 problems','HackerRank — Warm-up challenges'] },
                  { goal:'FAANG Prep', color:'#10B981', icon:'🏆', plan:['NeetCode 150 — All with video','LeetCode — Company-tagged Qs','Striver SDE Sheet — Comprehensive','Mock interviews on InterviewBit'] },
                  { goal:'Competitive Programming', color:'#F59E0B', icon:'⚡', plan:['CSES — Algorithm fundamentals','Codeforces — Weekly rated contests','AtCoder — High quality problems','CodeChef — Long format contests'] },
                  { goal:'30-Day Sprint', color:'#EF4444', icon:'🚀', plan:['Week 1: Arrays + Strings','Week 2: Trees + Graphs (NeetCode)','Week 3: DP + Backtracking (GFG)','Week 4: Company mocks + review'] },
                ].map((item,i)=>(
                  <div key={i} style={{ background:'#fff',border:'1px solid #E2E8F0',borderRadius:14,padding:18,borderTop:`3px solid ${item.color}` }}>
                    <div style={{ display:'flex',gap:8,alignItems:'center',marginBottom:14 }}>
                      <span style={{ fontSize:20 }}>{item.icon}</span>
                      <div style={{ fontSize:14,fontWeight:700,color:item.color }}>{item.goal}</div>
                    </div>
                    {item.plan.map((step,j)=>(
                      <div key={j} style={{ display:'flex',gap:8,marginBottom:8,fontSize:12,color:'#475569' }}>
                        <span style={{ width:18,height:18,borderRadius:4,background:`${item.color}15`,color:item.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,flexShrink:0 }}>{j+1}</span>{step}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER (dark) ── */}
      <footer style={{ background:'#0F172A',borderTop:'1px solid #1E293B',padding:'36px 24px',marginTop:32 }}>
        <div style={{ maxWidth:1400,margin:'0 auto',textAlign:'center' }}>
          <div style={{ fontSize:20,fontWeight:800,color:'#fff',marginBottom:8 }}>DSA Mastery</div>
          <p style={{ fontSize:13,color:'#475569',marginBottom:16 }}>Every data structure. Every algorithm. Every question — linked and ready to solve.</p>
          <div style={{ display:'flex',justifyContent:'center',gap:20,flexWrap:'wrap',marginBottom:16 }}>
            {NAV.map(n=><span key={n.id} style={{ fontSize:12,color:'#334155' }}>{n.icon} {n.label}</span>)}
          </div>
          <p style={{ fontSize:11,color:'#1E293B',borderTop:'1px solid #1E293B',paddingTop:14}}>
            © 2026 aiplacprep@gmail.com  Built for engineers aiming at FAANG and top tech companies.
          </p>
        </div>
      </footer>
    </div>
  )
}
