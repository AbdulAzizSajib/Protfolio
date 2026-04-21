"use client";

import { Icon } from "@iconify/react";
import useTheme from "../../Hooks/useTheme";
import TextDoodle from "../../TextDoodle/TextDoodle";
import type { About as AboutData } from "../../../lib/api";

type AboutProps = {
  about: AboutData | null;
};

export default function About({ about }: AboutProps) {
  const { theme } = useTheme();

  if (!about) {
    return (
      <section id="about" className={theme === "light" ? "text-black p-4 lg:p-0" : "bg-zinc-900 text-white p-4 lg:p-0"}>
        <div className="text-center">
          <p className="text-gray-500">Unable to load about information</p>
        </div>
      </section>
    );
  }

  const stats = [
    {
      value: about.yearsOfExperience,
      label: "Years Experience",
      icon: "ri:briefcase-line",
      color: "from-blue-600 to-cyan-600",
    },
    {
      value: about.projectsCompleted,
      label: "Projects Completed",
      icon: "ri:code-line",
      color: "from-purple-600 to-indigo-600",
    },
  ];

  // Split description into 4 paragraphs
  const getParagraphs = (description: string) => {
    const sentences = description.split(/(?<=[.!?])\s+/);
    const paragraphs = [];
    const sentencesPerParagraph = Math.ceil(sentences.length / 4);
    
    for (let i = 0; i < 4; i++) {
      const start = i * sentencesPerParagraph;
      const end = start + sentencesPerParagraph;
      const paragraphSentences = sentences.slice(start, end);
      if (paragraphSentences.length > 0) {
        paragraphs.push(paragraphSentences.join(' '));
      }
    }
    
    return paragraphs;
  };

  const paragraphs = getParagraphs(about.description);

  return (
    <section
      id="about"
      className={`${
        theme === "light" ? "text-black" : " text-white"
      } p-4 lg:p-0`}
    >
      <div className="space-y-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-3xl sm:text-3xl font-bold mb-4">
            <TextDoodle
              type="underline"
              color={theme === "light" ? "#818cf8" : "#4F46E5"}
              strokeWidth={6}
            >
              About me
            </TextDoodle>
          </h2>
          
          {/* Description */}
          <div className="space-y-6">
            {/* Description Text - 4 paragraphs */}
            <div
              className={`prose prose-sm dark:prose-invert max-w-none leading-relaxed text-left hyphens-auto ${
                theme === "light"
                  ? "text-gray-700 prose-headings:text-black"
                  : "text-gray-300 prose-headings:text-white"
              }`}
            >
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl p-2 backdrop-blur-md transition-all duration-300 ${
                  theme === "light"
                    ? "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg"
                    : "bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 hover:shadow-lg hover:shadow-indigo-500/10"
                }`}
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <div>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span
                        className={`text-sm font-semibold ${
                          theme === "light"
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        +
                      </span>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        theme === "light"
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}