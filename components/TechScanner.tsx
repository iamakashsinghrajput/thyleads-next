'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { portalUrl } from '@/lib/portal';
import { useRouter } from 'next/navigation';

const DEMO_BRANDS = [
  { name: 'Mamaearth', url: 'mamaearth.in' },
  { name: 'boAt', url: 'boat-lifestyle.com' },
  { name: 'Sugar Cosmetics', url: 'sugarcosmetics.com' },
  { name: 'Lenskart', url: 'lenskart.com' },
];

const TYPEWRITER_TEXTS = ['nike.com', 'zara.com', 'mamaearth.in', 'boat-lifestyle.com'];
const SCAN_STORAGE_KEY = 'harvin_free_scan_used';

export default function TechScanner() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState('');
  const [scanGated, setScanGated] = useState(false);
  const [placeholder, setPlaceholder] = useState('nike.com');
  const inputRef = useRef<HTMLInputElement>(null);
  const userTypedRef = useRef(false);

  // Cycle placeholder text to show it's a live tool
  useEffect(() => {
    if (userTypedRef.current) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (userTypedRef.current) { clearInterval(interval); return; }
      idx = (idx + 1) % TYPEWRITER_TEXTS.length;
      setPlaceholder(TYPEWRITER_TEXTS[idx]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus the input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(timer);
  }, []);

  function isFreeScanUsed(): boolean {
    try { return localStorage.getItem(SCAN_STORAGE_KEY) === '1'; } catch { return false; }
  }

  function isLoggedIn(): boolean {
    try { return !!localStorage.getItem('harvin_user'); } catch { return false; }
  }

  function navigateToScan(url: string) {
    if (!url.trim()) return;
    if (isFreeScanUsed() && !isLoggedIn()) { setScanGated(true); return; }
    const domain = url.trim().replace(/^https?:\/\//, '').replace(/^www\d*\./, '').replace(/\/+$/, '');
    router.push(`/scan/${encodeURIComponent(domain)}`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigateToScan(inputUrl);
  }

  function handleDemo(url: string) {
    setInputUrl(url);
    navigateToScan(url);
  }

  function handleInputChange(val: string) {
    userTypedRef.current = true;
    setInputUrl(val);
  }

  if (scanGated) {
    return (
      <div className="text-center">
        <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 mb-3">
          Sign in to unlock unlimited scans
        </p>
        <div className="flex justify-center">
          <a
            href={portalUrl()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-semibold text-white bg-[#C94C1E] hover:bg-[#b5431a] transition-all"
          >
            Sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 rounded-2xl
                   bg-white dark:bg-slate-900
                   border-2 border-slate-200 dark:border-slate-700
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                   dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                   hover:border-[#C94C1E]/40
                   focus-within:border-[#C94C1E] focus-within:shadow-[0_4px_24px_rgba(201,76,30,0.15)]
                   transition-all duration-200"
      >
        <div className="pl-3 flex-shrink-0">
          <svg className="w-5 h-5 text-[#C94C1E]" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 2c-2 2-3 5-3 8s1 6 3 8M10 2c2 2 3 5 3 8s-1 6-3 8M2 10h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputUrl}
          onChange={e => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[16px]
                     text-slate-900 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     min-w-0 py-2"
        />
        <button
          type="submit"
          disabled={!inputUrl.trim()}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-6 py-3 rounded-xl
                     text-[15px] font-bold text-white
                     bg-[#C94C1E]
                     hover:bg-[#b5431a]
                     shadow-[0_2px_8px_rgba(201,76,30,0.35)]
                     hover:shadow-[0_4px_16px_rgba(201,76,30,0.45)]
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
        >
          Scan now
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>

      {/* Demo brands — styled as clickable chips */}
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {DEMO_BRANDS.map(b => (
          <button
            key={b.url}
            type="button"
            onClick={() => handleDemo(b.url)}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium
                       text-slate-600 dark:text-slate-400
                       px-3 py-1.5 rounded-full
                       bg-white dark:bg-white/[0.05]
                       border border-slate-200 dark:border-white/[0.08]
                       shadow-sm
                       hover:border-[#C94C1E]/40 hover:text-[#C94C1E]
                       hover:shadow-[0_2px_8px_rgba(201,76,30,0.1)]
                       active:scale-95
                       transition-all duration-150"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=32`}
              alt=""
              className="w-4 h-4 rounded-sm"
            />
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}
