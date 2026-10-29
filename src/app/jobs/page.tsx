"use client";

import { Building2, MapPin, Briefcase, Clock, Search, Filter, ArrowUpRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience?: string;
  skills?: string;
  description?: string;
  department: string;
  isFuture?: boolean;
  match?: number;
}

const DEFAULT_JOBS: Job[] = [
  {
    id: "1",
    title: "Full Stack Software Engineer",
    company: "Google",
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    experience: "Entry - 2 Years",
    department: "CSE",
    skills: JSON.stringify(["React", "TypeScript", "Node.js", "Cloud"]),
    description: "Design and implement scalable full-stack web architectures and microservices.",
    match: 95,
  },
  {
    id: "2",
    title: "AI/ML Solutions Associate",
    company: "Microsoft",
    location: "Hyderabad, India (Remote)",
    type: "Full-time",
    experience: "0 - 1 Year",
    department: "IT",
    skills: JSON.stringify(["Python", "PyTorch", "LLMs", "Azure"]),
    description: "Build cutting-edge generative AI applications and retrieval-augmented pipelines.",
    match: 92,
  },
  {
    id: "3",
    title: "Embedded Systems & Firmware Engineer",
    company: "Qualcomm",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "Fresh Graduate",
    department: "ECE",
    skills: JSON.stringify(["Embedded C", "ARM Cortex", "RTOS", "Verilog"]),
    description: "Develop low-level drivers and firmware for next-generation mobile silicon.",
    match: 89,
  },
  {
    id: "4",
    title: "Power Systems & IoT Engineer",
    company: "Schneider Electric",
    location: "Chennai, India",
    type: "Full-time",
    experience: "1 - 3 Years",
    department: "EEE",
    skills: JSON.stringify(["SCADA", "Power Electronics", "PLC", "Smart Grid"]),
    description: "Optimize smart grid energy distributions and industrial control automation.",
    match: 87,
  },
  {
    id: "5",
    title: "Robotics & CAD Automation Engineer",
    company: "Tesla",
    location: "Pune, India",
    type: "Full-time",
    experience: "Entry Level",
    department: "MECHANICAL",
    skills: JSON.stringify(["SolidWorks", "ANSYS", "Finite Element Analysis", "Robotics"]),
    description: "Model structural vehicle dynamics and simulate high-performance thermal cycles.",
    match: 91,
  },
  {
    id: "6",
    title: "Autonomous Vehicle Systems Specialist",
    company: "Tata Motors",
    location: "Pune, India",
    type: "Full-time",
    experience: "1 - 2 Years",
    department: "AUTOMOBILE",
    skills: JSON.stringify(["CAN Bus", "ADAS", "Automotive Dynamics", "MATLAB"]),
    description: "Engineer battery management and sensor fusion for electric vehicles.",
    match: 88,
  },
  {
    id: "7",
    title: "BIM & Structural Design Engineer",
    company: "Larsen & Toubro",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "Fresh Graduate",
    department: "CIVIL",
    skills: JSON.stringify(["AutoCAD", "Revit", "STAAD Pro", "Structural Analysis"]),
    description: "Produce structural designs and sustainability models for mega infrastructure projects.",
    match: 86,
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    // 1. Load saved applications from localStorage first
    try {
      const savedApps = localStorage.getItem("careerpilot_applications");
      if (savedApps) {
        setApplications(JSON.parse(savedApps));
      }
    } catch {
      // Ignore
    }

    fetch('/api/jobs')
      .then(res => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(DEFAULT_JOBS);
        }
        return fetch('/api/applications');
      })
      .then(res => {
        if (res && res.ok) return res.json();
        return [];
      })
      .then(appData => {
        if (Array.isArray(appData) && appData.length > 0) {
          setApplications(prev => {
            const combined = [...prev, ...appData];
            const unique = Array.from(new Map(combined.map(a => [a.jobId, a])).values());
            return unique;
          });
        }
      })
      .catch(() => {
        setJobs(DEFAULT_JOBS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [showFuture, setShowFuture] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">Discovering opportunities...</p>
        </div>
      </div>
    );
  }

  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  const filteredJobs = jobs.filter((job) => {
    const deptMatch = selectedDept === "All" || job.department === selectedDept;
    const futureMatch = showFuture || !job.isFuture;
    const searchMatch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return deptMatch && futureMatch && searchMatch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.06] to-cyan-500/[0.08] dark:from-indigo-500/[0.12] dark:via-violet-500/[0.10] dark:to-cyan-500/[0.12] p-8 md:p-10 border border-white/20 dark:border-white/[0.06] backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{filteredJobs.length} Opportunities</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient leading-tight mb-3">
            Discover Your Future
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
            Explore curated engineering opportunities tailored to your department, skills, and career roadmap.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-6">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/40 dark:border-white/[0.08] shadow-sm flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 text-sm w-full placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
            <div className="flex gap-2 items-center">
              <select
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/40 dark:border-white/[0.08] text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/40 dark:border-white/[0.08] text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-white/80 dark:hover:bg-white/[0.06] transition-colors shadow-sm">
                <input
                  type="checkbox"
                  checked={showFuture}
                  onChange={(e) => setShowFuture(e.target.checked)}
                  className="rounded text-indigo-500 focus:ring-indigo-500 bg-white/50 dark:bg-white/[0.06] border-slate-300 dark:border-white/10"
                />
                Future Roles
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 card border-dashed">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No jobs found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters to see more opportunities.</p>
          </div>
        ) : (
          filteredJobs.map((job, i) => {
            let parsedSkills: string[] = [];
            try {
              if (job.skills) parsedSkills = JSON.parse(job.skills);
            } catch (e) {}

            const isApplied = applications.some(app => app.jobId === job.id);

            return (
              <div
                key={i}
                className="group card p-6 md:p-7 hover:border-indigo-200/50 dark:hover:border-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/[0.03] dark:hover:shadow-indigo-500/[0.08] hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.01] to-violet-500/[0.01] dark:from-indigo-500/[0.03] dark:to-violet-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                
                <div className="flex flex-col sm:flex-row gap-5 items-start w-full md:w-auto relative z-10">
                  {/* Company Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-shadow">
                    <Building2 className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h3>
                      {job.isFuture && (
                        <span className="px-2.5 py-0.5 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/15 dark:to-violet-500/15 text-indigo-700 dark:text-indigo-300 rounded-full text-[10px] font-bold tracking-wide uppercase border border-indigo-200/30 dark:border-indigo-500/15">
                          Future Role
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm leading-relaxed">
                      {job.description || "Exciting opportunity to join a growing team and work on cutting-edge projects."}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> {job.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Briefcase className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> {job.type}
                      </span>
                      {job.experience && (
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" /> {job.experience}
                        </span>
                      )}
                    </div>

                    {parsedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {parsedSkills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200/60 dark:border-white/[0.06]">
                            {skill}
                          </span>
                        ))}
                        {parsedSkills.length > 4 && (
                          <span className="px-2.5 py-1 bg-slate-100/80 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-lg border border-slate-200/60 dark:border-white/[0.06]">
                            +{parsedSkills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto relative z-10 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/[0.04] pt-5 md:pt-0 md:pl-6 mt-1 md:mt-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-200/50 dark:border-emerald-500/10">
                    <Zap className="w-3.5 h-3.5" /> 
                    {job.match ? `${job.match}% Match` : "High Match"}
                  </div>
                  <button
                    className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                      isApplied
                        ? "bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/10 cursor-default"
                        : "btn-primary"
                    }`}
                    disabled={isApplied}
                    onClick={async () => {
                      const newApp = { jobId: job.id, status: 'APPLIED', appliedAt: new Date().toISOString() };
                      setApplications(prev => {
                        const updated = [...prev, newApp];
                        try {
                          localStorage.setItem("careerpilot_applications", JSON.stringify(updated));
                        } catch {}
                        return updated;
                      });

                      try {
                        await fetch('/api/applications', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ jobId: job.id }),
                        });
                      } catch {
                        // Offline or static export fallback already saved in localStorage
                      }
                    }}
                  >
                    {isApplied ? (
                      <>✓ Applied</>
                    ) : (
                      <>Apply Now <ArrowUpRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
