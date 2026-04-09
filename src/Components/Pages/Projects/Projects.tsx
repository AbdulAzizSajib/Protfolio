"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../../Hooks/useTheme";
import useFancybox from "../../Hooks/useFancybox";
import type { Project } from "../../../lib/api";

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  const { theme } = useTheme();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedDescription, setExpandedDescription] = useState<number | null>(null);
  const [fancyboxRef] = useFancybox({
    infinite: true,
    Thumbs: { autoStart: true },
  });

  return (
    <div id="projects" className={theme === "light" ? "text-black p-4 lg:p-0" : "bg-zinc-900 text-white p-4 lg:p-0"}>
      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-end lg:w-[15%]">Projects</h2>
      </div>

      <div className="grid grid-cols-1 mt-0 lg:mt-0 lg:grid-cols-2 gap-x-6 lg:gap-x-16">
        {projects.map((project, index) => (
          <div key={index} className="mb-8 sm:mb-12">
            <div className="rounded overflow-hidden w-full max-w-[650px] aspect-video mx-auto relative">
              {project.thumbnail ? (
                <Image
                  onClick={() => project.gallery.length > 0 && setActiveProject(project)}
                  className={`object-cover ${project.gallery.length > 0 ? "cursor-pointer" : ""}`}
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-300">
                  No preview available
                </div>
              )}
            </div>

            <div className="w-full max-w-[650px] mx-auto mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <h2 className="font-semibold text-lg sm:text-base text-center sm:text-left">{project.title}</h2>
                <div className="hidden lg:block w-32 xl:w-72 h-[1px] border dark:bg-white flex-1 mx-4" />
                <div className="flex items-center gap-2">
                  {/* {project.gallery.length > 0 && (
                    <button
                      className="hover:text-[#6366F1] hover:scale-110 transition-transform duration-300"
                      onClick={() => setActiveProject(project)}
                      type="button"
                    >
                      <Icon className="text-2xl sm:text-xl" icon="ri:screenshot-fill" />
                    </button>
                  )} */}
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.liveLink}
                      className="hover:text-[#6366F1] hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="text-2xl sm:text-xl" icon="line-md:external-link" />
                    </a>
                  )}
                </div>
              </div>
              <h2 className="my-2 sm:my-3 capitalize text-indigo-600 text-sm sm:text-base text-center sm:text-left space-x-2">
                {project.technologies?.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-.5 text-sm bg-blue-100 text-blue-700 rounded-full gap-3">
                    {tech}
                  </span>
                ))}
              </h2>
              <button
                onClick={() => setExpandedDescription(expandedDescription === index ? null : index)}
                className={`w-full flex items-center justify-between p-3 rounded transition-all ${
                  expandedDescription === index
                    ? theme === "light"
                      ? "bg-zinc-200"
                      : "bg-zinc-800"
                    : theme === "light"
                    ? "bg-zinc-100 hover:bg-zinc-200"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                <span className="font-medium text-sm">Project Description</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`text-xl transition-transform duration-300 ${expandedDescription === index ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {expandedDescription === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="text-sm font-light list-disc list-inside space-y-1 mt-3 p-3">
                      {(project.description.match(/[^.!?]+[.!?]+/g) || [project.description])?.map((sentence, sentenceIndex) => {
                        const trimmedSentence = sentence.trim();
                        return trimmedSentence ? (
                          <li key={sentenceIndex}>{trimmedSentence}</li>
                        ) : null;
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={`${activeProject ? activeProject.title : ""} - Gallery`}
        open={!!activeProject}
        onCancel={() => setActiveProject(null)}
        footer={null}
        width="100%"
        style={{ maxWidth: "1000px" }}
        centered
      >
        {activeProject && (
          <div ref={fancyboxRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {activeProject.gallery.map((img, i) => (
              <a key={i} data-fancybox="gallery" href={img}>
                <p className="text-xs sm:text-sm mb-1 text-center font-semibold bg-blue-100">{i + 1}</p>
                <Image
                  src={img}
                  alt={`${activeProject.title} screenshot ${i + 1}`}
                  width={200}
                  height={192}
                  className="rounded-md cursor-pointer w-full h-32 sm:h-40 lg:h-48 object-cover object-left-top shadow-lg hover:scale-105 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
