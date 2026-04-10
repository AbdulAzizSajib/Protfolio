"use client";

import { ReactNode } from "react";
import ThemeProvider from "../src/Components/ThemeProvider/ThemeProvider";
import CircleCursor from "../src/Components/Cursor/CircleCursor";
import SexyScroll from "../src/Components/SexyScroll/SexyScroll";
import AnalyticsTracker from "../src/Components/Analytics/AnalyticsTracker";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AnalyticsTracker />
      <CircleCursor />
      <SexyScroll>{children}</SexyScroll>
    </ThemeProvider>
  );
}
