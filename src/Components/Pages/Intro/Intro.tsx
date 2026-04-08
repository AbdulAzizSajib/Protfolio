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
            {/* Name - Largest */}
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi I&apos;m <br className="lg:hidden" />
              <span className="bg-indigo-600 bg-clip-text text-transparent">{profile?.user?.name || " "}</span>
            </h1>

            {/* Tagline - Medium */}
            <p className="mt-4 sm:mt-5 lg:mt-4 tracking-wide text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-400">
              <span>I&apos;m a </span>
              {profile?.tagline || " "}
            </p>

            {/* Bio - Small */}
            <p className="mt-4 sm:mt-5 lg:mt-4 text-sm sm:text-base md:text-base lg:text-base leading-relaxed mx-auto lg:mx-0 text-gray-700 dark:text-gray-300 max-w-2xl">
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
      </Fragment>
    </section>
  );
};

export default Intro;
