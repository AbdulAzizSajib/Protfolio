"use client";

import { Fragment } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import useTheme from "../../Hooks/useTheme";
import type { Profile, Skill } from "../../../lib/api";

type IntroProps = {
  profile: Profile | null;
  skills: Skill[];
};

const Intro = ({ profile, skills }: IntroProps) => {
  const { theme } = useTheme();

  return (
    <section id="home" className="px-4">
      <Fragment>
        <div className="flex flex-col w-full lg:flex-row items-center justify-center lg:justify-between gap-8 sm:gap-10 lg:gap-12 mt-4 lg:mt-8">
          <div className="text-center lg:text-left order-2 lg:order-2 w-full">
            <h1 className="text-3xl font-semibold leading-tight">
              Hello I&apos;m <br className="lg:hidden" />
              <span className="bg-indigo-600 bg-clip-text text-transparent">{profile?.user?.name || " "}</span>
            </h1>
            <p className="mt-3 sm:mt-4 lg:mt-2 tracking-wider text-base sm:text-lg md:text-xl lg:text-xl font-medium">
              {profile?.tagline || " "}
            </p>
            <p className="mt-3 sm:mt-4 lg:mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto lg:mx-0">
              {profile?.bio}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-8">
              <div className="flex space-x-4 sm:space-x-6 items-center">
                <a
                  className="flex items-center gap-2 text-sm sm:text-base hover:opacity-80 transition-all duration-300"
                  href={profile?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-2xl sm:text-2xl lg:text-3xl transition duration-300 transform hover:scale-110" icon="logos:linkedin-icon" />
                  <span className="hidden sm:inline font-medium">LinkedIn</span>
                </a>
                <a
                  className="flex items-center gap-2 text-sm sm:text-base hover:opacity-80 transition-all duration-300"
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-2xl sm:text-3xl lg:text-3xl transition duration-300 transform hover:scale-110" icon="mdi:github" />
                  <span className="hidden sm:inline font-medium">Github</span>
                </a>
                <a
                  className="flex items-center gap-2 text-sm sm:text-base hover:opacity-80 transition-all duration-300"
                  href={profile?.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-2xl sm:text-3xl lg:text-3xl transition duration-300 transform hover:scale-110" icon="ri:profile-line" />
                  <span className="hidden sm:inline font-medium">Resume</span>
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-1 sm:w-auto flex justify-center relative w-44 h-44 min-w-44 min-h-44 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 rounded-full p-1">
              <div className="w-full h-full bg-dark-bg rounded-full">
                {profile?.avatarUrl && (
                  <Image
                    src={profile.avatarUrl}
                    alt={profile?.user?.name || "Profile"}
                    width={176}
                    height={176}
                    priority
                    className={`w-full h-full object-cover rounded-full border-4 ${
                      theme === "light" ? "light-border" : "dark-border"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-10 sm:mt-12 lg:mt-16">
          <div className="flex items-center">
            <h2 className="font-bold text-base sm:text-lg md:text-xl uppercase">Tech Stack</h2>
            <span className="ml-2 text-gray-400 hidden lg:block">|</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {skills.map((skill) => (
              <div key={skill.id} className="relative group">
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={48}
                  height={48}
                  unoptimized={skill.iconUrl.includes("skillicons.dev")}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 transition-all duration-300 group-hover:-translate-y-2 transform group-hover:scale-110"
                />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    </section>
  );
};

export default Intro;
