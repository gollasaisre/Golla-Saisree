"use client";

import { useState, useMemo, useRef } from "react";
import {
  Code2,
  BrainCircuit,
  Compass,
  Palette,
  Megaphone,
  Briefcase,
  Users,
  Cpu,
  HeartHandshake,
  TrendingUp,
  ShieldAlert,
  Headphones,
  BookOpen,
  Clock,
  Star,
  CheckCircle2,
  Layers,
  Search,
  Filter,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  X,
  Award,
  ListOrdered,
  Bookmark,
  Play,
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Video,
  Eye,
  type LucideIcon,
} from "lucide-react";
import {
  DEPARTMENTS,
  ALL_COURSES,
  type Course,
  type CourseModule,
  type DepartmentInfo,
} from "@/data/departmentCourses";

// Department icon mapping
const iconMap: Record<string, LucideIcon> = {
  Code2,
  BrainCircuit,
  Compass,
  Palette,
  Megaphone,
  Briefcase,
  Users,
  Cpu,
  HeartHandshake,
  TrendingUp,
  ShieldAlert,
  Headphones,
  BookOpen,
};

export default function StudyPage() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeModalTab, setActiveModalTab] = useState<"video" | "pdf" | "syllabus">("video");
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "videos">("all");
  const [selectedVideoLang, setSelectedVideoLang] = useState<string>("All");
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [pdfReaderOpen, setPdfReaderOpen] = useState<boolean>(false);

  const printAreaRef = useRef<HTMLDivElement>(null);

  const currentDeptInfo: DepartmentInfo | undefined = useMemo(() => {
    return DEPARTMENTS.find((d) => d.id === selectedDeptId);
  }, [selectedDeptId]);

  // Filter courses based on user filters
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      // Department filter
      if (selectedDeptId !== "All" && course.department !== selectedDeptId) {
        return false;
      }
      // Level filter
      if (selectedLevel !== "All" && course.level !== selectedLevel) {
        return false;
      }
      // Type filter
      if (selectedType !== "All" && course.type !== selectedType) {
        return false;
      }
      // Enrolled tab filter
      if (activeTab === "enrolled" && !enrolledCourses[course.id]) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesTags = course.tags.some((t) => t.toLowerCase().includes(q));
        const matchesRoles = course.targetRoles.some((r) => r.toLowerCase().includes(q));
        const matchesTopics = course.modules.some((m) =>
          m.topics.some((top) => top.toLowerCase().includes(q))
        );
        return matchesTitle || matchesDesc || matchesTags || matchesRoles || matchesTopics;
      }
      return true;
    });
  }, [selectedDeptId, selectedLevel, selectedType, activeTab, enrolledCourses, searchQuery]);

  const toggleEnrollment = (courseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEnrolledCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const openCourse = (course: Course, initialTab: "video" | "pdf" | "syllabus" = "video") => {
    setActiveCourseModal(course);
    setActiveModuleIndex(0);
    setActiveModalTab(initialTab);
    setPdfReaderOpen(false);
  };

  const getDeptIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || BookOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const enrolledCount = Object.values(enrolledCourses).filter(Boolean).length;
  const currentModule: CourseModule | undefined = activeCourseModal?.modules[activeModuleIndex];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 text-white border border-indigo-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Synchronized Video Lectures & PDF Study Guides
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Study Material & Video Classroom
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Watch curated video lessons on screen and study the exact same synchronized notes,
            architectural diagrams, code snippets, and interview questions in downloadable PDF format.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium border border-white/10">
              <Video className="w-4 h-4 text-rose-400" />
              <span>On-Screen Video Player</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium border border-white/10">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Exact Matching PDF Notes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium border border-white/10">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>1-Click PDF Export</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Selector Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            Browse by Department
          </h2>
          <span className="text-xs text-slate-500">
            {selectedDeptId === "All" ? "Showing all 12 departments" : `Selected: ${currentDeptInfo?.name}`}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedDeptId("All")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              selectedDeptId === "All"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            All Departments ({ALL_COURSES.length})
          </button>

          {DEPARTMENTS.map((dept) => {
            const count = ALL_COURSES.filter((c) => c.department === dept.id).length;
            const isSelected = selectedDeptId === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 border ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400/40"
                }`}
              >
                {getDeptIcon(dept.icon)}
                <span>{dept.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 dark:bg-black/10 text-white dark:text-slate-900 font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Department Spotlight Banner (if filtered) */}
      {currentDeptInfo && (
        <div
          className={`p-6 rounded-2xl border ${currentDeptInfo.borderColor} ${currentDeptInfo.accentBg} transition-all`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
                  {getDeptIcon(currentDeptInfo.icon)}
                </div>
                <h3 className="text-xl font-bold">{currentDeptInfo.name}</h3>
              </div>
              <p className="text-sm font-medium opacity-90">{currentDeptInfo.tagline}</p>
              <p className="text-xs opacity-80 pt-1 max-w-3xl">{currentDeptInfo.description}</p>
            </div>
            <button
              onClick={() => setSelectedDeptId("All")}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors shrink-0 shadow-sm self-start md:self-auto"
            >
              Clear Department Filter
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, topics, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Level and Type Dropdowns + Enrolled Tab */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setActiveTab("enrolled")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "enrolled"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
              My Saved ({enrolledCount})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "videos"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Video className="w-3.5 h-3.5 text-rose-500" />
              Video Library
            </button>
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="All">All Formats</option>
            <option value="Specialization Track">Specialization Track</option>
            <option value="Interactive Lab">Interactive Lab</option>
            <option value="Video Course">Video Course</option>
            <option value="Project Guide">Project Guide</option>
          </select>
        </div>
      </div>

      {/* Programming Video Library View */}
      {activeTab === "videos" ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-500" />
                Featured Programming Video Playlists
              </h3>
              <p className="text-xs text-slate-500">
                Full-length curated bootcamps for Java, Python, Python DSA, and Web Development.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {["All", "Java", "Python", "Python DSA", "C++", "Web"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedVideoLang(lang)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                    selectedVideoLang === lang
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "v-py-dsa",
                lang: "Python DSA",
                title: "Python Data Structures & Algorithms Masterclass",
                instructor: "NeetCode / FreeCodeCamp",
                duration: "10h 30m",
                youtubeId: "pkYVOmU3MgA",
                topics: ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Trees BFS/DFS", "Dynamic Programming"],
              },
              {
                id: "v-py",
                lang: "Python",
                title: "Python 3 Full Programming Bootcamp 2026",
                instructor: "Corey Schafer / FreeCodeCamp",
                duration: "8h 15m",
                youtubeId: "rfscVS0vtbw",
                topics: ["Language Fundamentals", "OOP & Dunder Methods", "Decorators & Generators", "File I/O & JSON"],
              },
              {
                id: "v-jav-dsa",
                lang: "Java",
                title: "Complete DSA with Java Placement Bootcamp",
                instructor: "Kunal Kushwaha",
                duration: "14h 45m",
                youtubeId: "rZ41y93P2Qo",
                topics: ["Bit Manipulation", "Recursion", "Binary Search", "Trees & BST", "Graph Algorithms"],
              },
              {
                id: "v-jav",
                lang: "Java",
                title: "Java Full Course: From Zero to Hero",
                instructor: "Telusko / Programming with Mosh",
                duration: "9h 20m",
                youtubeId: "eIrMbAQSU34",
                topics: ["Java Syntax", "Collections Framework", "Streams API", "Multithreading", "Spring Boot Intro"],
              },
              {
                id: "v-cpp",
                lang: "C++",
                title: "C++ Programming Full Course for Beginners",
                instructor: "FreeCodeCamp / Caleb Curry",
                duration: "4h 00m",
                youtubeId: "vLnPwxZdW4Y",
                topics: ["Pointers & Memory", "Classes & Structs", "STL Containers", "Templates", "Vectors"],
              },
              {
                id: "v-web",
                lang: "Web",
                title: "Full Stack Web Development (React & Node.js)",
                instructor: "Dave Gray / Traversy Media",
                duration: "8h 30m",
                youtubeId: "mScd-5ci3_M",
                topics: ["React 19 Hooks", "Tailwind CSS", "REST APIs", "Node & Express", "Deployment"],
              },
            ]
              .filter((v) => selectedVideoLang === "All" || v.lang === selectedVideoLang)
              .map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?rel=0`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                          {vid.lang}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {vid.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">Instructor: {vid.instructor}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase">Key Modules:</p>
                      <div className="flex flex-wrap gap-1">
                        {vid.topics.map((top, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}

      {/* Courses Grid */}
      {activeTab !== "videos" && (
        filteredCourses.length === 0 ? (
          <div className="card p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No courses match your criteria</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Try adjusting your search query, clearing filters, or switching departments.
            </p>
            <button
              onClick={() => {
                setSelectedDeptId("All");
                setSelectedLevel("All");
                setSelectedType("All");
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="btn-primary text-sm py-2 px-5"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const isEnrolled = !!enrolledCourses[course.id];
              const dept = DEPARTMENTS.find((d) => d.id === course.department);

              return (
                <div
                  key={course.id}
                  className="card flex flex-col justify-between p-6 hover:border-indigo-500/40 hover:shadow-xl transition-all group border border-slate-200 dark:border-slate-800/80 relative"
                >
                {/* Top Badges */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                        dept?.accentBg || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {course.department}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          course.level === "Beginner"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : course.level === "Intermediate"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                        }`}
                      >
                        {course.level}
                      </span>
                      <button
                        onClick={(e) => toggleEnrollment(course.id, e)}
                        title={isEnrolled ? "Unenroll" : "Bookmark / Save"}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isEnrolled
                            ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                            : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => openCourse(course, "video")}
                    className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {course.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Synchronized Features Tags */}
                  <div className="flex items-center gap-2 mt-3 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-medium">
                      <Video className="w-3 h-3" />
                      HD Video Lessons
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                      <FileText className="w-3 h-3" />
                      PDF Study Notes
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {course.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="text-[11px] text-slate-400 px-1 py-0.5">
                        +{course.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Stats & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  {/* Meta stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.enrolled})</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => openCourse(course, "video")}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Video Classroom</span>
                    </button>
                    <button
                      onClick={() => openCourse(course, "pdf")}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>PDF Study Notes</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Main Interactive Video Classroom & PDF Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {activeCourseModal.department} Department
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {activeCourseModal.level}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    {activeCourseModal.type}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white truncate">
                  {activeCourseModal.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrintPdf}
                  title="Export / Download Clean PDF Study Guide"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveModalTab("video")}
                  className={`flex items-center gap-2 py-3 px-3 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                    activeModalTab === "video"
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Video className="w-4 h-4 text-rose-500" />
                  <span>Video Classroom</span>
                </button>

                <button
                  onClick={() => setActiveModalTab("pdf")}
                  className={`flex items-center gap-2 py-3 px-3 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                    activeModalTab === "pdf"
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Matching PDF Study Notes</span>
                </button>

                <button
                  onClick={() => setActiveModalTab("syllabus")}
                  className={`flex items-center gap-2 py-3 px-3 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                    activeModalTab === "syllabus"
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <ListOrdered className="w-4 h-4 text-purple-500" />
                  <span>Course Syllabus</span>
                </button>
              </div>

              {/* Module Stepper Dropdown / Controls */}
              <div className="flex items-center gap-1.5 text-xs pb-1">
                <span className="text-slate-400 hidden sm:inline">Module:</span>
                <select
                  value={activeModuleIndex}
                  onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  {activeCourseModal.modules.map((m, idx) => (
                    <option key={m.id} value={idx}>
                      Module {idx + 1}: {m.title.replace(/^Module \d+:?\s*/, "").slice(0, 28)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Body Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* ===================== TAB 1: VIDEO CLASSROOM ===================== */}
              {activeModalTab === "video" && (
                <div className="space-y-6">
                  {/* On-Screen Video Player Frame */}
                  <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 aspect-video w-full">
                    {(currentModule?.videoLesson?.youtubeId || "843nec-IvW0") ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${currentModule?.videoLesson?.youtubeId || "843nec-IvW0"}?rel=0&modestbranding=1`}
                        title={currentModule?.videoLesson?.title || "Video Lesson"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                        <Play className="w-12 h-12 text-indigo-500 animate-pulse" />
                        <p className="font-semibold text-white">Video Lesson Loading...</p>
                      </div>
                    )}
                  </div>

                  {/* Video Metadata & Synopsis */}
                  {currentModule?.videoLesson && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                            <span>Module {activeModuleIndex + 1} of {activeCourseModal.modules.length}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {currentModule.videoLesson.duration}
                            </span>
                            <span>•</span>
                            <span>Instructor: {currentModule.videoLesson.instructor}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {currentModule.videoLesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveModalTab("pdf")}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Read Matching PDF Notes</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {currentModule.videoLesson.summary}
                      </p>

                      {/* Video Chapter Timestamps */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Lecture Chapters & Timestamps
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {currentModule.videoLesson.timestamps.map((ts, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 transition-colors"
                            >
                              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[11px]">
                                {ts.time}
                              </span>
                              <span className="truncate">{ts.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Synchronized Code / Key Snippet Box from Video */}
                  {currentModule?.studyNotes?.[0] && (
                    <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-indigo-600" />
                          Key Code / Concept from this Video
                        </h4>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                          Synchronized with on-screen lecture
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {currentModule.studyNotes[0].content}
                      </p>
                      {currentModule.studyNotes[0].codeSnippet && (
                        <div className="relative rounded-xl overflow-hidden bg-slate-950 text-slate-100 text-xs font-mono p-4">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                currentModule.studyNotes![0].codeSnippet!,
                                "video-snip"
                              )
                            }
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            {copiedCodeIndex === "video-snip" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <pre className="overflow-x-auto whitespace-pre-wrap">
                            {currentModule.studyNotes[0].codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== TAB 2: SYNCHRONIZED PDF STUDY NOTES ===================== */}
              {activeModalTab === "pdf" && (
                <div className="space-y-6">
                  {/* PDF Toolbar Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-indigo-300 font-semibold uppercase">
                        <FileText className="w-4 h-4" />
                        Synchronized PDF Study Material
                      </div>
                      <h3 className="text-base font-bold">
                        {activeCourseModal.title} — Module {activeModuleIndex + 1}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Exact lecture notes matching the on-screen video lesson.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handlePrintPdf}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md shadow-emerald-500/20"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print / Save as PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Synchronized Study Notes Sections */}
                  {currentModule ? (
                    <div className="space-y-6">
                      {(currentModule.studyNotes?.length ? currentModule.studyNotes : [{
                        title: `${currentModule.title} - Core Material`,
                        content: "This module covers the essential foundations required for this topic. Follow along with the video lecture and review these key points.",
                        keyPoints: ["Watch the synchronized video lesson", "Understand the core concepts presented", "Complete the end-of-module capstone assignment"]
                      }]).map((sec, sidx) => (
                        <div
                          key={sidx}
                          className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
                        >
                          <h4 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700/60 pb-2">
                            {sec.title}
                          </h4>

                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {sec.content}
                          </p>

                          {/* Code Snippet Box */}
                          {sec.codeSnippet && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="font-mono uppercase font-bold text-[10px]">
                                  {sec.language || "code"}
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(sec.codeSnippet!, `pdf-snip-${sidx}`)
                                  }
                                  className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                                >
                                  {copiedCodeIndex === `pdf-snip-${sidx}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                                      <span className="text-emerald-500 font-semibold">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy Code</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="rounded-xl overflow-hidden bg-slate-950 text-slate-100 text-xs font-mono p-4">
                                <pre className="overflow-x-auto whitespace-pre-wrap">
                                  {sec.codeSnippet}
                                </pre>
                              </div>
                            </div>
                          )}

                          {/* Key Takeaways */}
                          {sec.keyPoints && sec.keyPoints.length > 0 && (
                            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 space-y-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                                Key Takeaways for this Topic
                              </span>
                              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                {sec.keyPoints.map((pt, pidx) => (
                                  <li key={pidx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Top Interview Questions & Answers */}
                          {sec.interviewQA && sec.interviewQA.length > 0 && (
                            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 space-y-3">
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                                <GraduationCap className="w-4 h-4 text-amber-600" />
                                Interview Q&A on this Topic
                              </span>
                              {sec.interviewQA.map((qa, qidx) => (
                                <div key={qidx} className="space-y-1 text-xs">
                                  <p className="font-bold text-slate-900 dark:text-white">
                                    Q: {qa.question}
                                  </p>
                                  <p className="text-slate-600 dark:text-slate-300 pl-3 border-l-2 border-amber-400">
                                    A: {qa.answer}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Module Capstone Project Box */}
                  {currentModule?.project && (
                    <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
                      <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold text-sm">Hands-On Module Project Assignment:</span>
                        <p className="leading-relaxed">{currentModule.project}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===================== TAB 3: COURSE SYLLABUS ===================== */}
              {activeModalTab === "syllabus" && (
                <div className="space-y-6">
                  {/* Quick Meta Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                      <Clock className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                      <span className="text-xs text-slate-400 block">Duration</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {activeCourseModal.duration}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                      <ListOrdered className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                      <span className="text-xs text-slate-400 block">Structure</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {activeCourseModal.modules.length} Multi-Week Modules
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                      <Star className="w-4 h-4 text-amber-500 fill-current mx-auto mb-1" />
                      <span className="text-xs text-slate-400 block">Rating</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {activeCourseModal.rating} / 5.0
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                      <Users className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <span className="text-xs text-slate-400 block">Enrolled</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {activeCourseModal.enrolled} Students
                      </span>
                    </div>
                  </div>

                  {/* Target Career Roles */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      🎯 Target Career Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeCourseModal.targetRoles.map((role, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full Multi-Week Course Modules Syllabus */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-600" />
                        Full Modular Syllabus & Weekly Topics
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        {activeCourseModal.modules.length} Modules Total
                      </span>
                    </div>

                    <div className="space-y-4">
                      {activeCourseModal.modules.map((mod, index) => (
                        <div
                          key={mod.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            activeModuleIndex === index
                              ? "bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-500/50"
                              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
                          } space-y-3`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                Module 0{index + 1}
                              </span>
                              <h4 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                                {mod.title}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                {mod.duration}
                              </span>
                              <button
                                onClick={() => {
                                  setActiveModuleIndex(index);
                                  setActiveModalTab("video");
                                }}
                                className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 transition-colors"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Watch</span>
                              </button>
                            </div>
                          </div>

                          {/* Topics bullet list */}
                          <div className="space-y-1.5 pl-1">
                            {mod.topics.map((topic, tidx) => (
                              <div
                                key={tidx}
                                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>

                          {/* Capstone Project Box */}
                          {mod.project && (
                            <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-300">
                              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">Hands-On Module Project: </span>
                                <span>{mod.project}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites & Outcomes Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                        Prerequisites
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {activeCourseModal.prerequisites.map((p, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Key Learning Outcomes
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {activeCourseModal.keyOutcomes.map((k, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeModuleIndex > 0 && (
                  <button
                    onClick={() => setActiveModuleIndex((prev) => prev - 1)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Module</span>
                  </button>
                )}
                {activeModuleIndex < activeCourseModal.modules.length - 1 && (
                  <button
                    onClick={() => setActiveModuleIndex((prev) => prev + 1)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1"
                  >
                    <span>Next Module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrintPdf}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Export PDF</span>
                </button>

                <button
                  onClick={() => toggleEnrollment(activeCourseModal.id)}
                  className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    enrolledCourses[activeCourseModal.id]
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                      : "btn-primary"
                  }`}
                >
                  {enrolledCourses[activeCourseModal.id]
                    ? "Enrolled (Click to Drop)"
                    : "Enroll & Save Track"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Layout Template for Clean PDF Export */}
      {activeCourseModal && (
        <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[99999]">
          <div className="space-y-6 max-w-4xl mx-auto font-sans">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
                {activeCourseModal.department} Department • Official Study Guide
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                {activeCourseModal.title}
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                {activeCourseModal.level} Level • {activeCourseModal.duration} • Synchronized Video Lecture Notes
              </p>
            </div>

            {/* Current Module Overview */}
            {currentModule && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-100 rounded-xl border border-slate-300">
                  <h2 className="text-lg font-bold text-slate-900">
                    {currentModule.title}
                  </h2>
                  {currentModule.videoLesson && (
                    <div className="text-xs text-slate-700 mt-1 space-y-1">
                      <p>
                        <span className="font-bold">Video Lesson:</span> {currentModule.videoLesson.title} ({currentModule.videoLesson.duration})
                      </p>
                      <p>
                        <span className="font-bold">Instructor:</span> {currentModule.videoLesson.instructor}
                      </p>
                      <p className="text-slate-600">{currentModule.videoLesson.summary}</p>
                    </div>
                  )}
                </div>

                {/* Topics Covered */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Core Topics
                  </h3>
                  <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1">
                    {currentModule.topics.map((t, tidx) => (
                      <li key={tidx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Study Notes & Code */}
                {currentModule.studyNotes?.map((note, nidx) => (
                  <div key={nidx} className="space-y-2 pt-2 border-t border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900">{note.title}</h3>
                    <p className="text-xs text-slate-800 leading-relaxed">{note.content}</p>

                    {note.codeSnippet && (
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
                        <pre>{note.codeSnippet}</pre>
                      </div>
                    )}

                    {note.keyPoints && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase text-slate-700">
                          Key Principles:
                        </span>
                        <ul className="list-disc pl-5 text-xs text-slate-800">
                          {note.keyPoints.map((kp, kpidx) => (
                            <li key={kpidx}>{kp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {note.interviewQA && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                        <span className="text-[11px] font-bold uppercase text-amber-900">
                          Target Interview Questions:
                        </span>
                        {note.interviewQA.map((qa, qidx) => (
                          <div key={qidx} className="text-xs text-slate-800">
                            <p className="font-bold">Q: {qa.question}</p>
                            <p className="pl-3 italic text-slate-700">A: {qa.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {currentModule.project && (
                  <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg text-xs">
                    <span className="font-bold">Module Capstone Assignment: </span>
                    <span>{currentModule.project}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
