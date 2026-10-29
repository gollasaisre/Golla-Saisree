"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Award,
  BookOpen,
  Video,
  CheckCircle2,
  Play,
  HelpCircle,
  Clock,
  Compass,
  Users,
  Target,
  MessageCircle,
  Lightbulb,
  Briefcase,
  Mail,
  Shield,
  Layers,
  ChevronRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface SoftSkillTopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  youtubeId: string;
  summary: string;
  keyPrinciples: string[];
  realWorldScenario: string;
  practicalExercise: string[];
  quiz: QuizQuestion[];
}

const SOFT_SKILLS_DATA: SoftSkillTopic[] = [
  {
    id: "communication-fundamentals",
    title: "Communication Skills & Active Listening",
    category: "Communication Skills",
    iconName: "MessageCircle",
    level: "Beginner",
    estimatedMinutes: 20,
    youtubeId: "D5hGuFXxjX4",
    summary: "Learn the core 7 C's of communication (Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous) and how to practice active listening in team environments.",
    keyPrinciples: [
      "Listen to understand, not merely to reply.",
      "The 7 C's framework ensures messages are received with clarity without misunderstandings.",
      "Summarize back the other person's requirements before presenting your architectural solution.",
      "Avoid conversational hijacking; pause 2 seconds before giving your perspective.",
    ],
    realWorldScenario: "In a sprint retrospective, a junior engineer complains their tickets are blocked. Instead of defending the process, practice active listening: 'I hear that the API spec delays are slowing you down. Let's establish a mock server contract.'",
    practicalExercise: [
      "In your next 3 conversations, deliberately pause 2 seconds before answering.",
      "Practice the Paraphrase technique: 'So what you're saying is [X], is that correct?'",
      "Eliminate verbal filler words (um, uh, like) by replacing them with silent breathing pauses.",
    ],
    quiz: [
      {
        question: "What is the primary objective of active listening?",
        options: [
          "To think of your next clever counterargument",
          "To fully comprehend the speaker's message, perspective, and emotion",
          "To nod quickly so the speaker finishes faster",
          "To interrupt when a mistake is noticed",
        ],
        answer: 1,
        explanation: "Active listening focuses on absorbing and comprehending the speaker's intent rather than preparing a counter-response.",
      },
      {
        question: "Which of the following is NOT one of the 7 C's of communication?",
        options: ["Concise", "Complex", "Courteous", "Coherent"],
        answer: 1,
        explanation: "'Complex' violates the rule of clarity and conciseness.",
      },
    ],
  },
  {
    id: "english-speaking-fluency",
    title: "English Speaking & Professional Fluency",
    category: "English Speaking",
    iconName: "Compass",
    level: "Beginner",
    estimatedMinutes: 25,
    youtubeId: "WzKQ_6e0V40",
    summary: "Overcome fear of speaking English in technical interviews, improve sentence structure, and build conversational flow without mental translation.",
    keyPrinciples: [
      "Think directly in English rather than translating from your native language.",
      "Speak at 130-150 words per minute; clarity of enunciation matters more than rapid speed.",
      "Use technical transition phrases: 'Furthermore', 'Consequently', 'On the contrary', 'In summary'.",
    ],
    realWorldScenario: "During an HR round when asked 'Can you elaborate on your project challenges?', instead of stumbling, use the STAR format in crisp English: Situation, Task, Action, Result.",
    practicalExercise: [
      "Record yourself for 2 minutes answering 'Why are you passionate about software engineering?' and review your pronunciation.",
      "Learn 5 new professional transitional phrases each day and use them aloud.",
      "Read tech news or documentation aloud for 10 minutes every morning.",
    ],
    quiz: [
      {
        question: "What is the best technique to stop mental translation when speaking English?",
        options: [
          "Speaking as quickly as possible",
          "Thinking in English by describing objects and actions around you in English daily",
          "Reading without pronouncing words",
          "Only speaking during high-stakes interviews",
        ],
        answer: 1,
        explanation: "Narrating your daily activities mentally in English trains the brain to bypass translation pathways.",
      },
    ],
  },
  {
    id: "presentation-skills",
    title: "High-Impact Technical Presentation Skills",
    category: "Presentation Skills",
    iconName: "Layers",
    level: "Intermediate",
    estimatedMinutes: 30,
    youtubeId: "b0ZlK0JqfCg",
    summary: "Deliver compelling technical demos, architecture walk-throughs, and slide decks that engage both engineering teams and non-technical stakeholders.",
    keyPrinciples: [
      "Structure presentations with: Hook -> The Problem -> The Architecture -> The Demo -> The Impact.",
      "Limit each slide to 1 core takeaway; avoid walls of dense bullet points.",
      "Make eye contact with all sections of the room or look directly at the webcam during remote demos.",
      "Prepare for demo failure: always have offline fallback screenshots or videos.",
    ],
    realWorldScenario: "You need to convince the leadership team to migrate from a monolith to microservices. Instead of diving into code, show a graph of deployment cycle times and downtime costs.",
    practicalExercise: [
      "Prepare a 3-slide deck explaining one of your projects using only 1 diagram and 3 bullet points per slide.",
      "Practice the 10/20/30 Rule: 10 slides, 20 minutes, 30-point minimum font size.",
    ],
    quiz: [
      {
        question: "When presenting technical architecture to non-technical executive leadership, you should:",
        options: [
          "Show raw assembly or terminal commands",
          "Highlight business impact, security improvements, cost savings, and high-level workflow",
          "Skip the presentation and send a 50-page PDF",
          "Apologize that they won't understand the engineering complexity",
        ],
        answer: 1,
        explanation: "Executives focus on ROI, system reliability, speed of delivery, and user experience.",
      },
    ],
  },
  {
    id: "leadership-influence",
    title: "Leadership & Influencing Without Authority",
    category: "Leadership Skills",
    iconName: "Award",
    level: "Advanced",
    estimatedMinutes: 30,
    youtubeId: "u4ZoJKF_VuA",
    summary: "Develop servant leadership, mentor junior team members, drive consensus during disagreements, and inspire project ownership.",
    keyPrinciples: [
      "Servant Leadership: Clear roadblocks for your peers rather than commanding tasks.",
      "Praise in public; give constructive feedback in private 1-on-1 sessions.",
      "Lead by example: maintain high code quality, automated tests, and helpful code reviews.",
    ],
    realWorldScenario: "Two teammates disagree on whether to use GraphQL or REST. As a tech lead, guide them to write an RFC (Request for Comments) comparing latency, caching, and developer velocity rather than arguing on Slack.",
    practicalExercise: [
      "Write a constructive code review comment that teaches a design pattern rather than just flagging a defect.",
      "Identify a recurring pain point in your team's workflow and write a 1-page proposal to automate it.",
    ],
    quiz: [
      {
        question: "How does an engineer demonstrate leadership without being an official manager?",
        options: [
          "By taking credit for others' PRs",
          "By proactively proposing solutions, mentoring others, and writing clear documentation",
          "By refusing to write code until promoted",
          "By only working in isolation",
        ],
        answer: 1,
        explanation: "Informal leadership is demonstrated through initiative, enablement of others, and high-impact collaboration.",
      },
    ],
  },
  {
    id: "teamwork-collaboration",
    title: "Teamwork & Cross-Functional Collaboration",
    category: "Teamwork",
    iconName: "Users",
    level: "Beginner",
    estimatedMinutes: 20,
    youtubeId: "lmyZMtPVodo",
    summary: "Work effectively in Agile squads, collaborate smoothly with Product Managers and UI/UX Designers, and navigate Git code reviews with empathy.",
    keyPrinciples: [
      "Adopt blameless post-mortems: focus on fixing the system failure, not pointing fingers at people.",
      "Respect divergent expertise: Product prioritizes user value, Design prioritizes user flow, Engineering prioritizes reliability.",
      "Leave PR review comments that explain the 'why' behind suggested changes.",
    ],
    realWorldScenario: "A bug hits production due to an edge case in your teammate's pull request. Instead of saying 'He broke it', help write a regression test and patch it together.",
    practicalExercise: [
      "Simulate a 5-minute standup update: 'Yesterday I finished X, today I am building Y, no blockers.'",
      "Conduct a peer review using the 'Compliment -> Suggestion -> Rationale' pattern.",
    ],
    quiz: [
      {
        question: "What is the key principle of a blameless post-mortem?",
        options: [
          "Finding the individual to blame so they can be reprimanded",
          "Analyzing the root causes of the failure and improving the process/automation to prevent recurrence",
          "Ignoring the bug so team morale remains high",
          "Deleting the server logs",
        ],
        answer: 1,
        explanation: "Blameless post-mortems assume humans make mistakes and seek to fortify system guardrails.",
      },
    ],
  },
  {
    id: "time-management",
    title: "Time Management, Deep Work & Prioritization",
    category: "Time Management",
    iconName: "Clock",
    level: "Intermediate",
    estimatedMinutes: 25,
    youtubeId: "iONDebHX9qk",
    summary: "Master the Eisenhower Matrix, Time-blocking, the Pomodoro Technique, and deep work strategies to code without context switching fatigue.",
    keyPrinciples: [
      "Eisenhower Matrix: Categorize tasks by Urgent vs Important. Spend 70% of time on Important but Not Urgent tasks.",
      "Batch shallow tasks (emails, Slack messages, ticket triage) into two designated 30-minute daily windows.",
      "Protect 3-hour blocks of uninterrupted flow for complex algorithmic architecture and coding.",
    ],
    realWorldScenario: "You are midway through debugging a distributed lock issue when 3 Slack notifications arrive asking for help with styling. Mute notifications and maintain your flow state for another 45 minutes.",
    practicalExercise: [
      "Implement 4 rounds of Pomodoro (25 min code / 5 min break) without touching your phone.",
      "Create a weekly Eisenhower Matrix for your upcoming college assignments and placement preparation.",
    ],
    quiz: [
      {
        question: "According to the Eisenhower Matrix, which quadrant builds long-term career success?",
        options: [
          "Urgent and Not Important (Quadrant 3)",
          "Not Urgent and Not Important (Quadrant 4)",
          "Important but Not Urgent (Quadrant 2 - learning, architecture, health)",
          "Urgent and Unplanned (Quadrant 1 firefighting)",
        ],
        answer: 2,
        explanation: "Quadrant 2 activities (skill building, system design, strategic planning) generate exponential returns.",
      },
    ],
  },
  {
    id: "problem-solving",
    title: "First-Principles Problem Solving",
    category: "Problem-Solving Skills",
    iconName: "Lightbulb",
    level: "Intermediate",
    estimatedMinutes: 25,
    youtubeId: "bEusrD8g-dM",
    summary: "Break ambiguous software challenges down into fundamental truths, apply root-cause 5 Whys analysis, and build systematic solutions.",
    keyPrinciples: [
      "Decompose before coding: break an ambiguous problem into independent sub-problems.",
      "Apply the 5 Whys technique to trace a bug to its structural architectural origin.",
      "Always verify assumptions: test with edge cases (empty inputs, concurrency, overflow).",
    ],
    realWorldScenario: "The database query latency spikes 5x. Instead of immediately paying for a bigger server, use 5 Whys to realize an unindexed foreign key in a new migration caused a full table scan.",
    practicalExercise: [
      "Pick a recent bug you encountered and write out the '5 Whys' root cause chain.",
      "Design an algorithm on paper using pseudo-code and test trace before opening your IDE.",
    ],
    quiz: [
      {
        question: "What is first-principles thinking?",
        options: [
          "Copying code from Stack Overflow without understanding it",
          "Boiling things down to the most fundamental truths and reasoning up from there",
          "Following tradition without questioning why it was built that way",
          "Guessing random parameters until an error disappears",
        ],
        answer: 1,
        explanation: "First-principles thinking strips away analogies and starts from verified core facts.",
      },
    ],
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking & Cognitive Bias Avoidance",
    category: "Critical Thinking",
    iconName: "Sparkles",
    level: "Advanced",
    estimatedMinutes: 25,
    youtubeId: "dItUGF8GdTw",
    summary: "Avoid confirmation bias, sunk cost fallacies, and resume-driven development when making technical architectural decisions.",
    keyPrinciples: [
      "Avoid Resume-Driven Development (RDD): select tools because they fit the project requirements, not just because they are trendy.",
      "Beware of Sunk Cost Fallacy: be willing to pivot away from a broken prototype even if you spent 2 weeks writing it.",
      "Play Devil's Advocate against your own design: what are the 3 ways this architecture could fail under load?",
    ],
    realWorldScenario: "Your startup with 500 daily active users wants to set up a multi-region Kubernetes cluster. Critical thinking dictates starting with a managed container service to minimize operational overhead.",
    practicalExercise: [
      "Evaluate two competing technologies (e.g. Postgres vs MongoDB) and write a balanced pros/cons matrix for a specific use case.",
    ],
    quiz: [
      {
        question: "Which scenario describes the Sunk Cost Fallacy in software development?",
        options: [
          "Refactoring an old function to improve speed",
          "Continuing to invest engineering time into a fundamentally flawed framework solely because you already spent months on it",
          "Choosing open-source software over paid licenses",
          "Writing automated unit tests before shipping",
        ],
        answer: 1,
        explanation: "Sunk Cost Fallacy occurs when past non-recoverable investments irrationally drive future decisions.",
      },
    ],
  },
  {
    id: "workplace-etiquette",
    title: "Workplace Etiquette & Professional Culture",
    category: "Workplace Etiquette",
    iconName: "Briefcase",
    level: "Beginner",
    estimatedMinutes: 15,
    youtubeId: "V5d_l9gU49o",
    summary: "Understand remote and office etiquette, video conference norms, punctuality, respecting time zones, and professional boundary management.",
    keyPrinciples: [
      "Always be punctual: joining a meeting 1 minute early shows respect for everyone's schedule.",
      "Mute your microphone by default when not speaking during video conferences.",
      "Communicate asynchronously: write complete context in Slack messages instead of just saying 'Hi'.",
    ],
    realWorldScenario: "Instead of sending 'Hey Prashu' and waiting for them to reply before asking your question, send: 'Hey Prashu, do you know where the staging API keys for the payment gateway are stored? Thanks!'",
    practicalExercise: [
      "Review your recent chat messages: ensure they contain actionable questions rather than single-word greetings.",
    ],
    quiz: [
      {
        question: "Why is 'no-hello' (combining greeting and question in one message) preferred in remote workplaces?",
        options: [
          "It saves time, respects asynchronous workflows, and lets the recipient answer immediately with context",
          "It is considered rude and should never be used",
          "It forces the recipient to attend an unscheduled video call",
          "It crashes Slack servers",
        ],
        answer: 0,
        explanation: "Combining your greeting and message prevents disruptive notification ping-pong across time zones.",
      },
    ],
  },
  {
    id: "email-writing",
    title: "Professional Email & Asynchronous Writing",
    category: "Professional Email Writing",
    iconName: "Mail",
    level: "Beginner",
    estimatedMinutes: 20,
    youtubeId: "p57S4V2vEw0",
    summary: "Write concise, clear emails with effective subject lines, actionable call-to-actions, and proper formal vs semi-formal tone for recruiters and managers.",
    keyPrinciples: [
      "Subject line must be descriptive: '[Action Required] Q3 Backend Architecture Review' instead of 'Quick question'.",
      "The Bottom Line Up Front (BLUF) principle: state the request or conclusion in the first two sentences.",
      "Use numbered lists for multiple questions so the recipient can reply item-by-item.",
    ],
    realWorldScenario: "Drafting a cold outreach email to a tech recruiter. Keep it under 150 words: who you are, what relevant value you built with GitHub/live links, and a low-friction question.",
    practicalExercise: [
      "Draft a 4-sentence email requesting a 15-minute informational interview with a senior engineer.",
    ],
    quiz: [
      {
        question: "What does BLUF stand for in professional executive communication?",
        options: [
          "Backwards Logical Unit Function",
          "Bottom Line Up Front",
          "Basic Language Under Format",
          "Begin Last Understand First",
        ],
        answer: 1,
        explanation: "BLUF puts the conclusion and key ask at the very start so busy readers immediately know what is required.",
      },
    ],
  },
  {
    id: "confidence-building",
    title: "Confidence Building & Overcoming Imposter Syndrome",
    category: "Confidence Building",
    iconName: "Zap",
    level: "Intermediate",
    estimatedMinutes: 20,
    youtubeId: "ZkwqZfvahSE",
    summary: "Transform self-doubt into healthy curiosity, keep a brag document of accomplishments, and project authentic confidence during technical interviews.",
    keyPrinciples: [
      "Imposter syndrome is common among high achievers: acknowledge it as evidence that you are challenging yourself.",
      "Maintain a 'Brag Sheet' or 'Win Journal' of bugs fixed, features shipped, and certifications completed.",
      "Replace 'I don't know' with 'I haven't worked with that specific tool yet, but based on my experience with X, I would approach it by...'",
    ],
    realWorldScenario: "An interviewer asks about a technology you haven't used. Instead of panicking, explain how your core conceptual knowledge in related libraries allows you to ramp up quickly.",
    practicalExercise: [
      "Write down 5 concrete technical hurdles you solved in the past 6 months.",
    ],
    quiz: [
      {
        question: "When an interviewer asks about an unfamiliar framework, what is the best response?",
        options: [
          "Pretend you are an expert and invent fake features",
          "Acknowledge you haven't used it directly, draw parallels to similar tools you know, and explain how you would learn it",
          "Remain completely silent",
          "Criticize the framework as useless",
        ],
        answer: 1,
        explanation: "Transparency paired with analogical reasoning and eagerness to learn demonstrates intellectual maturity.",
      },
    ],
  },
  {
    id: "body-language",
    title: "Body Language, Presence & Video Call Delivery",
    category: "Body Language",
    iconName: "Shield",
    level: "Beginner",
    estimatedMinutes: 15,
    youtubeId: "Ks-_Mh1QhMc",
    summary: "Command presence through non-verbal cues: open posture, camera framing at eye level, purposeful hand gestures, and steady eye contact.",
    keyPrinciples: [
      "Camera setup: position your webcam at eye level, not looking up your chin.",
      "Open posture: keep shoulders relaxed and hands visible; avoid crossed arms or slouching.",
      "Nod attentively while the interviewer or speaker is talking to signal comprehension.",
    ],
    realWorldScenario: "In a virtual interview on Google Meet, look directly into the camera lens when speaking your key points, creating the psychological perception of eye contact.",
    practicalExercise: [
      "Set your laptop on a stand or stack of books so the camera aligns horizontally with your eyes.",
      "Record a 1-minute video explaining a sorting algorithm and observe your posture and eye contact.",
    ],
    quiz: [
      {
        question: "In a remote video interview, how do you create the impression of eye contact with the interviewer?",
        options: [
          "By looking at your own self-view video",
          "By looking directly at the camera lens when delivering your answer",
          "By closing your eyes to concentrate",
          "By looking down at the keyboard",
        ],
        answer: 1,
        explanation: "Looking into the camera lens creates direct eye contact for the other participants on the call.",
      },
    ],
  },
];

export default function SoftSkillsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(SOFT_SKILLS_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  // Load completed topics from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("careerpilot_softskills_progress");
      if (saved) {
        setCompletedTopics(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleTopicComplete = (id: string) => {
    const updated = { ...completedTopics, [id]: !completedTopics[id] };
    setCompletedTopics(updated);
    try {
      localStorage.setItem("careerpilot_softskills_progress", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SOFT_SKILLS_DATA.map((t) => t.category)));
    return ["All", ...cats];
  }, []);

  const filteredTopics = useMemo(() => {
    return SOFT_SKILLS_DATA.filter((topic) => {
      const matchesCat = selectedCategory === "All" || topic.category === selectedCategory;
      const matchesSearch =
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeTopic = useMemo(() => {
    return SOFT_SKILLS_DATA.find((t) => t.id === selectedTopicId) || SOFT_SKILLS_DATA[0];
  }, [selectedTopicId]);

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [`${activeTopic.id}-${qIndex}`]: optionIndex,
    }));
  };

  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / SOFT_SKILLS_DATA.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-violet-500/10 text-violet-500 dark:bg-violet-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Soft Skills & Executive Mastery</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Master the 12 essential non-technical skills recruiters evaluate: communication, leadership, critical thinking, etiquette, and confidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/communication"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40 hover:bg-indigo-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              English Speaking Lab &rarr;
            </Link>
          </div>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/15 dark:via-purple-500/15 dark:to-pink-500/15 border border-indigo-200/40 dark:border-indigo-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
              {progressPercent}%
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Soft Skills Certification Readiness</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedCount} of {SOFT_SKILLS_DATA.length} modules completed
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64 bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search soft skills topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Topic List (4 columns) */}
          <div className="lg:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === activeTopic.id;
              const isDone = completedTopics[topic.id];
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/10"
                      : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {topic.category}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {topic.summary}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {topic.estimatedMinutes} mins
                    </span>
                    <span>•</span>
                    <span>{topic.level}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Topic Details (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              {/* Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {activeTopic.category}
                    </span>
                    <span className="text-xs text-slate-400">• {activeTopic.level}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {activeTopic.title}
                  </h2>
                </div>

                <button
                  onClick={() => toggleTopicComplete(activeTopic.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    completedTopics[activeTopic.id]
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedTopics[activeTopic.id] ? "Completed (Click to undo)" : "Mark as Completed"}
                </button>
              </div>

              {/* Video Embed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Video className="w-4 h-4 text-rose-500" />
                    <span>Executive Video Masterclass</span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${activeTopic.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    Open on YouTube &rarr;
                  </a>
                </div>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-200 dark:border-slate-800">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeTopic.youtubeId}?rel=0`}
                    title={activeTopic.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </div>

              {/* Core Principles */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Core Principles & Methodology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTopic.keyPrinciples.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Scenario */}
              <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="w-4 h-4" />
                  Real-World Placement / Workplace Scenario
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeTopic.realWorldScenario}
                </p>
              </div>

              {/* Practical Exercises */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Practical Action Checklist
                </h3>
                <div className="space-y-2">
                  {activeTopic.practicalExercise.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs"
                    >
                      <input
                        type="checkbox"
                        id={`ex-${activeTopic.id}-${i}`}
                        className="w-4 h-4 mt-0.5 accent-indigo-600 rounded cursor-pointer"
                      />
                      <label
                        htmlFor={`ex-${activeTopic.id}-${i}`}
                        className="text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        {ex}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Quiz */}
              {activeTopic.quiz.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-violet-500" />
                      Topic Mastery Quiz
                    </h3>
                    <span className="text-xs text-slate-400">{activeTopic.quiz.length} Questions</span>
                  </div>

                  <div className="space-y-4">
                    {activeTopic.quiz.map((q, qIndex) => {
                      const userChoice = quizAnswers[`${activeTopic.id}-${qIndex}`];
                      const isSubmitted = quizSubmitted[activeTopic.id];
                      return (
                        <div
                          key={qIndex}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3"
                        >
                          <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {qIndex + 1}. {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => {
                              const isSelected = userChoice === optIndex;
                              const isCorrect = q.answer === optIndex;
                              let btnClass =
                                "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800";
                              if (isSubmitted) {
                                if (isCorrect) {
                                  btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold";
                                } else if (isSelected && !isCorrect) {
                                  btnClass = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300";
                                }
                              } else if (isSelected) {
                                btnClass = "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold";
                              }

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() => handleSelectAnswer(qIndex, optIndex)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isSubmitted && isCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isSubmitted && (
                            <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200/40 dark:border-indigo-500/20 text-xs text-slate-600 dark:text-slate-300">
                              <span className="font-bold text-indigo-600 dark:text-indigo-400">Explanation: </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          setQuizSubmitted((prev) => ({ ...prev, [activeTopic.id]: !prev[activeTopic.id] }))
                        }
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                      >
                        {quizSubmitted[activeTopic.id] ? "Retake Quiz" : "Check Quiz Answers"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

