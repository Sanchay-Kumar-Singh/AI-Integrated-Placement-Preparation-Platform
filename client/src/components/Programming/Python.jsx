import React, { useState } from 'react'
import logo from "../../assets/image.png";
import { useNavigate } from 'react-router-dom'

// ─── DATA ─────────────────────────────────────────────────────────────────

const navSections = [
  { id: 'overview', label: 'Overview', icon: '🗺️' },
  { id: 'basics', label: 'Python Basics', icon: '📝' },
  { id: 'oop', label: 'OOP & Classes', icon: '🏗️' },
  { id: 'datastructures', label: 'Data Structures', icon: '📊' },
  { id: 'libraries', label: 'Popular Libraries', icon: '📚' },
  { id: 'advanced', label: 'Advanced Topics', icon: '🚀' },
  { id: 'practice', label: 'Practice Problems', icon: '💪' },
  { id: 'resources', label: 'Resources', icon: '🎓' },
]

const learningStages = [
  { step: '01', title: 'Getting Started', icon: '🌱', color: '#3B82F6', desc: 'Install Python 3.x, set up IDE (VS Code, PyCharm), write your first program, understand REPL.', duration: 'Week 1-2', tips: ['Install Python 3.12+ from python.org', 'Learn pip for package management', 'Set up virtual environments'] },
  { step: '02', title: 'Master the Basics', icon: '📝', color: '#8B5CF6', desc: 'Variables, data types, operators, strings, lists, tuples, dictionaries, control flow, functions.', duration: 'Week 3-4', tips: ['Practice with interactive Python shell', 'Understand mutable vs immutable', 'Master list comprehensions'] },
  { step: '03', title: 'Object-Oriented Python', icon: '🏗️', color: '#10B981', desc: 'Classes, objects, inheritance, polymorphism, encapsulation, magic methods, decorators.', duration: 'Week 5-6', tips: ['Build real classes for practice', 'Understand __init__ and self', 'Learn special methods (__str__, __repr__)'] },
  { step: '04', title: 'Data Structures & Algorithms', icon: '📊', color: '#F59E0B', desc: 'Built-in data structures, collections module, implementing custom DS, algorithmic thinking.', duration: 'Week 7-8', tips: ['Master collections (deque, Counter, defaultdict)', 'Solve LeetCode problems in Python', 'Understand time/space complexity'] },
  { step: '05', title: 'Libraries & Frameworks', icon: '📚', color: '#EF4444', desc: 'NumPy, Pandas, Matplotlib, Web (Flask/Django), APIs, file I/O, database connectivity.', duration: 'Week 9-12', tips: ['Start with NumPy and Pandas for data', 'Build a Flask REST API', 'Learn to read documentation'] },
  { step: '06', title: 'Projects & Specialization', icon: '🏆', color: '#06B6D4', desc: 'Choose path: Web Dev, Data Science, Automation, ML/AI. Build portfolio projects.', duration: 'Week 13-16', tips: ['Build 3-5 real projects', 'Contribute to open source', 'Deploy projects on Heroku/Vercel'] },
]

const pythonBasicsTopics = [
  {
    category: 'Syntax & Basics',
    icon: '📝',
    color: '#3B82F6',
    importance: 'Fundamental',
    topics: ['Variables', 'Data Types (int, float, str, bool)', 'Type Conversion', 'Input/Output', 'Comments', 'Indentation'],
    concepts: [
      { name: 'Hello World', code: `print("Hello, World!")\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")` },
      { name: 'F-strings (Python 3.6+)', code: `name = "Alice"\nage = 25\nprint(f"{name} is {age} years old")` },
      { name: 'Multiple Assignment', code: `x, y, z = 1, 2, 3\na = b = c = 0` },
    ],
    tip: 'Python uses indentation (4 spaces) instead of braces. Consistency is crucial!',
  },
  {
    category: 'Data Structures',
    icon: '📊',
    color: '#10B981',
    importance: 'Fundamental',
    topics: ['Lists', 'Tuples', 'Sets', 'Dictionaries', 'List Comprehensions', 'Dictionary Comprehensions'],
    concepts: [
      { name: 'List Operations', code: `fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nfruits[0] = "mango"\nprint(fruits[-1])  # Last element` },
      { name: 'List Comprehension', code: `squares = [x**2 for x in range(10)]\neven = [x for x in range(20) if x % 2 == 0]` },
      { name: 'Dictionary', code: `person = {"name": "John", "age": 30}\nprint(person.get("name"))\nperson["city"] = "NYC"` },
    ],
    tip: 'Lists are mutable, tuples are immutable. Use tuples for fixed data, lists for dynamic.',
  },
  {
    category: 'Control Flow',
    icon: '🔀',
    color: '#8B5CF6',
    importance: 'Fundamental',
    topics: ['if-elif-else', 'for loop', 'while loop', 'break & continue', 'pass', 'Ternary Operator'],
    concepts: [
      { name: 'For Loop with enumerate', code: `fruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")` },
      { name: 'Ternary Operator', code: `age = 18\nstatus = "adult" if age >= 18 else "minor"` },
      { name: 'while with else', code: `n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nelse:\n    print("Done!")` },
    ],
    tip: 'Python\'s for-else and while-else execute the else block if loop completes normally (no break).',
  },
  {
    category: 'Functions',
    icon: '⚙️',
    color: '#F59E0B',
    importance: 'Fundamental',
    topics: ['Function Definition', '*args & **kwargs', 'Lambda Functions', 'Map, Filter, Reduce', 'Decorators', 'Generators'],
    concepts: [
      { name: 'Function with defaults', code: `def greet(name, msg="Hello"):\n    return f"{msg}, {name}!"\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))` },
      { name: 'Lambda & Map', code: `square = lambda x: x**2\nnums = [1, 2, 3, 4, 5]\nsquares = list(map(square, nums))` },
      { name: 'Generator', code: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b` },
    ],
    tip: 'Use generators (yield) for memory-efficient iteration over large datasets!',
  },
]

const oopTopics = [
  {
    category: 'Classes & Objects',
    icon: '🏗️',
    color: '#3B82F6',
    importance: 'Core',
    topics: ['Class Definition', '__init__ Method', 'Instance vs Class Variables', 'Methods', 'self Parameter'],
    code: `class Dog:\n    species = "Canis familiaris"  # Class variable\n    \n    def __init__(self, name, age):\n        self.name = name  # Instance variable\n        self.age = age\n    \n    def bark(self):\n        return f"{self.name} says Woof!"\n\ndog1 = Dog("Buddy", 3)\nprint(dog1.bark())`,
    tip: 'self is the first parameter of every instance method - it refers to the instance itself.',
  },
  {
    category: 'Inheritance',
    icon: '🧬',
    color: '#10B981',
    importance: 'Core',
    topics: ['Single Inheritance', 'Multiple Inheritance', 'super() Function', 'Method Overriding', 'MRO (Method Resolution Order)'],
    code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} barks"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} meows"\n\ndog = Dog("Buddy")\nprint(dog.speak())`,
    tip: 'Use super() to call parent class methods. Check MRO with ClassName.__mro__',
  },
  {
    category: 'Magic Methods',
    icon: '✨',
    color: '#8B5CF6',
    importance: 'Advanced',
    topics: ['__str__ & __repr__', '__len__', '__getitem__', '__add__', '__eq__', '__call__'],
    code: `class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n    \n    def __str__(self):\n        return f"{self.title} ({self.pages} pages)"\n    \n    def __len__(self):\n        return self.pages\n    \n    def __add__(self, other):\n        return self.pages + other.pages\n\nbook = Book("Python 101", 300)\nprint(str(book))\nprint(len(book))`,
    tip: '__str__ is for human-readable output, __repr__ is for developers (debugging).',
  },
  {
    category: 'Decorators & Properties',
    icon: '🎨',
    color: '#F59E0B',
    importance: 'Advanced',
    topics: ['@property', '@staticmethod', '@classmethod', 'Custom Decorators', 'Getter/Setter'],
    code: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    \n    @property\n    def radius(self):\n        return self._radius\n    \n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError("Radius cannot be negative")\n        self._radius = value\n    \n    @property\n    def area(self):\n        return 3.14159 * self._radius ** 2\n\nc = Circle(5)\nprint(c.area)`,
    tip: 'Use @property to make methods accessible like attributes - cleaner API!',
  },
]

const dataStructuresTopics = [
  {
    category: 'Built-in Collections',
    icon: '📦',
    color: '#3B82F6',
    topics: ['list', 'tuple', 'set', 'dict', 'frozenset'],
    code: `# List - ordered, mutable\nfruits = ["apple", "banana", "cherry"]\n\n# Tuple - ordered, immutable\npoint = (10, 20)\n\n# Set - unordered, unique\nunique = {1, 2, 3, 3, 2}  # {1, 2, 3}\n\n# Dict - key-value pairs\nperson = {"name": "Alice", "age": 25}`,
    operations: ['Indexing', 'Slicing', 'Add/Remove', 'Iteration', 'Membership (in)', 'Sorting'],
    tip: 'Choose the right data structure: list for order, set for uniqueness, dict for lookups!',
  },
  {
    category: 'Collections Module',
    icon: '🗃️',
    color: '#10B981',
    topics: ['Counter', 'defaultdict', 'OrderedDict', 'deque', 'namedtuple', 'ChainMap'],
    code: `from collections import Counter, defaultdict, deque\n\n# Counter - count elements\nwords = ["apple", "banana", "apple", "cherry"]\ncount = Counter(words)\nprint(count.most_common(1))  # [('apple', 2)]\n\n# defaultdict - default values\nd = defaultdict(list)\nd["fruits"].append("apple")\n\n# deque - efficient queue\nqueue = deque([1, 2, 3])\nqueue.append(4)\nqueue.popleft()`,
    operations: ['Count frequencies', 'Default values', 'Fast append/pop', 'Named tuples'],
    tip: 'Collections module is a hidden gem - use Counter for frequency counts, deque for queues!',
  },
  {
    category: 'Advanced Data Structures',
    icon: '🚀',
    color: '#8B5CF6',
    topics: ['heapq (Priority Queue)', 'bisect (Binary Search)', 'array', 'queue (Queue, LifoQueue)', 'Stack (using list)'],
    code: `import heapq\n\n# Min heap\nheap = []\nheapq.heappush(heap, 3)\nheapq.heappush(heap, 1)\nheapq.heappush(heap, 4)\nprint(heapq.heappop(heap))  # 1\n\n# Binary search\nimport bisect\narr = [1, 3, 4, 7, 9]\nbisect.insort(arr, 5)  # [1, 3, 4, 5, 7, 9]`,
    operations: ['Push/Pop (O(log n))', 'Binary search (O(log n))', 'Queue operations'],
    tip: 'Use heapq for priority queues (Dijkstra, top K elements). It\'s built-in and fast!',
  },
  {
    category: 'Algorithms',
    icon: '🧮',
    color: '#F59E0B',
    topics: ['Sorting (sorted, sort)', 'Searching', 'Recursion', 'Dynamic Programming', 'Greedy', 'Backtracking'],
    code: `# Sorting with custom key\nstudents = [("Alice", 25), ("Bob", 20), ("Charlie", 23)]\nsorted_students = sorted(students, key=lambda x: x[1])\n\n# Binary search\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
    operations: ['Sort O(n log n)', 'Search O(log n)', 'DP O(n²)', 'Backtrack'],
    tip: 'Master sorting with custom keys - it\'s used everywhere in real problems!',
  },
]

const librariesTopics = [
  {
    title: 'NumPy',
    icon: '🔢',
    color: '#3B82F6',
    desc: 'Numerical computing - arrays, matrices, mathematical operations',
    useCases: ['Scientific computing', 'Data analysis', 'Machine Learning preprocessing'],
    code: `import numpy as np\n\n# Create arrays\narr = np.array([1, 2, 3, 4, 5])\nmatrix = np.array([[1, 2], [3, 4]])\n\n# Operations\nprint(arr * 2)  # [2 4 6 8 10]\nprint(np.mean(arr))  # 3.0\nprint(np.dot(matrix, matrix))  # Matrix multiplication`,
    install: 'pip install numpy',
  },
  {
    title: 'Pandas',
    icon: '🐼',
    color: '#10B981',
    desc: 'Data manipulation and analysis - DataFrames, CSV, Excel',
    useCases: ['Data cleaning', 'Data analysis', 'ETL operations', 'Time series'],
    code: `import pandas as pd\n\n# Create DataFrame\ndf = pd.DataFrame({\n    'name': ['Alice', 'Bob', 'Charlie'],\n    'age': [25, 30, 35],\n    'city': ['NYC', 'LA', 'Chicago']\n})\n\nprint(df[df['age'] > 25])  # Filter\nprint(df.groupby('city')['age'].mean())  # Group by`,
    install: 'pip install pandas',
  },
  {
    title: 'Matplotlib',
    icon: '📈',
    color: '#F59E0B',
    desc: 'Data visualization - plots, charts, graphs',
    useCases: ['Plotting data', 'Statistical visualizations', 'Research papers'],
    code: `import matplotlib.pyplot as plt\n\n# Line plot\nx = [1, 2, 3, 4, 5]\ny = [1, 4, 9, 16, 25]\nplt.plot(x, y)\nplt.xlabel('X axis')\nplt.ylabel('Y axis')\nplt.title('Square Numbers')\nplt.show()`,
    install: 'pip install matplotlib',
  },
  {
    title: 'Requests',
    icon: '🌐',
    color: '#8B5CF6',
    desc: 'HTTP library - make API calls, web scraping',
    useCases: ['REST API calls', 'Web scraping', 'API integration'],
    code: `import requests\n\n# GET request\nresponse = requests.get('https://api.github.com')\nprint(response.status_code)  # 200\ndata = response.json()\n\n# POST request\ndata = {'name': 'Alice', 'age': 25}\nresponse = requests.post('https://api.example.com/users', json=data)`,
    install: 'pip install requests',
  },
  {
    title: 'Flask',
    icon: '🌶️',
    color: '#EF4444',
    desc: 'Micro web framework - build REST APIs, web apps',
    useCases: ['REST APIs', 'Web applications', 'Microservices'],
    code: `from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return "Hello, Flask!"\n\n@app.route('/api/users')\ndef get_users():\n    return jsonify([{"name": "Alice", "age": 25}])\n\nif __name__ == '__main__':\n    app.run(debug=True)`,
    install: 'pip install flask',
  },
  {
    title: 'Django',
    icon: '🎸',
    color: '#06B6D4',
    desc: 'Full-stack web framework - batteries included',
    useCases: ['Full web applications', 'Admin panels', 'Enterprise apps'],
    code: `# Django is a full framework\n# Install: pip install django\n# Create project: django-admin startproject mysite\n# Run server: python manage.py runserver\n\n# views.py\nfrom django.http import JsonResponse\n\ndef api_view(request):\n    return JsonResponse({'message': 'Hello Django'})`,
    install: 'pip install django',
  },
]

const advancedTopics = [
  {
    title: 'File I/O',
    icon: '📂',
    color: '#3B82F6',
    items: [
      { name: 'Reading files', code: `with open('file.txt', 'r') as f:\n    content = f.read()\n    # or line by line\n    for line in f:\n        print(line.strip())` },
      { name: 'Writing files', code: `with open('output.txt', 'w') as f:\n    f.write("Hello, World!\\n")\n    f.writelines(["Line 1\\n", "Line 2\\n"])` },
      { name: 'JSON handling', code: `import json\n\ndata = {"name": "Alice", "age": 25}\nwith open('data.json', 'w') as f:\n    json.dump(data, f, indent=2)` },
      { name: 'CSV handling', code: `import csv\n\nwith open('data.csv', 'w', newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['Name', 'Age'])\n    writer.writerow(['Alice', 25])` },
    ],
    tip: 'Always use "with open()" - it automatically closes files even if errors occur!',
  },
  {
    title: 'Exception Handling',
    icon: '🛡️',
    color: '#10B981',
    items: [
      { name: 'try-except', code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nexcept Exception as e:\n    print(f"Error: {e}")\nfinally:\n    print("Always executes")` },
      { name: 'Raising exceptions', code: `def validate_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative")\n    return age` },
      { name: 'Custom exceptions', code: `class InvalidEmailError(Exception):\n    pass\n\ndef validate_email(email):\n    if '@' not in email:\n        raise InvalidEmailError("Invalid email")` },
    ],
    tip: 'Use specific exceptions, not bare except. It makes debugging easier!',
  },
  {
    title: 'Modules & Packages',
    icon: '📦',
    color: '#F59E0B',
    items: [
      { name: 'Import statements', code: `import math\nfrom datetime import datetime\nfrom collections import Counter as C\nimport numpy as np` },
      { name: 'Creating modules', code: `# mymodule.py\ndef greet(name):\n    return f"Hello, {name}"\n\n# main.py\nimport mymodule\nprint(mymodule.greet("Alice"))` },
      { name: '__name__ == "__main__"', code: `def main():\n    print("Script running")\n\nif __name__ == "__main__":\n    main()  # Only runs when script is executed directly` },
    ],
    tip: 'Organize code into modules. Use __init__.py to make directories into packages!',
  },
  {
    title: 'Virtual Environments',
    icon: '🌍',
    color: '#8B5CF6',
    items: [
      { name: 'Create venv', code: `# Command line\npython -m venv myenv\n\n# Activate (Linux/Mac)\nsource myenv/bin/activate\n\n# Activate (Windows)\nmyenv\\Scripts\\activate` },
      { name: 'Install packages', code: `# Install package\npip install requests\n\n# Install from requirements.txt\npip install -r requirements.txt\n\n# Generate requirements.txt\npip freeze > requirements.txt` },
      { name: 'Deactivate', code: `deactivate` },
    ],
    tip: 'ALWAYS use virtual environments for projects - keeps dependencies isolated!',
  },
  {
    title: 'List/Dict Comprehensions',
    icon: '⚡',
    color: '#EF4444',
    items: [
      { name: 'List comprehension', code: `squares = [x**2 for x in range(10)]\neven = [x for x in range(20) if x % 2 == 0]\nmatrix = [[i*j for j in range(3)] for i in range(3)]` },
      { name: 'Dict comprehension', code: `squares_dict = {x: x**2 for x in range(5)}\nfiltered = {k: v for k, v in data.items() if v > 10}` },
      { name: 'Set comprehension', code: `unique_lengths = {len(word) for word in words}` },
      { name: 'Generator expression', code: `sum_of_squares = sum(x**2 for x in range(1000000))  # Memory efficient!` },
    ],
    tip: 'Comprehensions are Pythonic and fast. Use generators for large datasets!',
  },
  {
    title: 'Itertools & Functools',
    icon: '🔧',
    color: '#06B6D4',
    items: [
      { name: 'itertools', code: `from itertools import combinations, permutations, chain\n\nlist(combinations([1,2,3], 2))  # [(1,2), (1,3), (2,3)]\nlist(permutations([1,2,3], 2))  # [(1,2), (1,3), (2,1), ...]\nlist(chain([1,2], [3,4]))  # [1, 2, 3, 4]` },
      { name: 'functools', code: `from functools import reduce, lru_cache\n\nreduce(lambda x, y: x + y, [1,2,3,4])  # 10\n\n@lru_cache(maxsize=128)\ndef fibonacci(n):\n    if n < 2:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)` },
    ],
    tip: '@lru_cache is amazing for memoization - speeds up recursive functions dramatically!',
  },
]

const practiceProblems = [
  {
    category: 'Beginner',
    icon: '🌱',
    color: '#10B981',
    problems: [
      { title: 'Calculator program', difficulty: 'Easy', topics: ['Functions', 'Operators'] },
      { title: 'Palindrome checker', difficulty: 'Easy', topics: ['Strings', 'Loops'] },
      { title: 'Fibonacci sequence', difficulty: 'Easy', topics: ['Loops', 'Recursion'] },
      { title: 'Temperature converter', difficulty: 'Easy', topics: ['Functions', 'Math'] },
      { title: 'Count vowels in string', difficulty: 'Easy', topics: ['Strings', 'Loops'] },
      { title: 'Find largest in list', difficulty: 'Easy', topics: ['Lists', 'Loops'] },
      { title: 'List comprehension exercises', difficulty: 'Easy', topics: ['Comprehensions'] },
      { title: 'Dictionary operations', difficulty: 'Easy', topics: ['Dictionaries'] },
    ],
  },
  {
    category: 'Intermediate',
    icon: '📈',
    color: '#F59E0B',
    problems: [
      { title: 'Web scraper', difficulty: 'Medium', topics: ['Requests', 'BeautifulSoup'] },
      { title: 'REST API with Flask', difficulty: 'Medium', topics: ['Flask', 'JSON'] },
      { title: 'File organizer script', difficulty: 'Medium', topics: ['File I/O', 'OS module'] },
      { title: 'Data analysis with Pandas', difficulty: 'Medium', topics: ['Pandas', 'CSV'] },
      { title: 'Implement LRU Cache', difficulty: 'Medium', topics: ['OOP', 'Data Structures'] },
      { title: 'Binary search tree', difficulty: 'Medium', topics: ['Classes', 'Recursion'] },
      { title: 'Decorator functions', difficulty: 'Medium', topics: ['Decorators', 'Functions'] },
      { title: 'Contact management system', difficulty: 'Medium', topics: ['OOP', 'File I/O'] },
    ],
  },
  {
    category: 'Advanced',
    icon: '🚀',
    color: '#EF4444',
    problems: [
      { title: 'Sudoku solver', difficulty: 'Hard', topics: ['Backtracking', 'Algorithms'] },
      { title: 'Web crawler', difficulty: 'Hard', topics: ['Async', 'Requests', 'Threading'] },
      { title: 'Machine learning model', difficulty: 'Hard', topics: ['NumPy', 'Scikit-learn'] },
      { title: 'Django blog application', difficulty: 'Hard', topics: ['Django', 'Database', 'Auth'] },
      { title: 'Data visualization dashboard', difficulty: 'Hard', topics: ['Pandas', 'Matplotlib', 'Flask'] },
      { title: 'Chat application', difficulty: 'Hard', topics: ['WebSockets', 'Flask-SocketIO'] },
      { title: 'Task scheduler', difficulty: 'Hard', topics: ['Threading', 'Priority Queue'] },
      { title: 'E-commerce backend', difficulty: 'Hard', topics: ['Django/Flask', 'Database', 'API'] },
    ],
  },
]

const platforms = [
  {
    category: 'Online Judges',
    icon: '⚖️',
    color: '#3B82F6',
    items: [
      { name: 'LeetCode', desc: 'Best for interview prep - Python is the most popular language here', url: 'https://leetcode.com', tag: 'Interview Prep' },
      { name: 'HackerRank', desc: 'Python track with certifications - great for learning', url: 'https://hackerrank.com', tag: 'Beginner Friendly' },
      { name: 'Codewars', desc: 'Gamified learning - rank up by solving katas in Python', url: 'https://codewars.com', tag: 'Fun' },
      { name: 'Project Euler', desc: 'Mathematical/computational problems - perfect for Python', url: 'https://projecteuler.net', tag: 'Math' },
    ],
  },
  {
    category: 'Learning Platforms',
    icon: '🎓',
    color: '#10B981',
    items: [
      { name: 'Real Python', desc: 'Premium tutorials, articles, and courses for all levels', url: 'https://realpython.com', tag: 'Premium' },
      { name: 'Python.org Tutorial', desc: 'Official Python tutorial - comprehensive and authoritative', url: 'https://docs.python.org/3/tutorial/', tag: 'Official' },
      { name: 'Codecademy Python', desc: 'Interactive Python course - learn by doing', url: 'https://codecademy.com/learn/learn-python-3', tag: 'Interactive' },
      { name: 'GeeksforGeeks Python', desc: 'Extensive Python tutorials and interview questions', url: 'https://geeksforgeeks.org/python-programming-language/', tag: 'Free' },
    ],
  },
  {
    category: 'Books',
    icon: '📖',
    color: '#F59E0B',
    items: [
      { name: 'Python Crash Course', desc: 'By Eric Matthes - best beginner book with projects', url: '#', tag: 'Beginner' },
      { name: 'Fluent Python', desc: 'By Luciano Ramalho - deep dive into Python idioms', url: '#', tag: 'Advanced' },
      { name: 'Automate the Boring Stuff', desc: 'By Al Sweigart - practical Python for automation (FREE online)', url: 'https://automatetheboringstuff.com', tag: 'Practical' },
      { name: 'Effective Python', desc: 'By Brett Slatkin - 90 ways to write better Python', url: '#', tag: 'Best Practices' },
    ],
  },
  {
    category: 'Video Courses',
    icon: '📺',
    color: '#8B5CF6',
    items: [
      { name: 'freeCodeCamp Python', desc: 'Complete Python course (4.5+ hours) - FREE', url: 'https://youtube.com/freecodecamp', tag: 'Free' },
      { name: 'Corey Schafer YouTube', desc: 'Best Python tutorials on YouTube - crystal clear', url: 'https://youtube.com/coreyms', tag: 'Free' },
      { name: 'CS50 Python', desc: 'Harvard\'s Python course - university level quality', url: 'https://cs50.harvard.edu/python/', tag: 'University' },
      { name: 'Sentdex', desc: 'Python for data science, ML, and automation', url: 'https://youtube.com/sentdex', tag: 'Data Science' },
    ],
  },
  {
    category: 'Tools & IDEs',
    icon: '🔧',
    color: '#EF4444',
    items: [
      { name: 'VS Code', desc: 'Lightweight, powerful IDE with Python extension', url: 'https://code.visualstudio.com', tag: 'Popular' },
      { name: 'PyCharm', desc: 'Full-featured Python IDE by JetBrains', url: 'https://jetbrains.com/pycharm', tag: 'Professional' },
      { name: 'Jupyter Notebook', desc: 'Interactive notebooks for data science and learning', url: 'https://jupyter.org', tag: 'Data Science' },
      { name: 'Google Colab', desc: 'Free Jupyter notebooks in the cloud with GPU access', url: 'https://colab.research.google.com', tag: 'Free GPU' },
    ],
  },
  {
    category: 'Communities',
    icon: '👥',
    color: '#06B6D4',
    items: [
      { name: 'r/learnpython', desc: 'Reddit community for Python learners - very helpful', url: 'https://reddit.com/r/learnpython', tag: 'Reddit' },
      { name: 'Python Discord', desc: 'Active Discord server for Python developers', url: 'https://pythondiscord.com', tag: 'Discord' },
      { name: 'Stack Overflow', desc: 'Q&A for Python programming problems', url: 'https://stackoverflow.com/questions/tagged/python', tag: 'Q&A' },
      { name: 'Python Weekly', desc: 'Weekly newsletter with Python news and articles', url: 'https://pythonweekly.com', tag: 'Newsletter' },
    ],
  },
]

const learningRoadmap = [
  { 
    weeks: 'Week 1-2', 
    title: 'Python Foundations', 
    color: '#3B82F6', 
    tasks: [
      'Install Python 3.12+ and VS Code',
      'Learn variables, data types, operators',
      'Master lists, tuples, dictionaries, sets',
      'Practice with 20 beginner problems',
      'Understand f-strings and formatting'
    ] 
  },
  { 
    weeks: 'Week 3-4', 
    title: 'Control Flow & Functions', 
    color: '#10B981', 
    tasks: [
      'Master if-else, loops, comprehensions',
      'Write functions with *args and **kwargs',
      'Learn lambda, map, filter, reduce',
      'Understand scope and closures',
      'Build small CLI programs'
    ] 
  },
  { 
    weeks: 'Week 5-6', 
    title: 'OOP & Classes', 
    color: '#F59E0B', 
    tasks: [
      'Create classes with __init__ and methods',
      'Learn inheritance and polymorphism',
      'Master magic methods (__str__, __len__)',
      'Use @property and decorators',
      'Build class-based projects'
    ] 
  },
  { 
    weeks: 'Week 7-8', 
    title: 'Data Structures', 
    color: '#8B5CF6', 
    tasks: [
      'Master collections (Counter, deque, defaultdict)',
      'Learn heapq and bisect',
      'Solve 30 LeetCode Easy/Medium in Python',
      'Implement sorting and searching',
      'Practice algorithm problems daily'
    ] 
  },
  { 
    weeks: 'Week 9-12', 
    title: 'Libraries & Frameworks', 
    color: '#EF4444', 
    tasks: [
      'Learn NumPy and Pandas basics',
      'Build REST API with Flask',
      'Work with files (CSV, JSON, txt)',
      'Make API calls with requests',
      'Create data visualizations with Matplotlib'
    ] 
  },
  { 
    weeks: 'Week 13-16', 
    title: 'Projects & Specialization', 
    color: '#06B6D4', 
    tasks: [
      'Choose: Web Dev, Data Science, or Automation',
      'Build 3 portfolio projects',
      'Deploy projects online (Heroku, Vercel)',
      'Contribute to open source Python projects',
      'Start a blog to document learning'
    ] 
  },
]

const pythonTips = [
  {
    title: 'Write Pythonic Code',
    tips: [
      'Use list comprehensions instead of loops when possible',
      'Prefer "in" for membership testing over index checks',
      'Use enumerate() instead of range(len())',
      'Use zip() to iterate over multiple sequences',
      'Follow PEP 8 style guide (use black formatter)',
      'Use context managers (with) for resource management',
    ],
    color: '#3B82F6',
  },
  {
    title: 'Common Mistakes',
    tips: [
      'Mutable default arguments (def func(lst=[])): - creates shared list!',
      'Not using virtual environments for each project',
      'Using "==" for None comparison (use "is None" instead)',
      'Modifying list while iterating over it',
      'Not handling exceptions properly',
      'Ignoring the difference between / and // operators',
    ],
    color: '#EF4444',
  },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────

const Python = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openBasic, setOpenBasic] = useState(null)
  const [openOOP, setOpenOOP] = useState(null)
  const [openDS, setOpenDS] = useState(null)
  const [openLib, setOpenLib] = useState(null)
  const [openAdv, setOpenAdv] = useState(null)
  const [openProb, setOpenProb] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── NAVBAR ── */}
      {/* <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-yellow-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">🐍</span>
            </div>
            <span className="text-xl font-black text-slate-800">Python Programming Mastery</span>
          </div>
          <button onClick={() => navigate('/')} className="text-sm text-slate-600 hover:text-blue-600 font-semibold">
            ← Back to Home
          </button>
        </div>
      </nav> */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              className="w-32 sm:w-45 cursor-pointer rounded-xl"
            />
          </div>
          <div className="hidden lg:flex gap-0.5 ">
            {navSections.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-3 py-2  rounded-lg text-xs md:text-[15px] font-bold transition-all ${activeTab === s.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
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
          <div className="absolute bottom-10 right-16 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete Python Programming Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Master <span className="bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent">Python Programming</span><br />The Most Versatile Language
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From web development to data science, AI to automation — Python does it all. Learn the language that powers Google, Instagram, Netflix, and NASA.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[['#1', 'Most Popular'], ['Web Dev', 'Django/Flask'], ['Data Science', 'NumPy/Pandas'], ['16 Weeks', 'To Mastery']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-yellow-400">{val}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[73px] z-40">
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🗺️ Your Python Learning Journey</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">From first script to professional developer — complete roadmap.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
              {learningStages.map((stage, i) => (
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

            {/* Learning Roadmap */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">📅 16-Week Python Mastery Roadmap</h3>
              <p className="text-slate-500 text-sm mb-8">Structured plan to become a professional Python developer.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {learningRoadmap.map((phase, i) => (
                  <div key={i} className="rounded-2xl border-2 p-5" style={{ borderColor: phase.color, backgroundColor: `${phase.color}08` }}>
                    <p className="text-xs font-extrabold uppercase tracking-wider mb-1" style={{ color: phase.color }}>{phase.weeks}</p>
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

            {/* Python Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pythonTips.map((section, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: section.color }}>
                  <h3 className="text-xl font-extrabold mb-4" style={{ color: section.color }}>{section.title}</h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: section.color }}>•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            PYTHON BASICS
        ══════════════════════════════════ */}
        {activeTab === 'basics' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📝 Python Basics</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Master Python fundamentals — syntax, data structures, and control flow.</p>
            </div>
            <div className="space-y-4">
              {pythonBasicsTopics.map((topic, i) => {
                const isOpen = openBasic === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenBasic(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{topic.category}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{topic.topics.slice(0, 3).join(' · ')}...</p>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                          <div className="rounded-2xl p-5 border mb-5" style={{ backgroundColor: `${topic.color}08`, borderColor: `${topic.color}30` }}>
                            <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: topic.color }}>Key Concepts</p>
                            <ul className="space-y-2">
                              {topic.topics.map((t, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: topic.color }} />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                            <p className="text-xs font-extrabold text-amber-700 mb-1">💡 Pro Tip</p>
                            <p className="text-sm text-slate-700">{topic.tip}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {topic.concepts.map((concept, j) => (
                            <div key={j}>
                              <h4 className="font-bold text-slate-800 text-sm mb-2">{concept.name}</h4>
                              <pre className="bg-slate-900 text-slate-300 text-xs p-4 rounded-xl overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                                {concept.code}
                              </pre>
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

        {/* ══════════════════════════════════
            OOP & CLASSES
        ══════════════════════════════════ */}
        {activeTab === 'oop' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🏗️ Object-Oriented Python</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Master classes, inheritance, and Python's powerful OOP features.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oopTopics.map((topic, i) => {
                const isOpen = openOOP === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenOOP(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-lg">{topic.category}</h3>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                      </div>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="rounded-2xl p-5 border mb-4" style={{ backgroundColor: `${topic.color}08`, borderColor: `${topic.color}30` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: topic.color }}>Key Topics</p>
                          <ul className="space-y-2">
                            {topic.topics.map((t, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: topic.color }} />{t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5 mb-4">
                          <p className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">Code Example</p>
                          <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                            {topic.code}
                          </pre>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-xs font-extrabold text-amber-700 mb-1">💡 Pro Tip</p>
                          <p className="text-sm text-slate-700">{topic.tip}</p>
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
            DATA STRUCTURES
        ══════════════════════════════════ */}
        {activeTab === 'datastructures' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📊 Data Structures in Python</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Built-in collections, algorithms, and problem-solving techniques.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataStructuresTopics.map((ds, i) => {
                const isOpen = openDS === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: ds.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenDS(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${ds.color}18` }}>{ds.icon}</div>
                      <h3 className="font-extrabold text-slate-800 text-lg flex-1">{ds.category}</h3>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="rounded-2xl p-5 border mb-4" style={{ backgroundColor: `${ds.color}08`, borderColor: `${ds.color}30` }}>
                          <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: ds.color }}>
                            {ds.operations ? 'Key Operations' : 'Topics Covered'}
                          </p>
                          <ul className="space-y-2">
                            {(ds.topics || ds.operations).map((item, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ds.color }} />{item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5 mb-4">
                          <p className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">Code Example</p>
                          <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                            {ds.code}
                          </pre>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-xs font-extrabold text-amber-700 mb-1">💡 Pro Tip</p>
                          <p className="text-sm text-slate-700">{ds.tip}</p>
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
            LIBRARIES
        ══════════════════════════════════ */}
        {activeTab === 'libraries' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📚 Popular Python Libraries</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Essential libraries for web dev, data science, and automation.</p>
            </div>
            <div className="space-y-6">
              {librariesTopics.map((lib, i) => {
                const isOpen = openLib === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: lib.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenLib(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${lib.color}18` }}>{lib.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{lib.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{lib.desc}</p>
                      </div>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                          <div className="rounded-2xl p-5 border mb-4" style={{ backgroundColor: `${lib.color}08`, borderColor: `${lib.color}30` }}>
                            <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: lib.color }}>Use Cases</p>
                            <ul className="space-y-2">
                              {lib.useCases.map((uc, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: lib.color }} />{uc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-slate-900 rounded-xl p-4">
                            <p className="text-xs font-extrabold text-green-400 mb-2">Installation</p>
                            <code className="text-green-300 text-sm font-mono">{lib.install}</code>
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">Code Example</p>
                          <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                            {lib.code}
                          </pre>
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
            ADVANCED TOPICS
        ══════════════════════════════════ */}
        {activeTab === 'advanced' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🚀 Advanced Python</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Level up with advanced Python concepts and techniques.</p>
            </div>
            <div className="space-y-6">
              {advancedTopics.map((topic, i) => {
                const isOpen = openAdv === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenAdv(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <h3 className="font-extrabold text-slate-800 text-xl flex-1">{topic.title}</h3>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {topic.items.map((item, j) => (
                            <div key={j} className="rounded-xl p-4" style={{ backgroundColor: `${topic.color}08` }}>
                              <h4 className="font-bold text-slate-800 text-sm mb-2">{item.name}</h4>
                              {item.code && (
                                <pre className="bg-slate-900 text-slate-300 text-xs p-3 rounded-lg overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                                  {item.code}
                                </pre>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-xs font-extrabold text-amber-700 mb-1">💡 Pro Tip</p>
                          <p className="text-sm text-slate-700">{topic.tip}</p>
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
            PRACTICE PROBLEMS
        ══════════════════════════════════ */}
        {activeTab === 'practice' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💪 Practice Problems</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Build your skills with these Python practice projects.</p>
            </div>
            <div className="space-y-6">
              {practiceProblems.map((cat, i) => {
                const isOpen = openProb === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: cat.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenProb(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${cat.color}18` }}>{cat.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{cat.category} Level</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{cat.problems.length} projects to build</p>
                      </div>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cat.problems.map((prob, j) => (
                            <div key={j} className="rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-slate-800 text-sm flex-1">{prob.title}</h4>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                  {prob.difficulty}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {prob.topics.map((topic, k) => (
                                  <span key={k} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                                    {topic}
                                  </span>
                                ))}
                              </div>
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

        {/* ══════════════════════════════════
            RESOURCES
        ══════════════════════════════════ */}
        {activeTab === 'resources' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🎓 Best Learning Resources</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Curated platforms, books, and communities to master Python.</p>
            </div>
            <div className="space-y-10">
              {platforms.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${cat.color}18` }}>{cat.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">{cat.category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

            {/* Quick Reference */}
            <div className="mt-14 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">⚡ Quick Python Commands</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <h4 className="font-extrabold mb-4 text-lg text-blue-400">Package Management</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Install package:</p>
                      <code className="text-green-400">pip install package_name</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">List installed:</p>
                      <code className="text-green-400">pip list</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Generate requirements:</p>
                      <code className="text-green-400">pip freeze  requirements.txt</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Install from requirements:</p>
                      <code className="text-green-400">pip install -r requirements.txt</code>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <h4 className="font-extrabold mb-4 text-lg text-purple-400">Virtual Environments</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Create venv:</p>
                      <code className="text-green-400">python -m venv myenv</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Activate (Windows):</p>
                      <code className="text-green-400">myenv\Scripts\activate</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Activate (Mac/Linux):</p>
                      <code className="text-green-400">source myenv/bin/activate</code>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Deactivate:</p>
                      <code className="text-green-400">deactivate</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-yellow-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐍</span>
            </div>
            <span className="text-white font-bold text-lg">Python Programming Mastery</span>
          </div>
          <p className="text-sm mb-4">Your complete guide to mastering Python from basics to advanced.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-4">
            {navSections.map(s => <span key={s.id}>{s.icon} {s.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
              © 2026 aiplacprep@gmail.com Python Programming Guide. The most versatile programming language.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Python;