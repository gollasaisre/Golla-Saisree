"use client";

import { Save, Download, FilePlus, Trash2, FileText, Sparkles, User, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  techStack: string;
  link: string;
  description: string;
}

const inputClass = "w-full rounded-xl border border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all";
const textareaClass = `${inputClass} resize-none`;
const labelClass = "text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider";

export default function ResumeBuilder() {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("github.com/gollasaisre");
  const [portfolio, setPortfolio] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [knownLanguages, setKnownLanguages] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resume")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setFullName(data.fullName || ""); setJobTitle(data.jobTitle || "");
          setEmail(data.email || ""); setPhone(data.phone || "");
          setAddress(data.address || ""); setLinkedin(data.linkedin || "");
          setGithub(data.github || "github.com/gollasaisre"); setPortfolio(data.portfolio || "");
          setSummary(data.summary || ""); setEducation(data.education || "");
          setTechnicalSkills(data.technicalSkills || ""); setKnownLanguages(data.knownLanguages || "");
          setHobbies(data.hobbies || ""); setExperience(data.experience || []);
          setProjects(data.projects || []);
        }
        setLoading(false);
      })
      .catch(err => { console.error("Failed to load resume", err); setLoading(false); });
  }, []);

  const addExperience = () => setExperience([...experience, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const removeExperience = (id: string) => setExperience(experience.filter(exp => exp.id !== id));
  const updateExperience = (id: string, field: keyof Experience, value: string) => setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  const addProject = () => setProjects([...projects, { id: Date.now().toString(), name: "", techStack: "", link: "", description: "" }]);
  const removeProject = (id: string) => setProjects(projects.filter(proj => proj.id !== id));
  const updateProject = (id: string, field: keyof Project, value: string) => setProjects(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));

  const saveResume = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, jobTitle, email, phone, address, linkedin, github, portfolio, summary, education, technicalSkills, knownLanguages, hobbies, experience, projects })
      });
      if (res.ok) alert("Resume saved successfully!");
      else alert("Failed to save resume.");
    } catch (err) { console.error(err); alert("Error saving resume."); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Resume Builder</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Create an ATS-friendly resume to maximize shortlists.</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button onClick={saveResume} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white/[0.06] hover:bg-slate-800 dark:hover:bg-white/[0.10] text-white font-bold text-sm transition-all border border-slate-700 dark:border-white/[0.08] shadow-md disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
          </button>
          <button className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">
        {/* Left: Editor */}
        <div className="card-glass flex flex-col overflow-y-auto p-6 space-y-6 rounded-2xl">
          {/* Personal Info */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
              <User className="w-4 h-4 text-indigo-500" /> Personal & Contact Info
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className={labelClass}>Full Name</label><input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className={inputClass} placeholder="Alex Developer" /></div>
              <div className="space-y-1.5"><label className={labelClass}>Job Title</label><input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className={inputClass} placeholder="Backend Engineer" /></div>
              <div className="space-y-1.5"><label className={labelClass}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="alex@example.com" /></div>
              <div className="space-y-1.5"><label className={labelClass}>Phone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" /></div>
              <div className="space-y-1.5 col-span-2"><label className={labelClass}>Location</label><input type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} placeholder="San Francisco, CA" /></div>
              <div className="space-y-1.5"><label className={labelClass}>LinkedIn</label><input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} className={inputClass} placeholder="linkedin.com/in/alex" /></div>
              <div className="space-y-1.5"><label className={labelClass}>GitHub</label><input type="text" value={github} onChange={e => setGithub(e.target.value)} className={inputClass} placeholder="github.com/gollasaisre" /></div>
              <div className="space-y-1.5 col-span-2"><label className={labelClass}>Portfolio</label><input type="text" value={portfolio} onChange={e => setPortfolio(e.target.value)} className={inputClass} placeholder="alex.dev" /></div>
            </div>
          </div>

          <div className="space-y-1.5"><label className={labelClass}>Professional Summary</label><textarea value={summary} onChange={e => setSummary(e.target.value)} className={`${textareaClass} h-24`} placeholder="Software Engineer with 5+ years of experience..." /></div>

          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-500" /> Experience</h3>
              <button onClick={addExperience} className="text-indigo-500 hover:bg-indigo-500/10 p-1.5 rounded-lg transition-colors"><FilePlus className="w-4 h-4" /></button>
            </div>
            {experience.length === 0 && <p className="text-sm text-slate-400 italic">No experience added yet.</p>}
            {experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-slate-200/60 dark:border-white/[0.06] rounded-xl space-y-3 relative bg-white/40 dark:bg-white/[0.02] mb-3">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 p-1.5 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className={inputClass} placeholder="Company Name" />
                  <input type="text" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} className={inputClass} placeholder="Position / Title" />
                  <input type="text" value={exp.startDate || ""} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className={inputClass} placeholder="Start Date" />
                  <input type="text" value={exp.endDate || ""} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className={inputClass} placeholder="End Date" />
                </div>
                <textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className={`${textareaClass} h-20`} placeholder="Describe your achievements..." />
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-500" /> Projects</h3>
              <button onClick={addProject} className="text-indigo-500 hover:bg-indigo-500/10 p-1.5 rounded-lg transition-colors"><FilePlus className="w-4 h-4" /></button>
            </div>
            {projects.length === 0 && <p className="text-sm text-slate-400 italic">No projects added yet.</p>}
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 border border-slate-200/60 dark:border-white/[0.06] rounded-xl space-y-3 relative bg-white/40 dark:bg-white/[0.02] mb-3">
                <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 p-1.5 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} className={inputClass} placeholder="Project Name" />
                  <input type="text" value={proj.techStack} onChange={e => updateProject(proj.id, 'techStack', e.target.value)} className={inputClass} placeholder="Tech Stack" />
                  <input type="text" value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} className={`${inputClass} col-span-2`} placeholder="Project Link" />
                </div>
                <textarea value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} className={`${textareaClass} h-20`} placeholder="Describe your project..." />
              </div>
            ))}
          </div>

          {/* Education & Skills */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.04]">
              <Sparkles className="w-4 h-4 text-amber-500" /> Education & Skills
            </h3>
            <div className="space-y-3">
              <div className="space-y-1.5"><label className={labelClass}>Education</label><textarea value={education} onChange={e => setEducation(e.target.value)} className={`${textareaClass} h-20`} placeholder="B.S. Computer Science, University of Technology, 2023" /></div>
              <div className="space-y-1.5"><label className={labelClass}>Technical Skills</label><textarea value={technicalSkills} onChange={e => setTechnicalSkills(e.target.value)} className={`${textareaClass} h-20`} placeholder="React, Next.js, Node.js, Python..." /></div>
              <div className="space-y-1.5"><label className={labelClass}>Languages</label><input type="text" value={knownLanguages} onChange={e => setKnownLanguages(e.target.value)} className={inputClass} placeholder="English (Fluent), Spanish (Conversational)" /></div>
              <div className="space-y-1.5"><label className={labelClass}>Hobbies</label><input type="text" value={hobbies} onChange={e => setHobbies(e.target.value)} className={inputClass} placeholder="Open Source, Reading, Hiking" /></div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="card-glass flex flex-col items-center overflow-y-auto p-6 rounded-2xl bg-slate-100/50 dark:bg-white/[0.01] printable">
          <p className="text-xs text-slate-400 mb-4 font-bold uppercase tracking-wider print:hidden">Live Preview</p>
          <div className="w-full max-w-[21cm] min-h-[29.7cm] bg-white shadow-2xl shrink-0 p-12 text-slate-900 font-sans print:shadow-none print:p-0 print:m-0 rounded-lg">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
              <h1 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight">{fullName || "Your Name"}</h1>
              <p className="text-xl text-slate-700 mt-2 font-medium">{jobTitle || "Your Title"}</p>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm mt-4 text-slate-600 font-medium">
                {email && <span>{email}</span>}
                {email && (phone || address || linkedin || github || portfolio) && <span className="text-slate-300">•</span>}
                {phone && <span>{phone}</span>}
                {phone && (address || linkedin || github || portfolio) && <span className="text-slate-300">•</span>}
                {address && <span>{address}</span>}
                {address && (linkedin || github || portfolio) && <span className="text-slate-300">•</span>}
                {linkedin && <span>{linkedin}</span>}
                {linkedin && (github || portfolio) && <span className="text-slate-300">•</span>}
                {github && <span>{github}</span>}
                {github && portfolio && <span className="text-slate-300">•</span>}
                {portfolio && <span>{portfolio}</span>}
              </div>
            </div>
            {summary && <div className="mb-6"><p className="text-[13.5px] leading-relaxed text-slate-800">{summary}</p></div>}
            {experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Experience</h2>
                <div className="space-y-5">{experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div><h3 className="font-bold text-slate-900 text-[15px] inline-block">{exp.position || "Position Title"}</h3><span className="text-slate-700 mx-2">|</span><span className="text-sm font-semibold text-slate-700 inline-block">{exp.company || "Company"}</span></div>
                      <span className="text-sm font-medium text-slate-600">{exp.startDate || exp.endDate ? `${exp.startDate || "..."} - ${exp.endDate || "Present"}` : ""}</span>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-[13.5px] leading-relaxed text-slate-700 space-y-1">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      {!exp.description && <li className="text-slate-400 italic">Describe your achievements here...</li>}
                    </ul>
                  </div>
                ))}</div>
              </div>
            )}
            {projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Projects</h2>
                <div className="space-y-5">{projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div><h3 className="font-bold text-slate-900 text-[15px] inline-block">{proj.name || "Project Name"}</h3>{proj.link && <span className="text-xs text-indigo-600 ml-2 font-medium">({proj.link})</span>}</div>
                      {proj.techStack && <span className="text-sm font-semibold text-slate-700">{proj.techStack}</span>}
                    </div>
                    <ul className="list-disc list-inside mt-2 text-[13.5px] leading-relaxed text-slate-700 space-y-1">
                      {proj.description.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                      {!proj.description && <li className="text-slate-400 italic">Describe your project here...</li>}
                    </ul>
                  </div>
                ))}</div>
              </div>
            )}
            {education && <div className="mb-6"><h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Education</h2><p className="text-[13.5px] leading-relaxed text-slate-800 whitespace-pre-line">{education}</p></div>}
            {technicalSkills && <div className="mb-6"><h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Technical Skills</h2><p className="text-[13.5px] leading-relaxed text-slate-800 whitespace-pre-line">{technicalSkills}</p></div>}
            <div className="grid grid-cols-2 gap-6">
              {knownLanguages && <div><h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Languages</h2><p className="text-[13.5px] leading-relaxed text-slate-800 whitespace-pre-line">{knownLanguages}</p></div>}
              {hobbies && <div><h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-1 mb-4">Interests & Hobbies</h2><p className="text-[13.5px] leading-relaxed text-slate-800 whitespace-pre-line">{hobbies}</p></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
