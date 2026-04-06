import React, { useState } from 'react'
import logo from '../../assets/image.png'
import { Navigate, useNavigate } from 'react-router-dom'
const subjects = [
  {
    id: 'os',
    name: 'Operating Systems',
    short: 'OS',
    icon: '🖥️',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.15)',
    tagline: 'Process, Memory & Concurrency',
    overview: 'An Operating System is system software that manages hardware and software resources, providing services for computer programs. It acts as an intermediary between users and hardware.',
    keyPoints: [
      'Manages CPU, memory, I/O devices and file systems',
      'Provides process isolation and security',
      'Handles concurrency through scheduling algorithms',
      'Manages virtual memory using paging and segmentation',
    ],
    topics: [
      {
        name: 'Process & Threads',
        icon: '⚙️',
        notes: [
          { term: 'Process', def: 'An executing program with its own address space, stack, heap, and PCB (Process Control Block). Has states: New → Ready → Running → Waiting → Terminated.' },
          { term: 'Thread', def: 'Lightweight process sharing the same address space. Threads share code, data, and OS resources but have their own registers and stack.' },
          { term: 'PCB', def: 'Process Control Block stores process state, PID, program counter, CPU registers, memory limits, open files list.' },
          { term: 'Context Switch', def: 'Saving state of current process and loading state of next. Overhead involves saving/restoring PCB — pure overhead, no useful work done.' },
          { term: 'Zombie Process', def: 'Completed execution but still has entry in process table because parent hasn\'t called wait(). Orphan: parent died before child.' },
        ],
      },
      {
        name: 'CPU Scheduling',
        icon: '📋',
        notes: [
          { term: 'FCFS', def: 'First Come First Served — non-preemptive, simple but causes convoy effect. High average waiting time for short processes behind long ones.' },
          { term: 'SJF', def: 'Shortest Job First — optimal average waiting time but requires knowing burst time in advance. Preemptive version: SRTF (Shortest Remaining Time First).' },
          { term: 'Round Robin', def: 'Each process gets a fixed time quantum. Best for time-sharing systems. Higher quantum → FCFS, Lower quantum → high context switch overhead.' },
          { term: 'Priority Scheduling', def: 'CPU assigned to highest priority process. Problem: Starvation — low priority process may never execute. Solution: Aging (gradually increase priority).' },
          { term: 'Multilevel Queue', def: 'Ready queue divided into separate queues (foreground/background). Each queue has its own scheduling algorithm. No movement between queues.' },
        ],
      },
      {
        name: 'Deadlocks',
        icon: '🔒',
        notes: [
          { term: 'Deadlock Conditions', def: 'All 4 must hold: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Breaking any one prevents deadlock.' },
          { term: 'Banker\'s Algorithm', def: 'Deadlock avoidance algorithm. Checks if granting a resource leads to safe state. Maintains Need, Allocation, Available matrices.' },
          { term: 'Deadlock Detection', def: 'Use Resource Allocation Graph (RAG). If cycle exists with single instance → deadlock. With multiple instances, use detection algorithm.' },
          { term: 'Recovery', def: 'Process termination (kill one or all deadlocked processes) or Resource preemption (take resources from processes, rollback state).' },
        ],
      },
      {
        name: 'Memory Management',
        icon: '💾',
        notes: [
          { term: 'Paging', def: 'Physical memory divided into frames, logical memory into pages. No external fragmentation, but internal fragmentation possible. Uses page table for address translation.' },
          { term: 'Segmentation', def: 'Memory divided into variable-sized segments (code, stack, heap). Has external fragmentation. Uses segment table with base and limit.' },
          { term: 'Virtual Memory', def: 'Technique allowing execution of processes not fully in memory. Uses demand paging — page loaded only when needed (page fault occurs).' },
          { term: 'Page Replacement', def: 'FIFO (simple, Belady\'s anomaly), Optimal (best but not implementable), LRU (Least Recently Used — best practical), LFU, Clock algorithm.' },
          { term: 'Thrashing', def: 'OS spends more time paging than executing. Occurs when too many processes active. Solution: Working Set Model, reduce degree of multiprogramming.' },
        ],
      },
      {
        name: 'Synchronization',
        icon: '🔄',
        notes: [
          { term: 'Race Condition', def: 'Multiple processes access shared data concurrently and outcome depends on execution order. Must use synchronization mechanisms.' },
          { term: 'Critical Section', def: 'Code segment accessing shared resources. Requirements: Mutual Exclusion, Progress, Bounded Waiting.' },
          { term: 'Mutex vs Semaphore', def: 'Mutex: binary lock, owner-based. Semaphore: integer counter, can be >1 for counting resources. Mutex is a special case of binary semaphore.' },
          { term: 'Producer-Consumer', def: 'Classic sync problem. Uses two semaphores: full (items produced) and empty (buffer space), plus mutex for critical section.' },
          { term: 'Readers-Writers', def: 'Readers can share, writers need exclusive access. First RW problem: reader preference. Second: writer preference. Third: no priority.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What is the difference between a process and a thread?', a: 'Process has independent memory space; threads share memory within a process. Thread creation is faster and lighter. Processes provide better isolation but more overhead.' },
      { q: 'Explain deadlock and its necessary conditions.', a: 'Deadlock is when processes wait forever for resources held by each other. Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait — all must hold simultaneously.' },
      { q: 'What is virtual memory? Why is it used?', a: 'Virtual memory allows programs to use more memory than physically available by using disk as extension. Enables process isolation, memory protection, and efficient memory utilization.' },
      { q: 'What is thrashing? How do you prevent it?', a: 'Thrashing occurs when CPU spends more time swapping pages than executing. Prevent using: Working Set Model, PFF (Page Fault Frequency) algorithm, or reduce multiprogramming degree.' },
      { q: 'Difference between mutex and semaphore?', a: 'Mutex is a binary lock owned by a thread — only the owner can release it. Semaphore is a signaling mechanism with a counter, can be released by any thread. Mutex ensures mutual exclusion; semaphore also enables signaling.' },
    ],
  },
  {
    id: 'dbms',
    name: 'Database Management',
    short: 'DBMS',
    icon: '🗄️',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    tagline: 'SQL, Transactions & Query Optimization',
    overview: 'A DBMS is software that manages databases — enabling storage, retrieval, and manipulation of data. It ensures data integrity, security, concurrency, and persistent storage.',
    keyPoints: [
      'ACID properties ensure reliable transactions',
      'Normalization reduces data redundancy',
      'Indexing speeds up query performance dramatically',
      'Concurrency control prevents anomalies in multi-user access',
    ],
    topics: [
      {
        name: 'ACID Properties',
        icon: '⚗️',
        notes: [
          { term: 'Atomicity', def: 'Transaction is all-or-nothing. Either all operations complete or none. Managed by transaction manager via undo logs.' },
          { term: 'Consistency', def: 'Database moves from one valid state to another. All defined rules, constraints, and triggers must be satisfied before and after.' },
          { term: 'Isolation', def: 'Concurrent transactions execute as if sequential. Levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable.' },
          { term: 'Durability', def: 'Committed transaction changes are permanent, even after system failure. Achieved through write-ahead logging (WAL) and checkpoints.' },
        ],
      },
      {
        name: 'Normalization',
        icon: '📐',
        notes: [
          { term: '1NF', def: 'First Normal Form: atomic values in each cell, no repeating groups, unique column names. All rows must be unique.' },
          { term: '2NF', def: 'Second Normal Form: must be in 1NF + no partial dependency (non-key attribute depends on whole primary key, not part of it).' },
          { term: '3NF', def: 'Third Normal Form: in 2NF + no transitive dependency (non-key attribute depends only on primary key, not on another non-key).' },
          { term: 'BCNF', def: 'Boyce-Codd Normal Form: stricter version of 3NF. For every FD X→Y, X must be a superkey. Handles anomalies 3NF misses.' },
          { term: 'Denormalization', def: 'Intentionally introducing redundancy for performance. Reduces JOIN operations at the cost of insert/update anomalies.' },
        ],
      },
      {
        name: 'Indexing & Query Optimization',
        icon: '⚡',
        notes: [
          { term: 'B-Tree Index', def: 'Balanced tree structure maintaining sorted data. Supports range queries. O(log n) for search, insert, delete. Default index type in most RDBMS.' },
          { term: 'Hash Index', def: 'Uses hash function on key. O(1) lookup but only supports equality queries. No range queries. Good for high-cardinality columns.' },
          { term: 'Clustered Index', def: 'Data rows stored in order of index key. Only one per table. Primary key is usually clustered. Faster range queries.' },
          { term: 'Composite Index', def: 'Index on multiple columns. Query must include leftmost prefix to use index. Column order matters significantly for performance.' },
          { term: 'EXPLAIN / Query Plan', def: 'Command to see how DB executes a query. Shows table scans, index usage, join methods, row estimates. Essential for optimization.' },
        ],
      },
      {
        name: 'Transactions & Concurrency',
        icon: '🔀',
        notes: [
          { term: 'Dirty Read', def: 'Reading uncommitted data from another transaction. If that transaction rolls back, you read invalid data. Prevented by Read Committed isolation.' },
          { term: 'Non-repeatable Read', def: 'Reading same row twice gives different results because another transaction modified it between reads. Prevented by Repeatable Read.' },
          { term: 'Phantom Read', def: 'Query returns different number of rows in same transaction because another transaction inserted/deleted rows. Prevented by Serializable.' },
          { term: '2PL (Two-Phase Locking)', def: 'Growing phase: acquire locks only. Shrinking phase: release locks only. Strict 2PL: all locks released after commit — prevents cascading rollback.' },
          { term: 'MVCC', def: 'Multi-Version Concurrency Control. Readers don\'t block writers. Each transaction sees snapshot of data at transaction start. Used by PostgreSQL, MySQL InnoDB.' },
        ],
      },
      {
        name: 'SQL Essentials',
        icon: '📝',
        notes: [
          { term: 'Joins', def: 'INNER JOIN: matching rows only. LEFT JOIN: all from left + matching right. RIGHT JOIN: all from right + matching left. FULL OUTER JOIN: all rows. CROSS JOIN: Cartesian product.' },
          { term: 'Aggregate Functions', def: 'COUNT, SUM, AVG, MIN, MAX operate on groups. Used with GROUP BY. HAVING filters groups (like WHERE for aggregates). Cannot use column alias in HAVING.' },
          { term: 'Window Functions', def: 'ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(). Perform calculation across rows related to current row without collapsing them.' },
          { term: 'Subqueries', def: 'Correlated subquery: references outer query, executes once per row. Derived table: subquery in FROM clause. EXISTS vs IN: EXISTS stops at first match.' },
          { term: 'Indexes in SQL', def: 'CREATE INDEX idx ON table(col). Composite: CREATE INDEX ON table(col1, col2). Unique: CREATE UNIQUE INDEX. DROP INDEX to remove.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What are ACID properties? Why are they important?', a: 'ACID ensures reliable transactions: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions appear serial), Durability (committed data persists). Critical for financial and critical data systems.' },
      { q: 'Explain the difference between WHERE and HAVING.', a: 'WHERE filters rows before grouping. HAVING filters groups after GROUP BY. WHERE cannot use aggregate functions; HAVING can. HAVING requires GROUP BY (mostly); WHERE does not.' },
      { q: 'What is database normalization? Explain 1NF, 2NF, 3NF.', a: '1NF: atomic values, no repeating groups. 2NF: 1NF + no partial dependency on composite key. 3NF: 2NF + no transitive dependency. Goal is to reduce redundancy and prevent update anomalies.' },
      { q: 'What is the difference between clustered and non-clustered index?', a: 'Clustered index physically sorts data rows — only one per table. Non-clustered index is a separate structure with pointers to data rows — multiple allowed. Primary key is clustered by default.' },
      { q: 'What is a deadlock in DBMS? How is it handled?', a: 'Deadlock: two transactions wait for each other\'s locks indefinitely. Detection: wait-for graph (cycle = deadlock). Prevention: lock ordering, timeout. Resolution: rollback one transaction (victim selection).' },
    ],
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    short: 'CN',
    icon: '🌐',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.15)',
    tagline: 'Protocols, TCP/IP & Network Security',
    overview: 'Computer Networks enable communication between devices. Understanding networking is essential for backend development, distributed systems, and system design interviews.',
    keyPoints: [
      'OSI & TCP/IP models describe network communication layers',
      'TCP ensures reliable delivery; UDP prioritizes speed',
      'HTTP/HTTPS power the web; REST APIs use HTTP verbs',
      'DNS translates domain names to IP addresses',
    ],
    topics: [
      {
        name: 'OSI & TCP/IP Models',
        icon: '📚',
        notes: [
          { term: 'OSI 7 Layers', def: 'Physical → Data Link → Network → Transport → Session → Presentation → Application. Mnemonic: "Please Do Not Throw Sausage Pizza Away"' },
          { term: 'TCP/IP Model', def: '4 layers: Network Access (Physical+DataLink), Internet (IP), Transport (TCP/UDP), Application (HTTP, DNS, FTP). Practical model used in real networks.' },
          { term: 'Data Link Layer', def: 'Handles frame creation, MAC addressing, error detection (CRC), flow control. Protocols: Ethernet, Wi-Fi (802.11), PPP. Switches operate here.' },
          { term: 'Network Layer', def: 'Logical addressing (IP), routing, fragmentation. Routers operate here. IPv4 (32-bit), IPv6 (128-bit). Protocols: IP, ICMP, ARP.' },
          { term: 'Transport Layer', def: 'End-to-end communication. TCP (reliable, connection-oriented), UDP (unreliable, connectionless). Port numbers identify applications.' },
        ],
      },
      {
        name: 'TCP vs UDP',
        icon: '🔁',
        notes: [
          { term: 'TCP Handshake', def: '3-way: SYN → SYN-ACK → ACK (establish). 4-way: FIN → ACK → FIN → ACK (terminate). Provides reliable, ordered, error-checked delivery.' },
          { term: 'TCP Features', def: 'Flow control (sliding window), Congestion control (slow start, AIMD), Reliable delivery (ACK + retransmission), Ordered delivery (sequence numbers).' },
          { term: 'UDP Features', def: 'No connection setup, no ACKs, no ordering, no congestion control. Lower overhead, faster. Used in: DNS, DHCP, video streaming, VoIP, gaming.' },
          { term: 'TCP Congestion Control', def: 'Slow Start: cwnd doubles each RTT. Congestion Avoidance: cwnd += 1 per RTT. Fast Retransmit: retransmit on 3 duplicate ACKs. Fast Recovery skips slow start after that.' },
        ],
      },
      {
        name: 'HTTP & Web Protocols',
        icon: '🌍',
        notes: [
          { term: 'HTTP Methods', def: 'GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove), HEAD (headers only), OPTIONS (capabilities). GET/HEAD are safe and idempotent.' },
          { term: 'HTTP Status Codes', def: '1xx: informational. 2xx: success (200 OK, 201 Created). 3xx: redirect (301 Moved). 4xx: client error (400, 401, 403, 404). 5xx: server error (500, 502, 503).' },
          { term: 'HTTP/1.1 vs HTTP/2', def: 'HTTP/2: multiplexing (multiple requests on one connection), header compression (HPACK), server push, binary framing. Reduces latency significantly.' },
          { term: 'HTTPS & TLS', def: 'TLS: handshake (cipher suite negotiation, certificate verification, key exchange), encryption (AES), MAC for integrity. HTTPS = HTTP over TLS on port 443.' },
          { term: 'REST API Design', def: 'Stateless, resource-based URLs, use HTTP verbs correctly, versioning (v1/v2), proper status codes, JSON responses, pagination, rate limiting.' },
        ],
      },
      {
        name: 'DNS & IP Addressing',
        icon: '🗺️',
        notes: [
          { term: 'DNS Resolution', def: 'Browser → OS cache → Resolver → Root NS → TLD NS → Authoritative NS → IP. TTL determines how long to cache. Uses UDP port 53.' },
          { term: 'IP Addressing', def: 'IPv4: 4 octets (32-bit). Subnetting: CIDR notation. Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x. NAT translates private to public IP.' },
          { term: 'ARP', def: 'Address Resolution Protocol maps IP to MAC address. Broadcasts "Who has IP x.x.x.x?" and caches the response in ARP table. Operates at Data Link layer.' },
          { term: 'DHCP', def: 'Dynamic Host Configuration Protocol automatically assigns IP, subnet mask, gateway, DNS server. Uses UDP: DISCOVER → OFFER → REQUEST → ACK.' },
        ],
      },
      {
        name: 'Network Security',
        icon: '🛡️',
        notes: [
          { term: 'Firewalls', def: 'Packet filter (stateless, checks IP/port), Stateful inspection (tracks connections), Application layer gateway (deep packet inspection). Network vs host-based.' },
          { term: 'Common Attacks', def: 'DDoS: flood with traffic. MITM: intercept communication. SQL Injection: malicious SQL in input. XSS: inject scripts in web pages. CSRF: force user actions.' },
          { term: 'Encryption', def: 'Symmetric (AES, DES): same key for encrypt/decrypt. Asymmetric (RSA, ECC): public key encrypts, private decrypts. Hybrid: asymmetric for key exchange, then symmetric.' },
          { term: 'VPN', def: 'Virtual Private Network creates encrypted tunnel over public internet. Protocols: IPSec, OpenVPN, WireGuard. Site-to-site vs Remote access VPN.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'Explain the TCP 3-way handshake.', a: 'Client sends SYN with ISN. Server responds SYN-ACK with its ISN and acknowledges client\'s. Client sends ACK. Connection established. Purpose: synchronize sequence numbers and establish reliable connection.' },
      { q: 'What happens when you type a URL in browser?', a: 'DNS lookup → TCP connection (3-way handshake) → TLS handshake (if HTTPS) → HTTP request sent → Server processes → HTTP response → Browser parses HTML, fetches CSS/JS → DOM/CSSOM → Render.' },
      { q: 'Difference between TCP and UDP. When to use each?', a: 'TCP: reliable, ordered, connection-oriented — use for web, email, file transfer. UDP: unreliable, connectionless, fast — use for video streaming, gaming, DNS, VoIP where speed > reliability.' },
      { q: 'What is the difference between HTTP and HTTPS?', a: 'HTTPS = HTTP + TLS encryption. HTTPS encrypts data in transit (preventing eavesdropping), verifies server identity (certificate), ensures data integrity. Uses port 443 vs 80.' },
      { q: 'What is DNS? How does name resolution work?', a: 'DNS maps domain names to IP addresses. Process: check browser cache → OS cache → recursive resolver → root nameserver → TLD nameserver → authoritative nameserver → returns IP. Cached per TTL.' },
    ],
  },
  {
    id: 'oop',
    name: 'OOP Concepts',
    short: 'OOP',
    icon: '🧩',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.15)',
    tagline: 'Pillars, SOLID & Design Patterns',
    overview: 'Object-Oriented Programming organizes code around objects and classes. OOP principles are fundamental to software design and are heavily tested in interviews at all levels.',
    keyPoints: [
      'Four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction',
      'SOLID principles guide robust object-oriented design',
      'Design patterns are reusable solutions to common problems',
      'Composition is often preferred over inheritance',
    ],
    topics: [
      {
        name: 'The Four Pillars',
        icon: '🏛️',
        notes: [
          { term: 'Encapsulation', def: 'Bundling data and methods together, hiding internal state. Access via public methods (getters/setters). Benefits: data protection, reduced complexity, easier maintenance.' },
          { term: 'Abstraction', def: 'Hiding complex implementation, exposing only essential interface. Achieved via abstract classes and interfaces. "What" not "How". Reduces complexity for users.' },
          { term: 'Inheritance', def: 'Child class acquires properties/behaviors of parent. Promotes reuse. Types: Single, Multiple (C++), Multilevel, Hierarchical, Hybrid. Java uses extends, interfaces for multiple.' },
          { term: 'Polymorphism', def: 'One interface, multiple implementations. Compile-time (method overloading — same name, different params). Runtime (method overriding — virtual functions, @Override).' },
        ],
      },
      {
        name: 'SOLID Principles',
        icon: '🏗️',
        notes: [
          { term: 'S — Single Responsibility', def: 'A class should have only one reason to change. Separate concerns: don\'t mix data access, business logic, and UI in one class.' },
          { term: 'O — Open/Closed', def: 'Open for extension, closed for modification. Add new behavior by adding new code, not changing existing tested code. Use interfaces and polymorphism.' },
          { term: 'L — Liskov Substitution', def: 'Subtypes must be substitutable for base types without breaking behavior. If S extends T, then objects of S can replace T objects. Violated by Square extends Rectangle.' },
          { term: 'I — Interface Segregation', def: 'Clients shouldn\'t depend on interfaces they don\'t use. Split large interfaces into smaller specific ones. Prevents "fat interfaces" and unnecessary dependencies.' },
          { term: 'D — Dependency Inversion', def: 'High-level modules shouldn\'t depend on low-level modules. Both depend on abstractions. Dependency Injection implements this. Core of frameworks like Spring.' },
        ],
      },
      {
        name: 'Design Patterns',
        icon: '🎨',
        notes: [
          { term: 'Singleton', def: 'Ensures only one instance of a class. Thread-safe: double-checked locking or static inner class. Used for DB connections, config managers, thread pools.' },
          { term: 'Factory Method', def: 'Defines interface for creating objects but lets subclasses decide which class to instantiate. Promotes loose coupling between creator and product.' },
          { term: 'Observer', def: 'Subject maintains list of observers and notifies them on state change. Used in event systems, MVC (Model-View), reactive programming, pub-sub systems.' },
          { term: 'Strategy', def: 'Defines family of algorithms, encapsulates each, makes them interchangeable. Eliminates large if-else chains. Used in sorting, payment methods, routing.' },
          { term: 'Decorator', def: 'Adds behavior to objects dynamically without modifying class. Alternative to subclassing. Used in Java I/O streams, middleware chains, UI component wrapping.' },
        ],
      },
      {
        name: 'Key OOP Concepts',
        icon: '🔑',
        notes: [
          { term: 'Abstract Class vs Interface', def: 'Abstract class: can have implementation, state, constructors. Interface: pure contract, no state (Java 8+ has default methods). A class can implement multiple interfaces but extend only one class.' },
          { term: 'Composition vs Inheritance', def: '"Favor composition over inheritance" (GoF). Composition: "has-a" (Car has Engine). Inheritance: "is-a" (Dog is Animal). Composition is more flexible, avoids fragile base class problem.' },
          { term: 'Method Overloading vs Overriding', def: 'Overloading: same name, different params — compile-time polymorphism. Overriding: redefining parent method in child — runtime polymorphism. @Override annotation prevents bugs.' },
          { term: 'Constructor Chaining', def: 'this() calls another constructor in same class. super() calls parent constructor. Must be first statement. Used to avoid code duplication in constructors.' },
          { term: 'Covariant Return Type', def: 'Overriding method can return a subtype of the declared return type. Introduced in Java 5. Allows more specific return types in subclasses without casting.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What are the four pillars of OOP?', a: 'Encapsulation: bundling data and methods, hiding state. Abstraction: hiding complexity, exposing interface. Inheritance: acquiring parent properties. Polymorphism: one interface, multiple implementations (overloading + overriding).' },
      { q: 'Explain SOLID principles with examples.', a: 'S: One class, one responsibility. O: Extend via new classes, not modifying existing. L: Subtypes replace base types safely. I: Small specific interfaces. D: Depend on abstractions, not concretes. Spring DI implements D.' },
      { q: 'What is the difference between abstract class and interface?', a: 'Abstract class: can have method implementations, instance variables, constructors, one parent only. Interface: contract only (Java 8+ allows default methods), no state, multiple implementation allowed.' },
      { q: 'Explain design patterns: Singleton, Observer, Factory.', a: 'Singleton: one instance only. Observer: notify dependents on state change (event systems). Factory: create objects without specifying exact class. All promote loose coupling and reusability.' },
      { q: 'What is the difference between overloading and overriding?', a: 'Overloading: same method name, different parameter list — resolved at compile time (static binding). Overriding: redefine parent method in child class — resolved at runtime (dynamic binding) via virtual dispatch.' },
    ],
  },
]

const quizData = [
  { sub: 'OS',   q: 'Which scheduling algorithm has the minimum average waiting time?', options: ['FCFS', 'Round Robin', 'SJF', 'Priority'], answer: 2, exp: 'SJF (Shortest Job First) is provably optimal for minimizing average waiting time among non-preemptive algorithms.' },
  { sub: 'OS',   q: 'What is a deadlock? Which condition\'s absence can prevent it?', options: ['Hold & Wait', 'Mutual Exclusion', 'Circular Wait', 'Any of the four'], answer: 3, exp: 'All 4 conditions (ME, H&W, No Preemption, Circular Wait) must hold for deadlock. Breaking any one prevents it.' },
  { sub: 'DBMS', q: 'Which SQL clause is used to filter groups after GROUP BY?', options: ['WHERE', 'FILTER', 'HAVING', 'CONDITION'], answer: 2, exp: 'HAVING filters groups created by GROUP BY. WHERE filters individual rows before grouping.' },
  { sub: 'DBMS', q: 'What anomaly does BCNF solve that 3NF doesn\'t?', options: ['Partial dependency', 'Transitive dependency', 'Overlapping candidate keys', 'Multi-valued dependency'], answer: 2, exp: 'BCNF handles cases where overlapping candidate keys cause anomalies that 3NF cannot detect. For every FD X→Y, X must be a superkey.' },
  { sub: 'CN',   q: 'What is the correct sequence of the TCP 3-way handshake?', options: ['SYN → ACK → SYN-ACK', 'SYN → SYN-ACK → ACK', 'ACK → SYN → SYN-ACK', 'SYN-ACK → SYN → ACK'], answer: 1, exp: 'TCP 3-way: Client sends SYN, server responds SYN-ACK, client sends ACK. This synchronizes sequence numbers.' },
  { sub: 'CN',   q: 'Which layer of the OSI model does a Router operate at?', options: ['Data Link (Layer 2)', 'Network (Layer 3)', 'Transport (Layer 4)', 'Physical (Layer 1)'], answer: 1, exp: 'Routers operate at Layer 3 (Network) using IP addresses for routing decisions. Switches operate at Layer 2.' },
  { sub: 'OOP',  q: 'Which OOP concept allows a class to have multiple methods with the same name?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], answer: 1, exp: 'Polymorphism — specifically method overloading (compile-time) allows same method name with different parameter lists.' },
  { sub: 'OOP',  q: 'Which SOLID principle states a class should have only one reason to change?', options: ['Open/Closed', 'Liskov Substitution', 'Single Responsibility', 'Interface Segregation'], answer: 2, exp: 'Single Responsibility Principle (SRP): Each class should have one responsibility and one reason to change.' },
  { sub: 'OS',   q: 'What does LRU stand for in page replacement?', options: ['Least Recently Used', 'Last Recently Updated', 'Least Requested Unit', 'Last Run Unit'], answer: 0, exp: 'LRU = Least Recently Used. Replaces the page that has not been used for the longest time. Best practical algorithm.' },
  { sub: 'DBMS', q: 'In MVCC, which isolation problem is NOT prevented?', options: ['Dirty Reads', 'Lost Updates', 'Phantom Reads (in some DBs)', 'Non-repeatable Reads'], answer: 2, exp: 'MVCC prevents dirty reads and non-repeatable reads. Phantom reads may still occur in MVCC implementations unless using Serializable isolation.' },
]

const diffColor = d =>
  d === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
  d === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
  'bg-red-500/20 text-red-400 border border-red-500/30'

const subColors = { OS: '#6366F1', DBMS: '#10B981', CN: '#F59E0B', OOP: '#EC4899' }

const CoreSubjects = () => {
  const navigate=useNavigate()
  const [activeSubject, setActiveSubject] = useState('os')
  const [activeTab, setActiveTab]     = useState('notes')
  const [openTopic, setOpenTopic]     = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [submitted, setSubmitted]     = useState(false)
  const [quizFilter, setQuizFilter]   = useState('All')

  const subject = subjects.find(s => s.id === activeSubject)
  const score = submitted ? quizData.filter((q, i) => quizAnswers[i] === q.answer).length : 0
  const filteredQuiz = quizFilter === 'All' ? quizData : quizData.filter(q => q.sub === quizFilter)

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg,#080810 0%,#0d0d1a 60%,#080810 100%)' }}>

      {/* ── NAVBAR ── */}
      <nav className="border-b border-white/8 sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(8,8,16,0.85)' }}>
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
          <div className="hidden md:flex gap-2">
            {subjects.map(s => (
              <button key={s.id} onClick={() => { setActiveSubject(s.id); setActiveTab('notes'); setOpenTopic(null) }}
                className={`px-3 py-2 rounded-xl text-xs md:text-[18px] font-bold transition-all border ${activeSubject === s.id ? 'text-white border-transparent' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
                style={activeSubject === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}>
                {s.icon} {s.short}
              </button>
            ))}
          </div>
          <button onClick={() => { setActiveSubject(activeSubject); setActiveTab('quiz') }}
            className="text-sm font-bold px-4 py-2 rounded-xl text-white border border-white/10 hover:border-white/30 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            🧠 Quiz
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(99,102,241,0.06)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(236,72,153,0.06)' }} />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/10 text-slate-400 text-xs font-bold px-5 py-2 rounded-full mb-7 uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            🎓 CS Fundamentals — Interview Mastery Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight tracking-tight">
            <span className="text-white">Master </span>
            <span style={{ background: 'linear-gradient(90deg,#6366f1,#10b981,#f59e0b,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Core Subjects</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Comprehensive notes, interview Q&As, and quiz for OS, DBMS, Computer Networks & OOP — the four pillars of every CS interview.
          </p>
          {/* Subject cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {subjects.map(s => (
              <button key={s.id} onClick={() => { setActiveSubject(s.id); setActiveTab('notes'); setOpenTopic(null) }}
                className={`rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 ${activeSubject === s.id ? 'border-transparent' : 'border-white/8 hover:border-white/20'}`}
                style={{
                  background: activeSubject === s.id ? `${s.color}25` : 'rgba(255,255,255,0.03)',
                  borderColor: activeSubject === s.id ? `${s.color}60` : undefined,
                  boxShadow: activeSubject === s.id ? `0 0 24px ${s.color}30` : 'none',
                }}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-black text-white text-sm">{s.short}</div>
                <div className="text-xs mt-1" style={{ color: s.color }}>{s.tagline.split(' ').slice(0,2).join(' ')}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECT TABS ── */}
      <div className="border-b border-white/8 sticky top-[65px] z-40 backdrop-blur-xl" style={{ background: 'rgba(8,8,16,0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {/* Subject selector (mobile) */}
          <div className="flex gap-1 mr-4 border-r border-white/10 pr-4">
            {subjects.map(s => (
              <button key={s.id} onClick={() => { setActiveSubject(s.id); setOpenTopic(null) }}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all border whitespace-nowrap ${activeSubject === s.id ? 'text-white border-transparent' : 'text-slate-500 border-transparent hover:text-white'}`}
                style={activeSubject === s.id ? { backgroundColor: `${s.color}30`, borderColor: `${s.color}50`, color: s.color } : {}}>
                {s.icon} {s.short}
              </button>
            ))}
          </div>
          {/* Content tabs */}
          {['notes', 'interview', 'quiz'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all capitalize ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-white'}`}
              style={activeTab === tab ? { backgroundColor: `${subject.color}30`, color: subject.color } : {}}>
              {tab === 'notes' ? '📝' : tab === 'interview' ? '🎯' : '🧠'} {tab === 'notes' ? 'Study Notes' : tab === 'interview' ? 'Interview Q&A' : 'Quiz'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ══════ NOTES TAB ══════ */}
        {activeTab === 'notes' && (
          <div>
            {/* Subject overview */}
            <div className="rounded-3xl border p-8 mb-10" style={{ background: subject.glow, borderColor: `${subject.color}30` }}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${subject.color}25`, border: `2px solid ${subject.color}40` }}>{subject.icon}</div>
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">{subject.name}</h2>
                  <p className="font-bold text-sm mb-3" style={{ color: subject.color }}>{subject.tagline}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{subject.overview}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subject.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="font-black flex-shrink-0 mt-0.5" style={{ color: subject.color }}>→</span>{kp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Topics accordion */}
            <div className="space-y-3">
              {subject.topics.map((topic, ti) => {
                const isOpen = openTopic === ti
                return (
                  <div key={ti} className="rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{ borderColor: isOpen ? `${subject.color}50` : 'rgba(255,255,255,0.08)', background: isOpen ? `${subject.color}08` : 'rgba(255,255,255,0.02)' }}>
                    <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setOpenTopic(isOpen ? null : ti)}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: `${subject.color}20` }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-black text-white">{topic.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{topic.notes.length} concepts</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${subject.color}20`, color: subject.color }}>{topic.notes.length} notes</span>
                      <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/5 divide-y divide-white/5">
                        {topic.notes.map((note, ni) => (
                          <div key={ni} className="px-6 py-4 flex gap-4">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: subject.color }} />
                            <div>
                              <span className="font-black text-white text-sm">{note.term}</span>
                              <span className="text-slate-400 mx-2 text-xs">—</span>
                              <span className="text-slate-300 text-sm leading-relaxed">{note.def}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══════ INTERVIEW Q&A TAB ══════ */}
        {activeTab === 'interview' && (
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-white mb-2">🎯 {subject.name} — Interview Questions</h2>
              <p className="text-slate-500">Top questions asked in FAANG & product company interviews. Click to reveal the answer.</p>
            </div>
            <div className="space-y-4">
              {subject.interviewQs.map((iq, i) => {
                const key = `${subject.id}-${i}`
                const isOpen = openTopic === key
                return (
                  <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ borderColor: isOpen ? `${subject.color}50` : 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                    onClick={() => setOpenTopic(isOpen ? null : key)}>
                    <div className="flex items-start gap-4 p-6">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ backgroundColor: subject.color }}>{i + 1}</div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm leading-relaxed">{iq.q}</p>
                        {isOpen && (
                          <div className="mt-4 p-4 rounded-xl border border-white/5" style={{ background: `${subject.color}10` }}>
                            <p className="text-xs font-black mb-2" style={{ color: subject.color }}>MODEL ANSWER</p>
                            <p className="text-slate-300 text-sm leading-relaxed">{iq.a}</p>
                          </div>
                        )}
                      </div>
                      <span className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* All subjects quick nav */}
            <div className="mt-12 p-6 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Jump to another subject's Q&A</p>
              <div className="flex flex-wrap gap-3">
                {subjects.filter(s => s.id !== activeSubject).map(s => (
                  <button key={s.id} onClick={() => { setActiveSubject(s.id); setOpenTopic(null) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ QUIZ TAB ══════ */}
        {activeTab === 'quiz' && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-white mb-3">🧠 Core Subjects Quiz</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">10 questions across all 4 subjects. Test your fundamentals!</p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['All', ...subjects.map(s => s.short)].map(f => {
                const sub = subjects.find(s => s.short === f)
                return (
                  <button key={f} onClick={() => setQuizFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${quizFilter === f ? 'text-white border-transparent' : 'border-white/10 text-slate-400 hover:text-white'}`}
                    style={quizFilter === f ? { backgroundColor: sub ? sub.color : '#6366f1', borderColor: 'transparent' } : { background: 'rgba(255,255,255,0.04)' }}>
                    {f === 'All' ? '📚 All' : `${subjects.find(s => s.short === f)?.icon} ${f}`}
                  </button>
                )
              })}
            </div>

            {/* Score */}
            {submitted && (
              <div className={`rounded-2xl p-6 mb-8 text-center border ${score >= 8 ? 'border-emerald-500/40' : score >= 5 ? 'border-amber-500/40' : 'border-red-500/40'}`}
                style={{ background: score >= 8 ? 'rgba(16,185,129,0.1)' : score >= 5 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)' }}>
                <p className="text-4xl font-black text-white mb-1">{score >= 8 ? '🎉' : score >= 5 ? '👍' : '📖'} {score} / {quizData.length}</p>
                <p className={`font-bold text-sm ${score >= 8 ? 'text-emerald-400' : score >= 5 ? 'text-amber-400' : 'text-red-400'}`}>
                  {score >= 8 ? 'Excellent! You\'re interview ready!' : score >= 5 ? 'Good — review the wrong answers.' : 'Keep studying the notes above!'}
                </p>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-5">
              {filteredQuiz.map((q, qi) => {
                const realIdx = quizData.indexOf(q)
                const selected = quizAnswers[realIdx]
                const subObj = subjects.find(s => s.short === q.sub)
                return (
                  <div key={realIdx} className={`rounded-2xl border p-6 transition-all ${submitted && selected === q.answer ? 'border-emerald-500/40' : submitted && selected !== undefined && selected !== q.answer ? 'border-red-500/40' : 'border-white/8'}`}
                    style={{ background: submitted && selected === q.answer ? 'rgba(16,185,129,0.07)' : submitted && selected !== undefined && selected !== q.answer ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-start gap-3 mb-5">
                      <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ backgroundColor: subObj?.color || '#6366f1' }}>{realIdx + 1}</span>
                      <div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ background: `${subObj?.color}20`, color: subObj?.color }}>{q.sub}</span>
                        <p className="font-bold text-white mt-1 leading-relaxed">{q.q}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, oi) => {
                        let cls = 'border border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                        let bg = 'rgba(255,255,255,0.04)'
                        if (submitted) {
                          if (oi === q.answer) { cls = 'border border-emerald-500 text-emerald-300'; bg = 'rgba(16,185,129,0.15)' }
                          else if (oi === selected) { cls = 'border border-red-500 text-red-300'; bg = 'rgba(239,68,68,0.15)' }
                          else { cls = 'border border-white/5 text-slate-600'; bg = 'rgba(255,255,255,0.02)' }
                        } else if (selected === oi) {
                          cls = 'border text-white'; bg = `${subObj?.color}25`
                          cls += ` border-[${subObj?.color}]`
                        }
                        return (
                          <button key={oi}
                            onClick={() => !submitted && setQuizAnswers(p => ({ ...p, [realIdx]: oi }))}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${cls} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                            style={{ background: bg, borderColor: !submitted && selected === oi ? subObj?.color : undefined }}>
                            <span className="font-black mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                            {submitted && oi === q.answer && <span className="ml-2 text-emerald-400">✓</span>}
                            {submitted && oi === selected && selected !== q.answer && <span className="ml-2 text-red-400">✗</span>}
                          </button>
                        )
                      })}
                    </div>
                    {submitted && (
                      <div className="mt-4 rounded-xl px-4 py-3 border border-white/5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs font-black mb-1" style={{ color: subObj?.color }}>💡 Explanation</p>
                        <p className="text-slate-300 text-sm">{q.exp}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Submit */}
            <div className="flex justify-center gap-4 mt-10">
              {!submitted ? (
                <button onClick={() => Object.keys(quizAnswers).length > 0 && setSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="font-black px-10 py-4 rounded-2xl text-lg text-white transition-all shadow-lg disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)' }}>
                  Submit Quiz →
                </button>
              ) : (
                <button onClick={() => { setQuizAnswers({}); setSubmitted(false) }}
                  className="font-black px-10 py-4 rounded-2xl text-lg text-white transition-all border border-white/10 hover:border-white/30"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  🔄 Retake Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)' }}>📖</div>
            <span className="text-white font-black text-lg">Core Subjects Hub</span>
          </div>
          <p className="text-slate-600 text-sm mb-4">Master OS, DBMS, CN & OOP — the four pillars every CS interview tests.</p>
          <div className="flex justify-center gap-5 flex-wrap">
            {subjects.map(s => (
              <span key={s.id} className="text-xs font-bold" style={{ color: s.color }}>{s.icon} {s.short}</span>
            ))}
          </div>
          <p className="text-xs text-white md:text-[15px] border-t border-white/5 pt-4 mt-4">
                   © 2026 aiplacprep@gmail.com Core Subjects Hub — Built for CS students and engineers preparing for technical interviews.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default CoreSubjects