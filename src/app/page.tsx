"use client";

import Link from "next/link";
import {
  Sparkles, ArrowRight, Bot, FileText, Map, Brain,
  GraduationCap, Briefcase, User, ShieldCheck, Zap,
  Compass, CheckCircle2, ChevronRight, Award, MessageCircle, CheckSquare, BookOpen
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Career Pilot AI",
      desc: "Autonomous conversational agent providing real-time career advice, mock interviews, and skill gap analysis.",
      href: "/agent",
      icon: Bot,
      color: "from-indigo-500 to-violet-600",
      badge: "AI Powered",
    },
    {
      title: "ATS Resume Builder",
      desc: "Live split-screen resume creator formatted to pass modern applicant tracking systems and recruiter screenings.",
      href: "/resume",
      icon: FileText,
      color: "from-violet-500 to-purple-600",
      badge: "ATS Ready",
    },
    {
      title: "Curated Roadmaps",
      desc: "Dynamic milestone roadmaps for CSE, IT, AI/ML, ECE, EEE, Mechanical, Civil, and Automobile engineering.",
      href: "/roadmap/1",
      icon: Map,
      color: "from-cyan-500 to-blue-600",
      badge: "Structured",
    },
    {
      title: "Skill Assessments",
      desc: "Interactive technical tests and aptitude quizzes with instant feedback, scoring, and weakness detection.",
      href: "/assessment",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
      badge: "Testing",
    },
    {
      title: "Placement Preparation",
      desc: "Targeted technical interview questions, system design walkthroughs, and company-specific prep modules across 16 core tracks.",
      href: "/prep",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      badge: "16 Tracks",
    },
    {
      title: "Soft Skills & Leadership",
      desc: "Master the 12 executive soft skills: active listening, presentation decks, workplace etiquette, and confidence drills.",
      href: "/soft-skills",
      icon: Award,
      color: "from-purple-500 to-indigo-600",
      badge: "12 Modules",
    },
    {
      title: "English & Communication Lab",
      desc: "50+ daily corporate sentences, Web Speech native pronunciation audio, GD playbook, and timed speaking drills.",
      href: "/communication",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-600",
      badge: "Speech Lab",
    },
    {
      title: "Technical Assignments & Labs",
      desc: "Subject assessments for DSA, Java, Python, and SQL with code testing, question runner, and instant grading.",
      href: "/assignments",
      icon: CheckSquare,
      color: "from-teal-500 to-emerald-600",
      badge: "Automated Tests",
    },
    {
      title: "Application Tracker",
      desc: "Color-coded Kanban board to monitor your applications, scheduled interviews, and incoming offers.",
      href: "/tracker",
      icon: Briefcase,
      color: "from-rose-500 to-pink-600",
      badge: "Organized",
    },
    {
      title: "Career Readiness Profile",
      desc: "Real-time readiness gauge synthesizing your resume score, completed roadmaps, and technical assessments.",
      href: "/profile",
      icon: User,
      color: "from-indigo-600 to-cyan-600",
      badge: "Analytics",
    },
    {
      title: "AI Career Recommendations",
      desc: "Personalized job match scores and AI recommendations tailored to your skills, strengths, and goals.",
      href: "/recommendations",
      icon: Compass,
      color: "from-fuchsia-500 to-violet-600",
      badge: "Smart Matches",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-gradient">Smart Career</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                CareerPilot AI
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/prep" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Placement Prep
            </Link>
            <Link href="/soft-skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Soft Skills
            </Link>
            <Link href="/assignments" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Assignments
            </Link>
            <Link href="/resume" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Resume Builder
            </Link>
            <Link href="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="btn-primary px-4 py-2 text-sm font-bold shadow-md shadow-indigo-500/25 flex items-center gap-1.5"
            >
              Launch App <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm">
              <Zap className="w-3.5 h-3.5" /> Next-Gen AI Career Acceleration Platform
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
              Elevate Your Career with <br />
              <span className="text-gradient">Intelligent Guidance</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Accelerate your engineering journey. Create ATS-friendly resumes, practice interview assessments,
              follow branch-specific curated roadmaps, and receive guidance from your personalized AI mentor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto btn-primary px-8 py-3.5 text-base font-bold shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resume"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.04] backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-800 dark:text-white font-bold text-base transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Build My Resume
              </Link>
              <Link
                href="/agent"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/15 border border-violet-500/20 text-violet-600 dark:text-violet-400 font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" /> Try Career Pilot
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS-Optimized Resumes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> 8+ Engineering Branches
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Interactive AI Mentorship
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Career Readiness Analytics
              </span>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200/60 dark:border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need to Get Hired
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Explore the complete toolset designed to take you from foundational prep to job offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={idx}
                  href={feat.href}
                  className="card-glass p-6 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">
                        {feat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-bold text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    Explore Feature <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-white/[0.08] bg-white/40 dark:bg-slate-950/40 py-8 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Smart Career (CareerPilot). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-indigo-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/roadmap/1" className="hover:text-indigo-500 transition-colors">
              Roadmaps
            </Link>
            <Link href="/resume" className="hover:text-indigo-500 transition-colors">
              Resume Builder
            </Link>
            <Link href="/profile" className="hover:text-indigo-500 transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
