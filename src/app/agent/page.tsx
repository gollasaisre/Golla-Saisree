'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Brain, RefreshCw, Zap } from 'lucide-react';
import { getOfflineMentorReply } from '@/lib/mentorEngine';

type Message = {
  id: string;
  role: 'user' | 'agent';
  content: string;
  suggestedActions?: string[];
};

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: "Welcome to Career Pilot Autonomous Agent. I analyze your engineering background, evaluate your skill gaps, and provide actionable next steps to prepare you for campus placements and technical interviews. What goal would you like to achieve today?",
      suggestedActions: [
        "Audit my skills for Full Stack Engineer",
        "Generate a 30-day DSA study plan",
        "Review behavioral interview questions",
        "Guide me on building a standout resume"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([
    "Audit my skills for Full Stack Engineer",
    "Generate a 30-day DSA study plan",
    "Review behavioral interview questions",
    "Guide me on building a standout resume"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setSuggestedActions([]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages(prev => [
            ...prev,
            { id: (Date.now() + 1).toString(), role: 'agent', content: data.message, suggestedActions: data.suggestedActions }
          ]);
          setSuggestedActions(data.suggestedActions || []);
          return;
        }
      }
      throw new Error("Fallback required");
    } catch {
      // Seamless intelligent CareerPilot offline response
      const fallback = getOfflineMentorReply(messageText);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: fallback.message,
          suggestedActions: fallback.suggestedActions
        }
      ]);
      setSuggestedActions(fallback.suggestedActions || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col card-glass rounded-3xl overflow-hidden border border-white/20 dark:border-white/[0.06] shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">Career Pilot</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                Autonomous Agent
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Neural Career System Active</p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                role: 'agent',
                content: "Session reset. What career or technical challenge should we tackle now?",
                suggestedActions: [
                  "Audit my skills for Full Stack Engineer",
                  "Generate a 30-day DSA study plan",
                  "Review behavioral interview questions"
                ]
              }
            ])
          }
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors text-xs flex items-center gap-1.5"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20 text-white'
                  : 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[85%] flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-sm shadow-md shadow-indigo-500/15'
                    : 'bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] text-slate-800 dark:text-slate-200 rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-line text-sm">{m.content}</div>
              </div>

              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {m.suggestedActions.map((act, j) => (
                    <button
                      key={j}
                      onClick={() => sendMessage(act)}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-violet-200/50 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 bg-violet-500/5 dark:bg-violet-500/10 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-200 hover:shadow-md hover:shadow-violet-500/20"
                    >
                      {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-in-up">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] rounded-tl-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-slate-400 ml-2">Synthesizing personalized advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested actions prompt pill bar if available */}
      {suggestedActions.length > 0 && !loading && (
        <div className="px-6 py-2 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-200/40 dark:border-white/[0.04] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> Prompts:
          </span>
          {suggestedActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(action)}
              className="text-xs px-3 py-1 rounded-full whitespace-nowrap bg-white dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-xs"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Career Pilot about engineering roadmaps, interview prep, or project ideas..."
          disabled={loading}
          className="flex-1 bg-white/60 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.08] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="btn-primary px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
