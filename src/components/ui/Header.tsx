"use client";

import { Sun, Moon, Bell, Search, Command, Menu, X, ArrowRight, ExternalLink, Sparkles, BookOpen, GraduationCap, Award, MessageCircle, CheckSquare, Settings, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface SearchEntry {
  title: string;
  category: "Placement" | "Learning" | "Assignments" | "Tools" | "System";
  href: string;
  keywords: string;
}

const SEARCH_CATALOG: SearchEntry[] = [
  { title: "Placement Preparation (16 Tracks)", category: "Placement", href: "/prep", keywords: "placement interview os dbms networks dsa aptitude hr round quant formula" },
  { title: "Operating Systems (OS) Cheat Sheet", category: "Placement", href: "/prep", keywords: "os paging deadlock cpu scheduling semaphore" },
  { title: "DBMS & SQL Normalization", category: "Placement", href: "/prep", keywords: "sql dbms 1nf 2nf 3nf bcnf acid joins indexing" },
  { title: "Computer Networks & OSI Model", category: "Placement", href: "/prep", keywords: "tcp udp ip dns subnetting http osi" },
  { title: "Data Structures & Algorithms (DSA)", category: "Placement", href: "/prep", keywords: "dsa leetcode arrays two pointers sliding window striver" },
  { title: "Soft Skills & Leadership Mastery", category: "Learning", href: "/soft-skills", keywords: "soft skills communication leadership teamwork presentation etiquette confidence" },
  { title: "Communication Skills & English Lab", category: "Learning", href: "/communication", keywords: "english speaking practice sentences gd group discussion vocabulary pronunciation" },
  { title: "Programming Video Library", category: "Learning", href: "/study", keywords: "java python python dsa c++ web development videos course" },
  { title: "Study Material & Department Courses", category: "Learning", href: "/study", keywords: "computer science ai electronics mechanical study notes pdf" },
  { title: "Subject Assignments & Coding Labs", category: "Assignments", href: "/assignments", keywords: "assignments test mcq code runner dsa python java sql grading" },
  { title: "AI Mentor & Chatbot", category: "Tools", href: "/chat", keywords: "ai mentor chat questions interview help debug code offline" },
  { title: "Autonomous Career Pilot Agent", category: "Tools", href: "/agent", keywords: "career pilot agent plan roadmap autonomous goals" },
  { title: "Smart Resume Builder & ATS Review", category: "Tools", href: "/resume", keywords: "resume cv builder ats score export pdf format" },
  { title: "Skill Assessment Quiz", category: "Tools", href: "/assessment", keywords: "skill assessment score quiz test level evaluation" },
  { title: "Platform Settings & Preferences", category: "System", href: "/settings", keywords: "settings theme dark mode notifications password profile change reset" },
  { title: "My Profile & Readiness Score", category: "System", href: "/profile", keywords: "profile view edit user avatar stats readiness score" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchFocused(true);
      }
      if (e.key === "Escape") {
        setSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return SEARCH_CATALOG.slice(0, 6);
    }
    const q = searchQuery.toLowerCase();
    return SEARCH_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/[0.06] transition-all duration-300">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Breadcrumb / Title */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-800 dark:text-white hover:text-indigo-600 transition-colors">
            CareerPilot AI
          </Link>
          <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">
            {pathname.replace(/^\//, "").split("/")[0] || "Dashboard"}
          </span>
        </div>
      </div>

      {/* Center: Search Bar with Dropdown Results */}
      <div className="flex-1 max-w-md mx-4 relative">
        <div
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 ${
            searchFocused
              ? "bg-white dark:bg-slate-900 border border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20"
              : "bg-slate-100/80 dark:bg-white/[0.04] border border-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06]"
          }`}
        >
          <Search className={`w-4 h-4 transition-colors ${searchFocused ? "text-indigo-500" : "text-slate-400 dark:text-slate-500"}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, prep, soft skills, assignments..."
            className="bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 text-xs sm:text-sm w-full placeholder-slate-400 dark:placeholder-slate-500"
            onFocus={() => setSearchFocused(true)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-white/[0.06] rounded-md border border-slate-200/80 dark:border-white/[0.08]">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>

        {/* Search Results Dropdown Overlay */}
        {searchFocused && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/10"
              onClick={() => setSearchFocused(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-fade-in max-h-96 overflow-y-auto">
              <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>{searchQuery ? "Search Results" : "Quick Navigation"}</span>
                <span>ESC to close</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching modules found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      setSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {item.category}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notification Alert */}
        <Link
          href="/assignments"
          title="Assignments & Notifications"
          className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-all duration-200 group"
          aria-label="Assignments & Notifications"
        >
          <Bell className="w-[18px] h-[18px] group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        </Link>

        {/* GitHub Profile link */}
        <a
          href="https://github.com/gollasaisre"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile (@gollasaisre)"
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all duration-200 group"
          aria-label="GitHub Profile"
        >
          <GithubIcon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
        </a>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-all duration-200 group"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px] text-amber-400 group-hover:text-amber-300 transition-colors group-hover:rotate-45 duration-300" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-indigo-500 group-hover:text-indigo-400 transition-colors group-hover:-rotate-12 duration-300" />
            )}
          </button>
        )}

        {/* Settings Shortcut */}
        <Link
          href="/settings"
          title="Platform Settings"
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          <Settings className="w-[18px] h-[18px]" />
        </Link>

        {/* User Avatar */}
        <Link
          href="/profile"
          title="My Profile"
          className="relative ml-1 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          P
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
        </Link>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2 z-50 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">Navigation Menu</p>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Skill Assessment", href: "/assessment" },
            { name: "Placement Prep (16 Tracks)", href: "/prep" },
            { name: "Soft Skills & Leadership", href: "/soft-skills" },
            { name: "Communication & English Lab", href: "/communication" },
            { name: "Assignments & Labs", href: "/assignments" },
            { name: "Study Material & Videos", href: "/study" },
            { name: "Resume Builder", href: "/resume" },
            { name: "AI Mentor", href: "/chat" },
            { name: "My Profile", href: "/profile" },
            { name: "Settings", href: "/settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
