'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type ColorTheme = 'green' | 'yellow' | 'red' | 'blue';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  color: ColorTheme;
  setColor: (c: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => {},
  color: 'green',
  setColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [color, setColorState] = useState<ColorTheme>('green');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    const savedColor = localStorage.getItem('portfolio-color') as ColorTheme | null;
    setTheme(savedTheme ?? 'dark');
    setColorState(savedColor ?? 'green');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.classList.remove('color-yellow', 'color-red', 'color-blue');
    if (color !== 'green') html.classList.add(`color-${color}`);
    localStorage.setItem('portfolio-color', color);
  }, [color, mounted]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const setColor = (c: ColorTheme) => setColorState(c);

  return (
    <ThemeContext.Provider value={{ theme, toggle, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
