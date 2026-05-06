import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/image.png'

// ─── PALETTE & NAV ────────────────────────────────────────────────────────

const NAV = [
  { id: 'algorithms', label: 'Algorithms', icon: '⚙️' },
  { id: 'questions', label: 'All Questions', icon: '📌' },
  { id: 'complexity', label: 'Big-O Guide', icon: '📐' },
  { id: 'concepts', label: 'Core Concepts', icon: '🧩' },
  { id: 'tips', label: 'Pro Tips', icon: '💎' },
]

// ─── ALGORITHMS DATA ──────────────────────────────────────────────────────

const ALGORITHMS = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: '↕️',
    accent: '#6366F1',
    light: '#EEF2FF',
    dark: '#4338CA',
    desc: 'Fundamental algorithms to arrange data in order. Every engineer must know these cold.',
    algorithms: [
      {
        name: 'Bubble Sort',
        time: 'O(n²)', space: 'O(1)', stable: true, inplace: true,
        when: 'Educational purposes only. Never in production.',
        idea: 'Repeatedly swap adjacent elements if they are in wrong order. Largest element "bubbles" to end each pass.',
        code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}`,
      },
      {
        name: 'Selection Sort',
        time: 'O(n²)', space: 'O(1)', stable: false, inplace: true,
        when: 'Small datasets. Minimizes number of swaps.',
        idea: 'Find the minimum element in the unsorted portion and swap it to its correct position.',
        code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
  return arr
}`,
      },
      {
        name: 'Insertion Sort',
        time: 'O(n²)', space: 'O(1)', stable: true, inplace: true,
        when: 'Nearly sorted data. Small arrays. Online algorithms (data comes one at a time).',
        idea: 'Build sorted array one element at a time by inserting each new element into its correct position.',
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j--]
    }
    arr[j + 1] = key
  }
  return arr
}`,
      },
      {
        name: 'Merge Sort',
        time: 'O(n log n)', space: 'O(n)', stable: true, inplace: false,
        when: 'Linked lists. When stability matters. External sorting of large data.',
        idea: 'Divide array in half recursively, sort each half, then merge the sorted halves.',
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
function merge(l, r) {
  const res = []
  let i = 0, j = 0
  while (i < l.length && j < r.length) {
    res.push(l[i] <= r[j] ? l[i++] : r[j++])
  }
  return [...res, ...l.slice(i), ...r.slice(j)]
}`,
      },
      {
        name: 'Quick Sort',
        time: 'O(n log n) avg', space: 'O(log n)', stable: false, inplace: true,
        when: 'General purpose in-place sorting. Fastest in practice for most datasets.',
        idea: 'Pick a pivot, partition array so elements < pivot are left, elements > pivot are right, recurse.',
        code: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi)
    quickSort(arr, lo, p - 1)
    quickSort(arr, p + 1, hi)
  }
  return arr
}
function partition(arr, lo, hi) {
  const pivot = arr[hi]
  let i = lo - 1
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      [arr[++i], arr[j]] = [arr[j], arr[i]]
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
  return i + 1
}`,
      },
      {
        name: 'Heap Sort',
        time: 'O(n log n)', space: 'O(1)', stable: false, inplace: true,
        when: 'When you need guaranteed O(n log n) with O(1) space. Not cache friendly though.',
        idea: 'Build a max-heap, then repeatedly extract the max element and place it at the end.',
        code: `function heapSort(arr) {
  const n = arr.length
  for (let i = Math.floor(n/2) - 1; i >= 0; i--)
    heapify(arr, n, i)
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(arr, i, 0)
  }
  return arr
}
function heapify(arr, n, i) {
  let largest = i, l = 2*i+1, r = 2*i+2
  if (l < n && arr[l] > arr[largest]) largest = l
  if (r < n && arr[r] > arr[largest]) largest = r
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, n, largest)
  }
}`,
      },
      {
        name: 'Counting Sort',
        time: 'O(n + k)', space: 'O(k)', stable: true, inplace: false,
        when: 'Integers in a known small range. Sorting characters. Radix Sort subroutine.',
        idea: 'Count occurrences of each element, compute prefix sums, then place elements in output array.',
        code: `function countingSort(arr, max) {
  const count = new Array(max + 1).fill(0)
  const output = new Array(arr.length)
  arr.forEach(n => count[n]++)
  for (let i = 1; i <= max; i++) count[i] += count[i-1]
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i]]] = arr[i]
  }
  return output
}`,
      },
      {
        name: 'Radix Sort',
        time: 'O(d·(n+k))', space: 'O(n+k)', stable: true, inplace: false,
        when: 'Large integers with fixed number of digits. Sorting strings. When O(n log n) isn\'t fast enough.',
        idea: 'Sort digit by digit from least significant to most significant using a stable sort (counting sort).',
        code: `function radixSort(arr) {
  const max = Math.max(...arr)
  for (let exp = 1; Math.floor(max/exp) > 0; exp *= 10) {
    arr = countingSortByDigit(arr, exp)
  }
  return arr
}
function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length), count = new Array(10).fill(0)
  arr.forEach(n => count[Math.floor(n/exp) % 10]++)
  for (let i = 1; i < 10; i++) count[i] += count[i-1]
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i]/exp) % 10
    output[--count[digit]] = arr[i]
  }
  return output
}`,
      },
    ],
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    icon: '🔍',
    accent: '#10B981',
    light: '#ECFDF5',
    dark: '#065F46',
    desc: 'Efficiently locate elements in data structures. Binary search variants are interview gold.',
    algorithms: [
      {
        name: 'Linear Search',
        time: 'O(n)', space: 'O(1)', stable: true, inplace: true,
        when: 'Unsorted arrays. Small datasets. One-time search.',
        idea: 'Scan each element one by one from left to right until the target is found.',
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}`,
      },
      {
        name: 'Binary Search',
        time: 'O(log n)', space: 'O(1)', stable: true, inplace: true,
        when: 'Sorted array. Most common interview pattern. Also used on "answer space".',
        idea: 'Compare target with middle element. Eliminate half the search space each step.',
        code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1
    if (arr[mid] === target) return mid
    else if (arr[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}`,
      },
      {
        name: 'Jump Search',
        time: 'O(√n)', space: 'O(1)', stable: true, inplace: true,
        when: 'Sorted arrays where backward traversal is costly. Between linear and binary.',
        idea: 'Jump ahead by √n steps. When overshot, do linear search in the previous block.',
        code: `function jumpSearch(arr, target) {
  const n = arr.length, step = Math.floor(Math.sqrt(n))
  let prev = 0, curr = step
  while (arr[Math.min(curr, n) - 1] < target) {
    prev = curr; curr += step
    if (prev >= n) return -1
  }
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i
  }
  return -1
}`,
      },
      {
        name: 'Interpolation Search',
        time: 'O(log log n)', space: 'O(1)', stable: true, inplace: true,
        when: 'Sorted AND uniformly distributed data. Can degrade to O(n) if distribution is skewed.',
        idea: 'Estimate position of target based on value distribution — smarter probe than midpoint.',
        code: `function interpolationSearch(arr, target) {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    const pos = lo + Math.floor(
      ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo])
    )
    if (arr[pos] === target) return pos
    if (arr[pos] < target) lo = pos + 1
    else hi = pos - 1
  }
  return -1
}`,
      },
    ],
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    icon: '🕸️',
    accent: '#F59E0B',
    light: '#FFFBEB',
    dark: '#92400E',
    desc: 'Graph traversal and shortest path algorithms. Appear in 20%+ of senior interviews.',
    algorithms: [
      {
        name: 'BFS (Breadth-First Search)',
        time: 'O(V + E)', space: 'O(V)', stable: true, inplace: false,
        when: 'Shortest path in unweighted graph. Level-order traversal. Finding connected components.',
        idea: 'Use a queue. Explore all neighbors at current depth before moving deeper.',
        code: `function bfs(graph, start) {
  const visited = new Set([start])
  const queue = [start], result = []
  while (queue.length) {
    const node = queue.shift()
    result.push(node)
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
  return result
}`,
      },
      {
        name: 'DFS (Depth-First Search)',
        time: 'O(V + E)', space: 'O(V)', stable: true, inplace: false,
        when: 'Cycle detection. Topological sort. Connected components. Maze solving.',
        idea: 'Use a stack (or recursion). Go as deep as possible before backtracking.',
        code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start)
  const result = [start]
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited))
    }
  }
  return result
}`,
      },
      {
        name: "Dijkstra's Algorithm",
        time: 'O((V+E) log V)', space: 'O(V)', stable: false, inplace: false,
        when: 'Shortest path in weighted graph with NON-NEGATIVE weights.',
        idea: 'Greedy: always process the unvisited node with smallest known distance using a min-heap.',
        code: `function dijkstra(graph, start) {
  const dist = {}, pq = [[0, start]]
  for (const node in graph) dist[node] = Infinity
  dist[start] = 0
  while (pq.length) {
    pq.sort((a,b) => a[0]-b[0])
    const [d, u] = pq.shift()
    if (d > dist[u]) continue
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
        pq.push([dist[v], v])
      }
    }
  }
  return dist
}`,
      },
      {
        name: 'Bellman-Ford',
        time: 'O(V·E)', space: 'O(V)', stable: false, inplace: false,
        when: 'Shortest path with NEGATIVE weight edges. Detecting negative cycles.',
        idea: 'Relax all edges V-1 times. If you can still relax on the Vth iteration, a negative cycle exists.',
        code: `function bellmanFord(edges, n, src) {
  const dist = new Array(n).fill(Infinity)
  dist[src] = 0
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v])
        dist[v] = dist[u] + w
    }
  }
  // check negative cycle
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v])
      return null // negative cycle
  }
  return dist
}`,
      },
      {
        name: 'Floyd-Warshall',
        time: 'O(V³)', space: 'O(V²)', stable: false, inplace: false,
        when: 'All-pairs shortest paths. Dense graphs. Detecting negative cycles.',
        idea: 'Dynamic programming: for each intermediate vertex k, check if path through k is shorter.',
        code: `function floydWarshall(graph) {
  const n = graph.length
  const dist = graph.map(r => [...r])
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j]
  return dist
}`,
      },
      {
        name: 'Topological Sort (Kahn\'s BFS)',
        time: 'O(V + E)', space: 'O(V)', stable: false, inplace: false,
        when: 'Directed Acyclic Graph (DAG). Task scheduling. Build order. Dependency resolution.',
        idea: 'Count in-degrees. Start with 0 in-degree nodes. Process node → decrement neighbors in-degree → add new 0 in-degree nodes.',
        code: `function topoSort(graph, n) {
  const indegree = new Array(n).fill(0)
  for (const u in graph)
    for (const v of graph[u]) indegree[v]++
  const queue = [], result = []
  for (let i = 0; i < n; i++)
    if (indegree[i] === 0) queue.push(i)
  while (queue.length) {
    const u = queue.shift()
    result.push(u)
    for (const v of graph[u] || []) {
      if (--indegree[v] === 0) queue.push(v)
    }
  }
  return result.length === n ? result : [] // cycle detected
}`,
      },
      {
        name: "Kruskal's MST",
        time: 'O(E log E)', space: 'O(V)', stable: false, inplace: false,
        when: 'Minimum Spanning Tree in sparse graphs. Network design.',
        idea: 'Sort edges by weight. Add edge if it doesn\'t create a cycle (using Union-Find). Stop when V-1 edges added.',
        code: `function kruskal(edges, n) {
  edges.sort((a, b) => a[2] - b[2])
  const parent = Array.from({length: n}, (_, i) => i)
  const find = x => parent[x] === x ? x : parent[x] = find(parent[x])
  const union = (x, y) => {
    const px = find(x), py = find(y)
    if (px === py) return false
    parent[px] = py; return true
  }
  const mst = []
  for (const [u, v, w] of edges) {
    if (union(u, v)) mst.push([u, v, w])
    if (mst.length === n - 1) break
  }
  return mst
}`,
      },
      {
        name: 'Union-Find (DSU)',
        time: 'O(α(n)) ≈ O(1)', space: 'O(n)', stable: false, inplace: true,
        when: 'Connected components. Detecting cycles. Kruskal\'s MST. Network connectivity.',
        idea: 'Maintain a disjoint set forest. Path compression + union by rank gives near-constant operations.',
        code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }
  find(x) {
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }
  union(x, y) {
    const px = this.find(x), py = this.find(y)
    if (px === py) return false
    if (this.rank[px] < this.rank[py]) this.parent[px] = py
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px
    else { this.parent[py] = px; this.rank[px]++ }
    return true
  }
}`,
      },
    ],
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    icon: '⚡',
    accent: '#EF4444',
    light: '#FEF2F2',
    dark: '#991B1B',
    desc: 'Break complex problems into overlapping subproblems. The hardest and most rewarding interview category.',
    algorithms: [
      {
        name: 'Fibonacci (Memoization)',
        time: 'O(n)', space: 'O(n)', stable: true, inplace: false,
        when: 'Any overlapping subproblem. This is the "hello world" of DP — learn this pattern.',
        idea: 'Cache results of subproblems in a memo table. Recursion + cache = memoization.',
        code: `function fib(n, memo = {}) {
  if (n <= 1) return n
  if (memo[n]) return memo[n]
  return memo[n] = fib(n-1, memo) + fib(n-2, memo)
}`,
      },
      {
        name: '0/1 Knapsack',
        time: 'O(n·W)', space: 'O(n·W)', stable: false, inplace: false,
        when: 'Select subset of items with weight/value tradeoff. Partition equal subset sum.',
        idea: 'For each item, decide: include it (if capacity allows) or skip it. Take max of both choices.',
        code: `function knapsack(weights, values, W) {
  const n = weights.length
  const dp = Array.from({length: n+1}, () => new Array(W+1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      dp[i][w] = dp[i-1][w]
      if (weights[i-1] <= w)
        dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    }
  }
  return dp[n][W]
}`,
      },
      {
        name: 'Longest Common Subsequence (LCS)',
        time: 'O(m·n)', space: 'O(m·n)', stable: false, inplace: false,
        when: 'DNA sequence alignment. Diff tools. Edit distance variants.',
        idea: 'If chars match: LCS = 1 + LCS(i-1, j-1). Else: max(LCS(i-1,j), LCS(i,j-1)).',
        code: `function lcs(s1, s2) {
  const m = s1.length, n = s2.length
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
    }
  }
  return dp[m][n]
}`,
      },
      {
        name: 'Longest Increasing Subsequence (LIS)',
        time: 'O(n log n)', space: 'O(n)', stable: false, inplace: false,
        when: 'Stock profit maximization. Envelope nesting. Patience sorting.',
        idea: 'Maintain a "tails" array. Binary search to find where current element fits. Length of tails = LIS length.',
        code: `function lis(nums) {
  const tails = []
  for (const num of nums) {
    let lo = 0, hi = tails.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (tails[mid] < num) lo = mid + 1
      else hi = mid
    }
    tails[lo] = num
  }
  return tails.length
}`,
      },
      {
        name: 'Edit Distance (Levenshtein)',
        time: 'O(m·n)', space: 'O(m·n)', stable: false, inplace: false,
        when: 'Spell checkers. DNA mutation analysis. Autocorrect.',
        idea: 'Min cost to convert s1 to s2 using insert, delete, replace. Classic 2D DP.',
        code: `function editDistance(s1, s2) {
  const m = s1.length, n = s2.length
  const dp = Array.from({length: m+1}, (_, i) =>
    Array.from({length: n+1}, (_, j) => i || j)
  )
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1]
      else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    }
  return dp[m][n]
}`,
      },
      {
        name: 'Coin Change (Min Coins)',
        time: 'O(n·amount)', space: 'O(amount)', stable: false, inplace: false,
        when: 'Minimum number of coins. Currency exchange. Jump game variants.',
        idea: 'dp[i] = minimum coins to make amount i. For each coin, update dp[i] = min(dp[i], 1 + dp[i-coin]).',
        code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity)
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}`,
      },
    ],
  },
  {
    id: 'tree',
    title: 'Tree Algorithms',
    icon: '🌳',
    accent: '#8B5CF6',
    light: '#F5F3FF',
    dark: '#5B21B6',
    desc: 'Binary trees, BSTs, tries, and segment trees. Trees appear in 25%+ of all coding interviews.',
    algorithms: [
      {
        name: 'Inorder Traversal (DFS)',
        time: 'O(n)', space: 'O(h)', stable: true, inplace: false,
        when: 'BST sorted order. Finding kth smallest. Morris traversal.',
        idea: 'Left → Root → Right. For BST, this gives sorted ascending order.',
        code: `// Recursive
function inorder(root, result = []) {
  if (!root) return result
  inorder(root.left, result)
  result.push(root.val)
  inorder(root.right, result)
  return result
}
// Iterative
function inorderIter(root) {
  const result = [], stack = []
  let curr = root
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left }
    curr = stack.pop()
    result.push(curr.val)
    curr = curr.right
  }
  return result
}`,
      },
      {
        name: 'Level Order Traversal (BFS)',
        time: 'O(n)', space: 'O(w)', stable: true, inplace: false,
        when: 'Level-by-level processing. Zigzag traversal. Right side view.',
        idea: 'Use a queue. Process all nodes at current level before moving to next.',
        code: `function levelOrder(root) {
  if (!root) return []
  const queue = [root], result = []
  while (queue.length) {
    const levelSize = queue.length
    const level = []
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}`,
      },
      {
        name: 'Binary Search Tree Operations',
        time: 'O(h)', space: 'O(h)', stable: false, inplace: true,
        when: 'Ordered data with O(log n) insert/delete/search. Balanced BST = AVL/Red-Black.',
        idea: 'For insert/search: go left if < root, right if > root. Delete has 3 cases: leaf, one child, two children.',
        code: `function insert(root, val) {
  if (!root) return { val, left: null, right: null }
  if (val < root.val) root.left = insert(root.left, val)
  else root.right = insert(root.right, val)
  return root
}
function search(root, target) {
  if (!root || root.val === target) return root
  return target < root.val
    ? search(root.left, target)
    : search(root.right, target)
}`,
      },
      {
        name: 'Trie (Prefix Tree)',
        time: 'O(m) per op', space: 'O(m·n)', stable: false, inplace: false,
        when: 'Autocomplete. Spell check. Word search. IP routing. Common prefix problems.',
        idea: 'Each node represents a character. Path from root to isEnd=true node spells a word.',
        code: `class Trie {
  constructor() { this.root = {} }
  insert(word) {
    let node = this.root
    for (const c of word) {
      if (!node[c]) node[c] = {}
      node = node[c]
    }
    node.isEnd = true
  }
  search(word) {
    let node = this.root
    for (const c of word) {
      if (!node[c]) return false
      node = node[c]
    }
    return !!node.isEnd
  }
  startsWith(prefix) {
    let node = this.root
    for (const c of prefix) {
      if (!node[c]) return false
      node = node[c]
    }
    return true
  }
}`,
      },
      {
        name: 'Segment Tree',
        time: 'O(log n)', space: 'O(n)', stable: false, inplace: false,
        when: 'Range sum/min/max queries with point updates. Heavy competitive programming usage.',
        idea: 'Build complete binary tree. Leaf = array element. Internal node = aggregate of children.',
        code: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length
    this.tree = new Array(4 * this.n).fill(0)
    this.build(arr, 0, 0, this.n - 1)
  }
  build(arr, node, start, end) {
    if (start === end) { this.tree[node] = arr[start]; return }
    const mid = (start + end) >> 1
    this.build(arr, 2*node+1, start, mid)
    this.build(arr, 2*node+2, mid+1, end)
    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2]
  }
  query(node, start, end, l, r) {
    if (r < start || end < l) return 0
    if (l <= start && end <= r) return this.tree[node]
    const mid = (start + end) >> 1
    return this.query(2*node+1, start, mid, l, r)
         + this.query(2*node+2, mid+1, end, l, r)
  }
}`,
      },
    ],
  },
  {
    id: 'string',
    title: 'String Algorithms',
    icon: '🔤',
    accent: '#06B6D4',
    light: '#ECFEFF',
    dark: '#164E63',
    desc: 'Pattern matching, hashing, and string manipulation. Appear in every company\'s OA.',
    algorithms: [
      {
        name: 'KMP Pattern Matching',
        time: 'O(n + m)', space: 'O(m)', stable: true, inplace: false,
        when: 'Efficient exact pattern matching in a string. O(n·m) naive → O(n+m) with KMP.',
        idea: 'Build failure function (LPS array) to avoid re-comparing matched characters on mismatch.',
        code: `function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern)
  const result = []
  let i = 0, j = 0
  while (i < text.length) {
    if (text[i] === pattern[j]) { i++; j++ }
    if (j === pattern.length) {
      result.push(i - j); j = lps[j - 1]
    } else if (i < text.length && text[i] !== pattern[j]) {
      j > 0 ? j = lps[j - 1] : i++
    }
  }
  return result
}
function buildLPS(p) {
  const lps = [0]; let len = 0, i = 1
  while (i < p.length) {
    if (p[i] === p[len]) lps[i++] = ++len
    else len > 0 ? len = lps[len-1] : lps[i++] = 0
  }
  return lps
}`,
      },
      {
        name: 'Rabin-Karp Rolling Hash',
        time: 'O(n + m) avg', space: 'O(1)', stable: false, inplace: false,
        when: 'Multiple pattern matching. Plagiarism detection. Repeated DNA subsequences.',
        idea: 'Hash the pattern. Slide a window over text, recompute hash in O(1) using rolling hash formula.',
        code: `function rabinKarp(text, pattern) {
  const BASE = 31, MOD = 1e9 + 7
  const n = text.length, m = pattern.length
  let pHash = 0, tHash = 0, power = 1
  for (let i = 0; i < m; i++) {
    pHash = (pHash * BASE + pattern.charCodeAt(i)) % MOD
    tHash = (tHash * BASE + text.charCodeAt(i)) % MOD
    if (i > 0) power = power * BASE % MOD
  }
  const result = []
  for (let i = 0; i <= n - m; i++) {
    if (tHash === pHash && text.slice(i, i+m) === pattern)
      result.push(i)
    if (i < n - m) {
      tHash = (BASE * (tHash - text.charCodeAt(i) * power) + text.charCodeAt(i+m)) % MOD
      if (tHash < 0) tHash += MOD
    }
  }
  return result
}`,
      },
      {
        name: "Manacher's Algorithm",
        time: 'O(n)', space: 'O(n)', stable: true, inplace: false,
        when: 'Longest Palindromic Substring in O(n). The elegant linear-time solution.',
        idea: 'Expand palindromes using previously computed information to avoid redundant checks.',
        code: `function longestPalindrome(s) {
  const t = '#' + s.split('').join('#') + '#'
  const n = t.length, p = new Array(n).fill(0)
  let center = 0, right = 0
  for (let i = 0; i < n; i++) {
    if (i < right) p[i] = Math.min(right - i, p[2*center - i])
    while (i-p[i]-1 >= 0 && i+p[i]+1 < n && t[i-p[i]-1] === t[i+p[i]+1])
      p[i]++
    if (i + p[i] > right) { center = i; right = i + p[i] }
  }
  const maxLen = Math.max(...p)
  const idx = p.indexOf(maxLen)
  return s.slice((idx - maxLen) / 2, (idx + maxLen) / 2)
}`,
      },
    ],
  },
]

// ─── ALL QUESTIONS ────────────────────────────────────────────────────────

const ALL_QUESTIONS = [
  { id: 1, title: 'Two Sum', diff: 'Easy', cat: 'Arrays', lc: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/', pattern: 'Hash Map' },
  { id: 2, title: 'Add Two Numbers', diff: 'Medium', cat: 'Linked List', lc: 'https://leetcode.com/problems/add-two-numbers/', gfg: 'https://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/', pattern: 'Simulation' },
  { id: 3, title: 'Longest Substring Without Repeating', diff: 'Medium', cat: 'Strings', lc: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', gfg: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/', pattern: 'Sliding Window' },
  { id: 4, title: 'Median of Two Sorted Arrays', diff: 'Hard', cat: 'Binary Search', lc: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', gfg: 'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/', pattern: 'Binary Search' },
  { id: 5, title: 'Longest Palindromic Substring', diff: 'Medium', cat: 'Strings', lc: 'https://leetcode.com/problems/longest-palindromic-substring/', gfg: 'https://www.geeksforgeeks.org/longest-palindromic-substring/', pattern: 'Expand Around Center' },
  { id: 11, title: 'Container With Most Water', diff: 'Medium', cat: 'Arrays', lc: 'https://leetcode.com/problems/container-with-most-water/', gfg: 'https://www.geeksforgeeks.org/container-with-most-water/', pattern: 'Two Pointers' },
  { id: 15, title: '3Sum', diff: 'Medium', cat: 'Arrays', lc: 'https://leetcode.com/problems/3sum/', gfg: 'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/', pattern: 'Two Pointers' },
  { id: 17, title: 'Letter Combinations of Phone Number', diff: 'Medium', cat: 'Backtracking', lc: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', gfg: 'https://www.geeksforgeeks.org/find-possible-words-phone-digits/', pattern: 'Backtracking' },
  { id: 19, title: 'Remove Nth Node From End', diff: 'Medium', cat: 'Linked List', lc: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/', pattern: 'Fast & Slow Pointer' },
  { id: 20, title: 'Valid Parentheses', diff: 'Easy', cat: 'Stack', lc: 'https://leetcode.com/problems/valid-parentheses/', gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/', pattern: 'Stack' },
  { id: 21, title: 'Merge Two Sorted Lists', diff: 'Easy', cat: 'Linked List', lc: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/', pattern: 'Two Pointers' },
  { id: 23, title: 'Merge K Sorted Lists', diff: 'Hard', cat: 'Heap', lc: 'https://leetcode.com/problems/merge-k-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/', pattern: 'Min Heap' },
  { id: 33, title: 'Search in Rotated Sorted Array', diff: 'Medium', cat: 'Binary Search', lc: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/', pattern: 'Binary Search' },
  { id: 39, title: 'Combination Sum', diff: 'Medium', cat: 'Backtracking', lc: 'https://leetcode.com/problems/combination-sum/', gfg: 'https://www.geeksforgeeks.org/combinational-sum/', pattern: 'Backtracking' },
  { id: 42, title: 'Trapping Rain Water', diff: 'Hard', cat: 'Arrays', lc: 'https://leetcode.com/problems/trapping-rain-water/', gfg: 'https://www.geeksforgeeks.org/trapping-rain-water/', pattern: 'Two Pointers / Stack' },
  { id: 46, title: 'Permutations', diff: 'Medium', cat: 'Backtracking', lc: 'https://leetcode.com/problems/permutations/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/', pattern: 'Backtracking' },
  { id: 48, title: 'Rotate Image', diff: 'Medium', cat: 'Arrays', lc: 'https://leetcode.com/problems/rotate-image/', gfg: 'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/', pattern: 'In-Place Matrix' },
  { id: 49, title: 'Group Anagrams', diff: 'Medium', cat: 'Strings', lc: 'https://leetcode.com/problems/group-anagrams/', gfg: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/', pattern: 'Hash Map + Sort' },
  { id: 51, title: 'N-Queens', diff: 'Hard', cat: 'Backtracking', lc: 'https://leetcode.com/problems/n-queens/', gfg: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/', pattern: 'Backtracking' },
  { id: 53, title: 'Maximum Subarray', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/', pattern: "Kadane's" },
  { id: 56, title: 'Merge Intervals', diff: 'Medium', cat: 'Arrays', lc: 'https://leetcode.com/problems/merge-intervals/', gfg: 'https://www.geeksforgeeks.org/merging-intervals/', pattern: 'Sort + Greedy' },
  { id: 62, title: 'Unique Paths', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/unique-paths/', gfg: 'https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/', pattern: '2D DP' },
  { id: 70, title: 'Climbing Stairs', diff: 'Easy', cat: 'DP', lc: 'https://leetcode.com/problems/climbing-stairs/', gfg: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/', pattern: 'Fibonacci DP' },
  { id: 72, title: 'Edit Distance', diff: 'Hard', cat: 'DP', lc: 'https://leetcode.com/problems/edit-distance/', gfg: 'https://www.geeksforgeeks.org/edit-distance-dp-5/', pattern: '2D DP' },
  { id: 76, title: 'Minimum Window Substring', diff: 'Hard', cat: 'Strings', lc: 'https://leetcode.com/problems/minimum-window-substring/', gfg: 'https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/', pattern: 'Sliding Window' },
  { id: 78, title: 'Subsets', diff: 'Medium', cat: 'Backtracking', lc: 'https://leetcode.com/problems/subsets/', gfg: 'https://www.geeksforgeeks.org/power-set/', pattern: 'Backtracking / Bitmask' },
  { id: 84, title: 'Largest Rectangle in Histogram', diff: 'Hard', cat: 'Stack', lc: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', gfg: 'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/', pattern: 'Monotonic Stack' },
  { id: 98, title: 'Validate Binary Search Tree', diff: 'Medium', cat: 'Trees', lc: 'https://leetcode.com/problems/validate-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/', pattern: 'DFS with Bounds' },
  { id: 102, title: 'Binary Tree Level Order Traversal', diff: 'Medium', cat: 'Trees', lc: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfg: 'https://www.geeksforgeeks.org/level-order-tree-traversal/', pattern: 'BFS' },
  { id: 104, title: 'Maximum Depth of Binary Tree', diff: 'Easy', cat: 'Trees', lc: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/', pattern: 'DFS' },
  { id: 121, title: 'Best Time to Buy and Sell Stock', diff: 'Easy', cat: 'Arrays', lc: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/stock-buy-sell/', pattern: 'Greedy' },
  { id: 124, title: 'Binary Tree Maximum Path Sum', diff: 'Hard', cat: 'Trees', lc: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', gfg: 'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/', pattern: 'DFS with Global Max' },
  { id: 127, title: 'Word Ladder', diff: 'Hard', cat: 'Graphs', lc: 'https://leetcode.com/problems/word-ladder/', gfg: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/', pattern: 'BFS Shortest Path' },
  { id: 131, title: 'Palindrome Partitioning', diff: 'Medium', cat: 'Backtracking', lc: 'https://leetcode.com/problems/palindrome-partitioning/', gfg: 'https://www.geeksforgeeks.org/given-a-string-print-all-possible-palindromic-partition/', pattern: 'Backtracking + DP' },
  { id: 138, title: 'Copy List with Random Pointer', diff: 'Medium', cat: 'Linked List', lc: 'https://leetcode.com/problems/copy-list-with-random-pointer/', gfg: 'https://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/', pattern: 'HashMap' },
  { id: 139, title: 'Word Break', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/word-break/', gfg: 'https://www.geeksforgeeks.org/word-break-problem-dp-32/', pattern: 'DP + Trie' },
  { id: 141, title: 'Linked List Cycle', diff: 'Easy', cat: 'Linked List', lc: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/', pattern: "Floyd's Algorithm" },
  { id: 146, title: 'LRU Cache', diff: 'Medium', cat: 'Design', lc: 'https://leetcode.com/problems/lru-cache/', gfg: 'https://www.geeksforgeeks.org/lru-cache-implementation/', pattern: 'HashMap + DLL' },
  { id: 153, title: 'Find Minimum in Rotated Sorted Array', diff: 'Medium', cat: 'Binary Search', lc: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/', pattern: 'Binary Search' },
  { id: 155, title: 'Min Stack', diff: 'Medium', cat: 'Stack', lc: 'https://leetcode.com/problems/min-stack/', gfg: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/', pattern: 'Stack Augmentation' },
  { id: 162, title: 'Find Peak Element', diff: 'Medium', cat: 'Binary Search', lc: 'https://leetcode.com/problems/find-peak-element/', gfg: 'https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/', pattern: 'Binary Search' },
  { id: 198, title: 'House Robber', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/house-robber/', gfg: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/', pattern: 'Linear DP' },
  { id: 200, title: 'Number of Islands', diff: 'Medium', cat: 'Graphs', lc: 'https://leetcode.com/problems/number-of-islands/', gfg: 'https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/', pattern: 'DFS/BFS Grid' },
  { id: 206, title: 'Reverse Linked List', diff: 'Easy', cat: 'Linked List', lc: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', pattern: 'Iteration / Recursion' },
  { id: 207, title: 'Course Schedule', diff: 'Medium', cat: 'Graphs', lc: 'https://leetcode.com/problems/course-schedule/', gfg: 'https://www.geeksforgeeks.org/topological-sorting/', pattern: 'Topological Sort' },
  { id: 212, title: 'Word Search II', diff: 'Hard', cat: 'Backtracking', lc: 'https://leetcode.com/problems/word-search-ii/', gfg: 'https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/', pattern: 'Backtracking + Trie' },
  { id: 215, title: 'Kth Largest Element in Array', diff: 'Medium', cat: 'Heap', lc: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/', pattern: 'Min Heap / QuickSelect' },
  { id: 226, title: 'Invert Binary Tree', diff: 'Easy', cat: 'Trees', lc: 'https://leetcode.com/problems/invert-binary-tree/', gfg: 'https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/', pattern: 'DFS' },
  { id: 230, title: 'Kth Smallest in BST', diff: 'Medium', cat: 'Trees', lc: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/', pattern: 'Inorder DFS' },
  { id: 235, title: 'Lowest Common Ancestor BST', diff: 'Medium', cat: 'Trees', lc: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/', pattern: 'DFS' },
  { id: 238, title: 'Product of Array Except Self', diff: 'Medium', cat: 'Arrays', lc: 'https://leetcode.com/problems/product-of-array-except-self/', gfg: 'https://www.geeksforgeeks.org/product-array-puzzle/', pattern: 'Prefix Product' },
  { id: 239, title: 'Sliding Window Maximum', diff: 'Hard', cat: 'Stack', lc: 'https://leetcode.com/problems/sliding-window-maximum/', gfg: 'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/', pattern: 'Monotonic Deque' },
  { id: 295, title: 'Find Median from Data Stream', diff: 'Hard', cat: 'Heap', lc: 'https://leetcode.com/problems/find-median-from-data-stream/', gfg: 'https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/', pattern: 'Two Heaps' },
  { id: 297, title: 'Serialize and Deserialize BT', diff: 'Hard', cat: 'Trees', lc: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', gfg: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/', pattern: 'BFS / DFS' },
  { id: 300, title: 'Longest Increasing Subsequence', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/longest-increasing-subsequence/', gfg: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/', pattern: 'DP + Binary Search' },
  { id: 312, title: 'Burst Balloons', diff: 'Hard', cat: 'DP', lc: 'https://leetcode.com/problems/burst-balloons/', gfg: 'https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/', pattern: 'Interval DP' },
  { id: 322, title: 'Coin Change', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/coin-change/', gfg: 'https://www.geeksforgeeks.org/coin-change-dp-7/', pattern: 'Unbounded Knapsack' },
  { id: 347, title: 'Top K Frequent Elements', diff: 'Medium', cat: 'Heap', lc: 'https://leetcode.com/problems/top-k-frequent-elements/', gfg: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/', pattern: 'Max Heap / Bucket Sort' },
  { id: 394, title: 'Decode String', diff: 'Medium', cat: 'Stack', lc: 'https://leetcode.com/problems/decode-string/', gfg: 'https://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/', pattern: 'Stack' },
  { id: 416, title: 'Partition Equal Subset Sum', diff: 'Medium', cat: 'DP', lc: 'https://leetcode.com/problems/partition-equal-subset-sum/', gfg: 'https://www.geeksforgeeks.org/partition-problem-dp-18/', pattern: '0/1 Knapsack' },
  { id: 543, title: 'Diameter of Binary Tree', diff: 'Easy', cat: 'Trees', lc: 'https://leetcode.com/problems/diameter-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/diameter-of-a-binary-tree/', pattern: 'DFS' },
  { id: 621, title: 'Task Scheduler', diff: 'Medium', cat: 'Heap', lc: 'https://leetcode.com/problems/task-scheduler/', gfg: 'https://www.geeksforgeeks.org/task-scheduler/', pattern: 'Greedy + Heap' },
  { id: 704, title: 'Binary Search', diff: 'Easy', cat: 'Binary Search', lc: 'https://leetcode.com/problems/binary-search/', gfg: 'https://www.geeksforgeeks.org/binary-search/', pattern: 'Classic Binary Search' },
  { id: 739, title: 'Daily Temperatures', diff: 'Medium', cat: 'Stack', lc: 'https://leetcode.com/problems/daily-temperatures/', gfg: 'https://www.geeksforgeeks.org/next-greater-element/', pattern: 'Monotonic Stack' },
  { id: 875, title: 'Koko Eating Bananas', diff: 'Medium', cat: 'Binary Search', lc: 'https://leetcode.com/problems/koko-eating-bananas/', gfg: 'https://www.geeksforgeeks.org/koko-eating-bananas/', pattern: 'Binary Search on Answer' },
  { id: 973, title: 'K Closest Points to Origin', diff: 'Medium', cat: 'Heap', lc: 'https://leetcode.com/problems/k-closest-points-to-origin/', gfg: 'https://www.geeksforgeeks.org/find-k-closest-points-to-the-origin/', pattern: 'Max Heap' },
]

const CATEGORIES = ['All', ...new Set(ALL_QUESTIONS.map(q => q.cat))]
const DIFFS = ['All', 'Easy', 'Medium', 'Hard']

// ─── COMPLEXITY ───────────────────────────────────────────────────────────

const COMPLEXITIES = [
  { name: 'O(1)', label: 'Constant', color: '#10B981', bar: 4, examples: ['Array access by index', 'Hash map lookup', 'Stack push/pop', 'Math operations'] },
  { name: 'O(log n)', label: 'Logarithmic', color: '#3B82F6', bar: 14, examples: ['Binary Search', 'BST operations', 'Heap insert/delete', 'Finding exponent'] },
  { name: 'O(n)', label: 'Linear', color: '#8B5CF6', bar: 30, examples: ['Linear scan', 'BFS/DFS traversal', 'Building hash map', 'Single pass DP'] },
  { name: 'O(n log n)', label: 'Linearithmic', color: '#F59E0B', bar: 50, examples: ['Merge Sort', 'Quick Sort (avg)', 'Heap Sort', 'Building segment tree'] },
  { name: 'O(n²)', label: 'Quadratic', color: '#F97316', bar: 68, examples: ['Bubble/Selection/Insertion Sort', 'Naive string matching', '2-nested loops', 'Simple graph adj matrix'] },
  { name: 'O(2ⁿ)', label: 'Exponential', color: '#EF4444', bar: 83, examples: ['Fibonacci (no memo)', 'Subset generation', 'Naive TSP', 'All binary strings of length n'] },
  { name: 'O(n!)', label: 'Factorial', color: '#DC2626', bar: 96, examples: ['All permutations', 'Brute force TSP', 'Bogosort', 'Placing n queens naively'] },
]

const SPACE_COMPLEXITY = [
  { name: 'Arrays / Strings', time: 'O(n)', space: 'O(1)—O(n)', note: 'Most operations are O(1) space using two pointers' },
  { name: 'Recursion / DFS', time: 'O(n)', space: 'O(h)', note: 'h = height of recursion tree. O(n) worst case for skewed tree' },
  { name: 'Hash Map / Set', time: 'O(1) avg', space: 'O(n)', note: 'O(n/k) with k buckets. Worst case O(n) all keys hash to same bucket' },
  { name: 'DP (2D table)', time: 'O(n·m)', space: 'O(n·m) or O(n)', note: 'Can usually optimize space to O(n) using rolling array' },
  { name: 'BFS with Queue', time: 'O(V+E)', space: 'O(V)', note: 'Queue holds at most the width of the graph at peak' },
  { name: 'Sorting (in-place)', time: 'O(n log n)', space: 'O(log n)', note: 'O(log n) for Quick Sort call stack. Merge Sort needs O(n) extra' },
]

// ─── CORE CONCEPTS ────────────────────────────────────────────────────────

const CONCEPTS = [
  {
    title: 'Data Structures',
    icon: '🗂️',
    color: '#6366F1',
    items: [
      { name: 'Array', complexity: 'Access O(1) · Insert O(n) · Delete O(n)', use: 'Random access, contiguous memory, cache-friendly. Default choice for sequences.', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
      { name: 'Linked List', complexity: 'Access O(n) · Insert O(1) · Delete O(1)', use: 'Dynamic size, frequent insert/delete at known position. No random access.', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
      { name: 'Stack (LIFO)', complexity: 'Push O(1) · Pop O(1) · Peek O(1)', use: 'DFS, undo operations, balanced parentheses, monotonic stack patterns.', url: 'https://www.geeksforgeeks.org/stack-data-structure/' },
      { name: 'Queue (FIFO)', complexity: 'Enqueue O(1) · Dequeue O(1)', use: 'BFS, level-order traversal, task scheduling, sliding window with deque.', url: 'https://www.geeksforgeeks.org/queue-data-structure/' },
      { name: 'Hash Map / Hash Set', complexity: 'Insert O(1) · Delete O(1) · Lookup O(1)', use: 'Frequency counting, memoization, two-sum, anagram detection. Most powerful DS in interviews.', url: 'https://www.geeksforgeeks.org/hashing-data-structure/' },
      { name: 'Binary Heap', complexity: 'Insert O(log n) · ExtractMin O(log n) · Peek O(1)', use: 'Priority queues, Top-K problems, Dijkstra, median from stream (two heaps).', url: 'https://www.geeksforgeeks.org/binary-heap/' },
      { name: 'Binary Search Tree', complexity: 'Insert O(h) · Delete O(h) · Search O(h)', use: 'Ordered data, range queries. Balanced BST (AVL/Red-Black) guarantees O(log n).', url: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/' },
      { name: 'Trie (Prefix Tree)', complexity: 'Insert O(m) · Search O(m)', use: 'Autocomplete, spell check, word search, IP routing tables.', url: 'https://www.geeksforgeeks.org/trie-insert-and-search/' },
      { name: 'Graph (Adjacency List)', complexity: 'Space O(V+E) · AddEdge O(1)', use: 'Social networks, maps, dependencies, web crawling. Most flexible DS.', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
      { name: 'Segment Tree', complexity: 'Build O(n) · Query O(log n) · Update O(log n)', use: 'Range sum/min/max queries with point updates. Heavy CP usage.', url: 'https://www.geeksforgeeks.org/segment-tree-data-structure/' },
    ],
  },
  {
    title: 'Problem-Solving Paradigms',
    icon: '🧩',
    color: '#F59E0B',
    items: [
      { name: 'Brute Force', complexity: 'Usually O(n²) to O(n!)', use: 'Always start here. Enumerate all possibilities. Then optimize.', url: 'https://www.geeksforgeeks.org/brute-force-approach-and-its-pros-and-cons/' },
      { name: 'Greedy', complexity: 'Problem-specific, often O(n log n)', use: 'Locally optimal choices lead to globally optimal solution. Interval scheduling, Huffman encoding, Dijkstra.', url: 'https://www.geeksforgeeks.org/greedy-algorithms/' },
      { name: 'Divide & Conquer', complexity: 'O(n log n) for most', use: 'Divide problem into subproblems, solve independently, combine. Merge Sort, Binary Search, FFT.', url: 'https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/' },
      { name: 'Dynamic Programming', complexity: 'O(n²) to O(n·m) typical', use: 'Optimal substructure + overlapping subproblems. Most powerful and most asked in FAANG.', url: 'https://www.geeksforgeeks.org/dynamic-programming/' },
      { name: 'Backtracking', complexity: 'O(b^d) where b=branching, d=depth', use: 'Constraint satisfaction, find all solutions. Prune invalid branches early.', url: 'https://www.geeksforgeeks.org/backtracking-algorithms/' },
      { name: 'Two Pointers', complexity: 'O(n)', use: 'Sorted arrays, pair finding, palindrome, removing duplicates in-place.', url: 'https://www.geeksforgeeks.org/two-pointers-technique/' },
      { name: 'Sliding Window', complexity: 'O(n)', use: 'Contiguous subarray/substring problems. Fixed or variable window size.', url: 'https://www.geeksforgeeks.org/window-sliding-technique/' },
      { name: 'Binary Search on Answer', complexity: 'O(n log n)', use: 'Minimize the maximum / Maximize the minimum. Define feasibility function, binary search on answer space.', url: 'https://www.geeksforgeeks.org/binary-search-on-the-answer/' },
    ],
  },
]

// ─── PRO TIPS ─────────────────────────────────────────────────────────────

const TIPS = [
  {
    category: 'Before You Code',
    icon: '🧠',
    color: '#6366F1',
    tips: [
      { title: 'Read the full problem twice', body: 'Most bugs come from misunderstood requirements. Circle edge cases mentally before touching the keyboard.' },
      { title: 'Clarify constraints first', body: 'Is the array sorted? Can there be duplicates? What\'s the value range of n? Constraints reveal the expected time complexity.' },
      { title: 'Work out examples by hand', body: 'Before coding, trace through 2-3 examples manually. Draw it out. This validates your approach without wasted code.' },
      { title: 'State the brute force out loud', body: 'Always mention the naive O(n²) approach. Interviewers want to see your thinking process, then improvement.' },
    ],
  },
  {
    category: 'Identifying Patterns',
    icon: '🎯',
    color: '#10B981',
    tips: [
      { title: 'Constraint → Complexity mapping', body: 'n ≤ 10: O(n!). n ≤ 20: O(2ⁿ). n ≤ 500: O(n²). n ≤ 10⁶: O(n log n). n ≤ 10⁸: O(n). Use constraints to reverse-engineer expected approach.' },
      { title: '"K largest/smallest" → Heap', body: 'Whenever you see Top-K problems, think heap immediately. Min-heap for K largest, max-heap for K smallest.' },
      { title: '"Shortest path" → BFS or Dijkstra', body: 'Unweighted graph → BFS. Non-negative weighted → Dijkstra. Negative weights → Bellman-Ford.' },
      { title: '"All combinations/permutations" → Backtracking', body: 'If you need to enumerate all solutions, backtracking is the systematic approach. Always add pruning.' },
      { title: '"Optimal substructure" → DP', body: 'If "what is the best way to reach state X using states Y and Z?" then it\'s DP. Define state, recurrence, base case.' },
    ],
  },
  {
    category: 'Writing Clean Code',
    icon: '✨',
    color: '#F59E0B',
    tips: [
      { title: 'Name variables meaningfully', body: 'Use left/right not l/r. Use windowStart not i. Interviewers read your variable names as part of the solution.' },
      { title: 'Handle edge cases explicitly', body: 'Empty input, single element, negative numbers, overflow — state them and handle them. It shows maturity.' },
      { title: 'Comment your "why", not your "what"', body: 'Don\'t write "increment i". Write "// skip duplicates to avoid counting same triplet twice". Comment the non-obvious.' },
      { title: 'Think before optimizing', body: 'Write correct code first. Then optimize. A correct O(n²) beats a buggy O(n log n) in any interview.' },
    ],
  },
  {
    category: 'Interview Communication',
    icon: '🗣️',
    color: '#EF4444',
    tips: [
      { title: 'Think out loud — always', body: 'Interviewers are evaluating your thought process, not just the final answer. A wrong answer with good reasoning > a correct answer in silence.' },
      { title: 'State the time and space complexity', body: 'After solving, immediately state complexity. "This is O(n log n) time and O(n) space because..." — unprompted. Always.' },
      { title: 'Test your own code', body: 'Dry run your solution with the provided examples AND your own edge cases. Catch bugs before the interviewer does.' },
      { title: 'Ask for feedback', body: 'At the end, ask: "Is there anything you\'d like me to optimize further?" This shows confidence and collaborative spirit.' },
    ],
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────

const diffStyle = (d) =>
  d === 'Easy' ? { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' } :
    d === 'Medium' ? { bg: '#FEFCE8', color: '#A16207', border: '#FEF08A' } :
      { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3' }

// ─── COMPONENT ────────────────────────────────────────────────────────────

const DSACoding = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('algorithms')
  const [openAlgo, setOpenAlgo] = useState(null)
  const [openAlgoItem, setOpenAlgoItem] = useState(null)
  const [catFilter, setCatFilter] = useState('All')
  const [diffFilter, setDiffFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [openConcept, setOpenConcept] = useState(null)

  const filteredQ = ALL_QUESTIONS.filter(q => {
    const matchCat = catFilter === 'All' || q.cat === catFilter
    const matchDiff = diffFilter === 'All' || q.diff === diffFilter
    const matchSrch = q.title.toLowerCase().includes(search.toLowerCase()) || q.pattern.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchDiff && matchSrch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#E8E8F0' }}>

      {/* ── GLOBAL STYLE ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .glow-indigo { box-shadow: 0 0 0 1px #6366F130, 0 4px 24px #6366F115; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.12); }
        .chip { display:inline-flex; align-items:center; border-radius:6px; font-size:11px; font-weight:600; padding:3px 8px; }
        .tab-btn { background:none; border:none; cursor:pointer; transition:all 0.15s; font-family:inherit; }
        .code-block { font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.7; color: #A5F3FC; background: #0D1117; border-radius: 12px; padding: 18px; overflow-x: auto; white-space: pre; }
        .algo-item-btn { width:100%; border:none; cursor:pointer; font-family:inherit; text-align:left; transition:background 0.15s; }
        a { text-decoration: none; }
        input { font-family: inherit; }
        table { border-collapse: collapse; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          background: "#0F172A",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #1E293B",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* LOGO (always visible) */}
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            style={{
              height: 50,
              cursor: "pointer",
              borderRadius: 2,
            }}
          />

          {/* NAV ITEMS */}
          <div
            className="navItems"
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className="btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: tab === n.id ? "#fff" : "#94A3B8",
                  background: tab === n.id ? "#6366F1" : "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* CSS */}
        <style>{`
    @media (max-width: 768px) {
      .navItems {
        display: none !important;
      }
    }
  `}</style>
      </nav>

      {/* ── HERO ── */}
      <header style={{ background: 'linear-gradient(135deg, #0D0D1F 0%, #111130 50%, #0D1520 100%)', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 40%, #6366F120 0%, transparent 50%), radial-gradient(circle at 80% 60%, #06B6D415 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#6366F115', border: '1px solid #6366F130', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#A5B4FC', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Complete DSA Reference & Coding Guide</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg, #E8E8FF 0%, #A5B4FC 50%, #67E8F9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DSA Coding
          </h1>
          <p style={{ fontSize: 18, color: '#6B7280', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Every algorithm with code. Every question linked to LeetCode & GFG. Big-O guide, data structures, and interview strategies — all in one premium reference.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
            {[['40+', 'Algorithms with Code'], ['65+', 'Questions Linked'], ['6', 'Algorithm Categories'], ['10+', 'Data Structures']].map(([val, lbl]) => (
              <div key={lbl} style={{ background: '#111120', border: '1px solid #1E1E35', borderRadius: 12, padding: '16px 24px', textAlign: 'center', minWidth: 130 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: '#818CF8' }}>{val}</div>
                <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} className="tab-btn"
                style={{ padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: tab === n.id ? '#fff' : '#6B7280', background: tab === n.id ? '#6366F1' : '#111120', border: `1px solid ${tab === n.id ? '#6366F1' : '#1E1E35'}` }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── STICKY TABS ── */}
      <div style={{ background: '#0D0D15', borderBottom: '1px solid #1A1A2E', position: 'sticky', top: 60, zIndex: 40 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '10px 24px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className="tab-btn"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', color: tab === n.id ? '#fff' : '#4B5563', background: tab === n.id ? '#6366F1' : '#111120', border: `1px solid ${tab === n.id ? '#6366F1' : '#1E1E35'}` }}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px' }}>

        {/* ══════ ALGORITHMS ══════ */}
        {tab === 'algorithms' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#E8E8FF', marginBottom: 10 }}>⚙️ Algorithm Library</h2>
              <p style={{ color: '#4B5563', fontSize: 16 }}>Every major algorithm with implementation code, complexity analysis, and when to use it.</p>
            </div>

            {/* Category Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 32 }}>
              {ALGORITHMS.map((cat, i) => (
                <button key={i} onClick={() => { setOpenAlgo(openAlgo === i ? null : i); setOpenAlgoItem(null) }} className="tab-btn card-hover"
                  style={{ background: openAlgo === i ? `${cat.accent}18` : '#111120', border: `1px solid ${openAlgo === i ? cat.accent + '60' : '#1E1E35'}`, borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: openAlgo === i ? cat.accent : '#9CA3AF' }}>{cat.title}</div>
                  <div style={{ fontSize: 11, color: '#374151', marginTop: 4 }}>{cat.algorithms.length} algorithms</div>
                </button>
              ))}
            </div>

            {/* Open Category */}
            {openAlgo !== null && (() => {
              const cat = ALGORITHMS[openAlgo]
              return (
                <div style={{ background: '#0D0D1A', border: `1px solid ${cat.accent}30`, borderRadius: 20, overflow: 'hidden', marginBottom: 32 }}>
                  <div style={{ background: `linear-gradient(135deg, ${cat.accent}15, transparent)`, padding: '24px 28px', borderBottom: `1px solid ${cat.accent}20` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cat.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{cat.icon}</div>
                      <div>
                        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: cat.accent }}>{cat.title}</h3>
                        <p style={{ color: '#6B7280', fontSize: 14, marginTop: 2 }}>{cat.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cat.algorithms.map((algo, j) => {
                      const isOpen = openAlgoItem === `${openAlgo}-${j}`
                      return (
                        <div key={j} style={{ border: `1px solid ${isOpen ? cat.accent + '40' : '#1A1A2A'}`, borderRadius: 14, overflow: 'hidden', background: isOpen ? `${cat.accent}06` : '#0A0A12' }}>
                          <button className="algo-item-btn" onClick={() => setOpenAlgoItem(isOpen ? null : `${openAlgo}-${j}`)}
                            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, background: 'transparent' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#E8E8FF', marginBottom: 4 }}>{algo.name}</div>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                <span className="chip" style={{ background: '#1A1A2A', color: '#818CF8' }}>⏱ {algo.time}</span>
                                <span className="chip" style={{ background: '#1A1A2A', color: '#34D399' }}>💾 {algo.space}</span>
                                {algo.stable && <span className="chip" style={{ background: '#064E3B', color: '#6EE7B7' }}>Stable</span>}
                                {algo.inplace && <span className="chip" style={{ background: '#1E1B4B', color: '#A5B4FC' }}>In-place</span>}
                              </div>
                            </div>
                            <span style={{ color: '#374151', fontSize: 18, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                          </button>

                          {isOpen && (
                            <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 }}>
                              <div>
                                <div style={{ background: `${cat.accent}10`, border: `1px solid ${cat.accent}25`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
                                  <p style={{ fontSize: 11, fontWeight: 700, color: cat.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Core Idea</p>
                                  <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7 }}>{algo.idea}</p>
                                </div>
                                <div style={{ background: '#0D1117', border: '1px solid #1E2A3A', borderRadius: 12, padding: 16 }}>
                                  <p style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>When to Use</p>
                                  <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7 }}>{algo.when}</p>
                                </div>
                              </div>
                              <div>
                                <p style={{ fontSize: 11, fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>JavaScript Implementation</p>
                                <pre className="code-block">{algo.code}</pre>
                              </div>
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

        {/* ══════ ALL QUESTIONS ══════ */}
        {tab === 'questions' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#E8E8FF', marginBottom: 10 }}>📌 All DSA Questions</h2>
              <p style={{ color: '#4B5563', fontSize: 16 }}>Every question linked directly to LeetCode and GFG. Filter by category, difficulty, or search by name.</p>
            </div>

            {/* Filters */}
            <div style={{ background: '#0D0D1A', border: '1px solid #1A1A2E', borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search problems or patterns..."
                style={{ flex: 1, minWidth: 200, background: '#060610', border: '1px solid #1E1E35', borderRadius: 10, padding: '10px 14px', color: '#E8E8FF', fontSize: 14, outline: 'none' }}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {DIFFS.map(d => {
                  const s = d !== 'All' ? diffStyle(d) : null
                  return (
                    <button key={d} onClick={() => setDiffFilter(d)} className="tab-btn"
                      style={{ padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: diffFilter === d ? (s ? s.bg : '#6366F120') : '#0A0A12', color: diffFilter === d ? (s ? s.color : '#818CF8') : '#4B5563', border: `1px solid ${diffFilter === d ? (s ? s.border : '#6366F150') : '#1A1A2A'}` }}>
                      {d}
                    </button>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CATEGORIES.slice(0, 8).map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} className="tab-btn"
                    style={{ padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: catFilter === c ? '#6366F120' : '#0A0A12', color: catFilter === c ? '#818CF8' : '#4B5563', border: `1px solid ${catFilter === c ? '#6366F150' : '#1A1A2A'}` }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ color: '#4B5563', fontSize: 13, marginBottom: 12 }}>Showing {filteredQ.length} of {ALL_QUESTIONS.length} problems</div>

            {/* Table */}
            <div style={{ background: '#0A0A12', border: '1px solid #1A1A2A', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr style={{ background: '#0D0D1A', borderBottom: '1px solid #1A1A2A' }}>
                      {['#', 'Problem', 'Category', 'Pattern', 'Difficulty', 'Solve On'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQ.map((q, i) => {
                      const ds = diffStyle(q.diff)
                      return (
                        <tr key={q.id} style={{ borderBottom: '1px solid #0F0F1A', transition: 'background 0.1s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#0D0D1E'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <td style={{ padding: '14px 16px', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#374151' }}>{q.id}</td>
                          <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#D1D5DB' }}>{q.title}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="chip" style={{ background: '#111120', color: '#818CF8', border: '1px solid #1E1E35' }}>{q.cat}</span>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: 12, color: '#4B5563', fontStyle: 'italic' }}>{q.pattern}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="chip" style={{ background: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>{q.diff}</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <a href={q.lc} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#1C1207', border: '1px solid #78350F50', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: '#FB923C' }}>
                                LC ↗
                              </a>
                              <a href={q.gfg} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#052E16', border: '1px solid #16653050', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: '#4ADE80' }}>
                                GFG ↗
                              </a>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              {[['Easy', '#15803D', '#F0FDF4'], ['Medium', '#A16207', '#FEFCE8'], ['Hard', '#BE123C', '#FFF1F2']].map(([d, tc, bg]) => (
                <div key={d} style={{ background: '#0A0A12', border: '1px solid #1A1A2A', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#4B5563' }}>{d}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, color: tc }}>
                    {ALL_QUESTIONS.filter(q => q.diff === d).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ BIG-O GUIDE ══════ */}
        {tab === 'complexity' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#E8E8FF', marginBottom: 10 }}>📐 Big-O Complexity Guide</h2>
              <p style={{ color: '#4B5563', fontSize: 16 }}>Visual complexity spectrum with real algorithm examples.</p>
            </div>

            {/* Complexity Spectrum */}
            <div style={{ background: '#0A0A12', border: '1px solid #1A1A2A', borderRadius: 20, padding: 32, marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>Time Complexity Spectrum — Fastest → Slowest</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {COMPLEXITIES.map((c, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 200px', gap: 16, alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 600, color: c.color }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: '#374151' }}>{c.label}</div>
                    </div>
                    <div style={{ background: '#0D0D1A', borderRadius: 999, height: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${c.bar}%`, background: c.color, borderRadius: 999, opacity: 0.85 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.examples.slice(0, 2).map((ex, j) => (
                        <span key={j} className="chip" style={{ background: `${c.color}15`, color: c.color, fontSize: 10 }}>{ex}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraint → Complexity Table */}
            <div style={{ background: '#0A0A12', border: '1px solid #1A1A2A', borderRadius: 20, padding: 28, marginBottom: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: '#E8E8FF', marginBottom: 6 }}>🎯 Constraint → Expected Complexity</h3>
              <p style={{ color: '#4B5563', fontSize: 13, marginBottom: 20 }}>Use the input size constraint to reverse-engineer the expected algorithm complexity.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  { n: 'n ≤ 10', complexity: 'O(n!)', color: '#DC2626', algo: 'Brute force permutations, TSP' },
                  { n: 'n ≤ 20', complexity: 'O(2ⁿ)', color: '#EF4444', algo: 'Bitmask DP, subset enumeration' },
                  { n: 'n ≤ 100', complexity: 'O(n³)', color: '#F97316', algo: 'Floyd-Warshall, 3-nested loops' },
                  { n: 'n ≤ 1,000', complexity: 'O(n²)', color: '#F59E0B', algo: 'Bubble/Insertion Sort, simple DP' },
                  { n: 'n ≤ 100,000', complexity: 'O(n log n)', color: '#10B981', algo: 'Merge Sort, Binary Search + scan' },
                  { n: 'n ≤ 10,000,000', complexity: 'O(n)', color: '#3B82F6', algo: 'Hash map, linear scan, BFS/DFS' },
                  { n: 'Any n', complexity: 'O(log n)', color: '#8B5CF6', algo: 'Pure Binary Search, Segment tree ops' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0D0D1A', border: `1px solid ${item.color}25`, borderRadius: 12, padding: 16 }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: '#6B7280', marginBottom: 4 }}>{item.n}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.complexity}</div>
                    <div style={{ fontSize: 12, color: '#4B5563' }}>{item.algo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Complexity */}
            <div style={{ background: '#0A0A12', border: '1px solid #1A1A2A', borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: '#E8E8FF', marginBottom: 20 }}>💾 Space Complexity by Algorithm Type</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1A1A2A' }}>
                      {['Algorithm Type', 'Time', 'Space', 'Note'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SPACE_COMPLEXITY.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #0F0F18' }}>
                        <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#D1D5DB' }}>{row.name}</td>
                        <td style={{ padding: '14px 16px' }}><span className="chip" style={{ background: '#1E1B4B', color: '#A5B4FC' }}>{row.time}</span></td>
                        <td style={{ padding: '14px 16px' }}><span className="chip" style={{ background: '#064E3B', color: '#6EE7B7' }}>{row.space}</span></td>
                        <td style={{ padding: '14px 16px', fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════ CORE CONCEPTS ══════ */}
        {tab === 'concepts' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#E8E8FF', marginBottom: 10 }}>🧩 Core Concepts</h2>
              <p style={{ color: '#4B5563', fontSize: 16 }}>Data structures and problem-solving paradigms with complexity and when-to-use guidance.</p>
            </div>

            {CONCEPTS.map((section, si) => (
              <div key={si} style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${section.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{section.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: section.color }}>{section.title}</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
                  {section.items.map((item, ii) => {
                    const isOpen = openConcept === `${si}-${ii}`
                    return (
                      <div key={ii} className="card-hover" style={{ background: '#0A0A12', border: `1px solid ${isOpen ? section.color + '40' : '#1A1A2A'}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => setOpenConcept(isOpen ? null : `${si}-${ii}`)}>
                        <div style={{ padding: '16px 18px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#E8E8FF' }}>{item.name}</h4>
                            <span style={{ color: '#374151', fontSize: 14, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 8 }}>▼</span>
                          </div>
                          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: section.color, background: `${section.color}12`, borderRadius: 6, padding: '4px 8px', display: 'inline-block', marginBottom: 10 }}>{item.complexity}</div>
                          {isOpen && (
                            <div>
                              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{item.use}</p>
                              <a href={item.url} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#052E16', border: '1px solid #16653040', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#4ADE80' }}>
                                Deep Dive on GFG ↗
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════ PRO TIPS ══════ */}
        {tab === 'tips' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#E8E8FF', marginBottom: 10 }}>💎 Pro Tips & Strategy</h2>
              <p style={{ color: '#4B5563', fontSize: 16 }}>Hard-won wisdom from FAANG interviews. Read once, internalize forever.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 20 }}>
              {TIPS.map((section, si) => (
                <div key={si} style={{ background: '#0A0A12', border: `1px solid ${section.color}25`, borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ background: `linear-gradient(135deg, ${section.color}15, transparent)`, padding: '20px 24px', borderBottom: `1px solid ${section.color}20`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${section.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{section.icon}</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: section.color }}>{section.category}</h3>
                  </div>
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {section.tips.map((tip, ti) => (
                      <div key={ti} style={{ display: 'flex', gap: 14, padding: 16, background: '#0D0D1A', borderRadius: 12, border: '1px solid #1A1A2A' }}>
                        <div style={{ width: 6, borderRadius: 999, background: section.color, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#D1D5DB', marginBottom: 6 }}>{tip.title}</div>
                          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{tip.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Final Cheat Sheet */}
            <div style={{ marginTop: 32, background: '#0A0A12', border: '1px solid #1A2A1A', borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: '#4ADE80', marginBottom: 20 }}>⚡ Interview Day Cheat Sheet</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {[
                  { label: 'Read → Clarify → Example', detail: 'Before writing a single line of code' },
                  { label: 'State Brute Force First', detail: 'Then explain your optimization approach' },
                  { label: 'Think Out Loud Always', detail: 'Silent coding is a red flag for interviewers' },
                  { label: 'Code Clean & Named', detail: 'Variable names signal engineering maturity' },
                  { label: 'State Complexity After', detail: '"This is O(n log n) time, O(n) space because..."' },
                  { label: 'Test With Edge Cases', detail: 'Empty input, single element, negatives, overflow' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0D1A0D', border: '1px solid #16532520', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4ADE80', fontWeight: 700, flexShrink: 0, fontSize: 16 }}>✓</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#D1D5DB' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#4B5563', marginTop: 3 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#060609', borderTop: '1px solid #1A1A2E', padding: '40px 24px', marginTop: 40, }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: '#818CF8', marginBottom: 8 }}>DSA Mastery Hub</div>
          <p style={{ fontSize: 13, color: '#374151', marginBottom: 16 }}>Every algorithm. Every pattern. Every question — linked and ready.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            {NAV.map(n => <span key={n.id} style={{ fontSize: 12, color: '#1F2937' }}>{n.icon} {n.label}</span>)}
          </div>
          <p style={{ fontSize: 11, color: '#111827', borderTop: '1px solid #111120', paddingTop: 16 }}>
            © 2026 aiplacprep@gmail.com — Built for engineers aiming at FAANG and top tech companies.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default DSACoding