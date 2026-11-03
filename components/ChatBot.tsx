'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2, ChevronDown } from 'lucide-react';

/**
 * Site-wide "Ask AI" widget, mounted once in app/layout.tsx.
 * Answers come from app/api/chat (Groq), limited to Harvin's own site content.
 */

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'What does Harvin do?',
  'How does Harvin help SDR managers?',
  'What do AEs get from Harvin?',
  'Does it work with my CRM?',
  'How do I get access?',
];

const ChatIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.002L2 22l4.998-1.338A9.965 9.965 0 0012 22z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Escape first, then apply the small markdown subset the bot uses. */
function formatContent(text: string) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
      if (href.startsWith('/')) return `<a href="${href}" class="text-ember-500 dark:text-ember-300 underline underline-offset-2">${label}</a>`;
      if (/^(https?:|mailto:)/.test(href))
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-ember-500 dark:text-ember-300 underline underline-offset-2">${label}</a>`;
      return label; // anything else (javascript:, data:, …) is shown as plain text
    })
    .replace(
      /^[-*] (.+)$/gm,
      '<div class="flex gap-1.5 ml-1"><span class="text-ember-500 flex-shrink-0 text-[10px] mt-[3px]">●</span><span>$1</span></div>',
    )
    .replace(/\n/g, '<br/>');
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const next: Message[] = [...messages, { role: 'user', content: text.trim().slice(0, 1000) }];
      setMessages(next);
      setInput('');
      setLoading(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json();
        setMessages([...next, { role: 'assistant', content: data.reply || 'Something went wrong. Please try again.' }]);
      } catch {
        setMessages([...next, { role: 'assistant', content: 'Network error — please check your connection and try again.' }]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  return (
    <div data-chatbot>
      {/* Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open the Harvin AI assistant"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all
                     bg-ember-500 text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)]
                     hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
        >
          <ChatIcon />
          <span>Ask AI</span>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Harvin AI assistant"
          className="fixed bottom-5 right-5 z-[70] flex h-[min(540px,calc(100dvh-2.5rem))] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-modal sm:w-[380px]
                     border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                     dark:border-white/[0.08] dark:bg-[#141414] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500 text-white">
                <ChatIcon className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-[13px] font-bold text-slate-800 dark:text-white">Harvin Assistant</span>
                <p className="text-[10.5px] text-slate-400 dark:text-slate-500">Answers about Harvin only</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-white/[0.06]"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setMessages([]);
                }}
                aria-label="Close chat and clear conversation"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-white/[0.06]"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
            {messages.length === 0 && !loading && (
              <div className="flex h-full flex-col items-center justify-center px-2 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-500 dark:text-ember-300">
                  <ChatIcon className="h-6 w-6" />
                </div>
                <p className="mb-1 text-[14px] font-bold text-slate-800 dark:text-white">How can I help?</p>
                <p className="mb-5 text-[12px] text-slate-400 dark:text-slate-500">Ask me anything about Harvin</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11.5px] font-medium text-slate-600 transition-all
                                 hover:border-ember-500/40 hover:bg-ember-500/5 hover:text-ember-500
                                 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:text-ember-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-ember-500/10 text-ember-500 dark:text-ember-300">
                    <ChatIcon className="h-3 w-3" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-xl px-3 py-2 text-[13px] leading-[1.6] ${
                    msg.role === 'user'
                      ? 'rounded-br-sm bg-ember-500 text-white'
                      : 'rounded-bl-sm border border-slate-100 bg-slate-50 text-slate-700 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-slate-300'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-ember-500/10 text-ember-500 dark:text-ember-300">
                  <ChatIcon className="h-3 w-3" />
                </div>
                <div className="rounded-xl rounded-bl-sm border border-slate-100 bg-slate-50 px-3.5 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.04]">
                  <div className="flex items-center gap-1" aria-label="Assistant is typing">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s] dark:bg-slate-600" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s] dark:bg-slate-600" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="border-t border-slate-100 px-3 pb-3 pt-2 dark:border-white/[0.06]"
          >
            <div
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-all
                         focus-within:border-ember-500/40 focus-within:ring-1 focus-within:ring-ember-500/10
                         dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={1000}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Harvin..."
                aria-label="Your question"
                className="flex-1 bg-transparent py-2.5 text-[13px] text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send"
                className={`rounded-lg p-1.5 transition-all ${
                  input.trim() && !loading ? 'bg-ember-500 text-white hover:bg-ember-400' : 'text-slate-300 dark:text-slate-600'
                }`}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
              AI answers can be wrong. Please verify important details.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
