"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import useTheme from "../../Hooks/useTheme";
import type { WorkExperience } from "../../../lib/api";
import TextDoodle from "../../TextDoodle/TextDoodle";

type MyselfProps = {
  experiences: WorkExperience[];
};

const Myself = ({ experiences }: MyselfProps) => {
  const { theme } = useTheme();

  return (
    <div id="experiance" className="mx-auto transition-colors py-12 sm:py-16 lg:py-20 px-4">
      <div>
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-4">

  <h2 className="font-bold text-2xl sm:text-3xl md:text-3xl mb-4">
            <TextDoodle type="underline"  strokeWidth={6} color={theme === "light" ? "#818cf8" : "#4F46E5"}>Work Experience</TextDoodle>
            
            </h2>

       
         
        </div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1  gap-6 lg:gap-8"
            >
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
                    <div className="flex flex-col">
                      <p className={`text-sm sm:text-xl my-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {experience.company}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold">{experience.position}</h3>
                      <p className={`text-base sm:text-lg font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {experience.period}
                      </p>
                    </div>
                  </div>
                 
                </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myself;
