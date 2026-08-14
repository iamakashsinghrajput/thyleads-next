'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  isDark: boolean;
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
}

/**
 * Light is the default: the marketing site's light treatment (the sand/beige
 * sections) is the intended first impression, so dark is opt-in rather than
 * inherited from the visitor's OS. 'system' stays available via the toggle.
 */
const DEFAULT_MODE: ThemeMode = 'light';

const ThemeContext = createContext<ThemeContextType>({ isDark: false, mode: DEFAULT_MODE, toggle: () => {}, setMode: () => {} });

function getSystemDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return getSystemDark();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_MODE);
  const [isDark, setIsDark] = useState(false);

  // Load saved preference on mount. No saved value => DEFAULT_MODE, so a
  // first-time visitor on a dark-mode OS still lands on the light treatment.
  useEffect(() => {
    const saved = localStorage.getItem('harvin_theme') as ThemeMode | null;
    const m = saved === 'light' || saved === 'dark' || saved === 'system' ? saved : DEFAULT_MODE;
    setModeState(m);
    setIsDark(resolveIsDark(m));
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  // Listen for system theme changes (only matters in system mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') setIsDark(mq.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    setIsDark(resolveIsDark(m));
    localStorage.setItem('harvin_theme', m);
  }, []);

  // Cycle: light → dark → system → light
  const toggle = useCallback(() => {
    const next: ThemeMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(next);
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ isDark, mode, toggle, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
