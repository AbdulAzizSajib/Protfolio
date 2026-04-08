"use client";

import useTheme from "../../Hooks/useTheme";
import type { Profile } from "../../../lib/api";
import Stack from "../Stack/Stack";

type AboutProps = {
  profile: Profile | null;
};

export default function About({ profile }: AboutProps) {
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className={theme === "light" ? "text-black p-4 lg:p-0" : "bg-zinc-900 text-white p-4 lg:p-0"}
    ><div className="">
      <div >
        <h2 className="text-3xl md:text-3xl font-bold mb-8">About</h2>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            I'm a passionate full-stack developer with a love for creating beautiful and functional web
            applications. I specialize in modern technologies and enjoy solving complex problems.
          </p>

          <p>
            With experience in React, Next.js, and backend development, I strive to bring ideas to life
            through clean, efficient code and thoughtful design.
          </p>

          <p>
            When I'm not coding, you can find me exploring new technologies or contributing to
            open-source projects.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
