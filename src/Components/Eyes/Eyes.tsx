"use client";

import { useEffect, useRef } from "react";

type EyesProps = {
  size?: number;
};

const Eyes = ({ size = 28 }: EyesProps) => {
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      [leftEyeRef, rightEyeRef].forEach((eyeRef, i) => {
        const pupilRef = i === 0 ? leftPupilRef : rightPupilRef;
        if (!eyeRef.current || !pupilRef.current) return;

        const rect = eyeRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) * 0.15, size * 0.2);

        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;

        pupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);

  const eyeStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid currentColor",
  };

  const pupilStyle = {
    width: size * 0.4,
    height: size * 0.4,
    borderRadius: "50%",
    background: "#111",
    willChange: "transform" as const,
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer select-none">
      <div ref={leftEyeRef} style={eyeStyle}>
        <div ref={leftPupilRef} style={pupilStyle} />
      </div>
      <div ref={rightEyeRef} style={eyeStyle}>
        <div ref={rightPupilRef} style={pupilStyle} />
      </div>
    </div>
  );
};

export default Eyes;
