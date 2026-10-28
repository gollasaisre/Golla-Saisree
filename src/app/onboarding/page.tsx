"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Book, Code, Target, Rocket, Sparkles, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

const stepIcons = [Book, Code, Target, Rocket];
const stepGradients = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
];
const stepShadows = [
  "shadow-blue-500/25",
  "shadow-emerald-500/25",
  "shadow-violet-500/25",
  "shadow-amber-500/25",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else router.push("/recommendations");
  };

  const Icon = stepIcons[step - 1];
  const gradient = stepGradients[step - 1];
  const shadow = stepShadows[step - 1];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                s < step ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-500/25'
                : s === step ? `bg-gradient-to-br ${gradient} text-white shadow-lg ${shadow}`
                : 'bg-slate-200 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`w-8 h-0.5 rounded-full transition-all ${s < step ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-white/[0.06]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 border border-white/40 dark:border-white/[0.06] overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 dark:bg-white/[0.04]">
            <div className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500 ease-out`} style={{ width: `${(step / 4) * 100}%` }} />
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ${shadow}`}>
                  <Book className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tell us about your education</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">This helps us match you with careers requiring specific degrees or backgrounds.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Highest Degree</label>
                    <select className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/30 outline-none">
                      <option>High School</option>
                      <option>Bachelor&apos;s Degree</option>
                      <option>Master&apos;s Degree</option>
                      <option>PhD</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Field of Study</label>
                    <input type="text" placeholder="e.g. Computer Science" className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ${shadow}`}>
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What are your top skills?</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Select or type the technical and soft skills you currently possess.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Technical Skills (comma separated)</label>
                    <input type="text" placeholder="e.g. Java, Python, React, SQL" className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Soft Skills (comma separated)</label>
                    <input type="text" placeholder="e.g. Leadership, Problem Solving" className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ${shadow}`}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What are your career goals?</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Where do you see yourself in the future?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Target Roles</label>
                    <input type="text" placeholder="e.g. Software Engineer, Product Manager" className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/30 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Preferred Work Type</label>
                    <select className="w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/30 outline-none">
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center py-4">
                <div className="relative inline-block">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto shadow-xl ${shadow}`}>
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-amber-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">You&apos;re all set!</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mt-3 max-w-md mx-auto leading-relaxed">
                    Our AI is ready to analyze your profile and generate personalized career paths just for you.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.04] flex justify-between items-center">
              <button
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
                className={`flex items-center gap-2 font-bold text-sm transition-all ${step === 1 ? "text-transparent pointer-events-none" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleNext} className="btn-primary px-8 py-3 flex items-center gap-2 text-sm group">
                {step === 4 ? "Generate Recommendations" : "Continue"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
