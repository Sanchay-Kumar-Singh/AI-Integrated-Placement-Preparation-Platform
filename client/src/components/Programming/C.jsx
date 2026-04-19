import React, { useState } from 'react'
import logo from '../../assets/image.png'
import { useNavigate } from 'react-router-dom'

// ─── DATA ─────────────────────────────────────────────────────────────────

const navSections = [
  { id: 'overview', label: 'Overview', icon: '📖' },
  { id: 'fundamentals', label: 'Fundamentals', icon: '🎯' },
  { id: 'datastructures', label: 'Data Structures', icon: '📦' },
  { id: 'pointers', label: 'Pointers & Memory', icon: '🧠' },
  { id: 'advanced', label: 'Advanced Topics', icon: '⚡' },
  { id: 'problems', label: 'Practice Problems', icon: '💻' },
  { id: 'resources', label: 'Resources', icon: '📚' },
]

const overviewContent = [
  {
    step: '01',
    title: 'What is C?',
    icon: '🔤',
    color: '#3B82F6',
    desc: 'C is a general-purpose, procedural programming language created by Dennis Ritchie in 1972. It\'s known for its simplicity, efficiency, and low-level memory access.',
    duration: 'Foundation',
    tips: [
      'C is the foundation of modern programming',
      'Used in operating systems, embedded systems, and compilers',
      'Minimal abstraction from hardware - great for learning',
    ],
  },
  {
    step: '02',
    title: 'Why Learn C?',
    icon: '🎯',
    color: '#8B5CF6',
    desc: 'C teaches you fundamental programming concepts like memory management, data structures, and algorithmic thinking without language overhead.',
    duration: 'Essential',
    tips: [
      'Understand how computers actually work',
      'Write efficient, fast code',
      'Master concepts needed for systems programming',
    ],
  },
  {
    step: '03',
    title: 'Key Characteristics',
    icon: '⚙️',
    color: '#10B981',
    desc: 'C is small, fast, and powerful. It has a minimal standard library but maximum flexibility for low-level operations.',
    duration: 'Core',
    tips: [
      'Statically typed — catch errors at compile time',
      'Manual memory management — full control',
      'Portable — write once, compile anywhere',
    ],
  },
  {
    step: '04',
    title: 'Real-World Applications',
    icon: '🚀',
    color: '#F59E0B',
    desc: 'From Linux kernel to Git, from databases to game engines — C powers systems that billions rely on daily.',
    duration: 'Impact',
    tips: [
      'Linux kernel is written in C',
      'Databases: PostgreSQL, SQLite use C',
      'Embedded systems: microcontrollers, IoT devices',
    ],
  },
]

const fundamentalTopics = [
  {
    category: 'Variables & Data Types',
    icon: '📊',
    color: '#3B82F6',
    importance: 'Very High',
    topics: ['int, float, double, char', 'Signed vs Unsigned', 'Type Casting', 'Constants', 'Enums', 'sizeof operator'],
    concepts: [
      { name: 'Integer Types', desc: 'int (2-4 bytes), short, long, long long' },
      { name: 'Float Types', desc: 'float (4 bytes), double (8 bytes), long double' },
      { name: 'Character Type', desc: 'char (1 byte), ASCII values, escape sequences' },
      { name: 'Type Conversion', desc: 'Implicit (automatic) and explicit (casting)' },
    ],
    example: `#include <stdio.h>
int main() {
    int age = 25;
    float height = 5.9;
    char initial = 'A';
    printf("Age: %d, Height: %.1f, Initial: %c\\n", age, height, initial);
    return 0;
}`,
    tip: 'Use the correct data type to optimize memory usage and prevent overflow errors.',
  },
  {
    category: 'Operators & Expressions',
    icon: '➕',
    color: '#8B5CF6',
    importance: 'Very High',
    topics: ['Arithmetic Operators', 'Logical Operators', 'Bitwise Operators', 'Ternary Operator', 'Operator Precedence'],
    concepts: [
      { name: 'Arithmetic', desc: '+, -, *, /, % (addition, subtraction, multiplication, division, modulo)' },
      { name: 'Logical', desc: '&&, ||, ! (AND, OR, NOT) — return 0 or 1' },
      { name: 'Bitwise', desc: '&, |, ^, ~, <<, >> — operate on individual bits' },
      { name: 'Comparison', desc: '==, !=, <, >, <=, >= — return 0 (false) or 1 (true)' },
    ],
    example: `#include <stdio.h>
int main() {
    int a = 10, b = 3;
    printf("a + b = %d\\n", a + b);      // 13
    printf("a %% b = %d\\n", a % b);     // 1
    printf("a > b = %d\\n", a > b);      // 1 (true)
    printf("a & b = %d\\n", a & b);      // 2 (bitwise AND)
    return 0;
}`,
    tip: 'Remember operator precedence: * / % before + -, and comparison before logical operators.',
  },
  {
    category: 'Control Flow',
    icon: '🔄',
    color: '#10B981',
    importance: 'Very High',
    topics: ['if-else statements', 'switch-case', 'Ternary operator', 'Loops (for, while, do-while)', 'break & continue'],
    concepts: [
      { name: 'if-else', desc: 'Conditional execution of code blocks based on conditions' },
      { name: 'switch-case', desc: 'Multi-way branching based on a single expression value' },
      { name: 'for loop', desc: 'for(init; condition; increment) — iterate fixed number of times' },
      { name: 'while/do-while', desc: 'Repeat block while condition is true' },
    ],
    example: `#include <stdio.h>
int main() {
    // Example: Find factorial
    int n = 5, factorial = 1;
    for (int i = 1; i <= n; i++) {
        factorial *= i;
    }
    printf("Factorial of %d = %d\\n", n, factorial);
    
    // Using switch
    int day = 3;
    switch(day) {
        case 1: printf("Monday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        default: printf("Other day\\n");
    }
    return 0;
}`,
    tip: 'Always use break in switch-case unless you intentionally want fall-through behavior.',
  },
  {
    category: 'Functions',
    icon: '📞',
    color: '#F59E0B',
    importance: 'Very High',
    topics: ['Function declaration & definition', 'Parameters & return types', 'Recursion', 'Function scope', 'Storage classes (auto, static, extern)'],
    concepts: [
      { name: 'Function Syntax', desc: 'return_type function_name(parameters) { body }' },
      { name: 'Pass by Value', desc: 'Function receives copy of argument — changes don\'t affect original' },
      { name: 'Recursion', desc: 'Function calling itself — must have base case' },
      { name: 'Static Functions', desc: 'Private to file — not visible outside translation unit' },
    ],
    example: `#include <stdio.h>

// Function declaration (prototype)
int factorial(int n);

int main() {
    printf("5! = %d\\n", factorial(5));
    return 0;
}

// Function definition
int factorial(int n) {
    if (n <= 1) return 1;  // Base case
    return n * factorial(n - 1);  // Recursive call
}`,
    tip: 'Use function prototypes to declare functions before main(). Use meaningful function names.',
  },
  {
    category: 'Arrays & Strings',
    icon: '📈',
    color: '#EF4444',
    importance: 'Very High',
    topics: ['1D & 2D Arrays', 'Array initialization', 'String manipulation', 'String functions (strlen, strcpy, strcmp)', 'Character arrays vs pointers'],
    concepts: [
      { name: '1D Arrays', desc: 'int arr[5]; — contiguous memory block for 5 integers' },
      { name: '2D Arrays', desc: 'int matrix[3][3]; — 2D grid of elements' },
      { name: 'Strings', desc: 'Null-terminated character arrays: char str[] = "Hello";' },
      { name: 'String Functions', desc: 'strlen(), strcpy(), strcmp(), strcat() — in <string.h>' },
    ],
    example: `#include <stdio.h>
#include <string.h>

int main() {
    // Array
    int scores[5] = {85, 90, 78, 92, 88};
    printf("First score: %d\\n", scores[0]);
    
    // String
    char name[50] = "Alice";
    printf("Length: %lu\\n", strlen(name));  // 5
    printf("Name: %s\\n", name);
    
    // 2D Array
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("Element [1][2]: %d\\n", matrix[1][2]);  // 6
    return 0;
}`,
    tip: 'Remember: arrays are zero-indexed. Strings need one extra byte for null terminator (\).',
  },
  {
    category: 'Input & Output',
    icon: '📥',
    color: '#06B6D4',
    importance: 'High',
    topics: ['printf() formatting', 'scanf() input', 'Format specifiers', 'getchar() & putchar()', 'File I/O (fopen, fread, fwrite)'],
    concepts: [
      { name: 'printf()', desc: 'Format: printf("format", variables); — outputs to console' },
      { name: 'scanf()', desc: 'scanf("format", &variable); — reads from console' },
      { name: 'Format Specifiers', desc: '%d (int), %f (float), %s (string), %c (char), %x (hex)' },
      { name: 'File I/O', desc: 'fopen(filename, mode), fread(), fwrite(), fclose()' },
    ],
    example: `#include <stdio.h>

int main() {
    int age;
    float salary;
    char name[50];
    
    // Input
    printf("Enter name: ");
    scanf("%s", name);
    
    printf("Enter age: ");
    scanf("%d", &age);
    
    // Output with formatting
    printf("Name: %s, Age: %d years\\n", name, age);
    printf("Salary: $%.2f\\n", 50000.5);  // 2 decimal places
    
    return 0;
}`,
    tip: 'Always use & (address operator) with scanf() for non-array variables.',
  },
]

const pointerTopics = [
  {
    title: 'Pointer Fundamentals',
    icon: '🎯',
    color: '#3B82F6',
    items: [
      { name: 'Pointer Declaration', desc: 'int *ptr; — declares a pointer to an integer' },
      { name: 'Address-of Operator (&)', desc: 'int x = 10; int *ptr = &x; — ptr stores address of x' },
      { name: 'Dereference Operator (*)', desc: '*ptr = 20; — accesses value at address stored in ptr' },
      { name: 'NULL Pointer', desc: 'int *ptr = NULL; — pointer pointing to nothing' },
      { name: 'sizeof() Pointers', desc: 'sizeof(int*) usually 4 or 8 bytes (architecture dependent)' },
    ],
  },
  {
    title: 'Pointers & Arrays',
    icon: '📊',
    color: '#10B981',
    items: [
      { name: 'Array Pointer Notation', desc: 'arr[i] is equivalent to *(arr + i)' },
      { name: 'Pointer Arithmetic', desc: 'ptr++, ptr += 5 — moves pointer by size of data type' },
      { name: 'Pointer to Array', desc: 'int (*ptr)[5]; — pointer to array of 5 integers' },
      { name: 'Array of Pointers', desc: 'int *arr[5]; — array of 5 pointers to integers' },
      { name: 'Passing Arrays to Functions', desc: 'Arrays decay to pointers when passed to functions' },
    ],
  },
  {
    title: 'Dynamic Memory Management',
    icon: '💾',
    color: '#F59E0B',
    items: [
      { name: 'malloc()', desc: 'void *malloc(size_t size); — allocate memory on heap' },
      { name: 'calloc()', desc: 'void *calloc(n, size); — allocate n blocks and initialize to 0' },
      { name: 'realloc()', desc: 'void *realloc(ptr, size); — resize previously allocated memory' },
      { name: 'free()', desc: 'free(ptr); — deallocate memory — CRITICAL to prevent leaks' },
      { name: 'Memory Leak', desc: 'Allocated memory not freed — wastes resources' },
    ],
  },
  {
    title: 'Pointers to Pointers & Functions',
    icon: '🔗',
    color: '#8B5CF6',
    items: [
      { name: 'Double Pointers', desc: 'int **ptr; — pointer to a pointer' },
      { name: 'Function Pointers', desc: 'int (*funcPtr)(int, int); — pointer to function' },
      { name: 'Pass by Reference', desc: 'Modify original variable using pointers in function' },
      { name: 'Returning Pointers', desc: 'Never return pointer to local variable — only static or heap' },
      { name: 'Callback Functions', desc: 'Pass function pointer as argument for dynamic behavior' },
    ],
  },
]

const advancedTopics = [
  {
    category: 'Structures & Unions',
    icon: '🏗️',
    color: '#3B82F6',
    importance: 'High',
    topics: ['struct definition', 'Nested structures', 'typedef', 'unions', 'Structure padding & alignment'],
    example: `#include <stdio.h>

typedef struct {
    char name[50];
    int id;
    float gpa;
} Student;

int main() {
    Student s1 = {"Alice", 101, 3.8};
    printf("Name: %s, ID: %d, GPA: %.2f\\n", s1.name, s1.id, s1.gpa);
    
    // Using pointer to struct
    Student *ptr = &s1;
    printf("Name via pointer: %s\\n", ptr->name);
    return 0;
}`,
    tip: 'Use typedef to create cleaner type aliases. Remember: unions share memory — size = largest member.',
  },
  {
    category: 'File Input/Output',
    icon: '📂',
    color: '#10B981',
    importance: 'High',
    topics: ['fopen() modes', 'fread() & fwrite()', 'fprintf() & fscanf()', 'File positioning', 'Binary vs Text mode'],
    example: `#include <stdio.h>

int main() {
    // Write to file
    FILE *fp = fopen("data.txt", "w");
    fprintf(fp, "Hello, File!\\n");
    fclose(fp);
    
    // Read from file
    fp = fopen("data.txt", "r");
    char buffer[100];
    fgets(buffer, sizeof(buffer), fp);
    printf("Read: %s", buffer);
    fclose(fp);
    
    return 0;
}`,
    tip: 'Always close files with fclose(). Use "rb"/"wb" for binary mode, "r"/"w" for text.',
  },
  {
    category: 'Preprocessor Directives',
    icon: '⚙️',
    color: '#F59E0B',
    importance: 'Medium',
    topics: ['#include', '#define', '#ifdef', '#ifndef', 'Header guards', 'Macros'],
    example: `#ifndef MATH_H
#define MATH_H

#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int add(int x, int y);

#endif  // MATH_H`,
    tip: 'Use header guards to prevent multiple inclusions. Use UPPERCASE for macro names.',
  },
  {
    category: 'Typedef & Enums',
    icon: '🏷️',
    color: '#8B5CF6',
    importance: 'Medium',
    topics: ['typedef struct', 'typedef enum', 'Creating aliases', 'Scope of typedef'],
    example: `#include <stdio.h>

typedef enum {
    RED = 0,
    GREEN = 1,
    BLUE = 2
} Color;

typedef struct {
    int x, y;
    Color color;
} Point;

int main() {
    Point p = {10, 20, RED};
    printf("Point: (%d, %d), Color: %d\\n", p.x, p.y, p.color);
    return 0;
}`,
    tip: 'Enums provide readable names instead of magic numbers. Keep type names descriptive.',
  },
]

const practiceProblems = [
  {
    title: 'Beginner Level',
    icon: '🟢',
    color: '#10B981',
    problems: [
      { name: 'Sum of Two Numbers', difficulty: 'Easy', pattern: 'Input/Output' },
      { name: 'Check Prime Number', difficulty: 'Easy', pattern: 'Loops & Conditionals' },
      { name: 'Fibonacci Series', difficulty: 'Easy', pattern: 'Loops & Functions' },
      { name: 'Reverse a Number', difficulty: 'Easy', pattern: 'Arithmetic' },
      { name: 'Count Digits', difficulty: 'Easy', pattern: 'Loops' },
    ],
  },
  {
    title: 'Intermediate Level',
    icon: '🟡',
    color: '#F59E0B',
    problems: [
      { name: 'Matrix Multiplication', difficulty: 'Medium', pattern: '2D Arrays' },
      { name: 'String Palindrome', difficulty: 'Medium', pattern: 'Strings' },
      { name: 'Linear Search Implementation', difficulty: 'Medium', pattern: 'Arrays' },
      { name: 'Bubble Sort', difficulty: 'Medium', pattern: 'Sorting' },
      { name: 'Remove Duplicates from Array', difficulty: 'Medium', pattern: 'Arrays' },
    ],
  },
  {
    title: 'Advanced Level',
    icon: '🔴',
    color: '#EF4444',
    problems: [
      { name: 'Binary Search Tree Operations', difficulty: 'Hard', pattern: 'Pointers & Structures' },
      { name: 'Graph Traversal (DFS/BFS)', difficulty: 'Hard', pattern: 'Data Structures' },
      { name: 'Dynamic Array Implementation', difficulty: 'Hard', pattern: 'Memory Management' },
      { name: 'File I/O & Parsing', difficulty: 'Hard', pattern: 'File Operations' },
      { name: 'Implementing Linked List', difficulty: 'Hard', pattern: 'Pointers & Recursion' },
    ],
  },
]

const dataStructures = [
  {
    name: 'Linked Lists',
    icon: '🔗',
    color: '#3B82F6',
    desc: 'Nodes connected via pointers — dynamic size, O(1) insertion/deletion at known position',
    code: `struct Node {
    int data;
    struct Node* next;
};

struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}`,
  },
  {
    name: 'Stacks',
    icon: '📚',
    color: '#8B5CF6',
    desc: 'LIFO (Last In First Out) — Last element added is first to be removed',
    code: `#define MAX 100
struct Stack {
    int arr[MAX];
    int top;
};

void push(struct Stack* s, int val) {
    if (s->top < MAX - 1)
        s->arr[++s->top] = val;
}

int pop(struct Stack* s) {
    return s->top >= 0 ? s->arr[s->top--] : -1;
}`,
  },
  {
    name: 'Queues',
    icon: '📋',
    color: '#10B981',
    desc: 'FIFO (First In First Out) — First element added is first to be removed',
    code: `struct Queue {
    int arr[MAX];
    int front, rear;
};

void enqueue(struct Queue* q, int val) {
    if (q->rear < MAX - 1)
        q->arr[++q->rear] = val;
}

int dequeue(struct Queue* q) {
    return q->front <= q->rear ? q->arr[q->front++] : -1;
}`,
  },
  {
    name: 'Binary Trees',
    icon: '🌳',
    color: '#F59E0B',
    desc: 'Each node has at most 2 children — useful for searching and organizing hierarchical data',
    code: `struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

void inorderTraversal(struct TreeNode* root) {
    if (!root) return;
    inorderTraversal(root->left);
    printf("%d ", root->val);
    inorderTraversal(root->right);
}`,
  },
]

const learningResources = [
  {
    category: 'Online Courses',
    icon: '🎓',
    color: '#3B82F6',
    items: [
      { name: 'Codecademy - Learn C', desc: 'Interactive C lessons with hands-on exercises', tag: 'Paid' },
      { name: 'Udemy - C Programming', desc: 'Comprehensive courses from beginner to advanced', tag: 'Paid' },
      { name: 'freeCodeCamp - C Tutorial', desc: 'Free complete C programming tutorial on YouTube', tag: 'Free' },
      { name: 'edX - C Programming', desc: 'University-level C programming courses', tag: 'Free/Paid' },
    ],
  },
  {
    category: 'Practice Platforms',
    icon: '💻',
    color: '#10B981',
    items: [
      { name: 'LeetCode', desc: 'Solve coding problems in C — company-specific questions', tag: 'Paid' },
      { name: 'HackerRank', desc: 'C challenges from easy to advanced with tutorials', tag: 'Free' },
      { name: 'CodeSignal', desc: 'Interview prep and skill assessment in C', tag: 'Free/Paid' },
      { name: 'GeeksforGeeks', desc: 'Articles, tutorials, and practice problems for C', tag: 'Free' },
    ],
  },
  {
    category: 'Reference & Documentation',
    icon: '📖',
    color: '#F59E0B',
    items: [
      { name: 'C Standard Library Documentation', desc: 'Official C library reference for all functions', tag: 'Free' },
      { name: 'cppreference.com - C', desc: 'Comprehensive C language reference', tag: 'Free' },
      { name: 'TutorialsPoint C', desc: 'Well-organized C tutorials with examples', tag: 'Free' },
      { name: 'C Programming by Kernighan & Ritchie', desc: 'The definitive C book — essential reading', tag: 'Book' },
    ],
  },
  {
    category: 'Tools & IDEs',
    icon: '⚙️',
    color: '#8B5CF6',
    items: [
      { name: 'GCC (GNU Compiler Collection)', desc: 'Most popular C compiler — free and open-source', tag: 'Free' },
      { name: 'VS Code with C Extension', desc: 'Lightweight editor with excellent C support', tag: 'Free' },
      { name: 'Code::Blocks', desc: 'Beginner-friendly IDE for C programming', tag: 'Free' },
      { name: 'Clang', desc: 'Fast LLVM-based C compiler with excellent diagnostics', tag: 'Free' },
    ],
  },
  {
    category: 'Books',
    icon: '📚',
    color: '#EF4444',
    items: [
      { name: 'The C Programming Language', desc: 'Classic by Kernighan & Ritchie — must-read for C programmers', tag: 'Book' },
      { name: 'C: A Modern Approach', desc: 'Comprehensive guide covering all C features', tag: 'Book' },
      { name: 'Head First C', desc: 'Visual, engaging introduction to C programming', tag: 'Book' },
      { name: 'Pointers on C', desc: 'Deep dive into pointers and memory management', tag: 'Book' },
    ],
  },
]

const learningRoadmap = [
  { week: 'Week 1–2', title: 'C Basics', color: '#3B82F6', tasks: ['Setup compiler (GCC/Clang)', 'Variables, data types, operators', 'Input/output (printf, scanf)', 'Simple programs (sum, average, factorial)'] },
  { week: 'Week 3–4', title: 'Control Flow', color: '#10B981', tasks: ['if-else statements', 'switch-case constructs', 'Loops (for, while, do-while)', 'Practice: prime numbers, fibonacci, pattern printing'] },
  { week: 'Week 5–6', title: 'Functions & Arrays', color: '#F59E0B', tasks: ['Function declaration and calls', '1D and 2D arrays', 'String manipulation', 'Sorting and searching algorithms'] },
  { week: 'Week 7–8', title: 'Pointers', color: '#8B5CF6', tasks: ['Pointer basics and dereferencing', 'Pointers and arrays', 'Pointers with functions', 'Dynamic memory (malloc, free)'] },
  { week: 'Week 9–10', title: 'Structures & Files', color: '#EF4444', tasks: ['Structures and unions', 'typedef and enums', 'File I/O operations', 'Working with binary and text files'] },
  { week: 'Week 11–12', title: 'Data Structures', color: '#06B6D4', tasks: ['Linked lists implementation', 'Stacks and queues', 'Trees and binary search trees', 'Hash tables basics'] },
  { week: 'Week 13–16', title: 'Advanced & Projects', color: '#7C3AED', tasks: ['Preprocessor directives', 'Advanced pointers and callbacks', 'Build complete projects', 'Optimize and debug code'] },
]

const diffColor = (d) => d === 'Easy' ? 'bg-green-100 text-green-700' : d === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'

// ─── COMPONENT ────────────────────────────────────────────────────────────

const C = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openFundamental, setOpenFundamental] = useState(null)
  const [openAdvanced, setOpenAdvanced] = useState(null)
  const [openProblems, setOpenProblems] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              className="w-42 sm:w-45 cursor-pointer rounded-xl "
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
          <div className="absolute bottom-10 right-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Master the Foundation of Programming
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Complete <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">C Programming</span><br />Guide & Tutorial
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From syntax basics to advanced data structures and memory management — everything you need to master C programming like a pro.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[['25+', 'Core Topics'], ['10+', 'Data Structures'], ['100+', 'Practice Problems'], ['16 Weeks', 'Learning Roadmap']].map(([val, label]) => (
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📖 C Programming Overview</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Understand why C matters and what you'll learn in this journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-16">
              {overviewContent.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="p-6" style={{ borderTop: `4px solid ${item.color}` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${item.color}18` }}>{item.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-400">CONCEPT {item.step}</p>
                        <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="space-y-2">
                      {item.tips.map((t, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: item.color }}>→</span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 16-Week Learning Roadmap */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-14">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">📅 16-Week Learning Roadmap</h3>
              <p className="text-slate-500 text-sm mb-8">A structured plan to go from C beginner to confident programmer.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {learningRoadmap.map((phase, i) => (
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

            {/* Key Learning Points */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-200 p-8">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-6">🎯 Why Master C?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Foundation Knowledge', icon: '🏗️', desc: 'Understand how computers work at a deeper level — memory, pointers, compilation' },
                  { title: 'Career Opportunities', icon: '🚀', desc: 'Systems programming, embedded systems, game dev, OS development all use C' },
                  { title: 'Performance', icon: '⚡', desc: 'Write fast, efficient code. C teaches optimization that translates to all languages' },
                  { title: 'Industry Relevance', icon: '🌍', desc: 'Linux kernel, databases, browsers, compilers — C powers the internet' },
                  { title: 'Problem Solving', icon: '🧠', desc: 'No hand-holding — forces you to think algorithmically and solve problems' },
                  { title: 'Job Market', icon: '💼', desc: 'Companies like Google, Microsoft, Tesla value C expertise for systems roles' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-blue-100">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-extrabold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            FUNDAMENTALS
        ══════════════════════════════════ */}
        {activeTab === 'fundamentals' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🎯 C Fundamentals</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Master the building blocks of C programming.</p>
            </div>
            <div className="space-y-4">
              {fundamentalTopics.map((topic, i) => {
                const isOpen = openFundamental === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenFundamental(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{topic.category}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{topic.topics.slice(0, 3).join(' · ')}...</p>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Core Concepts</p>
                            <div className="space-y-2">
                              {topic.concepts.map((c, j) => (
                                <div key={j} className="py-2 border-b border-slate-100 last:border-0">
                                  <span className="text-sm text-slate-700 font-bold">{c.name}</span>
                                  <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">💡 Example Code</p>
                          <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                            {topic.example}
                          </pre>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                          <p className="text-sm text-blue-900"><strong>💡 Pro Tip:</strong> {topic.tip}</p>
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📦 Data Structures in C</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Essential data structures and their implementations.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dataStructures.map((ds, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  <div className="p-6" style={{ borderTop: `4px solid ${ds.color}` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${ds.color}18` }}>{ds.icon}</div>
                      <h3 className="font-extrabold text-slate-800 text-xl">{ds.name}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{ds.desc}</p>
                    <div className="bg-slate-900 rounded-xl p-4">
                      <p className="text-xs font-bold text-amber-400 mb-2">Implementation</p>
                      <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                        {ds.code}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            POINTERS & MEMORY
        ══════════════════════════════════ */}
        {activeTab === 'pointers' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🧠 Pointers & Memory Management</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Master the most powerful (and tricky) feature of C.</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
              {pointerTopics.map((section, i) => (
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

            {/* Memory Model Visual */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white mt-14">
              <h3 className="text-2xl font-extrabold mb-6">Memory Layout in C</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {[
                    { name: 'Stack', color: '#3B82F6', desc: 'Local variables, function parameters — grows downward' },
                    { name: 'Heap', color: '#10B981', desc: 'Dynamic memory (malloc/free) — grows upward' },
                    { name: 'Data Segment', color: '#F59E0B', desc: 'Global and static variables' },
                    { name: 'Code Segment', color: '#8B5CF6', desc: 'Program instructions (read-only)' },
                  ].map((seg, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: `${seg.color}20`, borderLeft: `4px solid ${seg.color}` }}>
                      <div>
                        <p className="font-bold text-white">{seg.name}</p>
                        <p className="text-slate-300 text-xs">{seg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <p className="text-xs font-bold text-amber-300 mb-4">⚠️ Common Pointer Mistakes</p>
                  {['Dereferencing NULL pointer', 'Use-after-free (accessing freed memory)', 'Memory leaks (forgetting free())', 'Buffer overflow (writing past array bounds)', 'Dangling pointers (pointer to freed memory)'].map((err, i) => (
                    <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-300">
                      <span className="text-red-400 flex-shrink-0">⚠</span>{err}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            ADVANCED TOPICS
        ══════════════════════════════════ */}
        {activeTab === 'advanced' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">⚡ Advanced C Topics</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Take your C skills to the next level.</p>
            </div>
            <div className="space-y-4">
              {advancedTopics.map((topic, i) => {
                const isOpen = openAdvanced === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: topic.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenAdvanced(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${topic.color}18` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{topic.category}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{topic.topics.slice(0, 3).join(' · ')}</p>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: topic.color }}>{topic.importance}</span>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 space-y-5">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="rounded-2xl p-5 border" style={{ backgroundColor: `${topic.color}08`, borderColor: `${topic.color}30` }}>
                            <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: topic.color }}>Key Topics</p>
                            <ul className="space-y-2">
                              {topic.topics.map((t, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: topic.color }} />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-5">
                          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">Code Example</p>
                          <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
                            {topic.example}
                          </pre>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                          <p className="text-sm text-green-900"><strong>💡 Best Practice:</strong> {topic.tip}</p>
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
        {activeTab === 'problems' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">💻 C Practice Problems</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">100+ problems organized by difficulty and topic.</p>
            </div>
            <div className="space-y-5">
              {practiceProblems.map((level, i) => {
                const isOpen = openProblems === i
                return (
                  <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isOpen ? { borderColor: level.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenProblems(isOpen ? null : i)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${level.color}18` }}>{level.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-slate-800 text-xl">{level.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{level.problems.length} problems</p>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: level.color }}>{level.problems.length} Qs</span>
                      <span className={`text-slate-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {level.problems.map((problem, j) => (
                            <div key={j} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: `${level.color}08` }}>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{problem.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{problem.pattern}</p>
                              </div>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${diffColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Practice Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-blue-700 mb-5">✅ Practice Strategy</h3>
                {['Start with Easy problems', 'Understand the problem completely', 'Write pseudocode first', 'Test with edge cases', 'Optimize after getting AC', 'Debug using print statements', 'Learn from solutions after solving'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5 font-bold">✓</span>{t}
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-7">
                <h3 className="text-xl font-extrabold text-amber-700 mb-5">🎯 Improve Your Skills</h3>
                {['Code every day — consistency matters', 'Participate in coding competitions', 'Review others\' solutions', 'Time yourself — practice speed', 'Read compiler error messages carefully', 'Use debugging tools (gdb, valgrind)', 'Build real projects to apply knowledge'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                    <span className="text-amber-600 flex-shrink-0 mt-0.5 font-bold">→</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            RESOURCES
        ══════════════════════════════════ */}
        {activeTab === 'resources' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📚 Best C Learning Resources</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Curated tools, platforms, and books to master C.</p>
            </div>
            <div className="space-y-10">
              {learningResources.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${cat.color}18` }}>{cat.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">{cat.category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cat.items.map((item, j) => (
                      <div key={j} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-extrabold text-slate-800 text-base">{item.name}</h4>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: cat.color }}>{item.tag}</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Final Checklist */}
            <div className="mt-14 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6 text-center">✅ C Mastery Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Fundamentals', color: '#3B82F6', checks: ['Understand variables and data types', 'Master control flow (if, loops)', 'Write and use functions', 'Work with arrays and strings', 'Use input/output effectively'] },
                  { title: 'Intermediate', color: '#10B981', checks: ['Master pointers completely', 'Use dynamic memory correctly', 'Work with structures and unions', 'Implement basic data structures', 'Use command-line arguments'] },
                  { title: 'Advanced', color: '#F59E0B', checks: ['Build complex data structures', 'File I/O operations', 'Use preprocessor directives', 'Debug memory issues', 'Optimize for performance'] },
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
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-white font-bold text-lg">C Programming Guide</span>
          </div>
          <p className="text-sm mb-4">Your comprehensive guide to mastering C programming — from basics to advanced systems programming.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-4">
            {navSections.map(s => <span key={s.id}>{s.icon} {s.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
          © 2026 aiplacprep@gmail.com    C Programming Learning Platform. Master the language that powers the world's most critical systems.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default C;