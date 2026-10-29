"use client";

import { useState, useEffect } from "react";
import {
  User, Mail, MapPin, Briefcase, GraduationCap, Sparkles,
  Award, CheckCircle2, Save, Target, Compass, Heart,
  ShieldCheck, ArrowRight, Zap, RefreshCw, Plus, X,
  FileText, TrendingUp, CheckCircle, Clock, BookOpen
} from "lucide-react";
import Link from "next/link";

interface SkillItem {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced";
}

interface StatsData {
  totalResumes: number;
  totalAssessments: number;
  avgAssessmentScore: number;
  totalApplications: number;
  interviewsScheduled: number;
}

interface RecentAssessment {
  title: string;
  score: number;
  date: string;
}

interface ProfileData {
  name: string;
  email: string;
  github?: string;
  headline: string;
  bio: string;
  location: string;
  targetRole: string;
  education: string;
  interests: string;
  careerGoals: string;
  strengths: string;
  preferredWorkType: string;
  careerReadiness: number;
  skills: SkillItem[];
  stats: StatsData;
  recentAssessments: RecentAssessment[];
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    github: "gollasaisre",
    headline: "",
    bio: "",
    location: "",
    targetRole: "",
    education: "",
    interests: "",
    careerGoals: "",
    strengths: "",
    preferredWorkType: "Hybrid",
    careerReadiness: 80,
    skills: [],
    stats: {
      totalResumes: 0,
      totalAssessments: 0,
      avgAssessmentScore: 0,
      totalApplications: 0,
      interviewsScheduled: 0,
    },
    recentAssessments: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "readiness" | "activity">("overview");

  // New Skill input state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");

  useEffect(() => {
    // 1. Try local storage first for instant load and offline resilience
    try {
      const local = localStorage.getItem("careerpilot_profile");
      if (local) {
        const parsed = JSON.parse(local);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore JSON error
    }

    // 2. Fetch from backend if available
    fetch("/api/users/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not available");
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setProfile((prev) => {
            const merged = {
              ...prev,
              name: data.name || prev.name || "Prashu",
              email: data.email || prev.email || "prashuk2002@gmail.com",
              github: data.github || prev.github || "gollasaisre",
              headline: data.headline || prev.headline || "Full-Stack Software Engineer & AI Systems Developer",
              bio: data.bio || prev.bio || "Computer Science graduate with deep passion for building high-performance web applications, intelligent agents, and scalable backend infrastructure.",
              location: data.location || prev.location || "San Francisco, CA",
              targetRole: data.targetRole || prev.targetRole || "Full Stack Engineer",
              education: data.education || prev.education || "B.S. in Computer Science - University of California (2024)",
              interests: data.interests || prev.interests || "Artificial Intelligence, Distributed Systems, Cloud Architecture",
              careerGoals: data.careerGoals || prev.careerGoals || "Architect mission-critical applications at a high-growth tech company.",
              strengths: data.strengths || prev.strengths || "TypeScript, Next.js, System Design",
              preferredWorkType: data.preferredWorkType || prev.preferredWorkType || "Hybrid",
              careerReadiness: data.careerReadiness || prev.careerReadiness || 82,
              skills: data.skills && data.skills.length > 0 ? data.skills : prev.skills,
              stats: data.stats || prev.stats,
              recentAssessments: data.recentAssessments || prev.recentAssessments,
            };
            try {
              localStorage.setItem("careerpilot_profile", JSON.stringify(merged));
            } catch {
              // Ignore
            }
            return merged;
          });
        }
        setLoading(false);
      })
      .catch(() => {
        // Safe offline / static export fallback
        setProfile((prev) => {
          if (!prev.name) {
            return {
              ...prev,
              name: "Prashu",
              email: "prashuk2002@gmail.com",
              github: "gollasaisre",
              headline: "Full-Stack Software Engineer & AI Systems Developer",
              bio: "Computer Science graduate with deep passion for building high-performance web applications, intelligent agents, and scalable backend infrastructure.",
              location: "San Francisco, CA",
              targetRole: "Full Stack Engineer",
              education: "B.S. in Computer Science - University of California (2024)",
              interests: "Artificial Intelligence, Distributed Systems, Cloud Architecture",
              careerGoals: "Architect mission-critical applications at a high-growth tech company.",
              strengths: "TypeScript, Next.js, System Design",
              preferredWorkType: "Hybrid",
              careerReadiness: 85,
              skills: prev.skills && prev.skills.length > 0 ? prev.skills : [
                { name: "TypeScript", proficiency: "Advanced" },
                { name: "React & Next.js", proficiency: "Advanced" },
                { name: "Node.js", proficiency: "Intermediate" },
                { name: "Prisma & SQL", proficiency: "Intermediate" },
              ],
            };
          }
          return prev;
        });
        setLoading(false);
      });
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSaveStatus("idle");

    // Persist immediately to localStorage
    try {
      localStorage.setItem("careerpilot_profile", JSON.stringify(profile));
    } catch {
      // Ignore
    }

    try {
      const res = await fetch("/api/users/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        const data = await res.json();
        setProfile((prev) => ({
          ...prev,
          name: data.name || prev.name,
          email: data.email || prev.email,
          headline: data.headline || prev.headline,
          bio: data.bio || prev.bio,
          location: data.location || prev.location,
          targetRole: data.targetRole || prev.targetRole,
          education: data.education || prev.education,
          interests: data.interests || prev.interests,
          careerGoals: data.careerGoals || prev.careerGoals,
          strengths: data.strengths || prev.strengths,
          preferredWorkType: data.preferredWorkType || prev.preferredWorkType,
          careerReadiness: data.careerReadiness || prev.careerReadiness,
        }));
      }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 4000);
    } catch {
      // In static export or offline mode, local storage save succeeded
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = profile.skills.some(
      (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (exists) return;

    setProfile({
      ...profile,
      skills: [
        ...profile.skills,
        { name: newSkillName.trim(), proficiency: newSkillProficiency },
      ],
    });
    setNewSkillName("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s.name !== skillToRemove),
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all";
  const labelClass =
    "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium text-sm">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const getBadgeColor = (prof: string) => {
    switch (prof) {
      case "Advanced":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Intermediate":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-14 animate-fade-in-up">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl card-glass p-6 md:p-8 border border-slate-200/60 dark:border-white/[0.08]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-violet-500/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-600 flex items-center justify-center text-3xl md:text-4xl font-extrabold text-white shadow-xl shadow-indigo-500/25 ring-4 ring-white/60 dark:ring-white/[0.08]">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" />
            </div>

            {/* Title / Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile.name || "Alex Morgan"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Active Profile
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {profile.preferredWorkType}
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium">
                {profile.headline || "Full-Stack Software Engineer & AI Systems Developer"}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" /> {profile.email}
                </span>
                {profile.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {profile.location}
                  </span>
                )}
                {profile.targetRole && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Target: {profile.targetRole}
                  </span>
                )}
                <a
                  href={`https://github.com/${profile.github || "gollasaisre"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" /> github.com/{profile.github || "gollasaisre"}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={`https://github.com/${profile.github || "gollasaisre"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-sm shadow-md shadow-indigo-500/20"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile
                </>
              )}
            </button>
          </div>
        </div>

        {saveStatus === "success" && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4 h-4" /> Profile and career stats saved successfully!
          </div>
        )}
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Career Readiness */}
        <div className="card-glass p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Readiness</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {profile.careerReadiness}%
          </p>
          <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">Interview Ready</p>
        </div>

        {/* Resumes */}
        <div className="card-glass p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resumes</span>
            <FileText className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.stats?.totalResumes ?? 1}
          </p>
          <Link href="/resume" className="text-[11px] font-bold text-indigo-500 hover:underline mt-0.5 block">
            ATS Optimized →
          </Link>
        </div>

        {/* Assessments */}
        <div className="card-glass p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assessments</span>
            <Award className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.stats?.totalAssessments ?? 3}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
            Avg: {profile.stats?.avgAssessmentScore ?? 88}%
          </p>
        </div>

        {/* Applications */}
        <div className="card-glass p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Applications</span>
            <Briefcase className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.stats?.totalApplications ?? 5}
          </p>
          <Link href="/tracker" className="text-[11px] font-bold text-cyan-500 hover:underline mt-0.5 block">
            View Tracker →
          </Link>
        </div>

        {/* Target Role */}
        <div className="card-glass p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.08] col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Role</span>
            <Target className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">
            {profile.targetRole || "Engineer"}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            {profile.preferredWorkType}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200/60 dark:border-white/[0.08] gap-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
            activeTab === "overview"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Profile Overview
          {activeTab === "overview" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
            activeTab === "edit"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Edit Profile & Skills
          {activeTab === "edit" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("readiness")}
          className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
            activeTab === "readiness"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Career Readiness & Roadmap
          {activeTab === "readiness" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
            activeTab === "activity"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Recent Activity & Assessments
          {activeTab === "activity" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Card */}
            <div className="card-glass p-6 rounded-2xl space-y-3 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" /> About Me
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {profile.bio || "No professional summary provided yet."}
              </p>
            </div>

            {/* Technical Skills & Proficiencies */}
            <div className="card-glass p-6 rounded-2xl space-y-4 border border-slate-200/60 dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" /> Technical Skills & Proficiencies
                </h2>
                <button
                  onClick={() => setActiveTab("edit")}
                  className="text-xs font-bold text-indigo-500 hover:underline"
                >
                  Manage Skills
                </button>
              </div>

              {profile.skills && profile.skills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeColor(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No skills listed yet.</p>
              )}
            </div>

            {/* Interests Chips */}
            <div className="card-glass p-6 rounded-2xl space-y-4 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> Focus Areas & Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests
                  ? profile.interests
                      .split(",")
                      .map((intr, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20 shadow-sm"
                        >
                          {intr.trim()}
                        </span>
                      ))
                  : <p className="text-sm text-slate-400 italic">No interests listed yet.</p>}
              </div>
            </div>
          </div>

          {/* Right Column: Education & Goals */}
          <div className="space-y-6">
            {/* Education */}
            <div className="card-glass p-6 rounded-2xl space-y-3 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-500" /> Education
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {profile.education || "Add your academic background in the Edit tab."}
              </p>
            </div>

            {/* Career Goals */}
            <div className="card-glass p-6 rounded-2xl space-y-3 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" /> Career Goals
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {profile.careerGoals || "Set your short & long-term ambitions to fuel AI recommendations."}
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="card-glass p-6 rounded-2xl space-y-3 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" /> Boost Readiness
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate an ATS resume and test your interview skills to increase your readiness score.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/resume"
                  className="w-full py-2 px-3 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm"
                >
                  Edit Resume
                </Link>
                <Link
                  href="/agent"
                  className="w-full py-2 px-3 text-center rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-xs transition-all border border-slate-200/60 dark:border-white/[0.08]"
                >
                  Chat with Career Pilot
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Edit Details & Skills Form */}
      {activeTab === "edit" && (
        <form onSubmit={handleSave} className="card-glass p-6 md:p-8 rounded-2xl space-y-8 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" /> Personal & Role Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={inputClass}
                  placeholder="Alex Morgan"
                />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className={labelClass}>Professional Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Senior Frontend Engineer | React & Next.js"
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. San Francisco, CA or Remote"
                />
              </div>

              <div>
                <label className={labelClass}>Target Job Role</label>
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Full-Stack Engineer"
                />
              </div>

              <div>
                <label className={labelClass}>Work Preference</label>
                <select
                  value={profile.preferredWorkType}
                  onChange={(e) => setProfile({ ...profile, preferredWorkType: e.target.value })}
                  className={inputClass}
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>GitHub Username / Profile</label>
                <input
                  type="text"
                  value={profile.github || "gollasaisre"}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value.replace(/^https?:\/\/github\.com\//, '') })}
                  className={inputClass}
                  placeholder="gollasaisre"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Professional Bio / Summary</label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Tell recruiters and AI mentor about your experience, aspirations, and technical focus..."
              />
            </div>
          </div>

          {/* Interactive Skills Management */}
          <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/[0.08]">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" /> Manage Skills & Proficiencies
            </h2>

            {/* Add Skill Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, GraphQL, Python)..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className={`${inputClass} flex-1`}
              />
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                className="rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn-primary px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            {/* Existing Skills List */}
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08]"
                >
                  <span className="text-slate-800 dark:text-slate-200">{skill.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                      skill.proficiency
                    )}`}
                  >
                    {skill.proficiency}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="text-slate-400 hover:text-rose-500 transition-colors ml-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Goals */}
          <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/[0.08]">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-500" /> Education & Career Goals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Education Background</label>
                <textarea
                  rows={2}
                  value={profile.education}
                  onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. B.S. in Computer Science, Tech University (2024)"
                />
              </div>

              <div>
                <label className={labelClass}>Career Goals & Vision</label>
                <textarea
                  rows={2}
                  value={profile.careerGoals}
                  onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. Land a role at a tech unicorn and lead backend architecture."
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Interests & Technologies (comma-separated)</label>
              <input
                type="text"
                value={profile.interests}
                onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                className={inputClass}
                placeholder="AI, Microservices, Cloud, Web3"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Career Readiness & Roadmap */}
      {activeTab === "readiness" && (
        <div className="card-glass p-6 md:p-8 rounded-2xl space-y-6 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-white/[0.08]">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500" /> Career Readiness Breakdown
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your readiness score is synthesized from your assessment results, resume strength, and completed roadmap milestones.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {profile.careerReadiness}%
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Placement Ready
              </span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                <span>Resume ATS Optimization</span>
                <span className="text-indigo-500">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                <span>Technical Skills Assessment</span>
                <span className="text-violet-500">
                  {profile.stats?.avgAssessmentScore ? `${profile.stats.avgAssessmentScore}%` : "80%"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  style={{ width: `${profile.stats?.avgAssessmentScore || 80}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                <span>Curated Roadmap Milestones</span>
                <span className="text-cyan-500">80%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Recommended Next Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/roadmap/1"
                className="p-4 rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] hover:border-indigo-500/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Complete Next Roadmap Module</p>
                  <p className="text-xs text-slate-400 mt-0.5">Full Stack Engineering Path</p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/assessment"
                className="p-4 rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] hover:border-indigo-500/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Take Advanced Assessment</p>
                  <p className="text-xs text-slate-400 mt-0.5">System Architecture & Node.js</p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Activity & Assessments */}
      {activeTab === "activity" && (
        <div className="card-glass p-6 md:p-8 rounded-2xl space-y-6 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/[0.08]">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" /> Recent Assessment History
            </h2>
            <Link
              href="/assessment"
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              Take Assessment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {profile.recentAssessments && profile.recentAssessments.length > 0 ? (
            <div className="space-y-3">
              {profile.recentAssessments.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-500">{item.score}%</span>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Score</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <Award className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm text-slate-400">No assessments taken yet.</p>
              <Link href="/assessment" className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1.5">
                Take First Assessment
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
