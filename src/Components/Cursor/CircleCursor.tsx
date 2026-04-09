"use client";

import { useEffect, useRef, useState } from "react";

type CircleCursorProps = {
  size?: number;
  dotSize?: number;
  color?: string;
  ringOpacity?: number;
  ringWidth?: number;
  zIndex?: number;
  smoothness?: number;
  clickScale?: number;
  hoverScale?: number;
  hideNativeCursor?: boolean;
};

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [data-cursor-hover='true']";

export default function CircleCursor({
  size = 34,
  dotSize = 8,
  color = "var(--cursor-color, #111111)",
  ringOpacity = 0.35,
  ringWidth = 1.5,
  zIndex = 100,
  smoothness = 0.18,
  clickScale = 0.88,
  hoverScale = 1.4,
  hideNativeCursor = true,
}: CircleCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const scaleRef = useRef(1);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      setEnabled(media.matches && !motion.matches);
    };

    syncEnabled();

    media.addEventListener("change", syncEnabled);
    motion.addEventListener("change", syncEnabled);

    return () => {
      media.removeEventListener("change", syncEnabled);
      motion.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      document.documentElement.classList.remove("custom-circle-cursor-active");
      return;
    }

    const onMove = (event: MouseEvent) => {
      targetX.current = event.clientX;
      targetY.current = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - dotSize / 2}px, ${event.clientY - dotSize / 2}px, 0)`;
      }

      const hovered = (event.target as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR);
      scaleRef.current = hovered ? hoverScale : 1;
      setVisible(true);
    };

    const onMouseDown = () => {
      scaleRef.current = scaleRef.current * clickScale;
    };

    const onMouseUp = () => {
      scaleRef.current = Math.max(1, scaleRef.current / clickScale);
    };

    const onLeave = () => {
      setVisible(false);
    };

    const onEnter = () => {
      setVisible(true);
    };

    const animate = () => {
      ringX.current += (targetX.current - ringX.current) * smoothness;
      ringY.current += (targetY.current - ringY.current) * smoothness;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current - size / 2}px, ${ringY.current - size / 2}px, 0) scale(${scaleRef.current})`;
      }

      animationRef.current = window.requestAnimationFrame(animate);
    };

    if (hideNativeCursor) {
      document.documentElement.classList.add("custom-circle-cursor-active");
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-circle-cursor-active");
    };
  }, [enabled, size, dotSize, smoothness, hoverScale, clickScale, hideNativeCursor]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        ref={ringRef}
        className="circle-cursor-ring"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${ringWidth}px solid ${color}`,
          opacity: visible ? ringOpacity : 0,
          zIndex,
        }}
      />
      <div
        aria-hidden="true"
        ref={dotRef}
        className="circle-cursor-dot"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          opacity: visible ? 1 : 0,
          zIndex: zIndex + 1,
        }}
      />
    </>
  );
}