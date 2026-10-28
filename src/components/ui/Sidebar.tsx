"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Compass, Map, MessageSquare, Briefcase, FileText,
  BookOpen, GraduationCap, Brain, Settings, Bot, Sparkles,
  ChevronLeft, ChevronRight, User
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Recommendations", href: "/recommendations", icon: Compass, badge: "AI" },
  { name: "My Roadmap", href: "/roadmap/1", icon: Map },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Tracker", href: "/tracker", icon: Map },
  { name: "Skill Assessment", href: "/assessment", icon: Brain },
  { name: "Placement Prep", href: "/prep", icon: GraduationCap },
  { name: "Study Material", href: "/study", icon: BookOpen },
  { name: "Resume Builder", href: "/resume", icon: FileText },
  { name: "Career Pilot", href: "/agent", icon: Bot, badge: "New" },
  { name: "AI Mentor", href: "/chat", icon: MessageSquare },
];

const bottomNav: NavItem[] = [
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex md:flex-col md:h-screen
        ${collapsed ? "md:w-20" : "md:w-72"}
        bg-white/60 dark:bg-white/[0.02]
        backdrop-blur-2xl
        border-r border-slate-200/50 dark:border-white/[0.06]
        transition-all duration-300 ease-in-out relative z-20`}
    >
      {/* Logo Area */}
      <div className={`flex items-center ${collapsed ? "justify-center px-2" : "px-6"} py-6`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in-up">
              <h1 className="text-lg font-bold text-gradient leading-tight">CareerPilot</h1>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">AI Engine</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-30 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 group"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        )}
      </button>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"} space-y-1 mt-2`}>
        {!collapsed && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-3">
            Navigation
          </p>
        )}
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={`flex items-center gap-3 ${collapsed ? "justify-center px-2" : "px-3"} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                ${isActive
                  ? "bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 dark:from-indigo-500/15 dark:via-violet-500/15 dark:to-purple-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-r-full" />
              )}

              <item.icon className={`w-[18px] h-[18px] shrink-0 transition-colors ${isActive ? "text-indigo-500 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />

              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badge === "AI"
                        ? "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/20"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`${collapsed ? "px-2" : "px-3"} pb-4 space-y-2`}>
        {!collapsed && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-2">
            System
          </p>
        )}
        {bottomNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={`flex items-center gap-3 ${collapsed ? "justify-center px-2" : "px-3"} py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* Upgrade Card */}
        {!collapsed && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-purple-500/10 dark:from-indigo-500/15 dark:via-violet-500/15 dark:to-purple-500/15 border border-indigo-200/30 dark:border-indigo-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">Go Pro</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Unlock AI-powered resume reviews & unlimited mentoring.
            </p>
            <button className="w-full btn-primary py-2 text-xs">
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
