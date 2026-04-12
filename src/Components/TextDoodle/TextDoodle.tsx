"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type DoodleType = "highlight" | "underline" | "circle" | "strikethrough";

type TextDoodleProps = {
  children: React.ReactNode;
  type?: DoodleType;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

const doodlePaths: Record<DoodleType, string> = {
  highlight: `M0,1 C20,0 40,1 60,3 C80,5 100,1 120,3 C140,5 160,2 180,4 C200,6 220,3 240,4 C260,5 280,2 300,2
              L300,15 C280,17 260,13 240,15 C220,17 200,14 180,16 C160,14 140,17 120,15 C100,13 80,16 60,14 C40,16 20,13 0,16 Z`,

  // smooth shallow underline like the image
  underline: `M6 18 C55 13, 110 11, 160 10 C210 9, 255 10, 300 11`,

  circle: `M150,2 C230,2 290,15 290,25 C290,40 230,48 150,48 C70,48 10,40 10,25 C10,15 70,2 150,2 Z`,
  strikethrough: `M0,25 C50,22 100,28 150,24 C200,20 250,27 300,25`,
};

const viewBoxes: Record<DoodleType, string> = {
  highlight: "0 0 300 16",
  underline: "0 0 300 24",
  circle: "0 0 300 50",
  strikethrough: "0 0 300 50",
};

export default function TextDoodle({
  children,
  type = "highlight",
  color = "#facc15",
  strokeWidth = 2,
  duration = 0.8,
  delay = 0.2,
  className = "",
}: TextDoodleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  const svgPositionClass: Record<DoodleType, string> = {
    highlight: "inset-0",
    underline: "left-0 right-0 -bottom-[0.35em]",
    circle: "inset-0 -inset-x-2 -inset-y-1",
    strikethrough: "inset-0",
  };

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      <svg
        className={`absolute ${svgPositionClass[type]} ${
          type === "highlight" ? "z-0" : "z-20"
        } pointer-events-none`}
        viewBox={viewBoxes[type]}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: type === "underline" ? "0.42em" : "100%",
          overflow: "visible",
        }}
      >
        {type === "highlight" ? (
          <motion.path
            d={doodlePaths.highlight}
            fill={color}
            stroke="none"
            opacity={0.5}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={
              isInView
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ duration, delay, ease: "easeInOut" }}
          />
        ) : (
          <motion.path
            d={doodlePaths[type]}
            stroke={color}
            strokeWidth={type === "underline" ? strokeWidth * 0.9 : strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration, delay, ease: "easeInOut" }}
          />
        )}
      </svg>
    </span>
  );
}