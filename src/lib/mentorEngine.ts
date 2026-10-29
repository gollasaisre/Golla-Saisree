// Intelligent CareerPilot AI Knowledge & Offline Mentor Engine
// Ensures 100% reliable responses in static GitHub Pages and live server environments

export interface MentorResponse {
  message: string;
  suggestedActions: string[];
  category?: string;
}

interface KnowledgeTopic {
  keywords: string[];
  reply: string;
  actions: string[];
}

const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    keywords: ["resume", "ats", "cv", "portfolio", "format", "bullet point"],
    reply: `Here are core guidelines for building an ATS-Compliant Tech Resume:

1. **Use Single-Column Clean Layout**: Avoid tables, graphics, text boxes, or dual columns that confuse ATS parsers.
2. **Apply the Google X-Y-Z Formula**: "Accomplished [X] as measured by [Y], by doing [Z]" (e.g., "Optimized database query latency by 42% by indexing foreign keys and migrating to Redis caching").
3. **Keyword Alignment**: Include exact keywords from the job description (e.g., "REST APIs", "TypeScript", "Docker", "PostgreSQL").
4. **ATS Resume Builder**: Try our built-in split-screen builder with live preview at the **Resume Builder** page!`,
    actions: ["Open Resume Builder", "Check Interview Tips", "How to describe projects", "ATS Checklist"],
  },
  {
    keywords: ["python", "django", "flask", "fastapi", "numpy", "pandas", "gil", "decorator"],
    reply: `Python is one of the most versatile languages in modern computing:

- **Key Foundations**: Memory management, generators vs iterators, list comprehensions, decorators, and context managers (\`with\` statement).
- **Placement Hot Topics**: Global Interpreter Lock (GIL), shallow vs deep copy, \`*args\` and \`**kwargs\`, lambda functions, and OOP in Python.
- **Projects to Stand Out**: Build a FastAPI asynchronous microservice, a RAG document search with vector embeddings, or a full-stack data dashboard.
- Check our **Study Material** and **Programming Video Library** for structured Python & Python DSA courses!`,
    actions: ["Python DSA Roadmap", "Python Interview Prep", "Explore Study Material", "Coding Practice"],
  },
  {
    keywords: ["java", "spring", "springboot", "jvm", "oops", "multithreading", "garbage collection"],
    reply: `Core Java is essential for enterprise backends and campus placement drives:

1. **OOP Pillars**: Abstraction, Encapsulation, Inheritance, and Polymorphism (Compile-time vs Runtime).
2. **JVM Internals**: ClassLoader, Heap, Stack, Metaspace, and Garbage Collection (G1, ZGC, Generational GC).
3. **Collections Framework**: Difference between \`ArrayList\` (contiguous dynamic array) and \`LinkedList\` (node pointers); \`HashMap\` collisions (buckets converted to Red-Black Trees in Java 8+).
4. **Concurrency**: \`synchronized\`, \`volatile\`, \`ExecutorService\`, and CompletableFuture.
- Check our dedicated Java video masterclass in **Placement Prep**!`,
    actions: ["Java Interview Questions", "Java Video Library", "OOP Practice Quiz", "DSA in Java"],
  },
  {
    keywords: ["dsa", "data structures", "algorithm", "binary search", "tree", "graph", "dp", "dynamic programming"],
    reply: `Mastering Data Structures & Algorithms (DSA) for Placement:

- **Phase 1: Linear Structures**: Arrays, Strings, Two-Pointer technique, Sliding Window, Stacks & Queues.
- **Phase 2: Non-Linear Structures**: Binary Trees, BSTs, Heaps (Priority Queues), and Graphs (BFS/DFS, Dijkstra, Topological Sort).
- **Phase 3: Optimization**: Dynamic Programming (Memoization vs Tabulation), Greedy algorithms, and Bit Manipulation.
- **Pro Tip**: Always analyze both Time Complexity (\`O(N)\`) and Space Complexity (\`O(1)\`) before writing code in interviews!`,
    actions: ["Start DSA Assignment", "Graph Algorithms Notes", "Top 50 LeetCode Patterns", "Coding Assessment"],
  },
  {
    keywords: ["interview", "hr", "introduce yourself", "tell me about yourself", "weakness", "star method"],
    reply: `Mastering Technical & HR Interviews:

1. **"Tell Me About Yourself" Formula**:
   - *Past*: Brief academic foundation and how you discovered programming.
   - *Present*: Key technical skills, notable projects built, and current technical focus.
   - *Future*: Why this company and role align with your ambitions.
2. **Use the STAR Method for Behavioral Questions**:
   - **S**ituation (Context)
   - **T**ask (Challenge/Goal)
   - **A**ction (Exact steps you personally took)
   - **R**esult (Quantifiable business/technical impact)
3. Check our dedicated **Interview Tips** section in Placement Prep for model answers!`,
    actions: ["HR Interview Questions", "Technical Interview Prep", "Group Discussion Guide", "Placement Prep"],
  },
  {
    keywords: ["soft skills", "communication", "english", "speaking", "teamwork", "leadership"],
    reply: `Strong soft skills set you apart in hiring decisions:

- **Clarity over Complexity**: Speak at a controlled pace with concise sentences.
- **Active Listening**: Wait 2 seconds before answering interviewers to organize your thoughts.
- **Professional Email Writing**: Use clear subject lines, bullet points for key details, and polite call-to-actions.
- **Group Discussions**: Acknowledge others with *"Building on what Rahul mentioned..."* or *"I see your perspective, and I'd also add..."*.
- Explore our newly added **Soft Skills** and **Communication Skills** modules!`,
    actions: ["Open Soft Skills Module", "Communication Drills", "Group Discussion Rules", "Body Language Tips"],
  },
  {
    keywords: ["roadmap", "career", "branch", "cse", "it", "ece", "eee", "mech", "civil"],
    reply: `Personalized Engineering Career Roadmaps:

- **CSE / IT**: Full Stack Engineer, AI/ML Specialist, DevOps & Cloud Architect, Cybersecurity Analyst.
- **ECE**: Embedded Systems, Firmware Developer, VLSI Design, IoT Engineering.
- **EEE**: Power Electronics, Smart Grid Automation, Renewable Energy, EV Powertrains.
- **Mechanical**: Robotics, CAD/CAM Simulation, Thermal Dynamics, Automotive Design.
- Visit **My Roadmap** to view step-by-step milestones, recommended courses, and study tracks!`,
    actions: ["View CSE Roadmap", "View ECE Roadmap", "Explore All Roadmaps", "Placement Prep"],
  },
  {
    keywords: ["jobs", "internship", "hiring", "apply", "tracker"],
    reply: `Job Search & Placement Tracking Strategy:

1. **Targeted Applications**: Apply with a tailored resume that includes the exact tech stack mentioned in the job description.
2. **Track Everything**: Use our **Application Tracker** to log company name, date applied, interview rounds, and follow-up dates.
3. **Explore Jobs**: Visit the **Jobs** tab to explore curated entry-level engineering roles and future hiring trends!`,
    actions: ["Explore Engineering Jobs", "Open Application Tracker", "ATS Resume Review"],
  },
  {
    keywords: ["assignment", "quiz", "test", "practice", "questions"],
    reply: `Test your skills with interactive assignments:

- **Subject Challenges**: Solve question-by-question assignments in DSA, Java, Python, DBMS, and Web Development.
- **Instant Validation**: Get immediate scoring, detailed explanations, and progress tracking.
- Visit the **Assignments** section to start testing your knowledge!`,
    actions: ["Go to Assignments", "Take Skill Assessment", "Placement Prep Tests"],
  },
];

const DEFAULT_ACTIONS = [
  "How to prepare for campus placements?",
  "Resume tips for ATS optimization",
  "Python vs Java for backend development",
  "Top DSA topics for technical rounds",
];

export function getOfflineMentorReply(userPrompt: string): MentorResponse {
  const query = userPrompt.toLowerCase().trim();

  // Find best matching topic
  for (const topic of KNOWLEDGE_BASE) {
    if (topic.keywords.some((k) => query.includes(k))) {
      return {
        message: topic.reply,
        suggestedActions: topic.actions,
      };
    }
  }

  // Generic intelligent response
  return {
    message: `I'm here to guide your engineering career journey! Whether you need help with:
• **Technical Learning**: Java, Python, C++, Data Structures, DBMS, Operating Systems, or Web Dev.
• **Placement Strategy**: Technical round preparation, coding pattern masterclasses, and HR interview answers.
• **Career Tools**: Building ATS-ready resumes, department milestones, soft skills, and application tracking.

What specific area would you like to explore today?`,
    suggestedActions: DEFAULT_ACTIONS,
  };
}

