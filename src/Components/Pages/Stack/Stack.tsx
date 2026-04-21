"use client";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useTheme from "../../Hooks/useTheme";
import type { Skill } from "../../../lib/api";
import TextDoodle from "../../TextDoodle/TextDoodle";

type StackProps = {
  skills: Skill[];
};

const shuffle = (array: Skill[]) => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled;
};

const Stack = ({ skills }: StackProps) => {
  const { theme } = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [displayedSkills, setDisplayedSkills] = useState(skills);

  useEffect(() => {
    if (!skills || skills.length === 0) return;

    const shuffleSkills = () => {
      setDisplayedSkills(shuffle(skills));
      timeoutRef.current = setTimeout(shuffleSkills, 3000);
    };

    shuffleSkills();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [skills]);

  return (
    <section id="stack" className="px-4 lg:p-0">
      <div className="">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-start gap-4 sm:gap-6 mb-4">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-3xl mb-4">
            <TextDoodle type="highlight"  strokeWidth={6} color={theme === "light" ? "#818cf8" : "#4F46E5"}>Tech Stack</TextDoodle>
            
            </h2>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 md:gap-5">
          {displayedSkills && displayedSkills.length > 0 ? (
            displayedSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                transition={{ duration: 1.5, type: "spring" }}
                className="relative group"
              >
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={48}
                  height={48}
                  unoptimized={skill.iconUrl.includes("skillicons.dev")}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-300 group-hover:-translate-y-2 transform group-hover:scale-110 cursor-pointer"
                />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stack;