import React, { useState } from 'react'
 import logo from "../../assets/image.png";
 import { useNavigate } from 'react-router-dom';
const tabs = [
  { id: 'overview', label: 'Overview', icon: '☕' },
  { id: 'chapters', label: 'Chapters', icon: '📚' },
  { id: 'quiz', label: 'Quiz', icon: '🧠' },
  { id: 'platforms', label: 'Platforms', icon: '🌐' },
]
 
const chapters = [
  {
    id: 1, title: 'Introduction to Java', icon: '☕', color: '#3B82F6',
    desc: 'Java is a class-based, object-oriented language designed to have as few implementation dependencies as possible. "Write Once, Run Anywhere."',
    topics: [
      { name: 'What is Java?', content: 'Java is a high-level, class-based, object-oriented programming language developed by James Gosling at Sun Microsystems in 1995. It follows the WORA (Write Once Run Anywhere) principle via JVM.', code: `// Hello World in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}` },
      { name: 'JDK, JRE & JVM', content: 'JVM (Java Virtual Machine) executes bytecode. JRE (Java Runtime Environment) = JVM + libraries. JDK (Java Development Kit) = JRE + development tools like compiler (javac).', code: `// Compilation & Execution Flow:
// Source Code (.java)
//   → javac compiler
// Bytecode (.class)
//   → JVM
// Machine Code (executed)
 
// Check version
// $ java --version
// $ javac --version` },
      { name: 'Java Program Structure', content: 'Every Java program must have a class. The main method is the entry point. Java is case-sensitive and uses semicolons to end statements.', code: `// Basic Java Program Structure
package com.example;          // Package declaration
 
import java.util.Scanner;     // Import statement
 
public class MyClass {        // Class declaration
    // Instance variable
    private String name;
 
    // Constructor
    public MyClass(String name) {
        this.name = name;
    }
 
    // Method
    public void greet() {
        System.out.println("Hello, " + name);
    }
 
    // Entry point
    public static void main(String[] args) {
        MyClass obj = new MyClass("Java");
        obj.greet();
    }
}` },
    ],
  },
  {
    id: 2, title: 'Data Types & Variables', icon: '🔢', color: '#8B5CF6',
    desc: 'Java is a statically typed language. Every variable must be declared with a data type before use.',
    topics: [
      { name: 'Primitive Data Types', content: 'Java has 8 primitive types: byte, short, int, long, float, double, char, boolean. These store simple values directly in memory.', code: `public class DataTypes {
    public static void main(String[] args) {
        byte  b = 100;           // 8-bit  (-128 to 127)
        short s = 30000;         // 16-bit
        int   i = 2_000_000;     // 32-bit (most common)
        long  l = 9_000_000_000L;// 64-bit (suffix L)
 
        float  f = 3.14f;        // 32-bit float (suffix f)
        double d = 3.14159265;   // 64-bit (default decimal)
 
        char   c = 'A';          // 16-bit Unicode
        boolean flag = true;     // true or false
 
        System.out.println("int: " + i);
        System.out.println("char: " + c);
    }
}` },
      { name: 'Variables & Type Casting', content: 'Variables store data values. Type casting converts one type to another — widening (automatic) or narrowing (explicit/manual).', code: `public class Variables {
    // Static variable (class-level)
    static int count = 0;
 
    public static void main(String[] args) {
        // Local variable
        int num = 42;
        final double PI = 3.14159; // constant
 
        // Widening (automatic)
        int x = 100;
        double d = x;   // int → double, safe
 
        // Narrowing (explicit)
        double pi = 3.99;
        int intPi = (int) pi; // 3 — truncated, not rounded
 
        System.out.println("d = " + d);       // 100.0
        System.out.println("intPi = " + intPi); // 3
    }
}` },
      { name: 'Strings in Java', content: 'String is a class in Java, not a primitive. Strings are immutable — once created, they cannot be changed. StringBuilder is mutable.', code: `public class StringDemo {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "World";
 
        // Concatenation
        String s3 = s1 + " " + s2;
 
        // String methods
        System.out.println(s3.length());         // 11
        System.out.println(s3.toUpperCase());    // HELLO WORLD
        System.out.println(s3.substring(0, 5));  // Hello
        System.out.println(s3.contains("World"));// true
        System.out.println(s3.replace("World","Java")); // Hello Java
 
        // Compare strings
        System.out.println(s1.equals("Hello")); // true (correct)
        System.out.println(s1 == "Hello");      // may be false!
 
        // Mutable string
        StringBuilder sb = new StringBuilder("Java");
        sb.append(" is awesome");
        System.out.println(sb.toString()); // Java is awesome
    }
}` },
    ],
  },
  {
    id: 3, title: 'Control Flow', icon: '🔀', color: '#10B981',
    desc: 'Control flow statements direct the order of execution — conditions, loops, and jumps.',
    topics: [
      { name: 'If-Else & Switch', content: 'Conditional statements allow you to execute different code paths based on conditions. Switch is cleaner for multiple fixed value checks.', code: `public class ControlFlow {
    public static void main(String[] args) {
        int score = 85;
 
        // if-else if-else
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B"); // prints this
        } else {
            System.out.println("Grade: C");
        }
 
        // Ternary operator
        String result = (score >= 50) ? "Pass" : "Fail";
        System.out.println(result); // Pass
 
        // Switch expression (Java 14+)
        String day = "MONDAY";
        String type = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY",
                 "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Unknown";
        };
        System.out.println(type); // Weekday
    }
}` },
      { name: 'Loops', content: 'Java supports for, while, do-while, and enhanced for-each loops. break exits a loop, continue skips an iteration.', code: `public class Loops {
    public static void main(String[] args) {
        // for loop
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " "); // 1 2 3 4 5
        }
 
        // while loop
        int n = 10;
        while (n > 0) {
            System.out.print(n + " ");
            n -= 3;
        }
 
        // do-while (runs at least once)
        int count = 0;
        do {
            System.out.println("Count: " + count);
            count++;
        } while (count < 3);
 
        // Enhanced for-each
        int[] nums = {10, 20, 30, 40};
        for (int num : nums) {
            System.out.print(num + " "); // 10 20 30 40
        }
 
        // break & continue
        for (int i = 0; i < 10; i++) {
            if (i == 5) break;    // stops at 5
            if (i % 2 == 0) continue; // skips evens
            System.out.print(i + " "); // 1 3
        }
    }
}` },
    ],
  },
  {
    id: 4, title: 'Object-Oriented Programming', icon: '🧩', color: '#F59E0B',
    desc: 'OOP is the heart of Java. Four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction.',
    topics: [
      { name: 'Classes & Objects', content: 'A class is a blueprint; an object is an instance. Classes have fields (state) and methods (behavior). Constructors initialize objects.', code: `// Class definition
public class Car {
    // Fields (state)
    private String brand;
    private int speed;
 
    // Constructor
    public Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }
 
    // Getter & Setter (Encapsulation)
    public String getBrand() { return brand; }
    public void setSpeed(int speed) {
        if (speed >= 0) this.speed = speed;
    }
 
    // Method (behavior)
    public void accelerate(int amount) {
        speed += amount;
        System.out.println(brand + " speed: " + speed);
    }
}
 
// Using the class
public class Main {
    public static void main(String[] args) {
        Car car = new Car("Tesla", 0);
        car.accelerate(60); // Tesla speed: 60
        car.accelerate(40); // Tesla speed: 100
    }
}` },
      { name: 'Inheritance', content: 'Inheritance allows a class to acquire properties and behaviors of another class using the extends keyword. Java supports single inheritance for classes.', code: `// Parent class
class Animal {
    String name;
 
    Animal(String name) { this.name = name; }
 
    void makeSound() {
        System.out.println(name + " makes a sound");
    }
}
 
// Child class — inherits Animal
class Dog extends Animal {
    String breed;
 
    Dog(String name, String breed) {
        super(name); // call parent constructor
        this.breed = breed;
    }
 
    @Override
    void makeSound() {
        System.out.println(name + " barks! 🐕");
    }
 
    void fetch() {
        System.out.println(name + " fetches the ball!");
    }
}
 
class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Rex", "Labrador");
        dog.makeSound(); // Rex barks!
        dog.fetch();     // Rex fetches the ball!
 
        Animal a = new Dog("Buddy", "Poodle");
        a.makeSound();   // Buddy barks! (runtime polymorphism)
    }
}` },
      { name: 'Interfaces & Abstraction', content: 'Abstract classes cannot be instantiated. Interfaces define contracts — all methods are abstract by default. A class can implement multiple interfaces.', code: `// Interface (contract)
interface Drawable {
    void draw(); // abstract by default
    default void describe() {
        System.out.println("I am a drawable shape");
    }
}
 
interface Resizable {
    void resize(double factor);
}
 
// Abstract class
abstract class Shape {
    String color;
    Shape(String color) { this.color = color; }
    abstract double area(); // must be overridden
}
 
// Concrete class — extends + implements
class Circle extends Shape implements Drawable, Resizable {
    double radius;
 
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
 
    @Override public double area() {
        return Math.PI * radius * radius;
    }
    @Override public void draw() {
        System.out.println("Drawing " + color + " circle");
    }
    @Override public void resize(double factor) {
        radius *= factor;
    }
}` },
    ],
  },
  {
    id: 5, title: 'Collections Framework', icon: '📦', color: '#EF4444',
    desc: 'Java Collections Framework provides ready-made data structures: List, Set, Map, Queue and more.',
    topics: [
      { name: 'List & ArrayList', content: 'List is an ordered collection that allows duplicates. ArrayList is the most used List implementation — backed by a dynamic array.', code: `import java.util.*;
 
public class ListDemo {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
 
        // Add elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Apple"); // duplicates allowed
 
        System.out.println(fruits);          // [Apple, Banana, Cherry, Apple]
        System.out.println(fruits.get(1));   // Banana
        System.out.println(fruits.size());   // 4
        System.out.println(fruits.contains("Cherry")); // true
 
        fruits.remove("Apple");  // removes first occurrence
        Collections.sort(fruits); // sort alphabetically
 
        // Iterate
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
 
        // LinkedList — better for frequent insertions
        LinkedList<Integer> ll = new LinkedList<>();
        ll.addFirst(1);
        ll.addLast(3);
        ll.add(1, 2); // insert at index 1
        System.out.println(ll); // [1, 2, 3]
    }
}` },
      { name: 'HashMap & HashSet', content: 'HashMap stores key-value pairs. HashSet stores unique elements. Both offer O(1) average-case performance for get/put/contains.', code: `import java.util.*;
 
public class MapSetDemo {
    public static void main(String[] args) {
        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
 
        System.out.println(scores.get("Alice"));       // 95
        System.out.println(scores.containsKey("Bob")); // true
        scores.putIfAbsent("Alice", 100); // won't update
 
        // Iterate map
        for (Map.Entry<String, Integer> e : scores.entrySet()) {
            System.out.println(e.getKey() + ": " + e.getValue());
        }
 
        // TreeMap — sorted by key
        Map<String, Integer> sorted = new TreeMap<>(scores);
 
        // HashSet — unique elements
        Set<String> names = new HashSet<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Alice"); // ignored — duplicate
 
        System.out.println(names.size()); // 2
        System.out.println(names.contains("Bob")); // true
    }
}` },
    ],
  },
  {
    id: 6, title: 'Exception Handling', icon: '⚠️', color: '#06B6D4',
    desc: 'Exception handling allows programs to handle runtime errors gracefully using try-catch-finally blocks.',
    topics: [
      { name: 'Try-Catch-Finally', content: 'try contains code that might throw. catch handles specific exceptions. finally always executes — used for cleanup like closing resources.', code: `public class ExceptionDemo {
    public static void main(String[] args) {
        // Basic try-catch
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Always runs");
        }
 
        // Multiple catch blocks
        try {
            String s = null;
            s.length(); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Null pointer: " + e);
        } catch (Exception e) {
            System.out.println("General: " + e);
        }
 
        // Try-with-resources (auto close)
        // try (FileReader fr = new FileReader("file.txt")) {
        //     // use fr
        // } catch (IOException e) { ... }
    }
}` },
      { name: 'Custom Exceptions', content: 'You can create your own exception classes by extending Exception (checked) or RuntimeException (unchecked).', code: `// Custom checked exception
class InsufficientFundsException extends Exception {
    private double amount;
 
    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Need: ₹" + amount);
        this.amount = amount;
    }
 
    public double getAmount() { return amount; }
}
 
class BankAccount {
    private double balance;
 
    BankAccount(double balance) { this.balance = balance; }
 
    public void withdraw(double amount)
            throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: ₹" + amount);
    }
}
 
class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(1000);
        try {
            acc.withdraw(1500);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
    }
}` },
    ],
  },
  {
    id: 7, title: 'Java 8+ Modern Features', icon: '🚀', color: '#7C3AED',
    desc: 'Java 8 revolutionized the language with lambdas, streams, Optional, and functional interfaces.',
    topics: [
      { name: 'Lambda & Functional Interfaces', content: 'Lambdas are anonymous functions. Functional interfaces have exactly one abstract method. They enable functional programming style in Java.', code: `import java.util.*;
import java.util.function.*;
 
public class LambdaDemo {
    public static void main(String[] args) {
        // Lambda syntax: (params) -> expression
        Runnable r = () -> System.out.println("Running!");
        r.run();
 
        // With parameters
        Comparator<String> comp = (a, b) -> a.compareTo(b);
 
        // Built-in functional interfaces
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Function<String, Integer> strLen = String::length; // method ref
        Consumer<String> printer = System.out::println;
        Supplier<List<String>> listFactory = ArrayList::new;
 
        System.out.println(isEven.test(4));     // true
        System.out.println(strLen.apply("Java")); // 4
        printer.accept("Hello Lambdas!");
 
        // Sort with lambda
        List<String> names = Arrays.asList("Charlie","Alice","Bob");
        names.sort((a, b) -> a.compareTo(b));
        System.out.println(names); // [Alice, Bob, Charlie]
    }
}` },
      { name: 'Streams API', content: 'Streams allow you to process collections of data in a functional, declarative style. They support filter, map, reduce, collect and much more.', code: `import java.util.*;
import java.util.stream.*;
 
public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
 
        // Filter + Map + Collect
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)       // keep evens
            .map(n -> n * n)                // square them
            .collect(Collectors.toList());  // collect to list
        System.out.println(evenSquares); // [4, 16, 36, 64, 100]
 
        // Reduce
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("Sum: " + sum); // 55
 
        // Count, min, max
        long count = numbers.stream().filter(n -> n > 5).count();
        Optional<Integer> max = numbers.stream().max(Integer::compare);
        System.out.println("Count > 5: " + count); // 5
        System.out.println("Max: " + max.get());    // 10
 
        // String joining
        String joined = Stream.of("Java","is","awesome")
            .collect(Collectors.joining(" "));
        System.out.println(joined); // Java is awesome
    }
}` },
    ],
  },
  {
    id: 8, title: 'Multithreading & Concurrency', icon: '⚡', color: '#DC2626',
    desc: 'Java has built-in support for multithreading, allowing concurrent execution of code for better performance.',
    topics: [
      { name: 'Creating Threads', content: 'Threads can be created by extending Thread class or implementing Runnable. The Executor framework is preferred for thread pool management.', code: `// Method 1: Extend Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread: " + getName());
    }
}
 
// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable thread");
    }
}
 
public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread t1 = new MyThread();
        t1.start(); // do NOT call run() directly
 
        Thread t2 = new Thread(new MyRunnable());
        t2.start();
 
        // Lambda thread
        Thread t3 = new Thread(() -> {
            System.out.println("Lambda thread: " + Thread.currentThread().getName());
        });
        t3.start();
 
        t1.join(); // wait for t1 to complete
        t2.join();
        System.out.println("All threads done");
    }
}` },
    ],
  },
]
 
const quizQuestions = [
  { q: 'Which keyword is used to prevent a variable from being changed in Java?', options: ['static', 'final', 'const', 'immutable'], answer: 1, explanation: '"final" makes a variable a constant — it cannot be reassigned after initialization.' },
  { q: 'What is the output of: System.out.println(10 / 3)?', options: ['3.33', '3', '4', '3.0'], answer: 1, explanation: 'Integer division in Java truncates the decimal — 10/3 = 3 (not 3.33).' },
  { q: 'Which collection does NOT allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'], answer: 2, explanation: 'HashSet (and all Set implementations) only store unique elements.' },
  { q: 'What does JVM stand for?', options: ['Java Virtual Memory', 'Java Variable Machine', 'Java Virtual Machine', 'Java Volatile Module'], answer: 2, explanation: 'JVM = Java Virtual Machine. It executes Java bytecode on any platform.' },
  { q: 'Which of these is NOT a valid Java primitive type?', options: ['int', 'string', 'boolean', 'char'], answer: 1, explanation: '"string" is not a primitive — String (capital S) is a class in Java.' },
  { q: 'What is the output of: "Java".charAt(2)?', options: ['J', 'a', 'v', 'error'], answer: 2, explanation: 'charAt(2) returns the character at index 2 — J(0), a(1), v(2). Answer: "v".' },
  { q: 'Which interface enables lambda expressions to be used in Java?', options: ['Serializable', 'Runnable', 'Functional Interface', 'Iterable'], answer: 2, explanation: 'Functional interfaces have exactly one abstract method and enable lambda syntax.' },
  { q: 'What keyword is used for inheritance in Java?', options: ['implements', 'inherits', 'extends', 'uses'], answer: 2, explanation: '"extends" is used for class inheritance. "implements" is used for interfaces.' },
  { q: 'Which stream method is a terminal operation?', options: ['filter()', 'map()', 'collect()', 'sorted()'], answer: 2, explanation: 'collect() is a terminal operation that produces a result and ends the stream pipeline.' },
  { q: 'What does the "super" keyword refer to?', options: ['The current object', 'The parent class', 'A static method', 'An interface'], answer: 1, explanation: '"super" refers to the parent (superclass) — used to call parent constructor or methods.' },
]
 
const platforms = [
  { name: 'Oracle Java Docs', icon: '📘', desc: 'Official documentation and tutorials from Oracle — the gold standard for Java reference.', tags: ['Official', 'Free', 'Complete'], color: '#EF4444', url: 'https://docs.oracle.com/javase/' },
  { name: 'NPTEL Java', icon: '🎓', desc: 'Free IIT-quality Java programming courses with video lectures and assignments.', tags: ['Free', 'IIT Quality', 'Certificate'], color: '#10B981', url: 'https://nptel.ac.in' },
  { name: 'Baeldung', icon: '🔥', desc: 'In-depth Java and Spring Boot tutorials with real code examples. Best for intermediate to advanced learners.', tags: ['Intermediate', 'Spring', 'Free'], color: '#F59E0B', url: 'https://www.baeldung.com' },
  { name: 'Codecademy Java', icon: '💻', desc: 'Interactive Java course for beginners with hands-on exercises directly in the browser.', tags: ['Interactive', 'Beginner', 'Structured'], color: '#8B5CF6', url: 'https://www.codecademy.com/learn/learn-java' },
  { name: 'Udemy – Java Masterclass', icon: '🏆', desc: 'Tim Buchalka\'s 80+ hour Java masterclass — most popular paid Java course on the internet.', tags: ['Paid', 'Comprehensive', 'Bestseller'], color: '#3B82F6', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/' },
  { name: 'LeetCode (Java)', icon: '⚡', desc: 'Practice DSA problems in Java. Essential for interview preparation at product companies.', tags: ['DSA', 'Interviews', 'Free Tier'], color: '#06B6D4', url: 'https://leetcode.com' },
]
 
const javaFacts = [
  { icon: '📅', label: 'Created', value: '1995 by James Gosling' },
  { icon: '🌍', label: 'Used by', value: '9 million+ developers' },
  { icon: '📱', label: 'Android', value: '3 billion devices run Java' },
  { icon: '💼', label: 'Jobs', value: '#2 most in-demand language' },
]
 
const Java = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openChapter, setOpenChapter] = useState(null)
  const [openTopic, setOpenTopic] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
 
  const toggleTopic = (chIdx, topIdx) => {
    const key = `${chIdx}-${topIdx}`
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
                  src={logo} onClick={()=>navigate("/")}
                  alt="logo"
                  className="w-32 sm:w-45 cursor-pointer rounded-xl"
                />
          </div>
          <div className="hidden md:flex gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold md:text-[18px] transition-all ${activeTab === t.id ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-16 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Complete Java Learning Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Master <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Java</span><br />From Zero to Pro
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Complete Java chapters from basics to Java 8+ features — with code examples, interactive quiz, and the best platforms to continue learning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {javaFacts.map(f => (
              <div key={f.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="text-xs text-slate-400">{f.label}</div>
                <div className="text-xs font-bold text-orange-400 mt-0.5">{f.value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'}`}>
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">☕ Why Learn Java?</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Java powers Android apps, enterprise backends, big data tools, and millions of systems worldwide.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
              {[
                { icon: '📱', title: 'Android Development', desc: 'Java is the primary language for Android app development — powers 3 billion+ devices globally.', color: '#10B981' },
                { icon: '🏢', title: 'Enterprise Software', desc: 'Spring Boot & Java power the backends of banks, insurance companies, and Fortune 500 firms.', color: '#3B82F6' },
                { icon: '⚡', title: 'Performance', desc: 'JVM optimization (JIT compilation) makes Java extremely fast — comparable to C++ in many workloads.', color: '#F59E0B' },
                { icon: '🛡️', title: 'Strong Ecosystem', desc: 'Massive standard library + frameworks (Spring, Hibernate, Maven) make Java production-ready.', color: '#8B5CF6' },
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">📚 Java Learning Chapters</h2>
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
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: ch.color }}>
                        {ch.topics.length} Topics
                      </span>
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
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-slate-200">
                                    <div className="p-5 bg-slate-50">
                                      <p className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: ch.color }}>Explanation</p>
                                      <p className="text-sm text-slate-600 leading-relaxed">{topic.content}</p>
                                    </div>
                                    <div className="bg-slate-900 p-5">
                                      <p className="text-xs font-extrabold text-orange-400 uppercase tracking-wider mb-3">Code Example</p>
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🧠 Java Quiz — Test Yourself</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">10 questions covering all Java chapters. Select your answer and submit!</p>
            </div>
 
            {submitted && (
              <div className={`rounded-2xl p-5 mb-8 text-center border-2 ${score >= 8 ? 'bg-green-50 border-green-400' : score >= 5 ? 'bg-amber-50 border-amber-400' : 'bg-red-50 border-red-400'}`}>
                <p className="text-3xl font-extrabold mb-1">
                  {score >= 8 ? '🎉' : score >= 5 ? '👍' : '📖'} Score: {score} / {quizQuestions.length}
                </p>
                <p className={`font-semibold ${score >= 8 ? 'text-green-700' : score >= 5 ? 'text-amber-700' : 'text-red-700'}`}>
                  {score >= 8 ? 'Excellent! You know Java well!' : score >= 5 ? 'Good effort — review the wrong answers.' : 'Keep studying — revisit the chapters above!'}
                </p>
              </div>
            )}
 
            <div className="space-y-5">
              {quizQuestions.map((q, qi) => {
                const selected = quizAnswers[qi]
                return (
                  <div key={qi} className={`bg-white rounded-2xl border-2 p-6 transition-all ${submitted && selected === q.answer ? 'border-green-400 bg-green-50' : submitted && selected !== undefined && selected !== q.answer ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0">{qi + 1}</span>
                      <p className="font-bold text-slate-800">{q.q}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, oi) => {
                        let cls = 'border-2 border-slate-200 bg-white text-slate-700 hover:border-orange-400 hover:bg-orange-50'
                        if (submitted) {
                          if (oi === q.answer) cls = 'border-2 border-green-500 bg-green-500 text-white'
                          else if (oi === selected) cls = 'border-2 border-red-500 bg-red-500 text-white'
                          else cls = 'border-2 border-slate-200 bg-slate-100 text-slate-400'
                        } else if (selected === oi) {
                          cls = 'border-2 border-orange-500 bg-orange-500 text-white'
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
                        <p className="text-xs font-bold text-orange-600 mb-1">💡 Explanation</p>
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
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-extrabold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
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
              <h2 className="text-4xl font-extrabold text-slate-800 mb-3">🌐 Best Platforms to Learn Java</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Top resources to continue your Java journey — from beginner to advanced.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {platforms.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${p.color}18` }}>{p.icon}</div>
                    <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-orange-500 transition-colors">{p.name}</h4>
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
 
            {/* Quick Tips */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white mt-12">
              <h3 className="text-2xl font-extrabold mb-6 text-center">🗺️ Recommended Learning Path</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { step: '1', title: 'Core Java', icon: '☕', desc: 'OOP, Collections, Exception Handling, I/O — Chapters 1–6 above', color: '#3B82F6' },
                  { step: '2', title: 'Java 8+ Features', icon: '🚀', desc: 'Lambdas, Streams, Optional — modern Java is a must for industry', color: '#10B981' },
                  { step: '3', title: 'Frameworks', icon: '🏗️', desc: 'Spring Boot for backend APIs — most in-demand Java skill in 2024', color: '#F59E0B' },
                  { step: '4', title: 'Practice DSA', icon: '⚡', desc: 'Solve 150+ LeetCode problems in Java for interview readiness', color: '#EF4444' },
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
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">☕</span>
            </div>
            <span className="text-white font-bold text-lg">LearnJava</span>
          </div>
          <p className="text-sm mb-4">Complete Java guide from fundamentals to modern features — with code, quiz & resources.</p>
          <div className="flex justify-center gap-5 text-sm text-slate-500 mb-4">
            {tabs.map(t => <span key={t.id}>{t.icon} {t.label}</span>)}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-slate-800 pt-4">
              © 2026 aiplacprep@gmail.com Built for students and developers learning Java from scratch to production.
          </p>
        </div>
      </footer>
    </div>
  )
}
 
export default Java