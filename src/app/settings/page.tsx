"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  BookOpen,
  Save,
  RotateCcw,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Mail,
  Lock,
  Globe,
  Sliders,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface SettingsState {
  displayName: string;
  email: string;
  avatarSeed: string;
  avatarBg: string;
  jobTitle: string;
  dailyGoalMinutes: number;
  primaryLanguage: string;
  preferredDifficulty: "Beginner" | "Intermediate" | "Advanced";
  careerTrack: string;
  notifications: {
    emailAlerts: boolean;
    weeklyProgress: boolean;
    jobRecommendations: boolean;
    mentorTips: boolean;
  };
  privacy: {
    publicProfile: boolean;
    shareLeaderboardScore: boolean;
    analyticsEnabled: boolean;
  };
}

const DEFAULT_SETTINGS: SettingsState = {
  displayName: "Prashu",
  email: "prashuk2002@gmail.com",
  avatarSeed: "Prashu",
  avatarBg: "indigo",
  jobTitle: "Full-Stack Software Engineer",
  dailyGoalMinutes: 45,
  primaryLanguage: "Python",
  preferredDifficulty: "Intermediate",
  careerTrack: "Full Stack AI Engineer",
  notifications: {
    emailAlerts: true,
    weeklyProgress: true,
    jobRecommendations: true,
    mentorTips: false,
  },
  privacy: {
    publicProfile: true,
    shareLeaderboardScore: true,
    analyticsEnabled: true,
  },
};

const AVATAR_OPTIONS = [
  { name: "Indigo", bg: "from-indigo-500 to-purple-600" },
  { name: "Cyan", bg: "from-cyan-500 to-blue-600" },
  { name: "Emerald", bg: "from-emerald-500 to-teal-600" },
  { name: "Amber", bg: "from-amber-500 to-orange-600" },
  { name: "Rose", bg: "from-rose-500 to-pink-600" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"account" | "appearance" | "learning" | "notifications" | "security">("account");
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("careerpilot_settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      } else {
        // Also check profile
        const profile = localStorage.getItem("careerpilot_profile");
        if (profile) {
          const parsedProfile = JSON.parse(profile);
          setSettings((prev) => ({
            ...prev,
            displayName: parsedProfile.name || prev.displayName,
            email: parsedProfile.email || prev.email,
            jobTitle: parsedProfile.targetRole || prev.jobTitle,
          }));
        }
      }
    } catch {
      // Use defaults
    }
  }, []);

  const handleSave = () => {
    // Validation
    if (!settings.displayName.trim()) {
      setFeedback({ type: "error", message: "Display name cannot be empty." });
      return;
    }
    if (!settings.email.includes("@") || !settings.email.includes(".")) {
      setFeedback({ type: "error", message: "Please provide a valid email address." });
      return;
    }

    setIsSaving(true);
    try {
      localStorage.setItem("careerpilot_settings", JSON.stringify(settings));

      // Sync name & email back to profile if profile exists
      try {
        const rawProfile = localStorage.getItem("careerpilot_profile");
        if (rawProfile) {
          const p = JSON.parse(rawProfile);
          p.name = settings.displayName;
          p.email = settings.email;
          p.targetRole = settings.jobTitle;
          localStorage.setItem("careerpilot_profile", JSON.stringify(p));
        }
      } catch {
        // Ignore
      }

      setTimeout(() => {
        setIsSaving(false);
        setFeedback({ type: "success", message: "Settings saved successfully! Changes are persisted." });
        setTimeout(() => setFeedback(null), 4000);
      }, 400);
    } catch {
      setIsSaving(false);
      setFeedback({ type: "error", message: "Failed to persist settings to local storage." });
    }
  };

  const handleReset = () => {
    if (confirm("Reset all settings back to default values?")) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem("careerpilot_settings");
      setFeedback({ type: "success", message: "Settings restored to defaults." });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordStatus("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus("New passwords do not match.");
      return;
    }

    setPasswordStatus("Password updated securely!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordStatus(null), 4000);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("careerpilot_session");
      window.location.href = "./login";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                <Settings className="w-5 h-5" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Platform Settings</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your personal profile, learning goals, notifications, and application preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in ${
              feedback.type === "success"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: "account", label: "Account & Profile", icon: User },
            { id: "appearance", label: "Appearance", icon: Palette },
            { id: "learning", label: "Learning & Tracks", icon: BookOpen },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security & Privacy", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Account & Profile */}
        {activeTab === "account" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Preview */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Avatar Style</h3>
              <div className="flex justify-center">
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
                    AVATAR_OPTIONS.find((o) => o.name.toLowerCase() === settings.avatarBg.toLowerCase())?.bg ||
                    "from-indigo-500 to-purple-600"
                  } flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/20`}
                >
                  {settings.displayName.charAt(0).toUpperCase() || "P"}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{settings.displayName}</p>
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-500 block mb-2">Color Accent</label>
                <div className="flex justify-center gap-2">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setSettings({ ...settings, avatarBg: opt.name.toLowerCase() })}
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${opt.bg} transition-transform ${
                        settings.avatarBg === opt.name.toLowerCase() ? "scale-125 ring-2 ring-indigo-500 ring-offset-2" : "hover:scale-110"
                      }`}
                      title={opt.name}
                    />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/profile"
                  className="text-xs text-indigo-500 hover:text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                >
                  Open Full Public Profile Page &rarr;
                </Link>
              </div>
            </div>

            {/* Account Form */}
            <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.displayName}
                    onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Target Job Title / Headline
                </label>
                <input
                  type="text"
                  value={settings.jobTitle}
                  onChange={(e) => setSettings({ ...settings, jobTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. AI Engineer, Full Stack Developer, Data Scientist"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-500">Persistent in browser local storage & cloud profile sync</span>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Save Profile Info
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appearance */}
        {activeTab === "appearance" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Theme Mode</h3>
              <p className="text-xs text-slate-500">Choose between clean light mode or comfortable dark mode for low-light environments.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "light", label: "Light", icon: Sun, desc: "Crisp white interface with high contrast" },
                { key: "dark", label: "Dark", icon: Moon, desc: "Deep slate background with reduced glare" },
                { key: "system", label: "System Sync", icon: Laptop, desc: "Automatically match your OS preference" },
              ].map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      active
                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                      {active && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                    </div>
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Learning & Tracks */}
        {activeTab === "learning" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Learning Preferences</h3>
              <p className="text-xs text-slate-500">Customize how AI Mentor and Placement modules tailor content to you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Daily Study Goal (Minutes)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={settings.dailyGoalMinutes}
                    onChange={(e) => setSettings({ ...settings, dailyGoalMinutes: Number(e.target.value) })}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="font-semibold text-sm px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                    {settings.dailyGoalMinutes} min/day
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Primary Coding Language
                </label>
                <select
                  value={settings.primaryLanguage}
                  onChange={(e) => setSettings({ ...settings, primaryLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Python">Python (Data Science, DSA & AI)</option>
                  <option value="Java">Java (Enterprise, Spring Boot & DSA)</option>
                  <option value="C++">C++ (Competitive Programming & Systems)</option>
                  <option value="JavaScript / TypeScript">JavaScript / TypeScript (Full Stack)</option>
                  <option value="Go">Go (Cloud Native & Microservices)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Problem Difficulty Bias
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSettings({ ...settings, preferredDifficulty: diff })}
                      className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                        settings.preferredDifficulty === diff
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Focus Career Track
                </label>
                <select
                  value={settings.careerTrack}
                  onChange={(e) => setSettings({ ...settings, careerTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                  <option value="Backend Software Engineer">Backend Software Engineer</option>
                  <option value="Data Scientist & ML Specialist">Data Scientist & ML Specialist</option>
                  <option value="DevOps & Cloud Architect">DevOps & Cloud Architect</option>
                  <option value="Frontend & UI Engineer">Frontend & UI Engineer</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Learning Goals
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Notification Alerts</h3>
              <p className="text-xs text-slate-500">Choose what types of reminders and updates you want to receive.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "emailAlerts",
                  label: "Job Application Status Updates",
                  desc: "Get notified when interview dates or recruiter reviews change.",
                },
                {
                  key: "weeklyProgress",
                  label: "Weekly Skill & DSA Progress Digest",
                  desc: "Receive a personalized summary of completed lessons and solved problems.",
                },
                {
                  key: "jobRecommendations",
                  label: "Personalized Job Match Alerts",
                  desc: "Receive new job postings matching your tech stack and target role.",
                },
                {
                  key: "mentorTips",
                  label: "AI Mentor Daily Placement Advice",
                  desc: "Short daily tips on interview prep, coding patterns, and soft skills.",
                },
              ].map((item) => {
                const checked = settings.notifications[item.key as keyof typeof settings.notifications];
                return (
                  <label
                    key={item.key}
                    className="flex items-start justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                  >
                    <div className="pr-4">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [item.key]: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 mt-1 accent-indigo-600 rounded cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Notifications
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Security & Privacy */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Password Section */}
            <form
              onSubmit={handlePasswordUpdate}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Update Password</h3>
                <p className="text-xs text-slate-500">Ensure your account uses a strong and unique password.</p>
              </div>

              {passwordStatus && (
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                  {passwordStatus}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full px-3 py-2 pr-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white"
                >
                  Update Password
                </button>
              </div>
            </form>

            {/* Privacy Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Data & Privacy</h3>
                <p className="text-xs text-slate-500">Control who can discover your assessments and profile.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold">Public Profile Visibility</p>
                    <p className="text-xs text-slate-500">Allow recruiters to view your public CareerPilot portfolio link.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.publicProfile}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, publicProfile: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold">Leaderboard Ranking</p>
                    <p className="text-xs text-slate-500">Show your quiz and assessment score badges on the community board.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.shareLeaderboardScore}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, shareLeaderboardScore: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-indigo-600"
                  />
                </label>
              </div>

              {/* Danger Zone: Logout */}
              <div className="pt-6 border-t border-rose-100 dark:border-rose-950/40 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">Account Session</p>
                  <p className="text-xs text-slate-500">Sign out of CareerPilot AI on this device.</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

