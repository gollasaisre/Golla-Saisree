"use client";

import { useState } from "react";
import {
  Brain,
  ArrowRight,
  Code2,
  Mail,
  Lock,
  User,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Globe,
  Bot
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#070913] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[650px] h-[650px] bg-indigo-600/25 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />

      {/* Header */}
      <header className="relative z-20 w-full px-6 py-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-xl">
        <Link href="/login" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CareerPilot AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
                Register
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Initialize Your Future-First Profile</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">Already registered?</span>
          <Link
            href="/login"
            className="text-xs px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual AI Perks */}
          <div className="lg:col-span-5 space-y-5 hidden lg:block">
            <div className="rounded-3xl p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/50 text-violet-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> What You Unlock
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Accelerate Your Tech Career 10x Faster
              </h2>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Autonomous Career Agent</div>
                    <div className="text-slate-400 mt-0.5">24/7 AI mentor that audits your resume, roadmaps & real skill gaps.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Market Intelligence Telemetry</div>
                    <div className="text-slate-400 mt-0.5">Real-time compensation analytics & hiring trends for 2026 tech roles.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Smart Match & 1-Click Apply</div>
                    <div className="text-slate-400 mt-0.5">Direct algorithmic matching with top engineering hiring teams.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 w-full max-w-xl mx-auto">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-violet-500/40 via-slate-800/40 to-indigo-500/20 shadow-2xl shadow-violet-950/60">
              <div className="bg-[#0B0F1C]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Create Your Neural Profile
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Join thousands of high-growth engineers using AI to guide their careers.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Begin 3-Step AI Onboarding</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* SSO Providers */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/onboarding")}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-violet-400" /> GitHub
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/onboarding")}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                    >
                      <Globe className="w-4 h-4 text-cyan-400" /> Google
                    </button>
                  </div>

                  <p className="text-center text-xs text-slate-400 mt-5">
                    Already have a profile?{" "}
                    <Link href="/login" className="font-semibold text-violet-400 hover:text-violet-300 hover:underline">
                      Sign in to AI Pilot &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 border-t border-slate-800/60 bg-slate-950/30 backdrop-blur-md flex items-center justify-between text-xs text-slate-500">
        <div>Quantum Security Encrypted</div>
        <div className="flex gap-4">
          <Link href="/login" className="hover:text-slate-300">Login Portal</Link>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
}
