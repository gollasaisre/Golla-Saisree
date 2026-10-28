"use client";

import { CheckCircle, Circle, Map, BookOpen, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { use, useState } from "react";
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

export default function RoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  const [activeBranch, setActiveBranch] = useState("CSE");
  const steps = ROADMAPS[activeBranch];
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
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{completedCount}/{steps.length} Complete</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 leading-tight">
              Career Roadmap
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-base max-w-lg">Select your engineering branch to view your personalized step-by-step career path.</p>
          </div>
          <div className="text-center shrink-0">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-200 dark:stroke-white/[0.06]" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="3" strokeDasharray={`${progress} 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{progress}%</span>
            </div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5">Progress</p>
          </div>
        </div>
      </div>

      {/* Branch Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(ROADMAPS).map(branch => (
          <button
            key={branch}
            onClick={() => setActiveBranch(branch)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border ${
              activeBranch === branch
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-transparent shadow-md shadow-indigo-500/20'
                : 'bg-white/60 dark:bg-white/[0.03] border-slate-200/60 dark:border-white/[0.06] text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/20'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="card p-8 md:p-10">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-100 dark:border-white/[0.04]">
          {activeBranch} Engineering Roadmap
        </h3>

        <div className="relative border-l-2 border-slate-200 dark:border-white/[0.06] ml-4 space-y-10">
          {steps.map((step, i) => {
            const level = levelConfig[step.level] || levelConfig.Beginner;
            return (
              <div key={i} className="relative pl-8 group">
                <div className="absolute -left-[13px] top-1">
                  {step.completed ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/30">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-white/10 flex items-center justify-center group-hover:border-indigo-400 dark:group-hover:border-indigo-500/30 transition-colors">
                      <Circle className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`text-lg font-bold ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                        {step.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${level.bg} ${level.text} border ${level.border}`}>
                        {step.level}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href="/study" className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      step.completed
                        ? 'border-emerald-200/50 dark:border-emerald-500/15 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 hover:bg-emerald-500/10'
                        : 'border-slate-200/60 dark:border-white/[0.06] text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-white/[0.02] hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}>
                      <BookOpen className="w-3.5 h-3.5" /> Study Guide
                    </Link>
                    {!step.completed && (
                      <button className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5">
                        Mark Complete <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="relative pl-8">
            <div className="absolute -left-[15px] top-0.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Trophy className="w-4.5 h-4.5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mt-1">Job Ready!</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
