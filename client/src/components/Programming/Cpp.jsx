import React, { useState } from 'react'
import logo from "../../assets/image.png";
import { useNavigate } from 'react-router-dom';
const tabs = [
  { id: 'overview', label: 'Overview', icon: '⚙️' },
  { id: 'chapters', label: 'Chapters', icon: '📚' },
  { id: 'quiz', label: 'Quiz', icon: '🧠' },
  { id: 'platforms', label: 'Platforms', icon: '🌐' },
]

const chapters = [
  {
    id: 1, title: 'Introduction to C++', icon: '⚙️', color: '#3B82F6',
    desc: 'C++ is a powerful general-purpose language created by Bjarne Stroustrup. It extends C with object-oriented and generic programming features.',
    topics: [
      {
        name: 'What is C++?',
        content: 'C++ was developed by Bjarne Stroustrup at Bell Labs in 1979 as an extension of C. It supports procedural, object-oriented, and generic programming. Used in OS, game engines, browsers, and embedded systems.',
        code: `// Hello World in C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}

// Compile: g++ hello.cpp -o hello
// Run:     ./hello`
      },
      {
        name: 'C++ Program Structure',
        content: 'Every C++ program starts with #include for libraries, optional namespace declarations, and the main() function as the entry point. Statements end with semicolons.',
        code: `#include <iostream>   // Header file
#include <string>
using namespace std;  // Namespace

// Function declaration (prototype)
void greet(string name);

// Main function - entry point
int main() {
    string name = "World";
    greet(name);         // Function call
    return 0;            // 0 = success
}

// Function definition
void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}`
      },
      {
        name: 'Compilation Process',
        content: 'C++ is a compiled language. Source code (.cpp) → Preprocessor → Compiler → Object file (.o) → Linker → Executable. Understanding this helps debug build errors.',
        code: `// Compilation steps:
// 1. Preprocessor: handles #include, #define
// 2. Compiler:     converts .cpp → .o (machine code)
// 3. Linker:       combines .o files → executable

// Single file compile
// g++ main.cpp -o main

// With C++17 standard
// g++ -std=c++17 main.cpp -o main

// With all warnings
// g++ -Wall -Wextra main.cpp -o main

// Multiple files
// g++ main.cpp utils.cpp -o program`
      },
    ],
  },
  {
    id: 2, title: 'Data Types & Variables', icon: '🔢', color: '#8B5CF6',
    desc: 'C++ is statically typed. Variables must be declared with a type. C++ has richer type system than C with auto, references, and more.',
    topics: [
      {
        name: 'Primitive Data Types',
        content: 'C++ fundamental types: int, float, double, char, bool, void. Modifiers: short, long, signed, unsigned. Size depends on platform/compiler.',
        code: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    // Integer types
    int       i = 42;            // typically 4 bytes
    short     s = 100;           // 2 bytes
    long      l = 1000000L;      // 4 or 8 bytes
    long long ll = 9000000000LL; // 8 bytes

    // Floating point
    float  f = 3.14f;     // 4 bytes, ~7 digits
    double d = 3.14159265;// 8 bytes, ~15 digits

    // Other types
    char    c = 'A';      // 1 byte
    bool    b = true;     // true or false
    auto    x = 3.14;     // C++11: compiler infers type

    cout << "INT_MAX: " << INT_MAX << endl;  // 2147483647
    cout << "Size of int: " << sizeof(int) << " bytes\n";
    cout << "auto x type: double\n";
    return 0;
}`
      },
      {
        name: 'References & Pointers',
        content: 'Pointers store memory addresses. References are aliases for variables. C++ has raw pointers (inherited from C) and smart pointers (C++11) for safe memory management.',
        code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    int val = 42;

    // Pointer - stores address
    int* ptr = &val;
    cout << *ptr << endl;  // 42 (dereference)
    *ptr = 100;
    cout << val << endl;   // 100 (val changed!)

    // Reference - alias (cannot be null, cannot change target)
    int& ref = val;
    ref = 200;
    cout << val << endl;   // 200

    // Null pointer (safe)
    int* nptr = nullptr;   // C++11

    // Smart pointer - auto memory management
    unique_ptr<int> uptr = make_unique<int>(55);
    cout << *uptr << endl; // 55
    // No need to delete - auto released

    shared_ptr<int> sptr = make_shared<int>(99);
    shared_ptr<int> sptr2 = sptr; // shared ownership
    cout << sptr.use_count() << endl; // 2
    return 0;
}`
      },
      {
        name: 'Strings in C++',
        content: 'C++ has two string types: C-style char arrays (legacy) and std::string class (modern, preferred). std::string is safe, dynamic, and has many utility methods.',
        code: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    // std::string (preferred)
    string s1 = "Hello";
    string s2 = "World";
    string s3 = s1 + " " + s2; // concatenation

    cout << s3.length()         << endl; // 11
    cout << s3.substr(0, 5)     << endl; // Hello
    cout << s3.find("World")    << endl; // 6
    cout << s3.at(1)            << endl; // e

    s3.replace(6, 5, "C++");
    cout << s3 << endl; // Hello C++

    // String to int
    string numStr = "42";
    int num = stoi(numStr);   // string to int
    double d = stod("3.14");  // string to double

    // int to string
    string result = to_string(num * 2); // "84"

    // Stringstream
    stringstream ss;
    ss << "Value: " << num;
    cout << ss.str() << endl; // Value: 42
    return 0;
}`
      },
    ],
  },
  {
    id: 3, title: 'Control Flow', icon: '🔀', color: '#10B981',
    desc: 'Control structures in C++ direct program execution — conditions, loops, and jumps. Nearly identical to C but with range-based for loops.',
    topics: [
      {
        name: 'Conditionals',
        content: 'if-else, switch, and ternary operator. C++17 adds if constexpr for compile-time branching. Switch supports fall-through unless break is used.',
        code: `#include <iostream>
using namespace std;

int main() {
    int score = 85;

    // if-else chain
    if (score >= 90)      cout << "A\n";
    else if (score >= 80) cout << "B\n"; // prints B
    else                  cout << "C\n";

    // Ternary operator
    string grade = (score >= 50) ? "Pass" : "Fail";
    cout << grade << endl; // Pass

    // Switch statement
    int day = 3;
    switch (day) {
        case 1: cout << "Monday\n";    break;
        case 2: cout << "Tuesday\n";   break;
        case 3: cout << "Wednesday\n"; break; // prints
        default: cout << "Other\n";
    }

    // if with initializer (C++17)
    if (int x = score * 2; x > 150) {
        cout << "High: " << x << endl;
    }
    return 0;
}`
      },
      {
        name: 'Loops',
        content: 'C++ supports for, while, do-while, and range-based for (C++11). break exits the loop, continue skips the current iteration.',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // for loop
    for (int i = 1; i <= 5; i++) {
        cout << i << " "; // 1 2 3 4 5
    }
    cout << endl;

    // while loop
    int n = 10;
    while (n > 0) {
        cout << n << " ";
        n -= 3; // 10 7 4 1
    }

    // do-while (executes at least once)
    int count = 0;
    do {
        cout << "count=" << count << endl;
        count++;
    } while (count < 3);

    // Range-based for (C++11) - modern and safe
    vector<int> nums = {10, 20, 30, 40, 50};
    for (int num : nums) {
        cout << num << " ";
    }

    // Range-based with auto & reference
    for (auto& num : nums) {
        num *= 2; // modifies original
    }

    // break & continue
    for (int i = 0; i < 10; i++) {
        if (i == 6) break;
        if (i % 2 == 0) continue;
        cout << i << " "; // 1 3 5
    }
    return 0;
}`
      },
    ],
  },
  {
    id: 4, title: 'Functions & Scope', icon: '🔧', color: '#F59E0B',
    desc: 'Functions are reusable code blocks. C++ supports default arguments, function overloading, inline functions, and lambda expressions.',
    topics: [
      {
        name: 'Functions & Overloading',
        content: 'C++ allows multiple functions with the same name but different parameter types/counts — function overloading. The compiler selects the correct version at compile time.',
        code: `#include <iostream>
using namespace std;

// Function overloading
int add(int a, int b)       { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

// Default arguments
void greet(string name, string msg = "Hello") {
    cout << msg << ", " << name << "!\n";
}

// Inline function (suggestion to compiler)
inline int square(int x) { return x * x; }

// Pass by value, reference, const ref
void byValue(int x)        { x = 999; }          // no effect
void byRef(int& x)         { x = 999; }          // changes original
void byConstRef(const int& x) { cout << x; }     // read-only

int main() {
    cout << add(2, 3)       << endl; // 5  (int version)
    cout << add(2.5, 3.5)   << endl; // 6.0 (double version)
    cout << add(1, 2, 3)    << endl; // 6  (3-param version)

    greet("Alice");         // Hello, Alice!
    greet("Bob", "Hi");     // Hi, Bob!

    int val = 10;
    byValue(val); cout << val << endl;  // 10 (unchanged)
    byRef(val);   cout << val << endl;  // 999 (changed)
    return 0;
}`
      },
      {
        name: 'Lambda Expressions',
        content: 'Lambdas (C++11) are anonymous functions defined inline. They can capture variables from their enclosing scope by value [=] or reference [&].',
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    // Basic lambda: [capture](params) -> return { body }
    auto greet = []() { cout << "Hello Lambda!\n"; };
    greet(); // Hello Lambda!

    // Lambda with parameters
    auto add = [](int a, int b) -> int { return a + b; };
    cout << add(3, 4) << endl; // 7

    // Capture by value
    int x = 10;
    auto captureVal = [x]() { cout << x << endl; };
    x = 20;
    captureVal(); // 10 (captured original value)

    // Capture by reference
    auto captureRef = [&x]() { cout << x << endl; };
    captureRef(); // 20 (sees current value)

    // Lambda with STL algorithms
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    sort(nums.begin(), nums.end(),
         [](int a, int b) { return a < b; });
    // nums = {1, 2, 3, 5, 8, 9}

    for_each(nums.begin(), nums.end(),
             [](int n) { cout << n << " "; });
    return 0;
}`
      },
    ],
  },
  {
    id: 5, title: 'Object-Oriented Programming', icon: '🧩', color: '#EF4444',
    desc: 'OOP in C++: Encapsulation, Inheritance, Polymorphism, Abstraction. C++ supports multiple inheritance unlike Java.',
    topics: [
      {
        name: 'Classes & Objects',
        content: 'Classes bundle data (members) and behavior (methods). Access specifiers: public (accessible anywhere), private (class only), protected (class + subclasses).',
        code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
    static int totalAccounts; // shared across all objects

public:
    // Constructor
    BankAccount(string owner, double balance)
        : owner(owner), balance(balance) {
        totalAccounts++;
    }

    // Copy constructor
    BankAccount(const BankAccount& other)
        : owner(other.owner), balance(other.balance) {}

    // Destructor
    ~BankAccount() { totalAccounts--; }

    // Methods
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    bool withdraw(double amount) {
        if (amount <= balance) { balance -= amount; return true; }
        return false;
    }
    double getBalance() const { return balance; } // const method
    static int getTotal() { return totalAccounts; }

    // Operator overloading
    BankAccount operator+(const BankAccount& other) {
        return BankAccount(owner, balance + other.balance);
    }
};

int BankAccount::totalAccounts = 0;

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500);
    cout << acc.getBalance() << endl;    // 1500
    cout << BankAccount::getTotal();     // 1
}`
      },
      {
        name: 'Inheritance & Polymorphism',
        content: 'C++ supports single and multiple inheritance. Virtual functions enable runtime polymorphism. Pure virtual functions make a class abstract.',
        code: `#include <iostream>
using namespace std;

// Abstract base class
class Shape {
protected:
    string color;
public:
    Shape(string c) : color(c) {}

    virtual double area() const = 0;      // pure virtual
    virtual void draw() const {           // virtual (can override)
        cout << "Drawing " << color << " shape\n";
    }
    virtual ~Shape() {}  // virtual destructor (important!)
};

class Circle : public Shape {
    double radius;
public:
    Circle(string c, double r) : Shape(c), radius(r) {}

    double area() const override {
        return 3.14159 * radius * radius;
    }
    void draw() const override {
        cout << "Drawing circle, area=" << area() << "\n";
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(string c, double w, double h)
        : Shape(c), w(w), h(h) {}
    double area() const override { return w * h; }
};

// Multiple inheritance
class Flyable { public: virtual void fly() { cout << "Flying\n"; } };
class Swimmable { public: virtual void swim() { cout << "Swimming\n"; } };
class Duck : public Flyable, public Swimmable {};

int main() {
    Shape* shapes[] = { new Circle("red", 5), new Rectangle("blue", 4, 6) };
    for (auto s : shapes) {
        cout << "Area: " << s->area() << endl; // runtime polymorphism
        delete s;
    }
    Duck d; d.fly(); d.swim();
}`
      },
    ],
  },
  {
    id: 6, title: 'STL — Standard Template Library', icon: '📦', color: '#06B6D4',
    desc: 'STL is the crown jewel of C++. It provides generic containers, algorithms, and iterators that work with any data type.',
    topics: [
      {
        name: 'Containers',
        content: 'STL containers: vector (dynamic array), list (doubly-linked), deque, stack, queue, priority_queue, set, map, unordered_map, unordered_set.',
        code: `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <queue>
#include <stack>
using namespace std;

int main() {
    // vector - dynamic array
    vector<int> v = {3, 1, 4, 1, 5};
    v.push_back(9);
    v.pop_back();
    cout << v.size() << endl;  // 5

    // map - sorted key-value pairs (O(log n))
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"]   = 87;
    for (auto& [key, val] : scores) {  // C++17 structured bindings
        cout << key << ": " << val << "\n";
    }

    // unordered_map - hash map O(1) average
    unordered_map<string, int> umap;
    umap["fast"] = 1;

    // set - unique sorted elements
    set<int> s = {5, 3, 1, 3, 5}; // {1, 3, 5}

    // priority_queue - max heap by default
    priority_queue<int> pq;
    pq.push(3); pq.push(1); pq.push(5);
    cout << pq.top() << endl; // 5 (max)

    // stack - LIFO
    stack<int> st;
    st.push(1); st.push(2); st.push(3);
    cout << st.top() << endl; // 3
    return 0;
}`
      },
      {
        name: 'Algorithms & Iterators',
        content: 'STL algorithms work on ranges via iterators. sort, find, count, accumulate, transform, min_element, max_element and 100+ more algorithms available.',
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};

    // Sort
    sort(v.begin(), v.end());               // ascending
    sort(v.begin(), v.end(), greater<int>());// descending

    // Binary search (on sorted range)
    bool found = binary_search(v.begin(), v.end(), 5); // true

    // Find
    auto it = find(v.begin(), v.end(), 7);
    if (it != v.end()) cout << "Found: " << *it << "\n";

    // Count
    int cnt = count(v.begin(), v.end(), 3);

    // Accumulate (sum)
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "Sum: " << sum << endl; // 45

    // Transform - apply function to each element
    vector<int> squared(v.size());
    transform(v.begin(), v.end(), squared.begin(),
              [](int x) { return x * x; });

    // Min/Max
    auto [minIt, maxIt] = minmax_element(v.begin(), v.end());
    cout << "Min: " << *minIt << " Max: " << *maxIt << "\n";

    // Reverse
    reverse(v.begin(), v.end());

    // Remove duplicates
    v = {1, 1, 2, 3, 3, 4};
    auto last = unique(v.begin(), v.end());
    v.erase(last, v.end()); // {1, 2, 3, 4}
    return 0;
}`
      },
    ],
  },
  {
    id: 7, title: 'Memory Management', icon: '🧠', color: '#7C3AED',
    desc: 'C++ gives you manual control over memory. Proper memory management prevents leaks and crashes. Smart pointers (C++11) automate this.',
    topics: [
      {
        name: 'Dynamic Memory & Smart Pointers',
        content: 'new allocates heap memory, delete releases it. Smart pointers (unique_ptr, shared_ptr, weak_ptr) manage memory automatically using RAII principle.',
        code: `#include <iostream>
#include <memory>
using namespace std;

class Resource {
    int id;
public:
    Resource(int id) : id(id) {
        cout << "Resource " << id << " created\n";
    }
    ~Resource() {
        cout << "Resource " << id << " destroyed\n";
    }
    void use() { cout << "Using resource " << id << "\n"; }
};

int main() {
    // Raw pointers (avoid in modern C++)
    int* raw = new int(42);
    cout << *raw << endl;
    delete raw;          // MUST delete or memory leak!
    raw = nullptr;

    // unique_ptr - sole ownership, auto-delete
    {
        unique_ptr<Resource> u = make_unique<Resource>(1);
        u->use();
    } // auto-deleted here

    // shared_ptr - shared ownership
    shared_ptr<Resource> s1 = make_shared<Resource>(2);
    {
        shared_ptr<Resource> s2 = s1; // ref count = 2
        cout << s1.use_count() << endl; // 2
    } // s2 out of scope, ref count = 1
    cout << s1.use_count() << endl; // 1
    // s1 auto-deleted when it goes out of scope

    // weak_ptr - non-owning observer
    weak_ptr<Resource> w = s1;
    if (auto locked = w.lock()) {
        locked->use(); // safe access
    }
    return 0;
}`
      },
    ],
  },
  {
    id: 8, title: 'Templates & Modern C++', icon: '🚀', color: '#DC2626',
    desc: 'Templates enable generic programming. Modern C++ (11/14/17/20) adds move semantics, constexpr, structured bindings, concepts, and ranges.',
    topics: [
      {
        name: 'Templates',
        content: 'Templates let you write type-independent code. Function templates and class templates work with any data type. The compiler generates specific versions at compile time.',
        code: `#include <iostream>
#include <vector>
using namespace std;

// Function template
template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

// Template with multiple type params
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// Class template
template <typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }
    void pop() { data.pop_back(); }
    T top() const { return data.back(); }
    bool empty() const { return data.empty(); }
    int size() const { return data.size(); }
};

// Template specialization
template <>
class Stack<bool> {
    // specialized for bool - memory efficient
};

int main() {
    cout << maxVal(3, 7)       << endl; // 7 (int)
    cout << maxVal(3.14, 2.71) << endl; // 3.14 (double)
    cout << maxVal('a', 'z')   << endl; // z (char)
    cout << add(3, 4.5)        << endl; // 7.5

    Stack<string> ss;
    ss.push("Hello"); ss.push("C++");
    cout << ss.top() << endl; // C++
    return 0;
}`
      },
      {
        name: 'Modern C++ Features',
        content: 'C++11/14/17/20 added auto, range-for, move semantics, structured bindings, constexpr if, std::optional, std::variant, std::filesystem and much more.',
        code: `#include <iostream>
#include <vector>
#include <optional>
#include <tuple>
using namespace std;

// constexpr - compile-time evaluation
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

// std::optional - might or might not have value
optional<int> divide(int a, int b) {
    if (b == 0) return nullopt;
    return a / b;
}

// Structured bindings (C++17)
tuple<string, int, double> getInfo() {
    return {"Alice", 25, 4.5};
}

int main() {
    // auto type deduction
    auto vec = vector<int>{1, 2, 3, 4, 5};
    auto it  = vec.begin();

    // constexpr at compile time
    constexpr int fact5 = factorial(5); // 120 at compile time
    cout << fact5 << endl;

    // optional
    auto result = divide(10, 2);
    if (result) cout << "Result: " << *result << endl; // 5
    auto bad = divide(10, 0);
    cout << bad.has_value() << endl; // false

    // Structured bindings
    auto [name, age, gpa] = getInfo();
    cout << name << " " << age << " " << gpa << endl;

    // Move semantics
    vector<int> src = {1, 2, 3, 4, 5};
    vector<int> dst = move(src); // no copy, transfers ownership
    cout << src.size() << endl; // 0 (emptied)
    cout << dst.size() << endl; // 5
    return 0;
}`
      },
    ],
  },
]

const quizQuestions = [
  { q: 'Which operator is used to access a member via a pointer in C++?', options: ['.', '::', '->', '&'], answer: 2, explanation: '"->" dereferences a pointer and accesses a member. Equivalent to (*ptr).member.' },
  { q: 'What does "virtual" keyword enable in C++?', options: ['Compile-time binding', 'Runtime polymorphism', 'Template instantiation', 'Operator overloading'], answer: 1, explanation: 'Virtual functions enable runtime polymorphism — the correct function is called based on the actual object type, not pointer type.' },
  { q: 'Which smart pointer allows shared ownership?', options: ['unique_ptr', 'weak_ptr', 'shared_ptr', 'auto_ptr'], answer: 2, explanation: 'shared_ptr uses reference counting to allow multiple owners. Memory is freed when the last shared_ptr goes out of scope.' },
  { q: 'What is the output of: cout << 7 / 2?', options: ['3.5', '3', '4', '3.0'], answer: 1, explanation: 'Integer division in C++ truncates — 7/2 = 3 (not 3.5). Use 7.0/2 or (double)7/2 for 3.5.' },
  { q: 'Which container gives O(1) average-case lookup?', options: ['std::map', 'std::set', 'std::vector', 'std::unordered_map'], answer: 3, explanation: 'std::unordered_map uses a hash table giving O(1) average for insert/find. std::map is O(log n) (balanced BST).' },
  { q: 'What does "const" after a method declaration mean?', options: ['Method returns a constant', 'Method is static', 'Method does not modify the object', 'Method is virtual'], answer: 2, explanation: 'A const member function (e.g., int get() const) guarantees it will not modify any member variables of the object.' },
  { q: 'Which C++ feature lets you write type-independent code?', options: ['Inheritance', 'Templates', 'Namespaces', 'Operator overloading'], answer: 1, explanation: 'Templates allow generic programming — the compiler generates type-specific code from a single template definition.' },
  { q: 'What is "nullptr" in C++11?', options: ['A macro like NULL', 'A type-safe null pointer constant', 'An integer 0', 'A void pointer'], answer: 1, explanation: 'nullptr is a type-safe null pointer (type: nullptr_t) introduced in C++11 — safer than NULL or 0 which are integers.' },
  { q: 'What does a pure virtual function (= 0) create?', options: ['A static class', 'An interface/abstract class', 'A final class', 'A virtual table'], answer: 1, explanation: 'A class with at least one pure virtual function becomes abstract — it cannot be instantiated directly.' },
  { q: 'Which loop was added in C++11 for iterating containers?', options: ['do-while', 'iterator loop', 'range-based for', 'indexed for'], answer: 2, explanation: 'Range-based for (for(auto& x : container)) was added in C++11 for clean and safe container iteration.' },
]

const platforms = [
  { name: 'cppreference.com', icon: '📘', desc: 'The most complete C++ reference documentation — covers standard library, syntax, and modern C++ features.', tags: ['Free', 'Official Reference', 'Complete'], color: '#3B82F6', url: 'https://cppreference.com' },
  { name: 'LearnCpp.com', icon: '🎓', desc: 'The best free C++ tutorial website — structured chapters from beginner to advanced. Written in plain English.', tags: ['Free', 'Beginner-Friendly', 'Structured'], color: '#10B981', url: 'https://www.learncpp.com' },
  { name: 'Compiler Explorer', icon: '⚡', desc: 'godbolt.org — See real-time assembly output for your C++ code. Essential for understanding performance.', tags: ['Free', 'Interactive', 'Performance'], color: '#F59E0B', url: 'https://godbolt.org' },
  { name: 'Udemy – C++ Masterclass', icon: '🏆', desc: 'Tim Buchalka\'s or Abdul Bari\'s C++ course — most comprehensive paid C++ courses with projects.', tags: ['Paid', 'Comprehensive', 'Projects'], color: '#8B5CF6', url: 'https://www.udemy.com' },
  { name: 'LeetCode (C++)', icon: '🔥', desc: 'Solve DSA problems in C++. Using STL effectively is a huge interview advantage at product companies.', tags: ['DSA', 'Interviews', 'STL Practice'], color: '#EF4444', url: 'https://leetcode.com' },
  { name: 'Codeforces', icon: '🏅', desc: 'Competitive programming platform. C++ is the dominant language — sharpen your algorithmic skills here.', tags: ['Competitive', 'Free', 'Contests'], color: '#06B6D4', url: 'https://codeforces.com' },
]

const cppFacts = [
  { icon: '📅', label: 'Created', value: '1979 by Bjarne Stroustrup' },
  { icon: '⚡', label: 'Known for', value: 'Speed & Performance' },
  { icon: '🎮', label: 'Used in', value: 'Games, OS, Browsers' },
  { icon: '💼', label: 'Jobs', value: '#3 most in-demand language' },
]

const Cpp = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openChapter, setOpenChapter] = useState(null)
  const [openTopic, setOpenTopic] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const toggleTopic = (ci, ti) => {
    const key = `${ci}-${ti}`
    setOpenTopic(p => ({ ...p, [key]: !p[key] }))
  }

  const score = submitted
    ? quizQuestions.filter((q, i) => quizAnswers[i] === q.answer).length
    : 0

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo} onClick={() => navigate("/")}
              alt="logo"
              className="w-42 sm:w-45 cursor-pointer rounded-xl"
            />
          </div>
          <div className="hidden md:flex gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold md:text-[18px] transition-all ${activeTab === t.id ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
       
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete C++ Learning Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Master <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">C++</span><br />From Zero to Pro
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Complete C++ chapters from basics to modern C++20 — with code examples, interactive quiz, and the best platforms to sharpen your skills.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {cppFacts.map(f => (
              <div key={f.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="text-xs text-slate-400">{f.label}</div>
                <div className="text-xs font-bold text-blue-400 mt-0.5">{f.value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-blue-700 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ══════ OVERVIEW ══════ */}
        {activeTab === 'overview' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">⚙️ Why Learn C++?</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">C++ powers game engines, operating systems, browsers, databases, and high-frequency trading systems.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
              {[
                { icon: '🎮', title: 'Game Development', desc: 'Unreal Engine, Unity (C++ core), AAA games — C++ is the standard for high-performance game development.', color: '#10B981' },
                { icon: '⚡', title: 'Maximum Performance', desc: 'Zero-overhead abstractions, direct memory control, and compiler optimizations make C++ the fastest high-level language.', color: '#EF4444' },
                { icon: '🖥️', title: 'Systems Programming', desc: 'OS kernels, device drivers, compilers, databases (MySQL, MongoDB) — the backbone of modern computing.', color: '#3B82F6' },
                { icon: '🏆', title: 'Competitive Programming', desc: 'C++ is the dominant language in competitive programming — STL gives you ready-made data structures and algorithms.', color: '#8B5CF6' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6" style={{ borderTop: `4px solid ${c.color}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${c.color}18` }}>{c.icon}</div>
                  <h3 className="font-extrabold text-slate-800 mb-2">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Chapter Overview Grid */}
            <h3 className="text-2xl font-extrabold text-slate-800 mb-6">📚 What You'll Learn — All Chapters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {chapters.map((ch, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => { setActiveTab('chapters'); setOpenChapter(i) }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${ch.color}18` }}>{ch.icon}</div>
                    <span className="text-xs font-bold text-slate-400">Chapter {ch.id}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 mb-1 text-sm">{ch.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{ch.desc.slice(0, 80)}...</p>
                  <p className="text-xs font-bold mt-3" style={{ color: ch.color }}>→ {ch.topics.length} Topics</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ CHAPTERS ══════ */}
        {activeTab === 'chapters' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📚 C++ Learning Chapters</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Click a chapter to expand, then click any topic to see explanation and code.</p>
            </div>
            <div className="space-y-4">
              {chapters.map((ch, ci) => {
                const isChOpen = openChapter === ci
                return (
                  <div key={ci} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${isChOpen ? '' : 'border-slate-200 hover:shadow-md'}`}
                    style={isChOpen ? { borderColor: ch.color } : {}}>
                    <button className="w-full flex items-center gap-4 p-6 text-left" onClick={() => setOpenChapter(isChOpen ? null : ci)}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${ch.color}18` }}>{ch.icon}</div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-400">CHAPTER {ch.id}</p>
                        <h3 className="font-extrabold text-slate-800 text-xl">{ch.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{ch.topics.length} topics</p>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: ch.color }}>{ch.topics.length} Topics</span>
                      <span className={`text-slate-400 text-lg ml-2 transition-transform ${isChOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isChOpen && (
                      <div className="px-6 pb-6">
                        <p className="text-slate-500 text-sm mb-5 italic">{ch.desc}</p>
                        <div className="space-y-3">
                          {ch.topics.map((topic, ti) => {
                            const key = `${ci}-${ti}`
                            const isTopicOpen = openTopic[key]
                            return (
                              <div key={ti} className="border border-slate-200 rounded-xl overflow-hidden">
                                <button className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                                  onClick={() => toggleTopic(ci, ti)}>
                                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
                                    style={{ backgroundColor: ch.color }}>{ti + 1}</span>
                                  <span className="font-bold text-slate-700 flex-1">{topic.name}</span>
                                  <span className={`text-slate-400 transition-transform ${isTopicOpen ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {isTopicOpen && (
                                  <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-slate-200">
                                    <div className="p-5 bg-slate-50">
                                      <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: ch.color }}>Explanation</p>
                                      <p className="text-sm text-slate-600 leading-relaxed">{topic.content}</p>
                                    </div>
                                    <div className="bg-slate-900 p-5">
                                      <p className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">Code Example</p>
                                      <pre className="text-xs text-slate-300 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">{topic.code}</pre>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══════ QUIZ ══════ */}
        {activeTab === 'quiz' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🧠 C++ Quiz — Test Yourself</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">10 questions covering all C++ chapters. Select your answer and submit!</p>
            </div>
            {submitted && (
              <div className={`rounded-2xl p-5 mb-8 text-center border-2 ${score >= 8 ? 'bg-green-50 border-green-400' : score >= 5 ? 'bg-amber-50 border-amber-400' : 'bg-red-50 border-red-400'}`}>
                <p className="text-3xl font-extrabold mb-1">
                  {score >= 8 ? '🎉' : score >= 5 ? '👍' : '📖'} Score: {score} / {quizQuestions.length}
                </p>
                <p className={`font-semibold ${score >= 8 ? 'text-green-700' : score >= 5 ? 'text-amber-700' : 'text-red-700'}`}>
                  {score >= 8 ? 'Excellent! You know C++ well!' : score >= 5 ? 'Good — review the wrong ones.' : 'Keep studying — revisit the chapters!'}
                </p>
              </div>
            )}
            <div className="space-y-5">
              {quizQuestions.map((q, qi) => {
                const selected = quizAnswers[qi]
                return (
                  <div key={qi} className={`bg-white rounded-2xl border-2 p-6 transition-all ${submitted && selected === q.answer ? 'border-green-400 bg-green-50' : submitted && selected !== undefined && selected !== q.answer ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-8 h-8 rounded-lg bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0">{qi + 1}</span>
                      <p className="font-bold text-slate-800">{q.q}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, oi) => {
                        let cls = 'border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50'
                        if (submitted) {
                          if (oi === q.answer) cls = 'border-2 border-green-500 bg-green-500 text-white'
                          else if (oi === selected) cls = 'border-2 border-red-500 bg-red-500 text-white'
                          else cls = 'border-2 border-slate-200 bg-slate-100 text-slate-400'
                        } else if (selected === oi) {
                          cls = 'border-2 border-blue-600 bg-blue-600 text-white'
                        }
                        return (
                          <button key={oi} onClick={() => !submitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${cls} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}>
                            <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                            {submitted && oi === q.answer && ' ✓'}
                            {submitted && oi === selected && selected !== q.answer && ' ✗'}
                          </button>
                        )
                      })}
                    </div>
                    {submitted && (
                      <div className="mt-4 bg-white/80 rounded-xl px-4 py-3 border border-slate-200">
                        <p className="text-xs font-bold text-blue-600 mb-1">💡 Explanation</p>
                        <p className="text-sm text-slate-600">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-4 mt-10">
              {!submitted ? (
                <button onClick={() => Object.keys(quizAnswers).length > 0 && setSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
                  Submit Quiz →
                </button>
              ) : (
                <button onClick={() => { setQuizAnswers({}); setSubmitted(false) }}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
                  🔄 Retake Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {/* ══════ PLATFORMS ══════ */}
        {activeTab === 'platforms' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🌐 Best Platforms to Learn C++</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Top resources to continue your C++ journey — from reference docs to competitive programming.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {platforms.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${p.color}18` }}>{p.icon}</div>
                    <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-semibold text-white" style={{ backgroundColor: p.color }}>{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs font-bold transition-colors" style={{ color: p.color }}>Visit {p.name} →</p>
                </a>
              ))}
            </div>

            {/* Learning Path */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white mt-12">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🗺️ Recommended C++ Learning Path</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { step: '1', title: 'Core C++', icon: '⚙️', desc: 'Types, pointers, OOP, functions — Chapters 1–5 above. Build a strong foundation.', color: '#3B82F6' },
                  { step: '2', title: 'STL Mastery', icon: '📦', desc: 'vector, map, set, algorithms — STL is your productivity multiplier in any C++ code.', color: '#10B981' },
                  { step: '3', title: 'Modern C++', icon: '🚀', desc: 'C++11/14/17/20: smart pointers, lambdas, move semantics, templates, constexpr.', color: '#F59E0B' },
                  { step: '4', title: 'Build Projects', icon: '🏗️', desc: 'Build a game (SFML), a CLI tool, or solve 200+ LeetCode problems in C++ for interviews.', color: '#EF4444' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-lg font-extrabold text-white mb-3" style={{ backgroundColor: s.color }}>{s.step}</div>
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <h4 className="font-extrabold text-white mb-2">{s.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">C++</span>
            </div>
            <span className="text-white font-bold text-lg">LearnC++</span>
          </div>
          <p className="text-sm mb-4">Complete C++ guide from fundamentals to modern C++20 — with code, quiz & top resources.</p>
          <div className="flex justify-center gap-5 text-sm text-slate-500 mb-4">
            {tabs.map(t => <span key={t.id}>{t.icon} {t.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
            © 2026 aiplacprep@gmail.com Built for students and developers mastering C++ from scratch to modern standards.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Cpp