"use client";

import { useState, useEffect } from "react";
import { Building2, MapPin, Briefcase, CalendarClock, MoreVertical, Sparkles, Target } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
}

interface Application {
  id: string;
  job: Job;
  status: string;
  appliedAt: string;
}

const statusConfig: Record<string, { gradient: string; shadow: string; bg: string; border: string; text: string }> = {
  Applied: {
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    border: "border-blue-200/50 dark:border-blue-500/15",
    text: "text-blue-600 dark:text-blue-400",
  },
  Interviewing: {
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    border: "border-amber-200/50 dark:border-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
  },
  Offered: {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    border: "border-emerald-200/50 dark:border-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  Rejected: {
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/20",
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    border: "border-rose-200/50 dark:border-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
  },
};

export default function TrackerPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApplications(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch applications", err);
        setLoading(false);
      });
  }, []);

  const statuses = ["Applied", "Interviewing", "Offered", "Rejected"];

  const updateStatus = async (applicationId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status: newStatus }),
      });
      if (res.ok) {
        setApplications(prev => 
          prev.map(app => (app.id === applicationId ? { ...app, status: newStatus } : app))
        );
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
            <Target className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/[0.08] via-cyan-500/[0.06] to-teal-500/[0.08] dark:from-blue-500/[0.12] dark:via-cyan-500/[0.10] dark:to-teal-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-200/30 dark:border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{applications.length} Applications</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400 leading-tight">
            Application Tracker
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
            Manage and track the progress of all your job applications in one place.
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 card border-dashed">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No applications yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Start applying for jobs on the Jobs page!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statuses.map(status => {
            const config = statusConfig[status];
            const columnApps = applications.filter(app => app.status === status);
            return (
              <div key={status} className="flex flex-col gap-3">
                {/* Column Header */}
                <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${config.bg} border ${config.border}`}>
                  <h3 className={`font-bold uppercase tracking-wide text-xs ${config.text}`}>
                    {status}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}>
                    {columnApps.length}
                  </span>
                </div>
                
                {/* Cards */}
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                  {columnApps.map(app => (
                    <div key={app.id} className="group card p-5 hover:border-indigo-200/40 dark:hover:border-indigo-500/10 hover:shadow-lg transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center shrink-0 shadow-md ${config.shadow}`}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div className="relative">
                          <select 
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            value={app.status}
                            onChange={(e) => updateStatus(app.id, e.target.value)}
                          >
                            {statuses.map(s => <option key={s} value={s}>Move to {s}</option>)}
                          </select>
                          <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100/80 dark:bg-white/[0.04] p-1.5 rounded-lg transition-colors border border-slate-200/60 dark:border-white/[0.06]">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 leading-tight text-sm">{app.job.title}</h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">{app.job.company}</p>
                      
                      <div className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                          {app.job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                          {app.job.type}
                        </div>
                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
                          <CalendarClock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
