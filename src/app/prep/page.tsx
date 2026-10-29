"use client";

import { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  Target,
  Video,
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Clock,
  Play,
  Award,
  Layers,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface PrepTopic {
  id: string;
  title: string;
  category: "Core CS" | "Programming" | "Aptitude" | "Interview" | "Assessments";
  duration: string;
  youtubeId: string;
  instructor: string;
  summary: string;
  keyPoints: string[];
  sampleQuestions: { q: string; a: string }[];
  pdfCheatSheet: string;
}

const PREP_TOPICS: PrepTopic[] = [
  // 1. Operating Systems
  {
    id: "prep-os",
    title: "Operating Systems (OS) Placement Masterclass",
    category: "Core CS",
    duration: "45 mins",
    youtubeId: "vBURTt97EkA",
    instructor: "Gate Smashers / Neso Academy",
    summary: "Complete breakdown of Process Management, CPU Scheduling (FCFS, SJF, Round Robin), Deadlock conditions, and Virtual Memory Paging.",
    keyPoints: [
      "Process vs Thread: Processes have independent address spaces; Threads share memory within the same process.",
      "Deadlock 4 Necessary Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
      "Paging vs Segmentation: Paging uses fixed-size blocks (pages/frames); Segmentation uses variable-size logical modules.",
      "Thrashing occurs when excessive page faults lead to the CPU spending more time paging than executing processes.",
    ],
    sampleQuestions: [
      {
        q: "What is the Banker's Algorithm and when is it used?",
        a: "The Banker's Algorithm is a deadlock avoidance algorithm that tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources before deciding whether allocation should be allowed.",
      },
      {
        q: "Explain Belady's Anomaly in Page Replacement.",
        a: "Belady's Anomaly is the phenomenon in which increasing the number of page frames results in an increase in the number of page faults for certain memory access patterns, notably occurring in FIFO page replacement.",
      },
    ],
    pdfCheatSheet: "OS Placement Cheat Sheet: Process Scheduling Formulas, Semaphore Code Patterns, Memory Management Summary.",
  },

  // 2. DBMS & SQL
  {
    id: "prep-dbms",
    title: "DBMS & SQL Normalization Complete Guide",
    category: "Core CS",
    duration: "52 mins",
    youtubeId: "kBdlM6hNDAE",
    instructor: "Kunal Kushwaha / Gate Smashers",
    summary: "Master ACID properties, B-Trees vs Hash Indexes, Transactions, Isolation Levels, and 1NF to BCNF database normalization.",
    keyPoints: [
      "ACID Properties: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrent safety), Durability (persisted commits).",
      "Normalization: 1NF (atomic values) -> 2NF (no partial dependencies on composite keys) -> 3NF (no transitive dependencies) -> BCNF (determinant is always a superkey).",
      "Indexing: Clustered index dictates the physical order of rows (only 1 per table); Non-clustered creates a separate lookup tree pointing to row pointers.",
    ],
    sampleQuestions: [
      {
        q: "What is the difference between DELETE, TRUNCATE, and DROP?",
        a: "DELETE is a DML command that removes specific rows (can be rolled back, fires triggers); TRUNCATE is DDL that resets the whole table structure quickly without logging individual row deletes; DROP removes the table definition and all data completely.",
      },
      {
        q: "Explain Transaction Isolation Levels and their anomalies.",
        a: "The 4 levels are Read Uncommitted (allows Dirty Reads), Read Committed (prevents Dirty Reads, allows Non-repeatable reads), Repeatable Read (prevents Non-repeatable reads, allows Phantom reads), and Serializable (strict serial execution).",
      },
    ],
    pdfCheatSheet: "DBMS & SQL Query Handbook: Window functions, Joins cheat sheet, Normalization verification flowchart.",
  },

  // 3. Computer Networks
  {
    id: "prep-cn",
    title: "Computer Networks & OSI Model Deep Dive",
    category: "Core CS",
    duration: "40 mins",
    youtubeId: "IPvYjXCsTg8",
    instructor: "NetworkChuck / FreeCodeCamp",
    summary: "Understand the 7 layers of OSI, TCP 3-Way Handshake, UDP streaming, DNS resolution, HTTP/1.1 vs HTTP/2 vs HTTP/3, and Subnetting.",
    keyPoints: [
      "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK establishes reliable bidirectional byte-stream communication.",
      "TCP vs UDP: TCP guarantees in-order lossless delivery with congestion control; UDP prioritizes low-latency datagram throughput without retransmission.",
      "DNS Resolution: Browser Cache -> OS Resolver -> Recursive Resolver -> Root Server -> TLD Server -> Authoritative Nameserver.",
    ],
    sampleQuestions: [
      {
        q: "What happens when you type https://google.com in your browser and press Enter?",
        a: "1. DNS resolution converts domain to IP; 2. TCP 3-way handshake opens socket; 3. TLS 1.3 handshake performs key exchange and cert verification; 4. HTTP GET request sent; 5. Server responds with HTML; 6. Browser parses DOM/CSSOM and renders page.",
      },
    ],
    pdfCheatSheet: "Computer Networks Cheat Sheet: Port numbers reference, IP CIDR subnetting table, TCP state transition diagram.",
  },

  // 4. Object Oriented Programming (OOP)
  {
    id: "prep-oop",
    title: "OOPs Concepts & SOLID Principles",
    category: "Core CS",
    duration: "42 mins",
    youtubeId: "pTB0EiLXUC8",
    instructor: "Telusko / FreeCodeCamp",
    summary: "Master Encapsulation, Abstraction, Inheritance, Polymorphism, and the 5 SOLID engineering principles with interview code examples.",
    keyPoints: [
      "Polymorphism: Compile-time (Method Overloading) vs Runtime (Method Overriding via Virtual Tables).",
      "Abstraction hides internal implementation (Interfaces / Abstract classes); Encapsulation bundles data with accessor methods (Getters/Setters).",
      "SOLID Principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
    ],
    sampleQuestions: [
      {
        q: "Why does Java not support multiple inheritance with classes?",
        a: "To eliminate the Diamond Problem where ambiguity arises about which superclass implementation to inherit if two classes implement the same method.",
      },
    ],
    pdfCheatSheet: "OOP & SOLID Architecture Cheatsheet with UML diagrams and clean code rules.",
  },

  // 5. Data Structures & Algorithms
  {
    id: "prep-dsa",
    title: "DSA Masterclass: Patterns & Complexities",
    category: "Programming",
    duration: "60 mins",
    youtubeId: "0IAPZzGSbME",
    instructor: "Striver / Take U Forward",
    summary: "Learn the core 14 coding patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, and Tree BFS/DFS.",
    keyPoints: [
      "Sliding Window solves contiguous subarray problems in O(N) instead of O(N^2).",
      "Two Pointers on sorted arrays reduces pair search time from O(N^2) to O(N).",
      "Floyd's Cycle Detection uses slow and fast pointers to identify linked list loops without extra memory.",
    ],
    sampleQuestions: [
      {
        q: "How do you detect a cycle in a singly linked list in O(1) space?",
        a: "Initialize slow and fast pointers at head. Move slow by 1 step and fast by 2 steps. If they ever point to the exact same node, a cycle exists.",
      },
    ],
    pdfCheatSheet: "DSA Pattern Blueprint: 14 recurring LeetCode patterns with visual algorithmic templates.",
  },

  // 6. Java Placement Masterclass
  {
    id: "prep-java",
    title: "Java Core & Collections for Placements",
    category: "Programming",
    duration: "55 mins",
    youtubeId: "eIrMbAQSU34",
    instructor: "Kunal Kushwaha / Programming with Mosh",
    summary: "JVM architecture, Garbage Collection, Java Collections Framework (ArrayList, LinkedList, HashMap, ConcurrentHashMap), and Multithreading.",
    keyPoints: [
      "JVM Architecture: ClassLoader -> JVM Memory (Heap, Stack, Method Area) -> Execution Engine (JIT Compiler & GC).",
      "HashMap internal: array of Node buckets; Java 8 treeifies buckets into Red-Black Trees when bucket length > 8.",
      "String pool lives inside Heap; string literals reuse pooled references while `new String()` allocates distinct memory.",
    ],
    sampleQuestions: [
      {
        q: "What is the difference between Comparable and Comparator in Java?",
        a: "Comparable provides natural ordering via `compareTo()` within the class itself; Comparator provides custom external ordering via `compare()` without modifying original class.",
      },
    ],
    pdfCheatSheet: "Java Core Cheat Sheet: Collections hierarchy diagram, memory breakdown, thread lifecycle.",
  },

  // 7. Python for Placements
  {
    id: "prep-python",
    title: "Python 3 Complete Interview Masterclass",
    category: "Programming",
    duration: "48 mins",
    youtubeId: "rfscVS0vtbw",
    instructor: "FreeCodeCamp / Corey Schafer",
    summary: "Master Python dictionaries, list comprehensions, generators, decorators, memory management, and GIL (Global Interpreter Lock).",
    keyPoints: [
      "GIL ensures only one thread executes Python bytecode at once in CPython; use multiprocessing for CPU-bound parallelism.",
      "Generators utilize `yield` to stream values lazily with O(1) memory overhead.",
      "Decorators wrap functions to add cross-cutting behavior like logging, timing, and auth caching.",
    ],
    sampleQuestions: [
      {
        q: "Explain how list comprehension works under the hood compared to map/filter.",
        a: "List comprehensions are optimized at bytecode level using LIST_APPEND, running faster in CPython than equivalent Python-level loops.",
      },
    ],
    pdfCheatSheet: "Python Placement Handbook: Built-in methods, slicing tricks, complexity cheatsheet.",
  },

  // 8. C / C++ Core Concepts
  {
    id: "prep-cpp",
    title: "C / C++ Pointers, Memory & STL",
    category: "Programming",
    duration: "45 mins",
    youtubeId: "zuegQmMdy8M",
    instructor: "Luv / Saurabh Shukla",
    summary: "Pointers, dynamic memory allocation (malloc/free vs new/delete), smart pointers (unique_ptr, shared_ptr), and C++ STL containers.",
    keyPoints: [
      "Dangling pointer points to deallocated memory; nullify pointers after freeing.",
      "C++ STL vector doubles capacity when full, giving amortized O(1) push_back.",
      "RAII (Resource Acquisition Is Initialization) ties resource lifetime to object scope.",
    ],
    sampleQuestions: [
      {
        q: "What is the difference between malloc() and new?",
        a: "malloc() is a C library function that allocates raw byte memory without calling constructors; new is a C++ operator that calculates size and calls the object constructor.",
      },
    ],
    pdfCheatSheet: "C++ Memory & Pointer Cheatsheet: Pointer arithmetic, STL complexity matrix.",
  },

  // 9. Quantitative Aptitude
  {
    id: "prep-apt",
    title: "Quantitative Aptitude & Speed Math Formulas",
    category: "Aptitude",
    duration: "38 mins",
    youtubeId: "XQx91n5U9eY",
    instructor: "CareerRide / Aptitude Prep",
    summary: "Speed math shortcuts for Time & Work, Speed Distance Time, Permutations & Combinations, Probability, and Syllogisms.",
    keyPoints: [
      "Time & Work: If A does work in x days and B in y days, together they complete in (x*y)/(x+y) days.",
      "Relative Speed: Moving in opposite directions = S1 + S2; Moving in same direction = |S1 - S2|.",
      "Probability: P(Event) = Favorable Outcomes / Total Sample Space.",
    ],
    sampleQuestions: [
      {
        q: "A train 180m long passes a pole in 9 seconds. What is its speed in km/h?",
        a: "Speed = 180m / 9s = 20 m/s. Convert to km/h: 20 * (18/5) = 72 km/h.",
      },
    ],
    pdfCheatSheet: "Aptitude Formula Bible: 50 high-frequency formulas with worked shortcut examples.",
  },

  // 10. Logical Reasoning
  {
    id: "prep-logic",
    title: "Logical Reasoning & Puzzle Solving",
    category: "Aptitude",
    duration: "40 mins",
    youtubeId: "81eK0bUfLzE",
    instructor: "Feel Free to Learn",
    summary: "Master Blood Relations, Circular Seating Arrangements, Direction Sense, Coding-Decoding, and Venn Diagram Syllogisms.",
    keyPoints: [
      "Seating Arrangements: Always identify definite positions first before testing conditional possibilities.",
      "Blood Relations: Use family tree symbols (+ for male, - for female, double line for spouses, single line for siblings).",
      "Syllogisms: Test conclusions against both minimum overlap Venn diagrams and alternate valid configurations.",
    ],
    sampleQuestions: [
      {
        q: "Pointing to a photograph, a woman said, 'He is the son of the only son of my mother.' Who is the man?",
        a: "The only son of her mother is her brother. The son of her brother is her nephew.",
      },
    ],
    pdfCheatSheet: "Logical Reasoning Quick Reference: Diagram notations, deduction truth tables.",
  },

  // 11. Verbal Ability
  {
    id: "prep-verbal",
    title: "Verbal Ability & Reading Comprehension",
    category: "Aptitude",
    duration: "35 mins",
    youtubeId: "Y3r1pU_7D-8",
    instructor: "ChetChat / Study Smart",
    summary: "Conquer Sentence Correction, Reading Comprehension passage scanning, Critical Reasoning, and Vocabulary building.",
    keyPoints: [
      "Subject-Verb Agreement: Ensure the verb agrees with the true subject, ignoring intervening prepositional phrases.",
      "Reading Comprehension: Read the first and last sentence of each paragraph first to capture the central theme.",
      "Modifiers: Modifying phrases must be placed directly adjacent to the noun they modify to avoid dangling modifiers.",
    ],
    sampleQuestions: [
      {
        q: "Correct this sentence: 'Neither the manager nor the employees was present.'",
        a: "With 'neither... nor', the verb agrees with the closer subject ('employees'), so the correct sentence is: 'Neither the manager nor the employees were present.'",
      },
    ],
    pdfCheatSheet: "Verbal Placement Guide: 25 grammar golden rules and error-spotting checklist.",
  },

  // 12. HR Interview Questions
  {
    id: "prep-hr",
    title: "HR Interview Mastery & STAR Framework",
    category: "Interview",
    duration: "30 mins",
    youtubeId: "1mHjMNZZvFo",
    instructor: "Jeff Su / CareerVidz",
    summary: "Structure persuasive answers for 'Tell me about yourself', 'What is your greatest weakness?', and behavioral questions using STAR.",
    keyPoints: [
      "STAR Framework: Situation (20%), Task (10%), Action (50%), Result (20% with quantitative metric).",
      "'Tell me about yourself': Present (current role & skills) -> Past (key achievement) -> Future (why this role).",
      "Weakness question: Name a real professional skill, then immediately demonstrate the concrete system you use to improve it.",
    ],
    sampleQuestions: [
      {
        q: "Where do you see yourself in 5 years?",
        a: "In 5 years, I envision myself as a seasoned software engineer who has mastered scalable backend architecture, leading key feature initiatives and mentoring junior developers.",
      },
    ],
    pdfCheatSheet: "HR Interview Battlecard: 30 most asked behavioral questions with winning scripts.",
  },

  // 13. System Design Fundamentals
  {
    id: "prep-sysdesign",
    title: "System Design for Freshers & Juniors",
    category: "Interview",
    duration: "45 mins",
    youtubeId: "i53Gi_K3o7I",
    instructor: "Gaurav Sen / Exponent",
    summary: "Understand high-level system design: Load Balancers, Horizontal vs Vertical Scaling, Caching (Redis), CDNs, and Database Sharding.",
    keyPoints: [
      "Horizontal Scaling (scale out with more servers) is preferred over Vertical Scaling (bigger machine) to eliminate single points of failure.",
      "Redis Caching sits between application and database, reducing read latency from 20ms to under 1ms.",
      "Consistent Hashing balances load across cache clusters without invalidating all keys when nodes scale.",
    ],
    sampleQuestions: [
      {
        q: "How would you design a URL Shortener like Bitly?",
        a: "Use Base62 encoding on auto-incrementing database IDs, store mapping in key-value store, cache top 20% trending URLs in Redis with LRU eviction.",
      },
    ],
    pdfCheatSheet: "System Design Starter Pack: Component diagrams, capacity estimation formulas.",
  },

  // 14. Group Discussion (GD) Playbook
  {
    id: "prep-gd",
    title: "Campus Group Discussion (GD) Strategies",
    category: "Interview",
    duration: "28 mins",
    youtubeId: "V5d_l9gU49o",
    instructor: "Skillopedia / Business English",
    summary: "Techniques for campus placement GDs: opening the debate, bringing structure to chaos, speaking with data, and summarizing consensus.",
    keyPoints: [
      "Quality over quantity: 3 articulate, data-backed contributions score higher than non-stop talking.",
      "Steer the group when off-topic: 'Friends, let us bring our focus back to the core challenge.'",
      "Always take notes during other candidates' remarks to reference their points respectfully.",
    ],
    sampleQuestions: [
      {
        q: "What should you do if you don't know the topic in a GD?",
        a: "Listen carefully to the first 2-3 speakers, identify common themes, and enter by summarizing or adding an angle they omitted.",
      },
    ],
    pdfCheatSheet: "Group Discussion Playbook: 50 transition phrases and scoring criteria matrix.",
  },

  // 15. Resume Building & ATS
  {
    id: "prep-resume",
    title: "ATS-Proof Tech Resume Architecture",
    category: "Interview",
    duration: "25 mins",
    youtubeId: "Tt08KmFfIYQ",
    instructor: "Wonsulting / Tech Lead",
    summary: "Format single-page engineering resumes that pass Applicant Tracking Systems (ATS) with 90%+ match rates.",
    keyPoints: [
      "Use XYZ bullet formula: 'Accomplished [X] measured by [Y] by doing [Z]'.",
      "Keep format single-column, standard fonts (Calibri/Inter), clean PDF without tables or embedded graphics.",
      "Include GitHub and live deployment links for every project mentioned.",
    ],
    sampleQuestions: [
      {
        q: "How do you quantify projects when you don't have company metrics?",
        a: "Quantify test coverage (e.g. 92% coverage), latency reduction (e.g. reduced load time by 300ms), or user counts on live hosted apps.",
      },
    ],
    pdfCheatSheet: "ATS Resume Checklist: Action verbs list, project bullet templates.",
  },

  // 16. Company Specific Assessments
  {
    id: "prep-company",
    title: "Company Specific Patterns: TCS, Infosys, Amazon",
    category: "Assessments",
    duration: "50 mins",
    youtubeId: "y_EwXbZ1m6w",
    instructor: "Knowledge Gate / PrepInsta",
    summary: "Breakdown of assessment syllabus, negative marking rules, coding round difficulty, and cutoffs for top mass recruiters and product MNCs.",
    keyPoints: [
      "TCS NQT: Focus on Quantitative Aptitude, Verbal, Advanced Coding (Arrays, Strings, Recursion).",
      "Infosys SP / DSE: Heavy focus on Dynamic Programming, Graphs, and Greedy Algorithms.",
      "Amazon SDE1: 2 LeetCode Mediums + 14 Leadership Principles assessment questions.",
    ],
    sampleQuestions: [
      {
        q: "What is the most common coding problem type asked in MNC campus online assessments?",
        a: "String manipulation, Hash Maps frequency counting, Two Pointers array search, and standard BFS/DFS matrix traversals.",
      },
    ],
    pdfCheatSheet: "Company Syllabus Matrix: Exam patterns, question counts, and cutoff benchmarks.",
  },
];

export default function PrepPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTopic, setActiveTopic] = useState<PrepTopic>(PREP_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Core CS", "Programming", "Aptitude", "Interview", "Assessments"];

  const filteredTopics = PREP_TOPICS.filter((t) => {
    if (selectedCategory !== "All" && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keyPoints.some((k) => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 p-4 md:p-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 text-white border border-indigo-500/20 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Comprehensive Placement & Interview Prep
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Placement Prep & 16-Subject Masterclasses
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Master campus placements and technical rounds with curated video masterclasses and
            matching PDF revision cheat sheets for OS, DBMS, Networks, DSA, Java, Python, Aptitude, HR, and System Design.
          </p>
        </div>
      </div>

      {/* Category Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search 16 subjects or formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Main Split Layout: Left List, Right Active Classroom */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Topics List */}
        <div className="lg:col-span-5 space-y-4 max-h-[850px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Placement Modules ({filteredTopics.length})
            </h3>
            <span className="text-xs text-indigo-500 font-semibold">16 Comprehensive Tracks</span>
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const isSelected = activeTopic?.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "border-indigo-500 shadow-md bg-indigo-50/20 dark:bg-indigo-950/20 ring-2 ring-indigo-500/10"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {topic.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {topic.duration}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {topic.summary}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span className="flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Watch Video & PDF Notes
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Classroom & PDF View */}
        <div className="lg:col-span-7">
          {activeTopic && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              {/* Video Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {activeTopic.category} Placement Prep
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeTopic.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Instructor: {activeTopic.instructor} • {activeTopic.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeTopic.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    YouTube &rarr;
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>

              {/* On Screen Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video w-full shadow-md">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeTopic.youtubeId}?rel=0`}
                  title={activeTopic.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Synchronized Core Principles & PDF Cheat Sheet */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    Synchronized Lecture Notes & Principles
                  </h4>
                  <span className="text-xs text-slate-500">Matching On-Screen Video</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {activeTopic.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Interview Q&A */}
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                    Campus Placement Technical Questions
                  </span>
                  {activeTopic.sampleQuestions.map((sq, sidx) => (
                    <div key={sidx} className="space-y-1 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">Q: {sq.q}</p>
                      <p className="text-slate-600 dark:text-slate-300 pl-3 border-l-2 border-amber-400">
                        A: {sq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
