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

interface PrepTopic {
  id: string;
  title: string;
  category: "Core CS" | "Aptitude" | "Interview QA";
  duration: string;
  youtubeId: string;
  instructor: string;
  summary: string;
  keyPoints: string[];
  sampleQuestions: { q: string; a: string }[];
  pdfCheatSheet: string;
}

const PREP_TOPICS: PrepTopic[] = [
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
      "Probability: P(Event) = Favorable Outcomes / Total Sample Space. P(A or B) = P(A) + P(B) - P(A and B).",
    ],
    sampleQuestions: [
      {
        q: "A train 180m long passes a pole in 9 seconds. What is its speed in km/h?",
        a: "Speed = 180m / 9s = 20 m/s. Convert to km/h: 20 * (18/5) = 72 km/h.",
      },
    ],
    pdfCheatSheet: "Aptitude Formula Bible: 50 high-frequency formulas with worked shortcut examples.",
  },
];

export default function PrepPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTopic, setActiveTopic] = useState<PrepTopic | null>(PREP_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTopics = PREP_TOPICS.filter((t) => {
    if (selectedCategory !== "All" && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.keyPoints.some((k) => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 text-white border border-indigo-500/20 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Comprehensive Placement & Interview Prep
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Placement Prep & Core Subjects
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Master campus placements and technical rounds with curated video masterclasses and
            matching PDF revision cheat sheets for OS, DBMS, Networks, and Aptitude.
          </p>
        </div>
      </div>

      {/* Category Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card p-4">
        <div className="flex items-center gap-2">
          {["All", "Core CS", "Aptitude"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
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
            placeholder="Search subjects or formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Main Split Layout: Left List, Right Active Classroom */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Topics List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Preparation Modules ({filteredTopics.length})
          </h3>
          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const isSelected = activeTopic?.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`card p-5 cursor-pointer transition-all border ${
                    isSelected
                      ? "border-indigo-500 shadow-md bg-indigo-50/20 dark:bg-indigo-950/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-indigo-300"
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
            <div className="card p-6 space-y-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              {/* Video Header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
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

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
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
