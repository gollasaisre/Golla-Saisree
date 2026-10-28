'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Zap, Brain } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'agent';
  content: string;
};

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const startSession = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (data.sessionId) {
          setSessionId(data.sessionId);
          setMessages([{ id: crypto.randomUUID(), role: 'agent', content: data.message }]);
          setSuggestedActions(data.suggestedActions || []);
        }
      } catch (err) {
        console.error('Error starting session:', err);
      } finally {
        setLoading(false);
      }
    };
    startSession();
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !sessionId) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setSuggestedActions([]);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: messageText }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'agent', content: data.message }]);
        setSuggestedActions(data.suggestedActions || []);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col card-glass rounded-3xl overflow-hidden border border-white/20 dark:border-white/[0.06]">

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl flex items-center gap-4">
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-sm">Career Pilot</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Autonomous • AI-Powered</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
            <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20'
                : 'bg-violet-500/10 dark:bg-violet-500/15 border border-violet-200/30 dark:border-violet-500/15'
            }`}>
              {msg.role === 'user'
                ? <User className="w-4 h-4 text-white" />
                : <Zap className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              }
            </div>
            <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-sm shadow-md shadow-indigo-500/15'
                  : 'bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] text-slate-800 dark:text-slate-200 rounded-tl-sm'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 animate-fade-in-up">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-200/30 dark:border-violet-500/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            </div>
            <div className="bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] px-5 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Actions */}
      {suggestedActions.length > 0 && (
        <div className="px-6 pb-2 flex flex-wrap gap-2">
          {suggestedActions.map((action, i) => (
            <button
              key={i}
              onClick={() => sendMessage(action)}
              disabled={loading}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-violet-200/50 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 bg-violet-500/5 dark:bg-violet-500/10 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-200 hover:shadow-md hover:shadow-violet-500/20 disabled:opacity-50"
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
          placeholder="Ask Career Pilot anything..."
          disabled={loading || !sessionId}
          className="flex-1 input-glass text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading || !sessionId}
          className="btn-primary p-3 rounded-xl disabled:opacity-40 group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
