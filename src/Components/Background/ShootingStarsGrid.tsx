"use client";

import { CSSProperties, useMemo } from "react";

type ThemeMode = "light" | "dark";

type ShootingStarsGridProps = {
  theme: ThemeMode;
  starCount?: number;
  minDuration?: number;
  maxDuration?: number;
  minDelay?: number;
  maxDelay?: number;
};

type StarConfig = {
  axis: "horizontal" | "vertical";
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  length: string;
};

export default function ShootingStarsGrid({
  theme,
  starCount = 10,
  minDuration = 1.9,
  maxDuration = 3.2,
  minDelay = 0,
  maxDelay = 10,
}: ShootingStarsGridProps) {
  const stars = useMemo<StarConfig[]>(() => {
    const count = Math.max(4, Math.min(starCount, 24));

    return Array.from({ length: count }, () => {
      const axis = Math.random() > 0.5 ? "horizontal" : "vertical";
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const delay = `${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s`;
      const duration = `${(Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2)}s`;
      const size = `${(Math.random() * 0.18 + 0.92).toFixed(2)}px`;
      const length = `${Math.floor(Math.random() * 46 + 56)}px`;

      return { axis, top, left, delay, duration, size, length };
    });
  }, [starCount, minDuration, maxDuration, minDelay, maxDelay]);

  return (
    <div
      aria-hidden="true"
      className={`shooting-stars-grid ${theme === "dark" ? "shooting-stars-grid-dark" : "shooting-stars-grid-light"}`}
    >
      <div className="shooting-stars-grid-overlay" />

      {stars.map((star, index) => {
        const style = {
          "--star-top": star.top,
          "--star-left": star.left,
          "--star-delay": star.delay,
          "--star-duration": star.duration,
          "--star-size": star.size,
          "--star-length": star.length,
        } as CSSProperties;

        return (
          <span
            key={`${star.left}-${star.top}-${index}`}
            className={`shooting-star ${star.axis === "horizontal" ? "shooting-star-horizontal" : "shooting-star-vertical"}`}
            style={style}
          />
        );
      })}
    </div>
  );
}