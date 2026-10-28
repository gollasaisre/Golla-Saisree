"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

export type CareerRec = {
  title: string;
  matchScore: number;
  matchReason: string;
  missingSkills: string[];
  nextSteps: string[];
};

export default function RecommendationsPage() {
  const [recs, setRecs] = useState<CareerRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recommendations")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecs(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recommendations", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-3 bg-indigo-500/20 rounded-3xl blur-xl animate-pulse-slow" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">AI is analyzing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.06] to-purple-500/[0.08] dark:from-indigo-500/[0.12] dark:via-violet-500/[0.10] dark:to-purple-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/20">
              <Target className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{recs.length} Matches Found</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient leading-tight">Your AI Career Matches</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-base max-w-lg">
            Based on your skills, education, and interests, here are the top roles curated by our AI engine.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-5">
        {recs.map((rec, i) => (
          <div
            key={i}
            className="card p-6 md:p-8 hover:border-indigo-200/50 dark:hover:border-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/[0.03] dark:hover:shadow-indigo-500/[0.08] transition-all duration-300 group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-lg font-extrabold text-white shadow-lg ${
                  i === 0
                    ? "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/25"
                    : i === 1
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25"
                    : i === 2
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25"
                    : "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/25"
                }`}>
                  #{i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{rec.title}</h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/10">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{rec.matchScore}%</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{rec.matchReason}</p>
                </div>
              </div>
              <button className="btn-primary shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 text-sm group/btn">
                View Roadmap <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-white/[0.04]">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3 text-sm">
                  <div className="p-1 bg-amber-100/80 dark:bg-amber-500/10 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  Skills to Develop
                </h4>
                <ul className="space-y-2">
                  {rec.missingSkills.map((skill, j) => (
                    <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shrink-0" /> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3 text-sm">
                  <div className="p-1 bg-indigo-100/80 dark:bg-indigo-500/10 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  Suggested Next Steps
                </h4>
                <ul className="space-y-2">
                  {rec.nextSteps.map((step, j) => (
                    <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 shrink-0" /> {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
