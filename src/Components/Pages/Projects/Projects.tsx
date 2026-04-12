"use client";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useTheme from "../../Hooks/useTheme";
import { trackEvent } from "../../../lib/analytics";
import type { Project } from "../../../lib/api";
import TextDoodle from "../../TextDoodle/TextDoodle";

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  const { theme } = useTheme();

  return (
    <section id="projects" className={theme === "light" ? "text-black p-4 lg:p-0" : " text-white p-4 lg:p-0"}>
      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-4">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-3xl mb-4">
                  <TextDoodle type="underline"  strokeWidth={6} color={theme === "light" ? "#818cf8" : "#26acff"}>Projects</TextDoodle>
                  
                  </h2>
      </div>

      <div className="mx-auto max-w-5xl">
        {projects.map((project, index) => (
          <ProjectHoverLink key={`${project.title}-${index}`} project={project} theme={theme} />
        ))}
      </div>
    </section>
  );
};

type ProjectHoverLinkProps = {
  project: Project;
  theme: string;
};

const ProjectHoverLink = ({ project, theme }: ProjectHoverLinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["72%", "84%"]); 

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const href = project.liveLink && project.liveLink !== "#" ? project.liveLink : "#";
  const preview = project.thumbnail || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop";

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noopener noreferrer" : undefined}
      initial="initial"
      whileHover="whileHover"
      onClick={() => {
        trackEvent("project_open", project.title);
      }}
      className={`group relative flex items-center justify-between border-b-2 py-4 transition-colors duration-500 md:py-8 ${
        theme === "light"
          ? "border-neutral-300 hover:border-neutral-900"
          : "border-neutral-700 hover:border-neutral-50"
      }`}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className={`relative z-10 block text-3xl font-bold transition-colors duration-500 sm:text-3xl md:text-4xl ${
            theme === "light"
              ? "text-neutral-800 group-hover:text-neutral-900"
              : "text-neutral-200 group-hover:text-neutral-50"
          }`}
        >
          {project.title.split("").map((letter, index) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={index}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <ul
          className={`relative z-10 mt-2 max-w-xl list-disc space-y-1 pl-5 text-sm transition-colors duration-500 md:text-base ${
            theme === "light"
              ? "text-neutral-500 group-hover:text-neutral-900"
              : "text-neutral-500 group-hover:text-neutral-50"
          }`}
        >
          {project.description
            .split(/\.(\s+|$)/)
            .map((sentence) => sentence.trim())
            .filter(Boolean)
            .map((sentence, sentenceIndex, sentences) => {
              const isLastSentence = sentenceIndex === sentences.length - 1;
              const text = isLastSentence ? sentence : `${sentence}.`;

              return <li key={`${project.title}-${sentenceIndex}`}>{text}</li>;
            })}
        </ul>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={preview}
        className="pointer-events-none absolute z-0 hidden h-24 w-32 rounded-lg object-cover md:block md:h-48 md:w-64"
        alt={`Preview image for ${project.title}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className={theme === "light" ? "text-4xl text-neutral-900" : "text-4xl text-neutral-50"} />
      </motion.div>
    </motion.a>
  );
};

export default Projects;
