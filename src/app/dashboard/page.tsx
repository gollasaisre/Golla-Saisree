import { Compass, Brain, Map, BookOpen, Briefcase, Activity, TrendingUp, Sparkles, ArrowUpRight, CheckCircle2, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      profile: true, 
      recommendations: { include: { career: true }, orderBy: { matchScore: 'desc' } } 
    }
  });

  const profile = user?.profile;
  const topRec = user?.recommendations?.[0];
  const readiness = profile?.careerReadiness || 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.06] to-purple-500/[0.08] dark:from-indigo-500/[0.12] dark:via-violet-500/[0.10] dark:to-purple-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">AI Insights Updated</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Welcome back, <span className="text-gradient">{user?.name || "User"}</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-base max-w-lg">
              Here&apos;s an overview of your career journey. Your AI mentor has new insights for you today.
            </p>
          </div>
          <Link href="/recommendations" className="btn-primary px-6 py-3 text-sm flex items-center gap-2 group shrink-0">
            View New Matches
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Top Match - Hero stat */}
        <div className="card-glass relative overflow-hidden p-6 rounded-2xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] to-violet-500/[0.06] dark:from-indigo-500/[0.10] dark:to-violet-500/[0.10] opacity-100 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-slate-500 dark:text-slate-400 text-sm">Top Match</p>
            </div>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{topRec?.career.title || "No Matches Yet"}</p>
            {topRec && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-progress-fill" style={{ width: `${topRec.matchScore}%` }} />
                </div>
                <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400">{topRec.matchScore}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Career Readiness */}
        <div className="card p-6 group hover:border-emerald-200/50 dark:hover:border-emerald-500/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Career Readiness</p>
            <div className="p-2 bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{readiness}%</p>
          <div className="w-full bg-slate-100 dark:bg-white/[0.06] rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full animate-progress-fill transition-all" style={{ width: `${readiness}%` }} />
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% this month
          </p>
        </div>

        {/* Assessment Score */}
        <div className="card p-6 group hover:border-blue-200/50 dark:hover:border-blue-500/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Assessment Score</p>
            <div className="p-2 bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">85</p>
            <span className="text-lg font-bold text-slate-400 dark:text-slate-500">/100</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +5 pts since last week
          </p>
        </div>

        {/* Roadmap Progress */}
        <div className="card p-6 group hover:border-amber-200/50 dark:hover:border-amber-500/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Roadmap Progress</p>
            <div className="p-2 bg-amber-100/80 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <Map className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">2</p>
            <span className="text-lg font-bold text-slate-400 dark:text-slate-500">/5</span>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">Steps completed</p>
          <div className="flex gap-1.5 mt-3">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full ${
                  step <= 2
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : "bg-slate-100 dark:bg-white/[0.06]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Learning */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-100/80 dark:bg-indigo-500/10 rounded-lg">
                  <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                Active Learning
              </h3>
              <Link href="/study" className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] flex justify-between items-center group hover:border-indigo-200 dark:hover:border-indigo-500/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/15 dark:to-cyan-500/15 flex items-center justify-center border border-blue-200/30 dark:border-blue-500/10">
                    <Zap className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">System Design Basics</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Intermediate</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Video Course</span>
                    </div>
                    <div className="w-32 h-1 bg-slate-100 dark:bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                      <div className="w-[65%] h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>
                <button className="btn-primary py-2 px-4 text-xs">Resume</button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] flex justify-between items-center group hover:border-indigo-200 dark:hover:border-indigo-500/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/15 dark:to-pink-500/15 flex items-center justify-center border border-purple-200/30 dark:border-purple-500/10">
                    <Brain className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Cloud Architecture (AWS)</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Advanced</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Reading</span>
                    </div>
                  </div>
                </div>
                <button className="py-2 px-4 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] transition-all">Start</button>
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <div className="p-1.5 bg-violet-100/80 dark:bg-violet-500/10 rounded-lg">
                  <Briefcase className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                </div>
                Recommended Jobs
              </h3>
              <Link href="/recommendations" className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                View All →
              </Link>
            </div>
            <div className="space-y-2">
              {user?.recommendations?.slice(0, 3).map((rec, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] rounded-xl transition-all cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-extrabold ${
                      i === 0
                        ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                        : i === 1
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    }`}>
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{rec.career.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-[250px] truncate">{rec.matchReason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg border border-emerald-200/50 dark:border-emerald-500/10">{rec.matchScore}%</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              ))}
              {(!user?.recommendations || user.recommendations.length === 0) && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mb-3">
                    <Compass className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">No recommendations yet.</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Chat with the AI mentor to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today&apos;s Mission */}
          <div className="card-glass p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Today&apos;s Mission
              </h3>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">1/3</span>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm group cursor-pointer">
                <div className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-200 dark:border-slate-700 group-hover:border-indigo-400 transition-colors flex items-center justify-center shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Complete System Design Chapter 1</span>
              </li>
              <li className="flex gap-3 text-sm group cursor-pointer">
                <div className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-200 dark:border-slate-700 group-hover:border-indigo-400 transition-colors flex items-center justify-center shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Update Resume with recent project</span>
              </li>
              <li className="flex gap-3 text-sm">
                <div className="mt-0.5 w-5 h-5 rounded-lg bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="line-through text-slate-400 dark:text-slate-500">Take Daily Aptitude Quiz</span>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="card p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              Recent Activity
            </h3>
            <div className="space-y-5 relative">
              {/* Timeline line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/30 via-slate-200 dark:via-slate-700 to-transparent" />
              
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border-2 border-indigo-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Completed Assessment</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">2 hours ago</p>
              </div>
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-slate-100 dark:bg-white/[0.06] border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Viewed Roadmap</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Yesterday</p>
              </div>
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-slate-100 dark:bg-white/[0.06] border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Created Account</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">3 days ago</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/chat" className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] hover:border-indigo-200 dark:hover:border-indigo-500/10 transition-all text-center group">
                <Sparkles className="w-5 h-5 mx-auto text-indigo-500 dark:text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">AI Mentor</p>
              </Link>
              <Link href="/resume" className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] hover:border-violet-200 dark:hover:border-violet-500/10 transition-all text-center group">
                <Briefcase className="w-5 h-5 mx-auto text-violet-500 dark:text-violet-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Resume</p>
              </Link>
              <Link href="/assessment" className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] hover:border-emerald-200 dark:hover:border-emerald-500/10 transition-all text-center group">
                <Brain className="w-5 h-5 mx-auto text-emerald-500 dark:text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Assess</p>
              </Link>
              <Link href="/jobs" className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] hover:border-amber-200 dark:hover:border-amber-500/10 transition-all text-center group">
                <TrendingUp className="w-5 h-5 mx-auto text-amber-500 dark:text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Jobs</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
