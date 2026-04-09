"use client";

import { useEffect, ReactNode } from "react";

type SexyScrollProps = {
  children: ReactNode;
};

const SexyScroll = ({ children }: SexyScrollProps) => {
  useEffect(() => {
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let rafId: number;
    const ease = 0.06;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
      );
    };

    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * ease;

      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
      }

      window.scrollTo(0, currentScroll);
      rafId = requestAnimationFrame(animate);
    };

    // Sync on manual scroll (keyboard, scrollbar drag)
    const onScroll = () => {
      // Only sync if not being driven by our animation
      if (Math.abs(window.scrollY - currentScroll) > 2) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
};

export default SexyScroll;
