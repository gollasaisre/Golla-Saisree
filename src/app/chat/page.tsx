"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: "user" | "ai", content: string, actions?: string[]}[]>([
    { role: "ai", content: "Hi Alex! I'm your personal AI Career Mentor. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const text = textOverride || input;
    if (!text.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const response = await res.json();
      setMessages(prev => [...prev, { role: "ai", content: response.message, actions: response.suggestedActions }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error connecting to my neural network." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col card-glass rounded-3xl overflow-hidden border border-white/20 dark:border-white/[0.06]">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex items-center gap-4">
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-sm">Career AI Mentor</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Online • Ready to assist</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-in-up`} style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${
              msg.role === "user" 
                ? "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20" 
                : "bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/15"
            }`}>
              {msg.role === "user" 
                ? <User className="w-4 h-4 text-white" /> 
                : <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              }
            </div>
            
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-sm shadow-md shadow-indigo-500/15" 
                  : "bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] text-slate-800 dark:text-slate-200 rounded-tl-sm"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
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
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/30 dark:border-indigo-500/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div className="bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] px-5 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={sendMessage} className="p-4 border-t border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about careers, skills, or your roadmap..."
          className="flex-1 input-glass text-sm"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || loading} 
          className="btn-primary p-3 rounded-xl disabled:opacity-40 group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
