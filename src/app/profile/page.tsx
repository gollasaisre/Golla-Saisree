"use client";

import { useState, useEffect } from "react";
import {
  User, Mail, MapPin, Briefcase, GraduationCap, Sparkles,
  Award, CheckCircle2, Save, Target, Compass, Heart,
  ShieldCheck, ArrowRight, Zap, RefreshCw
} from "lucide-react";
import Link from "next/link";

interface ProfileData {
  name: string;
  email: string;
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
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    headline: "",
    bio: "",
    location: "",
    targetRole: "",
    education: "",
    interests: "",
    careerGoals: "",
    strengths: "",
    preferredWorkType: "Hybrid",
    careerReadiness: 75,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "goals">("overview");

  useEffect(() => {
    fetch("/api/users/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProfile({
            name: data.name || "Alex Morgan",
            email: data.email || "alex.morgan@example.com",
            headline: data.headline || "Full-Stack Engineer & AI Enthusiast",
            bio: data.bio || "Passionate software engineer building resilient web products.",
            location: data.location || "San Francisco, CA",
            targetRole: data.targetRole || "Software Engineer",
            education: data.education || "B.S. in Computer Science",
            interests: data.interests || "AI, Cloud, React, Next.js",
            careerGoals: data.careerGoals || "Transition to Senior Engineer and master cloud-native architecture.",
            strengths: data.strengths || "TypeScript, System Design, Problem Solving",
            preferredWorkType: data.preferredWorkType || "Hybrid",
            careerReadiness: data.careerReadiness || 75,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/users/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3500);
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
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

  const strengthsList = profile.strengths
    ? profile.strengths.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const interestsList = profile.interests
    ? profile.interests.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in-up">
      {/* Top Banner / Avatar Hero */}
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
                {profile.headline || "Software Engineer & AI Enthusiast"}
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
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
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
            <CheckCircle2 className="w-4 h-4" /> Profile saved successfully!
          </div>
        )}
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Career Readiness */}
        <div className="card-glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/25">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Career Readiness</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {profile.careerReadiness}%
              </span>
              <span className="text-xs font-semibold text-emerald-500">Strong</span>
            </div>
          </div>
        </div>

        {/* Target Role */}
        <div className="card-glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/25">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Goal Focus</p>
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate max-w-[130px]">
              {profile.targetRole || "Engineer"}
            </p>
          </div>
        </div>

        {/* Work Preference */}
        <div className="card-glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-violet-500/25">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Work Mode</p>
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
              {profile.preferredWorkType}
            </p>
          </div>
        </div>

        {/* Assessments & Prep */}
        <div className="card-glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200/60 dark:border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-amber-500/25">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preparation</p>
            <Link
              href="/prep"
              className="text-xs font-bold text-indigo-500 hover:text-indigo-400 inline-flex items-center gap-1 group mt-0.5"
            >
              Start Mock Prep <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200/60 dark:border-white/[0.08] gap-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-sm font-bold transition-all relative ${
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
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "edit"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Edit Details
          {activeTab === "edit" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "goals"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Career Readiness & Roadmap
          {activeTab === "goals" && (
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

            {/* Strengths & Skills Chips */}
            <div className="card-glass p-6 rounded-2xl space-y-4 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" /> Core Strengths & Skills
              </h2>
              {strengthsList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {strengthsList.map((str, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 shadow-sm"
                    >
                      {str}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No strengths listed yet.</p>
              )}
            </div>

            {/* Interests Chips */}
            <div className="card-glass p-6 rounded-2xl space-y-4 border border-slate-200/60 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> Interests & Focus Areas
              </h2>
              {interestsList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {interestsList.map((intr, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20 shadow-sm"
                    >
                      {intr}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No interests listed yet.</p>
              )}
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

      {/* Tab 2: Edit Details Form */}
      {activeTab === "edit" && (
        <form onSubmit={handleSave} className="card-glass p-6 md:p-8 rounded-2xl space-y-6 border border-slate-200/60 dark:border-white/[0.08]">
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
                disabled
                className={`${inputClass} opacity-70 cursor-not-allowed`}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Core Strengths (comma-separated)</label>
              <input
                type="text"
                value={profile.strengths}
                onChange={(e) => setProfile({ ...profile, strengths: e.target.value })}
                className={inputClass}
                placeholder="React, Next.js, TypeScript, GraphQL"
              />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Education</label>
              <textarea
                rows={2}
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="e.g. B.S. in Computer Science, Tech University (2024)"
              />
            </div>

            <div>
              <label className={labelClass}>Career Goals</label>
              <textarea
                rows={2}
                value={profile.careerGoals}
                onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="e.g. Land a role at a tech unicorn and lead backend architecture."
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
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Career Readiness & Roadmap */}
      {activeTab === "goals" && (
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
                <span className="text-violet-500">70%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" style={{ width: "70%" }} />
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

          {/* Next Recommended Milestones */}
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
    </div>
  );
}
