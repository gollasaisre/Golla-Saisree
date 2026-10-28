"use client";

import { CheckCircle, Circle, Map, BookOpen, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const ROADMAPS: Record<string, { title: string; desc: string; level: string; completed: boolean }[]> = {
  CSE: [
    { title: "Learn Fundamentals", desc: "Master basic syntax, variables, and logic (C/C++, Java, or Python).", level: "Beginner", completed: true },
    { title: "Data Structures & Algorithms", desc: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching.", level: "Beginner", completed: true },
    { title: "Database Management Systems", desc: "SQL, Normalization, ACID properties, NoSQL.", level: "Intermediate", completed: false },
    { title: "Build First Project", desc: "Create a simple web or mobile application.", level: "Intermediate", completed: false },
    { title: "System Design & Cloud", desc: "Understand scalable architectures, AWS/Azure basics.", level: "Advanced", completed: false },
  ],
  IT: [
    { title: "Networking Basics", desc: "OSI Model, TCP/IP, DNS, HTTP/S.", level: "Beginner", completed: true },
    { title: "Operating Systems", desc: "Linux basics, shell scripting, process management.", level: "Beginner", completed: true },
    { title: "Web Technologies", desc: "HTML, CSS, JavaScript, Web Servers.", level: "Intermediate", completed: false },
    { title: "Cybersecurity Fundamentals", desc: "Cryptography, network security, ethical hacking basics.", level: "Intermediate", completed: false },
    { title: "Cloud & DevOps", desc: "AWS/GCP, Docker, Kubernetes, CI/CD pipelines.", level: "Advanced", completed: false },
  ],
  CSM: [
    { title: "Python & Math Foundations", desc: "Python syntax, Linear Algebra, Calculus, Statistics.", level: "Beginner", completed: true },
    { title: "Data Manipulation", desc: "Pandas, NumPy, Data Cleaning and Preprocessing.", level: "Beginner", completed: true },
    { title: "Machine Learning Algorithms", desc: "Supervised & Unsupervised learning, Scikit-Learn.", level: "Intermediate", completed: false },
    { title: "Deep Learning", desc: "Neural Networks, TensorFlow/PyTorch, CNNs, RNNs.", level: "Advanced", completed: false },
    { title: "MLOps & Deployment", desc: "Model serving, Docker, MLflow, edge deployment.", level: "Advanced", completed: false },
  ],
  CSD: [
    { title: "Design Fundamentals", desc: "Color theory, typography, UI/UX principles.", level: "Beginner", completed: true },
    { title: "Prototyping Tools", desc: "Figma, Adobe XD, Wireframing.", level: "Beginner", completed: true },
    { title: "Frontend Development", desc: "HTML, CSS, JavaScript, Responsive Design.", level: "Intermediate", completed: false },
    { title: "Interactive Design", desc: "Animations, Three.js, WebGL basics.", level: "Intermediate", completed: false },
    { title: "HCI & User Testing", desc: "Human-Computer Interaction, A/B testing, accessibility.", level: "Advanced", completed: false },
  ],
  ECE: [
    { title: "Basic Electronics", desc: "Diodes, Transistors, Operational Amplifiers.", level: "Beginner", completed: true },
    { title: "Digital Logic Design", desc: "Boolean algebra, combinational & sequential circuits.", level: "Beginner", completed: true },
    { title: "Microprocessors & Microcontrollers", desc: "8085/8086 architecture, Arduino, ARM.", level: "Intermediate", completed: false },
    { title: "Signals & Systems", desc: "Fourier transforms, Z-transforms, filters.", level: "Intermediate", completed: false },
    { title: "Embedded Systems/VLSI", desc: "Verilog/VHDL, IoT projects, FPGA basics.", level: "Advanced", completed: false },
  ],
  EEE: [
    { title: "Circuit Theory", desc: "Ohm's Law, KVL/KCL, Network Theorems.", level: "Beginner", completed: true },
    { title: "Electrical Machines", desc: "Transformers, DC/AC Motors, Generators.", level: "Beginner", completed: true },
    { title: "Power Systems", desc: "Transmission, Distribution, Fault analysis.", level: "Intermediate", completed: false },
    { title: "Control Systems", desc: "Transfer functions, stability analysis, PID controllers.", level: "Intermediate", completed: false },
    { title: "Power Electronics", desc: "Inverters, converters, renewable energy systems.", level: "Advanced", completed: false },
  ],
  MECHANICAL: [
    { title: "Engineering Mechanics", desc: "Statics, dynamics, friction, kinematics.", level: "Beginner", completed: true },
    { title: "Thermodynamics", desc: "Laws of thermodynamics, heat engines, entropy.", level: "Beginner", completed: true },
    { title: "Fluid Mechanics", desc: "Fluid properties, Bernoulli's equation, pipe flow.", level: "Intermediate", completed: false },
    { title: "Machine Design", desc: "CAD/CAM, SolidWorks, stress analysis, gears/shafts.", level: "Intermediate", completed: false },
    { title: "Manufacturing & Robotics", desc: "CNC, 3D printing, industrial robotics basics.", level: "Advanced", completed: false },
  ],
  AUTOMOBILE: [
    { title: "Automotive Fundamentals", desc: "IC engines, chassis, transmission systems.", level: "Beginner", completed: true },
    { title: "Vehicle Dynamics", desc: "Suspension, steering, braking mechanics, aerodynamics.", level: "Beginner", completed: true },
    { title: "Automotive Electronics", desc: "Sensors, actuators, engine control units (ECU).", level: "Intermediate", completed: false },
    { title: "Electric Vehicles (EVs)", desc: "Battery technology, BMS, electric motors.", level: "Advanced", completed: false },
    { title: "Automotive Design & Safety", desc: "CAD for autos, crash testing, safety standards.", level: "Advanced", completed: false },
  ],
  CIVIL: [
    { title: "Engineering Mechanics", desc: "Statics, dynamics, friction, kinematics.", level: "Beginner", completed: true },
    { title: "Strength of Materials", desc: "Stress, strain, bending moments, shear forces.", level: "Beginner", completed: true },
    { title: "Structural Analysis", desc: "Determinate and indeterminate structures, trusses.", level: "Intermediate", completed: false },
    { title: "Geotechnical & Fluid", desc: "Soil mechanics, pipe flow, open channel flow.", level: "Intermediate", completed: false },
    { title: "Construction Management", desc: "AutoCAD/Revit, RCC design, estimating.", level: "Advanced", completed: false },
  ]
};

const levelConfig: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-emerald-500/10 dark:bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200/50 dark:border-emerald-500/15" },
  Intermediate: { bg: "bg-amber-500/10 dark:bg-amber-500/15", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200/50 dark:border-amber-500/15" },
  Advanced: { bg: "bg-rose-500/10 dark:bg-rose-500/15", text: "text-rose-700 dark:text-rose-400", border: "border-rose-200/50 dark:border-rose-500/15" },
};

export default function RoadmapClient({ initialId }: { initialId: string }) {
  const normalizedId = ROADMAPS[initialId] ? initialId : "CSE";
  const [activeBranch, setActiveBranch] = useState(normalizedId);
  const steps = ROADMAPS[activeBranch] || ROADMAPS.CSE;
  const completedCount = steps.filter(s => s.completed).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-teal-500/[0.06] to-cyan-500/[0.08] dark:from-emerald-500/[0.12] dark:via-teal-500/[0.10] dark:to-cyan-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-200/30 dark:border-emerald-500/20">
                <Map className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Career Roadmap</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {activeBranch} <span className="text-gradient">Engineering Roadmap</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg">
              Follow this step-by-step milestone path to master key engineering competencies and prepare for placements.
            </p>
          </div>

          {/* Progress Circular Widget */}
          <div className="card-glass flex items-center gap-4 px-6 py-4 rounded-2xl shrink-0 border border-emerald-200/30 dark:border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-white/[0.08]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray={`${progress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800 dark:text-white">{progress}%</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Progress</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{completedCount}/{steps.length} Milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.keys(ROADMAPS).map((branch) => (
          <button
            key={branch}
            onClick={() => setActiveBranch(branch)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeBranch === branch
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-indigo-500/10"
                : "bg-white/60 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-white hover:text-slate-900 dark:hover:bg-white/[0.08] border border-slate-200/60 dark:border-white/[0.06]"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-white/[0.08]">
        {steps.map((step, idx) => {
          const cfg = levelConfig[step.level] || levelConfig.Beginner;
          return (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className={`absolute -left-6 md:-left-10 top-5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                step.completed
                  ? "bg-emerald-500 border-white dark:border-slate-900 text-white shadow-md shadow-emerald-500/30"
                  : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400"
              }`}>
                {step.completed ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              </div>

              {/* Card */}
              <div className="card-glass p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:border-indigo-500/30 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Step {idx + 1}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                    {step.level}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/[0.04]">
                  <span className={`text-xs font-bold ${step.completed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                    {step.completed ? "✓ Completed" : "In Progress"}
                  </span>
                  <Link href="/study" className="text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1 group/link">
                    Explore Resources <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
