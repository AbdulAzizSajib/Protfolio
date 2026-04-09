"use client";

import { ReactNode, useEffect } from "react";
import useTheme from "../Hooks/useTheme";
import ShootingStarsGrid from "../Background/ShootingStarsGrid";

type ThemeRootProps = {
  children: ReactNode;
};

const ThemeRoot = ({ children }: ThemeRootProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div
      style={{ fontFamily: "Fira Code, sans-serif" }}
      className={`relative overflow-x-hidden ${
        theme === "light" ? "text-black bg-white" : "bg-zinc-900 text-white"
      }`}
    >
      <ShootingStarsGrid theme={theme} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ThemeRoot;
