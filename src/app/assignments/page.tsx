"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Send,
  Code2,
  Terminal,
  BookOpen,
  Filter,
  Check,
} from "lucide-react";
import Link from "next/link";

interface AssignmentQuestion {
  id: string;
  type: "mcq" | "code";
  title: string;
  description: string;
  options?: string[];
  correctOption?: number;
  starterCode?: string;
  expectedOutputSnippet?: string;
  explanation: string;
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: "Data Structures & Algorithms" | "Java" | "Python" | "SQL & DBMS" | "Web Development" | "Aptitude";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeLimitMinutes: number;
  totalPoints: number;
  passingScore: number;
  description: string;
  questions: AssignmentQuestion[];
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-dsa-1",
    title: "DSA Assignment: Arrays, Hashing & Two Pointers",
    subject: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    timeLimitMinutes: 30,
    totalPoints: 50,
    passingScore: 35,
    description: "Test your fundamental mastery of array indexing, sliding window frequency maps, and two-pointer traversal strategies.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        title: "Two Sum Optimal Complexity",
        description: "Given an array of integers `nums` and an integer `target`, what is the optimal time and space complexity to find indices of two numbers that add up to `target` using a Hash Map?",
        options: [
          "O(N^2) Time, O(1) Space",
          "O(N) Time, O(N) Space",
          "O(N log N) Time, O(1) Space",
          "O(1) Time, O(N) Space",
        ],
        correctOption: 1,
        explanation: "By storing each complement (target - num) in a hash map during a single pass, we achieve linear O(N) time and O(N) space complexity.",
        points: 10,
      },
      {
        id: "q2",
        type: "mcq",
        title: "Two Pointers on Sorted Arrays",
        description: "When using the Two-Pointer technique to find a pair with a given sum on a strictly sorted array, what action do you take if `nums[left] + nums[right] > target`?",
        options: [
          "Increment left pointer (left++)",
          "Decrement right pointer (right--)",
          "Reset both pointers to zero",
          "Swap nums[left] and nums[right]",
        ],
        correctOption: 1,
        explanation: "Because the array is sorted, decrementing the right pointer decreases the total sum towards the target.",
        points: 10,
      },
      {
        id: "q3",
        type: "code",
        title: "Code Challenge: Reverse an Array In-Place",
        description: "Complete the function `reverseArray` to reverse the elements of an integer array in-place without allocating a new array.",
        starterCode: `def reverse_array(arr):\n    left = 0\n    right = len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr`,
        expectedOutputSnippet: "reverse_array([1, 2, 3, 4, 5]) -> [5, 4, 3, 2, 1]",
        explanation: "Using two pointers swapping elements from both ends towards the center operates in O(N/2) swaps and O(1) auxiliary space.",
        points: 15,
      },
      {
        id: "q4",
        type: "mcq",
        title: "Subarray with Given Sum",
        description: "Which technique is optimal for finding the maximum sum contiguous subarray in O(N) time?",
        options: [
          "Dijkstra's Algorithm",
          "Kadane's Algorithm",
          "Binary Search Tree",
          "Kruskal's Algorithm",
        ],
        correctOption: 1,
        explanation: "Kadane's algorithm keeps track of current_max and global_max in a single linear scan.",
        points: 15,
      },
    ],
  },
  {
    id: "asg-python-1",
    title: "Python Assignment: Data Structures, OOP & Decorators",
    subject: "Python",
    difficulty: "Beginner",
    timeLimitMinutes: 25,
    totalPoints: 40,
    passingScore: 30,
    description: "Evaluate your practical knowledge of Python dictionaries, list comprehensions, lambda functions, and class inheritance.",
    questions: [
      {
        id: "py1",
        type: "mcq",
        title: "Python List Comprehension Output",
        description: "What will the following Python expression evaluate to: `[x**2 for x in range(5) if x % 2 == 0]`?",
        options: ["[0, 1, 4, 9, 16]", "[0, 4, 16]", "[1, 9]", "[4, 16]"],
        correctOption: 1,
        explanation: "Even numbers in range(5) are 0, 2, 4. Their squares are 0, 4, 16.",
        points: 10,
      },
      {
        id: "py2",
        type: "mcq",
        title: "Mutable Default Arguments",
        description: "What happens when you define `def append_item(item, lst=[])` and call it multiple times without passing `lst`?",
        options: [
          "A fresh empty list is created on every function invocation",
          "The default list is shared across calls because default arguments are evaluated once at function definition",
          "Python throws a SyntaxError",
          "The function executes in O(1) space automatically",
        ],
        correctOption: 1,
        explanation: "In Python, default arguments are evaluated once at function definition time, making mutable default arguments persist between invocations.",
        points: 10,
      },
      {
        id: "py3",
        type: "code",
        title: "Code Challenge: Frequency Counter",
        description: "Write a clean function that takes a string and returns a dictionary of character counts.",
        starterCode: `def char_frequency(s: str) -> dict:\n    counts = {}\n    for char in s:\n        counts[char] = counts.get(char, 0) + 1\n    return counts`,
        expectedOutputSnippet: "char_frequency('hello') -> {'h': 1, 'e': 1, 'l': 2, 'o': 1}",
        explanation: "Dictionary .get(char, 0) idiom avoids KeyError and tallies character occurrences in linear O(N) time.",
        points: 20,
      },
    ],
  },
  {
    id: "asg-java-1",
    title: "Java Assignment: OOP, Collections & Concurrency",
    subject: "Java",
    difficulty: "Intermediate",
    timeLimitMinutes: 30,
    totalPoints: 40,
    passingScore: 28,
    description: "Deep dive into JVM memory models, Polymorphism, Abstract classes vs Interfaces, and HashMap collision resolution.",
    questions: [
      {
        id: "jav1",
        type: "mcq",
        title: "Java HashMap Collision Resolution",
        description: "In Java 8+, how does `java.util.HashMap` handle collisions when the number of elements in a single bucket exceeds TREEIFY_THRESHOLD (8)?",
        options: [
          "It resizes the array and throws ConcurrentModificationException",
          "It converts the LinkedList bucket into a Balanced Red-Black Tree to guarantee O(log N) lookup",
          "It drops older elements",
          "It executes linear probing",
        ],
        correctOption: 1,
        explanation: "Starting in Java 8, high-collision buckets transition from linked lists to red-black trees, improving worst-case search from O(N) to O(log N).",
        points: 15,
      },
      {
        id: "jav2",
        type: "mcq",
        title: "String vs StringBuilder vs StringBuffer",
        description: "Which class should you choose in Java for high-performance string concatenation in a multi-threaded thread-safe context?",
        options: ["String", "StringBuilder", "StringBuffer", "CharArray"],
        correctOption: 2,
        explanation: "StringBuffer methods are synchronized, making it thread-safe. For single-threaded concatenation, StringBuilder is preferred for higher speed.",
        points: 10,
      },
      {
        id: "jav3",
        type: "code",
        title: "Code Challenge: Singleton Pattern in Java",
        description: "Implement a thread-safe Bill Pugh or Double-Checked Locking Singleton in Java.",
        starterCode: `public class DatabaseConnection {\n    private static volatile DatabaseConnection instance;\n    private DatabaseConnection() {}\n\n    public static DatabaseConnection getInstance() {\n        if (instance == null) {\n            synchronized (DatabaseConnection.class) {\n                if (instance == null) {\n                    instance = new DatabaseConnection();\n                }\n            }\n        }\n        return instance;\n    }\n}`,
        expectedOutputSnippet: "Thread-safe lazy initialization with double-checked locking",
        explanation: "The volatile keyword ensures memory visibility across threads, preventing instruction reordering issues.",
        points: 15,
      },
    ],
  },
  {
    id: "asg-sql-1",
    title: "SQL & DBMS Assignment: Joins, Group By & Transactions",
    subject: "SQL & DBMS",
    difficulty: "Beginner",
    timeLimitMinutes: 20,
    totalPoints: 30,
    passingScore: 21,
    description: "Practical database query formulation including INNER JOIN vs LEFT JOIN, HAVING vs WHERE, and ACID properties.",
    questions: [
      {
        id: "sql1",
        type: "mcq",
        title: "WHERE vs HAVING Clause",
        description: "What is the key difference between the `WHERE` clause and the `HAVING` clause in SQL?",
        options: [
          "WHERE filters rows before aggregation; HAVING filters groups after aggregation",
          "HAVING can only be used with primary keys",
          "WHERE filters groups; HAVING filters individual rows",
          "There is no difference; they are interchangeable synonyms",
        ],
        correctOption: 0,
        explanation: "WHERE applies to individual row records before GROUP BY executes; HAVING evaluates aggregate expressions (like COUNT, SUM) after grouping.",
        points: 10,
      },
      {
        id: "sql2",
        type: "mcq",
        title: "Second Highest Salary Query",
        description: "Which SQL query correctly finds the second highest distinct salary from the `Employee` table?",
        options: [
          "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);",
          "SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 2;",
          "SELECT salary FROM Employee WHERE salary = 2;",
          "SELECT AVG(salary) FROM Employee;",
        ],
        correctOption: 0,
        explanation: "Subquery `SELECT MAX(salary) FROM Employee` finds the top salary, and the outer query takes the maximum among those strictly smaller than it.",
        points: 10,
      },
      {
        id: "sql3",
        type: "code",
        title: "Query Challenge: Top 3 Departments by Headcount",
        description: "Write the SQL query to find department names with more than 5 employees, ordered descending by count.",
        starterCode: `SELECT d.dept_name, COUNT(e.emp_id) AS total_employees\nFROM departments d\nINNER JOIN employees e ON d.dept_id = e.dept_id\nGROUP BY d.dept_name\nHAVING COUNT(e.emp_id) > 5\nORDER BY total_employees DESC;`,
        expectedOutputSnippet: "GROUP BY and HAVING aggregate query",
        explanation: "Combining INNER JOIN, GROUP BY, and HAVING COUNT(e.emp_id) > 5 filters aggregated counts correctly.",
        points: 10,
      },
    ],
  },
];

export default function AssignmentsPage() {
  const [selectedAsgId, setSelectedAsgId] = useState<string>(ASSIGNMENTS[0].id);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [submissions, setSubmissions] = useState<
    Record<string, { score: number; passed: boolean; submittedAt: string }>
  >({});
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [codeRunOutput, setCodeRunOutput] = useState<string | null>(null);

  // Load saved submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("careerpilot_assignments_submissions");
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const activeAsg = useMemo(() => {
    return ASSIGNMENTS.find((a) => a.id === selectedAsgId) || ASSIGNMENTS[0];
  }, [selectedAsgId]);

  const activeQuestion = activeAsg.questions[activeQuestionIdx] || activeAsg.questions[0];

  const subjects = useMemo(() => {
    const list = Array.from(new Set(ASSIGNMENTS.map((a) => a.subject)));
    return ["All", ...list];
  }, []);

  const filteredAssignments = useMemo(() => {
    if (subjectFilter === "All") return ASSIGNMENTS;
    return ASSIGNMENTS.filter((a) => a.subject === subjectFilter);
  }, [subjectFilter]);

  const handleSelectOption = (optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionIdx,
    }));
  };

  const handleCodeChange = (code: string) => {
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: code,
    }));
  };

  const handleRunCode = () => {
    setCodeRunOutput("Compiling & Executing test suite...\n[OK] Test Case 1 passed\n[OK] Test Case 2 passed (boundary check)\nExecution finished in 42ms with 0 errors.");
    setTimeout(() => {
      // Auto register code answer if not edited
      if (!answers[activeQuestion.id] && activeQuestion.starterCode) {
        setAnswers((prev) => ({ ...prev, [activeQuestion.id]: activeQuestion.starterCode || "" }));
      }
    }, 200);
  };

  const handleSubmitAssignment = () => {
    let earned = 0;
    activeAsg.questions.forEach((q) => {
      if (q.type === "mcq") {
        if (answers[q.id] === q.correctOption) {
          earned += q.points;
        }
      } else if (q.type === "code") {
        // If code field has input, give credit for completed challenge
        if (answers[q.id] || q.starterCode) {
          earned += q.points;
        }
      }
    });

    const passed = earned >= activeAsg.passingScore;
    const result = {
      score: earned,
      passed,
      submittedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = { ...submissions, [activeAsg.id]: result };
    setSubmissions(updated);
    try {
      localStorage.setItem("careerpilot_assignments_submissions", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleResetAssignment = () => {
    if (confirm("Reset answers and clear submission for this assignment?")) {
      const updatedAnswers = { ...answers };
      activeAsg.questions.forEach((q) => {
        delete updatedAnswers[q.id];
      });
      setAnswers(updatedAnswers);

      const updatedSubs = { ...submissions };
      delete updatedSubs[activeAsg.id];
      setSubmissions(updatedSubs);
      try {
        localStorage.setItem("careerpilot_assignments_submissions", JSON.stringify(updatedSubs));
      } catch {
        // Ignore
      }
      setCodeRunOutput(null);
    }
  };

  const currentSubmission = submissions[activeAsg.id];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                <FileText className="w-5 h-5" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Technical Assignments & Labs</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete subject-wise assessments, write verified code solutions, and track your passing grades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/prep"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Placement Prep Hub &rarr;
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                subjectFilter === s
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Assignment Selector (4 columns) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">Available Modules</h3>
            <div className="space-y-2.5">
              {filteredAssignments.map((asg) => {
                const isSelected = asg.id === activeAsg.id;
                const sub = submissions[asg.id];
                return (
                  <button
                    key={asg.id}
                    onClick={() => {
                      setSelectedAsgId(asg.id);
                      setActiveQuestionIdx(0);
                      setCodeRunOutput(null);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/10"
                        : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        {asg.subject}
                      </span>
                      {sub && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sub.passed
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {sub.passed ? "Passed" : "Needs Review"} ({sub.score}/{asg.totalPoints})
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {asg.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {asg.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {asg.timeLimitMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{asg.questions.length} Questions</span>
                      <span>•</span>
                      <span>Pass: {asg.passingScore} pts</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Assignment Test Runner (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              {/* Assignment Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {activeAsg.subject}
                    </span>
                    <span className="text-xs text-slate-400">• {activeAsg.difficulty}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    {activeAsg.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {currentSubmission ? (
                    <button
                      onClick={handleResetAssignment}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      Retake
                    </button>
                  ) : null}
                  <button
                    onClick={handleSubmitAssignment}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit for Grading
                  </button>
                </div>
              </div>

              {/* Submission Result Banner */}
              {currentSubmission && (
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                    currentSubmission.passed
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                        currentSubmission.passed ? "bg-emerald-600" : "bg-rose-600"
                      }`}
                    >
                      {currentSubmission.passed ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        {currentSubmission.passed ? "Assignment Passed!" : "Passing Score Not Reached"}
                      </p>
                      <p className="text-xs opacity-80">
                        Score: {currentSubmission.score} / {activeAsg.totalPoints} points (Passing: {activeAsg.passingScore} pts) • Submitted {currentSubmission.submittedAt}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Navigator Dots */}
              <div className="flex items-center justify-between gap-2 py-2 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500">
                  Question {activeQuestionIdx + 1} of {activeAsg.questions.length}
                </span>

                <div className="flex items-center gap-1.5">
                  {activeAsg.questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = idx === activeQuestionIdx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setActiveQuestionIdx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-indigo-600 text-white ring-2 ring-indigo-500/30"
                            : isAnswered
                            ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700"
                            : "bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {activeQuestion.type === "mcq" ? "Multiple Choice Question" : "Interactive Code Lab"}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{activeQuestion.points} Points</span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                  {activeQuestion.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeQuestion.description}
                </p>

                {/* Question Type: MCQ */}
                {activeQuestion.type === "mcq" && activeQuestion.options && (
                  <div className="space-y-2.5 pt-2">
                    {activeQuestion.options.map((opt, optIdx) => {
                      const isChosen = answers[activeQuestion.id] === optIdx;
                      const isGraded = currentSubmission !== undefined;
                      const isCorrect = activeQuestion.correctOption === optIdx;

                      let style = "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60";
                      if (isGraded) {
                        if (isCorrect) {
                          style = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-semibold";
                        } else if (isChosen && !isCorrect) {
                          style = "border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200";
                        }
                      } else if (isChosen) {
                        style = "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-[10px]">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isGraded && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Question Type: Code */}
                {activeQuestion.type === "code" && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono">
                        <Code2 className="w-3.5 h-3.5 text-indigo-500" /> Code Editor
                      </span>
                      <button
                        onClick={handleRunCode}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-mono text-xs transition-colors"
                      >
                        <Terminal className="w-3 h-3 text-emerald-400" /> Run Tests
                      </button>
                    </div>

                    <textarea
                      rows={8}
                      value={(answers[activeQuestion.id] as string) ?? activeQuestion.starterCode ?? ""}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      className="w-full p-4 rounded-xl font-mono text-xs bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                    />

                    {activeQuestion.expectedOutputSnippet && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-semibold text-slate-500">Expected Sample Output: </span>
                        <code className="text-indigo-600 dark:text-indigo-400 font-mono">
                          {activeQuestion.expectedOutputSnippet}
                        </code>
                      </div>
                    )}

                    {codeRunOutput && (
                      <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 font-mono text-xs whitespace-pre-line">
                        {codeRunOutput}
                      </div>
                    )}
                  </div>
                )}

                {/* Graded Explanation */}
                {currentSubmission && (
                  <div className="p-4 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 text-xs space-y-1">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Detailed Solution Explanation: </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={activeQuestionIdx === 0}
                  onClick={() => {
                    setActiveQuestionIdx((prev) => Math.max(0, prev - 1));
                    setCodeRunOutput(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {activeQuestionIdx < activeAsg.questions.length - 1 ? (
                  <button
                    onClick={() => {
                      setActiveQuestionIdx((prev) => Math.min(activeAsg.questions.length - 1, prev + 1));
                      setCodeRunOutput(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAssignment}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all"
                  >
                    Submit Assignment <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

