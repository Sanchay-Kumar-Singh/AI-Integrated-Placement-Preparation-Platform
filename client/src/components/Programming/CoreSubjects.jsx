import React, { useState } from 'react'
import logo from '../../assets/image.png'
import { useNavigate } from 'react-router-dom'

const subjects = [
  {
    id: 'os',
    name: 'Operating Systems',
    short: 'OS',
    icon: '🖥️',
    color: '#4F46E5',
    lightBg: '#EEF2FF',
    borderColor: '#C7D2FE',
    tagline: 'Process Management, Memory & Concurrency',
    overview: 'An Operating System serves as the foundational layer of software that governs the allocation and management of hardware resources — including the processor, primary memory, secondary storage, and input/output devices. It acts as an intermediary between application programs and computer hardware, ensuring that each program receives the resources it requires while maintaining system stability and security.',
    keyPoints: [
      'Coordinates CPU scheduling, memory allocation, I/O management, and the file system',
      'Enforces process isolation and access control to uphold system security',
      'Manages concurrent execution through well-defined scheduling algorithms',
      'Implements virtual memory via paging and segmentation to extend effective address space',
    ],
    topics: [
      {
        name: 'Processes & Threads',
        icon: '⚙️',
        notes: [
          { term: 'Process', def: 'A process is a program in execution, possessing its own independent address space, stack, heap, and Process Control Block (PCB). It passes through well-defined states: New → Ready → Running → Waiting → Terminated.' },
          { term: 'Thread', def: 'A thread is the smallest unit of execution within a process. Threads belonging to the same process share its code segment, data segment, and operating-system resources, yet each maintains its own register set and execution stack.' },
          { term: 'PCB (Process Control Block)', def: 'The PCB is a kernel data structure that stores all information pertaining to a process: its state, process identifier (PID), program counter, CPU register contents, memory boundaries, and the list of open file descriptors.' },
          { term: 'Context Switch', def: 'A context switch involves saving the entire state of the currently running process into its PCB and loading the saved state of the next scheduled process. This operation constitutes pure system overhead — no productive computation occurs during the transition.' },
          { term: 'Zombie & Orphan Processes', def: 'A zombie process has completed execution but retains an entry in the process table because its parent has not yet invoked wait(). An orphan process is one whose parent terminated before the child; such processes are typically adopted by the init/systemd process.' },
        ],
      },
      {
        name: 'CPU Scheduling',
        icon: '📋',
        notes: [
          { term: 'FCFS (First Come First Served)', def: 'A non-preemptive algorithm that dispatches processes in the order of their arrival. Its simplicity comes at the cost of the convoy effect, wherein short processes queue behind lengthy ones, inflating the average waiting time.' },
          { term: 'SJF (Shortest Job First)', def: 'Selects the process with the smallest CPU burst next, yielding the provably optimal average waiting time among non-preemptive algorithms. Its principal limitation is the requirement to know burst durations in advance. The preemptive variant, Shortest Remaining Time First (SRTF), preempts the running process whenever a shorter job arrives.' },
          { term: 'Round Robin', def: 'Each process is granted a fixed time quantum in rotation. The algorithm is well suited to interactive and time-sharing systems. A large quantum approximates FCFS behaviour; an excessively small quantum increases context-switch overhead disproportionately.' },
          { term: 'Priority Scheduling', def: 'The processor is allocated to the highest-priority ready process. A fundamental hazard is starvation — low-priority processes may be indefinitely deferred. The standard remedy is aging, a technique that gradually elevates the priority of long-waiting processes.' },
          { term: 'Multilevel Queue', def: 'The ready queue is partitioned into multiple sub-queues, typically foreground (interactive) and background (batch). Each queue enforces its own scheduling policy. Processes are permanently assigned to a queue and do not migrate between levels.' },
        ],
      },
      {
        name: 'Deadlocks',
        icon: '🔒',
        notes: [
          { term: 'Necessary Conditions for Deadlock', def: 'Four conditions must hold simultaneously: Mutual Exclusion (resources are non-shareable), Hold and Wait (processes hold resources while awaiting others), No Preemption (resources cannot be forcibly reclaimed), and Circular Wait (a cyclic chain of processes each awaiting a resource held by the next). Negating any single condition is sufficient to prevent deadlock.' },
          { term: "Banker's Algorithm", def: "A deadlock-avoidance algorithm that consults three matrices — Need, Allocation, and Available — before granting any resource request. It checks whether the resulting state is safe, meaning a sequential ordering of processes exists such that each can obtain its remaining needs and run to completion." },
          { term: 'Deadlock Detection', def: 'The system constructs a Resource Allocation Graph (RAG). In a single-instance environment, a cycle in the RAG confirms deadlock. With multiple instances per resource type, a dedicated detection algorithm — analogous to the Banker\'s Algorithm — is applied.' },
          { term: 'Recovery Strategies', def: 'Recovery proceeds by either process termination (aborting one or all deadlocked processes) or resource preemption (forcibly reclaiming resources from selected victims and rolling their state back to a safe checkpoint).' },
        ],
      },
      {
        name: 'Memory Management',
        icon: '💾',
        notes: [
          { term: 'Paging', def: 'Physical memory is divided into fixed-size frames; logical memory is divided into pages of equal size. Address translation is performed via a page table. Paging eliminates external fragmentation entirely, though internal fragmentation may occur when a process does not fully utilise its final page.' },
          { term: 'Segmentation', def: 'Memory is partitioned into variable-length segments reflecting the logical structure of a program — code, stack, heap, and data. A segment table stores the base address and length limit of each segment. Segmentation is susceptible to external fragmentation as segments of differing sizes are loaded and removed.' },
          { term: 'Virtual Memory', def: 'Virtual memory permits a process to execute even when only a portion of it resides in physical memory, using secondary storage as an extension. Demand paging loads pages only upon reference; a page fault signals the OS to fetch the required page from disk.' },
          { term: 'Page Replacement Algorithms', def: 'FIFO is straightforward but suffers from Bélády\'s anomaly. The Optimal algorithm yields the minimum page-fault rate but is not implementable in practice. LRU (Least Recently Used) replaces the page unused for the longest time and offers the best practical performance. The Clock algorithm approximates LRU with lower overhead.' },
          { term: 'Thrashing', def: 'Thrashing occurs when the OS devotes a greater proportion of CPU time to paging activity than to productive process execution. It typically arises from an excessive degree of multiprogramming. Effective countermeasures include the Working Set Model and the Page Fault Frequency (PFF) algorithm.' },
        ],
      },
      {
        name: 'Synchronisation',
        icon: '🔄',
        notes: [
          { term: 'Race Condition', def: 'A race condition arises when multiple processes access and manipulate shared data concurrently and the final outcome is contingent upon the relative timing of their execution. Synchronisation mechanisms are required to ensure deterministic behaviour.' },
          { term: 'Critical Section', def: 'A critical section is a segment of code that accesses shared resources and must not be executed by more than one process simultaneously. A correct solution must satisfy three properties: Mutual Exclusion, Progress, and Bounded Waiting.' },
          { term: 'Mutex vs. Semaphore', def: 'A mutex is a binary locking primitive that is owned by the thread which acquires it; only the owner may release it. A semaphore is a generalised integer counter that can exceed one, making it suitable for managing a pool of identical resources. A mutex is effectively a binary semaphore with ownership semantics.' },
          { term: 'Producer–Consumer Problem', def: 'A canonical synchronisation problem resolved using two semaphores — full (tracking items available for consumption) and empty (tracking available buffer slots) — together with a mutex to protect the critical section during buffer access.' },
          { term: 'Readers–Writers Problem', def: 'Multiple readers may access a shared resource concurrently, whereas writers require exclusive access. The first variant grants preference to readers; the second to writers; the third imposes no priority, aiming for fairness to both classes.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What is the distinction between a process and a thread?', a: 'A process has an independent memory space and its own system resources; creating a process is relatively expensive. Threads exist within a process and share its address space, code, and data, making their creation and context-switching far lighter. Processes offer stronger isolation; threads offer lower overhead and simpler communication, at the cost of requiring explicit synchronisation.' },
      { q: 'Explain deadlock and state its necessary conditions.', a: 'Deadlock is a condition in which a set of processes is permanently blocked, each waiting to acquire a resource held by another in the set. The four necessary conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. All four must hold concurrently for deadlock to occur; eliminating any one of them is sufficient for prevention.' },
      { q: 'What is virtual memory, and why is it used?', a: 'Virtual memory is a memory management technique that presents processes with an address space larger than the available physical RAM, using disk storage as a transparent extension. It enables process isolation, memory protection, and more efficient utilisation of physical memory by keeping only actively referenced pages resident.' },
      { q: 'What is thrashing, and how can it be prevented?', a: 'Thrashing occurs when the OS spends more time swapping pages in and out of memory than executing process instructions, resulting in negligible CPU utilisation. It is prevented through the Working Set Model (which ensures each process has its working set resident), the Page Fault Frequency algorithm, or by reducing the degree of multiprogramming.' },
      { q: 'What is the difference between a mutex and a semaphore?', a: 'A mutex is a binary lock with ownership: only the acquiring thread may release it, making it suitable for enforcing mutual exclusion. A semaphore is a counting synchronisation primitive without ownership; any thread may signal it. Semaphores are additionally used for signalling between threads, whereas mutexes are strictly for locking.' },
    ],
  },
  {
    id: 'dbms',
    name: 'Database Management',
    short: 'DBMS',
    icon: '🗄️',
    color: '#059669',
    lightBg: '#ECFDF5',
    borderColor: '#A7F3D0',
    tagline: 'SQL, Transactions & Query Optimisation',
    overview: 'A Database Management System is software that provides a structured, reliable means of storing, retrieving, and manipulating data. It enforces data integrity through constraints and transactions, manages concurrent access from multiple users, provides security mechanisms, and abstracts the physical storage details from application developers.',
    keyPoints: [
      'ACID properties guarantee the reliability and correctness of transactions',
      'Normalisation systematically eliminates data redundancy and update anomalies',
      'Indexing structures — particularly B-trees — dramatically accelerate query execution',
      'Concurrency control protocols prevent anomalies arising from simultaneous data access',
    ],
    topics: [
      {
        name: 'ACID Properties',
        icon: '⚗️',
        notes: [
          { term: 'Atomicity', def: 'A transaction is treated as a single indivisible unit: either all of its operations are committed to the database, or none are. The transaction manager enforces this property using undo logs, which permit complete rollback upon failure.' },
          { term: 'Consistency', def: 'A transaction must transition the database from one valid state to another, preserving all defined integrity constraints, rules, and triggers both before execution begins and after it concludes.' },
          { term: 'Isolation', def: 'Concurrently executing transactions must produce results as though they had executed serially. SQL defines four isolation levels with progressively stronger guarantees: Read Uncommitted, Read Committed, Repeatable Read, and Serializable.' },
          { term: 'Durability', def: 'Once a transaction has been committed, its changes are permanent and will survive subsequent system failures. Durability is implemented through write-ahead logging (WAL), in which log records are flushed to durable storage before the corresponding data pages are written.' },
        ],
      },
      {
        name: 'Normalisation',
        icon: '📐',
        notes: [
          { term: 'First Normal Form (1NF)', def: 'A relation is in 1NF if every attribute contains only atomic (indivisible) values, there are no repeating groups, all column names are distinct, and each row is uniquely identifiable.' },
          { term: 'Second Normal Form (2NF)', def: 'A relation is in 2NF if it satisfies 1NF and every non-key attribute is fully functionally dependent on the entire primary key — that is, no non-key attribute depends on a proper subset of a composite key (no partial dependencies).' },
          { term: 'Third Normal Form (3NF)', def: 'A relation is in 3NF if it satisfies 2NF and no non-key attribute is transitively dependent on the primary key — meaning every non-key attribute depends directly on the primary key and on nothing else.' },
          { term: 'Boyce–Codd Normal Form (BCNF)', def: 'BCNF is a stricter refinement of 3NF. For every non-trivial functional dependency X → Y, X must be a superkey. BCNF resolves certain anomalies involving overlapping candidate keys that 3NF may leave unaddressed.' },
          { term: 'Denormalisation', def: 'The deliberate introduction of controlled redundancy into a normalised schema in order to improve read performance. It reduces the number of JOIN operations required by queries, at the expense of increased storage and the risk of update anomalies.' },
        ],
      },
      {
        name: 'Indexing & Query Optimisation',
        icon: '⚡',
        notes: [
          { term: 'B-Tree Index', def: 'A self-balancing tree structure that maintains data in sorted order and supports efficient equality and range queries. Search, insertion, and deletion all operate in O(log n) time. B-tree indexes are the default index type in the majority of relational database systems.' },
          { term: 'Hash Index', def: 'Applies a hash function to the indexed key to locate entries in O(1) expected time. Hash indexes support only equality predicates; they cannot serve range queries. They are most appropriate for high-cardinality columns used exclusively in equality comparisons.' },
          { term: 'Clustered Index', def: 'The physical order of rows in the table corresponds to the order of the index key. A table may have at most one clustered index. The primary key is typically clustered by default. Range scans benefit significantly from clustering because rows are physically contiguous on disk.' },
          { term: 'Composite Index', def: 'An index defined on two or more columns. For a query to utilise a composite index, the query predicate must reference the leftmost prefix of the indexed columns. The ordering of columns in the index definition is therefore critical to its applicability and effectiveness.' },
          { term: 'EXPLAIN / Query Execution Plan', def: 'A diagnostic command that instructs the database to describe how it intends to execute a given query, revealing whether indexes are used, what join strategies are chosen, and the estimated number of rows examined. Query execution plan analysis is the primary tool for identifying and resolving performance bottlenecks.' },
        ],
      },
      {
        name: 'Transactions & Concurrency',
        icon: '🔀',
        notes: [
          { term: 'Dirty Read', def: 'A dirty read occurs when a transaction reads data that has been written by a concurrent transaction which has not yet committed. If the writing transaction subsequently rolls back, the reading transaction will have operated on data that was never permanently stored. Read Committed isolation prevents this anomaly.' },
          { term: 'Non-Repeatable Read', def: 'A non-repeatable read occurs when a transaction reads the same row on two separate occasions and obtains different values, because a concurrent transaction modified and committed that row between the two reads. Repeatable Read isolation eliminates this anomaly.' },
          { term: 'Phantom Read', def: 'A phantom read occurs when a transaction executes the same query twice and the second execution returns a different set of rows, because a concurrent transaction has inserted or deleted rows that satisfy the query predicate in the interim. Serializable isolation is required to prevent phantom reads.' },
          { term: 'Two-Phase Locking (2PL)', def: 'A concurrency control protocol consisting of a growing phase, during which locks are acquired but never released, followed by a shrinking phase, during which locks are released but no new locks are acquired. Strict 2PL defers all lock releases until the transaction commits, thereby preventing cascading rollback.' },
          { term: 'MVCC (Multi-Version Concurrency Control)', def: 'A concurrency control scheme in which the database maintains multiple versions of data rows. Readers access a snapshot of the data as it existed at the start of their transaction, allowing reads to proceed without blocking concurrent writes. PostgreSQL and MySQL InnoDB both implement MVCC.' },
        ],
      },
      {
        name: 'SQL Essentials',
        icon: '📝',
        notes: [
          { term: 'JOIN Types', def: 'INNER JOIN returns only rows for which matching values exist in both tables. LEFT JOIN returns all rows from the left table with matched rows from the right (NULL where no match). RIGHT JOIN is the mirror image. FULL OUTER JOIN returns all rows from both tables. CROSS JOIN produces the Cartesian product.' },
          { term: 'Aggregate Functions', def: 'COUNT, SUM, AVG, MIN, and MAX operate over groups of rows. They are used in conjunction with GROUP BY. The HAVING clause filters groups based on aggregate values — analogous to WHERE for individual rows. Column aliases defined in the SELECT list may not be referenced within HAVING.' },
          { term: 'Window Functions', def: 'Functions such as ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), and SUM() OVER() perform computations across a set of rows related to the current row without collapsing them into a single output row, unlike aggregate functions.' },
          { term: 'Subqueries', def: 'A correlated subquery references columns from the outer query and is evaluated once per row of the outer result set. A derived table is a subquery appearing in the FROM clause. EXISTS evaluates to true upon finding the first matching row and halts further evaluation, making it more efficient than IN when the inner result is large.' },
          { term: 'Index Management', def: 'Indexes are created with CREATE INDEX idx_name ON table(column) and removed with DROP INDEX. Composite indexes are defined over multiple columns. A unique index enforces the constraint that the indexed column values are distinct across all rows.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What are the ACID properties, and why are they important?', a: 'ACID stands for Atomicity (a transaction is all-or-nothing), Consistency (it transitions the database between valid states), Isolation (concurrent transactions appear to execute serially), and Durability (committed changes persist through failures). These properties are fundamental to systems where correctness of data — such as financial records or inventory — is non-negotiable.' },
      { q: 'Explain the difference between WHERE and HAVING.', a: 'WHERE filters individual rows before any grouping takes place and cannot reference aggregate functions. HAVING filters the groups produced by GROUP BY, and may reference aggregate expressions. In execution order, WHERE is applied first, then grouping, then HAVING.' },
      { q: 'What is database normalisation? Describe 1NF, 2NF, and 3NF.', a: '1NF requires atomic values and no repeating groups. 2NF additionally eliminates partial dependencies on a composite primary key. 3NF eliminates transitive dependencies, ensuring non-key attributes depend solely on the primary key. The overarching objective is to reduce redundancy and eliminate insert, update, and delete anomalies.' },
      { q: 'What is the difference between a clustered and a non-clustered index?', a: 'A clustered index determines the physical storage order of rows in the table and therefore only one may exist per table. A non-clustered index is a separate structure containing the index key values and row pointers; multiple non-clustered indexes may be defined on a single table. The primary key is clustered by default in most systems.' },
      { q: 'What is a deadlock in a DBMS context, and how is it resolved?', a: 'A database deadlock occurs when two or more transactions each hold a lock and await a lock held by another, forming a circular dependency from which no transaction can proceed. It is detected using a wait-for graph; a cycle indicates deadlock. Resolution involves selecting a victim transaction — typically the one with the lowest cost to abort — rolling it back, and releasing its locks.' },
    ],
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    short: 'CN',
    icon: '🌐',
    color: '#B45309',
    lightBg: '#FFFBEB',
    borderColor: '#FDE68A',
    tagline: 'Protocols, TCP/IP & Network Security',
    overview: 'Computer networking encompasses the principles and protocols governing the communication of data between devices. A thorough understanding of networking fundamentals — spanning physical transmission, logical addressing, transport-layer reliability, and application-layer protocols — is indispensable for backend development, distributed systems design, and technical interviews.',
    keyPoints: [
      'The OSI and TCP/IP models provide structured frameworks for understanding network communication',
      'TCP furnishes reliable, ordered delivery; UDP prioritises throughput and low latency',
      'HTTP and HTTPS underpin the Web; REST APIs leverage standard HTTP semantics',
      'DNS resolves human-readable domain names to numerical IP addresses',
    ],
    topics: [
      {
        name: 'OSI & TCP/IP Models',
        icon: '📚',
        notes: [
          { term: 'OSI 7-Layer Model', def: 'Seven layers, from lowest to highest: Physical, Data Link, Network, Transport, Session, Presentation, Application. The mnemonic "Please Do Not Throw Sausage Pizza Away" aids recall. Each layer provides services to the layer above and relies on the layer below.' },
          { term: 'TCP/IP Model', def: 'A four-layer practical model: Network Access (combining Physical and Data Link), Internet (IP routing), Transport (TCP/UDP), and Application (HTTP, DNS, FTP, SMTP). This model reflects the architecture of the actual Internet and supersedes the OSI model in practical deployment.' },
          { term: 'Data Link Layer', def: 'Responsible for framing, MAC addressing, error detection via CRC, and local flow control. Key protocols include Ethernet and IEEE 802.11 (Wi-Fi). Network switches make forwarding decisions at this layer based on MAC addresses.' },
          { term: 'Network Layer', def: 'Provides logical (IP) addressing, inter-network routing, and packet fragmentation. Routers operate at this layer. The primary protocols are IPv4 (32-bit addresses), IPv6 (128-bit addresses), ICMP (error reporting), and ARP (IP-to-MAC resolution).' },
          { term: 'Transport Layer', def: 'Delivers end-to-end communication between processes, identified by port numbers. TCP offers reliable, connection-oriented, ordered delivery with flow and congestion control. UDP is connectionless and unreliable, offering minimal overhead for latency-sensitive applications.' },
        ],
      },
      {
        name: 'TCP vs. UDP',
        icon: '🔁',
        notes: [
          { term: 'TCP Three-Way Handshake', def: 'Connection establishment proceeds in three steps: the client transmits a SYN segment with its Initial Sequence Number (ISN); the server replies with a SYN-ACK acknowledging the client\'s ISN and supplying its own; the client completes with an ACK. Termination requires a separate four-way FIN/ACK exchange.' },
          { term: 'TCP Reliability Features', def: 'TCP guarantees reliable delivery through sequence numbers and cumulative acknowledgements with retransmission. It enforces ordering by buffering out-of-order segments. Flow control uses a sliding receive window; congestion control employs the Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery algorithms.' },
          { term: 'UDP Characteristics', def: 'UDP is a minimal transport protocol with no connection establishment, no acknowledgement, no sequencing, and no congestion control. Its low overhead makes it the protocol of choice for applications where timeliness outweighs reliability: DNS lookups, DHCP, live video streaming, VoIP, and online gaming.' },
          { term: 'TCP Congestion Control', def: 'Slow Start doubles the congestion window (cwnd) each round-trip time until a threshold is reached. Congestion Avoidance then increments cwnd by one segment per RTT. On receiving three duplicate ACKs, Fast Retransmit is triggered. Fast Recovery avoids returning to Slow Start after a single loss event.' },
        ],
      },
      {
        name: 'HTTP & Web Protocols',
        icon: '🌍',
        notes: [
          { term: 'HTTP Methods', def: 'GET retrieves a resource (safe, idempotent). POST submits data to create a resource. PUT replaces a resource entirely (idempotent). PATCH applies a partial update. DELETE removes a resource (idempotent). HEAD retrieves headers only. OPTIONS advertises supported methods. Safe methods produce no side effects.' },
          { term: 'HTTP Status Codes', def: '1xx codes are informational. 2xx codes indicate success: 200 OK, 201 Created, 204 No Content. 3xx codes indicate redirection: 301 Moved Permanently, 302 Found. 4xx codes indicate client errors: 400 Bad Request, 401 Unauthorised, 403 Forbidden, 404 Not Found. 5xx codes indicate server errors: 500, 502, 503.' },
          { term: 'HTTP/1.1 vs. HTTP/2', def: 'HTTP/2 introduces multiplexing, allowing multiple concurrent request/response exchanges over a single TCP connection, eliminating head-of-line blocking at the HTTP layer. It also provides header compression via HPACK, server push, and a binary framing layer, collectively reducing latency and improving throughput.' },
          { term: 'HTTPS & TLS', def: 'HTTPS is HTTP transported over a TLS-encrypted channel, operating on port 443. The TLS handshake negotiates a cipher suite, authenticates the server\'s certificate, and establishes session keys via an asymmetric key exchange (e.g., ECDHE). Subsequent data is encrypted symmetrically (typically AES) and integrity-protected with a MAC.' },
          { term: 'REST API Design Principles', def: 'REST mandates a stateless client–server architecture with uniform resource identification via URLs, appropriate use of HTTP verbs, standard status codes in responses, versioning (e.g., /v1/), JSON as the predominant data format, and support for pagination and rate limiting for scalable APIs.' },
        ],
      },
      {
        name: 'DNS & IP Addressing',
        icon: '🗺️',
        notes: [
          { term: 'DNS Resolution Process', def: 'Name resolution proceeds hierarchically: the client queries its local OS cache, then a recursive resolver, which in turn queries a Root Name Server to obtain the TLD name server address, then the TLD server to obtain the authoritative name server, and finally the authoritative server to obtain the IP address. Responses are cached according to each record\'s Time to Live (TTL). DNS uses UDP on port 53.' },
          { term: 'IP Addressing & Subnetting', def: 'IPv4 addresses are 32-bit values expressed in dotted-decimal notation, partitioned into network and host portions by a subnet mask expressed in CIDR notation. Private address ranges — 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 — are not globally routable; Network Address Translation (NAT) maps them to public addresses.' },
          { term: 'ARP (Address Resolution Protocol)', def: 'ARP resolves a known IPv4 address to its corresponding MAC address on the local network segment. The requesting host broadcasts an ARP request; the host owning the target IP responds with its MAC address. The mapping is cached in the ARP table to avoid repeated broadcasts.' },
          { term: 'DHCP', def: 'The Dynamic Host Configuration Protocol automatically assigns network configuration parameters — IP address, subnet mask, default gateway, and DNS server addresses — to hosts using a four-message exchange: DISCOVER → OFFER → REQUEST → ACK, conducted over UDP (client port 68, server port 67).' },
        ],
      },
      {
        name: 'Network Security',
        icon: '🛡️',
        notes: [
          { term: 'Firewalls', def: 'A packet-filtering firewall is stateless and inspects each packet independently against a rule set based on IP addresses and port numbers. A stateful inspection firewall tracks the state of active connections and validates packets in their connection context. An application-layer gateway performs deep packet inspection, operating at Layer 7.' },
          { term: 'Common Attack Vectors', def: 'Distributed Denial of Service (DDoS): flooding a target with traffic to exhaust resources. Man-in-the-Middle (MITM): intercepting communication between two parties. SQL Injection: embedding malicious SQL within input fields. Cross-Site Scripting (XSS): injecting client-side scripts into web pages. Cross-Site Request Forgery (CSRF): inducing authenticated users to submit unintended requests.' },
          { term: 'Cryptographic Foundations', def: 'Symmetric-key cryptography (AES, 3DES) uses a single shared key for both encryption and decryption; it is fast but requires a secure key-exchange mechanism. Asymmetric cryptography (RSA, ECC) uses a public key for encryption and a private key for decryption. In practice, hybrid schemes use asymmetric cryptography to exchange a symmetric session key.' },
          { term: 'Virtual Private Networks (VPN)', def: 'A VPN establishes an encrypted tunnel over an untrusted network, providing confidentiality and integrity for traffic traversing the public Internet. Common protocols include IPsec (providing transport- or tunnel-mode encryption), OpenVPN, and WireGuard. VPNs may be configured as site-to-site (connecting networks) or remote-access (connecting individual clients).' },
        ],
      },
    ],
    interviewQs: [
      { q: 'Describe the TCP three-way handshake.', a: 'The client initiates connection by transmitting a SYN segment containing its Initial Sequence Number. The server acknowledges with a SYN-ACK segment, confirming the client\'s ISN and supplying its own. The client completes the handshake with an ACK. This exchange synchronises sequence numbers and confirms bidirectional reachability before any data is exchanged.' },
      { q: 'Walk through what happens when a URL is entered in a browser.', a: 'The browser resolves the domain via DNS (checking local cache, OS cache, and recursively querying name servers). It then establishes a TCP connection (three-way handshake) to the resolved IP on port 80 or 443. If HTTPS, a TLS handshake follows. The browser transmits an HTTP request; the server processes it and returns an HTTP response. The browser parses the HTML, fetches referenced assets, constructs the DOM and CSSOM, and renders the page.' },
      { q: 'Compare TCP and UDP. When should each be used?', a: 'TCP provides reliable, ordered, connection-oriented delivery with flow and congestion control — appropriate for applications requiring data integrity such as web browsing, email, and file transfer. UDP is connectionless and unreliable, offering minimal latency overhead — suitable for real-time applications such as video streaming, VoIP, online gaming, and DNS, where occasional data loss is acceptable.' },
      { q: 'What distinguishes HTTP from HTTPS?', a: 'HTTPS layers HTTP on top of a TLS-encrypted connection. TLS ensures confidentiality (data is encrypted in transit), authentication (the server\'s identity is verified via a certificate signed by a trusted authority), and integrity (data cannot be silently tampered with). HTTPS operates on port 443, whereas plain HTTP uses port 80.' },
      { q: 'What is DNS, and how does name resolution work?', a: 'DNS (Domain Name System) is a distributed, hierarchical naming system that maps human-readable domain names to IP addresses. Resolution proceeds from the client\'s local cache through the OS cache to a recursive resolver, which queries the Root, TLD, and authoritative name servers in succession until the IP address is obtained. Responses are cached per their TTL to reduce latency on repeated queries.' },
    ],
  },
  {
    id: 'oop',
    name: 'OOP Concepts',
    short: 'OOP',
    icon: '🧩',
    color: '#9D174D',
    lightBg: '#FFF1F2',
    borderColor: '#FECDD3',
    tagline: 'Pillars, SOLID Principles & Design Patterns',
    overview: 'Object-Oriented Programming (OOP) is a paradigm that organises software around objects — self-contained entities encapsulating both state (data) and behaviour (methods). OOP principles guide the creation of software that is modular, maintainable, extensible, and reusable, and they form the conceptual foundation of most modern programming languages and frameworks.',
    keyPoints: [
      'The four pillars — Encapsulation, Inheritance, Polymorphism, and Abstraction — define the OOP paradigm',
      'The SOLID principles provide actionable guidance for robust, maintainable object-oriented design',
      'Design patterns are established, reusable solutions to recurring design problems',
      'Composition is frequently preferred over inheritance for its greater flexibility',
    ],
    topics: [
      {
        name: 'The Four Pillars',
        icon: '🏛️',
        notes: [
          { term: 'Encapsulation', def: 'Encapsulation is the practice of bundling an object\'s state (fields) and behaviour (methods) together within a class, while restricting direct access to internal data through access modifiers. Interaction with the object\'s state occurs exclusively through a defined public interface (getters and setters). This promotes data integrity, reduces coupling, and simplifies maintenance.' },
          { term: 'Abstraction', def: 'Abstraction conceals the complexity of an implementation behind a simplified interface, exposing only those details necessary for the consumer. It is realised through abstract classes and interfaces, and its effect is to reduce the cognitive burden on the programmer using the component — they need to understand what the component does, not how it does it.' },
          { term: 'Inheritance', def: 'Inheritance enables a child (derived) class to acquire the properties and behaviours of a parent (base) class, promoting code reuse and establishing an "is-a" relationship. Java supports single and multilevel inheritance of classes, and multiple inheritance through interfaces. The extends keyword denotes class inheritance; implements denotes interface realisation.' },
          { term: 'Polymorphism', def: 'Polymorphism permits a single interface to represent entities of different underlying types. Compile-time (static) polymorphism is achieved through method overloading — multiple methods share a name but differ in parameter type or arity. Runtime (dynamic) polymorphism is achieved through method overriding, where a subclass provides a specialised implementation of an inherited method, resolved via virtual dispatch.' },
        ],
      },
      {
        name: 'SOLID Principles',
        icon: '🏗️',
        notes: [
          { term: 'S — Single Responsibility Principle', def: 'A class should encapsulate a single, well-defined responsibility and therefore have only one reason to change. Mixing concerns — such as business logic, data persistence, and presentation — within a single class increases coupling and makes the class harder to test, modify, and reason about.' },
          { term: 'O — Open/Closed Principle', def: 'Software entities should be open for extension but closed for modification. New behaviour should be introduced by adding new code (through interfaces, abstract classes, or composition) rather than altering existing, tested code, thereby reducing the risk of regression.' },
          { term: 'L — Liskov Substitution Principle', def: 'If S is a subtype of T, then objects of type T in a program may be replaced by objects of type S without altering the correctness of the program. A classic violation is a Square class that extends Rectangle but overrides setWidth and setHeight in a manner that breaks the invariants expected of a Rectangle.' },
          { term: 'I — Interface Segregation Principle', def: 'Clients should not be forced to depend upon interfaces they do not use. Large, general-purpose interfaces should be decomposed into smaller, role-specific ones. This prevents classes from being burdened with implementing methods irrelevant to their purpose.' },
          { term: 'D — Dependency Inversion Principle', def: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions. Dependency Injection is the primary mechanism for implementing this principle, and it underlies the design of frameworks such as Spring.' },
        ],
      },
      {
        name: 'Design Patterns',
        icon: '🎨',
        notes: [
          { term: 'Singleton Pattern', def: 'The Singleton pattern restricts instantiation of a class to a single instance and provides a global access point to it. Thread-safe implementations use double-checked locking or the static inner class (holder) idiom. It is commonly applied to database connection pools, configuration managers, and logging facilities.' },
          { term: 'Factory Method Pattern', def: 'The Factory Method defines an interface for creating an object but delegates the decision of which concrete class to instantiate to subclasses. This decouples the client code from the specific implementation classes it creates, favouring the Open/Closed Principle.' },
          { term: 'Observer Pattern', def: 'The Observer pattern defines a one-to-many dependency between objects such that when the subject changes state, all registered observers are notified and updated automatically. It is the foundational pattern for event-driven systems, the Model-View relationship in MVC, and reactive programming frameworks.' },
          { term: 'Strategy Pattern', def: 'The Strategy pattern defines a family of interchangeable algorithms, encapsulates each one, and makes them substitutable at runtime. It eliminates conditional branching (if-else or switch statements) that would otherwise be required to select behaviour, and is commonly used for sorting comparators, payment processing, and routing logic.' },
          { term: 'Decorator Pattern', def: 'The Decorator pattern dynamically adds responsibilities to an object without modifying its class or any of its subclasses. It provides a flexible alternative to subclassing for extending functionality. Java\'s I/O streams (BufferedInputStream wrapping FileInputStream, for example) are the canonical illustration of this pattern.' },
        ],
      },
      {
        name: 'Key OOP Concepts',
        icon: '🔑',
        notes: [
          { term: 'Abstract Class vs. Interface', def: 'An abstract class may contain both concrete and abstract method implementations, instance variables, and constructors; a class may extend only one abstract class. An interface is a pure behavioural contract (Java 8 introduced default and static methods); it carries no state and may be implemented by any number of classes. A class may implement multiple interfaces simultaneously.' },
          { term: 'Composition over Inheritance', def: 'The Gang of Four advised favouring object composition over class inheritance. Composition (a "has-a" relationship) assembles objects with complementary responsibilities at runtime, yielding greater flexibility and avoiding the fragile base class problem inherent in deep inheritance hierarchies. Inheritance (an "is-a" relationship) is appropriate when a genuine taxonomic relationship exists.' },
          { term: 'Method Overloading vs. Overriding', def: 'Overloading allows multiple methods within the same class to share a name, provided they differ in the number or type of parameters; the correct method is selected at compile time (static binding). Overriding allows a subclass to provide a specialised implementation of a method declared in its superclass; the correct method is selected at runtime (dynamic binding) through virtual dispatch.' },
          { term: 'Constructor Chaining', def: 'Constructor chaining allows one constructor to delegate to another within the same class (using this()) or to the parent class constructor (using super()). The delegation call must appear as the first statement in the constructor body. This technique reduces code duplication when multiple constructors share common initialisation logic.' },
          { term: 'Covariant Return Types', def: 'Java 5 introduced covariant return types, permitting an overriding method in a subclass to declare a return type that is a subtype of the return type declared in the parent method. This allows clients of the subclass to receive a more specific type without an explicit cast, improving type safety and readability.' },
        ],
      },
    ],
    interviewQs: [
      { q: 'What are the four pillars of OOP? Describe each briefly.', a: 'Encapsulation bundles data and methods within a class and restricts direct access to internal state. Abstraction hides implementation complexity, exposing only a necessary interface. Inheritance allows a derived class to reuse and extend the behaviour of a base class. Polymorphism enables a single interface to represent multiple concrete forms — realised through method overloading at compile time and method overriding at runtime.' },
      { q: 'Explain the SOLID principles with examples.', a: 'Single Responsibility: a class handles one concern only. Open/Closed: new behaviour is added via extension, not modification. Liskov Substitution: subtypes must be safely substitutable for their base type without breaking program correctness. Interface Segregation: clients should not be forced to depend on methods they do not use. Dependency Inversion: high-level and low-level modules should both depend on abstractions — the foundation of Dependency Injection in Spring.' },
      { q: 'What is the difference between an abstract class and an interface?', a: 'An abstract class may provide method implementations, hold instance variables, and define constructors; a class may inherit from only one abstract class. An interface defines a behavioural contract with no instance state (Java 8 permits default method implementations); a class may implement multiple interfaces. When multiple inheritance of behaviour is required, interfaces are the appropriate mechanism.' },
      { q: 'Describe the Singleton, Observer, and Factory patterns.', a: 'Singleton ensures that a class has exactly one instance and provides a global access point — applied to connection pools and configuration objects. Observer establishes a publish/subscribe relationship in which a subject notifies registered observers of state changes — the basis of event systems and MVC. Factory Method defers instantiation of concrete objects to subclasses, decoupling creation from use.' },
      { q: 'What is the difference between method overloading and method overriding?', a: 'Overloading occurs within a single class: multiple methods share a name but differ in parameter type or count. The compiler selects the appropriate method at compile time (static/early binding). Overriding occurs between a parent and child class: the child provides a specialised implementation of an inherited method. The JVM resolves the call at runtime through virtual dispatch (dynamic/late binding).' },
    ],
  },
]

// Quiz data keyed by subject id for per-topic isolation
const quizDataBySubject = {
  os: [
    { q: 'Which scheduling algorithm achieves the minimum average waiting time?', options: ['FCFS', 'Round Robin', 'SJF', 'Priority Scheduling'], answer: 2, exp: 'SJF (Shortest Job First) is provably optimal for minimising average waiting time among non-preemptive scheduling algorithms.' },
    { q: 'Which condition, if negated, is sufficient to prevent deadlock?', options: ['Hold & Wait', 'Mutual Exclusion', 'Circular Wait', 'Any of the four conditions'], answer: 3, exp: 'Deadlock requires all four conditions simultaneously. Eliminating any single condition — Mutual Exclusion, Hold & Wait, No Preemption, or Circular Wait — is sufficient for prevention.' },
    { q: 'What does LRU stand for in the context of page replacement?', options: ['Least Recently Used', 'Last Recently Updated', 'Least Requested Unit', 'Last Run Unit'], answer: 0, exp: 'LRU stands for Least Recently Used. It replaces the page that has not been referenced for the longest period and is considered the best practical page-replacement algorithm.' },
  ],
  dbms: [
    { q: 'Which SQL clause is used to filter groups after a GROUP BY operation?', options: ['WHERE', 'FILTER', 'HAVING', 'CONDITION'], answer: 2, exp: 'HAVING filters the groups produced by GROUP BY. WHERE filters individual rows before grouping and cannot reference aggregate functions.' },
    { q: 'What anomaly does BCNF address that 3NF may leave unresolved?', options: ['Partial dependency', 'Transitive dependency', 'Overlapping candidate keys', 'Multi-valued dependency'], answer: 2, exp: 'BCNF handles functional dependency anomalies arising from overlapping candidate keys that 3NF does not detect. For every FD X→Y in BCNF, X must be a superkey.' },
    { q: 'Which isolation anomaly does MVCC prevent by default in PostgreSQL?', options: ['Phantom Reads', 'Dirty Reads', 'Serialisation Failures', 'Lost Updates'], answer: 1, exp: 'MVCC prevents dirty reads (and non-repeatable reads) by providing each transaction a snapshot of committed data. Phantom reads may still occur below Serializable isolation level.' },
  ],
  cn: [
    { q: 'What is the correct sequence of the TCP three-way handshake?', options: ['SYN → ACK → SYN-ACK', 'SYN → SYN-ACK → ACK', 'ACK → SYN → SYN-ACK', 'SYN-ACK → SYN → ACK'], answer: 1, exp: 'The three-way handshake proceeds: client sends SYN, server replies with SYN-ACK, client confirms with ACK. This synchronises sequence numbers and establishes the connection.' },
    { q: 'At which OSI layer does a router operate?', options: ['Data Link (Layer 2)', 'Network (Layer 3)', 'Transport (Layer 4)', 'Physical (Layer 1)'], answer: 1, exp: 'Routers operate at Layer 3 (Network), making forwarding decisions based on IP addresses. Switches operate at Layer 2 using MAC addresses.' },
    { q: 'Which protocol is used by DNS for name resolution queries?', options: ['TCP', 'UDP', 'HTTP', 'ICMP'], answer: 1, exp: 'DNS primarily uses UDP on port 53 for standard resolution queries because of its low overhead. TCP is used for zone transfers and when responses exceed 512 bytes.' },
  ],
  oop: [
    { q: 'Which OOP concept permits multiple methods in the same class to share a name?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], answer: 1, exp: 'Polymorphism — specifically compile-time polymorphism through method overloading — allows the same method name to be reused with different parameter signatures within a class.' },
    { q: 'Which SOLID principle states that a class should have only one reason to change?', options: ['Open/Closed Principle', 'Liskov Substitution Principle', 'Single Responsibility Principle', 'Interface Segregation Principle'], answer: 2, exp: 'The Single Responsibility Principle (SRP) stipulates that each class should encapsulate a single responsibility and therefore have only one reason to change.' },
    { q: 'Which pattern ensures a class has exactly one instance throughout the application lifecycle?', options: ['Factory Method', 'Observer', 'Strategy', 'Singleton'], answer: 3, exp: 'The Singleton pattern restricts a class to a single instance and provides a global access point. Thread-safe implementations use double-checked locking or the static inner class idiom.' },
  ],
}

const CoreSubjects = () => {
  const navigate = useNavigate()
  const [activeSubject, setActiveSubject] = useState('os')
  const [activeTab, setActiveTab] = useState('notes')
  const [openTopic, setOpenTopic] = useState(null)
  const [quizFilter, setQuizFilter] = useState('All')

  // Per-subject independent quiz state
  const [quizAnswers, setQuizAnswers] = useState({ os: {}, dbms: {}, cn: {}, oop: {} })
  const [submitted, setSubmitted] = useState({ os: false, dbms: false, cn: false, oop: false })

  const subject = subjects.find(s => s.id === activeSubject)

  const handleSubjectChange = (id) => {
    setActiveSubject(id)
    setActiveTab('notes')
    setOpenTopic(null)
  }

  const getFilteredQuiz = () => {
    if (quizFilter === 'All') {
      return Object.entries(quizDataBySubject).flatMap(([subId, qs]) =>
        qs.map(q => ({ ...q, subId }))
      )
    }
    return (quizDataBySubject[quizFilter] || []).map(q => ({ ...q, subId: quizFilter }))
  }

  const handleAnswer = (subId, qIdx, optIdx) => {
    if (submitted[subId]) return
    setQuizAnswers(prev => ({
      ...prev,
      [subId]: { ...prev[subId], [qIdx]: optIdx }
    }))
  }

  const handleSubmit = (subId) => {
    const answers = quizAnswers[subId]
    const total = quizDataBySubject[subId].length
    if (Object.keys(answers).length === 0) return
    setSubmitted(prev => ({ ...prev, [subId]: true }))
  }

  const handleRetake = (subId) => {
    setQuizAnswers(prev => ({ ...prev, [subId]: {} }))
    setSubmitted(prev => ({ ...prev, [subId]: false }))
  }

  const getScore = (subId) => {
    return quizDataBySubject[subId].filter((q, i) => quizAnswers[subId][i] === q.answer).length
  }

  const filteredQuiz = getFilteredQuiz()

  return (
    <div className="min-h-screen font-sans" style={{ background: '#F8F7F4', fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E2DC' }} className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <img onClick={() => navigate("/")} src={logo} alt="logo" className="w-36 cursor-pointer" />
          <div className="hidden md:flex gap-1 items-center">
            {subjects.map(s => (
              <button key={s.id} onClick={() => handleSubjectChange(s.id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: activeSubject === s.id ? s.color : 'transparent',
                  color: activeSubject === s.id ? '#fff' : '#4B4B4B',
                  fontFamily: "'Georgia', serif"
                }}>
                {s.icon} {s.short}
              </button>
            ))}
          </div>
          <button onClick={() => setActiveTab('quiz')}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ background: '#1A1A1A', color: '#fff', fontFamily: "'Georgia', serif" }}>
            Take Quiz
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(to bottom, #FFFFFF, #F8F7F4)', borderBottom: '1px solid #E5E2DC' }} className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase"
            style={{ background: '#F0EDE8', color: '#6B6560', fontFamily: "'Georgia', serif", border: '1px solid #DDD8D0' }}>
            CS Fundamentals · Interview Preparation
          </div>
          <h1 className="mb-4 font-black tracking-tight" style={{ fontSize: '3.2rem', color: '#1A1A1A', fontFamily: "'Georgia', serif", lineHeight: 1.15 }}>
            Core Computer Science Subjects
          </h1>
          <p style={{ color: '#5C5852', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.75, fontFamily: "'Georgia', serif" }}>
            Structured reference notes, model interview answers, and topic-specific quizzes covering Operating Systems, Database Management, Computer Networks, and Object-Oriented Programming.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {subjects.map(s => (
              <button key={s.id} onClick={() => handleSubjectChange(s.id)}
                className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: activeSubject === s.id ? s.lightBg : '#FFFFFF',
                  border: `1.5px solid ${activeSubject === s.id ? s.color : '#E0DCD5'}`,
                  boxShadow: activeSubject === s.id ? `0 0 0 1px ${s.color}30` : '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '0.85rem', fontFamily: "'Georgia', serif" }}>{s.short}</div>
                <div style={{ color: s.color, fontSize: '0.68rem', marginTop: '0.2rem', fontFamily: "'Georgia', serif" }}>{s.topics?.length} topics</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB BAR ── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E2DC' }} className="sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-0 py-0 overflow-x-auto">
          <div className="flex gap-0 mr-4 border-r pr-4" style={{ borderColor: '#E5E2DC' }}>
            {subjects.map(s => (
              <button key={s.id} onClick={() => { setActiveSubject(s.id); setOpenTopic(null) }}
                className="px-3 py-3.5 text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  color: activeSubject === s.id ? s.color : '#888',
                  borderBottom: activeSubject === s.id ? `2px solid ${s.color}` : '2px solid transparent',
                  fontFamily: "'Georgia', serif"
                }}>
                {s.icon} {s.short}
              </button>
            ))}
          </div>
          {['notes', 'interview', 'quiz'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all capitalize"
              style={{
                color: activeTab === tab ? subject.color : '#888',
                borderBottom: activeTab === tab ? `2px solid ${subject.color}` : '2px solid transparent',
                fontFamily: "'Georgia', serif"
              }}>
              {tab === 'notes' ? '📝 Study Notes' : tab === 'interview' ? '🎯 Interview Q&A' : '🧠 Quiz'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* ══ NOTES TAB ══ */}
        {activeTab === 'notes' && (
          <div>
            {/* Overview card */}
            <div className="rounded-2xl p-8 mb-8" style={{ background: subject.lightBg, border: `1px solid ${subject.borderColor}` }}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: subject.color + '18', border: `1.5px solid ${subject.color}40` }}>{subject.icon}</div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', fontFamily: "'Georgia', serif", marginBottom: '0.3rem' }}>{subject.name}</h2>
                  <p style={{ color: subject.color, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Georgia', serif", marginBottom: '0.75rem' }}>{subject.tagline}</p>
                  <p style={{ color: '#4A4540', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: "'Georgia', serif" }}>{subject.overview}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subject.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: '#4A4540', fontFamily: "'Georgia', serif" }}>
                        <span style={{ color: subject.color, fontWeight: 900, flexShrink: 0, marginTop: '2px' }}>▸</span>{kp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-3">
              {subject.topics.map((topic, ti) => {
                const isOpen = openTopic === ti
                return (
                  <div key={ti} className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      border: `1px solid ${isOpen ? subject.color + '60' : '#E0DCD5'}`,
                      background: isOpen ? subject.lightBg : '#FFFFFF',
                    }}>
                    <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setOpenTopic(isOpen ? null : ti)}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: subject.color + '15' }}>{topic.icon}</div>
                      <div className="flex-1">
                        <h3 style={{ fontWeight: 700, color: '#1A1A1A', fontFamily: "'Georgia', serif" }}>{topic.name}</h3>
                        <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '1px', fontFamily: "'Georgia', serif" }}>{topic.notes.length} concepts</p>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: '99px', background: subject.color + '15', color: subject.color, fontFamily: "'Georgia', serif" }}>{topic.notes.length} notes</span>
                      <span style={{ color: '#AAA', fontSize: '0.7rem', transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                    </button>
                    {isOpen && (
                      <div style={{ borderTop: '1px solid #E5E2DC' }}>
                        {topic.notes.map((note, ni) => (
                          <div key={ni} className="px-6 py-4 flex gap-4" style={{ borderBottom: ni < topic.notes.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: subject.color, flexShrink: 0, marginTop: '8px' }} />
                            <div>
                              <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.9rem', fontFamily: "'Georgia', serif" }}>{note.term}</span>
                              <span style={{ color: '#BBB', margin: '0 8px', fontSize: '0.8rem' }}>—</span>
                              <span style={{ color: '#4A4540', fontSize: '0.9rem', lineHeight: 1.75, fontFamily: "'Georgia', serif" }}>{note.def}</span>
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

        {/* ══ INTERVIEW Q&A TAB ══ */}
        {activeTab === 'interview' && (
          <div>
            <div className="mb-8">
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A', fontFamily: "'Georgia', serif", marginBottom: '0.4rem' }}>
                {subject.icon} {subject.name} — Interview Questions
              </h2>
              <p style={{ color: '#888', fontFamily: "'Georgia', serif", fontSize: '0.95rem' }}>
                Representative questions from technical interviews at leading technology organisations. Select a question to reveal a model answer.
              </p>
            </div>
            <div className="space-y-3">
              {subject.interviewQs.map((iq, i) => {
                const key = `${subject.id}-${i}`
                const isOpen = openTopic === key
                return (
                  <div key={i} className="rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
                    style={{ border: `1px solid ${isOpen ? subject.color + '50' : '#E0DCD5'}`, background: '#FFFFFF' }}
                    onClick={() => setOpenTopic(isOpen ? null : key)}>
                    <div className="flex items-start gap-4 p-5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ backgroundColor: subject.color, fontFamily: "'Georgia', serif" }}>{i + 1}</div>
                      <div className="flex-1">
                        <p style={{ fontWeight: 600, color: '#1A1A1A', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: "'Georgia', serif" }}>{iq.q}</p>
                        {isOpen && (
                          <div className="mt-4 p-4 rounded-xl" style={{ background: subject.lightBg, border: `1px solid ${subject.borderColor}` }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: subject.color, marginBottom: '0.5rem', fontFamily: "'Georgia', serif" }}>Model Answer</p>
                            <p style={{ color: '#3A3530', fontSize: '0.9rem', lineHeight: 1.8, fontFamily: "'Georgia', serif" }}>{iq.a}</p>
                          </div>
                        )}
                      </div>
                      <span style={{ color: '#CCC', fontSize: '0.65rem', flexShrink: 0, transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Quick nav */}
            <div className="mt-10 p-5 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #E0DCD5' }}>
              <p style={{ color: '#AAA', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem', fontFamily: "'Georgia', serif" }}>Other subjects</p>
              <div className="flex flex-wrap gap-2">
                {subjects.filter(s => s.id !== activeSubject).map(s => (
                  <button key={s.id} onClick={() => { setActiveSubject(s.id); setOpenTopic(null) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
                    style={{ background: '#F8F7F4', border: '1px solid #E0DCD5', color: '#4A4540', fontFamily: "'Georgia', serif" }}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ QUIZ TAB ══ */}
        {activeTab === 'quiz' && (
          <div>
            <div className="text-center mb-10">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', fontFamily: "'Georgia', serif", marginBottom: '0.4rem' }}>Subject Quizzes</h2>
              <p style={{ color: '#888', fontFamily: "'Georgia', serif", fontSize: '0.95rem' }}>
                Each subject's quiz is scored independently. Select a filter to focus on one subject or view all questions together.
              </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['All', ...subjects.map(s => s.id)].map(f => {
                const sub = subjects.find(s => s.id === f)
                const isActive = quizFilter === f
                return (
                  <button key={f} onClick={() => setQuizFilter(f)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: isActive ? (sub ? sub.color : '#1A1A1A') : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#4A4540',
                      border: `1px solid ${isActive ? (sub ? sub.color : '#1A1A1A') : '#E0DCD5'}`,
                      fontFamily: "'Georgia', serif"
                    }}>
                    {f === 'All' ? '📚 All Subjects' : `${sub?.icon} ${sub?.short}`}
                  </button>
                )
              })}
            </div>

            {/* Render questions grouped by subject */}
            {(quizFilter === 'All' ? ['os', 'dbms', 'cn', 'oop'] : [quizFilter]).map(subId => {
              const sub = subjects.find(s => s.id === subId)
              const qs = quizDataBySubject[subId]
              const isSubSubmitted = submitted[subId]
              const score = isSubSubmitted ? getScore(subId) : null

              return (
                <div key={subId} className="mb-10 rounded-2xl overflow-hidden" style={{ border: `1px solid ${sub.borderColor}` }}>
                  {/* Subject header */}
                  <div className="px-6 py-4 flex items-center justify-between" style={{ background: sub.lightBg, borderBottom: `1px solid ${sub.borderColor}` }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '1.3rem' }}>{sub.icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '1rem', fontFamily: "'Georgia', serif" }}>{sub.name}</h3>
                        <p style={{ fontSize: '0.75rem', color: '#888', fontFamily: "'Georgia', serif" }}>{qs.length} questions</p>
                      </div>
                    </div>
                    {isSubSubmitted && (
                      <div className="text-right">
                        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: score === qs.length ? '#059669' : score >= qs.length / 2 ? '#B45309' : '#DC2626', fontFamily: "'Georgia', serif" }}>
                          {score}/{qs.length}
                        </span>
                        <p style={{ fontSize: '0.7rem', color: '#888', fontFamily: "'Georgia', serif" }}>
                          {score === qs.length ? 'Perfect score' : score >= qs.length / 2 ? 'Good effort' : 'Review notes'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Questions */}
                  <div style={{ background: '#FFFFFF' }}>
                    {qs.map((q, qi) => {
                      const selected = quizAnswers[subId][qi]
                      return (
                        <div key={qi} className="p-6" style={{ borderBottom: qi < qs.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                          <div className="flex items-start gap-3 mb-4">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                              style={{ backgroundColor: sub.color, fontFamily: "'Georgia', serif" }}>{qi + 1}</span>
                            <p style={{ fontWeight: 600, color: '#1A1A1A', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: "'Georgia', serif" }}>{q.q}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                            {q.options.map((opt, oi) => {
                              let bg = '#F8F7F4', border = '#E0DCD5', color = '#4A4540'
                              if (isSubSubmitted) {
                                if (oi === q.answer) { bg = '#ECFDF5'; border = '#059669'; color = '#065F46' }
                                else if (oi === selected) { bg = '#FEF2F2'; border = '#DC2626'; color = '#991B1B' }
                                else { bg = '#FAFAFA'; border = '#E5E2DC'; color = '#BBB' }
                              } else if (selected === oi) {
                                bg = sub.lightBg; border = sub.color; color = '#1A1A1A'
                              }
                              return (
                                <button key={oi}
                                  onClick={() => handleAnswer(subId, qi, oi)}
                                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                                  style={{ background: bg, border: `1.5px solid ${border}`, color, fontFamily: "'Georgia', serif", cursor: isSubSubmitted ? 'default' : 'pointer' }}>
                                  <span style={{ fontWeight: 700, marginRight: '6px' }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                                  {isSubSubmitted && oi === q.answer && <span style={{ marginLeft: '6px', color: '#059669' }}>✓</span>}
                                  {isSubSubmitted && oi === selected && selected !== q.answer && <span style={{ marginLeft: '6px', color: '#DC2626' }}>✗</span>}
                                </button>
                              )
                            })}
                          </div>
                          {isSubSubmitted && (
                            <div className="mt-3 ml-10 px-4 py-3 rounded-xl" style={{ background: '#F8F7F4', border: '1px solid #E0DCD5' }}>
                              <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: sub.color, marginBottom: '0.3rem', fontFamily: "'Georgia', serif" }}>Explanation</p>
                              <p style={{ color: '#4A4540', fontSize: '0.88rem', lineHeight: 1.7, fontFamily: "'Georgia', serif" }}>{q.exp}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Submit / Retake per subject */}
                  <div className="px-6 py-4 flex justify-end gap-3" style={{ background: '#FAFAF9', borderTop: '1px solid #F0EDE8' }}>
                    {!isSubSubmitted ? (
                      <button
                        onClick={() => handleSubmit(subId)}
                        disabled={Object.keys(quizAnswers[subId]).length === 0}
                        className="px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all disabled:opacity-40"
                        style={{ background: sub.color, fontFamily: "'Georgia', serif" }}>
                        Submit {sub.short} Quiz →
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRetake(subId)}
                        className="px-6 py-2.5 rounded-lg font-bold text-sm transition-all"
                        style={{ background: '#FFFFFF', border: '1px solid #E0DCD5', color: '#4A4540', fontFamily: "'Georgia', serif" }}>
                        Retake Quiz
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E5E2DC', background: '#FFFFFF' }} className="py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span style={{ fontSize: '1.2rem' }}>📖</span>
            <span style={{ fontWeight: 800, color: '#1A1A1A', fontFamily: "'Georgia', serif" }}>Core Subjects Hub</span>
          </div>
          <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: "'Georgia', serif" }}>
            Comprehensive reference material for OS, DBMS, Computer Networks, and OOP — prepared for CS students and engineers pursuing technical roles.
          </p>
          <div className="flex justify-center gap-5 flex-wrap mb-4">
            {subjects.map(s => (
              <span key={s.id} style={{ fontSize: '0.8rem', fontWeight: 700, color: s.color, fontFamily: "'Georgia', serif" }}>{s.icon} {s.short}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#BBB', borderTop: '1px solid #F0EDE8', paddingTop: '1rem', fontFamily: "'Georgia', serif" }}>
            © 2026 aiplacprep@gmail.com · Core Subjects Hub — Built for CS students and engineers preparing for technical interviews.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default CoreSubjects