"use client";
import { useState, useEffect } from "react";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  time: number;
  questions: Question[];
}

const CATEGORIES: Category[] = [
  {
    id: "programming",
    title: "Programming Logic",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    time: 15,
    questions: [
      { q: "What is the time complexity of searching in a balanced BST?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1, explanation: "A balanced BST halves the search space at each level, giving O(log n) time." },
      { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Linked List", "Heap"], answer: 1, explanation: "A Stack follows LIFO — the last element pushed is the first to be popped." },
      { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 2, explanation: "QuickSort degrades to O(n²) when the pivot is always the smallest or largest element." },
      { q: "Which of the following is NOT a characteristic of an array?", options: ["Fixed size", "Random access", "Dynamic resizing by default", "Contiguous memory"], answer: 2, explanation: "Arrays have fixed size by default; dynamic resizing is a feature of ArrayList/Vector." },
      { q: "What does Big-O notation represent?", options: ["Best-case performance", "Average-case performance", "Worst-case upper bound", "Exact running time"], answer: 2, explanation: "Big-O gives the upper bound (worst-case) on an algorithm's growth rate." },
      { q: "A hash map provides average-case lookup in:", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 3, explanation: "Hash maps use a hash function to compute the index directly, giving O(1) average-case lookup." },
      { q: "Which sorting algorithm is stable AND has O(n log n) worst case?", options: ["QuickSort", "HeapSort", "MergeSort", "SelectionSort"], answer: 2, explanation: "MergeSort is stable and always runs in O(n log n) in all cases." },
      { q: "What is the output of: int x = 5; x = x++ + ++x;?", options: ["10", "11", "12", "Undefined behavior"], answer: 3, explanation: "Modifying x multiple times between sequence points is undefined behavior in C/C++." },
      { q: "Recursion uses which underlying data structure?", options: ["Queue", "Stack", "Array", "Graph"], answer: 1, explanation: "Each recursive call is pushed onto the call stack; the function returns pop from it." },
      { q: "Which of these has O(1) insertion at the head?", options: ["Array", "Doubly Linked List", "Binary Search Tree", "Heap"], answer: 1, explanation: "Linked list head insertion is O(1) — just update the head pointer." },
      { q: "What is a pointer in C?", options: ["A variable holding a value", "A variable holding a memory address", "A function reference", "A type alias"], answer: 1, explanation: "A pointer stores the memory address of another variable." },
      { q: "Which OOP concept allows a class to inherit from multiple parents?", options: ["Encapsulation", "Polymorphism", "Multiple Inheritance", "Abstraction"], answer: 2, explanation: "Multiple inheritance allows one class to derive properties from more than one base class." },
      { q: "Binary search requires the input array to be:", options: ["Sorted", "Unsorted", "Of even length", "Distinct elements"], answer: 0, explanation: "Binary search only works on sorted arrays because it splits by comparing the midpoint." },
      { q: "Which data structure is best for implementing a priority queue?", options: ["Stack", "Queue", "Heap", "Array"], answer: 2, explanation: "A heap efficiently supports the extract-min/max operation in O(log n)." },
      { q: "Space complexity of an in-place algorithm is:", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "In-place algorithms use a constant amount of extra memory — O(1) space complexity." },
    ],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    icon: "🧠",
    color: "from-purple-500 to-pink-600",
    time: 15,
    questions: [
      { q: "Divide and Conquer works by:", options: ["Trying all possibilities", "Breaking a problem into sub-problems, solving each, combining", "Using previously stored results", "Greedy local choices"], answer: 1, explanation: "D&C splits the problem, recursively solves sub-problems, and merges results." },
      { q: "What differentiates Dynamic Programming from plain recursion?", options: ["DP uses loops only", "DP memoizes / stores sub-problem results", "DP is always faster", "DP works without recursion"], answer: 1, explanation: "DP stores results of overlapping sub-problems to avoid redundant computation." },
      { q: "The Sliding Window technique is primarily useful for:", options: ["Graph problems", "Subarray/substring problems with a fixed or variable window", "Sorting", "Tree traversal"], answer: 1, explanation: "Sliding window efficiently finds max/min sum subarrays, longest substrings, etc." },
      { q: "Kadane's Algorithm solves which classic problem?", options: ["Shortest path", "Maximum subarray sum", "0/1 Knapsack", "Cycle detection"], answer: 1, explanation: "Kadane's finds the contiguous subarray with the maximum sum in O(n)." },
      { q: "BFS (Breadth-First Search) uses which data structure?", options: ["Stack", "Priority Queue", "Queue", "Array"], answer: 2, explanation: "BFS explores level by level using a queue (FIFO)." },
      { q: "DFS (Depth-First Search) uses which data structure?", options: ["Queue", "Stack (or recursion call stack)", "Heap", "Set"], answer: 1, explanation: "DFS dives deep using a stack or the implicit call stack via recursion." },
      { q: "Two-pointer technique is best applied to:", options: ["Unsorted arrays only", "Sorted arrays or linked lists to avoid nested loops", "Hash maps", "Graph adjacency lists"], answer: 1, explanation: "Two pointers reduce O(n²) brute force to O(n) by moving pointers intelligently." },
      { q: "Backtracking is useful for:", options: ["Sorting data", "Exploring all possibilities and abandoning invalid paths early", "Single shortest path", "Greedy selection"], answer: 1, explanation: "Backtracking systematically tries candidates and prunes those that violate constraints." },
      { q: "A greedy algorithm always:", options: ["Finds the globally optimal solution", "Makes the locally optimal choice at each step", "Uses memoization", "Revisits choices"], answer: 1, explanation: "Greedy picks the best local option at each step, which may or may not give a global optimum." },
      { q: "Which algorithm finds the shortest path in a weighted graph?", options: ["BFS", "DFS", "Dijkstra's Algorithm", "Binary Search"], answer: 2, explanation: "Dijkstra's algorithm efficiently finds shortest paths in graphs with non-negative weights." },
      { q: "Matrix traversal in spiral order is solved using:", options: ["Recursion only", "Layer-by-layer boundary tracking", "BFS", "Stack"], answer: 1, explanation: "Spiral traversal tracks top, bottom, left, right boundaries and shrinks them after each row/column." },
      { q: "Memoization is:", options: ["Top-down DP caching results", "Bottom-up DP", "Sorting a memo", "None of the above"], answer: 0, explanation: "Memoization = top-down DP: recursive calls cache their return value to avoid recomputation." },
      { q: "The 0/1 Knapsack problem is best solved with:", options: ["Greedy", "Dynamic Programming", "BFS", "Binary Search"], answer: 1, explanation: "0/1 Knapsack requires DP because items cannot be split, so greedy fails." },
      { q: "Floyd-Warshall algorithm is used for:", options: ["Single source shortest path", "All-pairs shortest path", "Minimum spanning tree", "Topological sort"], answer: 1, explanation: "Floyd-Warshall computes shortest paths between every pair of vertices in O(V³)." },
      { q: "A 'monotonic stack' is used to solve problems involving:", options: ["Binary trees", "Next greater / smaller element", "Graph coloring", "String reversal"], answer: 1, explanation: "A monotonic stack maintains increasing/decreasing order to quickly find next greater/smaller elements." },
    ],
  },
  {
    id: "communication",
    title: "Communication Skills",
    icon: "🗣️",
    color: "from-green-500 to-teal-600",
    time: 15,
    questions: [
      { q: "What are the '7 C's of Communication'?", options: ["Clear, Concise, Correct, Complete, Concrete, Courteous, Considerate", "Concise, Confident, Charismatic, Creative, Caring, Calm, Composed", "Coherent, Candid, Crisp, Cool, Catchy, Correct, Cheerful", "Competent, Clear, Concise, Caring, Creative, Confident, Cooperative"], answer: 0, explanation: "The 7 C's are: Clear, Concise, Correct, Complete, Concrete, Courteous, Considerate." },
      { q: "Active listening means:", options: ["Waiting for your turn to speak", "Fully concentrating, understanding, and responding to the speaker", "Taking notes quickly", "Interrupting to clarify"], answer: 1, explanation: "Active listening involves full attention, empathy, and providing feedback to the speaker." },
      { q: "Paraphrasing in communication means:", options: ["Repeating word-for-word", "Restating the speaker's message in your own words", "Summarizing with bullet points", "Asking questions"], answer: 1, explanation: "Paraphrasing rephrases the message to confirm understanding and show you were listening." },
      { q: "BLUF in professional writing stands for:", options: ["Brief Long Useful Format", "Bottom Line Up Front", "Bold Language Used First", "Brief Layered Useful Facts"], answer: 1, explanation: "BLUF means stating the most important point first, common in military and business writing." },
      { q: "Non-verbal communication includes:", options: ["Emails and letters", "Body language, facial expressions, gestures, posture", "Telephone conversations", "Text messages"], answer: 1, explanation: "Non-verbal communication is everything except words: body language, eye contact, tone, etc." },
      { q: "The 'Feedback Sandwich' technique means:", options: ["Giving only positive feedback", "Positive feedback → constructive criticism → positive feedback", "Negative → positive → negative", "Only listing improvements"], answer: 1, explanation: "The sandwich wraps criticism between positive feedback to make it easier to receive." },
      { q: "In a job interview, maintaining eye contact shows:", options: ["Aggression", "Boredom", "Confidence and engagement", "Dominance"], answer: 2, explanation: "Appropriate eye contact signals confidence, attentiveness, and sincerity." },
      { q: "Professional email tone should be:", options: ["Casual and friendly with slang", "Formal, polite, and concise", "Emotional and expressive", "Brief to the point of being rude"], answer: 1, explanation: "Professional emails should be respectful, clear, and to-the-point without being cold." },
      { q: "Assertive communication differs from aggressive communication in that:", options: ["Assertive ignores others' rights", "Assertive respects both your own and others' rights", "Aggressive is always louder", "There is no difference"], answer: 1, explanation: "Assertive = expressing needs clearly while respecting others. Aggressive = disregarding others' rights." },
      { q: "Kinesics is the study of:", options: ["Tone of voice", "Body movement and gestures as communication", "Space and distance in communication", "Written symbols"], answer: 1, explanation: "Kinesics studies how body movements, facial expressions, and gestures communicate messages." },
      { q: "Proxemics refers to:", options: ["The speed of speech", "The use of space and distance in communication", "Pronunciation clarity", "Written language style"], answer: 1, explanation: "Proxemics (coined by Edward Hall) studies how physical space affects communication." },
      { q: "A good way to begin a Group Discussion is:", options: ["Wait for others to start", "Directly attack a point made by others", "Introduce the topic with a relevant fact, quote, or question", "Read from notes"], answer: 2, explanation: "Initiating with a fact or question establishes authority and sets a positive tone." },
      { q: "'Articulation' in speaking refers to:", options: ["The volume of voice", "The clear and distinct pronunciation of sounds and words", "The speed of delivery", "Body language"], answer: 1, explanation: "Articulation is the clarity with which sounds and words are pronounced." },
      { q: "Which subject-verb agreement is correct?", options: ["The team are playing well", "The team is playing well", "The teams is playing well", "The team were playing well"], answer: 1, explanation: "'Team' as a collective noun takes a singular verb in American English: 'The team is'." },
      { q: "Verbal communication includes:", options: ["Facial expressions", "Written messages only", "Spoken words and oral messages", "Hand gestures"], answer: 2, explanation: "Verbal communication covers all spoken language — face-to-face, phone, video calls, etc." },
    ],
  },
  {
    id: "skill-development",
    title: "Skill Development",
    icon: "📈",
    color: "from-orange-500 to-red-600",
    time: 15,
    questions: [
      { q: "A 'Growth Mindset' (Carol Dweck) believes:", options: ["Intelligence is fixed at birth", "Abilities can be developed through dedication and hard work", "Talent alone determines success", "Effort is unnecessary if you are talented"], answer: 1, explanation: "Growth mindset: abilities grow through effort, learning from failure, and persistence." },
      { q: "The Feynman Technique involves:", options: ["Speed reading textbooks", "Explaining a concept in simple terms to identify gaps", "Using flashcards", "Watching lecture videos passively"], answer: 1, explanation: "The Feynman Technique: explain the concept simply, identify gaps, go back and learn, simplify further." },
      { q: "Spaced Repetition is most effective for:", options: ["Physical skills", "Long-term memory retention of information", "Real-time problem solving", "Creative brainstorming"], answer: 1, explanation: "Spaced repetition reviews material at increasing intervals to consolidate long-term memory." },
      { q: "Deliberate Practice differs from regular practice by:", options: ["Being longer in duration", "Focusing on specific weaknesses with immediate feedback", "Being easier and more comfortable", "Covering a wider range of topics"], answer: 1, explanation: "Deliberate practice targets weak areas just beyond current ability, with immediate corrective feedback." },
      { q: "SMART goals stand for:", options: ["Simple, Manageable, Achievable, Relevant, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound", "Strategic, Meaningful, Agile, Realistic, Tactical", "Simple, Measurable, Ambitious, Relevant, Timed"], answer: 1, explanation: "SMART = Specific, Measurable, Achievable, Relevant, Time-bound — a framework for effective goal-setting." },
      { q: "Metacognition is:", options: ["Learning from others' experience", "Thinking about your own thinking and learning processes", "Memorizing large amounts of data", "Social learning theory"], answer: 1, explanation: "Metacognition involves awareness and regulation of your own cognitive processes." },
      { q: "The '10,000-Hour Rule' (Malcolm Gladwell) states:", options: ["10,000 hours of any activity makes you an expert", "Roughly 10,000 hours of deliberate practice leads to mastery", "You need exactly 10,000 hours to learn a skill", "10,000 hours of study replaces a degree"], answer: 1, explanation: "Gladwell popularized the idea that ~10,000 hours of deliberate practice produces expertise." },
      { q: "A 'T-Shaped' professional has:", options: ["Broad knowledge in one area, deep in many", "Deep expertise in one field plus broad knowledge across others", "Only technical skills", "Equal skills in all areas"], answer: 1, explanation: "T-shaped skills: deep expertise in one area (vertical bar) + broad knowledge across disciplines (horizontal)." },
      { q: "The Johari Window model is used to:", options: ["Manage time", "Improve self-awareness and communication with others", "Measure IQ", "Plan career paths"], answer: 1, explanation: "The Johari Window maps known/unknown information about yourself to improve self-awareness." },
      { q: "Bloom's Taxonomy (highest level) is:", options: ["Remember", "Understand", "Evaluate", "Create"], answer: 3, explanation: "Bloom's hierarchy: Remember → Understand → Apply → Analyze → Evaluate → Create (highest)." },
      { q: "Self-Regulated Learning involves:", options: ["Learning with a tutor only", "Setting goals, monitoring progress, and adjusting strategies independently", "Following a fixed curriculum", "Group study sessions"], answer: 1, explanation: "SRL is proactive: learners set goals, plan, monitor themselves, and reflect on outcomes." },
      { q: "Competency Mapping is:", options: ["Drawing a map to a workplace", "Identifying skills and behaviors needed for job roles", "Testing computer skills only", "A performance review format"], answer: 1, explanation: "Competency mapping identifies the key skills, knowledge, and behaviors required for specific roles." },
      { q: "Peer learning is most effective when:", options: ["One person teaches while others listen passively", "Learners actively teach, question, and discuss with each other", "All peers are at the same level", "Used only for technical subjects"], answer: 1, explanation: "Active peer teaching (explaining to others) deepens understanding for both the teacher and learner." },
      { q: "Constructive feedback should be:", options: ["Vague and general", "Specific, actionable, and focused on behavior not personality", "Always positive only", "Given only at annual reviews"], answer: 1, explanation: "Good feedback is specific ('Your report missed section 3') not personal ('You are careless')." },
      { q: "Skill transfer refers to:", options: ["Teaching others your skills", "Applying knowledge learned in one context to a new situation", "Transferring files digitally", "Changing career fields"], answer: 1, explanation: "Skill transfer is using previously learned knowledge or skills in new, different contexts." },
    ],
  },
  {
    id: "group-discussion",
    title: "Group Discussion",
    icon: "👥",
    color: "from-cyan-500 to-blue-600",
    time: 15,
    questions: [
      { q: "GD (Group Discussion) is primarily evaluated on:", options: ["Who speaks the longest", "Content, communication, confidence, and collaborative behavior", "Only the conclusion given", "The loudest participant"], answer: 1, explanation: "Evaluators judge: content quality, communication clarity, leadership, listening, and teamwork." },
      { q: "The best way to initiate a Group Discussion is:", options: ["Wait for the evaluator to start", "Jump in with a strong, relevant opening statement or statistic", "Disagree immediately with the first speaker", "Summarize without adding new content"], answer: 1, explanation: "A confident opener with a fact or clear stance establishes leadership and sets the tone." },
      { q: "A 'Fish Market GD' refers to:", options: ["A GD about aquatic business", "A chaotic GD where everyone speaks at once", "A silent GD format", "A GD with written answers"], answer: 1, explanation: "Fish Market GD = a very noisy, disorganized discussion. Stay calm and assertively re-enter." },
      { q: "Consensus building in a GD means:", options: ["Winning the argument", "Reaching a mutually acceptable conclusion through collaborative discussion", "Voting for the best idea", "Ignoring minority opinions"], answer: 1, explanation: "Consensus means finding common ground that most participants can accept, not forcing agreement." },
      { q: "Summarizing a GD effectively requires:", options: ["Repeating everything said verbatim", "Capturing key points from all sides and stating a balanced conclusion", "Only mentioning your own points", "Introducing new arguments at the end"], answer: 1, explanation: "A good summary covers main arguments from all sides, draws a balanced conclusion, no new points." },
      { q: "Active participation in a GD means:", options: ["Speaking the most number of times", "Contributing relevant points, listening well, and building on others' ideas", "Interrupting frequently", "Agreeing with everything said"], answer: 1, explanation: "Quality over quantity — relevant, well-timed contributions that advance the discussion." },
      { q: "Non-verbal cues important in a GD include:", options: ["Typing speed", "Eye contact, nodding, posture, and facial expressions", "Pen clicking", "Note-taking style"], answer: 1, explanation: "Positive body language (nodding, eye contact, open posture) signals engagement and respect." },
      { q: "Playing 'Devil's Advocate' in a GD means:", options: ["Being deliberately argumentative for the sake of it", "Challenging a popular view to explore its weaknesses", "Supporting the weakest argument", "Summarizing opposing views"], answer: 1, explanation: "Devil's Advocate intentionally argues against the prevailing view to stress-test it." },
      { q: "Paraphrasing someone in a GD is useful because:", options: ["It wastes time", "It shows you listened and helps clarify their point before responding", "It confuses other participants", "It is considered impolite"], answer: 1, explanation: "Paraphrasing ('So you mean...') validates the speaker and ensures you respond to the right point." },
      { q: "The 'bridging' technique in a GD means:", options: ["Changing the subject completely", "Connecting your point to a previous speaker's idea to build continuity", "Summarizing at the midpoint", "Interrupting politely"], answer: 1, explanation: "Bridging links your new point to what was said: 'Building on what X said, I would add that...'" },
      { q: "Critical thinking in a GD involves:", options: ["Memorizing facts", "Analyzing arguments, questioning assumptions, and evaluating evidence", "Only agreeing with experts", "Speaking rapidly"], answer: 1, explanation: "Critical thinking means examining arguments carefully, not just accepting or rejecting them." },
      { q: "Time management in a GD means:", options: ["Dominating the speaking time", "Pacing your contributions so the discussion covers breadth and depth", "Speaking only at the start", "Asking the moderator for extensions"], answer: 1, explanation: "Good GD participants are aware of time: contribute early, allow others, and help conclude on time." },
      { q: "In GD evaluation, 'conduct' refers to:", options: ["Academic qualifications", "Behavior: listening, respecting others, body language, turn-taking", "The final conclusion only", "Grammar and vocabulary"], answer: 1, explanation: "Conduct covers soft skills: politeness, active listening, not interrupting rudely, positive body language." },
      { q: "The improv rule 'Yes, And...' applied to GD means:", options: ["Always agree with everyone", "Acknowledge the previous point, then add your contribution", "Say yes to every argument", "Avoid disagreement at all costs"], answer: 1, explanation: "'Yes, And...' means: acknowledge what was said ('I agree that...') then advance the discussion further." },
      { q: "Turn-taking in a GD is best managed by:", options: ["The loudest person controlling the floor", "Using polite signals and waiting for a natural pause before speaking", "The evaluator assigning turns", "Writing your turn number on paper"], answer: 1, explanation: "Polite turn management: wait for pauses, use hand gestures, or phrases like 'May I add to that?'" },
    ],
  },
];

const STORAGE_KEY = "careerpilot_assessment_scores";

export default function AssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [allScores, setAllScores] = useState<Record<string, { score: number; total: number }>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAllScores(JSON.parse(saved));
    } catch {}
  }, []);

  function startCategory(cat: Category) {
    setSelectedCategory(cat);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setShowResults(false);
  }

  function handleAnswer(idx: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === selectedCategory!.questions[currentQ].answer) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    const cat = selectedCategory!;
    if (currentQ + 1 >= cat.questions.length) {
      const newScores = { ...allScores, [cat.id]: { score: score + (selectedAnswer === cat.questions[currentQ].answer ? 1 : 0), total: cat.questions.length } };
      // already counted in score state via handleAnswer, so use final score
      const finalScore = score + (selectedAnswer === cat.questions[currentQ].answer ? 0 : 0); 
      // score was incremented in handleAnswer already
      const saveScores = { ...allScores, [cat.id]: { score, total: cat.questions.length } };
      setAllScores(saveScores);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saveScores)); } catch {}
      setShowResults(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }

  function resetAll() {
    setSelectedCategory(null);
    setShowResults(false);
  }

  // RESULTS SCREEN
  if (showResults && selectedCategory) {
    const cat = selectedCategory;
    const s = allScores[cat.id] || { score, total: cat.questions.length };
    const pct = Math.round((s.score / s.total) * 100);
    const passed = pct >= 60;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="text-6xl mb-4">{passed ? "🏆" : "📚"}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{cat.icon} {cat.title}</h2>
            <div className={`text-6xl font-black mb-2 ${passed ? "text-green-400" : "text-red-400"}`}>{pct}%</div>
            <p className="text-white/70 mb-4">{s.score} out of {s.total} correct</p>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${passed ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {passed ? "✅ Passed" : "❌ Needs Improvement"}
            </span>
            {/* Progress bar */}
            <div className="mt-6 h-4 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 rounded-full ${passed ? "bg-green-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
            </div>
            {/* All category scores */}
            {Object.keys(allScores).length > 0 && (
              <div className="mt-8 text-left">
                <h3 className="text-white font-semibold mb-3">📊 Your Scores Across Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((c) => {
                    const sc = allScores[c.id];
                    if (!sc) return null;
                    const p = Math.round((sc.score / sc.total) * 100);
                    return (
                      <div key={c.id} className="flex items-center gap-3">
                        <span className="text-lg">{c.icon}</span>
                        <span className="text-white/70 text-sm flex-1">{c.title}</span>
                        <span className="text-white font-semibold text-sm">{sc.score}/{sc.total}</span>
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${p >= 60 ? "bg-green-400" : "bg-red-400"}`} style={{ width: `${p}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex gap-3 mt-8 justify-center flex-wrap">
              <button className="btn-primary" onClick={() => startCategory(cat)}>🔄 Try Again</button>
              <button className="btn-primary bg-white/10 hover:bg-white/20 border border-white/20" onClick={resetAll}>📋 All Categories</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  if (selectedCategory) {
    const cat = selectedCategory;
    const q = cat.questions[currentQ];
    const progress = ((currentQ) / cat.questions.length) * 100;
    const isCorrect = selectedAnswer === q.answer;
    const LETTERS = ["A", "B", "C", "D"];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={resetAll} className="text-white/60 hover:text-white transition-colors text-sm">← Back</button>
            <span className="text-white/60 text-sm">{cat.icon} {cat.title}</span>
            <span className="text-white font-semibold text-sm">{currentQ + 1}/{cat.questions.length}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-500`} style={{ width: `${progress}%` }} />
          </div>

          {/* Score */}
          <div className="flex justify-between mb-4 text-sm">
            <span className="text-green-400">✅ Correct: {score}</span>
            <span className="text-red-400">❌ Wrong: {currentQ - score}</span>
          </div>

          {/* Question card */}
          <div className="card mb-4">
            <p className="text-lg font-semibold text-white leading-relaxed">{q.q}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-4">
            {q.options.map((opt, idx) => {
              let cls = "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
              if (selectedAnswer === null) {
                cls += "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 cursor-pointer";
              } else if (idx === q.answer) {
                cls += "border-green-500 bg-green-500/20 text-green-300";
              } else if (idx === selectedAnswer) {
                cls += "border-red-500 bg-red-500/20 text-red-300";
              } else {
                cls += "border-white/10 bg-white/5 text-white/40 cursor-default";
              }
              return (
                <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                  <span className="inline-flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${selectedAnswer === null ? "bg-white/20" : idx === q.answer ? "bg-green-500" : idx === selectedAnswer ? "bg-red-500" : "bg-white/10"}`}>{LETTERS[idx]}</span>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border mb-4 ${isCorrect ? "border-green-500/40 bg-green-500/10" : "border-red-500/40 bg-red-500/10"}`}>
              <p className="font-semibold text-white mb-1">{isCorrect ? "✅ Correct!" : "❌ Incorrect"}</p>
              <p className="text-white/70 text-sm">{q.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <button className="btn-primary w-full" onClick={nextQuestion}>
              {currentQ + 1 >= cat.questions.length ? "📊 View Results" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // CATEGORY SELECTION
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">🎯 Assessment Center</h1>
          <p className="text-white/60 text-lg">Test your knowledge across 5 categories — 15 questions each</p>
        </div>

        {/* Score summary if attempted */}
        {Object.keys(allScores).length > 0 && (
          <div className="card mb-8">
            <h3 className="text-white font-semibold mb-4">📊 Your Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => {
                const sc = allScores[cat.id];
                if (!sc) return <div key={cat.id} className="text-center p-3 rounded-lg bg-white/5 text-white/30 text-xs">{cat.icon}<br />{cat.title}<br />Not Attempted</div>;
                const pct = Math.round((sc.score / sc.total) * 100);
                return (
                  <div key={cat.id} className={`text-center p-3 rounded-lg ${pct >= 60 ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    <div className="text-2xl">{cat.icon}</div>
                    <div className="text-white text-xs mt-1">{cat.title}</div>
                    <div className={`text-xl font-bold ${pct >= 60 ? "text-green-400" : "text-red-400"}`}>{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const sc = allScores[cat.id];
            return (
              <button key={cat.id} onClick={() => startCategory(cat)} className="card text-left hover:scale-105 transition-all duration-200 hover:shadow-2xl group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-4`}>{cat.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{cat.title}</h3>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span>📝 {cat.questions.length} questions</span>
                  <span>⏱ {cat.time} min</span>
                </div>
                {sc && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${Math.round((sc.score / sc.total) * 100) >= 60 ? "bg-green-400" : "bg-red-400"}`} style={{ width: `${Math.round((sc.score / sc.total) * 100)}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${Math.round((sc.score / sc.total) * 100) >= 60 ? "text-green-400" : "text-red-400"}`}>{sc.score}/{sc.total}</span>
                  </div>
                )}
                <div className={`mt-4 text-xs font-semibold px-3 py-1 rounded-full inline-block bg-gradient-to-r ${cat.color} text-white`}>
                  {sc ? "Retake Quiz →" : "Start Quiz →"}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-sm mt-8">Scores are saved in your browser. Pass mark: 60%</p>
      </div>
    </div>
  );
}
