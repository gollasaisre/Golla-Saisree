"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, Zap, ShieldCheck } from "lucide-react";
import { getOfflineMentorReply } from "@/lib/mentorEngine";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; actions?: string[] }[]>([
    {
      role: "ai",
      content: "Hello! I'm your CareerPilot AI Mentor. Ask me about coding interviews, DSA roadmaps, resume tips, campus placements, or engineering career choices. How can I help you today?",
      actions: [
        "How to prepare for campus placements?",
        "Resume tips for ATS optimization",
        "Top DSA topics for technical rounds",
        "Python vs Java for backend development",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const text = textOverride || input;
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      // First attempt live backend API if available
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const response = await res.json();
        if (response.message) {
          setMessages((prev) => [
            ...prev,
            { role: "ai", content: response.message, actions: response.suggestedActions },
          ]);
          return;
        }
      }
      throw new Error("Fallback required");
    } catch {
      // Seamlessly switch to intelligent CareerPilot Mentor engine without error wall
      const fallback = getOfflineMentorReply(text);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: fallback.message,
          actions: fallback.suggestedActions,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col card-glass rounded-3xl overflow-hidden border border-white/20 dark:border-white/[0.06] shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">CareerPilot AI Mentor</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Interactive AI
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Ready • 24/7 Career Assistance</p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "ai",
                content: "Chat cleared! What new topic would you like to discuss today?",
                actions: [
                  "Top DSA topics for technical rounds",
                  "Resume tips for ATS optimization",
                  "How to prepare for campus placements?",
                ],
              },
            ])
          }
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors text-xs flex items-center gap-1.5"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-in-up`}
          >
            <div
              className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20"
                  : "bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/15"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              )}
            </div>

            <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-sm shadow-md shadow-indigo-500/15"
                    : "bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] text-slate-800 dark:text-slate-200 rounded-tl-sm"
                }`}
              >
                <div className="whitespace-pre-line text-sm">{msg.content}</div>
              </div>

              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {msg.actions.map((action, j) => (
                    <button
                      key={j}
                      onClick={() => sendMessage(undefined, action)}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-200/50 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/20"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-in-up">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] rounded-tl-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="text-xs text-slate-400 ml-2">Consulting knowledge base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-4 border-t border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about coding, interviews, DSA, or career roadmaps..."
          disabled={loading}
          className="flex-1 bg-white/60 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.08] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="btn-primary px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
