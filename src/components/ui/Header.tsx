"use client";

import { Sun, Moon, Bell, Search, Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/[0.06] transition-all duration-300">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Breadcrumb / Title */}
        <div className="hidden md:flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-white">
            CareerPilot
          </h2>
          <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Dashboard</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4">
        <div
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 ${
            searchFocused
              ? "bg-white dark:bg-white/[0.06] border border-indigo-300 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20"
              : "bg-slate-100/80 dark:bg-white/[0.03] border border-transparent hover:bg-slate-100 dark:hover:bg-white/[0.05]"
          }`}
        >
          <Search className={`w-4 h-4 transition-colors ${searchFocused ? "text-indigo-500" : "text-slate-400 dark:text-slate-500"}`} />
          <input
            type="text"
            placeholder="Search skills, careers, resources..."
            className="bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 text-sm w-full placeholder-slate-400 dark:placeholder-slate-500"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-white/[0.06] rounded-md border border-slate-200/80 dark:border-white/[0.08]">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <button
          className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-all duration-200 group"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px] group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        </button>

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

        {/* User Avatar */}
        <Link
          href="/profile"
          title="My Profile"
          className="relative ml-1 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          A
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
        </Link>
      </div>
    </header>
  );
}
