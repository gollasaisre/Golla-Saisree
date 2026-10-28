"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Brain, Code2, Users, Sparkles, Trophy, Target, ArrowRight } from "lucide-react";

export default function AssessmentPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const categories = [
    { name: "Programming Logic", icon: Code2, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/25", bg: "bg-blue-500/10 dark:bg-blue-500/15", text: "text-blue-600 dark:text-blue-400", questions: 10 },
    { name: "Problem Solving", icon: Brain, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/25", bg: "bg-violet-500/10 dark:bg-violet-500/15", text: "text-violet-600 dark:text-violet-400", questions: 10 },
    { name: "Communication", icon: Users, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/25", bg: "bg-emerald-500/10 dark:bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-400", questions: 10 },
  ];

  if (completed) {
    return (
      <div className="max-w-3xl mx-auto text-center space-y-8 pt-8 pb-12">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Assessment Complete!</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mt-3">
            Your Career Readiness Score is{" "}
            <span className="font-extrabold text-gradient">85%</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { score: 90, label: "Programming", gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
            { score: 85, label: "Problem Solving", gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" },
            { score: 80, label: "Communication", gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
          ].map((item, i) => (
            <div key={i} className="card p-6 hover:border-indigo-200/50 dark:hover:border-indigo-500/10 transition-all">
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow} mb-4`}>
                <span className="text-white font-bold text-lg">{item.score}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden mb-2">
                <div className={`h-full bg-gradient-to-r ${item.gradient} rounded-full animate-progress-fill`} style={{ width: `${item.score}%` }} />
              </div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>

        <button className="btn-primary px-8 py-3 text-base flex items-center gap-2 mx-auto group">
          View Recommendations <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  if (started) {
    return (
      <div className="max-w-3xl mx-auto h-[calc(100vh-10rem)] flex flex-col justify-center">
        <div className="card-glass p-8 md:p-10 rounded-3xl space-y-8">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-500 dark:text-slate-400">Question {currentQuestion + 1} of 10</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200/30 dark:border-indigo-500/20">
              <Code2 className="w-3.5 h-3.5" /> Programming Logic
            </span>
          </div>
          
          <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
            What is the time complexity of searching for an element in a balanced Binary Search Tree?
          </h2>

          <div className="space-y-3 pt-2">
            {["O(1)", "O(n)", "O(log n)", "O(n log n)"].map((opt, i) => (
              <button 
                key={i}
                onClick={() => {
                  setSelectedAnswer(i);
                  setTimeout(() => {
                    if (currentQuestion < 9) setCurrentQuestion(prev => prev + 1);
                    else setCompleted(true);
                    setSelectedAnswer(null);
                  }, 400);
                }}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium flex justify-between items-center group ${
                  selectedAnswer === i
                    ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 scale-[0.99]"
                    : "border-slate-200 dark:border-white/[0.06] hover:border-indigo-300 dark:hover:border-indigo-500/20 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                    selectedAnswer === i
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  } transition-all`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAnswer === i
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
                }`}>
                  {selectedAnswer === i && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/[0.08] via-purple-500/[0.06] to-indigo-500/[0.08] dark:from-violet-500/[0.12] dark:via-purple-500/[0.10] dark:to-indigo-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 dark:bg-violet-500/15 border border-violet-200/30 dark:border-violet-500/20">
              <Brain className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">3 Categories</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient leading-tight">Skill Assessment</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-base max-w-lg">
            Take a 15-minute quiz to evaluate your technical and soft skills. Results power your AI recommendations.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="card p-6 flex flex-col items-center text-center space-y-4 hover:border-indigo-200/50 dark:hover:border-indigo-500/10 transition-all group">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg ${cat.shadow} group-hover:scale-105 transition-transform`}>
              <cat.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{cat.name}</h3>
            <p className={`text-sm font-semibold ${cat.text}`}>{cat.questions} questions</p>
          </div>
        ))}
      </div>

      {/* Start CTA */}
      <div className="card-glass p-8 rounded-3xl flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/15 dark:to-violet-500/15 flex items-center justify-center border border-indigo-200/30 dark:border-indigo-500/10">
          <Target className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div className="max-w-md space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to begin?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Make sure you have 15 minutes of uninterrupted time. Your results will be used to generate personalized career and learning recommendations.
          </p>
        </div>
        <button onClick={() => setStarted(true)} className="btn-primary px-8 py-3 text-base flex items-center gap-2 group">
          Start Assessment <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
