"use client";

import { ReactNode } from "react";
import useTheme from "../Hooks/useTheme";

type ThemeRootProps = {
  children: ReactNode;
};

const ThemeRoot = ({ children }: ThemeRootProps) => {
  const { theme } = useTheme();

  return (
    <div
      style={{ fontFamily: "Fira Code, sans-serif" }}
      className={theme === "light" ? "text-black bg-white" : "bg-zinc-900 text-white"}
    >
      {children}
    </div>
  );
};

export default ThemeRoot;
