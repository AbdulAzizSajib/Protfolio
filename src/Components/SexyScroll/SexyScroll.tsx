"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

type SexyScrollProps = {
  children: ReactNode;
};

const SexyScroll = ({ children }: SexyScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SexyScroll;
