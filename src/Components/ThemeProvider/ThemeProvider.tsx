"use client";

import { createContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (selectedTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  const themeInfo: ThemeContextValue = { theme, toggleTheme };

  return <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
