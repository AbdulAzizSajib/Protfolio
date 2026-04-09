"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useTheme from "../../Hooks/useTheme";
import type { WorkExperience } from "../../../lib/api";

type MyselfProps = {
  experiences: WorkExperience[];
};

const Myself = ({ experiences }: MyselfProps) => {
  const { theme } = useTheme();

  return (
    <div id="about" className="mx-auto transition-colors py-12 sm:py-16 lg:py-20 px-4">
      <div>
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 whitespace-nowrap capitalize">Work Experience</h2>
         
        </div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
            >
              <div className="lg:col-span-2">
                <p className={`text-base sm:text-lg font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  {experience.period}
                </p>
              </div>

              <div className="lg:col-span-3">
                <div className="mb-3 sm:mb-4 space-y-2">
                  <div className="flex items-center gap-5">
                    {experience.companyLogo && (
                      <Image
                        className="w-12 h-12 rounded-full object-cover"
                        src={experience.companyLogo}
                        alt={experience.company}
                        width={48}
                        height={48}
                      />
                    )}
                    <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold mb-1 sm:mb-2">{experience.position}</h3>
                  </div>
                  <p className={`text-sm sm:text-base ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {experience.company} &bull; <span className="font-bold">{experience.type}</span>
                  </p>
                  <p className={`text-sm sm:text-base flex flex-wrap gap-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {experience.technologies?.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-.5 text-sm bg-blue-100 text-blue-700 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </p>
                </div>
                <ul
                  className={`text-sm sm:text-base lg:text-base font-light ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  } max-w-4xl list-disc list-inside space-y-2`}
                >
                  {(experience.description.match(/[^.!?]+[.!?]+/g) || [experience.description])?.map((sentence, index) => {
                    const trimmedSentence = sentence.trim();
                    return trimmedSentence ? (
                      <li key={index}>{trimmedSentence}</li>
                    ) : null;
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myself;
