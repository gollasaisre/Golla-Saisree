"use client";

import { useState, useMemo } from "react";
import {
  MessageSquare,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Users,
  Mic,
  RotateCcw,
  Search,
  Filter,
  Play,
  Copy,
  Check,
  Award,
  ChevronRight,
  Headphones,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface Sentence {
  id: string;
  category: "Interview QA" | "Daily Standup" | "Disagreeing Politely" | "Presenting Projects" | "Asking for Help";
  english: string;
  context: string;
  alternative: string;
}

const DAILY_SENTENCES: Sentence[] = [
  // Interview QA
  {
    id: "s1",
    category: "Interview QA",
    english: "In my previous project, I was primarily responsible for architecting the RESTful API endpoints and optimizing SQL queries.",
    context: "Explaining your project contribution with confidence and specificity.",
    alternative: "I took ownership of the backend API layer and database indexing strategy.",
  },
  {
    id: "s2",
    category: "Interview QA",
    english: "I am particularly drawn to this role because your engineering culture emphasizes scalable distributed architecture and test-driven development.",
    context: "Answering 'Why do you want to join our company?'",
    alternative: "Your tech stack aligns seamlessly with my passion for high-concurrency cloud systems.",
  },
  {
    id: "s3",
    category: "Interview QA",
    english: "Could you please clarify whether this algorithm should optimize for time complexity or minimize auxiliary memory consumption?",
    context: "Asking clarifying questions before jumping into a coding problem.",
    alternative: "Before coding, should I prioritize an O(1) space tradeoff or an O(N log N) runtime?",
  },
  {
    id: "s4",
    category: "Interview QA",
    english: "While I haven't worked with this specific library in production, my deep experience with React and TypeScript allows me to ramp up quickly.",
    context: "Handling an unfamiliar framework without sounding defensive.",
    alternative: "The underlying mental model is very similar to tools I use daily, so ramp-up time will be negligible.",
  },
  {
    id: "s5",
    category: "Interview QA",
    english: "That is a great edge case. Let me trace how the pointer behaves when the input list contains only duplicates.",
    context: "Responding to an interviewer's critique constructively.",
    alternative: "Good catch. Let's step through the boundary condition where the array length is zero.",
  },

  // Daily Standup
  {
    id: "s6",
    category: "Daily Standup",
    english: "Yesterday, I finalized the authentication middleware and pushed the PR for peer review.",
    context: "Clear, concise standup report.",
    alternative: "I wrapped up the JWT token validation logic and opened PR #142 yesterday.",
  },
  {
    id: "s7",
    category: "Daily Standup",
    english: "Today, I will be focusing on writing automated unit tests and profiling database query execution times.",
    context: "Declaring current day sprint goals.",
    alternative: "My primary task today is increasing test coverage for the payment service above 90%.",
  },
  {
    id: "s8",
    category: "Daily Standup",
    english: "I am currently blocked by missing API specifications from the third-party billing provider.",
    context: "Flagging a blocker clearly without blaming individuals.",
    alternative: "Progress is paused pending webhook schema confirmation from the payments team.",
  },
  {
    id: "s9",
    category: "Daily Standup",
    english: "I have some extra bandwidth this afternoon if anyone needs an extra pair of eyes on their pull requests.",
    context: "Demonstrating team citizenship when your sprint tasks finish early.",
    alternative: "My sprint tickets are in QA, so I am available to help unblock peer reviews.",
  },

  // Disagreeing Politely & Group Discussions
  {
    id: "s10",
    category: "Disagreeing Politely",
    english: "I see your point regarding development speed; however, my concern is that skipping type definitions may introduce runtime crashes in production.",
    context: "Disagreeing with a senior peer using logic and empathy.",
    alternative: "While that approach saves initial time, technical debt might compound down the line.",
  },
  {
    id: "s11",
    category: "Disagreeing Politely",
    english: "That is an interesting proposal. Could we run a quick load-test benchmark to validate how it handles 10,000 requests per second?",
    context: "Turning subjective debates into objective data-driven experiments.",
    alternative: "Let's benchmark both approaches with a small prototype before making a permanent decision.",
  },
  {
    id: "s12",
    category: "Disagreeing Politely",
    english: "To build on what Saisree mentioned, we could combine the caching layer with an asynchronous background worker.",
    context: "Adding value to a teammate's idea during a brainstorming session.",
    alternative: "I agree with the core concept, and we can make it even more resilient by adding a retry queue.",
  },
  {
    id: "s13",
    category: "Disagreeing Politely",
    english: "I respectfully hold a different perspective on this because user data privacy compliance must take precedence.",
    context: "Standing firm on ethics or compliance in Group Discussions.",
    alternative: "While profitability is crucial, user data governance is non-negotiable under GDPR standards.",
  },

  // Presenting Projects
  {
    id: "s14",
    category: "Presenting Projects",
    english: "To address slow page load times, we implemented server-side rendering and client-side route pre-fetching, which reduced Time-to-Interactive by 42%.",
    context: "Framing technical achievements with measurable business metrics.",
    alternative: "By transitioning to Next.js SSR, we cut initial bundle payload size from 2.4MB down to 340KB.",
  },
  {
    id: "s15",
    category: "Presenting Projects",
    english: "Here is an architectural diagram illustrating how incoming HTTP requests are load-balanced across our worker instances.",
    context: "Guiding the interviewer smoothly into system design diagrams.",
    alternative: "This high-level schematic shows the end-to-end data flow from client DNS lookup to cached Redis responses.",
  },

  // Asking for Help
  {
    id: "s16",
    category: "Asking for Help",
    english: "I have spent the last 45 minutes investigating this race condition and verified that the locks are releasing prematurely. Do you have 10 minutes to brainstorm?",
    context: "The 30-minute rule: showing what you already attempted before asking for assistance.",
    alternative: "I traced the bug through server logs and narrowed it down to thread contention in line 84. Could I get your perspective?",
  },
  {
    id: "s17",
    category: "Asking for Help",
    english: "Whenever you have a natural stopping point, could you look at this CORS error? I already verified the headers on staging.",
    context: "Respecting a senior developer's deep focus state.",
    alternative: "No urgent rush, but let me know when you are free for a quick 5-minute sanity check on this config.",
  },
];

const VOCAB_LIST = [
  { word: "Concurrency", pos: "noun", def: "The ability of different parts of a program to be executed out-of-order without affecting final outcome.", example: "Go goroutines provide lightweight concurrency." },
  { word: "Idempotent", pos: "adjective", def: "An operation that produces the same result no matter how many times it is repeated.", example: "HTTP PUT and DELETE requests are designed to be idempotent." },
  { word: "Latency", pos: "noun", def: "The time delay between a request initiation and its completed response.", example: "Edge caching reduced global user latency to under 35 milliseconds." },
  { word: "Scalability", pos: "noun", def: "The capability of a system to handle growing amount of work by adding hardware or cloud resources.", example: "Stateless microservices enhance horizontal scalability." },
  { word: "Paraphrase", pos: "verb", def: "To express the meaning of something using different words to achieve greater clarity.", example: "I paraphrased the client's feature request to confirm requirements." },
  { word: "Mitigate", pos: "verb", def: "To make less severe, serious, or painful; to reduce risk.", example: "We implemented rate limiting to mitigate denial-of-service spikes." },
  { word: "Prerequisite", pos: "noun", def: "A thing that is required as a prior condition for something else to happen.", example: "A solid grasp of pointers is a prerequisite for understanding linked lists." },
  { word: "Bottleneck", pos: "noun", def: "A point of congestion in a system that limits overall throughput.", example: "Unindexed database lookups were the primary bottleneck during peak traffic." },
];

export default function CommunicationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sentences" | "vocab" | "gd" | "speech">("sentences");

  // Speech practice state
  const [practiceSentence, setPracticeSentence] = useState<string>(DAILY_SENTENCES[0].english);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(DAILY_SENTENCES.map((s) => s.category)));
    return ["All", ...cats];
  }, []);

  const filteredSentences = useMemo(() => {
    return DAILY_SENTENCES.filter((s) => {
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchSearch =
        s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.alternative.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported by your browser.");
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimerSeconds(0);
      const interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev >= 60) {
            clearInterval(interval);
            setIsRecording(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                <MessageSquare className="w-5 h-5" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Professional Communication & English Lab</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Master daily corporate phrases, technical interview English, pronunciation, and Group Discussion (GD) frameworks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/soft-skills"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              &larr; Soft Skills Hub
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: "sentences", label: "Daily Corporate Sentences", icon: MessageSquare },
            { id: "speech", label: "Speaking Practice Lab", icon: Mic },
            { id: "gd", label: "Group Discussion (GD) Playbook", icon: Users },
            { id: "vocab", label: "Technical Vocabulary", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Sentences */}
        {activeTab === "sentences" && (
          <div className="space-y-6">
            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search corporate sentences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Sentence Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSentences.map((s) => (
                <div
                  key={s.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {s.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => speakText(s.english)}
                        title="Pronounce with Audio"
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(s.id, s.english)}
                        title="Copy to Clipboard"
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        {copiedId === s.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setPracticeSentence(s.english);
                          setActiveTab("speech");
                        }}
                        title="Practice Speaking This Sentence"
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-1"
                      >
                        Practice &rarr;
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    &ldquo;{s.english}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">When to use: </span>
                      <span className="text-slate-600 dark:text-slate-300">{s.context}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-indigo-500">Alternative phrasing: </span>
                      <span className="italic text-slate-600 dark:text-slate-300">&ldquo;{s.alternative}&rdquo;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Speech Lab */}
        {activeTab === "speech" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Speaking & Pronunciation Lab</h2>
              <p className="text-xs text-slate-500">
                Listen to correct enunciation, repeat aloud, and time your 60-second response drills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-800/40 text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Current Drill Sentence
              </span>
              <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100 max-w-2xl mx-auto leading-relaxed">
                &ldquo;{practiceSentence}&rdquo;
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => speakText(practiceSentence)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen to Native Pronunciation
                </button>
                <button
                  onClick={() => {
                    const randomSentence = DAILY_SENTENCES[Math.floor(Math.random() * DAILY_SENTENCES.length)].english;
                    setPracticeSentence(randomSentence);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Shuffle Sentence
                </button>
              </div>
            </div>

            {/* Speaking Timer / Recorder Simulation */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <Mic className={`w-8 h-8 ${isRecording ? "text-rose-500 animate-pulse" : "text-slate-400"}`} />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">
                  00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {isRecording ? "Speaking in progress... Deliver your answer with steady cadence." : "Ready to speak? Click below to start your timed drill."}
                </p>
              </div>
              <button
                onClick={toggleRecording}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isRecording
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-500/25"
                    : "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white"
                }`}
              >
                {isRecording ? "Stop Speaking Drill" : "Start 60-Second Speaking Drill"}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Group Discussion */}
        {activeTab === "gd" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Group Discussion (GD) Strategy & Frameworks</h2>
                <p className="text-xs text-slate-500">
                  How top candidates stand out in placement GD rounds: Initiating, Steering, Adding Value, and Summarizing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    stage: "1. Initiating the Discussion",
                    color: "border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/20",
                    phrases: [
                      "Good morning everyone. Today our topic is [X]. Let us break this down into technological impact, economic feasibility, and ethical considerations.",
                      "I would like to initiate by defining the scope of this topic so that we can address both advantages and operational challenges.",
                    ],
                    tip: "Only initiate if you have a clear definition; initiating with vague filler loses credibility.",
                  },
                  {
                    stage: "2. Entering When Trapped / Fish Market",
                    color: "border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20",
                    phrases: [
                      "Friends, while we all have valuable viewpoints, let us give each speaker 30 seconds so the evaluators can clearly hear our points.",
                      "I completely understand the enthusiasm on this point, but let us also examine the security angle which has not been addressed yet.",
                    ],
                    tip: "Moderating chaos positions you as a natural team leader without shouting.",
                  },
                  {
                    stage: "3. Agreeing & Adding Value (Building)",
                    color: "border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20",
                    phrases: [
                      "I second Prashu's point regarding cloud automation, and to add empirical evidence, companies migrating to serverless saw 30% cost savings.",
                      "Building on that excellent observation, another crucial dimension is the end-user data privacy compliance.",
                    ],
                    tip: "Always add a new fact, statistic, or case study when agreeing with someone.",
                  },
                  {
                    stage: "4. Summarizing the Discussion",
                    color: "border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20",
                    phrases: [
                      "To conclude our discussion, our group largely concurred that while AI will automate repetitive tasks, human domain expertise remains irreplaceable.",
                      "In summary, we evaluated three major pillars: infrastructure cost, talent readiness, and data governance.",
                    ],
                    tip: "A summary must be neutral and represent both sides of the room, not just your personal view.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border ${item.color} space-y-3`}>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.stage}</h3>
                    <div className="space-y-2">
                      {item.phrases.map((phrase, pIdx) => (
                        <p key={pIdx} className="text-xs text-slate-700 dark:text-slate-300 italic pl-3 border-l-2 border-indigo-500">
                          &ldquo;{phrase}&rdquo;
                        </p>
                      ))}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-200/50 dark:border-slate-800">
                      Pro Tip: {item.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Tech Vocabulary */}
        {activeTab === "vocab" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">High-Impact Technical Vocabulary</h2>
              <p className="text-xs text-slate-500">
                Elevate your technical answers from generic to articulate engineering terminology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VOCAB_LIST.map((v, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-slate-900 dark:text-white">{v.word}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-500 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                        {v.pos}
                      </span>
                    </div>
                    <button
                      onClick={() => speakText(`${v.word}. ${v.def}`)}
                      className="p-1 text-slate-400 hover:text-indigo-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{v.def}</p>
                  <p className="text-xs italic text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                    Ex: &ldquo;{v.example}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

